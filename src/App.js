import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home/Home";
import DashboardHome from "./Pages/Dashboard/DashboardHome";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Courses from "./Pages/Dashboard/Courses";
import Notice from "./Pages/Dashboard/Notice";
import FaceId from "./Pages/Dashboard/FaceId";
import UploadPhoto from "./Pages/Dashboard/UploadPhoto";
import UploadByWebCam from "./Pages/Dashboard/UploadByWebCam";
import Profile from "./Pages/Dashboard/Profile";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import "./App.css";

// Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./Context/UserContext";
import UserRoute from "./Pages/Authentication/UserRoute";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Home />
              </>
            }
          ></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="sign-up" element={<Signup />}></Route>
          <Route
            path="dashboard"
            element={
              <UserRoute>
                <Dashboard />
              </UserRoute>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<Profile />} />
            <Route path="courses" element={<Courses />} />
            <Route path="notice" element={<Notice />} />
            <Route path="face-id" element={<FaceId />}>
              <Route index element={<UploadPhoto />} />
              <Route path="webcam" element={<UploadByWebCam />} />
            </Route>
          </Route>
        </Routes>
      </UserProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
