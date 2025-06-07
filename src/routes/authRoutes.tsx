import React from "react";
import AuthLayout from "../layouts/AuthLayout.tsx";
import Loader from "../components/helpers/Loader.tsx";
const Login = React.lazy(() => import('../views/auth/Login.tsx'))
export default {
    path: '/auth',
    element: <AuthLayout />,
    children: [
        {
            path: 'login',
            element: (
                <Loader> 
                    <Login/> 
                </Loader>
            )
        }
    ]
}