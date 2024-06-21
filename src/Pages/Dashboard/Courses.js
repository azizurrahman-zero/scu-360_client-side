import React from "react";
import { useOutletContext } from "react-router-dom";
import auth from "../../firebase.init";

const Courses = () => {
  const [user] = useOutletContext();
  console.log(user);
  const handleRefresh = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await currentUser.reload();
        console.log("done");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h1>Courses</h1>
      <p>Name {user?.displayName}</p>
      <button onClick={handleRefresh}>Refresh User Data</button>
    </div>
  );
};

export default Courses;
