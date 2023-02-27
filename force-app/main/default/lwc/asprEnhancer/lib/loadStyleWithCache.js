/* eslint-disable @lwc/lwc/no-document-query */
import { loadStyle } from "lightning/platformResourceLoader";

const alreadyLoaded = new Set();

export const loadStyleWithCache = (component, src) => {
  if (alreadyLoaded.has(src) || document.querySelector(`link[href="${src}"]`)) {
    return Promise.resolve();
  }

  return loadStyle(component, src).then(() => {
    alreadyLoaded.add(src);
  });
};
