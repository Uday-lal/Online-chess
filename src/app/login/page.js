import styles from "../../styles/Login.module.css";
import TextField from "@mui/material/TextField";

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
                  id="filled-basic"
                  label="Email"
                  required
                  variant="filled"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
