import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProjectMainSection() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // API 호출 및 데이터 상태 업데이트
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/project/main"); // API 호출
        setProjects(response.data); // API 응답 데이터 상태에 저장
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects(); // 컴포넌트 마운트 시 API 호출
  }, []);

  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <div className="max-w-9xl mx-auto p-6">
            <div className="mb-6">
              <h1 className="text-xl font-semibold">My Projects</h1>
              <p className="text-sm text-gray-500">내가 참여 중인 프로젝트</p>
            </div>
            <div className="relative mb-6 flex items-center">
              <input
                type="text"
                placeholder="Search"
                className="w-[1380px] pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            0
            <div className="space-y-4">
              {/* 프로젝트 리스트 렌더링 */}
              {projects.length > 0 ? (
                projects.map(
                  (
                    project // 프로젝트 데이터 순회
                  ) => (
                    <div
                      key={project.id} // 프로젝트 ID를 키로 사용
                      className="bg-white p-8 rounded-lg shadow flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-8">
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <img
                            src="/images/Antwork/project/project.png"
                            alt="Project Icon"
                            className="w-full h-full object-cover mr-4"
                          />
                        </div>
                        <div className="flex flex-col gap-3">
                          <Link
                            to={`/antwork/project/view/${project.id}`} // 상세 페이지
                            className="font-medium text-[20px]"
                          >
                            {project.projectName}
                          </Link>
                          {/* <span className="text-[14px] text-[#6b7280]">
                            {project.updatedAt
                              ? `Last updated: ${new Date(
                                  project.updatedAt
                                ).toLocaleDateString()}` // [추가] 업데이트 날짜 표시
                              : "New Project"}
                          </span> */}
                        </div>
                      </div>
                      <button className="w-10 h-10 rounded-lg overflow-hidden bg-transparent border-none">
                        <img
                          src="/images/Antwork/project/project_delete.png"
                          alt="Delete"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    </div>
                  )
                )
              ) : (
                <p className="text-center text-gray-500">No projects found</p> // [추가] 프로젝트가 없을 때 표시
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
