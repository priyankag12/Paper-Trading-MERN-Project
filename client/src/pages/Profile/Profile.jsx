import {
  Box,
  Button,
  CssBaseline,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SideMenu from "../../components/Dashboard/SideMenu";
import SideMenuMobile from "../../components/Dashboard/SideMenuMobile";
import Header from "../../components/Dashboard/Header";
import { Outlet } from "react-router-dom";
import "./profile.scss";
import ProfileButton from "../../components/Profile/ProfileButton";
import { getUserInfo } from "../../auth";
import axios from "axios";
import { getProfile, updateProfile } from "../../api/auth.js";
import { loginUser } from "../../api/auth.js";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const userInfo = getUserInfo();
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [username, setUsername] = useState(userInfo.username);
  const [age, setAge] = useState(userInfo.age);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/auth/profile")
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleVerify = async () => {
    try {
      console.log("Called handleVerify");
      const input = {
        email: userInfo.email,
        password: password,
      };
      const result = await loginUser(input); // Call verifyUser with the entered password
      if (result.token) {
        console.log("Inside result");
        setIsEditable(true); // Enable edit mode
        setIsModalOpen(false); // Close modal
        setError("");
      } else {
        console.log("Outside result");
        setError("Incorrect password. Please try again.");
      }
    } catch (error) {
      console.log("kuch to hua");
      console.log(error);
      setError("Verification failed. Please try again.");
    }
  };

  const handleSave = async () => {
    // Only include modified fields
    const updatedFields = {};
    if (name !== userInfo.name) updatedFields.name = name;
    if (email !== userInfo.email) updatedFields.email = email;
    if (username !== userInfo.username) updatedFields.username = username;
    if (age !== userInfo.age) updatedFields.age = age;

    // Check if there are any changes to update
    if (Object.keys(updatedFields).length === 0) {
      console.log("No changes detected.");
      setIsEditable(false);
      return;
    }

    try {
      const updatedUser = await updateProfile(updatedFields);
      console.log("User updated successfully:", updatedUser);
      setUser(updatedUser);
      setIsEditable(false);
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    }
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
              <div className="top-top">
                <div>
                  <h1>User Profile</h1>
                </div>
                <div className="profile-card">
                  <div>User-Profile</div>
                  <div className="profile-picture">
                    <img src="../../../public/defaultProfile.jpg" alt="" />
                  </div>
                </div>
              </div>
              <div className="top-bottom">
                <h1>Hello {name} !</h1>
                <p>
                  This is your profile page. You can see the progress you've
                  made with your work and manage your projects or assigned tasks
                  here.
                </p>
                <div className="buttons">
                  <ProfileButton
                    disabled={isEditable}
                    onClick={() => setIsModalOpen(true)}
                    label={"Edit"}
                    svgPath={
                      "M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"
                    }
                  />
                  {isEditable && (
                    <ProfileButton
                      onClick={handleSave}
                      label={"Save"}
                      svgPath={
                        "M5 21h14a2 2 0 0 0 2-2V8a1 1 0 0 0-.29-.71l-4-4A1 1 0 0 0 16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2zm10-2H9v-5h6zM13 7h-2V5h2zM5 5h2v4h8V5h.59L19 8.41V19h-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5H5z"
                      }
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
                {/*Name*/}
                <div className="card normal">
                  <TextField
                    disabled={!isEditable}
                    value={name}
                    variant="outlined"
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none", // Removes the outline
                        },
                      },
                      "& .MuiInputBase-root": {
                        padding: 0, // Optional: Removes extra padding
                      },
                      "& input": {
                        padding: 0, // Optional: Adjusts text padding
                        fontSize: "1.1rem",
                      },
                    }}
                  ></TextField>
                  <div className="fieldHead">Name</div>
                </div>
                {/*Username*/}
                <div className="card normal">
                  <TextField
                    disabled={!isEditable}
                    value={username}
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none", // Removes the outline
                        },
                      },
                      "& .MuiInputBase-root": {
                        padding: 0, // Optional: Removes extra padding
                      },
                      "& input": {
                        padding: 0, // Optional: Adjusts text padding
                        fontSize: "1.1rem",
                      },
                    }}
                  ></TextField>
                  <div className="fieldHead">Username</div>
                </div>
                {/*Age*/}
                <div className="card normal">
                  <TextField
                    disabled={!isEditable}
                    value={age}
                    variant="outlined"
                    onChange={(e) => setAge(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none", // Removes the outline
                        },
                      },
                      "& .MuiInputBase-root": {
                        padding: 0, // Optional: Removes extra padding
                      },
                      "& input": {
                        padding: 0, // Optional: Adjusts text padding
                        fontSize: "1.1rem",
                      },
                    }}
                  ></TextField>
                  <div className="fieldHead">Age</div>
                </div>
                {/*Email*/}
                <div className="card normal">
                  <TextField
                    disabled={!isEditable}
                    value={email}
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "none", // Removes the outline
                        },
                      },
                      "& .MuiInputBase-root": {
                        padding: 0, // Optional: Removes extra padding
                      },
                      "& input": {
                        padding: 0, // Optional: Adjusts text padding
                        fontSize: "1.1rem",
                      },
                    }}
                  ></TextField>
                  <div className="fieldHead">Email</div>
                </div>

                <TextField
                  disabled
                  variant="outlined"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none", // Removes the outline
                      },
                    },
                    "& .MuiInputBase-root": {
                      padding: 0, // Optional: Removes extra padding
                    },
                    "& input": {
                      padding: 0, // Optional: Adjusts text padding
                      fontSize: "1.1rem",
                    },
                  }}
                  className="card normal"
                >
                  {" "}
                  this is about me Lorem ipsum dolor sit amet consectetur
                  adipisicing elit...
                </TextField>
              </div>
              <div className="profile-right">
                <div className="avatar-container">
                  <img
                    src={userInfo.avatar}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
