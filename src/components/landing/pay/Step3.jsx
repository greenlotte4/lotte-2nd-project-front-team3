import React, { useState } from "react";

const Step3 = ({ state, dispatch, handleNextStep }) => {
  const [invitedEmails, setInvitedEmails] = useState([]);
  const [emailInput, setEmailInput] = useState("");

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 형식 확인
      if (!file.type.startsWith("image/")) {
        dispatch({
          type: "SET_ERROR",
          payload: "이미지 파일만 업로드 가능합니다.",
        });
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      dispatch({ type: "SET_LOGO", payload: file });
      dispatch({ type: "SET_LOGO_PREVIEW", payload: previewUrl });
      dispatch({ type: "SET_ERROR", payload: null }); // 오류 초기화
    }
  };

  const handleInvite = () => {
    if (emailInput.trim() === "" || !emailInput.includes("@")) {
      dispatch({
        type: "SET_ERROR",
        payload: "유효한 이메일을 입력하세요.",
      });
      return;
    }
    setInvitedEmails([...invitedEmails, emailInput]);
    setEmailInput("");
    dispatch({ type: "SET_ERROR", payload: null }); // 오류 초기화
  };

  const handleEmailDelete = (email) => {
    setInvitedEmails(invitedEmails.filter((item) => item !== email));
  };

  const isButtonDisabled =
    !state.companyName || invitedEmails.length === 0 || !state.logoPreview;

  return (
    <div className="step-container flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">추가 설정</h1>
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
          onChange={handleLogoUpload}
          className="px-4 py-2 border rounded-lg focus:outline-none"
        />
        {state.logoPreview && (
          <img
            src={state.logoPreview}
            alt="로고 미리보기"
            className="w-32 h-32 object-contain border rounded-md mt-4"
          />
        )}

        {/* 사용자 초대 */}
        <label className="text-gray-700 font-medium">사용자 초대</label>
        <div className="flex space-x-2">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="초대할 이메일 입력"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
          />
          <button
            onClick={handleInvite}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            추가
          </button>
        </div>
        <ul className="mt-2 space-y-2">
          {invitedEmails.map((email, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
            >
              <span>{email}</span>
              <button
                onClick={() => handleEmailDelete(email)}
                className="text-red-500 hover:underline"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>

        {/* 오류 메시지 */}
        {state.error && (
          <p className="text-red-500 text-center mt-4">{state.error}</p>
        )}

        {/* 설정 완료 버튼 */}
        <button
          onClick={(e) => {
            e.preventDefault();
            handleNextStep();
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
