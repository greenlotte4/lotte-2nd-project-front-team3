import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BOARD_UPDATE_URI } from "../../../api/_URI";

export default function BoardUpdate() {
const { id } = useParams();
const navigate = useNavigate();

const [board, setBoard] = useState({
title: '',
writer: '',
regDate: '',
hit: 0,
content: '',
attachedFiles: [],
});

// Form state
const [formData, setFormData] = useState({
title: '',
content: '',
attachedFiles: [],
});

useEffect(() => {
const fetchBoard = async () => {
    try {
    const response = await fetch(`${BOARD_UPDATE_URI}/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch board details");
    }
    const data = await response.json();
    setBoard(data);
    // Initialize form data with existing board data
    setFormData({
        title: data.title,
        content: data.content,
        attachedFiles: data.attachedFiles || [],
    });
    } catch (error) {
    console.error('게시글 데이터 로딩 실패:', error);
    }
};

fetchBoard();
}, [id]);

// Handle form input changes
const handleInputChange = (e) => {
const { name, value } = e.target;
setFormData(prev => ({
    ...prev,
    [name]: value
}));
};

// Handle file uploads
const handleFileChange = (e) => {
const files = Array.from(e.target.files);
setFormData(prev => ({
    ...prev,
    attachedFiles: [...prev.attachedFiles, ...files]
}));
};

// Remove attached file
const handleRemoveFile = (indexToRemove) => {
setFormData(prev => ({
    ...prev,
    attachedFiles: prev.attachedFiles.filter((_, index) => index !== indexToRemove)
}));
};

// Handle form submission
const handleSubmit = async (e) => {
e.preventDefault();

try {
    const response = await fetch(`${BOARD_VIEW_URI}/${id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
    });

    if (!response.ok) {
    throw new Error('Failed to update board');
    }

    // Redirect to the view page after successful update
    navigate(`/antwork/board/view/${id}`);
} catch (error) {
    console.error('게시글 수정 실패:', error);
}
};

return (
<article className="page-list">
    <section className="h-auto">
    <form onSubmit={handleSubmit}>
        {/* 게시글 헤더 */}
        <div className="border-gray-200">
        <div className="mb-4">
            <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full text-2xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500 p-2"
            placeholder="제목을 입력하세요"
            />
        </div>
        <div className="text-right text-[14px] text-gray-500 flex items-center mt-4">
            <div className="writer">
            <strong>작성자&nbsp;:&nbsp;&nbsp;</strong>
            {board.writer?.name || ''}
            </div>
        </div>
        </div>

        {/* 첨부파일 섹션 */}
        <div className="bg-gray-50 p-4 border-t border-b border-slate-200 mt-4">
        <h3 className="text-lg font-semibold mb-3">첨부파일</h3>
        <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="mb-4"
        />
        <div className="space-y-2">
            {formData.attachedFiles.map((file, index) => (
            <div
                key={index}
                className="flex justify-between items-center bg-white px-4 py-2 rounded border border-gray-200"
            >
                <span className="text-gray-700">{file.name}</span>
                <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="text-red-500 hover:text-red-700"
                >
                삭제
                </button>
            </div>
            ))}
        </div>
        </div>

        {/* 게시글 본문 */}
        <div className="pt-6 pb-12 border-t border-slate-200">
        <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full min-h-[400px] p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="내용을 입력하세요"
        />
        </div>

        {/* 버튼 영역 */}
        <div className="p-4 bg-gray-100 flex justify-between">
        <button
            type="button"
            onClick={() => navigate(`/antwork/board/view/${id}`)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
        >
            취소
        </button>
        <div className="space-x-2">
            <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
            수정완료
            </button>
        </div>
        </div>
    </form>
    </section>
</article>
);
}

export { BoardUpdate };