
// This file is designed to take care of caching stuff
// For now, I'm going to use simple localStorage
// But it can be done with some other DBs like IndexedDB or valtio, etc

import { GitHubRepository } from "../models";

export const getCachedResult = (key: string) => JSON.parse(localStorage.getItem(key) || "[]");

export const cacheResult = (key: string, result: Array<GitHubRepository>, timeout: number) => {
  localStorage.setItem(key, JSON.stringify(result));

  // Expire cached results after `timeout`
  setTimeout(() => {
    localStorage.setItem(key, "");
  }, timeout);
}
