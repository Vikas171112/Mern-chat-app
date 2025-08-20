import { useMutation } from "@tanstack/react-query";
import { signInApi } from "../../apis/AuthApis";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store/authStore";
import ErrorToasts from "../../components/Toasts/ErrorToasts";

export const useSigninApi = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data) => signInApi(data),

    onSuccess: (res) => {
      console.log("Login Successful ", res.data);

      setAuth(
        {
          id: res.data.user._id,
          email: res.data.user.email,
        },
        res.data.token
      );

      localStorage.setItem("auth-token", res.data.token);

      // navigate to homepage
      navigate("/");
    },

    onError: (error) => {
      console.error("Login Failed ", error.response?.data || error.message);
      throw error;
    },
  });
};
