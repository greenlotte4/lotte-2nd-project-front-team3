import { Link } from "react-router-dom";

export default function ProjectMainSection() {
  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <div className="max-w-9xl mx-auto p-6">
            <div className="mb-6">
              <h1 className="text-xl font-semibold">My Projects</h1>
              <p className="text-sm text-gray-500"> 내가 참여중인 프로젝트</p>
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              <div className="ml-4">
                <div className="w-10 h-10 rounded-lg overflow-hidden">
                  <img
                    src="../../../public/images/Antwork/project/project_sort.png"
                    alt="Description"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-white p-8 rounded-lg shadow flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img
                      src="../../../public/images/Antwork/project/project.png"
                      alt="Description"
                      className="w-full h-full object-cover mr-4"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Link
                      to={`/antwork/project/view`}
                      className="font-medium text-[20px]"
                    >
                      Project Name
                    </Link>
                    <span className="text-[14px] text-[#6b7280]">
                      #2 updated last week
                    </span>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-lg overflow-hidden bg-transparent border-none">
                  <img
                    src="../../../public/images/Antwork/project/project_delete.png"
                    alt="Description"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>

              <div className="bg-white p-8 rounded-lg shadow flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img
                      src="../../../public/images/Antwork/project/project.png"
                      alt="Description"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <a href="#" className="font-medium text-[20px]">
                      Project Name
                    </a>
                    <span className="text-[14px] text-[#6b7280]">
                      #2 updated last week
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 flex -space-x-4">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Profile"
                      className="w-8 h-8 rounded-full border border-gray-300 z-10"
                    />
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Profile"
                      className="w-8 h-8 rounded-full border border-gray-300 z-20"
                    />
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Profile"
                      className="w-8 h-8 rounded-full border border-gray-300 z-30"
                    />
                  </div>
                </div>
                <button className="w-10 h-10 rounded-lg overflow-hidden bg-transparent border-none">
                  <img
                    src="../../../public/images/Antwork/project/project_delete.png"
                    alt="Description"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>

              <div className="bg-white p-8 rounded-lg shadow flex items-center justify-between">
                <div className="flex items-center space-x-8">
                  <div className="w-12 h-12 rounded-lg overflow-hidden">
                    <img
                      src="../../../public/images/Antwork/project/project.png"
                      alt="Description"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <a href="#" className="font-medium text-[20px]">
                      Project Name
                    </a>
                    <span className="text-[14px] text-[#6b7280]">
                      #2 updated last week
                    </span>
                  </div>
                </div>
                <button className="w-10 h-10 rounded-lg overflow-hidden bg-transparent border-none">
                  <img
                    src="../../../public/images/Antwork/project/project_delete.png"
                    alt="Description"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
