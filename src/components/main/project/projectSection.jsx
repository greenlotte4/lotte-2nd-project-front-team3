export default function ProjectSection() {
  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <div className="max-w-9xl mx-auto p-6">
            <div className="mb-6">
              <h1 className="text-xl font-semibold">My Projects</h1>
              <p className="text-sm text-gray-500"> 내가 참여중인 프로젝트</p>
            </div>

            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search"
                className="w-[300px] pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>

            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div className="flex flex-col">
                    <a href="#" className="font-medium text-[16px]">
                      Project Name
                    </a>
                    <span className="text-[11px] text-[#6b7280]">
                      ID updated last week
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    <img
                      src="/api/placeholder/32/32"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      alt="User 1"
                    />
                    <img
                      src="/api/placeholder/32/32"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      alt="User 2"
                    />
                    <img
                      src="/api/placeholder/32/32"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      alt="User 3"
                    />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs">
                      +2
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div className="flex flex-col">
                    <a href="#" className="font-medium text-[16px]">
                      Project Name
                    </a>
                    <span className="text-[11px] text-[#6b7280]">
                      ID updated last week
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    <img
                      src="/api/placeholder/32/32"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      alt="User 1"
                    />
                    <img
                      src="/api/placeholder/32/32"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      alt="User 2"
                    />
                    <img
                      src="/api/placeholder/32/32"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      alt="User 3"
                    />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs">
                      +2
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div className="flex flex-col">
                    <a href="#" className="font-medium text-[16px]">
                      Project Name
                    </a>
                    <span className="text-[11px] text-[#6b7280]">
                      ID updated last week
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    <img
                      src="/api/placeholder/32/32"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      alt="User 1"
                    />
                    <img
                      src="/api/placeholder/32/32"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      alt="User 2"
                    />
                    <img
                      src="/api/placeholder/32/32"
                      className="w-8 h-8 rounded-full border-2 border-white"
                      alt="User 3"
                    />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs">
                      +2
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
