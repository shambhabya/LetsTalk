import React, { useState } from "react";
import { toast } from "react-toastify";
import { firebaseAuth } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in:", user);
        toast.success("Logged in successfully");
      })
      .catch((error) => {
        console.error("Login error:", error.message);
        toast.error(`Login failed: ${error.message}`);
      });
  };
  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signed up:", user);
        toast.success("Account created successfully");
      })
      .catch((error) => {
        console.error("Signup error:", error.message);
        toast.error(`Signup failed: ${error.message}`);
      });
  };
  return (
    <div className="login w-full h-full flex items-center gap-24">
      <div className="item flex-1 flex flex-col items-center gap-5">
        <h2>Welcome Back</h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center gap-5"
        >
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-5 bg-black text-whiye rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-5 bg-black text-whiye rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full p-5 bg-blue-400 text-white rounded-md cursor-pointer font-medium">
            Sign In
          </button>
        </form>
      </div>
      <div className="Separator h-4/5 w-[2px] bg-[#dddddd35]"></div>
      <div className="item flex-1 flex flex-col items-center gap-5">
        <h2>Create an account</h2>
        <form
          onSubmit={handleSignup}
          className="flex flex-col items-center justify-center gap-5"
        >
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="p-5 bg-black text-white rounded-md"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="p-5 bg-black text-white rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="p-5 bg-black text-white rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full p-5 bg-blue-400 text-white rounded-md cursor-pointer font-medium">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
