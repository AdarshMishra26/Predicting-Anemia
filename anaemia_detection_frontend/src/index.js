import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import * as Sentry from "@sentry/react";
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Predict from './components/Predict';
import About from './components/About';
import ContactUs from './components/ContactUs';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <App/>
      </Sentry.ErrorBoundary>,
  },
  {
    path: "/signup",
    element:
      <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <SignUp/>
      </Sentry.ErrorBoundary>,
  },
  {
    path: "/signin",
    element:
      <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <SignIn/>
      </Sentry.ErrorBoundary>,
  },
  {
    path: "/predict",
    element:
      <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <Predict/>
      </Sentry.ErrorBoundary>,
  },
  {
    path: "/about",
    element:
      <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <About/>
      </Sentry.ErrorBoundary>,
  },
  {
    path: "/contact",
    element:
      <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>}>
        <ContactUs/>
      </Sentry.ErrorBoundary>,
  },
]);


root.render(

  <RouterProvider router={router} >
    <App />
  </RouterProvider>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
