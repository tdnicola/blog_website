interface CachedTle {
  line1: string
  line2: string
  fetchedAt: number
}

// Celestrak asks that clients not poll more than a few times per day -
// TLE accuracy barely changes hour to hour, so a long cache is correct, not just polite.
const CACHE_TTL_MS = 2 * 60 * 60 * 1000

let cache: CachedTle | null = null

export async function getIssTle(): Promise<{ line1: string; line2: string }> {
  const now = Date.now()
  if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
    return cache
  }

  try {
    const res = await fetch('https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE', {
      cache: 'no-store',
    })
    if (!res.ok) throw new Error('celestrak request failed')

    const text = await res.text()
    const lines = text
      .trim()
      .split('\n')
      .map((line) => line.trim())
    const [, line1, line2] = lines

    if (!line1?.startsWith('1 ') || !line2?.startsWith('2 ')) {
      throw new Error('malformed TLE response')
    }

    cache = { line1, line2, fetchedAt: now }
    return cache
  } catch (err) {
    // Serve a stale-but-still-usable TLE rather than fail outright
    if (cache) return cache
    throw err
  }
}
