export function getQueryParams(params: string): string | null {
  return new URLSearchParams(window.location.search).get(params);
}
