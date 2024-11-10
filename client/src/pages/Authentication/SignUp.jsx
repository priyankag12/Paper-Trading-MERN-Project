import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled, useTheme } from "@mui/material/styles";
import { registerUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    [theme.breakpoints.up("sm")]: {
        width: "450px",
    },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    minHeight: "100vh",
    padding: theme.spacing(2),
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
    },
}));

export default function SignUp() {
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [ageError, setAgeError] = useState(false);
    const [ageErrorMessage, setAgeErrorMessage] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
    const [authError, setAuthError] = useState("");
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInputs()) {
            return;
        }

        const data = new FormData(event.currentTarget);
        const input = new Object();
        input.name = data.get("name");
        input.age = data.get("age");
        input.email = data.get("email");
        input.username = data.get("username");
        input.password = data.get("password");
        try {
            const resp = await registerUser(input);
            navigate("/signin");
            console.log(resp);
        } catch (error) {
            setAuthError(error);
            alert(authError);
        }
    };

    const validateInputs = () => {
        const email = document.getElementById("email");
        const password = document.getElementById("password");
        const username = document.getElementById("username");
        const name = document.getElementById("name");
        const age = document.getElementById("age");

        let isValid = true;

        if (!username.value) {
            setUsernameError(true);
            setUsernameErrorMessage("Please enter a username.");
            isValid = false;
        } else {
            setUsernameError(false);
            setUsernameErrorMessage("");
        }

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage("Please enter a valid email address.");
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage("");
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage(
                "Password must be at least 6 characters long."
            );
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage("");
        }
        if (!name.value || /\d/.test(name.value)) {
            setNameError(true);
            setNameErrorMessage("Names should not contain numbers");
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage("");
        }
        if (
            !age.value ||
            !Number.isInteger(Number(age.value)) ||
            age.value <= 0
        ) {
            setAgeError(true);
            setAgeErrorMessage("Please enter a valid age");
            isValid = false;
        } else {
            setAgeError(false);
            setAgeErrorMessage("");
        }

        return isValid;
    };

    return (
        <>
            <CssBaseline enableColorScheme />
            <SignUpContainer direction="column">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: "100%",
                            fontSize: "clamp(2rem, 10vw, 2.15rem)",
                        }}
                    >
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 2,
                        }}
                    >
                        <TextField
                            error={nameError}
                            helperText={nameErrorMessage}
                            id="name"
                            name="name"
                            type="name"
                            label="Name"
                            autoComplete="name"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            color={nameError ? "error" : "primary"}
                        />
                        <TextField
                            error={usernameError}
                            helperText={usernameErrorMessage}
                            id="username"
                            name="username"
                            label="Username"
                            required
                            fullWidth
                            variant="outlined"
                            color={usernameError ? "error" : "primary"}
                        />
                        <TextField
                            error={ageError}
                            helperText={ageErrorMessage}
                            id="age"
                            name="age"
                            label="Age"
                            required
                            fullWidth
                            variant="outlined"
                            color={ageError ? "error" : "primary"}
                        />
                        <TextField
                            error={emailError}
                            helperText={emailErrorMessage}
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            autoComplete="email"
                            required
                            fullWidth
                            variant="outlined"
                            color={emailError ? "error" : "primary"}
                        />
                        <TextField
                            error={passwordError}
                            helperText={passwordErrorMessage}
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            autoComplete="new-password"
                            required
                            fullWidth
                            variant="outlined"
                            color={passwordError ? "error" : "primary"}
                        />
                        <Button type="submit" fullWidth variant="contained">
                            Sign up
                        </Button>
                        <Typography sx={{ textAlign: "center" }}>
                            Already have an account?{" "}
                            <Link href="/signin" variant="h5" sx={{ color:theme.palette.accent.main }}>
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignUpContainer>
        </>
    );
}