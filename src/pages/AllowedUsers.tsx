import { useState, useEffect } from "react";

import { db } from "../firebase-auth";
import { getDocs, collection, updateDoc, doc } from "firebase/firestore";

import { AllowedUser } from "../types/AllowedUser";

function AllowedUsers() {
  const [allowedUsers, setAllowedUsers] = useState<AllowedUser[]>([]);

  const getAllowedUsers = async () => {
    const allowedUsersData = await getDocs(collection(db, "allowed_users"));

    const data: AllowedUser[] = [];

    allowedUsersData.docs.map((allowedUser) => {
      const returnData = {
        id: allowedUser.id,
        email: allowedUser.data().email,
        requested_player_id: allowedUser.data().requested_player_id,
        allowed: allowedUser.data().allowed,
        is_admin: allowedUser.data().is_admin,
      };

      data.push(returnData);
    });

    console.log(data);

    setAllowedUsers(data);
  };

  const toggleAllowUser = async (allowedUser: AllowedUser) => {
    await updateDoc(doc(db, "allowed_users", allowedUser.id), {
      allowed: !allowedUser.allowed,
    });
  };

  const toggleAdminUser = async (allowedUser: AllowedUser) => {
    await updateDoc(doc(db, "allowed_users", allowedUser.id), {
      is_admin: !allowedUser.is_admin,
    });
  };

  const linkUserToPlayer = async (allowedUser: AllowedUser) => {
    await updateDoc(doc(db, "players", allowedUser.requested_player_id), {
      user_id: allowedUser.id,
    });
  };

  const clearLinkedPlayer = async (allowedUser: AllowedUser) => {
    await updateDoc(doc(db, "allowed_users", allowedUser.id), {
      requested_player_id: "",
    });
  };

  useEffect(() => {
    getAllowedUsers();
  }, []);

  return (
    <>
      {allowedUsers.map((allowedUser) => (
        <div className="flex justify-between w-full bg-white p-2 rounded-md mb-2">
          <div>{allowedUser.email}</div>
          <div>
            {allowedUser.allowed ? (
              <button
                className="inline px-4 py-1 bg-blue-950 text-white rounded bg-green-500"
                onClick={() => toggleAllowUser(allowedUser)}
              >
                Allowed
              </button>
            ) : (
              <button
                className="inline px-4 py-1 bg-blue-950 text-white rounded"
                onClick={() => toggleAllowUser(allowedUser)}
              >
                Allow this user
              </button>
            )}
          </div>
          <div>
            {allowedUser.requested_player_id && (
              <button
                className="inline px-4 py-1 bg-blue-950 text-white rounded"
                onClick={() => linkUserToPlayer(allowedUser)}
              >
                Link to player
              </button>
            )}
          </div>
          <div>
            {allowedUser.requested_player_id && (
              <button
                className="inline px-4 py-1 bg-blue-950 text-white rounded bg-green-500"
                onClick={() => clearLinkedPlayer(allowedUser)}
              >
                Clear linked player
              </button>
            )}
          </div>

          <div>
            {allowedUser.is_admin ? (
              <button
                className="inline px-4 py-1 bg-blue-950 text-white rounded bg-green-500"
                onClick={() => toggleAdminUser(allowedUser)}
              >
                User is admin
              </button>
            ) : (
              <button
                className="inline px-4 py-1 bg-blue-950 text-white rounded"
                onClick={() => toggleAdminUser(allowedUser)}
              >
                Make Admin
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

export default AllowedUsers;
