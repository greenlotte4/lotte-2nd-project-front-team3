export default function PageAside() {
  return (
    <>
      <aside className="sidebar">
        <div className="logo">
          <span className="sub-title">Notice Board</span>
          <button className="image-button-css" aria-label="등록"></button>
          <span className="title">게시판</span>
        </div>
        <ul className="lnb">
          <li className="lnb-item">
            <div className="lnb-header">
              <img
                src="../../../public/images/ico/keyboard_arrow_down_20dp_5F6368_FILL0_wght400_GRAD0_opsz20.svg"
                className="cate-icon"
              />
              <span className="main-cate">게시판 카테고리</span>
            </div>
            <ol>
              <li>
                <a href="#">
                  <img src="../../../public/images/ico/subdirectory_arrow_right_20dp_CCCCCC_FILL0_wght400_GRAD0_opsz20.svg" />
                  &nbsp;&nbsp;게시판1
                </a>
              </li>
            </ol>
          </li>
          <li className="lnb-item">
            <div className="lnb-header">
              <img
                src="../../../public/images/ico/keyboard_arrow_down_20dp_5F6368_FILL0_wght400_GRAD0_opsz20.svg"
                className="cate-icon"
              />
              <span className="main-cate">게시판 카테고리</span>
            </div>
            <ol>
              <li>
                <a href="#">
                  <img src="../../../public/images/ico/subdirectory_arrow_right_20dp_CCCCCC_FILL0_wght400_GRAD0_opsz20.svg" />
                  &nbsp;&nbsp;게시판1
                </a>
              </li>
            </ol>
          </li>
          <li className="lnb-item">
            <div className="lnb-header">
              <img
                src="../../../public/images/ico/keyboard_arrow_down_20dp_5F6368_FILL0_wght400_GRAD0_opsz20.svg"
                className="cate-icon"
              />
              <span className="main-cate">게시판 카테고리</span>
            </div>
            <ol>
              <li>
                <a href="#">
                  <img src="../../../public/images/ico/subdirectory_arrow_right_20dp_CCCCCC_FILL0_wght400_GRAD0_opsz20.svg" />
                  &nbsp;&nbsp;게시판1
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="../../../public/images/ico/subdirectory_arrow_right_20dp_CCCCCC_FILL0_wght400_GRAD0_opsz20.svg" />
                  &nbsp;&nbsp;게시판1
                </a>
              </li>
            </ol>
          </li>
        </ul>
      </aside>
    </>
  );
}
