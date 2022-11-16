import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Main from "./Main";
import Result from './Result';

const App = () => {
  return (
    <Routes>
      <Route exact path = "/" element={<Main />} />
      <Route path = "/result" element={<Result />} />
    </Routes>
  );
}
export default App;