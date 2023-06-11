import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom'

import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';


import { useSelector } from 'react-redux';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import { themeSettings } from './theme';

function App() {
  const mode = useSelector((state) => state.mode.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path='/home' element={<HomeScreen />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
