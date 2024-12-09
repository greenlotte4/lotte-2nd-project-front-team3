import { useState } from "react";

export default function Vacation() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* 상단 헤더 */}
      <div className="bg-white shadow-md px-6 py-4 flex border-b items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">휴가신청서</h1>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-3 py-2 bg-blue-100 rounded-md text-blue-700 hover:bg-blue-200">
            📝 <span className="ml-2">결재요청</span>
          </button>
          <button className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
            💾 <span className="ml-2">임시저장</span>
          </button>
          <button className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
            👁️ <span className="ml-2">미리보기</span>
          </button>
          <button className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
            ❌ <span className="ml-2">취소</span>
          </button>
          <button className="flex items-center px-3 py-2 bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200">
            ℹ️ <span className="ml-2">결재 정보</span>
          </button>
        </div>
      </div>

      <div className="flex flex-grow">
        {/* 메인 컨텐츠 */}
        <div className="flex-grow bg-white shadow-lg p-8">
          {/* 제목 */}
          <h2 className="text-xl font-semibold mb-6 text-center border-b-2 pb-4 border-gray-300">
            연차 신청서
          </h2>

          <div className="flex mb-6 ">
            {/* 신청자 정보 */}
            <section className="flex-grow flex items-center ">
              <table className="w-[300px] h-full border border-gray-300 text-sm text-center">
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 bg-gray-100 font-medium text-gray-700 align-middle">
                      기안자
                    </td>
                    <td className="p-2 align-middle">최준혁</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 bg-gray-100 font-medium text-gray-700 align-middle">
                      기안부서
                    </td>
                    <td className="p-2 align-middle">Antwork</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 bg-gray-100 font-medium text-gray-700 align-middle">
                      기안일
                    </td>
                    <td className="p-2 align-middle">2024-12-10</td>
                  </tr>
                  <tr>
                    <td className="p-2 bg-gray-100 font-medium text-gray-700 align-middle">
                      문서번호
                    </td>
                    <td className="p-2 align-middle">2024-001</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 승인 영역 */}
            <section className="w-32 border border-gray-300 ml-6 text-center">
              <div className="bg-gray-100 text-sm font-medium text-gray-700 py-2">
                승인
              </div>
              <div className="border-t border-gray-300 py-4">
                <p className="text-gray-700 font-medium">대표이사</p>
              </div>
              <div className="border-t border-gray-300 py-4">
                <p className="text-gray-700">김상후</p>
              </div>
              <div className="border-t border-gray-300 py-6"></div>
            </section>
          </div>

          {/* 휴가 정보 */}
          <section className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="leaveType"
                  className="block text-gray-600 font-medium mb-2"
                >
                  휴가 종류
                </label>
                <select
                  id="leaveType"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                  <option>연차</option>
                  <option>반차</option>
                  <option>병가</option>
                  <option>기타</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-gray-600 font-medium mb-2"
                >
                  시작일
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-gray-600 font-medium mb-2"
                >
                  종료일
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
            </div>
          </section>

          {/* 반차 여부 */}
          <section className="mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                반차 여부
              </h3>
              <div className="flex items-center gap-4">
                <label>
                  <input
                    type="radio"
                    name="halfDay"
                    value="start"
                    className="mr-2 accent-blue-500"
                  />
                  시작일
                </label>
                <label>
                  <input
                    type="radio"
                    name="halfDay"
                    value="end"
                    className="mr-2 accent-blue-500"
                  />
                  종료일
                </label>
              </div>
            </div>
          </section>

          {/* 연차 일수 */}
          <section className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="remainingDays"
                  className="block text-gray-600 font-medium mb-2"
                >
                  잔여 연차
                </label>
                <input
                  type="number"
                  id="remainingDays"
                  value="-11"
                  readOnly
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="requestedDays"
                  className="block text-gray-600 font-medium mb-2"
                >
                  신청 연차
                </label>
                <input
                  type="number"
                  id="requestedDays"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="신청 연차 입력"
                />
              </div>
            </div>
            <p className="mt-2 text-sm text-red-500">
              ⚠️ 신청 가능한 일수를 초과하였습니다.
            </p>
          </section>

          <section className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              파일 첨부
            </h3>
            <div
              className={`border border-gray-300 rounded-md p-4 ${
                dragActive ? "bg-gray-100" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="fileUpload"
                className="text-gray-500 text-sm cursor-pointer"
              >
                {selectedFile
                  ? `파일: ${selectedFile.name} (${(
                      selectedFile.size / 1024
                    ).toFixed(2)} KB)`
                  : "이 곳에 파일을 드래그 하세요. 또는 파일선택"}
              </label>
            </div>
          </section>
          {/* 관련 문서 */}
          <section>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              관련 문서
            </h3>
            <button className="px-4 py-2 bg-gray-100 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200">
              문서 검색
            </button>
          </section>
        </div>

        {/* 오른쪽 사이드바 */}
        <div className="w-64 bg-white border-l border-gray-300 p-8">
          <h3 className="text-xl font-semibold mb-6 text-center border-b-2 pb-4 border-gray-300">
            결재선
          </h3>
          <div className="space-y-4">
            {/* 결재자 카드 */}
            <div className="bg-white shadow-sm rounded-lg p-4 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
                <img
                  src="https://via.placeholder.com/48"
                  alt="결재자 사진"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800">김상후 대표이사</p>
                <p className="text-sm text-gray-500">다우그룹</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs text-white bg-blue-500 rounded">
                  승인 대기
                </span>
              </div>
            </div>

            {/* 추가 결재자 예시 */}
            <div className="bg-white shadow-sm rounded-lg p-4 flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
                <img
                  src="https://via.placeholder.com/48"
                  alt="결재자 사진"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800">이철수 본부장</p>
                <p className="text-sm text-gray-500">경영기획팀</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs text-white bg-green-500 rounded">
                  승인 완료
                </span>
              </div>
            </div>
          </div>

          {/* 추가 정보 */}
          <div className="mt-6 text-sm text-gray-600">
            <p className="font-semibold text-gray-800 mb-3">
              📋 결재 진행 상태
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  1
                </span>
                <p className="text-gray-700">승인 대기</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  2
                </span>
                <p className="text-gray-700">승인 완료</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
