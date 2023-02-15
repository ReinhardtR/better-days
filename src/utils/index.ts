/**
 * Accessor for the browser's `window` object, so that `window` is
 * not access during SSG.
 */
export const getWindow = () => {
  return typeof window !== "undefined" ? window : null;
};

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
