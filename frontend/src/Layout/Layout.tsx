import { Footer } from "@/components/Footer/Footer";
import { Navbar } from "@/components/Navbar/Navbar";
import { getTenant } from "@/Redux/Slices/TenantSlice";
import type { AppDispatch, RootState } from "@/Redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Layout({ children } : {children : React.ReactNode}) {
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state?.tenant?.data)
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )
    
  useEffect(() => {
    if (isAuthenticated && !data) {
      dispatch(getTenant()).unwrap();
    }
  }, []);
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white flex flex-col">
      <Navbar />
       <main className="grow">   {/* flex-grow */}
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
