import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  database,
  firebaseAuth,
  get,
  onDisconnect,
  onValue,
  ref,
  update,
} from "../lib/firebase";
import Loading from "../components/loading/Loading";

// Create a context
const AuthContext = createContext(null);

// Create a provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    currentUser &&
      onDisconnect(ref(database, "users/" + currentUser.uid + "/online")).set(
        false
      );

    const connectedRef = ref(database, ".info/connected");
    onValue(connectedRef, (snap) => {
      if (snap.val() === true) {
        setConnected(true);
        currentUser &&
          update(ref(database, "users/" + currentUser.uid), {
            online: true,
          });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [currentUser, connected]);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loading />;
      </div>
    ); // Replace with your loading component
  }

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
