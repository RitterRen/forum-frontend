import Header from './components/Header';
import SignIn from './components/SignIn';
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from './components/SignUp';
import Home from './components/Home';
import Contact from './components/Contact';
import { Provider } from 'react-redux';
import store from './store/store';
import NewPost from './components/NewPost';
import Copyright from './components/Copyright';
import PostDetail from './components/PostDetail';
import RefreshToken from './components/RefreshToken';
import EditPost from './components/EditPost';
import MessageManagement from './components/MessageManagement';
import { UserProfile } from './components/UserDetail';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';

function App() {

  return (
    <Provider store={store}>
        {/* <Header/> */}
        {/* <Dashboard/> */}
        <Routes>
          <Route path="/" element={<Navigate to={localStorage.getItem('token') ? "/home" : "/signIn"} />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="userManagement" element={<UserManagement/>} />
          <Route path="/refreshToken" element={<RefreshToken />} />
          <Route path="/messageManagement" element={<MessageManagement/>}/>
          <Route path="/user" element={<UserProfile />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>

          <Copyright sx={{ mt: 5 }} />
      </Provider>
    );
}

export default App;