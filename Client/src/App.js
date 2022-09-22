import React from 'react';
import './App.css';
import Header from './components/Header/header.component';
import HomePage from './pages/Homepage/homepage.component';

const App = () => {
  return (
    <div className="App">
      <Header />
      <HomePage />
    </div>
  );
}

export default App;
