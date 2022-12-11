import React from 'react';
import Header from './component/header/header';
import Banner from './component/banner/banner';
import Movie from './component/movie/movie'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <Banner />
      <Movie />
    </div>
  );
}

export default App;
