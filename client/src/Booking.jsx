import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Booking() {
  let URL = import.meta.env.VITE_URL;
  const navigate = useNavigate();

  const [data, setData] = useState({ uname: "", classType: "", slot: "" });

  const slots = ["9:00 AM", "12:00 PM", "3:00 PM", "5:00 PM", "8:00 PM"];

  useEffect(() => {
    setData({ ...data, uname: localStorage.getItem("user") });
  }, []);

  const handleClick = async () => {
    try {
      await axios
        .post(`${URL}/booking`, data)
        .then((res) => {
          navigate("/class");
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex h-[100vh] flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <h2 className="text-xl mb-3 font-medium">Book Your Class!</h2>
      <div className="border border-black rounded-md p-2">
        <select
          value={data.classType}
          onChange={(e) => setData({ ...data, classType: e.target.value })}
          name="classType"
          id="classType"
          className="w-full outline-none"
        >
          <option value="Gym">Gym</option>
          <option value="Dance">Dance</option>
          <option value="Yoga">Yoga</option>
        </select>
      </div>
      <div className="my-2 border-black border p-4 flex flex-wrap justify-center rounded-md">
        {slots.map((s) => (
          <div
            onClick={() => setData({ ...data, slot: s })}
            key={s}
            className="border font-medium border-black m-2 px-3 py-2 rounded-md hover:bg-black hover:text-white"
          >
            {s}
          </div>
        ))}
      </div>
      <button
        onClick={handleClick}
        className="text-center sm:max-w-[100px] font-medium w-full border border-black rounded-md py-2 hover:bg-black hover:text-white"
      >
        Book Now
      </button>
    </div>
  );
}

export default Booking;
