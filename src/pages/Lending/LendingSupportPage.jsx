import { Link } from "react-router-dom";
import LendingLayout from "../../layouts/LendingLayout";
import useModalStore from "../../store/modalStore";
import LendingModal from "../../components/common/modal/lendingModal";

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
  // 모달 상태 관리를 위한 useState 추가
  const openModal = useModalStore((state) => state.openModal);
  return (
    <LendingLayout>
      <LendingModal />
      <div className="flex w-[1200px] mx-auto h-screen">
        <div className="w-1/2 bg-[#A0C3F7] bg-cover flex justify-center items-center relative">
          <div className="absolute top-[80px] left-[40px] transform -translate-x-1/2 -translate-y-1/2">
            <img
              src="/images/Lending/support1.png"
              alt="Confused person"
              className="w-full h-auto max-w-[890px] max-h-[670px] object-contain mt-[57.75rem] ml-[21.5rem]"
            />
          </div>
        </div>

        <div className="w-1/2 bg-white flex flex-col justify-start items-start p-16">
          <div className="mb-[8rem] flex items-center">
            <div>
              <h2 className="text-4xl text-gray-800">문의 하기</h2>
              <p className="text-gray-400 mb-[2rem] mt-[20px] text-[15px]">
                저희 AntWork를 이용하시면서 궁금하신 점이 있으시면 언제든
                물어보세요!
              </p>
            </div>
          </div>

          <div className="mb-6 flex flex-row-reverse items-center">
            {" "}
            <div className="w-[107px] h-[207px]">
              <img
                src="../../../public/images/Lending/support2.png"
                alt="문의 등록 이미지"
                className="w-full h-auto ml-[3.75rem]"
              />
            </div>
            <div className="flex flex-col items-start ml-8">
              <h3 className="text-4xl font-bold text-gray-800 mb-2">
                문의 등록
              </h3>
              <p className="text-gray-400 mb-[2rem] mt-[2.5rem] text-[14px]">
                AntWork의 궁금하신 점을 무엇이든 질문하세요!
              </p>
              <button
                onClick={() => {
                  openModal("support");
                }}
                className="bg-[#B2D1FF] hover:bg-[#A0B7E6] text-white py-2 px-6 rounded-md w-[121px] h-[36px] text-[16px] leading-[24px] block text-center"
              >
                문의 하기
              </button>
            </div>
          </div>

          <div className="flex flex-col items-start mt-[6.5rem]">
            {" "}
            <div className="flex items-center ml-auto">
              <h3 className="text-4xl font-bold text-gray-800 mr-[8.5rem]">
                가이드 요청
              </h3>
            </div>
            <div className="flex items-center ml-auto">
              <div className="w-[336px] h-[207px]">
                <img
                  src="../../../public/images/Lending/support3.png"
                  alt="가이드 이미지"
                  className="w-full h-auto"
                />
              </div>
              <div className="ml-8">
                <p className="text-gray-400 mb-[2rem] text-[14px] leading-relaxed">
                  Ant Work를 시작하셨나요? <br />
                  메시지부터, 근태, 예산 등 Ant Work를 사용하는 법을 알아보아요
                </p>
                <a
                  href="#"
                  className="bg-[#B2D1FF] hover:bg-[#A0B7E6] text-white py-2 px-6 rounded-md w-[121px] h-[36px] text-[16px] leading-[24px] ml-[5.5rem] text-xl block text-center"
                >
                  가이드 요청
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LendingLayout>
  );
}
