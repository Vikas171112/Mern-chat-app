import { useQuery } from "@tanstack/react-query";
import { fetchFriendList } from "../../apis/FriendApis";
import { useChatStore } from "../../Store/chatStore";

export const useFetchFriendList = () => {
  const { setChatList } = useChatStore();

  const {
    isLoading,
    isError,
    data: userData, // ab ye pura user object hoga
  } = useQuery({
    queryKey: ["chatlist"],
    queryFn: fetchFriendList,
    onSuccess: (data) => {
      console.log("✅ React Query Success =>", data.friends);
      setChatList(data.friends || []); // ab safe update hoga
    },
  });

  return {
    isLoading,
    isError,
    friendsData: userData?.friends || [], // direct friends return kar
  };
};
