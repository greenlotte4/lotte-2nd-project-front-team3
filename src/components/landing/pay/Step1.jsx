import React from "react";

const Step1 = ({ state, dispatch, handleNextStep, handleAutoGenerate }) => (
  <div className="step-container flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">구매 완료</h1>
    <p className="text-gray-600 mb-6 text-center">
      구매가 성공적으로 완료되었습니다. 관리자 계정을 설정해주세요.
    </p>
    {!state.manualInput ? (
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => dispatch({ type: "SET_MANUAL_INPUT", payload: true })}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          아이디와 비밀번호 직접 입력
        </button>
        <button
          onClick={handleAutoGenerate}
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
        >
          시스템에서 자동 발급
        </button>
        {state.generated && (
          <div className="bg-gray-100 p-4 rounded-lg mt-4">
            <p className="text-gray-700">아이디: {state.adminId}</p>
            <p className="text-gray-700">비밀번호: {state.adminPassword}</p>
          </div>
        )}
      </div>
    ) : (
      <form
        className="w-full max-w-sm flex flex-col space-y-4"
        onSubmit={(e) => {
          e.preventDefault(); // 기본 동작 방지
          handleNextStep(); // 다음 단계로 이동
        }}
      >
        <label className="text-gray-700 font-medium">아이디</label>
        <input
          type="text"
          value={state.adminId}
          onChange={(e) =>
            dispatch({ type: "SET_ADMIN_ID", payload: e.target.value })
          }
          className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />
        <label className="text-gray-700 font-medium">비밀번호</label>
        <input
          type="password"
          value={state.adminPassword}
          onChange={(e) =>
            dispatch({ type: "SET_ADMIN_PASSWORD", payload: e.target.value })
          }
          className="px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          다음 단계로 이동
        </button>
      </form>
    )}
  </div>
);

export default Step1;
