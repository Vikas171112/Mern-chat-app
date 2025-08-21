import axiosInstance from "../config/axiosInstance.js";

const token = localStorage.getItem("auth-token");
export const fetchFriendList = async () => {
  try {
    const response = await axiosInstance.get("/user/friends", {
      headers: {
        authorization: token,
      },
    });

    return response.data.data.friends;
  } catch (error) {
    console.log("Api Error", error);
    throw error;
  }
};
export const sendFriendRequest = async (email) => {
  try {
    const response = await axiosInstance.post(
      "/user/addfriend",
      { email },
      {
        headers: {
          authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Api Error", error);
    throw error;
  }
};
