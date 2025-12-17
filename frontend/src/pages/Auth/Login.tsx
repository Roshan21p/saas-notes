import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import LoginPresentation from "./LoginPresentation";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/Redux/store";
import { login } from "@/Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";

interface LoginData {
  email: string;
  password: string;
}

function Login() {
  
    // Typed dispatch so TS knows the shape of dispatch and payloads
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

  // Typed useState generics
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  // Handler for input changes, typed for input element change event
   function handleUserInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setLoginData({
      ...loginData,
      [name]: value,
    });
  }

  // Form submit handler typed with FormEvent<HTMLFormElement> for accurate form event typing
  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent default form submit behavior (page reload)

    if (!loginData.email || !loginData.password) {
      toast.error("Missing values from the form.");
      return;
    }

    if (!loginData.email.includes("@")) {
      toast.error("Please enter a valid email address");
    }

    setIsLoading(true);


    try {      
      // unwrap returns only fulfilled payload and remove payload 
      const apiResponse = await dispatch(login(loginData)).unwrap();
      console.log("apiResponse",apiResponse)

      if(apiResponse?.data?.success){
        navigate('/');
        setLoginData({
        email: '',
        password: ''
      });
      return;
      }
    } catch (error) {
      console.log("Login failed", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Demo credentials helper
  const fillDemoCredentials = (
    type: "acme-admin" | "acme-member" | "globex-admin" | "globex-member"
  ) => {
    const credentials = {
      "acme-admin": { email: "admin@acme.test", password: "password" },
      "acme-member": { email: "user@acme.test", password: "password" },
      "globex-admin": { email: "admin@globex.test", password: "password" },
      "globex-member": { email: "user@globex.test", password: "password" },
    };

    setLoginData({
      email: credentials[type].email,
      password: credentials[type].password,
    });
  };

  return (
    <LoginPresentation
      handleUserInput={handleUserInput}
      handleFormSubmit={handleFormSubmit}
      loginData={loginData}
      isLoading={isLoading}
      fillDemoCredentials={fillDemoCredentials}
    />
  );
}

export default Login;
