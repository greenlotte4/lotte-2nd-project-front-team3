import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Lock, Reply, User, Send } from "lucide-react";
import { BOARD_VIEW_URI } from "../../../api/_URI";

export default function BoardView() {
  const { id } = useParams(); // URL에서 id(글번호) 값 추출
  // const [board, setBoard] = useState(null); // 상세 데이터 상태 관리

  const [board, setBoard] = useState({
    title: '',
    writer: '',
    regDate: '',
    hit: 0,
    content: '',
    attachedFiles: null,
});

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetch(`${BOARD_VIEW_URI}/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch board details");
        }
        const data = await response.json();
        console.log('게시글 데이터:', data); // 받아온 데이터 확인
        setBoard(data);
      } catch (error) {
        console.error('게시글 데이터 로딩 실패:', error);
      }
    };
  
    fetchBoard();
  }, [id]);

  
  // 댓글쓰기 API (commnts)
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "작성자1",
      content: "첫 번째 댓글입니다.",
      createAt: "2024-11-27",
      isSecret: false,
      replies: [
        {
          id: 101,
          author: "작성자2",
          content: "답글입니다.",
          createAt: "2024-11-27",
          isSecret: false,
        },
      ],
    },
  ]);

   // 글 상세 조회를 하지 못한 경우
  //  if (!boards) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <div className="bg-white shadow-lg rounded-lg p-8">
  //         <div className="animate-pulse">
  //           <div className="h-8 bg-gray-200 w-32 mb-4"></div>
  //           <div className="h-4 bg-gray-200 mb-2"></div>
  //           <div className="h-4 bg-gray-200 mb-2"></div>
  //           <div className="h-4 bg-gray-200 mb-2"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [isSecretComment, setIsSecretComment] = useState(false);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const commentObject = {
      id: Date.now(),
      author: "현재 사용자",
      content: newComment,
      isSecret: isSecretComment,
      replies: [],
    };

    if (replyTo) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === replyTo
            ? { ...comment, replies: [...comment.replies, commentObject] }
            : comment
        )
      );
    } else {
      setComments((prev) => [...prev, commentObject]);
    }

    setNewComment("");
    setReplyTo(null);
    setIsSecretComment(false);
  };

  const renderComment = (comment, isNested = false) => (
    <div
      key={comment.id}
      className={`flex flex-col p-3 ${
        isNested ? "ml-6 border-l-2 border-gray-200" : "border-b"
      } space-y-2`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <User size={16} />
          <span className="font-medium">{comment.author}</span>
          <span className="text-slate-600 !text-[1px]">{comment.createAt}</span>
          {comment.isSecret && <Lock size={12} className="text-gray-500" />}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setReplyTo(comment.id);
              setIsSecretComment(false);
            }}
            className="text-gray-500 hover:text-blue-600"
          >
            <Reply size={16} />
          </button>
        </div>
      </div>
      <p className={comment.isSecret ? "text-gray-500 italic" : ""}>
        {comment.isSecret ? "비밀 댓글입니다." : comment.content}
      </p>
      {comment.replies &&
        comment.replies.map((reply) => renderComment(reply, true))}
    </div>
  );

  return (
    <>
      <article className="page-list">
        <section className="h-auto">
          {/* 게시글 헤더 */}
          <div className=" border-gray-200">
            <div className="flex justify-between items-center ">
              <div className="mb-4 ">
                <span className="text-sm text-gray-600 mr-2">
                  {/* {board.cate1} {">"} {board.cate2} */}
                </span>
                <h1 className="text-2xl font-bold text-gray-800">
                  {board.title}
                </h1>
              </div>
              <div className="text-right text-[14px] text-gray-500 flex items-center mt-4">
                <div className="writer">
                  <strong>작성자&nbsp;:&nbsp;&nbsp;</strong>
                    {board.writer?.name || ''} {/* writer 객체의 name 필드 사용 */}
                  <span className="mx-2 text-slate-300 !text-[10px]">
                    &#124;
                  </span>
                </div>
                <div className="date">
                  <strong>작성일&nbsp;:&nbsp;&nbsp;</strong>
                  {new Date(board.regDate).toLocaleDateString()}
                  <span className="mx-2 text-slate-300 !text-[10px]">
                    &#124;
                  </span>
                </div>
                <div className="hit">
                  <strong>조회수&nbsp;:&nbsp;&nbsp;</strong>
                  {board.hit}
                </div>
              </div>
            </div>
          </div>

          {/* 첨부파일 섹션 */}
          {board.attachedFiles && board.attachedFiles.length > 0 && (
            <div className="bg-gray-50 p-4 border-t border-b border-slate-200">
              <h3 className="text-lg font-semibold mb-3 cursor-pointer">
                첨부파일
              </h3>
              <div className="space-y-2">
                {board.attachedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-white px-4 py-2 rounded border border-gray-200 cursor-pointer"
                  >
                    <span className="text-gray-700 block cursor-pointer">
                      {file.name}
                    </span>
                    <span className="text-gray-500 text-sm block cursor-pointer">
                      {file.size}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 게시글 본문 */}
          <div className="pt-6 pb-12 border-t border-slate-200">
            <div className="prose max-w-none">
              {board.content && board.content.split("\n").map((line, index) => (
                <p key={index} className="">
                  {line}
                </p>
              ))}
              <div className="w-1/2 h-auto mt-7">
                <img
                  className="w-full block"
                  src="/images/Antwork/board/boardExam3.jpeg"
                  alt="게시글 본문 이미지"
                />
              </div>
            </div>
          </div>

          {/* 첨부파일 섹션 */}
          {/* {post.attachedFiles && post.attachedFiles.length > 0 && (
                    <div className="bg-gray-50 p-4 border-t border-gray-200">
                        <h3 className="text-lg font-semibold mb-3">첨부파일</h3>
                        <div className="space-y-2">
                        {post.attachedFiles.map((file, index) => (
                            <div 
                            key={index} 
                            className="flex justify-between items-center bg-white px-4 py-2 rounded border border-gray-200"
                            >
                            <span className="text-gray-700">{file.name}</span>
                            <span className="text-gray-500 text-sm">{file.size}</span>
                            </div>
                        ))}
                        </div>
                    </div>
                    )} */}

          {/* 댓글 섹션 추가 */}
          <div className="mt-8 p-4 bg-white border-b border-t border-slate-200">
            <h3 className="text-xl font-semibold mb-4">댓글</h3>
            <div className="mb-4">
              {comments.map((comment) => renderComment(comment))}
            </div>

            <div className="flex items-start space-x-2">
              <div className="flex-grow">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={replyTo ? "답글 작성..." : "댓글 작성..."}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <div className="flex items-center mt-2 space-x-2">
                  <label className="flex items-center space-x-1">
                    <input
                      type="checkbox"
                      checked={isSecretComment}
                      onChange={() => setIsSecretComment(!isSecretComment)}
                      className="form-checkbox"
                    />
                    <span>비밀 댓글</span>
                  </label>
                </div>
              </div>
              <button
                onClick={handleAddComment}
                className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="p-4 bg-gray-100 flex justify-between">
            <Link
              to="/antwork/board/list"
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
            >
              목록으로
            </Link>
            <div className="space-x-2">
              <button className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                수정
              </button>
              <button className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                삭제
              </button>
            </div>
          </div>

          {/* <Link to="/board/list" className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition">
                        <button>목록으로</button>
                    </Link> */}
        </section>
      </article>
    </>
  );
}
export { BoardView };
