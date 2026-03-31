const PUBLIC_BASE_URL = import.meta.env.PUBLIC_BASE_URL || "/";

export function assetPath(path = "") {
  if (!path) return PUBLIC_BASE_URL;
  if (/^(?:https?:)?\/\//.test(path) || path.startsWith("data:")) {
    return path;
  }

  return `${PUBLIC_BASE_URL}${path.replace(/^\/+/, "")}`;
}
