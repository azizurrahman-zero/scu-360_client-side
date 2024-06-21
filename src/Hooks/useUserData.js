import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import auth from "../firebase.init";
import { toast } from "react-toastify";

const useUserData = (user) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const userEmail = user?.email;
      const url = `http://localhost:5000/get-user-data?email=${userEmail}`;

      const response = await axios.get(url, {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      });
      setUserData(response.data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        toast.error("Forbidden access", {
          position: "bottom-center",
        });
      } else {
        toast.error("Error fetching user Data!", {
          position: "bottom-center",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const refetch = () => {
    setIsLoading(true);
    fetchUserData();
  };

  return { userData, isLoading, refetch };
};

export default useUserData;
