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
import { UserProfile } from './components/UserDetail';

function App() {

    return (
        // <div className="App">
        <Provider store={store}>
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to={localStorage.getItem('token') ? "/home" : "/signIn"} />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/home" element={<Home />} />
                <Route path="/post" element={<NewPost />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/refreshToken" element={<RefreshToken />} />
                <Route path="/user" element={<UserProfile />} />
            </Routes>

            <Copyright sx={{ mt: 5 }} />
        </Provider>
    );
}

export default App;