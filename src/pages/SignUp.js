import "./SignUp.css";
function SignUp() {
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];
  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="title">Sign Up</div>
        <div className="description">It's quick and easy</div>
        <div className="person-name">
          <input className="fname" type="text" placeholder="First name" />
          <input className="lname" type="text" placeholder="Surname" />
        </div>
        <div></div>
        <input
          className="mobile-email"
          type="text"
          placeholder="Mobile number or email address"
        />
        <input
          className="new-password"
          type="text"
          placeholder="New password"
        />
        {/* <div className="dob"> */}
        {/* <input type="number" min={1} max={31} /> */}
        {/* <Select id="month" options={months}/> */}
        {/* </div> */}
        <div className="gender">
          Gender
          <br />
          <br />
          <label className="female">
            Female
            <input type="radio" value="option1" name="options" />
          </label>
          <label className="male">
            Male
            <input type="radio" value="option2" name="options" />
          </label>
          <label className="male">
            Custom
            <input type="radio" value="option3" name="options" />
          </label>
        </div>

        <button className="sign-up-btn">Sign Up</button>
      </div>
    </div>
  );
}
export default SignUp;
