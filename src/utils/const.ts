export const IS_PROD = process.env.NODE_ENV === 'production'
export const REACT_APP_AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN
export const REACT_APP_AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID
export const API_URL = 'https://digital-passport.vercel.app'
// process.env.NODE_ENV === 'production'
//   ? 'https://digital-passport.vercel.api'
//   : 'http://127.0.0.1:8000/api'

export const REDIRECT_URL =
  process.env.REACT_APP_VERCEL_ENV === 'production'
    ? `http://${window.location.hostname}/callback`
    : process.env.REACT_APP_AUTH0_CALLBACK_URL ||
      'https://digital-travel-passport.vercel.app/callback'
