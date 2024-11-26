import { useEffect, useRef, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome import

export default function DriveSection() {
  const [isChecked, setIsChecked] = useState(false);
  const [isStarFilled, setIsStarFilled] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); // 컨텍스트 메뉴 표시 상태
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 }); // 메뉴 위치

  const [isListView, setIsListView] = useState(true); // 리스트와 앨범 뷰 전환 상태

  const [folderStates, setFolderStates] = useState([
    { isChecked: false, isStarred: false }, // 폴더1 상태
    { isChecked: false, isStarred: false }, // 폴더2 상태
    { isChecked: false, isStarred: false }, // 폴더3 상태
  ]);

  const menuRef = useRef(null);

  const handleContextMenu = (event) => {
    event.preventDefault(); // 기본 오른쪽 클릭 메뉴 방지
    const { clientX, clientY } = event; // 클릭한 위치 좌표
    setMenuPosition({ x: clientX, y: clientY });
    setMenuVisible(true); // 커스텀 메뉴 열기
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  const handleRowClick = () => {
    setIsChecked(!isChecked); // 체크 상태를 반전
  };

  const toggleStar = () => {
    setIsStarFilled(!isStarFilled);
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
    // 클릭 시 상태 변경
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
      <div className="bg-white p-[40px] rounded-[8px] border-none">
        <article className="dirve_header">
          <div className="flex justify-between">
            <div className="h-[30px] leading-[30px] text-center">
              <h3>MY DRIVE</h3>
            </div>
            <div className="border w-[250px] h-[30px] rounded-[4px]">
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

        <article className="drive_update">
          <div className="flex justify-between my-[20px]">
            <div className="drive_active">
              <button className="w-[70px] h-[30px] border rounded-[4px] mx-[5px] bg-[#4078ff] text-white">
                업로드
              </button>
              <button className="w-[70px] h-[30px] border rounded-[4px] mx-[2px]">
                새폴더
              </button>
              <button className="w-[70px] h-[30px] border rounded-[4px] mx-[2px]">
                파일유형
              </button>
            </div>
            <div className="hidden">
              <button>다운로드</button>
              <button>공유</button>
              <button>삭제</button>
              <button>이름바꾸기</button>
              <button>이동</button>
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
        <article className="drive_main">
          <div>
            {isListView ? (
              // 리스트 뷰
              <table className="w-full border-y">
                <thead>
                  <tr className="h-14">
                    <th className="w-[3%]">
                      <input type="checkbox" />
                    </th>
                    <th className="w-[3%]">⭐</th>
                    <th className="w-[30%]">이름</th>
                    <th className="w-[10%]">크기</th>
                    <th className="w-[10%]">소유자</th>
                    <th className="w-[10%]">날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {folderStates.map((folder, index) => (
                    <tr
                      key={index}
                      className={`text-center align-middle h-16 border-t hover:bg-gray-100 ${
                        folder.isChecked ? "bg-blue-50" : ""
                      }`}
                    >
                      <td>
                        <input
                          type="checkbox"
                          checked={folder.isChecked}
                          onChange={() => toggleFolderCheck(index)}
                        />
                      </td>
                      <td>
                        <button onClick={() => toggleFolderStar(index)}>
                          <i
                            className={`fa-star cursor-pointer text-xl ${
                              folder.isStarred
                                ? "fa-solid text-yellow-500"
                                : "fa-regular text-gray-300"
                            }`}
                          ></i>
                        </button>
                      </td>
                      <td>{folder.name}</td>
                      <td>{folder.size}</td>
                      <td>{folder.owner}</td>
                      <td>{folder.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              // 앨범 뷰
              <div className="grid grid-cols-3 gap-4">
                {folderStates.map((folder, index) => (
                  <div
                    key={index}
                    className={`relative border p-4 group rounded-md ${
                      folder.isChecked
                        ? "bg-blue-50 border-blue-500"
                        : "hover:bg-gray-100"
                    } transition`}
                  >
                    {/* 체크박스 */}
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

                    {/* 폴더 아이콘 */}
                    <img
                      src="/images/folder_icon.png"
                      alt={`폴더${index + 1}`}
                      className="w-[50px] h-[50px] mx-auto mb-2"
                    />
                    <p>폴더 {index + 1}</p>
                    <p>3MB</p>

                    {/* 별표 */}
                    <i
                      className={`absolute top-2 right-2 fa-regular fa-star cursor-pointer text-xl ${
                        folder.isStarred
                          ? "fa-solid text-yellow-500"
                          : "fa-regular text-gray-300"
                      } ${
                        folder.isStarred
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                      } transition-opacity`}
                      onClick={() => toggleFolderStar(index)}
                    ></i>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>

        {/* 오른쪽 마우스 버튼클릭시 나오는 외부메뉴 */}
        {menuVisible && (
          <div
            ref={menuRef}
            className="absolute bg-white border border-gray-300 shadow-lg z-50"
            style={{ left: `${menuPosition.x}px`, top: `${menuPosition.y}px` }}
            onClick={handleCloseMenu} // 메뉴 외부 클릭 시 닫기
          >
            <ul className="p-2">
              <li className="cursor-pointer py-1 px-2 hover:bg-gray-100">
                열기
              </li>
              <li className="cursor-pointer py-1 px-2 hover:bg-gray-100">
                업로드
              </li>
              <li className="cursor-pointer py-1 px-2 hover:bg-gray-100">
                다운로드
              </li>
              <li className="cursor-pointer py-1 px-2 hover:bg-gray-100">
                삭제
              </li>
              <li className="cursor-pointer py-1 px-2 hover:bg-gray-100">
                이동
              </li>
              <li className="cursor-pointer py-1 px-2 hover:bg-gray-100">
                상세보기
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
