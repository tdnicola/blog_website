interface CachedTle {
  line1: string
  line2: string
}

// Celestrak asks that clients not poll more than a few times per day - TLE
// accuracy barely changes hour to hour, so a long cache is correct, not just
// polite. Freshness is delegated to Next's fetch cache (`next.revalidate`)
// rather than hand-rolled module state, since the latter isn't durable
// across serverless invocations/cold starts.
const CACHE_TTL_SECONDS = 2 * 60 * 60
const RETRY_BACKOFF_MS = 5 * 60 * 1000

// Last known-good TLE, used only as a fallback when the fetch itself fails
// (Next's fetch cache has nothing to serve for a rejected request).
let fallback: CachedTle | null = null
let lastFailureAt = 0

export async function getIssTle(): Promise<CachedTle> {
  const now = Date.now()

  // Celestrak just failed - don't retry on every single request, wait out a
  // short backoff and keep serving the last known-good TLE in the meantime.
  if (fallback && now - lastFailureAt < RETRY_BACKOFF_MS) {
    return fallback
  }

  try {
    const res = await fetch('https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE', {
      next: { revalidate: CACHE_TTL_SECONDS },
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

    fallback = { line1, line2 }
    return fallback
  } catch (err) {
    lastFailureAt = now
    if (fallback) return fallback
    throw err
  }
}
