import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.setItem("user", user.toLowerCase());
    navigate("/book");
  };

  return (
    <div className="flex h-[100vh] flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <h2 className="text-lg font-medium">What's your good name?</h2>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Your Name"
        required={true}
        className="outline-none border-black border rounded-md my-3 px-3 py-2"
      />
      <button
        onClick={handleClick}
        className="border px-4 py-2 font-medium rounded-md border-black hover:text-white hover:bg-black"
      >
        Continue &nbsp;→
      </button>
    </div>
  );
}

export default Login;
