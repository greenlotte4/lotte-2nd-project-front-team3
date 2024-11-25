import { useState } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css"; // FontAwesome import

export default function DriveSection() {
  const [isStarFilled, setIsStarFilled] = useState(false);

  // 클릭 시 별 상태를 토글하는 함수
  const toggleStar = () => {
    setIsStarFilled(!isStarFilled);
  };

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
              <button>
                <img
                  src="/images/Antwork/main/drive/list.png"
                  alt=""
                  className="w-[25px] h-[25px] mx-[10px]"
                />
              </button>
              <button>
                <img
                  src="/images/Antwork/main/drive/grid.png"
                  alt=""
                  className="w-[25px] h-[25px] mx-[10px]"
                />
              </button>
              <button>
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
                <tr className="text-center align-middle h-16 border-t">
                  <td className="w-[3%]">
                    <input type="checkbox" />
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
                  <td className="w-[30%]">자동 올리기</td>
                  <td className="w-[10%]">3MB</td>
                  <td className="w-[10%]">챱챱김</td>
                  <td className="w-[10%]">2024.01.01</td>
                </tr>
                <tr className="text-center align-middle h-16 border-t">
                  <td className="w-[3%]">
                    <input type="checkbox" />
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
                  <td className="w-[30%]">자동 올리기</td>
                  <td className="w-[10%]">3MB</td>
                  <td className="w-[10%]">챱챱김</td>
                  <td className="w-[10%]">2024.01.01</td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </>
  );
}
