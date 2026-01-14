import React from 'react';
import './App.css';
import { Weather } from './components/Weather';

export default function App() {
  return(
    <div className="w-4/5 max-w-xl mx-auto">
      <Weather />
    </div>
  );
}