import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BoardFileUpload from './BoardFileUpload';

{
  /*
      날짜 : 2024/11/27(수)
      생성자 : 김민희
      내용 : BoardView.jsx - 게시판 글보기 페이지 화면구현
  
      수정 내역 : 
      - 2024/12/03(화) 김민희 - 1차 개발 글쓰기 완료
  
    */
}

export default function BoardWrite() {

  const navigate = useNavigate();

  const [board, setBoard] = useState({
    cate1: "",
    cate2: "",
    writer: "ghkdtnqls95",
    title: "",
    file: null,
    content: "",
  });

  const postBoard = async (data) => {
    console.log('데이터 전송 전:', data);
    // const formData = new FormData();

    // Object.entries(data).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });

    // const response = await fetch('/antwork/board/write', {
    //   method: 'POST',
    //   body: formData,
    // });

    const response = await fetch('http://localhost:8080/api/board/write', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('API 호출 결과:', response); 
    return response.ok;
  };
  
  const changeHandler = (e) => {
    e.preventDefault();
    setBoard({ ...board, [e.target.name]: e.target.value});
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      cate1: board.cate1,
      cate2: board.cate2,
      writer: "ghkdtnqls95",
      title: board.title,
      file: null,
      content: board.content,
      regDate: new Date().toISOString(),
      hit: 0,
      likes: 0,
    };

    const result = await postBoard(data);
    console.log("result 결과 : " + result);

    if (result) {
      alert("글 작성 했습니다.");
      navigate("/antwork/board/list"); // 프론트 주소
    }
  };

  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <h1>새 글 작성</h1>
        </div>
        <form onSubmit={submitHandler}
          id="myForm"
          action="/api/board/write"
          method="POST"
          className="space-y-4"
        >
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
                  onChange={changeHandler} 
                >
                  <option value="">1차 카테고리</option>
                  <option value="1">커뮤니티</option>
                  <option value="2">공지사항</option>
                  <option value="3">자료실</option>
                  <option value="4">전사게시판</option>
                </select>
                <select
                  id="category2"
                  className="ml-4 border border-gray-300 rounded w-32 h-9"
                  name="cate2"
                  value={board.cate2}
                  onChange={changeHandler} 
                >
                  <option value="">2차 카테고리</option>
                  <option value="1">자유게시판</option>
                  <option value="2">익명게시판</option>
                  <option value="3">전체게시판</option>
                </select>
                </td>
              </tr>
              <tr className="border-b border-gray-300">
                <td className="p-3 text-lg font-bold text-left w-10">작성자</td>
                <td>
                  <input
                    type="text"
                    className="border border-white w-full h-8 text-base p-1 resize-none rounded-md resize-none"
                    value="작성자"
                    readOnly
                  />
                  <input
                    type="hidden"
                    name="uid"
                    value="작성자"
                    className="border border-white"
                  />
                  <input
                    type="hidden"
                    name="type"
                    value="qna"
                    className="border border-white"
                  />
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
                          setBoard({ ...board, file: file });  // 선택된 파일을 부모 컴포넌트의 상태에 저장
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
          </div>4
        </form>
      </article>
    </>
  );
}
export { BoardWrite };
