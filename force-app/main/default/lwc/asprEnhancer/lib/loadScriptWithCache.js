/* eslint-disable @lwc/lwc/no-document-query */
import { loadScript } from "lightning/platformResourceLoader";

const alreadyLoaded = new Set();

export const loadScriptWithCache = (component, src) => {
  if (
    alreadyLoaded.has(src) ||
    document.querySelector(`script[data-locker-src="${src}"]`)
  ) {
    return Promise.resolve();
  }

  return loadScript(component, src).then(() => {
    alreadyLoaded.add(src);
  });
};
