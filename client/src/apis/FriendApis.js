import axiosInstance from "../config/axiosInstance.js";

export const fetchFriendList = async (id) => {
  const token = localStorage.getItem("auth-token");

  try {
    const response = await axiosInstance.get("/user/friends", {
      headers: {
        authorization: token,
      },
    });
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.log("Api Error", error);
    throw error;
  }
};
