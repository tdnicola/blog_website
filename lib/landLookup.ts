import { feature } from 'topojson-client'
import { geoContains } from 'd3-geo'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { Feature, MultiPolygon, Polygon } from 'geojson'
import countriesTopology from 'world-atlas/countries-110m.json'
import { roughOcean } from '@/lib/roughOcean'

type CountryFeature = Feature<Polygon | MultiPolygon, { name: string }>

interface IndexedCountry {
  name: string
  bbox: [number, number, number, number] // [minLon, minLat, maxLon, maxLat]
  feature: CountryFeature
}

// Server-only: this module is imported from the /api/iss route handler, never
// from a client component, so the ~110KB topology JSON is not shipped to the
// browser - only the resolved place name in the API response is.
let index: IndexedCountry[] | null = null

function computeBbox(geometry: Polygon | MultiPolygon): [number, number, number, number] {
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates
  let minLon = Infinity
  let minLat = Infinity
  let maxLon = -Infinity
  let maxLat = -Infinity
  for (const polygon of polygons) {
    for (const ring of polygon) {
      for (const [lon, lat] of ring) {
        if (lon < minLon) minLon = lon
        if (lon > maxLon) maxLon = lon
        if (lat < minLat) minLat = lat
        if (lat > maxLat) maxLat = lat
      }
    }
  }
  return [minLon, minLat, maxLon, maxLat]
}

function buildIndex(): IndexedCountry[] {
  const topology = countriesTopology as unknown as Topology
  const collection = feature(
    topology,
    topology.objects.countries as GeometryCollection<{ name: string }>
  ) as unknown as { features: CountryFeature[] }

  return collection.features.map((f) => ({
    name: f.properties.name,
    bbox: computeBbox(f.geometry),
    feature: f,
  }))
}

/**
 * Resolves a lat/lon to a human-readable place name: the country if the
 * point falls on land, otherwise an approximate ocean basin name.
 *
 * Point-in-country testing uses d3-geo's `geoContains`, which does spherical
 * (not planar) point-in-polygon testing against the real GeoJSON geometry -
 * unlike a hand-rolled ray-cast, it correctly honors polygon holes (so an
 * enclave like Lesotho isn't swallowed by South Africa's outer ring) and
 * antimeridian-crossing polygons (Russia, Fiji) without special-casing.
 */
export function lookupRegion(lat: number, lon: number): string {
  if (!index) index = buildIndex()

  for (const country of index) {
    const [minLon, minLat, maxLon, maxLat] = country.bbox
    // Countries that cross the antimeridian (Russia, Fiji, ...) get a bbox
    // spanning nearly the full longitude range in this raw min/max scheme -
    // that just means the longitude short-circuit below doesn't help for
    // those few countries, not that it's wrong, so skip it rather than
    // special-case the wrap.
    const spansAntimeridian = maxLon - minLon > 180
    if (!spansAntimeridian && (lon < minLon || lon > maxLon)) continue
    if (lat < minLat || lat > maxLat) continue
    if (geoContains(country.feature, [lon, lat])) return country.name
  }

  return roughOcean(lat, lon)
}
