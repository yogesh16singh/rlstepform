import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider
} from "react-router-dom";
import App from './App.tsx'
import './index.css'
import Home from './screens/Home.tsx';
import Login from './screens/Login.tsx';
import Registration from './screens/Registration.tsx';
import UserDetails from './screens/UserDetails.tsx';
import store from './redux/store.ts';
import { Provider } from 'react-redux';
import PrivateRoute from './routes/PrivateRoute.tsx';
import PublicRouter from './routes/PublicRouter.tsx';

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path='/' element={<App />}>
      <Route path='' element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path='login' element={<PublicRouter><Login /></PublicRouter>} />
      <Route path='registration' element={<PublicRouter><Registration /></PublicRouter>} />
      <Route path='userdetails' element={<PrivateRoute><UserDetails /></PrivateRoute>} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
