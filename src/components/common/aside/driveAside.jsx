import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DriveModal from "../modal/driveModal";
import useModalStore from "../../../store/modalStore";

export default function DriveAside({ asideVisible }) {
  // 모달 상태 관리를 위한 useState 추가
  const openModal = useModalStore((state) => state.openModal);

  const [isMyOpen, setIsMyOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const HorizontalBar = ({ usedSpace, totalSpace }) => {
    const [percentage, setPercentage] = useState(0);

    // 데이터가 변경될 때마다 퍼센트 계산
    useEffect(() => {
      if (totalSpace > 0) {
        setPercentage((usedSpace / totalSpace) * 100);
      }
    }, [usedSpace, totalSpace]);

    return (
      <div className="w-full max-w-xl mx-auto mt-6">
        {/* 배경 막대 */}
        <div className="flex mb-2 items-center justify-between">
          <span className="text-sm text-gray-600">{usedSpace} GB</span>
          <span className="text-sm text-gray-600">{totalSpace} GB</span>
        </div>

        <div className="w-full bg-gray-300 rounded-full h-4">
          {/* 실제 사용된 용량을 표시하는 막대 */}
          <div
            className="bg-blue-500 h-4 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        {/* 퍼센트 표시 */}
        <div className="text-center text-sm mt-2">{percentage.toFixed(2)}%</div>
      </div>
    );
  };

  return (
    <>
      <aside className={`sidebar ${!asideVisible ? "hidden" : ""} table-cell`}>
        <div className="logo !border-b-0">
          <span className="sub-title">My Drives</span>

          <span className="title">DRIVE</span>
          <button
            onClick={() => openModal("insert")}
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
        <DriveModal />
        <ul className="a mt-20">
          <li className="">
            <div className="flex items-center border-b border-[#d9d9d9] mb-[10px]">
              <span
                className="m-[3px] cursor-pointer"
                onClick={() => setIsMyOpen(!isMyOpen)}
              >
                <img
                  src={
                    isMyOpen
                      ? "images/Antwork/main/drive/위화살표.png"
                      : "images/Antwork/main/drive/아래화살표.png"
                  }
                  alt="화살표 아이콘"
                  className="w-4 h-4"
                />
              </span>
              <Link
                to="/antwork/drive"
                href="#"
                className="w-[195px] h-[40px] flex items-center"
              >
                <span className="main-cate">내 드라이브</span>
              </Link>
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
                        src="images/Antwork/main/drive/폴더.png"
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
                        src="images/Antwork/main/drive/폴더.png"
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
            <div className="flex items-center border-b border-[#d9d9d9] mb-[10px]">
              <span
                className="m-[3px] cursor-pointer"
                onClick={() => setIsShareOpen(!isShareOpen)}
              >
                <img
                  src={
                    isShareOpen
                      ? "images/Antwork/main/drive/위화살표.png"
                      : "images/Antwork/main/drive/아래화살표.png"
                  }
                  alt="화살표 아이콘"
                  className="w-4 h-4"
                />
              </span>
              <Link
                to="/antwork/drive/share"
                href="#"
                className="w-[195px] h-[40px] flex items-center"
              >
                <span className="main-cate">공유 드라이브</span>
              </Link>
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
                        src="images/Antwork/main/drive/폴더.png"
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
                        src="images/Antwork/main/drive/폴더.png"
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
                        src="images/Antwork/main/drive/폴더.png"
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
                        src="images/Antwork/main/drive/폴더.png"
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
          <li className="lnb-item mt-[30px]">
            <div className="lnb-header !mb-[10px]">
              <img
                src="/images/ico/page_delete24_999999.svg"
                className="cate-icon !w-[22px] !h-[22px]"
              />
              <Link
                to="/antwork/drive/recycle"
                className="main-cate !text-[16px] text-[#757575]"
              >
                휴지통
              </Link>
            </div>
            <div className="lnb-header !mb-[10px]">
              <img
                src="/images/Antwork/main/drive/kid_star.png"
                className="cate-icon !w-[22px] !h-[22px]"
              />
              <Link
                to="/antwork/drive"
                className="main-cate !text-[16px] text-[#757575]"
              >
                즐겨찾기
              </Link>
            </div>
            <div className="lnb-header !mb-[10px]">
              <img
                src="/images/ico/page_setting_22_999999.svg"
                className="cate-icon !w-[22px] !h-[22px]"
              />
              <Link
                to="/antwork/drive"
                className="main-cate !text-[16px] text-[#757575]"
              >
                설정
              </Link>
            </div>
          </li>
          <li className="lnb-item">
            <div className="lnb-header !mb-[10px] w-[180px]">
              <HorizontalBar usedSpace={120} totalSpace={150} />
              <Link
                to="/antwork/drive/recycle"
                className="main-cate !text-[16px] text-[#757575]"
              ></Link>
            </div>
          </li>
        </ul>
      </aside>
    </>
  );
}
