import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState, type FormEvent } from "react";
import toast from "react-hot-toast";
import { acceptInvite } from "@/Redux/Slices/AuthSlice";
import type { AppDispatch } from "@/Redux/store";
import AcceptInvitePresentation from "./AcceptInvitePresentation";

function AcceptInvite() {
  const [params] = useSearchParams();
  const token = params.get("token");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing invite token");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
        setIsLoading(true);
      const apiResponse = await dispatch(
        acceptInvite({ token, password })
      ).unwrap();

      console.log("apiResponse",apiResponse);

      if(apiResponse?.success){
        setConfirmPassword("");
        setPassword("");
        navigate("/auth/login");
      }

    } catch (error) {
      console.log("Accept invite failed", error)
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <AcceptInvitePresentation
      password={password}
      confirmPassword={confirmPassword}
      setPassword={setPassword}
      setConfirmPassword={setConfirmPassword}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}

export default AcceptInvite;
