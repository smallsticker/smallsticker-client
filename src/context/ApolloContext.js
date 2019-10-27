import Strapi from 'strapi-sdk-javascript';
import { getAccessToken } from '../utils/auth';

export const isBrowser = typeof window !== 'undefined';

export const client = isBrowser ? new Strapi(process.env.STRAPI_API) : {};
