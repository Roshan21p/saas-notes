import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import Login from './pages/Auth/Login';
import NotesPage from './pages/Note/NotePage';

function App() {

  return (
     <>
        <Routes>

              <Route path='/' element={<HomePage />} />

              <Route path='/auth/login' element={<Login />} />

               <Route path='/note' element={<NotesPage />} />

        </Routes>
     </>
  )
}

export default App