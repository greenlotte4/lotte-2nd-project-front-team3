import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../../../api/projectAPI";
import { useAuthStore } from "../../../store/authStore";

export default function ProjectMainSection() {
  const [projects, setProjects] = useState([]);
  const user = useAuthStore((state) => state.user); // Zustand에서 사용자 정보 가져오기

  //const uid = useState(user.uid);
  const uid = "qwer123";

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectData = await getProjects(uid); // API 호출
        console.log("Fetched project data:", projectData); // 데이터 확인
        setProjects(projectData); // 상태에 데이터 저장
      } catch (error) {
        console.error("Error fetching projects:", error);
        alert("프로젝트 데이터를 가져오는 중 오류가 발생했습니다.");
      }
    };

    fetchProjects(); // 컴포넌트 마운트 시 데이터 가져오기
  }, [user.uid]); // UID 변경 시 데이터 다시 가져오기

  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <div className="max-w-9xl mx-auto p-6">
            <div className="mb-6">
              <h1 className="text-xl font-semibold">My Projects</h1>
              <p className="text-sm text-gray-500">내가 참여 중인 프로젝트</p>
            </div>
            <div className="space-y-4">
              {/* 프로젝트 리스트 렌더링 */}
              {projects.length > 0 ? (
                projects.map((project) => (
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
                          to={`/antwork/project/view?id=${project.id}`} // 상세 페이지 경로
                          className="font-medium text-[20px]"
                        >
                          {project.projectName}
                        </Link>
                        <span className="text-[14px] text-[#6b7280]">
                          {project.status === 0 ? "In Progress" : "Completed"}{" "}
                          {/* 상태 표시 */}
                        </span>
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
                ))
              ) : (
                <p className="text-center text-gray-500">No projects found</p>
              )}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
