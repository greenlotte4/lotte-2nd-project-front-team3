/* eslint-disable react/prop-types */
import axiosInstance from "../../../utils/axiosInstance";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../../../store/AuthStore";
// import { Lock, Reply, User, Send, ThumbsUp } from "lucide-react";
// import { ThumbsUp, Download, Box } from "lucide-react";
import { ThumbsUp } from "lucide-react";
import {
  BOARD_VIEW_URI,
  BOARD_UPDATE_URI,
  BOARD_DELETE_URI,
} from "../../../api/_URI";
import BoardComment from "./boardComment";
import BoardFileDownload from "./boardFileDownload";
import { toast } from 'react-toastify';
// import { uploadBoardFile } from "../../../api/boardAPI";

export default function BoardView() {
  // URL 파라미터와 네비게이션 설정
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  console.log("사용자 정보:", user.uid);

  // 업로드된 파일 목록 상태 초기화
  const [fileList, setFileList] = useState([]); 
  console.log("업로드된 파일 목록:", fileList);

  // 수정 모드와 로딩 상태 관리
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 수정할 게시글 데이터 상태 관리
  const [updateBoard, setUpdateBoard] = useState({
    title: "",
    content: "",
    attachedFiles: null,
  });

  // 게시글 기본 데이터 상태 관리
  const [board, setBoard] = useState({
    title: "",
    writer: "",
    regDate: "",
    hit: 0,
    content: "",
    // attachedFiles: null,
    attachedFiles: [], // 빈 배열로 초기화
  });

  // 좋아요 관련 상태
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // 게시글 데이터 로드
  // useEffect(() => {
  //   const fetchBoard = async () => {
  //     console.log("인사하고 다녀 fetchBoard : ", fetchBoard);

  //     try {
  //       if (!id) {
  //         console.warn("게시글 ID가 없습니다.");
  //         return;
  //       }

  //       const response = await axiosInstance.get(`${BOARD_VIEW_URI}/${id}`);
  //       console.log("서버 응답 데이터:", response.data);

  //       setBoard(response.data);
  //        수정 폼의 초기값도 설정
  //       setUpdateBoard({
  //         title: response.data.title,
  //         content: response.data.content,
  //         attached🧤Files: response.data.attachedFiles,
  //       });
  //       console.log("setUpdateBoard 데이터:🧤", setUpdateBoard);

  //       setLikes(response.data.likes || 0);
  //       setIsLiked(response.data.isLiked || false);
  //     } catch (error) {
  //       console.error("게시글 데이터 로딩 실패:", error);
  //       alert("게시글 데이터를 가져오는 중 오류가 발생했습니다.");
  //     }
  //   };

  //   fetchBoard();
  // }, [id]);

  useEffect(() => {
    const fetchBoardData = async () => {
      console.log("안녕 게시글 데이터");
      if (!id) {
        console.warn("게시글 ID가 없습니다.");
        return;
      }
  
      try {
        // 게시글 데이터 조회
        const response = await axiosInstance.get(`${BOARD_VIEW_URI}/${id}`);
        console.log("서버 응답 데이터:", response.data);
        
        // 게시글 데이터 설정
        setBoard(response.data);
        
        // 수정 폼 초기값 설정
        setUpdateBoard({
          title: response.data.title,
          content: response.data.content,
          attachedFiles: response.data.attachedFiles,
        });
  
        // 좋아요 상태 설정
        setLikes(response.data.likes || 0);
        setIsLiked(response.data.isLiked || false);
  
        // 파일 목록 별도 조회
        const fileResponse = await axiosInstance.get(`${BOARD_VIEW_URI}/${id}/files`);
        
        if (fileResponse.data) {
          setFileList(fileResponse.data);
          console.log("파일 데이터:", fileResponse.data);
        }
        
        
      } catch (error) {
        console.error("게시글 데이터 로딩 실패:", error);
        toast.error("게시글을 불러오는데 실패했습니다.");
      }


      


    };
  
    fetchBoardData();


//user.id === board.writer?.id
console.log("사용자 아이디 :::", user.id);
console.log("게시글 아이디 :::",board.writer);
    




  }, [id]);



  // 좋아요 처리 함수
  const handleLike = async () => {
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const response = await axiosInstance.post(`${BOARD_VIEW_URI}/${id}/like`);

      if (response.data.success) {
        setLikes(response.data.likeCount);
        setIsLiked(response.data.liked);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("좋아요 처리 실패:", error);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  };

 


  //  useEffect 내 파일 데이터 로딩
  // useEffect(() => {
  //   const fetchBoardDetail = async () => {
  //     try {
  //        게시글 데이터 조회
  //       const response = await axiosInstance.get(`${BOARD_VIEW_URI}/${id}`);

  //        파일 목록 별도 조회
  //       const fileResponse = await axiosInstance.get(`${BOARD_VIEW_URI}/${id}/files`, {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         }
          
  //       });

  //       if (response.data.success) {
  //         setBoard(response.data.data);
  //         setFileList(response.data.files); // 게시글 데이터에서 파일 정보 추출
  //         console.log("게시판 데이터 : ",response.data.data);
  //         console.log("파일 데이터 : ", fileResponse.data);

  //       }

  //        게시글 데이터에 파일 정보가 포함되어 있다면
  //       if (fileResponse.data) {
  //         setFileList(fileResponse.data);
  //         console.log("파일 데이터 잘 가져오나? (fileResponse.data) : ", fileResponse.data);
  //       }

  //     } catch (error) {
  //       console.error("게시글 상세 정보 조회 실패:", error);
  //       toast.error("게시글을 불러오는데 실패했습니다.");
  //     }
  //   };

  //   fetchBoardDetail();
  // }, [id]);

  // 게시글 수정 처리 함수
  const handleUpdate = async () => {
    if (!user || user.id !== board.writer?.id) {
      alert("수정 권한이 없습니다.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", updateBoard.title);
      formData.append("content", updateBoard.content);
      if (updateBoard.attachedFiles) {
        Array.from(updateBoard.attachedFiles).forEach((file) => {
          formData.append("files", file);
        });
      }

      const response = await axiosInstance.put(
        `${BOARD_UPDATE_URI}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        setBoard({
          ...board,
          cate1: updateBoard.cate1,
          cate2: updateBoard.cate2,
          title: updateBoard.title,
          content: updateBoard.content,
          updatedAt: new Date().toISOString(),
        });
        setIsUpdate(false);
        alert("수정이 완료되었습니다.");
      }
    } catch (error) {
      console.error("수정 실패:", error);
      alert("수정 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 게시글 삭제 처리 함수
  const handleDelete = async () => {
    if (!user || user.id !== board.writer?.id) {
      alert("삭제 권한이 없습니다.");
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    setIsLoading(true);
    try {
      const response = await axiosInstance.delete(`${BOARD_DELETE_URI}/${id}`);
      if (response.data.success) {
        alert("삭제되었습니다.");
        navigate("/antwork/board/list");
      }
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <article className="page-list">
      <section className="h-auto">
        {/* 게시글 헤더 */}
        <div className="border-gray-200">
          <div className="flex justify-between items-center">
            <div className="mb-4">
              <div className="text-sm text-gray-600 mr-2 mb-1">
                {/* {board.cate1} &gt; {board.cate2} */}
                커뮤니티 &gt; 자유게시판
              </div>
              {isUpdate ? (
                // 수정 모드 - 제목
                <input
                  type="text"
                  value={updateBoard.title}
                  onChange={(e) =>
                    setUpdateBoard({ ...updateBoard, title: e.target.value })
                  }
                  className="w-full p-2 text-2xl font-bold border rounded"
                  disabled={isLoading}
                />
              ) : (
                // 보기 모드 - 제목
                <h1 className="text-2xl font-bold text-gray-800">
                  {board.title}
                </h1>
              )}
            </div>

            {/* 작성자 정보 */}
            <div className="text-right text-[14px] text-gray-500 flex items-center mt-4">
              <div className="writer">
                <strong>작성자&nbsp;:&nbsp;&nbsp;</strong>
                {
                  board.writer?.name
                    ? board.writer.name // 게시글 작성자가 있으면 표시
                    : user?.name || "익명" // 없으면 로그인한 사용자의 이름, 그것도 없으면 '익명'
                }
                <span className="mx-2 text-slate-300 !text-[10px]">&#124;</span>
              </div>
              <div className="date">
                <strong>작성일&nbsp;:&nbsp;&nbsp;</strong>
                {new Date(board.regDate).toLocaleDateString()}
                <span className="mx-2 text-slate-300 !text-[10px]">&#124;</span>
              </div>
              <div className="hit">
                <strong>조회수&nbsp;:&nbsp;&nbsp;</strong>
                {board.hit}
              </div>
            </div>

            {/* 좋아요 버튼 */}
            {!isUpdate && (
              <button
                onClick={handleLike}
                disabled={isLoading}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md
                  transition-all duration-200 mb-4
                  ${
                    isLiked
                      ? "bg-blue-100 hover:bg-blue-200 text-blue-600"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                  }
                  ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <ThumbsUp
                  size={16}
                  className={`${isLiked ? "fill-blue-600" : ""}`}
                />
                <span className="ml-1">좋아요 {likes}</span>
              </button>
            )}
          </div>
        </div>

        {/* 게시글 본문 */}
        <div className="pt-6 pb-12 border-t border-slate-200">

          {/* 파일 다운로드 컴포넌트  */}
          <BoardFileDownload files={fileList} />

          <div className="flex justify-between items-start">
            {isUpdate ? (
              // 수정 모드 - 본문
              <div className="w-full">
                <textarea
                  value={updateBoard.content}
                  onChange={(e) =>
                    setUpdateBoard({ ...updateBoard, content: e.target.value })
                  }
                  className="w-full p-2 border rounded min-h-[300px]"
                  rows="15"
                  disabled={isLoading}
                />
                <div className="mt-4">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setUpdateBoard({ ...updateBoard, attachedFiles: files });
                    }}
                    className="mt-2"
                    disabled={isLoading}
                  />
                </div>
              </div>
            ) : (
              // 보기 모드 - 본문
              <div className="prose max-w-[calc(100%-120px)]">
                {board.content &&
                  board.content
                    .split("\n")
                    .map((line, index) => <p key={index}>{line}</p>)}
              </div>
            )}
          </div>
        </div>

        <BoardComment boardId={id} />

        {/* 버튼 영역 */}
        <div className="p-4 bg-gray-100 flex justify-between">
          <Link
            to="/antwork/board/list"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            목록으로
          </Link>
          {user && user.id == board.writer && (
            <div className="space-x-2">
              {isUpdate ? (
                <>
                  <button
                    onClick={handleUpdate}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    {isLoading ? "저장 중..." : "저장"}
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("수정을 취소하시겠습니까?")) {
                        setIsUpdate(false);
                        setUpdateBoard({
                          title: board.title,
                          content: board.content,
                          attachedFiles: board.attachedFiles,
                        });
                      }
                    }}
                    disabled={isLoading}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsUpdate(true)}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    수정
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isLoading}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    {isLoading ? "삭제 중..." : "삭제"}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </article>
  );
}

export { BoardView };
