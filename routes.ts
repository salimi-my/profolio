/**
 * An array of routes that are accessible to the public
 * These routes does not require authentication
 * @type {string[]}
 */
export const publicRoutes: string[] = [
  '/',
  '/privacy-policy',
  '/terms-and-conditions',
  '/download-cv',
  '/api/send',
  '/api/portfolio',
  '/api/resume/generate-link',
  '/api/resume/download-file'
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect signed in users to /admin
 * @type {string[]}
 */
export const authRoutes: string[] = ['/auth/sign-in', '/auth/sign-up'];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth';

/**
 * The default redirect path after signing in
 * @type {string}
 */
export const DEFAULT_SIGNIN_REDIRECT: string = '/admin';
