export default function SettingMyinfo() {
  return (
    <article className="page-list ">
      <div className="content-header">
        <h1>Setting</h1>
        <p className="!mb-5">개인 설정 페이지 입니다.</p>
      </div>
      <div className="flex items-center space-x-4 float-left">
        <div className="flex items-center mx-[15px] mt-[10px]">
          <div className="relative w-50 h-50 ml-4 ">
            <img
              src="https://via.placeholder.com/150"
              alt="프로필"
              className="w-full h-full rounded-full border border-gray-300 object-cover"
            />

            <button className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition">
              사진 올리기
            </button>
          </div>
          <button className="ml-3 mt-[115px] text-red-500 text-sm hover:underline">
            삭제
          </button>
        </div>
      </div>

      <form className="space-y-6 p-[20px] border border-black-200 rounded-[10px] w-[800px] mx-5 mb-5 ml-[230px]">
        <p className=" float-right text-gray-400">
          * 부서,직급 변경은 관리자에게 문의하세요.
        </p>
        <h3 className="text-lg font-semibold text-gray-700 ">기본정보</h3>

        {/* 입력 필드 섹션 */}
        <div className="space-y-4 ]">
          {/* 부서 */}
          <div className="flex items-center mx-[10px]">
            <label className="w-1/3 text-gray-700 font-medium">
              &nbsp;부서
            </label>
            <input
              type="text"
              placeholder="개발부"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              readOnly
            />
          </div>
          {/* 직급 */}
          <div className="flex items-center mx-[10px]">
            <label className="w-1/3 text-gray-700 font-medium">직급</label>
            <input
              type="text"
              placeholder="사원"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              readOnly
            />
          </div>
          <div className="flex items-center mx-[10px]">
            <label className="w-1/3 text-gray-700 font-medium">
              &nbsp;이름
            </label>
            <input
              type="text"
              placeholder="홍길동"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button class=" ml-3 px-6 p-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none">
              수정
            </button>
          </div>

          {/* 생년월일 */}
          <div className="flex items-center mx-[10px]">
            <label className="w-1/3 text-gray-700 font-medium">생년월일</label>
            <input
              type="date"
              placeholder="생년월일"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button class=" ml-3 px-6 p-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none">
              수정
            </button>
          </div>

          {/* 이메일 */}
          <div className="flex items-center mx-[10px]">
            <label className="w-1/3 text-gray-700 font-medium">
              &nbsp;이메일
            </label>
            <input
              type="email"
              placeholder="ghkdtnqls95@gmail.com"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button class=" ml-3 px-6 p-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none">
              수정
            </button>
          </div>
          <div className="flex items-center mx-[10px]">
            <label className="w-1/3 text-gray-700 font-medium">
              &nbsp;전화번호
            </label>
            <input
              type="text"
              placeholder="010-7334-2080"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button class=" ml-3 px-6 p-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none">
              수정
            </button>
          </div>
        </div>
      </form>
      <form className="space-y-6  p-[20px] border border-black-200 rounded-[10px] w-[800px] mt-0 mx-5 mb-5 ml-[230px]">
        {/* 비밀번호 변경 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700  !mt-[5px] mb-[10px]">
            비밀번호 변경
          </h3>

          {/* 현재 비밀번호 */}
          <div className="flex items-center mx-[15px] !mt-[20px]">
            <label className="w-1/3 text-gray-700 font-medium ">
              현재 비밀번호
            </label>
            <input
              type="password"
              placeholder="현재 비밀번호"
              className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* 새 비밀번호 */}
          <div className="flex items-center mx-[15px]">
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
          <div className="flex items-center mx-[15px]">
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
    </article>
  );
}
