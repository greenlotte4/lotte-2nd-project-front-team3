import { completeSetup } from "./../../../hooks/Lending/completeSetup";
const Step3 = ({ state, dispatch, handleNextStep }) => {
  const isButtonDisabled =
    !state.companyName || !state.logoPreview || !state.foundationDate;

  const handleComplete = async () => {
    await completeSetup(state, dispatch);
  };

  return (
    <div className="step-container flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">회사 설정</h1>
      <div className="w-full max-w-sm flex flex-col space-y-4">
        {/* 회사 이름 입력 */}
        <label className="text-gray-700 font-medium">회사 이름</label>
        <input
          type="text"
          value={state.companyName}
          onChange={(e) =>
            dispatch({ type: "SET_COMPANY_NAME", payload: e.target.value })
          }
          className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />

        {/* 로고 업로드 */}
        <label className="text-gray-700 font-medium">로고 업로드</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith("image/")) {
              const previewUrl = URL.createObjectURL(file);
              dispatch({ type: "SET_LOGO", payload: file });
              dispatch({ type: "SET_LOGO_PREVIEW", payload: previewUrl });
            }
          }}
          className="px-4 py-2 border rounded-lg focus:outline-none"
        />
        {state.logoPreview && (
          <img
            src={state.logoPreview}
            alt="로고 미리보기"
            className="w-32 h-32 object-contain border rounded-md mt-4"
          />
        )}

        {/* 회사 소개 */}
        <label className="text-gray-700 font-medium">회사 소개</label>
        <textarea
          value={state.companyDescription}
          onChange={(e) =>
            dispatch({
              type: "SET_COMPANY_DESCRIPTION",
              payload: e.target.value,
            })
          }
          placeholder="회사에 대한 간단한 설명을 입력하세요."
          className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />

        {/* 설립일 */}
        <label className="text-gray-700 font-medium">설립일</label>
        <input
          type="date"
          value={state.foundationDate}
          onChange={(e) =>
            dispatch({ type: "SET_FOUNDATION_DATE", payload: e.target.value })
          }
          className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />

        {/* 대표 이메일 */}
        <label className="text-gray-700 font-medium">대표 이메일</label>
        <input
          type="email"
          value={state.adminEmail}
          onChange={(e) =>
            dispatch({ type: "SET_ADMIN_EMAIL", payload: e.target.value })
          }
          placeholder="example@company.com"
          className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />

        {/* 운영 시간 */}
        <label className="text-gray-700 font-medium">운영 시간</label>
        <div className="flex space-x-2">
          <input
            type="time"
            value={state.startTime}
            onChange={(e) =>
              dispatch({ type: "SET_START_TIME", payload: e.target.value })
            }
            className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <span>~</span>
          <input
            type="time"
            value={state.endTime}
            onChange={(e) =>
              dispatch({ type: "SET_END_TIME", payload: e.target.value })
            }
            className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* 회사 주소 */}
        <label className="text-gray-700 font-medium">회사 주소</label>
        <input
          type="text"
          value={state.address}
          onChange={(e) =>
            dispatch({ type: "SET_ADDRESS", payload: e.target.value })
          }
          placeholder="주소를 입력하세요."
          className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />

        {/* 사업자 등록 번호 */}
        <label className="text-gray-700 font-medium">사업자 등록 번호</label>
        <input
          type="text"
          value={state.businessNumber}
          onChange={(e) =>
            dispatch({ type: "SET_BUSINESS_NUMBER", payload: e.target.value })
          }
          placeholder="사업자 등록 번호를 입력하세요."
          className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />

        {/* 설정 완료 버튼 */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleComplete(); // 설정 완료 호출
          }}
          disabled={isButtonDisabled}
          className={`w-full px-6 py-3 text-white rounded-lg transition ${
            isButtonDisabled
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          설정 완료
        </button>
      </div>
    </div>
  );
};

export default Step3;
