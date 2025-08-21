import { useQuery } from "@tanstack/react-query";
import { fetchFriendList } from "../../apis/FriendApis";
import { useChatStore } from "../../Store/chatStore";
import { useEffect } from "react";

export const useFetchFriendList = () => {
  const { setChatList } = useChatStore();

  const {
    isLoading,
    isSuccess,
    isError,
    data: userData, // ab ye pura user object hoga
  } = useQuery({
    queryKey: ["userData"],
    queryFn: fetchFriendList,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log(userData, "FRom react query");
      setChatList(userData || []);
    }
  }, [isSuccess, userData]);

  return {
    isLoading,
    isError,
    friendsData: userData || [], // direct friends return kar
  };
};
