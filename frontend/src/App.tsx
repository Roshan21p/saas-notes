import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Login from './pages/Auth/Login';

function App() {

  return (
     <>
        <Routes>

              <Route path='/' element={<HomePage />} />

              <Route path='/auth/login' element={<Login />} />

        </Routes>
     </>
  )
}

export default App