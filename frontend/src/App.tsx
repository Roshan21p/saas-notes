import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Login from "./pages/Auth/Login";
import NotesPage from "./pages/Note/NotePage";
import InviteUser from "./pages/Tenant/InviteUser";
import AcceptInvite from "./pages/AcceptInvite/AcceptInvite";
import UpgradePlan from "./pages/Tenant/UpgradePlan";
import RequireAuth from "./components/Auth/RequireAuth";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/auth/login" element={<Login />} />

      <Route path="/accept-invite" element={<AcceptInvite />} />

      <Route element={<RequireAuth allowedRoles={["Admin", "Member"]} />}>
        <Route path="/notes" element={<NotesPage />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
        <Route path="/tenant/invite" element={<InviteUser />} />

        <Route path="/tenant/upgrade" element={<UpgradePlan />} />
      </Route>
    </Routes>
  );
}

export default App;
