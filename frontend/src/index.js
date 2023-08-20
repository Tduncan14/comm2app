import React from 'react';
import ReactDOM from 'react-dom/client';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/Cartscreen'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import store from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/RegisterScreen';
import Shippingscreen from './screens/Shippingscreen';
import Payment from './screens/Paymentscreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import PrivateRoute from './Components/PrivateRoute';
import OrderScreen from './screens/OrderScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true}path="/" element={<HomeScreen />}/>
      <Route path="/product/:id" element ={<ProductScreen />} />
      <Route path = '/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path = '/register' element = {<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />} >
         <Route path = '/shipping' element = {<Shippingscreen />} />
         <Route path = '/payment' element = {<Payment  />} />
         <Route path = '/placeorder' element = {<PlaceOrderScreen />} />
         <Route path = '/order/:id' element={<OrderScreen />}  />
      </Route> 
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
    <RouterProvider router ={router} />
    </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
