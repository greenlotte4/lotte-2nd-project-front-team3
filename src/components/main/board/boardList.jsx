/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import BoardPagination from "./boardPagination";
import useAuthStore from "../../../store/AuthStore";
import axiosInstance from "../../../utils/axiosInstance";
import { BOARD_LIST_URI, BOARD_SEARCH_URI } from "../../../api/_URI";
// import { getBoardSearchResults } from "@/api/boardAPI";


{
  /*
    날짜 : 2024/11/27(수)
    생성자 : 김민희
    내용 : BoardList.jsx - 게시판 목록 페이지 화면구현

    수정 내역 : 
    2024/12/03(수) - 김민희 : 글 상세 조회를 위한 응답 데이터 처리 {id}
    2024/12/24(일) - 코드 통합 및 최적화
  */
}

export default function BoardList() {
  // 사용자 인증 상태 가져오기
  const user = useAuthStore((state) => state.user);

  // 상태값 정의
  const [boards, setBoards] = useState([]); // 게시글 목록
  const [searchType, setSearchType] = useState("title"); // 검색 타입
  const [searchKeyword, setSearchKeyword] = useState(""); // 검색어
  const [pageSize, setPageSize] = useState(10); // 페이지당 게시글 수
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [totalBoards, setTotalBoards] = useState(0); // 총 게시글 수


  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    if (isToday) {
      return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // 게시글 목록을 가져오는 함수
  const fetchBoards = useCallback(async () => {
    try {
      setLoading(true);
      console.log("게시글 데이터를 가져오는 중...");

      // 요청 직전
      console.log("API 호출 URL:", BOARD_LIST_URI);
      console.log("API 호출 params:", {
        type: searchType,
        keyword: searchKeyword,
        size: pageSize,
      });

      const response = await axiosInstance.get(BOARD_SEARCH_URI, {
        params: {
          type: searchType,
          keyword: searchKeyword,
          size: pageSize,
        },
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          'X-Request-For': 'board-list',
        },
      });

      console.log("API 응답 데이터:", response.data);

      // 정상 처리 후 상태 업데이트
      if (response.data) {
        setBoards(
          response.data.content.map((board) => ({
            id: board.id,
            title: board.title,
            writerName: board.writerName,
            regDate: board.regDate,
            hit: board.hit,
            likes: board.likes,
          }))
        );
        console.log("게시글 목록:", boards);
        setTotalBoards(response.data.totalElements);
      }
    } catch (error) {
      console.error("게시글 목록 조회 실패:", error);
      setBoards([]);
    } finally {
      setLoading(false);
    }
  }, [searchType, pageSize]);



  // 초기 로딩 및 검색 조건 변경 시 실행
  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  // 검색 핸들러
  const handleSearch = useCallback(() => {
    if (!searchKeyword.trim()) {
      alert("검색어를 입력해주세요.");
      return;
    }
    console.log("검색 실행: ", searchKeyword);
    fetchBoards(); // 검색 실행 (빈 문자열일 경우 기본 목록 조회하도록 처리)
  }, [fetchBoards]);

  // 검색 초기화 핸들러
  const handleResetSearch = useCallback(() => {
    setSearchType("title");
    setSearchKeyword("");
    fetchBoards();
  }, [fetchBoards]);

  // 페이지 데이터 처리
  const handlePageData = useCallback((newData) => {
    setBoards(newData);
  }, []);

  const search123 = async () => {
    const response = await axiosInstance.get(BOARD_SEARCH_URI, {
      params: {
        type: searchType,
        keyword: searchKeyword,
        size: pageSize,
      },
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
        'X-Request-For': 'board-list',
      },
    });

    console.log("API 응답 데이터:", response.data);

    // 정상 처리 후 상태 업데이트
    if (response.data) {
      setBoards(
        response.data.content.map((board) => ({
          id: board.id,
          title: board.title,
          writerName: board.writerName,
          regDate: board.regDate,
          hit: board.hit,
          likes: board.likes,
        }))
      );
      console.log("게시글 목록:", boards);
      setTotalBoards(response.data.totalElements);
    }
  }

  return (
    <article className="page-list">
      <div className="content-header mx-auto">
        <h1>자유게시판</h1>
        <p className="!mb-5">
          친애하는 Antwork 여러분 마음속 깊은 이야기를 자유롭게 공유해
          주십시오 ^^ !
        </p>
      </div>

      {/* 상단 버튼 및 통계 */}
      <section className="">
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            <span>전체 게시 글: </span>
            <strong>{totalBoards.toLocaleString()} 개</strong>
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

      {/* 게시글 검색 */}
      <section className="h-[800px] overflow-auto">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="border border-gray-300 rounded py-2 px-2 mr-2 w-32 cursor-pointer"
            >
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="writerName">작성자</option>
            </select>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="검색어를 입력해 주세요."
              className="border border-gray-300 rounded py-2 px-4 mr-2"
            />
            <div className="flex items-center cursor-pointer">
              <button
                onClick={() => search123()}
                className="bg-gray-500 cursor-pointer  py-2 px-4 rounded text-white mr-2"
                disabled={loading}
              >
                검색
              </button>
            </div>

            {searchKeyword && (
              <button
                onClick={() => handleResetSearch()}
                className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500"
                disabled={loading}
              >
                초기화
              </button>
            )}
          </div>

          {/* 페이지 당 */}
          <div className="flex items-center">
            <span className="text-gray-600">페이지당</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border border-gray-300 rounded mx-2"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="text-gray-600">개</span>
          </div>
        </div>

        {/* 게시글 목록 테이블 */}
        <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal rounded-[10px] text-center">
            <tr>
              <th className="py-3 px-6 text-center whitespace-nowrap w-11">번호</th>
              <th className="py-3 px-6 text-center whitespace-nowrap w-1/2">제목</th>
              <th className="py-3 px-6 text-center whitespace-nowrap w-1/11">작성자</th>
              <th className="py-3 px-6 text-center whitespace-nowrap w-1/6">날짜</th>
              <th className="py-3 px-6 text-center whitespace-nowrap w-1/10">조회</th>
              <th className="py-3 px-6 text-center whitespace-nowrap w-1/10">좋아요</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {loading ? (
              <tr>
                <td colSpan="6" className="py-3 px-6 text-center">
                  <div className="flex justify-center items-center py-4">
                    데이터를 불러오는 중...
                  </div>
                </td>
              </tr>
            ) : Array.isArray(boards) && boards.length > 0 ? (
              boards.map((board, index) => (
                <tr key={board.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-center">{index + 1}</td>
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
                  {searchKeyword ? '검색 결과가 없습니다.' : '게시글이 없습니다.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 현재 페이지 */}
        <BoardPagination onPageChange={handlePageData} />
      </section>
    </article>
  );
}

export { BoardList };