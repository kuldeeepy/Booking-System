import React, { useState, useEffect } from "react";
import axios from "axios";
let URL = import.meta.env.VITE_URL;

function Class() {
  const [user, setUser] = useState("");
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setUser(localStorage.getItem("user"));

    try {
      axios
        .get(`${URL}/bookings/${user}`)
        .then((res) => {
          console.log(res.data);
          setBookings(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error.response);
    }
  }, [user]);

  const handleCancel = (book) => {
    console.log(book);
    try {
      axios
        .post(`${URL}/cancel/${book._id}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="flex border max-w-[400px] border-black flex-1 flex-col justify-center items-center rounded-md m-5 p-3">
      <h2 className="font-semibold mb-2 text-lg">Your Bookings</h2>
      {bookings && bookings.length > 0 ? (
        bookings?.map((book) => (
          <div
            key={book._id}
            className="border border-black px-2 py-2 w-full mb-2 rounded-md"
          >
            <div className="flex justify-center">
              <span>
                <strong>{book.classType} </strong>
              </span>
              <span>
                {book.startTime} <strong>to</strong> {book.endTime}
              </span>
              <button
                onClick={() => handleCancel(book)}
                className="ml-2 sm:ml-24 border border-red-500 px-2 rounded-md hover:bg-red-500 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default Class;
