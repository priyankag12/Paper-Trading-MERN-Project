import {
  Box,
  Button,
  CssBaseline,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SideMenu from "../../components/Dashboard/SideMenu";
import SideMenuMobile from "../../components/Dashboard/SideMenuMobile";
import Header from "../../components/Dashboard/Header";
import { Outlet } from "react-router-dom";
import ProfileButton from "../../components/Profile/ProfileButton";
import { useSelector, useDispatch } from "react-redux";
import { setUser, selectUserInfo } from "../../redux/UserSlice";
import { getProfile, loginUser, updateProfile } from "../../api/auth.js";
import "./profile.scss";
import ConfirmPassword from "../../components/Authentication/ConfirmPassword.jsx";

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo) || {};
  const [isEditable, setIsEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [username, setUsername] = useState(userInfo?.username || "");
  const [age, setAge] = useState(userInfo?.age || "");
  const [avatar, setAvatar] = useState(userInfo?.avatar || "");
  // console.log(
  //   userInfo.name +
  //     " " +
  //     userInfo.email +
  //     " " +
  //     userInfo.age +
  //     " " +
  //     userInfo.avatar +
  //     " " +
  //     userInfo.username
  // );

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        console.log(response.data);
        if (response.data) {
          dispatch(setUser(response.data));
        }
      } catch (error) {
        setError("Failed to load profile. Please try again.");
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name || "");
      setEmail(userInfo.email || "");
      setUsername(userInfo.username || "");
      setAge(userInfo.age || "");
      setAvatar(userInfo.avatar || "");
    }
  }, [userInfo]);

  const handleVerify = async () => {
    try {
      const input = {
        email: userInfo.email,
        password: password,
      };
      const result = await loginUser(input);
      if (result.token) {
        setIsEditable(true);
        setIsModalOpen(false);
        setError("");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (error) {
      setError("Verification failed. Please try again.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const updatedFields = {};
    if (name !== userInfo.name) updatedFields.name = name;
    if (email !== userInfo.email) updatedFields.email = email;
    if (username !== userInfo.username) updatedFields.username = username;
    if (age !== userInfo.age) updatedFields.age = age;
    if (avatar !== userInfo.avatar) updatedFields.avatar = avatar;

    if (Object.keys(updatedFields).length === 0) {
      setIsEditable(false);
      return;
    }

    try {
      const updatedUser = await updateProfile(updatedFields);
      dispatch(setUser(updatedUser));
      console.log(
        "name: " +
          userInfo.name +
          " email: " +
          userInfo.email +
          " age: " +
          userInfo.age +
          " avatar: " +
          userInfo.avatar +
          " username: " +
          userInfo.username
      );
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64File = await convertToBase64(file);
    console.log(base64File);
    setAvatar(base64File);
    console.log(avatar);
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        {/* Desktop Sidebar */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <SideMenu />
        </Box>

        {/* Mobile Sidebar */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <SideMenuMobile />
        </Box>

        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            mt: { md: 9 },
            marginInline: "auto",
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : theme.palette.background.default,
            overflow: "auto",
          })}
        >
          <div className="profile-container">
            <div className="top-container">
              {/* <div className="top-top">
                <h1>User Profile</h1>
                <div className="profile-card">
                  <div>User-Profile</div>
                  <div className="profile-picture">
                    <img src="../../../public/defaultProfile.jpg" alt="" />
                  </div>
                </div>
              </div> */}
              <div className="top-bottom">
                <h1>Hello {name} !</h1>
                <p>
                  This is your profile page. You can manage your projects or
                  assigned tasks here.
                </p>
                <div className="buttons">
                  <ProfileButton
                    disabled={isEditable}
                    onClick={() => setIsModalOpen(true)}
                    label={"Edit"}
                    svgPath="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"
                  />
                  {isEditable && (
                    <ProfileButton
                      onClick={handleSave}
                      label={"Save"}
                      svgPath="M5 21h14a2 2 0 0 0 2-2V8a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm10-2H9v-5h6zM13 7h-2V5h2zM5 5h2v4h8V5h.59L19 8.41V19h-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5H5z"
                    />
                  )}
                </div>
                {isModalOpen && (
                  <Modal
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 300,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Typography variant="h6" component="h2">
                        Verify Password
                      </Typography>
                      <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {error && (
                        <Typography color="error" variant="body2">
                          {error}
                        </Typography>
                      )}
                      <Button variant="contained" onClick={handleVerify}>
                        Confirm
                      </Button>
                    </Box>
                  </Modal>
                )}
              </div>
            </div>

            <div className="bottom-container">
              <div className="profile-left">
                <div className="profile-field">
                  <label>Name</label>
                  <TextField
                    variant="outlined"
                    fullWidth
                    value={name}
                    disabled={!isEditable}
                    onChange={(e) => setName(e.target.value)}
                    className="normal"
                  />
                </div>
                <div className="profile-field">
                  <label>Username</label>
                  <TextField
                    className="normal"
                    variant="outlined"
                    fullWidth
                    value={username}
                    disabled={!isEditable}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="profile-field">
                  <label>Age</label>
                  <TextField
                    className="normal"
                    variant="outlined"
                    fullWidth
                    value={age}
                    disabled={!isEditable}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="profile-field">
                  <label>Email</label>
                  <TextField
                    className="normal"
                    variant="outlined"
                    fullWidth
                    value={email}
                    disabled={!isEditable}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="profile-right">
                <div className="avatar-container">
                  <img src={avatar || "/defaultProfile2.jpg"} alt="Profile" />
                  {isEditable && (
                    <label htmlFor="file-upload">
                      <img
                        src="/editProfile.png"
                        className="editProfile"
                        alt="Edit Profile"
                      />
                    </label>
                  )}
                  <input
                    type="file"
                    id="file-upload"
                    name="myFile"
                    accept=".jpg, .jpeg, .png"
                    style={{ display: "none" }} // Hide the input
                    onChange={(e) => handleFileChange(e)} // Function to handle file selection
                  />
                </div>
              </div>
            </div>
          </div>
          <Header />
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default Profile;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (err) => {
      reject(err);
    };
  });
}
