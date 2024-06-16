"use client";
import styles from "../styles/Login.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "./Alert";

function AuthForm(props) {
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, name) => {
      data[name] = value;
    });
    setLoading(true);
    const url = "/api/users/login";
    const res = await axios.post(url, data);
    setLoading(false);
    const resData = res.data;
    if (res.status == 200) {
      const token = resData.token;
      document.cookie.token = `token=${token}`;
      router.push("/play");
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, name) => {
      data[name] = value;
    });
    setLoading(true);
    if (data.password == data.confirm_password) {
      const url = "/api/users/create";
      const res = await axios.post(url, data);
      
    } else {
      setLoading(false);
      setAlertType("error");
      setAlertMessage("Passwords and Confirm password dose not match");
      setOpenAlert(true);
    }
  };

  return (
    <>
      {props.isLogin ? (
        <>
          <form onSubmit={handleLogin} className={styles.login_form}>
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              variant="filled"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              required
              variant="filled"
            />
            <span className={styles.op_link}>
              Don't have a account? <a href="/create_account">Create One</a>
            </span>
            <Button type="submit" variant="contained">
              {loading ? <CircularProgress /> : <>Submit</>}
            </Button>
          </form>
        </>
      ) : (
        <>
          <form onSubmit={handleCreateAccount} className={styles.login_form}>
            <TextField
              label="Username"
              type="text"
              required
              name="username"
              variant="filled"
            />
            <TextField
              label="Email"
              type="email"
              name="email"
              required
              variant="filled"
            />
            <TextField
              label="Password"
              type="password"
              required
              name="password"
              variant="filled"
            />
            <TextField
              label="Confirm Password"
              type="password"
              required
              name="confirm_password"
              variant="filled"
            />
            <span className={styles.op_link}>
              Already have a account? <a href="/login">Login</a>
            </span>
            <Button type="submit" variant="contained">
              {loading ? <CircularProgress /> : <>Submit</>}
            </Button>
          </form>
          <Alert
            open={openAlert}
            onClose={() => setOpenAlert(false)}
            message={alertMessage}
            type={alertType}
          />
        </>
      )}
    </>
  );
}

export default AuthForm;
