import React from 'react';
import './App.css';
import Quiz from './Quiz';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Quiz App</h1>
      </header>
      <div className="container">
      <Quiz />
      </div>
    </div>
  );
}

export default App;
