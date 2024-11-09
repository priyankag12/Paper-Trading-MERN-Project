import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Container,
} from "@mui/material";

const ConfirmPassword = () => {
  const { id, token } = useParams(); // Extracts the id and token from the URL
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send a POST request to your server with id, token, and password
    try {
      const response = await fetch(
        `http://localhost:8000/api/auth/confirmpassword/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();
      alert(data.message || "Password updated successfully");
      navigate("/signin");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#222", // Page background
        padding: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ color: "#fff", mb: 2 }}
      >
        Reset Password
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          padding: 3,
          width: "100%",
          backgroundColor: "#333", // Form background
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <FormControl fullWidth variant="outlined">
          <TextField
            type="password"
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            InputLabelProps={{ style: { color: "#aaa" } }} // Label color in dark theme
            InputProps={{
              style: { color: "#fff", backgroundColor: "#444" }, // Input field background and text color
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined">
          <TextField
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            variant="outlined"
            InputLabelProps={{ style: { color: "#aaa" } }}
            InputProps={{
              style: { color: "#fff", backgroundColor: "#444" },
            }}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "8px" } }}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            backgroundColor: "#555",
            color: "#fff",
            "&:hover": { backgroundColor: "#666" },
            borderRadius: "8px",
            paddingX: 3,
          }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default ConfirmPassword;
