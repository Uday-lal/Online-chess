import styles from "../../styles/Login.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login() {
  return (
    <>
      <div className="w-full h-full">
        <div className={styles.page_grid}>
          <div className={styles.hero_image}></div>
          <div className={styles.form_container}>
            <div>
              <h1>Welcome to chess!!</h1>
              <form className={styles.login_form}>
                <TextField
                  label="Email"
                  type="email"
                  required
                  variant="filled"
                />
                <TextField
                  label="Password"
                  type="password"
                  required
                  variant="filled"
                />
                <span className={styles.op_link}>
                  Don't have a account? <a href="/create_account">Create One</a>
                </span>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
