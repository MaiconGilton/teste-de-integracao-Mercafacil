import React from 'react'
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom'
import NotFound from '@pages/404/NotFound'
import { isAuthenticated } from '@services/auth'
import Login from '@pages/Login'
import Admin from '@pages/Admin'

export const initRoute = "/admin"

const PrivateRoute = ({ children, ...rest }) => {
    const isUserAuthenticated = isAuthenticated()

    return (
        <Route {...rest} render={({ location }) =>
            isUserAuthenticated
                ? children
                : <Redirect
                    to={{
                        pathname: '/entrar',
                        state: { from: location }
                    }}
                />
        }
        />
    )
}

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <PrivateRoute path={initRoute}><Admin /></PrivateRoute>
                <Route path='/entrar' component={Login} />
                <Route component={NotFound} />
            </Switch>
            <Redirect to={initRoute} />
        </BrowserRouter>
    )
}

export default Router
