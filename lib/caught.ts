"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * "Caught" marks — the learner's progress — live in localStorage only. No
 * account, no server. A module-level store keeps the dex grid and the detail
 * page in sync without threading context through every component.
 */

const KEY = "techdex.caught.v1";

const EMPTY: ReadonlySet<string> = new Set();

let snapshot: ReadonlySet<string> = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): ReadonlySet<string> {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return new Set(parsed.filter((v): v is string => typeof v === "string"));
  } catch {
    // Private browsing, quota, or hand-edited junk — start clean rather than crash.
    return EMPTY;
  }
}

function write(next: ReadonlySet<string>) {
  snapshot = next;
  try {
    window.localStorage.setItem(KEY, JSON.stringify([...next]));
  } catch {
    // Progress is a nicety; failing to persist must not break the page.
  }
  listeners.forEach((fn) => fn());
}

function subscribe(onChange: () => void) {
  if (!loaded) {
    loaded = true;
    snapshot = read();
  }
  listeners.add(onChange);

  // Keep two open tabs in agreement.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== KEY) return;
    snapshot = read();
    listeners.forEach((fn) => fn());
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => EMPTY;

export function useCaught() {
  const caught = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback((id: string) => {
    const next = new Set(snapshot);
    if (!next.delete(id)) next.add(id);
    write(next);
  }, []);

  const reset = useCallback(() => write(new Set()), []);

  return { caught, toggle, reset };
}
