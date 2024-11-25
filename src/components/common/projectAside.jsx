export default function ProjectAside({ asideVisible }) {
  return (
    <>
      <aside className={`sidebar`}>
        <div className="logo !border-b-0">
          <span className="sub-title">My Projects</span>

          <span className="title">Projects</span>
          <button className="w-full flex items-center justify-center space-x-2 p-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 mt-6 h-14 bg-[#D9E8FF]">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-xl">New Project</span>
          </button>
        </div>
        <ul className="a mt-20">
          <li className="">
            <a
              href="#"
              className="w-[195px] h-[40px] flex items-center border-b border-[#d9d9d9] mb-[15px]"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden mr-4">
                <img
                  src="../../../public/images/Antwork/project/project_home.png"
                  alt="Description"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="main-cate">프로젝트 홈</span>
            </a>
          </li>

          <li className="lnb-item w-[195px] h-auto items-center border-b border-[#d9d9d9] mb-[15px]">
            <div className="lnb-header">
              <img
                src="../../../public/images/ico/keyboard_arrow_down_20dp_5F6368_FILL0_wght400_GRAD0_opsz20.svg"
                className="cate-icon"
              />
              <span className="main-cate">진행중인 프로젝트</span>
            </div>
            <a href="#" className="flex ml-[10px] mb-[10px] text-lg">
              <img src="../../../public/images/ico/subdirectory_arrow_right_20dp_CCCCCC_FILL0_wght400_GRAD0_opsz20.svg" />
              프로젝트1
            </a>
            <a href="#" className="flex ml-[10px] mb-[10px] text-lg">
              <img src="../../../public/images/ico/subdirectory_arrow_right_20dp_CCCCCC_FILL0_wght400_GRAD0_opsz20.svg" />
              프로젝트2
            </a>
          </li>
          <li className="lnb-item w-[195px] h-auto items-center">
            <div className="lnb-header">
              <img
                src="../../../public/images/ico/keyboard_arrow_down_20dp_5F6368_FILL0_wght400_GRAD0_opsz20.svg"
                className="cate-icon"
              />
              <span className="main-cate">완료한 프로젝트</span>
            </div>
            <a href="#" className="flex ml-[10px] mb-[10px] text-lg">
              <img src="../../../public/images/ico/subdirectory_arrow_right_20dp_CCCCCC_FILL0_wght400_GRAD0_opsz20.svg" />
              프로젝트1
            </a>
            <a href="#" className="flex ml-[10px] mb-[10px] text-lg">
              <img src="../../../public/images/ico/subdirectory_arrow_right_20dp_CCCCCC_FILL0_wght400_GRAD0_opsz20.svg" />
              프로젝트2
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}
