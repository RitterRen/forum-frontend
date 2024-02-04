import './App.css';
import Header from './components/Header';
import SignIn from './components/SignIn';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';

function App() {

  return (
    <div className="App">
        <Header/>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
        </Routes>
    </div>
  );
}

export default App;