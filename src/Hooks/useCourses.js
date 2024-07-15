import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { signOut } from "firebase/auth";
import auth from "../firebase.init";

import { toast } from "react-toastify";

const useCourses = (user) => {
  const [courses, setCourses] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = useCallback(async () => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    try {
      const userEmail = user?.email;
      const url = `http://localhost:5000/get-courses?email=${userEmail}`;

      const response = await axios.get(url, {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      });
      setCourses(response.data);
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        signOut(auth);
        localStorage.removeItem("accessToken");
        toast.error("Forbidden Access!", {
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
    fetchCourses();
  }, [fetchCourses]);

  const refetch = () => {
    setIsLoading(true);
    fetchCourses();
  };

  return { courses, isLoading, refetch };
};

export default useCourses;
