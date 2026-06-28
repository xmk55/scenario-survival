export function pickFromPool(items, getFingerprint, playedFingerprints, allowRepeats, pickRandom) {
  if (!items.length) return null;
  if (allowRepeats || !playedFingerprints.length) {
    return pickRandom(items);
  }

  const unplayed = items.filter((item) => !playedFingerprints.includes(getFingerprint(item)));
  if (unplayed.length) {
    return pickRandom(unplayed);
  }

  const ranked = items
    .map((item) => {
      const fp = getFingerprint(item);
      const lastIndex = playedFingerprints.lastIndexOf(fp);
      return { item, lastIndex: lastIndex === -1 ? -1 : lastIndex };
    })
    .sort((a, b) => a.lastIndex - b.lastIndex);

  const oldest = ranked[0]?.lastIndex ?? 0;
  const lruPool = ranked.filter((r) => r.lastIndex === oldest).map((r) => r.item);
  return pickRandom(lruPool.length ? lruPool : items);
}

export function ensureUniqueFingerprint(scenario, playedFingerprints, allowRepeats, maxAttempts = 24, regenerate) {
  if (allowRepeats || !playedFingerprints.length) return scenario;

  let current = scenario;
  let attempts = 0;
  while (
    attempts < maxAttempts
    && current?.fingerprint
    && playedFingerprints.includes(current.fingerprint)
  ) {
    current = regenerate();
    attempts += 1;
  }
  return current;
}
