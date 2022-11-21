import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from "./Main";
import Result from './Result';
import Excel from './Excel';

const App = () => {
  return (
    <Routes>
      <Route exact path = "/" element={<Main />} />
      <Route path = "/result" element={<Result />} />
      <Route path = "/excel" element={<Excel />} />
    </Routes>
  );
}
export default App;