import logo from './logo.svg';
import './App.css';
import './Pages/Board';
import Board from './Pages/Board';
import Content from './Pages/Content';
import Edit from './Pages/Edit';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/posts" element={<Board></Board>}></Route>
        <Route path="/posts/:post_id" element={<Content></Content>}></Route>
        <Route path="/edit/:user_id/:post_id" element={<Edit></Edit>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
