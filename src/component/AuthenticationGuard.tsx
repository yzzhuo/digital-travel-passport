import { withAuthenticationRequired } from '@auth0/auth0-react'
import { PageLoading } from './PageLoader'

export const AuthenticationGuard = ({ component }: { component: any }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className='page-layout'>
        <PageLoading />
      </div>
    ),
  })

  return <Component />
}
