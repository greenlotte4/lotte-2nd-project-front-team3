import { useEffect, useRef, useState } from "react";
import useModalStore from "../../../store/modalStore";

export default function DriveRecylceSection() {
  // 모달 상태 관리를 위한 useState 추가
  const openModal = useModalStore((state) => state.openModal);

  const [menuVisible, setMenuVisible] = useState(false); // 컨텍스트 메뉴 표시 상태
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 }); // 메뉴 위치
  const [isListView, setIsListView] = useState(true); // 리스트와 앨범 뷰 전환 상태

  const [folderStates, setFolderStates] = useState([
    { isChecked: false, isStarred: false }, // 폴더1 상태
    { isChecked: false, isStarred: false }, // 폴더2 상태
    { isChecked: false, isStarred: false }, // 폴더3 상태
  ]);

  const menuRef = useRef(null);

  const handleContextMenu = (event, index) => {
    event.preventDefault(); // 기본 오른쪽 클릭 메뉴 방지
    const { clientX, clientY } = event; // 클릭한 위치 좌표
    setMenuPosition({ x: clientX, y: clientY });
    setMenuVisible(true); // 커스텀 메뉴 열기

    // 클릭한 폴더만 체크박스 선택, 나머지는 해제
    setFolderStates((prevStates) =>
      prevStates.map((state, idx) => ({
        ...state,
        isChecked: idx === index, // 클릭한 인덱스만 true
      }))
    );
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleCloseMenu(); // 메뉴 외부 클릭 시 닫기
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // 리스트/앨범 뷰 전환 함수
  const toggleView = (viewType) => {
    if (viewType === "list") {
      setIsListView(true);
    } else if (viewType === "album") {
      setIsListView(false);
    }
  };

  // 체크박스 상태 토글
  const toggleFolderCheck = (index) => {
    setFolderStates((prevStates) =>
      prevStates.map((state, idx) =>
        idx === index ? { ...state, isChecked: !state.isChecked } : state
      )
    );
  };

  // 중요도 별표 상태 토글
  const toggleFolderStar = (index) => {
    setFolderStates((prevStates) =>
      prevStates.map((state, idx) =>
        idx === index ? { ...state, isStarred: !state.isStarred } : state
      )
    );
  };

  return (
    <>
      <div className="bg-white p-[40px] rounded-[8px] border-none h-[850px] flex flex-col overflow-hidden">
        <article className="dirve_header flex-shrink-0">
          <div className="flex justify-between">
            <div className="h-[30px] leading-[30px] text-center">
              <h3>휴지통</h3>
            </div>
            <div className="border w-[250px] h-[30px] rounded-[4px] flex items-center">
              <input
                className="bg-[#D9E8FF] w-[190px] h-[30px] rounded-[4px] pl-[3px]"
                type="text"
                value={null}
                name="drive_search"
                placeholder="파일검색"
              />
              <button className="mx-[4px] w-[20px] h-[15px]">
                <img
                  src="/images/Antwork/main/drive/arrow_drop_down.png"
                  alt=""
                />
              </button>
              <button className="mx-[5px] w-[20px] h-[15px]">
                <img src="/images/Antwork/main/drive/search.png" alt="" />
              </button>
            </div>
          </div>
        </article>

        <article className="drive_update flex-shrink-0 my-[20px]">
          <div className="flex justify-between">
            <div className="drive_active flex space-x-2">
              <button className="w-[90px] h-[30px] border rounded-[4px] mx-[5px] bg-[#4078ff] text-white">
                휴지통 비우기
              </button>
            </div>
            <div>
              <button className="drive_List" onClick={() => toggleView("list")}>
                <img
                  src="/images/Antwork/main/drive/list.png"
                  alt=""
                  className="w-[25px] h-[25px] mx-[10px]"
                />
              </button>
              <button
                className="drive_Album"
                onClick={() => toggleView("album")}
              >
                <img
                  src="/images/Antwork/main/drive/grid.png"
                  alt=""
                  className="w-[25px] h-[25px] mx-[10px]"
                />
              </button>
              <button className="drive_info">
                <img
                  src="/images/Antwork/main/drive/info.png"
                  alt=""
                  className="w-[25px] h-[25px] mx-[10px]"
                />
              </button>
            </div>
          </div>
        </article>
        <article className="drive_main flex-grow overflow-y-auto">
          <div>
            {isListView ? (
              // 리스트 뷰
              <table className="w-full border-y">
                <thead>
                  <tr className="h-14">
                    <th className="w-[3%]">
                      <input type="checkbox" />
                    </th>
                    <th className="w-[3%]">종류</th>
                    <th className="w-[30%]">이름</th>
                    <th className="w-[10%]">크기</th>
                    <th className="w-[10%]">사용자</th>
                    <th className="w-[10%]">삭제한날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {folderStates.map((folder, index) => (
                    <tr
                      key={index}
                      className={`text-center align-middle h-16 border-t hover:bg-gray-100 ${
                        folder.isChecked ? "bg-blue-50" : ""
                      }`}
                      onContextMenu={(e) => handleContextMenu(e, index)} // 커스텀 메뉴 표시
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={folder.isChecked}
                          onChange={() => toggleFolderCheck(index)}
                        />
                      </td>
                      <td>
                        <i className="fa-solid fa-file-lines text-[16px] text-[#6D8EC2] !hidden"></i>
                        <i className="fa-solid fa-image text-[16px] text-[#779C76] !hidden"></i>
                        <i className="fa-solid fa-file-zipper text-[16px] text-[#6B5E69] !hidden"></i>
                        <i className="fa-solid fa-file-fragment text-[16px] text-[#7559AB] !hidden"></i>
                        <i className="fa-solid fa-folder text-[16px] text-[#FFC558]"></i>
                        <i className="fa-solid fa-file-import text-[16px] text-[#847E8C] !hidden"></i>
                      </td>
                      <td>폴더 {index + 1}</td>
                      <td>3MB</td>
                      <td>챱챱김</td>
                      <td>2022-11-26</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              // 앨범 뷰
              <div className="grid grid-cols-10 gap-8">
                {folderStates.map((folder, index) => (
                  <div
                    key={index}
                    className={`relative border p-4 group rounded-md ${
                      folder.isChecked
                        ? "bg-blue-50 border-blue-500"
                        : "hover:bg-gray-100"
                    } transition`}
                    onContextMenu={(e) => handleContextMenu(e, index)} // 커스텀 메뉴 표시
                  >
                    <div
                      className={`absolute top-2 left-2 w-6 h-6 rounded-md flex items-center justify-center cursor-pointer border ${
                        folder.isChecked
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-400 border-gray-300 group-hover:border-gray-500"
                      } ${
                        folder.isChecked
                          ? ""
                          : "opacity-0 group-hover:opacity-100"
                      } transition-opacity`}
                      onClick={() => toggleFolderCheck(index)}
                    >
                      {folder.isChecked && (
                        <i className="fa-solid fa-check"></i>
                      )}
                    </div>
                    <i className="fa-solid fa-folder text-[43px] text-[#FFC558] mx-20 my-[25px]"></i>
                    <i className="fa-solid fa-file-lines text-[16px] text-[#6D8EC2] !hidden mx-20 my-[25px]"></i>
                    <i className="fa-solid fa-image text-[16px] text-[#779C76] !hidden mx-20 my-[25px]"></i>
                    <i className="fa-solid fa-file-zipper text-[16px] text-[#6B5E69] !hidden mx-20 my-[25px]"></i>
                    <i className="fa-solid fa-file-fragment text-[16px] text-[#7559AB] !hidden mx-20 my-[25px]"></i>
                    <i className="fa-solid fa-file-import text-[16px] text-[#847E8C] !hidden mx-20 my-[25px]"></i>
                    <div className="text-center mt-2">폴더 {index + 1}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>
      {/* 커스텀 메뉴 */}
      {menuVisible && (
        <div
          ref={menuRef}
          style={{
            position: "absolute",
            top: `${menuPosition.y}px`,
            left: `${menuPosition.x}px`,
            zIndex: 50,
          }}
          className="w-[200px] bg-white shadow-lg border rounded-md py-2"
        >
          <ul>
            <li className="py-1 px-3 hover:bg-gray-100 cursor-pointer">
              <i className="fa-solid fa-folder-plus mr-2"></i> 복원
            </li>
            <li
              onClick={() => {
                setMenuVisible(false);
                openModal("delete");
              }}
              className="py-1 px-3 hover:bg-gray-100 cursor-pointer"
            >
              <i className="fa-solid fa-trash mr-2"></i> 삭제
            </li>
            <li className="py-1 px-3 hover:bg-gray-100 cursor-pointer">
              <i className="fa-solid fa-circle-info mr-2"></i> 상세정보
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
