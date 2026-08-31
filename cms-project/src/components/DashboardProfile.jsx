import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoPerson } from "react-icons/io5";
import { useSelector } from "react-redux";


const DashboardProfile = () => {
  
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    confirmPassword: ""
  });

  const changePass = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const [data, setData] = useState(null);
  const backendLink = useSelector((state) => state.prod.link);
  const fileInputRef = React.useRef(null);
  const [image, setImage] = useState(null);
  console.log(image)

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleImage = async () => {
    if (!image) {
      console.log("No image to upload");
      return;
    }
    
    try {
      const formData = new FormData();
      formData.append('image', image);
      const response = await axios.put(`${backendLink}/api/user/change-avatar`, formData, { withCredentials: true });

      // Ensure this is the correct path
      setData((prevData) => ({
        ...prevData,
        avatar: response.data.user.avatar
      }));
      
  
      setImage(null);
    } catch (error) {
      console.log("Error uploading image:", error);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(`${backendLink}/api/user/userData`, { withCredentials: true });
      setData(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error.response?.data?.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    await handleImage(); // Upload the image if there's one
    try {
      const response = await axios.patch(`${backendLink}/api/user/change-password`, password, { withCredentials: true });
      alert(response.data.message);
    } catch (error) {
      console.error("Error changing password:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="items-center gap-12 justify-between mx-10 mt-5">
      <div className="flex items-center gap-12">
        <div className="items-center">
          <label
            className="border rounded-full flex items-center justify-center w-[20vh] h-[20vh] mr-5 cursor-pointer overflow-hidden"
            onClick={handleAvatarClick}
          >
            {data && data.avatar ? (
              <img src={`${backendLink}/upload/${data.avatar}`}  className="w-full h-full object-cover rounded-full" />
            ) : (
              <IoPerson className="text-6xl text-zinc-500" />
            )}
          </label>
          <input
            name="image"
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div>
            <button 
              onClick={handleImage} 
              className="mt-2 text-blue-500"
              type="button"
            >
              Change The Avatar
            </button>
          </div>
        </div>
        <div className="text-right">
          {data ? (
            <>
              <h2 className="font-bold text-2xl">{data.username}</h2>
              <p className="text-gray-500">{data.email}</p>
            </>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </div>

      {/* Password Change Form */}
      <div className="w-full max-w-md justify-between ml-[80%] p-6 border rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4">Change Password</h3>
        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label htmlFor="current-password" className="block text-gray-700">Current Password</label>
            <input
              type="password"
              id="current-password"
              name="password"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Current Password"
              required
              value={password.password}
              onChange={changePass}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="new-password" className="block text-gray-700">New Password</label>
            <input
              type="password"
              id="new-password"
              name="newPassword"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="New Password"
              required
              value={password.newPassword}
              onChange={changePass}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirm-password" className="block text-gray-700">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Confirm New Password"
              required
              value={password.confirmPassword}
              onChange={changePass}
            />
          </div>
          <button 
            type="submit" 
            className="w-full mt-4 bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardProfile;