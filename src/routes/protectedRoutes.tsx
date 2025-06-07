import React from "react";
import Layout from "../layouts/Layout.tsx";
import Loader from "../components/helpers/Loader.tsx";
import ProtectedRoute from "../components/helpers/ProtectedRoutes.tsx";
const Products = React.lazy(() => import('../views/control-panel/Products.tsx'))
const Medicins = React.lazy(() => import('../views/control-panel/Medicins.tsx'));
const Profile = React.lazy(() => import('../views/control-panel/Profile.tsx'));
export default {
    path: '/',
    element: <Layout />,
    children: [
        {
            path: '/',
            element: (
                <Loader>
                    <Products />
                </Loader>
            )
        },
        {
            path: 'medicins',
            element: (
                <Loader>
                    <ProtectedRoute>
                        <Medicins />
                    </ProtectedRoute>
                </Loader>
            )
        },
        {
            path: 'profile',
            element: (
                <Loader>
                    <Profile />
                </Loader>
            )
        }
    ]
}