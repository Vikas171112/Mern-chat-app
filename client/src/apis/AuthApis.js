import axiosInstance from "../config/axiosInstance";

export const signInApi = async (logindata) => {
  try {
    const response = await axiosInstance.post("/user/signin", logindata);
    return response.data;
  } catch (error) {
    console.log("Api Error", error);
    throw error;
  }
};
