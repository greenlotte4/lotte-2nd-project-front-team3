import { useEffect, useRef, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import useModalStore from "../../../store/modalStore";
import { MyDriveFoldersView } from "../../../api/driveAPI";

export default function DriveSection() {
  // 모달 상태 관리를 위한 useState 추가
  const openModal = useModalStore((state) => state.openModal);

  const [menuVisible, setMenuVisible] = useState(false); // 컨텍스트 메뉴 표시 상태
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 }); // 메뉴 위치
  const [isListView, setIsListView] = useState(true); // 리스트와 앨범 뷰 전환 상태

  const [folderStates, setFolderStates] = useState([]);

  // 폴더 데이터를 받아오는 비동기 함수
  const MyDriveView = async () => {
    try {
      const response = await MyDriveFoldersView(); // 필요한 데이터 전송
      console.log("Response data:", response.data);

      // 받아온 데이터를 기반으로 folderStates 배열 업데이트
      const updatedStates = response.data.map((folder) => ({
        isChecked: folder.isChecked || false, // 기본값은 false
        isStarred: folder.isStarred || false, // 기본값은 false
      }));
      setFolderStates(updatedStates); // 상태 배열 업데이트
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    MyDriveView(); // 컴포넌트 마운트 시 폴더 데이터 가져오기
  }, []); // `data`가 변경될 때마다 실행

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
        <article className="drive_header flex-shrink-0">
          <div className="flex justify-between">
            <div className="h-[30px] leading-[30px] text-center">
              <h3>MY DRIVE</h3>
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
              <button className="w-[70px] h-[30px] border rounded-[4px] bg-[#4078ff] text-white">
                업로드
              </button>
              <button
                onClick={() => openModal("insert")}
                className="w-[70px] h-[30px] border rounded-[4px]"
              >
                새폴더
              </button>
              <button className="w-[70px] h-[30px] border rounded-[4px]">
                파일유형
              </button>
            </div>
            <div className="flex space-x-4">
              <button className="drive_List" onClick={() => toggleView("list")}>
                <img
                  src="/images/Antwork/main/drive/list.png"
                  alt=""
                  className="w-[25px] h-[25px]"
                />
              </button>
              <button
                className="drive_Album"
                onClick={() => toggleView("album")}
              >
                <img
                  src="/images/Antwork/main/drive/grid.png"
                  alt=""
                  className="w-[25px] h-[25px]"
                />
              </button>
              <button className="drive_info">
                <img
                  src="/images/Antwork/main/drive/info.png"
                  alt=""
                  className="w-[25px] h-[25px]"
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
                    <th className="w-[2%]">⭐</th>
                    <th className="w-[3%]">종류</th>
                    <th className="w-[20%]">이름</th>
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
                      <td>사용자</td>
                      <td>2024-11-26</td>
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
                    <button
                      className={`absolute top-2 right-2 w-6 h-6 flex items-center justify-center ${
                        folder.isStarred
                          ? "text-yellow-500"
                          : "text-gray-300 group-hover:text-gray-500"
                      }`}
                      onClick={() => toggleFolderStar(index)}
                    >
                      <i
                        className={`fa-star ${
                          folder.isStarred ? "fa-solid" : "fa-regular"
                        }`}
                      ></i>
                    </button>
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
              <i className="fa-solid fa-folder-open mr-2"></i> 열기
            </li>
            <li className="py-1 px-3 hover:bg-gray-100 cursor-pointer">
              <i className="fa-solid fa-folder-plus mr-2 my-2"></i> 새 폴더
            </li>
            <li className="py-1 px-3 hover:bg-gray-100 cursor-pointer">
              <i className="fa-solid fa-file-upload mr-2 my-2"></i> 업로드
            </li>
            <li className="py-1 px-3 hover:bg-gray-100 cursor-pointer">
              <i className="fa-solid fa-file-arrow-down mr-2 my-2"></i> 다운로드
            </li>
            <li className="py-1 px-3 hover:bg-gray-100 cursor-pointer border-t">
              <i className="fa-solid fa-star mr-2 my-2"></i> 즐겨찾기 추가
            </li>
            <li
              onClick={() => {
                console.log("asdf");
                setMenuVisible(false);
                openModal("recycle");
              }}
              className="py-1 px-3 hover:bg-gray-100 cursor-pointer border-t"
            >
              <i className="fa-solid fa-trash mr-2 my-2"></i> 삭제
            </li>
            <li
              onClick={() => {
                console.log("asdf");
                setMenuVisible(false);
                openModal("c_share");
              }}
              className="py-1 px-3 hover:bg-gray-100 cursor-pointer border-t"
            >
              <i className="fa-solid fa-users mr-2 my-2"></i> 공유하기
            </li>
            <li
              onClick={() => {
                console.log("asdf");
                setMenuVisible(false);
                openModal("move");
              }}
              className="py-1 px-3 hover:bg-gray-100 cursor-pointer border-t"
            >
              <i className="fa-solid fa-plane mr-2 my-2"></i> 이동하기
            </li>
            <li
              onClick={() => {
                setMenuVisible(false);
                openModal("name");
              }}
              className="py-1 px-3 hover:bg-gray-100 cursor-pointer border-t"
            >
              <i className="fa-solid fa-pen mr-2 my-2"></i> 이름 바꾸기
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
