import Cookies from 'js-cookie';

const defaultOptions: Cookies.CookieAttributes = {
  expires: 365,
  path: '/',
  secure: true,
  sameSite: 'strict',
};

export function setCookie(name: string, value: string, options?: Cookies.CookieAttributes) {
  Cookies.set(name, value, { ...defaultOptions, ...options });
}

export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

export function deleteCookie(name: string) {
  Cookies.remove(name, { path: '/' });
}

export function deleteAllCookies() {
  Object.keys(Cookies.get()).forEach((name) => {
    Cookies.remove(name, { path: '/' });
  });
}
