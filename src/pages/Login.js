import "./Login.css";

function Login() {
  return (
    <div className="login-container">
      <div className="facebook">
        <div className="facebook-logo">facebook</div>
        <div className="description">
          Facebook helps you connect and share with the people in your life
        </div>
      </div>
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
