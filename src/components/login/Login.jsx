import React, { useState } from "react";
import { toast } from "react-toastify";
import { database, firebaseAuth, ref, set } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Loading from "../loading/Loading";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in:", user);
        toast.success("Logged in successfully");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        toast.error(`Login failed: ${error.message}`);
        setLoading(false);
      });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        set(ref(database, "users/" + user.uid), {
          username,
          online: true,
        });

        setLoading(false);
        console.log("Signed up:", user);
        toast.success("Account created successfully");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Signup error:", error.message);
        toast.error(`Signup failed: ${error.message}`);
      });
  };
  return (
    <div className="login w-full h-full flex items-center gap-24">
      <div className="item flex-1 flex flex-col items-center gap-5">
        <div className="text-xl ">Welcome Back</div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center gap-5"
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-5 bg-black text-white rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-5 bg-black text-white rounded-md"
          />
          <button
            className="w-full p-3 bg-blue-400 text-white rounded-md cursor-pointer font-medium"
            disabled={loading}
          >
            {loading ? <Loading /> : "Sign In"}
          </button>
        </form>
      </div>
      <div className="Separator h-4/5 w-[2px] bg-[#dddddd35]"></div>
      <div className="item flex-1 flex flex-col items-center gap-5">
        <div className="text-xl ">Create an account</div>
        <form
          onSubmit={handleSignup}
          className="flex flex-col items-center justify-center gap-5"
        >
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="p-5 bg-black text-white rounded-md"
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-5 bg-black text-white rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-5 bg-black text-white rounded-md"
          />

          <button
            className="w-full p-3 bg-blue-400 text-white rounded-md cursor-pointer font-medium"
            disabled={loading}
          >
            {loading ? <Loading /> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
