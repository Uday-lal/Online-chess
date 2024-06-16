"use client";
import styles from "../styles/Login.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
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
        const token = resData.token
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.login_form}>
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
  );
}

export default LoginForm;
