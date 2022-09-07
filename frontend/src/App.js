
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Signup from './pages/user/Signup';
import Login from './pages/user/Login'
  import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path='/signup'  element={<Signup />} />
        <Route path='/login'  element={<Login />} />

       
      </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
