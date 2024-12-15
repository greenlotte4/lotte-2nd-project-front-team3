import { useCalendarStore } from "@/store/CalendarStore";

export default function FindIdModal() {
  const closeModal = useCalendarStore((state) => state.closeModal);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm hidden">
      <div className="bg-white rounded-xl shadow-2xl w-[500px] max-w-full mx-4 overflow-hidden animate-fade-in">
        {/* 모달 헤더 */}
        <div className="bg-gray-100 px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">아이디 찾기</h2>
          <button className="text-gray-600 hover:text-gray-900 transition duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 모달 본문 */}
        <div className="p-6 space-y-4">
          {/* 입력 필드 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이름
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="이름을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              전화번호
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="전화번호를 입력하세요"
            />
          </div>

          {/* 버튼들 */}
          <div className="flex space-x-3 mt-6">
            <button className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold">
              아이디 찾기
            </button>
            <button
              className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition duration-300 font-semibold"
              onClick={closeModal}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
