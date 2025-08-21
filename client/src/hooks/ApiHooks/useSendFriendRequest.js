import { useMutation } from "@tanstack/react-query";
import { sendFriendRequest } from "../../apis/FriendApis";

export const useSendFriendRequest = () => {
  const mutation = useMutation({
    mutationFn: (email) => sendFriendRequest(email),
    onSuccess: (data) => {
      console.log(" Friend request sent:", data);
    },
    onError: (error) => {
      console.log(" Some Error occurred:", error.response.data.message);
      throw error;
    },
  });

  return mutation;
};
