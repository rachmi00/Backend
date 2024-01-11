import React ,{ useEffect, useState } from 'react';
import './App.css'
import { Auth } from './components/Auth';
import CRUD from './components/CRUD';

function App() {
 

  return (
    <div>
      <Auth />
      <CRUD/>
     </div>
  )
}


export default App
