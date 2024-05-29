import { useState } from "react";
import { useRouter } from "next/router";

import {
  TextField,
  Button,
  Container,
  Typography,
  Stack,
  Box,
  Tab,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function clear() {
    setEmail("");
    setPassword("");
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Not all fields are filled in");
      return;
    }
    const response = await fetch("/api/routes/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.hasOwnProperty("error")) {
      setMessage(data.error);
    } else {
      clear();
      router.push("/home");
    }
  };

  return (
    <Stack spacing={2} style={{ marginTop: "20px" }}>
      <Typography style={{ textAlign: "center" }} variant="h5">
        Welcome back
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        required
        fullWidth
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => {
          setMessage("");
        }}
      />
      <TextField
        label="Password"
        variant="outlined"
        value={password}
        type="password"
        required
        fullWidth
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => {
          setMessage("");
        }}
      />
      <Button
        fullWidth
        variant="contained"
        color="inherit"
        onClick={handleLogin}
        style={{ boxShadow: "none", backgroundColor: "#e0e0e0" }}
      >
        Log in
      </Button>
      <Typography color={"#8B0000"}>{message}</Typography>
    </Stack>
  );
};

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* eslint-disable */
  enum Messages {
    Successfully = "User successfully registered",
    Error = "User registration error",
    NotFilled = "Not all fields are filled in",
  }
  const [message, setMessage] = useState("");

  function clear() {
    setUsername("");
    setEmail("");
    setPassword("");
  }
  /* eslint-enable */

  const handleRegister = async () => {
    if (!email || !password) {
      setMessage(Messages.NotFilled);
      return;
    }
    const response = await fetch("/api/routes/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.hasOwnProperty("error")) {
      setMessage(data.error);
    } else {
      setMessage(Messages.Successfully);
      clear();
      // router.push("/login");
    }
  };

  return (
    <Stack spacing={2} style={{ marginTop: "20px" }}>
      <Typography style={{ textAlign: "center" }} variant="h5">
        Welcome
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        required
        fullWidth
        onChange={(e) => setUsername(e.target.value)}
        onFocus={() => {
          setMessage("");
        }}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        required
        fullWidth
        onChange={(e) => setEmail(e.target.value)}
        onFocus={() => {
          setMessage("");
        }}
      />
      <TextField
        label="Password"
        variant="outlined"
        value={password}
        type="password"
        required
        fullWidth
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => {
          setMessage("");
        }}
      />
      <Button
        fullWidth
        variant="contained"
        color="inherit"
        style={{ boxShadow: "none", backgroundColor: "#e0e0e0" }}
        onClick={handleRegister}
      >
        Sign up
      </Button>
      <Typography
        color={message === Messages.Successfully ? "#255f00" : "#8B0000"}
      >
        {message}
      </Typography>
    </Stack>
  );
};

const AuthForm = () => {
  const [value, setValue] = useState("1");

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <Container
        maxWidth="xs"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "5px",
          height: "500px",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              textColor="inherit"
              onChange={(e, newValue) => {
                setValue(newValue);
              }}
            >
              <Tab label="Log in" value="1" />
              <Tab label="Sign up" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <LoginForm />
          </TabPanel>
          <TabPanel value="2">
            <RegisterForm />
          </TabPanel>
        </TabContext>
      </Container>
    </div>
  );
};

export default AuthForm;
