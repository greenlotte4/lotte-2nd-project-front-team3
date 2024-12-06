// import axios from "axios";
import axiosInstance from "./../utils/axiosInstance";
import {
    BOARD_WRITE_URI, // 게시판 글쓰기
    BOARD_LIST_URI, // 게시판 리스트 (글목록)
    BOARD_VIEW_URI, // 게시판 뷰 (글보기)
    //BOARD_MAIN_URI, // 게시판 메인
    BOARD_UPDATE_URI
} from "./_URI";

// 게시글 작성 
export const postBoard = async (data) => {
    try {
        console.log('요청 URL : ', BOARD_WRITE_URI);
        console.log('API_SERVER_HOST:', import.meta.env.VITE_API_SERVER_HOST);
        console.log('요청 데이터 : ', data);
        console.log('API_SERVER_HOST:', import.meta.env.VITE_API_SERVER_HOST);

        const response = await axiosInstance.post(BOARD_WRITE_URI, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('API_SERVER_HOST:', import.meta.env.VITE_API_SERVER_HOST);

        if (response.status !== 200 && response.status !== 201) {
            throw new Error('게시글 저장에 실패했습니다. 다시 시도해주세요.');
            
        }

        console.log('응답 데이터 : ', response);
        console.log('API_SERVER_HOST:', import.meta.env.VITE_API_SERVER_HOST);
        return response.data;
    } catch (error) {
        console.error('게시글 글쓰기 에러 상세 : ', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data
        });
        console.log('API_SERVER_HOST:', import.meta.env.VITE_API_SERVER_HOST);
        throw error;
        
    }
};


// 게시글 목록 조회
export const getBoardList = async () => {
    try {
        const response = await axiosInstance.get(BOARD_LIST_URI, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('게시글 목록 조회 에러:', error);
        throw error;
    }
};



// 게시글 상세 조회 
// export const getBoardById = async (id) => {
//     try {
//         const response = await axiosInstance.get(`${BOARD_VIEW_URI}/${id}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//             }
//         });
//         console.log('게시글 데이터:', response.data);
//         return response.data;
//     } catch (error) {
//         console.error('게시글 조회 에러:', error);
//         throw error;
//     }
// };

export const getBoardById = async (id) => {
    try {
        const { data } = await axiosInstance.get(`${BOARD_VIEW_URI}/${id}`);
        console.log('게시글 데이터:', data);
        return data;
    } catch (error) {
        // 좀 더 구체적인 에러 처리
        if (error.response) {
            // 서버가 응답을 반환했지만 2xx 범위를 벗어난 상태 코드
            console.error('게시글 조회 실패:', error.response.status, error.response.data);
            throw new Error(error.response.data.message || '게시글을 불러오는데 실패했습니다');
        } else if (error.request) {
            // 요청이 전송되었지만 응답을 받지 못함
            console.error('서버 응답 없음:', error.request);
            throw new Error('서버에서 응답이 없습니다');
        } else {
            // 요청 설정 중에 문제가 발생
            console.error('요청 설정 오류:', error.message);
            throw new Error('요청 중 오류가 발생했습니다');
        }
    }
};




// 게시글 글 수정
    export const updateBoard = async (uid, data) => {
    try {
        console.log('요청 URL : ', `${BOARD_UPDATE_URI}/${uid}`);
        console.log('요청 데이터 : ', data);

        const response = await axiosInstance.put(`${BOARD_UPDATE_URI}/${uid}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (response.status !== 200 && response.status !== 201) {
        throw new Error('게시글 수정에 실패했습니다. 다시 시도해주세요.');
        }

        console.log('응답 데이터 : ', response);
        return response.data;
    } catch (error) {
        console.error('게시글 수정 에러 상세 : ', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
        });
        throw error;
    }
    };