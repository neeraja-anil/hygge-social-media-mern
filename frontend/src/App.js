import React, { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { themeSettings } from './theme';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';


function App() {
  const mode = useSelector((state) => state.mode.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route exact path='/' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/home' element={<HomeScreen />} />
        </Routes>
        <ToastContainer />
      </ThemeProvider>
    </div>
  );
}

export default App;
