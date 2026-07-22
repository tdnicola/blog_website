import {
  degreesLat,
  degreesLong,
  eciToGeodetic,
  gstime,
  propagate,
  twoline2satrec,
} from 'satellite.js'
import type { IssPosition } from '@/lib/iss'
import { getIssTle } from '@/lib/tle'
import { lookupRegion } from '@/lib/landLookup'

export const revalidate = 0

export async function GET() {
  try {
    const { line1, line2 } = await getIssTle()
    const satrec = twoline2satrec(line1, line2)

    const now = new Date()
    const positionAndVelocity = propagate(satrec, now)
    if (!positionAndVelocity) throw new Error('propagation failed')
    const { position, velocity } = positionAndVelocity

    const gmst = gstime(now)
    const geodetic = eciToGeodetic(position, gmst)

    const numeric = {
      latitude: degreesLat(geodetic.latitude),
      longitude: degreesLong(geodetic.longitude),
      altitude: geodetic.height,
      velocity: Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2) * 3600,
    }

    // A corrupted TLE can make SGP4 return NaN/Infinity without throwing -
    // treat that the same as a failed fetch rather than serving broken data.
    if (!Object.values(numeric).every(Number.isFinite)) {
      throw new Error('non-finite position computed')
    }

    const result: IssPosition = {
      ...numeric,
      region: safeLookupRegion(numeric.latitude, numeric.longitude),
    }

    return Response.json(result)
  } catch {
    return Response.json({ error: 'fetch failed' }, { status: 502 })
  }
}

// Region is a nice-to-have derived from an already-valid position - a defect
// in the lookup itself (bad topology data, an unanticipated geometry edge
// case) shouldn't turn perfectly good telemetry into a full failed response.
function safeLookupRegion(lat: number, lon: number): string {
  try {
    return lookupRegion(lat, lon)
  } catch {
    return 'Unknown'
  }
}
