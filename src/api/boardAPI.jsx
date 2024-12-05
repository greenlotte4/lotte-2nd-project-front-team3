import axios from "axios";
import {
    BOARD_WRITE_URI, // 게시판 글쓰기
    BOARD_LIST_URI, // 게시판 리스트 (글목록)
    BOARD_VIEW_URI, // 게시판 뷰 (글보기)
    //BOARD_MAIN_URI, // 게시판 메인
} from "./_URI";

// 게시글 작성 
export const postBoard = async (data) => {
    try {
        console.log('요청 URL : ', BOARD_WRITE_URI);
        console.log('요청 데이터 : ', data);

        const response = await axios.post(BOARD_WRITE_URI, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status !== 200 && response.status !== 201) {
            throw new Error('게시글 저장에 실패했습니다. 다시 시도해주세요.');
        }

        console.log('응답 데이터 : ', response);
        return response.data;
    } catch (error) {
        console.error('게시글 글쓰기 에러 상세 : ', {
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data
        });
        throw error;
    }
};


// 게시글 목록 조회
export const getBoardList = async () => {
    try {
        const response = await axios.get(BOARD_LIST_URI, {
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
export const getBoardById = async (uid) => {
    try {
        const response = await axios.get(`${BOARD_VIEW_URI}/${uid}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('게시글 데이터:', response.data);
        return response.data;
    } catch (error) {
        console.error('게시글 조회 에러:', error);
        throw error;
    }
};


