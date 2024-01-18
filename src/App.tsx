import Posts from './components/Posts';
import Post from './components/Post';
import NewPost from './components/NewPost';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import { LOCALHOST } from "./config";
import EditPost from './components/EditPost';

function App() {
  return (
    <Router>
      <div>
        <nav className='nav-menu'>
          <NavLink className='nav-menu_link' end to="/">Главная</NavLink>
          <NavLink className='nav-menu_link' to="/#" >Фото</NavLink>
          <NavLink className='nav-menu_link' to="/#" >Музыка</NavLink>
          <NavLink className='nav-menu_link' to="/#" >Видео</NavLink>
          <NavLink className='nav-menu_link' to="/#" >Сервисы</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Posts serverAddress={LOCALHOST}/>} />
          <Route path="/posts/new" element={<NewPost serverAddress={LOCALHOST}/>} />
          <Route path="/posts/:postId" element={<Post serverAddress={LOCALHOST}/>} />
          <Route path="/posts/:postId/edit" element={<EditPost serverAddress={LOCALHOST}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
