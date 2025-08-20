import React, { useState } from "react";
import { useSigninApi } from "../../hooks/ApiHooks/useSigninApi";
import ErrorToasts from "../../components/Toasts/ErrorToasts";
import MessageApi from "../../components/Toasts/MessageApi";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const loginMutation = useSigninApi();
  function handleInputChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  function handleformSubmit(e) {
    e.preventDefault();
    loginMutation.mutate(formData);
    console.log("Form Submitted Successfully", { ...formData });
  }
  // extract error message
  const errorMessage =
    loginMutation.error?.response?.data?.message ||
    loginMutation.error?.message;
  return (
    <div className="flex justify-center items-center h-screen ">
      <div className="card w-96 bg-base-100 card-xl shadow-sm flex justify-center item-center">
        <div className="card-body ">
          <h2 className="card-title">Login to Your Account</h2>
          {loginMutation.isError && <MessageApi message={errorMessage} />}
          <input
            type="text"
            name="email"
            value={formData.email}
            placeholder="Enter Your Email"
            className="input input-neutral my-3"
            onChange={handleInputChange}
          />
          <input
            type="password"
            value={formData.password}
            name="password"
            placeholder="Enter Your Password"
            className="input input-neutral"
            onChange={handleInputChange}
          />
          <div className="justify-center card-actions">
            <button
              className="btn btn-primary"
              onClick={handleformSubmit}
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging In" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
