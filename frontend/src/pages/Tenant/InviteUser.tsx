import { useState, type ChangeEvent, type FormEvent } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/Redux/store";
import { inviteUser } from "@/Redux/Slices/TenantSlice";
import { useNavigate } from "react-router-dom";
import InviteUserPresentation from "./InviteUserPresentation";

function InviteUser() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const isLoading = useSelector((state: RootState) => state.tenant.isLoading);

  // Set default role to Member and slug to some context or empty string
  const [inviteUserData, setInviteUserData] = useState<{
    name: string;
    email: string;
    role: "Member";
    slug: string;
  }>({
    name: "",
    email: "",
    role: "Member", // default role
    slug: "",
  });

  function handleUserInput(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setInviteUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      !inviteUserData.name.trim() ||
      !inviteUserData.email.trim() ||
      !inviteUserData.slug.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (!inviteUserData.email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (inviteUserData.slug.trim().length < 4) {
      toast.error("The company should be atleast 4 characters long.");
      return;
    }

    try {
      const apiResponse = await dispatch(inviteUser(inviteUserData)).unwrap();

      if (apiResponse?.data?.success) {
        setInviteUserData({
          name: "",
          email: "",
          role: "Member",
          slug: "",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Invite user failed", error);
    }
  }

  return (
    <InviteUserPresentation
      inviteUserData={inviteUserData}
      handleUserInput={handleUserInput}
      handleFormSubmit={handleFormSubmit}
      isLoading={isLoading}
    />
  );
}

export default InviteUser;
