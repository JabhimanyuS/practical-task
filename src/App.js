import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/login/index';
import SignUp from './components/signup/index';
import LoanCalculator from './components/loan-calculator/index';

function App() {
  if(window.location.pathname === '/') {
    window.location.href = '/login';
  }
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/loan-calculator" element={<LoanCalculator />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
