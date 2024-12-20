/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import BoardPagination from "./boardPagination";
import useAuthStore from "../../../store/AuthStore";
import axiosInstance from "../../../utils/axiosInstance";
import { BOARD_LIST_URI } from "../../../api/_URI";

{
  /*
    날짜 : 2024/11/27(수)
    생성자 : 김민희
    내용 : BoardList.jsx - 게시판 목록 페이지 화면구현

    수정 내역 : 
    2024/12/03(수) - 김민희 : 글 상세 조회를 위한 응답 데이터 처리 {id}
  */
}

export default function BoardList() {
  const user = useAuthStore((state) => state.user);
  console.log("사용자 정보:", user);

  const [boards, setBoards] = useState([]);
  console.log("게시글 정보:", boards);


  useEffect(() => {
    // 게시글 목록을 가져오는 함수
    const fetchBoards = async () => {
      try {
        console.log("게시글 데이터를 가져오는 중...");
        // API 호출 직전에 URL 로깅
        console.log("요청 URL:", `${BOARD_LIST_URI}`);

        const response = await axiosInstance.get(BOARD_LIST_URI, {
          // 요청 타임아웃 설정
          timeout: 5000,
          // 다른 API 호출과 구분하기 위한 헤더 추가
          headers: {
            'Content-Type': 'application/json',
            'X-Request-For': 'board-list'
          }
        });

        console.log("응답 데이터:", response.data);

        if (response.data && Array.isArray(response.data.content)) {
          // 응답에서 받은 게시글 목록을 setBoards에 저장
          setBoards(response.data.content.map(board => ({
            id: board.id,
            title: board.title,
            writerName: board.writerName,
            regDate: board.regDate,
            hit: board.hit,
            likes: board.likes,
          })));
        }
      } catch (error) {
        console.error("게시글 목록 조회 실패:", error);
        console.error("에러 상세:", {
          message: error.message,
          config: error.config,  // 요청 설정 정보
          status: error.response?.status,
          data: error.response?.data
        });
        setBoards([]);
      }
    };

    fetchBoards();
  }, []);



  // BoardPagination으로부터 데이터를 받아 상태 업데이트
  const handlePageData = (newData) => {
    setBoards(newData);
  };


  return (
    <>

        <article className="page-list">
          <div className="content-header mx-auto">
            <h1>자유게시판</h1>
            <p className="!mb-5">
              친애하는 Antwork 여러분 마음속 깊은 이야기를 자유롭게 공유해
              주십시오 ^^ !
            </p>
          </div>
          <section className="">
            <div className="flex justify-between items-center">
              <div className="text-gray-600">
                <span>전체 게시 글: </span>
                <strong>961,011 개</strong>
              </div>
              <div className="">

                <Link to="/antwork/board/write">
                  <button className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600">
                    글쓰기
                  </button>
                </Link>

                <button className="cursor-pointer bg-yellow-500 text-white py-2 px-4 rounded mr-2 hover:bg-yellow-600">
                  내 글만 보기
                </button>
                <button className="cursor-pointer bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600">
                  글 삭제
                </button>
                <button className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
                  휴지통
                </button>
              </div>
            </div>
          </section>
          <section className="h-[800px] overflow-auto">
            <div className="flex justify-between mb-4">
              <div className="flex items-center ">
                <select className="border border-gray-300 rounded py-2 px-2 mr-2 w-20 cursor-pointer">
                  <option>제목</option>
                  <option>작성자</option>
                  <option>제목 + 작성자</option>
                </select>
                <input
                  type="text"
                  placeholder="검색어를 입력해 주세요."
                  className="border border-gray-300 rounded py-2 px-4 mr-2"
                />
                <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                  검색
                </button>
              </div>

              {/* 페이지 당 */}
              <div className="flex items-center">
                <span className="text-gray-600">페이지당</span>
                <select className="border border-gray-300 rounded mx-2">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
                <span className="text-gray-600">개</span>
              </div>
            </div>

            {/* 게시글 글목록 시작 */}
            <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal rounded-[10px] text-center">
                <tr>
                  <th className="py-3 px-6 text-center whitespace-nowrap w-11">
                    번호
                  </th>
                  <th className="py-3 px-6 text-center whitespace-nowrap w-1/2">
                    제목
                  </th>

                  <th className="py-3 px-6 text-center whitespace-nowrap w-1/11">
                    작성자
                  </th>
                  <th className="py-3 px-6 text-center whitespace-nowrap w-1/6">
                    날짜
                  </th>
                  <th className="py-3 px-6 text-center whitespace-nowrap w-1/10">
                    조회
                  </th>
                  <th className="py-3 px-6 text-center whitespace-nowrap w-1/10">
                    좋아요
                  </th>
                </tr>
              </thead>


              <tbody className="text-gray-600 text-sm font-light">
                {Array.isArray(boards) && boards.length > 0 ? (
                  boards.map((board, index) => (
                    <tr key={board.id} className="border-b border-gray-200 hover:bg-gray-100">
                      {/* 번호 */}
                      <td className="py-3 px-6 text-center">{index + 1}</td>

                      {/* 제목 */}
                      <td className="py-3 px-6 text-left">
                        <Link to={`/antwork/board/view/${board.id}`} className="hover:text-blue-500">
                          {board.title && board.title.length > 30
                            ? `${board.title.slice(0, 30)}...`
                            : board.title}
                          <span className="text-blue-500 ml-2">
                            ({board.comment || 0})
                          </span>
                        </Link>
                      </td>

                      {/* 작성자 */}
                      <td className="py-3 px-6 text-center">
                        {board.writerName
                          ? board.writerName.length > 2
                            ? `${board.writerName.charAt(0)}${'*'.repeat(board.writerName.length - 2)}${board.writerName.slice(-1)}`
                            : `${board.writerName.charAt(0)}*`
                          : '익명'
                        }
                      </td>

                      <td className="py-3 px-6 text-center">{board.regDate}</td>
                      <td className="py-3 px-6 text-center">{board.hit || 0}</td>
                      <td className="py-3 px-6 text-center">
                        ❤️ {board.likes || 0}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-3 px-6 text-center">
                      게시글이 없습니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            <BoardPagination onPageChange={handlePageData} />

          </section>
        </article>




    </>
  );
}


export { BoardList };

