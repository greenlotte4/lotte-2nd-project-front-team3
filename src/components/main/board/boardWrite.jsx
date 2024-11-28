import { Link } from "react-router-dom";


{
    /*
      날짜 : 2024/11/27(수)
      생성자 : 김민희
      내용 : BoardView.jsx - 게시판 글보기 페이지 화면구현
  
      수정 내역 : 
  
    */
  }

export default function BoardWrite() {
    
    return (
        <>
        <article className="page-list">

            <div className="content-header">
                <h1>새 글 작성</h1>
            </div> 
            <form
            id="myForm"
            action="/lotteon/cs/qna/write"
            method="POST"
            className="space-y-4"
            >
            <table className="w-full h-56 min-h-[300px] border-t-2 border-gray-300 border-collapse">
                <tbody>
                <tr className="border-b border-gray-300">
                    <td className="w-20 p-3 text-lg font-bold text-left">카테고리</td>
                    <td className="w-[780px]">
                    <select
                        id="category1"
                        className="border border-gray-300 rounded w-32 h-9">
                        <option>1차 카테고리</option>
                        <option value="1">커뮤니티</option>
                        <option value="2">공지사항</option>
                        <option value="3">자료실</option>
                        <option value="4">전사게시판</option>
                    </select>
                    <select
                        name="cate"
                        id="category2"
                        required
                        className="ml-4 border border-gray-300 rounded w-32 h-9"
                    >
                        <option>2차 카테고리</option>
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
                        name="title"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 
                        focus:outline-none focus:ring focus:ring-slate-300 resize-none"
                        placeholder="제목을 입력합니다."
                        required
                    />
                    </td>
                </tr>
                <tr className="border-b border-gray-300">
                    <td className="p-3 text-lg font-bold text-left">파일 첨부</td>
                    <td>
                    <input
                        name="fileAdd"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 
                        focus:outline-none focus:ring focus:ring-slate-300 resize-none"
                        placeholder="파일 첨부해주세요."
                        required
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
                    ></textarea>
                    </td>
                </tr> 
                </tbody>
            </table>
            <div className="text-center space-x-4">
                <Link to="/board"
                className="px-4 py-2 border rounded hover:bg-gray-100 cursor-pointer box-border"
                >
                취소
                </Link>
                <button
                type="submit"
                id="btnSubmit"
                className="px-4 py-2 bg-blue-500  text-white rounded hover:bg-blue-400 cursor-pointer box-border"
                onSubmit={null}
                >
                작성하기
                </button>
            </div>
            </form>
            </article>
        </>
    );
}
export {BoardWrite};