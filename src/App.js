import React from 'react'
import { Routes, Route } from 'react-router-dom'
import FindPw from './findpw/FindPw';
import Main from "./Main";
import Result from './result/Result';
import SignIn from './signin/SignIn';
import SignUp from './signup/SignUp';

const App = () => {
  return (
    <Routes>
      <Route exact path = "/" element={<Main />} />
      <Route path = "/result" element={<Result />} />
      <Route path = "/signin" element={<SignIn />} />
      <Route path = "/signup" element={<SignUp />} />
      <Route path = "/findpw" element={<FindPw />} />
    </Routes>
  );
}
export default App;