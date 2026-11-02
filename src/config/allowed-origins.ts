import env from './env.js';

const allowedOrigins = new Set([
  env.CLIENT_URL,
  ...(env.NODE_ENV === 'production' ? ['https://butta-health.vercel.app'] : []),
]);

export function isAllowedOrigin(origin: string) {
  return allowedOrigins.has(origin);
}
