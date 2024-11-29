import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <body className="member_body">
      <div className="wrapper">
        <div className="content">
          <img
            src="images/Antwork/member/login.png"
            alt="login_img"
            className="login_img"
          />
          <div className="login-box">
            <h1 className="logo">
              <Link to="/">
                <img
                  src="images/Lending/antwork_logo.png"
                  alt="antwork 로고"
                  className="ml-[7.5rem] w-[146px] h-[47px]"
                />
              </Link>
            </h1>

            <form className="login_form">
              <label className="email_lbl">ID</label>
              <input
                type="email"
                className="email"
                placeholder="Enter your email"
              />
              <label className="pass_lbl">Password</label>
              <input
                type="password"
                className="password"
                placeholder="Enter your password"
              />
              <button type="submit" className="btn">
                Sign In
              </button>
            </form>
            <p className="signup-text">
              계정이 없으신가요? <Link to="/terms">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </body>
  );
}
