import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';
import './app.css';
import { AuthProvider } from "./auth";
import AuthRoute from "./util/authRoute";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Bill from "./pages/bill";


function App() {
  return (
    <AuthProvider>
      <Router>      
       <Route exact path="/" component={Home} />     
        <AuthRoute exact path="/login" component={Login} /> 
        <AuthRoute exact path="/register" component={Register} />    
        <Route exact path="/cart" component={Cart} />     
        <Route exact path="/bill" component={Bill} />       
      </Router>
    </AuthProvider>
  );
}

export default App;
