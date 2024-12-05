import { useState } from "react";

{
    /*
        날짜 : 2024/12/05(목)
        생성자 : 김민희
        내용 : BoardPagination.jsx - 게시판 글보기 페이지네이션 화면구현 컴포넌트화 
    
        수정 내역 : 
        - 2024/12/05(목) 김민희 - 페이지 번호 클릭 시 해당 페이지로 이동
    
      */
  }


export default function BoardPagination() {
const [currentPage, setCurrentPage] = useState(1);
const totalPages = 10;

const handlePageChange = (pageNumber) => {
setCurrentPage(pageNumber);
};

const getPageNumbers = () => {
const pageNumbers = [];
const maxVisible = 5;
let start = Math.max(1, currentPage - 2);
let end = Math.min(start + maxVisible - 1, totalPages);

if (end - start < maxVisible - 1) {
    start = Math.max(1, end - maxVisible + 1);
}

for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
}

return pageNumbers;
};

return (
    <>
        <div className="flex flex-col items-center p-8 bg-white rounded-lg shadow">
            <p className="mb-4 text-gray-600">현재 페이지: {currentPage}</p>
            
            <div className="flex items-center justify-center space-x-1">
                {/* 첫 페이지로 */}
                <button 
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 mx-1 border rounded-md flex items-center justify-center transition-colors duration-200
                    ${currentPage === 1 
                        ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-500' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                >
                    &lt;&lt;
                </button>

                {/* 이전 페이지 */}
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 mx-1 border rounded-md flex items-center justify-center transition-colors duration-200
                    ${currentPage === 1 
                        ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-500' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                >
                    &lt;
                </button>

                {/* 페이지 숫자들 */}
                {getPageNumbers().map((number) => (
                    <button 
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`w-10 h-10 mx-1 border rounded-md flex items-center justify-center transition-colors duration-200
                        ${currentPage === number 
                        ? 'bg-blue-500 text-white border-blue-500' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                    >
                    {number}
                    </button>
                ))}

                {/* 다음 페이지 */}
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 mx-1 border rounded-md flex items-center justify-center transition-colors duration-200
                    ${currentPage === totalPages 
                        ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-500' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                >
                    &gt;
                </button>

                {/* 마지막 페이지로 */}
                <button 
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 mx-1 border rounded-md flex items-center justify-center transition-colors duration-200
                    ${currentPage === totalPages 
                        ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-500' 
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                >
                    &gt;&gt;
                </button>
            </div>

        </div>
    </>
    );
};

