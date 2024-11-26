export default function ProfileMain() {
  return (
    <div className="flex flex-col gap-8 p-8 bg-gray-50 rounded-lg shadow-md">
      {/* 기본정보 섹션 */}
      <div className="w-full bg-white p-6 rounded-lg shadow-sm mx-auto">
        <h2 className="text-lg font-semibold text-gray-700 mb-6">기본정보</h2>
        <form className="space-y-6">
          {/* 프로필 사진 */}
          <div className="flex items-center">
            <label className="w-1/3 text-gray-700 font-medium">사진</label>
            <div className="flex items-center space-x-4">
              <div className="relative w-32 h-32">
                <img
                  src="https://via.placeholder.com/150"
                  alt="프로필"
                  className="w-full h-full rounded-full border border-gray-300 object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
                  사진 올리기
                </button>
              </div>
              <button className="text-red-500 text-sm hover:underline">
                삭제
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500 mb-6 ml-[33%]">
            ※ 사진은 자동으로 150x150 사이즈로 적용됩니다.
          </p>

          {/* 입력 필드 섹션 */}
          <div className="space-y-4">
            {/* 이름 */}
            <div className="flex items-center">
              <label className="w-1/3 text-gray-700 font-medium">이름</label>
              <input
                type="text"
                placeholder="홍길동"
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* 직책 */}
            <div className="flex items-center">
              <label className="w-1/3 text-gray-700 font-medium">직책</label>
              <input
                type="text"
                placeholder="팀장"
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* 회사 */}
            <div className="flex items-center">
              <label className="w-1/3 text-gray-700 font-medium">회사</label>
              <input
                type="text"
                placeholder="다우오피스"
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* 부서 */}
            <div className="flex items-center">
              <label className="w-1/3 text-gray-700 font-medium">부서</label>
              <input
                type="text"
                placeholder="기획팀"
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* 이메일 */}
            <div className="flex items-center">
              <label className="w-1/3 text-gray-700 font-medium">이메일</label>
              <input
                type="email"
                placeholder="example@company.com"
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* 비밀번호 변경 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                비밀번호 변경
              </h3>

              {/* 현재 비밀번호 */}
              <div className="flex items-center">
                <label className="w-1/3 text-gray-700 font-medium">
                  현재 비밀번호
                </label>
                <input
                  type="password"
                  placeholder="현재 비밀번호"
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* 새 비밀번호 */}
              <div className="flex items-center">
                <label className="w-1/3 text-gray-700 font-medium">
                  새 비밀번호
                </label>
                <input
                  type="password"
                  placeholder="새 비밀번호"
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* 비밀번호 확인 */}
              <div className="flex items-center">
                <label className="w-1/3 text-gray-700 font-medium">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 저장/취소 버튼 */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
