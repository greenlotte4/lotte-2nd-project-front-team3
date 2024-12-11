/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BoardFileUpload from "./boardFileUpload";
import { postBoard, uploadBoardFile } from "../../../api/boardAPI";
// import { BOARD_LIST_URI } from "../../../api/_URI";
import useAuthStore from "../../../store/AuthStore";

{
  /*
      날짜 : 2024/11/27(수)
      생성자 : 김민희
      내용 : BoardView.jsx - 게시판 글보기 페이지 화면구현
  
      수정 내역 : 
      - 2024/12/03(화) 김민희 - 1차 개발 글쓰기 완료
      - 2024/12/10(화) 김민희 - submitHandler 수정 : 파일 업로드를 위해 FormData 생성
    */
}

export default function BoardWrite() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user); // 로그인한 사용자 정보
  console.log("사용자 정보 (현재 글쓴이):", user.uid);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [board, setBoard] = useState({
    cate1: "",
    cate2: "",
    writer: "user1",
    title: "",
    file: null,
    content: "",
  });

  // 컴포넌트 시작시 로그인 체크
  useEffect(() => {
    if (!user) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  // 1차 카테고리 배열
  const mainCategories = [
    { value: "community", label: "커뮤니티" },
    { value: "notice", label: "공지사항" },
    { value: "resources", label: "자료실" },
    { value: "company-wide", label: "전사게시판" },
  ];

  // 2차 카테고리 배열 - 1차 카테고리의 value를 key로 사용
  const subCategoriesMap = {
    community: [
      { value: "free", label: "자유게시판" },
      { value: "anonymous", label: "익명게시판" },
      { value: "all", label: "전체게시판" },
    ],
    notice: [
      { value: "important", label: "중요공지" },
      { value: "general", label: "일반공지" },
    ],
    resources: [
      { value: "document", label: "문서자료" },
      { value: "form", label: "양식자료" },
    ],
    "company-wide": [
      { value: "announcement", label: "회사공지" },
      { value: "news", label: "회사소식" },
    ],
  };

  const [availableSubCategories, setAvailableSubCategories] = useState([]);
  const handleMainCategoryChange = (e) => {
    const mainCategory = e.target.value;

    // board 상태 업데이트
    setBoard((prev) => ({
      ...prev,
      cate1: mainCategory,
      cate2: "", // 1차 카테고리가 변경되면 2차 카테고리 초기화
    }));

    // 선택된 1차 카테고리에 해당하는 2차 카테고리 설정
    setAvailableSubCategories(subCategoriesMap[mainCategory] || []);
  };

  const handleSubCategoryChange = (e) => {
    const subCategory = e.target.value;
    setBoard((prev) => ({
      ...prev,
      cate2: subCategory,
    }));
  };

  const changeHandler = (e) => {
    e.preventDefault();
    setBoard({ ...board, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      // 유효성 검사
      if (!board.cate1 || !board.cate2) {
        alert("카테고리를 선택해주세요.");
        return;
      }
      if (!board.title.trim()) {
        alert("제목을 입력해주세요.");
        return;
      }
      if (!board.content.trim()) {
        alert("내용을 입력해주세요.");
        return;
      }

      // FormData 생성하여 한번에 전송
      const formData = new FormData();

      // 게시글 정보를 JSON으로 변환하여 추가
      const boardInfo = {
        boardId: 0, // 새글이므로 null
        cate1: String(board.cate1),
        cate2: String(board.cate2),
        writer: user?.id || "guest", // user 객체에 id가 없으면 'guest'로 처리
        title: board.title.trim(),
        content: board.content.trim(),
      };

      console.log(boardInfo);

      /*
        formData.append('boardInfo', new Blob([JSON.stringify(boardInfo)], { 
            type: 'application/json' 
        }));*/
      // 게시글 전송
      const savedBoardId = await postBoard(boardInfo);

      // 파일이 있으면 추가
      if (board.file) {
        formData.append("boardId", savedBoardId);
        formData.append("writer", boardInfo.writer);
        formData.append("boardFile", board.file);
        await uploadBoardFile(formData); // 파일 업로드 함수 호출
      }

      alert("글 작성이 완료되었습니다.");
      navigate("/antwork/board/list");
    } catch (error) {
      console.error("게시글 작성 실패:", error);
      alert("게시글 작성에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <h1>새 글 작성</h1>
        </div>
        <form onSubmit={submitHandler} id="myForm" className="space-y-4">
          <table className="w-full h-56 min-h-[300px] border-t-2 border-gray-300 border-collapse">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="w-20 p-3 text-lg font-bold text-left">
                  카테고리
                </td>
                <td className="w-[780px]">
                  <select
                    id="category1"
                    className="border border-gray-300 rounded w-32 h-9"
                    name="cate1"
                    value={board.cate1}
                    onChange={handleMainCategoryChange}
                  >
                    <option value="">1차 카테고리</option>
                    {mainCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>

                  <select
                    id="category2"
                    className="ml-4 border border-gray-300 rounded w-32 h-9"
                    name="cate2"
                    value={board.cate2}
                    onChange={handleSubCategoryChange}
                    disabled={!board.cate1}
                  >
                    <option value="">2차 카테고리</option>
                    {availableSubCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr className="border-b border-gray-300">
                <td className="p-3 text-lg font-bold text-left w-10">작성자</td>
                <td className="">
                  <div className="">{user?.name || ""}</div>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-3 text-lg font-bold text-left">제목</td>
                <td>
                  <input
                    type="text"
                    name="title"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 
                        focus:outline-none focus:ring focus:ring-slate-300 resize-none"
                    placeholder="제목을 입력합니다."
                    required
                    value={board.title}
                    onChange={changeHandler}
                  />
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-3 text-lg font-bold text-left">파일 첨부</td>
                <td>
                  <BoardFileUpload
                    onFileSelect={(file) => {
                      setBoard({ ...board, file: file }); // 선택된 파일을 부모 컴포넌트의 상태에 저장
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td className="p-3 text-lg font-bold text-left">내용</td>
                <td>
                  <textarea
                    name="content"
                    id="writeContent"
                    className="border border-slate-300 w-full h-96 text-base px-3 py-2 resize-none rounded-md"
                    placeholder="내용을 입력해주세요."
                    required
                    value={board.content}
                    onChange={changeHandler}
                  ></textarea>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-center space-x-4">
            <Link
              to="/board"
              className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer box-border"
            >
              취소
            </Link>
            <button
              type="submit"
              id="btnSubmit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-400 cursor-pointer box-border"
            >
              작성하기
            </button>
          </div>
        </form>
      </article>
    </>
  );
}
export { BoardWrite };
