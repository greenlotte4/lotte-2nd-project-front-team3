import { useEffect, useRef, useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome import

export default function DriveSection() {
  const [isChecked, setIsChecked] = useState(false);
  const [isStarFilled, setIsStarFilled] = useState(false);

  const [menuVisible, setMenuVisible] = useState(false); // 컨텍스트 메뉴 표시 상태
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 }); // 메뉴 위치

  // 메뉴 외부 클릭을 감지할 ref
  const menuRef = useRef(null);

  // 컨텍스트 메뉴 이벤트 처리
  const handleContextMenu = (event) => {
    event.preventDefault(); // 기본 오른쪽 클릭 메뉴 방지
    const { clientX, clientY } = event; // 클릭한 위치 좌표
    setMenuPosition({ x: clientX, y: clientY });
    setMenuVisible(true); // 커스텀 메뉴 열기
  };

  // 커스텀 메뉴 닫기
  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  const handleRowClick = () => {
    setIsChecked(!isChecked); // 체크 상태를 반전
  };

  // 클릭 시 별 상태를 토글하는 함수
  const toggleStar = () => {
    setIsStarFilled(!isStarFilled);
  };

  // 메뉴 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        handleCloseMenu(); // 메뉴 외부 클릭 시 닫기
      }
    };

    // 문서에서 클릭 이벤트 리스너 추가
    document.addEventListener("click", handleClickOutside);

    // 컴포넌트 언마운트 시 리스너 제거
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  //   // 여러 행에 대한 별 상태를 관리하기 위해 배열로 관리
  //   const [stars, setStars] = useState([false, false, false]); // 예시로 3개의 행

  //   // 클릭 시 별 상태를 토글하는 함수
  //   const toggleStar = (index) => {
  //     const updatedStars = [...stars]; // 기존 상태 복사
  //     updatedStars[index] = !updatedStars[index]; // 해당 행의 별 상태만 토글
  //     setStars(updatedStars); // 상태 업데이트
  //   };
  //   <button onClick={() => toggleStar(index)}>
  //   <i
  //     className={`fa-regular fa-star cursor-pointer text-xl ${
  //       isStarFilled ? "text-yellow-500" : "text-gray-300"
  //     }`}
  //   ></i>
  // </button>

  //   const [data, setData] = useState([]); // 데이터 상태
  //   const [checkedRows, setCheckedRows] = useState({}); // 각 행의 체크 상태 관리

  //   // 데이터베이스에서 데이터를 불러오는 함수 (예시)
  //   useEffect(() => {
  //     // 예시로 데이터베이스에서 데이터를 가져오는 부분을 mock 데이터로 대체
  //     const fetchData = async () => {
  //       const response = await fetch("/api/data"); // 실제 API 호출로 대체
  //       const result = await response.json();
  //       setData(result); // 데이터를 상태에 설정
  //     };
  //     fetchData();
  //   }, []);

  //   const handleRowClick = (id) => {
  //     setCheckedRows((prevState) => ({
  //       ...prevState,
  //       [id]: !prevState[id], // 해당 id의 체크 상태 반전
  //     }));
  //   };
  // {data.length > 0 ? (
  //     data.map((row) => (
  //       <tr
  //         key={row.id}
  //         className="text-center align-middle h-16 border-t hover:bg-gray-100 cursor-pointer"
  //         onClick={() => handleRowClick(row.id)} // 각 행을 클릭할 때 해당 id로 상태 변경
  //       >
  //         <td>
  //           <input
  //             type="checkbox"
  //             checked={!!checkedRows[row.id]} // 해당 id의 체크 상태에 맞게 체크박스 상태
  //             onChange={() => handleRowClick(row.id)} // 상태 변경 함수 호출
  //           />
  //         </td>

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
              <button className="drive_List">
                <img
                  src="/images/Antwork/main/drive/list.png"
                  alt=""
                  className="w-[25px] h-[25px] mx-[10px]"
                />
              </button>
              <button className="drive_Album">
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
            <table className="w-full border-y">
              <thead>
                <tr className="h-14">
                  <th className="w-[3%] ">
                    <input
                      type="checkbox"
                      className="text-center align-middle"
                    />
                  </th>
                  <th className="w-[3%] ">⭐</th>
                  <th className="w-[5%]">종류</th>
                  <th className="w-[30%] ">이름</th>
                  <th className="w-[10%] ">크기</th>
                  <th className="w-[10%] ">소유자</th>
                  <th className="w-[10%] ">날짜</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  className="text-center align-middle h-16 border-t hover:bg-gray-100"
                  onContextMenu={handleContextMenu} // 오른쪽 클릭 시
                >
                  <td className="w-[3%]">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleRowClick}
                    />
                  </td>
                  <td className="w-[3%]">
                    <button onClick={toggleStar}>
                      <i
                        className={`fa-regular fa-star cursor-pointer text-xl ${
                          isStarFilled ? "text-yellow-500" : "text-gray-300"
                        }`}
                      ></i>
                    </button>
                  </td>
                  <td className="w-[5%]">폴더</td>

                  <td className="w-[30%]">
                    <a href="#" className="hover:underline">
                      자동 올리기
                    </a>
                  </td>
                  <td className="w-[10%]">3MB</td>
                  <td className="w-[10%]">챱챱김</td>
                  <td className="w-[10%]">2024.01.01</td>
                </tr>
                <tr className="text-center align-middle h-16 border-t hover:bg-gray-100">
                  <td className="w-[3%]">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleRowClick}
                    />
                  </td>
                  <td className="w-[3%]">
                    <button onClick={toggleStar}>
                      <i
                        className={`fa-regular fa-star cursor-pointer text-xl ${
                          isStarFilled ? "text-yellow-500" : "text-gray-300"
                        }`}
                      ></i>
                    </button>
                  </td>
                  <td className="w-[5%]">폴더</td>

                  <td className="w-[30%]">
                    <a href="#" className="hover:underline">
                      자동 올리기
                    </a>
                  </td>
                  <td className="w-[10%]">3MB</td>
                  <td className="w-[10%]">챱챱김</td>
                  <td className="w-[10%]">2024.01.01</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>



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
