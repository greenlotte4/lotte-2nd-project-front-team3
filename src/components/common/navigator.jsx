import { Link } from "react-router-dom";

export default function Navigator() {
  return (
    <>
      <nav className="nav-menu">
        <div className="nav-item">
          <Link to="/antWork/">
            <img
              src="../../../public/images/ico/home_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="home"
            />
          </Link>
        </div>
        <div className="nav-item">
          <a href="#">
            <img
              src="../../../public/images/ico/assignment_ind_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="member"
            />
          </a>
        </div>

        <div className="nav-item">
          <a href="#">
            <img
              src="../../../public/images/ico/event_available_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="calendar"
            />
          </a>
        </div>
        <div className="nav-item">
          <a href="#">
            <img
              src="../../../public/images/ico/mail_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="message"
            />
          </a>
        </div>
        <div className="nav-item">
          <Link to="/antWork/page">
            <img
              src="../../../public/images/ico/edit_document_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="page"
            />
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/antwork/project">
            <img
              src="../../../public/images/ico/group_add_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="project"
            />
          </Link>
        </div>
        <div className="nav-item">
          <a href="#">
            <img
              src="../../../public/images/ico/content_paste_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="board"
            />
          </a>
        </div>

        <div className="nav-item">
          <a href="#">
            <img
              src="../../../public/images/ico/cloud_download_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg"
              alt="drive"
            />
          </a>
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
