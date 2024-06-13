import styles from "../../styles/Login.module.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function CreateAccount() {
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

export default CreateAccount;
