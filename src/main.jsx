import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './home'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
// import Contact from './Products'
import {ClerkProvider} from '@clerk/clerk-react';
import Profile from './profile/index'
import AddListing from './add-listing/index'
import { Toaster } from './components/ui/sonner'
import SignInTo from './components/signin/SignInTo'
import SearchByCategory from './search/[category]'
import SearchByOptions from './search'
import ListingDetail from './listing-details/[id]'
import Products from './Products'
import AdminPanel from './Admin/components/AdminPanel'
import AdminRoute from './Admin/components/AdminRoute'
import Admin from './Admin'
import ActiveUsers from './Admin/components/ActiveUsers'
import AdminProducts from './Admin/components/AdminProducts'
import AdminUpdatePrice from './Admin/components/AdminUpdatePrice'
import ContactUs from './ContactUs'
import AdminContactMessages from './Admin/components/AdminContactMessages'
// import SearchByCategory from './search'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/signin',
    element:<SignInTo/>
  },
  {
    path:'/product',
    element:<Products/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/add-listing',
    element:<AddListing/>
  },
  {
    path:'/search',
    element:<SearchByOptions/>
  },
  {
    path:'/search/:category',
    element:<SearchByCategory></SearchByCategory>
  },
  {
    path:'/listing-details/:id',
    element:<ListingDetail/>
  },

  {
    path:'/adminpanel',
    element: (
    <AdminRoute>

    <AdminPanel/>

    </AdminRoute>
    ),


  },

  {
    path:'/admin',
    element:<Admin/>

  },

  {
    path:'/active-users',
    element:<ActiveUsers/>

  },

  {
    path:'/admin-products',
    element:<AdminProducts/>

  },

  {
    path:'/AdminUpdatePrice',
    element:<AdminUpdatePrice/>
  },
  
  {
    path:'/ContactUs',
    element:<ContactUs/>
  }
,

{
  path:'/AdminContactMessages',
  element:<AdminContactMessages/>
}



  
])

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>,
)
