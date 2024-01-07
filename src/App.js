import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes,Route,Link} from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import EditUpdate from './pages/EditUpdate';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <div>
      <nav className='navbar navbar-expand navbar-dark bg-dark '>
        <div className='container'>
          <div className='navbar-nav mr-auto'>
            <li className='nav-item'>
              <Link to={"/"} className='nav-link'>Home</Link>
            </li>
            <li className='nav-item'>
              <Link to={"/create"} className='nav-link'>Create User</Link>
            </li>
          </div>
        </div>
      </nav>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/create' element={<Create/>}></Route>
          <Route path='/edit/:id' element={<EditUpdate/>}></Route>
          <Route path='/view/:id' element={<UserDetail/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
