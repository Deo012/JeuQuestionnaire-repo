/*
npm init create vite@latest
(frontend -> Vite -> JavaScript)
npm i react-router-dom
npm i socket.io-client

*/
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ConnexionPage from './pages/connexionPage';
import WelcomePage from './pages/welcomePage';
import QuizPage from './pages/quizPage';
import AuthProvider from './context/AuthProvider';


export default function App(){
  return (
    <>
    
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path='/' element = {<WelcomePage/>}/>
            <Route path='/connexionPage' element = {<ConnexionPage/>}/>
            <Route path='/quizPage' element = {<QuizPage/>}/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    
    </>
  );
}
