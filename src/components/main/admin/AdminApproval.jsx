export default function AdminApproval() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* 상단 헤더 */}
      <div className="bg-white shadow px-6 py-4 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">결재 관리</h1>
        <select className="px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-800">
          <option value="전체">전체</option>
          <option value="대기">대기</option>
          <option value="승인">승인</option>
          <option value="반려">반려</option>
        </select>
      </div>

      {/* 결재 요청 목록 */}
      <div className="flex-grow p-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            결재 요청 목록
          </h2>
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-600 font-medium">
              <tr>
                <th className="p-3 border-b">제목</th>
                <th className="p-3 border-b">신청자</th>
                <th className="p-3 border-b">상태</th>
                <th className="p-3 border-b text-center">액션</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="p-3 border-b">출장 신청</td>
                <td className="p-3 border-b">홍길동</td>
                <td className="p-3 border-b">
                  <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    대기
                  </span>
                </td>
                <td className="p-3 border-b text-center">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
                    승인
                  </button>
                  <button className="ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                    반려
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="p-3 border-b">휴가 신청</td>
                <td className="p-3 border-b">김철수</td>
                <td className="p-3 border-b">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-800">
                    승인
                  </span>
                </td>
                <td className="p-3 border-b text-center">
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
                  >
                    승인
                  </button>
                  <button
                    disabled
                    className="ml-2 px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
                  >
                    반려
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="p-3 border-b">출장 신청</td>
                <td className="p-3 border-b">이영희</td>
                <td className="p-3 border-b">
                  <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-800">
                    반려
                  </span>
                </td>
                <td className="p-3 border-b text-center">
                  <button
                    disabled
                    className="px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
                  >
                    승인
                  </button>
                  <button
                    disabled
                    className="ml-2 px-4 py-2 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed"
                  >
                    반려
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
