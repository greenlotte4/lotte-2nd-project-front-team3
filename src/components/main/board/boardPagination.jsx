/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";

{
    /*
        날짜 : 2024/12/05(목)
        생성자 : 김민희
        내용 : BoardPagination.jsx - 게시판 글보기 페이지네이션 화면구현 컴포넌트화 
    
        수정 내역 : 
        - 2024/12/05(목) 김민희 - 페이지 번호 클릭 시 해당 페이지로 이동
    
      */
}


export default function BoardPagination({ onPageChange }) {
const [isLoading, setIsLoading] = useState(false);
const [currentPage, setCurrentPage] = useState(1);  // 1페이지부터 시작
const [totalPages, setTotalPages] = useState(5);    // 초기 totalPages는 0

const fetchBoardData = async (page) => {
    setIsLoading(true);
    try {
        const response = await axiosInstance.get(`/board/list?page=${page-1}&size=10`);
        console.log("응답 데이터:", response.data);
        
        if (response.data && Array.isArray(response.data.content)) {
            setTotalPages(response.data.totalPages);
            onPageChange(response.data.content); // BoardList로 데이터 전달 (부모 컴포넌트로 데이터 전달)
        } else {
            throw new Error("예상치 못한 응답 형식");
        }
    } catch (error) {
        console.error("페이지네이션  상세:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        }, error);
        onPageChange([]);
    } finally {
        setIsLoading(false);
    }
};

// 페이지 변경 처리
const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchBoardData(pageNumber);
};

// useEffect(() => {
//     fetchBoardData(1);  // 1페이지 데이터로 시작
// }, []);  // 컴포넌트 마운트 시 한번만 실행 


// 페이지 번호 계산 함수 개선: 첫 페이지와 마지막 페이지 항상 표시
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
                    disabled={currentPage === 1 || isLoading}
                    className={`w-10 h-10 mx-1 border rounded-md flex items-center justify-center transition-colors duration-200
                        ${(currentPage === 1 || isLoading)
                            ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-500' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                >
                    &lt;&lt;
                </button>

                {/* 이전 페이지 */}
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || isLoading}
                    className={`w-10 h-10 mx-1 border rounded-md flex items-center justify-center transition-colors duration-200
                        ${(currentPage === 1 || isLoading)
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
                        disabled={isLoading}
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
                    disabled={currentPage === totalPages || isLoading}
                    className={`w-10 h-10 mx-1 border rounded-md flex items-center justify-center transition-colors duration-200
                        ${(currentPage === totalPages || isLoading)
                            ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-500' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                >
                    &gt;
                </button>

                {/* 마지막 페이지로 */}
                <button
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages || isLoading}
                    className={`w-10 h-10 mx-1 border rounded-md flex items-center justify-center transition-colors duration-200
                        ${(currentPage === totalPages || isLoading)
                            ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-500' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-gray-400'}`}
                >
                    &gt;&gt;
                </button>

                {/* 로딩 상태 표시 */}
                {/* {isLoading && <span className="ml-2 text-gray-500">로딩중...</span>} */}
            </div>

            {/* 게시글 목록 */}
            {/* <div>
                {boardData.map((board, index) => (
                    <div key={index}>
                        <h3>{board.title}</h3>
                        <p>{board.content}</p>
                    </div>
                ))}
            </div> */}
        </div>
    </>
    );
};

