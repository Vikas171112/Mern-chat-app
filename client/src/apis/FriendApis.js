import axiosInstance from "../config/axiosInstance.js";

export const fetchFriendList = async (id) => {
  const token = localStorage.getItem("auth-token");

  try {
    const response = await axiosInstance.get("/user/friends", {
      headers: {
        authorization: token,
      },
    });
    console.log(response.data.data.friends);
    return response.data.data.friends;
  } catch (error) {
    console.log("Api Error", error);
    throw error;
  }
};
