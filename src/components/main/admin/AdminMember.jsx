import { Link } from "react-router-dom";
import useModalStore from "../../../store/modalStore";
import AdminModal from "../../common/modal/adminModal";
import useAuthStore from "./../../../store/AuthStore";
import { useEffect, useState } from "react";
import { selectMembers } from "./../../../api/userAPI";

export default function AdminMember() {
  const openModal = useModalStore((state) => state.openModal);
  const user = useAuthStore((state) => state.user); // Zustand에서 사용자 정보 가져오기

  const [members, setMembers] = useState([]); // 멤버 목록 상태
  const [totalMembers, setTotalMembers] = useState(0); // 전체 멤버 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [pageSize, setPageSize] = useState(10); // 페이지 크기

  useEffect(() => {
    const loadMembers = async () => {
      if (!user?.company) return; // 회사 정보가 없으면 실행하지 않음
      try {
        const data = await selectMembers(user.company, currentPage, pageSize);
        setMembers(data.content); // 멤버 리스트 설정
        setTotalMembers(data.totalElements); // 전체 멤버 수 설정
      } catch (error) {
        console.error("멤버 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    loadMembers();
  }, [user?.company, currentPage, pageSize]);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(totalMembers / pageSize);

  const handlePageChange = (newPage) => setCurrentPage(newPage);
  const handlePageSizeChange = (e) => setPageSize(parseInt(e.target.value, 10));
  return (
    <>
      <AdminModal />
      <article className="page-list">
        <div className="content-header">
          <h1>멤버 관리</h1>
          <p className="!mb-5">멤버 관리하는 페이지 입니다.</p>
        </div>
        <section className="mb-4 mx-4">
          <div className="flex justify-between items-center">
            <div className="text-gray-600 mx-4">
              <span>전체 멤버 수: </span>
              <strong>{totalMembers} 명</strong>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600"
                onClick={() => openModal("member-invite")}
              >
                멤버 생성
              </button>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded mr-2 hover:bg-yellow-600">
                직위 변경
              </button>
              <button className="bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600">
                멤버 삭제
              </button>
              <button className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
                비밀번호 초기화
              </button>
            </div>
          </div>
        </section>
        <section className="h-[800px] overflow-auto mx-4">
          <div className="flex justify-between mb-4 mx-4">
            <div className="flex items-center">
              <input
                type="text"
                placeholder="이름 + 이메일 검색"
                className="border border-gray-300 rounded py-2 px-4 mr-2"
              />
              <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                검색
              </button>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600">페이지당</span>
              <select
                className="border border-gray-300 rounded mx-2"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span className="text-gray-600">개</span>
            </div>
          </div>
          <table className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden ml-4 mr-4">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <th className="py-3 px-6 text-left">이름</th>
                <th className="py-3 px-6 text-left">부서</th>
                <th className="py-3 px-6 text-left">직급</th>
                <th className="py-3 px-6 text-left">이메일</th>
                <th className="py-3 px-6 text-left">상태</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="text-center">
                    <input type="checkbox" className="mx-auto" />
                  </td>

                  <td className="py-3 px-6">{member.name}</td>
                  <td className="py-3 px-6">{member.departmentName}</td>
                  <td className="py-3 px-6">{member.position}</td>
                  <td className="py-3 px-6">{member.email}</td>
                  <td className="py-3 px-6">{member.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-4">
            {/* 이전 버튼 */}
            {currentPage > 1 && (
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className="text-gray-700 py-2 px-4 rounded-l hover:bg-gray-100"
              >
                이전
              </button>
            )}

            {/* 현재 페이지 표시 */}
            <span className="mx-4">{currentPage}</span>

            {/* 다음 버튼 */}
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="text-gray-700 py-2 px-4 rounded-r hover:bg-gray-100"
              >
                다음
              </button>
            )}
          </div>
        </section>
      </article>
    </>
  );
}
