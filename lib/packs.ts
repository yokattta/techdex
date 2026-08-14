"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * How many booster packs have been opened. Same shape as `lib/caught.ts`: an
 * external store rather than an effect, so the server snapshot is 0 and
 * hydration never sees a value the server could not have known.
 */

const KEY = "techdex.packs.v1";

let snapshot = 0;
let loaded = false;
const listeners = new Set<() => void>();

function read(): number {
  try {
    const parsed = Number(window.localStorage.getItem(KEY));
    return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 0;
  } catch {
    return 0;
  }
}

function subscribe(onChange: () => void) {
  if (!loaded) {
    loaded = true;
    snapshot = read();
  }
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => 0;

export function usePacksOpened() {
  const packsOpened = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const recordPack = useCallback(() => {
    snapshot += 1;
    try {
      window.localStorage.setItem(KEY, String(snapshot));
    } catch {
      // Counting packs is a nicety; failing to persist must not break the page.
    }
    listeners.forEach((fn) => fn());
  }, []);

  return { packsOpened, recordPack };
}
