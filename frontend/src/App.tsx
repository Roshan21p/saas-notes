import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Auth/Login";
import NotesPage from "./pages/Note/NotePage";
import InviteUser from "./pages/Tenant/InviteUser";
import AcceptInvite from "./pages/AcceptInvite/AcceptInvite";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/auth/login" element={<Login />} />

      <Route path="/notes" element={<NotesPage />} />

      <Route path="/tenants/invite" element={<InviteUser />} />

      <Route path="/invite" element={<AcceptInvite />} />

    </Routes>
  );
}

export default App;
