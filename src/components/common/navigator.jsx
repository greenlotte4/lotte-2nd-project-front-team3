import { Link } from "react-router-dom";

export default function Navigator() {
  return (
    <>
      <nav className="nav-menu ">
        <div className="nav-item">
          <Link to="/antwork/">
            <img
              src="../../../public/images/ico/home_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="home"
            />
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/antwork/profile">
            <img
              src="../../../public/images/ico/assignment_ind_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="member"
            />
          </Link>
        </div>

        <div className="nav-item">
          <Link to="/antwork/calendar">
            <img
              src="../../../public/images/ico/event_available_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="calendar"
            />
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/antwork/chatting">
            <img src="../../../public/images/ico/nav_chat.svg" alt="message" />
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/antwork/page">
            <img
              src="../../../public/images/ico/edit_document_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="page"
            />
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/antwork/project/main">
            <img
              src="../../../public/images/ico/group_add_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="project"
            />
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/antwork/board">
            <img
              src="../../../public/images/ico/content_paste_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="board"
            />
          </Link>
        </div>

        <div className="nav-item">
          <Link to="/antwork/drive">
            <img
              src="../../../public/images/ico/cloud_download_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="drive"
            />
          </Link>
        </div>
        <div className="nav-item">
          <a href="#">
            <img
              src="../../../public/images/ico/settings_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="setting"
            />
          </a>
        </div>
      </nav>
    </>
  );
}
