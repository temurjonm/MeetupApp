import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Navbar } from './components/navbar/Navbar';

interface IUsers {
  id: number;
  userName: string;
  email: string;
  phone: string;
}

function App() {
  return (
    <div className="App">
      <Navbar />
    </div>
  );
}

export default App;
