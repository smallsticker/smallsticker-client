import Strapi from 'strapi-sdk-javascript';

export const isBrowser = typeof window !== 'undefined';

export const client = isBrowser ? new Strapi(process.env.STRAPI_API) : {};
