import Header from './components/Header';
import SignIn from './components/SignIn';
import { Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import Home from './components/Home';
import Contact from './components/Contact';
import { Provider } from 'react-redux';
import store from './store/store';
import NewPost from './components/NewPost';

function App() {

  return (
    // <div className="App">
    <Provider store={store}>
        <Header/>
        <Routes>
          <Route path="/users/register" element={<SignUp />} />
          <Route path="/users/login" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/contactus" element={<Contact />} />
        </Routes>
    </Provider>
    // </div>
  );
}

export default App;