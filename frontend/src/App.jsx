/*
npm init create vite@latest
(frontend -> Vite -> JavaScript)
npm i react-router-dom

*/
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ConnexionPage from './pages/connexionPage';
import WelcomePage from './pages/welcomePage';


export default function App(){
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element = {<WelcomePage/>}/>
          <Route path='/connexionPage' element = {<ConnexionPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}
