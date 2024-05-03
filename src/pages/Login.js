import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <img className="facebook-logo" src="/fb-logo.png" alt="Facebook Logo" />

      <div className="login-form">
        <input
          className="email"
          type="text"
          placeholder="Email address or phone number"
        />
        <input className="password" type="password" placeholder="Password" />
        <button className="login-button">Log In</button>
        <a className="forgot-password" href="#">
          Forgotten password?
        </a>
        <button className="sign-up-button">Create a new account</button>
      </div>
    </div>
  );
}

export default Login;
