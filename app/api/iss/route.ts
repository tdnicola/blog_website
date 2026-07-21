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

    const result: IssPosition = {
      latitude: degreesLat(geodetic.latitude),
      longitude: degreesLong(geodetic.longitude),
      altitude: geodetic.height,
      velocity: Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2) * 3600,
    }

    // A corrupted TLE can make SGP4 return NaN/Infinity without throwing -
    // treat that the same as a failed fetch rather than serving broken data.
    if (!Object.values(result).every(Number.isFinite)) {
      throw new Error('non-finite position computed')
    }

    return Response.json(result)
  } catch {
    return Response.json({ error: 'fetch failed' }, { status: 502 })
  }
}
