import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';
import Mybook from './Mybook';
import Login from './Login';
import About from './About';
import Carousel from './Carousel';
// import { countries } from './Data';
import Accordion from './Accordion';
import Payment from './Payment';
import Orders from './Orders';
import './App.css';


const promise = loadStripe
  (
    "pk_test_51MeMGpSJQ6PAvITZSBJSJky24X5nCuJn79mx4qzj9Yg4u83jv56sIhu0BD9hntXKrwkhj4yvsz0rESU0D0uVNAJG00rxtSuvcP"
  );
function App() {

  const [{ user }, dispatch] = useStateValue();
  const [searchValue, setSearchValue] = useState("");
  const [resultWords, setResultWords] = useState([""]);
  const [genre, setGenre] = useState("");

  const countries = [

    {
        image: "\\images\\1.png",

    },

    {
        image: "\\images\\2.png",

    },

    {
        image: "\\images\\3.png",

    },

    {
        image: "\\images\\4.png",

    },

];


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {

        dispatch({
          type: "SET_USER",
          user: null,
        });

      }
    })

    return () => {
      unsubscribe();
    }

  }, []);

  // console.log(user);

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
          <Sidebar resultWords={resultWords} setResultWords={setResultWords} searchValue={searchValue} setSearchValue={setSearchValue} genre={genre} setGenre={setGenre}></Sidebar>
            <Orders />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/mybooks">
          <Sidebar resultWords={resultWords} setResultWords={setResultWords} searchValue={searchValue} setSearchValue={setSearchValue} genre={genre} setGenre={setGenre}></Sidebar>
            <Mybook />
          </Route>

          <Route path="/about">
          <Sidebar resultWords={resultWords} setResultWords={setResultWords} searchValue={searchValue} setSearchValue={setSearchValue} genre={genre} setGenre={setGenre}></Sidebar>
            <Accordion />
            <About />
          </Route>

          <Route path="/payment">
          <Sidebar resultWords={resultWords} setResultWords={setResultWords} searchValue={searchValue} setSearchValue={setSearchValue} genre={genre} setGenre={setGenre}></Sidebar>
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          <Route path="/">
            <Sidebar resultWords={resultWords} setResultWords={setResultWords} searchValue={searchValue} setSearchValue={setSearchValue} genre={genre} setGenre={setGenre}></Sidebar>
            <Carousel images={countries} />
            <Home searchValue={searchValue} resultWords={resultWords} genre={genre} />
          </Route>

        </Switch>
      </div>

      <ToastContainer style={{ marginTop: "45px" }}
        autoClose={1000}
        theme="light"
      />
    </Router>

  );
}

export default App;
