import { Auth0Provider } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'
import {
  REACT_APP_AUTH0_CLIENT_ID,
  REACT_APP_AUTH0_DOMAIN,
  REDIRECT_URL,
} from '../utils/const'

export const Auth0ProviderWithNavigate = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const navigate = useNavigate()

  const onRedirectCallback = (appState: any) => {
    navigate(appState?.returnTo || window.location.pathname)
  }

  // if (!REACT_APP_AUTH0_CLIENT_ID || !REACT_APP_AUTH0_DOMAIN || !REDIRECT_URL) {
  //   return <div>Missing Auth0 env variables</div>
  // }
  return (
    <Auth0Provider
      domain={REACT_APP_AUTH0_DOMAIN}
      clientId={REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin + '/callback',
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}
