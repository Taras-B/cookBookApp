import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { RootState } from '../redux'

interface PrivateRoutePropsI {
  component: React.ComponentType<RouteProps>
  path: string
  exact?: boolean
}

export const PrivateRoute = ({ component: Component, ...rest }: PrivateRoutePropsI) => {
  const loading = useSelector((state: RootState) => state.authReducer.loading)
  const isAuthenticated = useSelector(
    (state: RootState) => state.authReducer.isAuthenticated
  )

  return (
    <Route
      {...rest}
      render={(props) =>
         loading ? (
        null
         ) :
         isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to='/auth/login' />
        )
      }
    />
  )
}
