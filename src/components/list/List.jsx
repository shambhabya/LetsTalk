import { signOut } from "firebase/auth";
import {
  child,
  database,
  firebaseAuth,
  get,
  onValue,
  ref,
  update,
} from "../../lib/firebase";
import { useEffect, useState } from "react";

const List = ({ currentUserId, onSelectUser, setCurrentUserId }) => {
  const [users, setUsers] = useState([]);
  const [currentUserName, setCurrentUserName] = useState("");

  const handleLogout = () => {
    update(ref(database, "users/" + currentUserId), {
      online: false,
    });
    setCurrentUserId(null);
    signOut(firebaseAuth).then(() => {
      console.log("SignOut successful");
    });
  };

  useEffect(() => {
    const usersRef = ref(database, "users");

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const usersArray = data
        ? Object.keys(data)
            .filter((id) => {
              if (id === currentUserId) {
                setCurrentUserName(data[id].username);
              }
              return id !== currentUserId;
            })
            .map((id) => ({ id, ...data[id] }))
        : [];
      console.log("users array-", usersArray);
      setUsers(usersArray);
    });
  }, [currentUserId]);

  useEffect(() => {
    const unsubscribe = onValue(ref(database, "chats"), (snapshot) => {
      console.log("chats-", snapshot.val());
      let chats = snapshot.val();

      currentUserId &&
        users.map((user) => {
          let chatId = [currentUserId, user.id].sort().join("_");
          let lastSeen = chats[chatId].lastSeen;
          console.log("lastseen-", lastSeen);

          get(child(ref(database), `chats/${chatId}/messages`)).then((snap) => {
            console.log("my message", snap.val());
            let values = Object.values(snap.val());
            console.log("values-", values);
            if (
              values &&
              values[values.length - 1]["sender"] !== currentUserId &&
              lastSeen === "sent"
            ) {
              update(ref(database, `chats/${chatId}/`), {
                lastSeen: "delivered",
              });
            }
          });
        });
    });
    return () => unsubscribe();
  }, [users]);

  return (
    <div className="border-r border-[#dddddd35] flex-1 flex flex-col">
      <div className="flex items-center justify-center p-2 border-b border-[#dddddd35] text-2xl font-bold text-white">
        Users
      </div>

      <div className="flex-1 overflow-scroll">
        <div className="flex flex-col items-center">
          <div className="item flex gap-4 p-2 w-full justify-center bg-slate-400 items-center border border-[#dddddd35] cursor-pointer">
            Current User- {currentUserName}
          </div>
          {users.map((user) => (
            <div
              className="item flex gap-4 p-2 w-full justify-center items-center border border-[#dddddd35] cursor-pointer"
              key={user.id}
              onClick={() => onSelectUser(user.id)}
            >
              <span className="font-medium text-lg">{user.username}</span>
              <div
                className={`h-3 w-3 rounded-full ${
                  user.online ? "bg-green-500" : "bg-gray-400"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>

      <div
        onClick={handleLogout}
        className="p-2 text-center border-t border-[#dddddd35] cursor-pointer bg-red-300 text-2xl font-bold rounded-bl-lg"
      >
        Logout
      </div>
    </div>
  );
};

export default List;
