import './App.css';
import './Pages/Board';
import Board from './Pages/Board';
import Content from './Pages/Content';
import Edit from './Pages/Edit';
import Write from './Pages/Write';
import Login from './Pages/Login';
import {useState} from 'react';
import { Form, Button, Container, Card } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const logout=()=>{sessionStorage.removeItem('user'); setIsLoggedIn(false)};
  return (
    <Router>
     <div className='text-center'>
          <Link style={{ textDecoration: 'None', color: 'black' }} to='/posts'><h2>게시판 이동</h2></Link>
          {isLoggedIn ? (
            // 로그인 상태일 때
            <Button onClick={logout}>로그아웃</Button>
          ) : (
            // 로그인 상태가 아닐 때
            <Link to='/login'><Button >로그인</Button></Link>
          )}
        </div>
      <Routes>
        <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Login>}></Route>
        <Route path="/posts" element={<Board isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Board>}></Route>
        <Route path="/posts/write" element={<Write isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Write>}></Route>
        <Route path="/posts/:post_id" element={<Content isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Content>}></Route>
        <Route path="/edit/:user_id/:post_id" element={<Edit isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Edit>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
