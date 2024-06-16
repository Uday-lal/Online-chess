import styles from "../../styles/Login.module.css";
import LoginForm from "../../components/LoginForm";

function Login() {
  return (
    <>
      <div className="w-full h-full">
        <div className={styles.page_grid}>
          <div className={styles.hero_image}></div>
          <div className={styles.form_container}>
            <div>
              <h1>Welcome to chess!!</h1>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
