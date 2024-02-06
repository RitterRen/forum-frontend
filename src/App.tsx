import Header from './components/Header';
import SignIn from './components/SignIn';
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from './components/SignUp';
import Home from './components/Home';
import Contact from './components/Contact';
import Copyright from './components/Copyright';

function App() {

  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<Navigate to={localStorage.getItem('token') ? "/home" : "/signIn"} />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <Copyright sx={{ mt: 5 }} />
    </div>
  );
}

export default App;