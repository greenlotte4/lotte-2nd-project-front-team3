import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="member_body">
      <div id="container">
        <div id="register_div">
          <img
            id="register_img"
            src="../../../public/images/Antwork/member/register.png"
            alt="#"
          />
          <form className="register_form">
            <div className="register_one">
              <img className="register_logoimg" alt="#" />
              <span className="register_title">Register</span>
              <span className="register_logo">회원가입 페이지입니다.</span>

              <p>Name</p>
              <input
                type="text"
                className="register_name"
                name="register_name"
              />

              <p>Password</p>
              <input
                type="text"
                className="register_pass"
                name="register_pass"
              />

              <p>Confirm Password</p>
              <input
                type="text"
                className="register_pass2"
                name="register_pass2"
              />

              <p>Nick</p>
              <input
                type="text"
                className="register_nick"
                name="register_nick"
              />

              <p>Email</p>
              <input
                type="email"
                className="register_email"
                name="register_email"
              />

              <p>EmailCode</p>
              <input
                type="text"
                className="register_emailcode"
                name="register_emailcode"
              />
            </div>
            <div className="register_second">
              <p>Hp</p>
              <input type="tel" className="register_hp" name="register_hp" />

              <p>Address</p>
              <input
                type="text"
                className="register_postcode"
                name="register_postcode"
              />
              <input
                type="text"
                className="register_addr1"
                name="register_addr1"
              />
              <input
                type="text"
                className="register_addr2"
                name="register_addr2"
              />

              <p>Company Code</p>
              <input
                type="text"
                className="register_company"
                name="register_company"
              />

              <div className="register_btn">
                <Link to="/terms" className="register_prev">
                  prev
                </Link>
                <button className="register_sign">sign up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
