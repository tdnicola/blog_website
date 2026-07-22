/**
 * Ocean basin fallback, keyed mostly off longitude with polar bands carved
 * off first. Basin boundaries are gradual in reality (e.g. "where the
 * Atlantic becomes the Southern Ocean" isn't a hard line) - these cutoffs
 * are a reasonable approximation for display, not an authoritative boundary.
 */
export function roughOcean(lat: number, lon: number): string {
  if (lat <= -60) return 'Southern Ocean'
  if (lat >= 66) return 'Arctic Ocean'
  if (lon >= -70 && lon < 20) return 'Atlantic Ocean'
  if (lon >= 20 && lon < 120) return 'Indian Ocean'
  return 'Pacific Ocean'
}
