import { Link } from "react-router-dom";
import LendingLayout from "../../layouts/LendingLayout";

{
  /*
    날짜 : 2024/11/27(수)
    생성자 : 강은경
    내용 : LendingSupportPage.jsx 레이아웃 구현

    수정 내역 : 
    예시) 2024/12/01 - 강은경 : ~~~ 를 위해 ~~~ 추가
    
  */
}

export default function LendingSupportPage() {
  return (
    <LendingLayout>
      <div className="flex w-[1200px] mx-auto h-screen">
        <div className="w-1/2 bg-[url('../../../public/images/Lending/support1.png')] bg-cover flex justify-center items-center">
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src="../../../public/images/Lending/support1.png"
                alt="Confused person"
                className="w-[890px] h-[670px]"
              />
            </div>
          </div>
        </div>
        {/* 오른쪽: 텍스트 및 버튼 섹션 */}
        <div className="w-1/2 bg-white flex flex-col justify-start items-start p-16">
          {/* 문의 하기 */}
          <div className="mb-[8rem] flex items-center">
            {/* 텍스트 */}
            <div className="ml-8">
              <h2 className="text-3xl text-gray-800">문의 하기</h2>
              <p className="text-gray-600 mt-[20px]">
                저희 Ant Work를 이용하시면서 궁금하신 점이 있으시면 언제든
                물어보세요!
              </p>
            </div>
          </div>

          {/* 문의 등록 */}
          <div className="mb-10 flex flex-col items-start">
            <h3 className="text-4xl font-bold text-gray-800 mb-2">문의 등록</h3>
            <p className="text-gray-400 mb-[2rem] mt-[1.5rem] text-[15px]">
              Ant Work의 궁금하신 점을 무엇이든 질문하세요!
            </p>
            <button className="bg-[#B2D1FF] hover:bg-[#A0B7E6] text-white py-2 px-6 rounded-md w-[121px] h-[32px]">
              문의 하기
            </button>
          </div>

          {/* 가이드 요청 */}
          <div className="flex flex-col items-start mt-[12.75rem]">
            <h3 className="text-4xl font-bold text-gray-800 mb-2">
              가이드 요청
            </h3>
            <div className="flex items-center">
              {/* 이미지 추가 */}
              <div className="w-1/3">
                <img
                  src="../../../public/images/Lending/guide.png" // 이미지 경로 수정
                  alt="가이드 이미지"
                  className="w-full h-auto"
                />
              </div>
              {/* 텍스트 */}
              <div className="ml-8">
                <p className="text-gray-400 mb-[2rem] mt-[1.5rem] text-[15px]">
                  Ant Work를 시작하셨나요? <br />
                  메시지부터, 근태, 예산 등 Ant Work를 사용하는 법을 알아보아요
                </p>
              </div>
            </div>
            <button className="bg-[#B2D1FF] hover:bg-[#A0B7E6] text-white py-2 px-6 rounded-md w-[121px] h-[32px]">
              가이드 요청
            </button>
          </div>
        </div>
      </div>
    </LendingLayout>
  );
}
