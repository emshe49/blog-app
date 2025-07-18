import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from './Features/auth';
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import OtherLayout from "./layout/OtherLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AllBlogs from "./pages/AllBlogs";
import Profile from "./pages/Profile";
import DashboardProfile from "./components/DashboardProfile";
import Favourites from "./components/Favourites";

import Description from "./components/Description";
import Categories from "./pages/Categories/Categories";
import AdminLogin from "./pages/adminLogin/AdminLogin";
import AdminDashboard from "./pages/adminDashboard/AdminDashboard";
import Dashboard from "./components/Admin Components/Dashboard/Dashboard";
import AddBlog from "./components/Admin Components/AddBlog";
import EditBlogs from "./components/Admin Components/EditBlogs";
import UpdateBlog from "./components/Admin Components/UpdateBlog";
import UserNotFound from "./pages/UserNotFound";
import { ToastContainer, toast } from 'react-toastify';
import DeleteCategory from "./components/Admin Components/DeleteCategory";
import AddAdmin from "./components/Admin Components/AddAdmin";

const App = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${backendLink}/api/user/check-cookie`, {
        withCredentials: true,
      });
      if(response.data.message === true){
        dispatch(login())
      }
    };
    fetch();
  }, [backendLink, dispatch]);

  return (
    <div>
       <ToastContainer />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/description/:id" element={<Description/>} />
          <Route path="/cat/:id" element={<Categories />} />
          <Route path="/profile" element={<Profile />}>
            <Route index element={<DashboardProfile />} />
            <Route path="favourites" element={<Favourites />} />
          
          </Route>
        </Route>
        <Route element={<OtherLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin-dashboard/add-blogs" element={<AddBlog />} />
            <Route path="/admin-dashboard/edit-blogs" element={<EditBlogs />} />
            <Route path="/admin-dashboard/update-blogs/:id" element={<UpdateBlog />} />
            <Route path="/admin-dashboard/delete-category" element={<DeleteCategory/>}/>
            <Route path="/admin-dashboard/users" element={<AddAdmin />} />
          </Route>
        </Route>
        <Route path="*" element={<UserNotFound />} />
      </Routes>
    </div>
  );
};

export default App;