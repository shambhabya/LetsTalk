import { signOut } from "firebase/auth";
import { database, firebaseAuth, onValue, ref } from "../../lib/firebase";
import { useEffect, useState } from "react";

const List = ({ currentUserId, onSelectUser }) => {
  const [users, setUsers] = useState([]);

  const handleLogout = () => {
    signOut(firebaseAuth).then(() => {
      console.log("SignOut successful");
    });
  };

  useEffect(() => {
    const usersRef = ref(database, "users");

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      const usersArray = data
        ? Object.keys(data)
            .filter((id) => id !== currentUserId)
            .map((id) => ({ id, ...data[id] }))
        : [];
      setUsers(usersArray);
      console.log(usersArray);
    });
  }, [currentUserId]);

  return (
    <div className="border-r border-[#dddddd35] ">
      <div>UserList</div>
      <div className="flex-1 overflow-scroll">
        <div className="flex flex-col items-center ">
          <div>
            <div className="flex gap-2">
              <img src="/public/search.png" alt="search" />
              <input type="text" placeholder="Search" />
            </div>
          </div>
          {users.map((user) => (
            <div
              className="item flex gap-2 p-2"
              key={user.id}
              onClick={() => onSelectUser(user.id)}
            >
              <span>{user.name}</span>
              <p>{user.online ? "Online" : "Offline"}</p>
            </div>
          ))}
        </div>
      </div>
      <div onClick={handleLogout}>LogOut</div>
    </div>
  );
};

export default List;
