/* eslint-disable react/prop-types */
import axiosInstance from "../../../utils/axiosInstance";
// import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../../../store/AuthStore";
import { Lock, Reply, User, Send } from "lucide-react";
import { BOARD_COMMENT_URI } from "../../../api/_URI";

export default function BoardComment({ boardId }) {
const user = useAuthStore((state) => state.user);
const [isLoading, setIsLoading] = useState(false);

// 댓글 관련 상태 관리
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState("");
const [replyTo, setReplyTo] = useState(null);
const [isSecretComment, setIsSecretComment] = useState(false);

// 댓글 목록 불러오기
useEffect(() => {
    const fetchComments = async () => {
    try {
        const response = await axiosInstance.get(`${BOARD_COMMENT_URI}/${boardId}`);
        setComments(response.data);
    } catch (error) {
        console.error('댓글 로딩 실패:', error);
    }
    };

    fetchComments();
}, [boardId]);

// 댓글 작성 처리
const handleAddComment = async () => {
    if (!user) {
    alert('로그인이 필요합니다.');
    return;
    }

    if (!newComment.trim()) {
    alert('댓글 내용을 입력해주세요.');
    return;
    }

    setIsLoading(true);
    try {
    const response = await axiosInstance.post(BOARD_COMMENT_URI, {
        boardId,
        content: newComment,
        parentId: replyTo,
        isSecret: isSecretComment
    });

    if (response.data.success) {
        // 댓글 목록 새로고침
        const commentsResponse = await axiosInstance.get(`${BOARD_COMMENT_URI}/${boardId}`);
        setComments(commentsResponse.data);
        
        // 입력 폼 초기화
        setNewComment('');
        setReplyTo(null);
        setIsSecretComment(false);
    }
    } catch (error) {
    console.error('댓글 작성 실패:', error);
    alert('댓글 작성 중 오류가 발생했습니다.');
    } finally {
    setIsLoading(false);
    }
};

// 댓글 삭제 처리
const handleDeleteComment = async (commentId) => {
    if (!user) return;
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    setIsLoading(true);
    try {
    const response = await axiosInstance.delete(`${BOARD_COMMENT_URI}/${commentId}`);
    if (response.data.success) {
        // 댓글 목록 새로고침
        const commentsResponse = await axiosInstance.get(`${BOARD_COMMENT_URI}/${boardId}`);
        setComments(commentsResponse.data);
    }
    } catch (error) {
    console.error('댓글 삭제 실패:', error);
    alert('댓글 삭제 중 오류가 발생했습니다.');
    } finally {
    setIsLoading(false);
    }
};

// 댓글 렌더링
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
        <span className="text-slate-600 text-sm">
            {new Date(comment.createAt).toLocaleDateString()}
        </span>
        {comment.isSecret && <Lock size={12} className="text-gray-500" />}
        </div>
        <div className="flex space-x-2">
        {!isNested && (
            <button
            onClick={() => {
                setReplyTo(comment.id);
                setIsSecretComment(false);
            }}
            className="text-gray-500 hover:text-blue-600"
            >
            <Reply size={16} />
            </button>
        )}
        {user?.id === comment.authorId && (
            <button
            onClick={() => handleDeleteComment(comment.id)}
            className="text-gray-500 hover:text-red-600 text-sm"
            >
            삭제
            </button>
        )}
        </div>
    </div>
    <p className={comment.isSecret && user?.id !== comment.authorId ? "text-gray-500 italic" : ""}>
        {comment.isSecret && user?.id !== comment.authorId ? "비밀 댓글입니다." : comment.content}
    </p>
    {comment.replies?.map(reply => renderComment(reply, true))}
    </div>
);

return (
    <div className="mt-8 p-4 bg-white border-t border-slate-200">
    <h3 className="text-xl font-semibold mb-4">
        댓글 {comments.length > 0 && `(${comments.length})`}
    </h3>
    
    {/* 댓글 목록 */}
    <div className="mb-4">
        {comments.map(comment => renderComment(comment))}
    </div>

    {/* 댓글 작성 폼 */}
    {user ? (
        <div className="flex items-start space-x-2">
        <div className="flex-grow">
            <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={replyTo ? "답글을 입력하세요..." : "댓글을 입력하세요..."}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            />
            <div className="flex items-center mt-2 space-x-4">
            <label className="flex items-center space-x-2">
                <input
                type="checkbox"
                checked={isSecretComment}
                onChange={() => setIsSecretComment(!isSecretComment)}
                className="form-checkbox"
                />
                <span className="text-sm text-gray-600">비밀 댓글</span>
            </label>
            {replyTo && (
                <button
                onClick={() => setReplyTo(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
                >
                답글 취소
                </button>
            )}
            </div>
        </div>
        <button
            onClick={handleAddComment}
            disabled={isLoading || !newComment.trim()}
            className={`
            bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200
            `}
        >
            <Send size={20} />
        </button>
        </div>
    ) : (
        <div className="text-center py-4 text-gray-500">
        댓글을 작성하려면 로그인이 필요합니다.
        </div>
    )}
    </div>
);
}

export { BoardComment };