import React from 'react'
import Home from './components/Home';
import Confirmation from './components/Confirmation';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/confirmation' element={<Confirmation />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App

