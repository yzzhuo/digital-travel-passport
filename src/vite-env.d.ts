/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly REACT_APP_AUTH0_DOMAIN: string
  readonly REACT_APP_AUTH0_CLIENT_ID: string
  readonly REACT_APP_AUTH0_CALLBACK_URL: string
  readonly REACT_APP_AUTH0_AUDIENCE: string
  readonly REACT_APP_API_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
