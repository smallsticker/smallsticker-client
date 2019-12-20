import Strapi from 'strapi-sdk-javascript';
import qs from 'qs';
import { navigate } from 'gatsby';
const strapi = new Strapi(process.env.STRAPI_API);
export const isBrowser = typeof window !== 'undefined';

// To speed things up, we’ll keep the profile stored unless the user logs out.
// This prevents a flicker while the HTTP round-trip completes.
let profile = false;

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false
};

export const login = () => {
  if (!isBrowser) {
    return;
  }
  window.location = strapi.getProviderAuthenticationUrl('github');
};

export const logout = callback => {
  localStorage.setItem('isLoggedIn', false);
  profile = false;

  // const { protocol, host } = window.location;
  // const returnTo = `${protocol}//${host}`;

  callback();
};

const setSession = callback => (err, authResult) => {
  if (!isBrowser) {
    return;
  }

  if (err) {
    console.error(err);
    callback();
    return;
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    tokens.accessToken = authResult.accessToken;
    tokens.idToken = authResult.idToken;
    tokens.expiresAt = expiresAt;
    profile = authResult.idTokenPayload;
    localStorage.setItem('isLoggedIn', true);
    callback();
  }
};

export const silentAuth = callback => {
  if (!isBrowser) {
    return;
  }

  if (!isAuthenticated()) return callback();
  // auth0.checkSession({}, setSession(callback));
  localStorage.setItem('isLoggedIn', true);
  callback();
};

export const handleAuthentication = () => {
  if (!isBrowser) {
    return;
  }

  const params = qs.parse(window.location.search, { ignoreQueryPrefix: true });
  strapi.setToken(params.jwt);
  localStorage.setItem('isLoggedIn', true);
  tokens.accessToken = params.jwt;
  profile = params;
  navigate('/');
};

export const isAuthenticated = () => {
  if (!isBrowser) {
    return;
  }

  return localStorage.getItem('isLoggedIn') === 'true';
};

export const getAccessToken = () => {
  if (!isBrowser) {
    return '';
  }

  return tokens.accessToken;
};

export const getUserInfo = () => {
  if (profile) {
    return profile;
  }
};
