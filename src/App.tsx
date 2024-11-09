import React from 'react';
import logo from './logo.svg';
import Games from './components/gameDetails';
import SimilarGames from './components/similarGame';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Games />
        <SimilarGames />
      </header>
    </div>
  );
}

export default App;
