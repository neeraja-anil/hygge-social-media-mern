import React from 'react';
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
    <div className="app">
      <Header />
      <main className='py-3'>
        <Routes>
          <Route exact path='/' element={<HomeScreen />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
