/* eslint-disable react/prop-types */
export default function Header({ onToggleAside }) {
  return (
    <>
      <header className="z-[1000]">
        <div className="header leftside">
          {/* Sidebar Toggle 버튼 */}
          <a
            href="#"
            id="openSidebarBtn"
            onClick={(e) => {
              e.preventDefault(); // 기본 동작 방지
              onToggleAside(); // 상태 변경 함수 호출
            }}
          >
            <img
              src="/images/ico/menu_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="menu"
            />
          </a>
          <h1 className="hlogo">AntWork</h1>
        </div>
        <div className="header rightside">
          <a href="#">
            <img
              src="/images/ico/notifications_24dp_5F6368_FILL0_wght400_GRAD0_opsz24 copy.svg"
              alt="alarm"
            />
          </a>
          <a href="#">
            <img src="/images/ico/nav_chat.svg" alt="message" />
          </a>

          <div className="user-info headeruser">
            <img
              src="/images/ico/account_circle_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="profile"
              className="avatar"
            />
            <div className="user-details">
              <h3>최준혁</h3>
              <p>개발팀(팀장)</p>
            </div>
            <a href="#">
              <img
                src="/images/ico/keyboard_arrow_down_20dp_5F6368_FILL0_wght400_GRAD0_opsz20.svg"
                alt="message"
              />
            </a>
          </div>

          <a href="#">
            <img
              src="/images/ico/logout_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="logout"
            />
          </a>
        </div>
      </header>
    </>
  );
}
