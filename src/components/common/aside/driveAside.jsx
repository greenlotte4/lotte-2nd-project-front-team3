import { useState } from "react";

export default function DriveAside({ asideVisible }) {
  const [isMyOpen, setIsMyOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  return (
    <>
      <aside className={`sidebar ${!asideVisible ? "hidden" : ""} table-cell`}>
        <div className="logo !border-b-0">
          <span className="sub-title">My Drives</span>

          <span className="title">DRIVE</span>
          <button
            className="w-full flex items-center justify-center space-x-2 p-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 mt-6 h-14"
            style={{ backgroundColor: "#D9E8FF" }}
          >
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
            <span className="text-xl">New Folder</span>
          </button>
        </div>
        <ul className="a mt-20">
          <li className="">
            <div>
              <a
                href="#"
                className="w-[195px] h-[40px] flex items-center border-b border-[#d9d9d9] mb-[15px]"
              >
                <span
                  className="m-[3px] cursor-pointer"
                  onClick={() => setIsMyOpen(!isMyOpen)}
                >
                  <img
                    src={
                      isMyOpen
                        ? "../../../public/images/Antwork/main/drive/위화살표.png"
                        : "../../../public/images/Antwork/main/drive/아래화살표.png"
                    }
                    alt="화살표 아이콘"
                    className="w-4 h-4"
                  />
                </span>

                <div className="w-7 h-7 rounded-lg overflow-hidden mr-2">
                  <img
                    src="../../../public/images/Antwork/main/drive/내드라이브.png"
                    alt="Description"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="main-cate">내 드라이브</span>
              </a>
            </div>
            <div
              className={`Mydrive_List transition-all duration-300 overflow-hidden ${
                isMyOpen ? "max-h-screen" : "max-h-0"
              } pl-8`}
            >
              <ul>
                <li>
                  <a href="#">
                    <div className="flex items-start items-center mb-2 space-x-4 text-center">
                      <img
                        src="../../../public/images/Antwork/main/drive/폴더.png"
                        alt="#"
                        className="w-7 h-7"
                      />
                      <span>안녕</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="flex items-start items-center mb-2 space-x-4 text-center">
                      <img
                        src="../../../public/images/Antwork/main/drive/폴더.png"
                        alt="#"
                        className="w-7 h-7"
                      />
                      <span>안녕</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="">
            <div>
              <a
                href="#"
                className="w-[195px] h-[40px] flex items-center border-b border-[#d9d9d9] mb-[15px]"
              >
                <span
                  className="m-[3px] cursor-pointer"
                  onClick={() => setIsShareOpen(!isShareOpen)}
                >
                  <img
                    src={
                      isShareOpen
                        ? "../../../public/images/Antwork/main/drive/위화살표.png"
                        : "../../../public/images/Antwork/main/drive/아래화살표.png"
                    }
                    alt="화살표 아이콘"
                    className="w-4 h-4"
                  />
                </span>

                <div className="w-7 h-7 rounded-lg overflow-hidden mr-2">
                  <img
                    src="../../../public/images/Antwork/main/drive/공유드라이브.png"
                    alt="Description"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="main-cate">공유 드라이브</span>
              </a>
            </div>
            <div
              className={`Mydrive_List transition-all duration-300 overflow-hidden ${
                isShareOpen ? "max-h-screen" : "max-h-0"
              } pl-8`}
            >
              <ul>
                <li>
                  <a href="#">
                    <div className="flex items-start items-center mb-2 space-x-4 text-center">
                      <img
                        src="../../../public/images/Antwork/main/drive/폴더.png"
                        alt="#"
                        className="w-7 h-7"
                      />
                      <span>안녕</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="flex items-start items-center mb-2 space-x-4">
                      <img
                        src="../../../public/images/Antwork/main/drive/폴더.png"
                        alt="#"
                        className="w-7 h-7"
                      />
                      <span>안녕</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
}
