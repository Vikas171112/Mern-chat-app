import React, { useState } from "react";
import { useSendFriendRequest } from "../../hooks/ApiHooks/useSendFriendRequest";

function AddFriendModal() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isError, error } = useSendFriendRequest();

  return (
    <dialog id="add_friend_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">Add a Friend</h3>

        <input
          type="email"
          placeholder="Enter friend's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full mb-4"
        />

        <div className="flex justify-end gap-2">
          <form method="dialog">
            <button className="btn btn-ghost">Cancel</button>
          </form>
          <button
            className="btn btn-primary"
            disabled={isPending}
            onClick={(e) => {
              e.preventDefault(); // form submit ko roka
              mutate(email); // <- yahi se call hoga
              // document.getElementById("add_friend_modal").close();
            }}
          >
            {isPending ? "Sending..." : "Send Request"}
          </button>
        </div>

        {isError && (
          <p className="text-red-500 mt-2">{error?.response?.data?.message}</p>
        )}
      </div>
    </dialog>
  );
}

export default AddFriendModal;
