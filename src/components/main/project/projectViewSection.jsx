import { useState } from "react";
import ProjectModal from "../../common/modal/projectModal";
import useModalStore from "../../../store/modalStore";

export default function ProjectViewSection() {
  // 모달 상태 관리를 위한 useState 추가
  const openModal = useModalStore((state) => state.openModal);

  return (
    <>
      {/* 모달 컴포넌트 추가 */}
      <ProjectModal />
      <article className="page-list">
        <div className="content-header">
          <div className="max-w-9xl mx-auto p-2">
            <div className="mb-3 text-center">
              <h1 className="text-4xl font-semibold">AntWork Project</h1>
            </div>

            <section className="flex gap-4 overflow-x-auto pb-6">
              <article className="flex-shrink-0 w-96  rounded-lg bg-white border border-blue-200">
                <div className="p-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">●</span>
                      <h2 className="font-semibold text-2xl">Todo</h2>
                      <span className="text-sm text-gray-500 bg-gray-50 rounded-full px-2">
                        1
                      </span>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                      <img
                        src="../../../public/images/Antwork/project/project_icon.png" // 이미지 경로
                        alt="옵션"
                        className="w-6 h-6" // 이미지 크기 설정
                      />
                    </button>
                  </div>
                  <div>
                    <p className="text-[14px] text-gray-600 mt-3">
                      작업자 선정 후 Ready
                    </p>
                  </div>
                </div>

                <section className="p-3 min-h-[calc(100vh-16rem)] bg-blue-50/50">
                  <article className="bg-white rounded-lg p-4 shadow-sm mb-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-100 relative">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        AntWork Project
                      </span>
                      <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <img
                          src="../../../public/images/Antwork/project/project_more.png" // 이미지 경로
                          alt="옵션"
                          className="w-6 h-6" // 이미지 크기 설정
                        />
                      </button>
                    </div>
                    <h3
                      onClick={() => openModal("task-edit")}
                      className="text-xl mb-2"
                    >
                      REQ-004 공통 프로젝트 설계
                    </h3>
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
                    <div className="flex gap-1">
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                        P0
                      </span>
                      <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                        XL
                      </span>
                    </div>
                  </article>

                  <button
                    onClick={() => openModal("task-create")}
                    className="w-full flex items-center text-left text-sm text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-white/30"
                  >
                    <img
                      src="../../../public/images/Antwork/project/project_addItem.png"
                      alt="추가"
                      className="w-5 h-5 mr-2"
                    />
                    <p className="text-[13px] text-gray-500">Add item</p>
                  </button>
                </section>
              </article>

              <article className="flex-shrink-0 w-96 rounded-lg bg-white border border-blue-200">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">●</span>
                      <h2 className="font-semibold text-2xl">Ready</h2>
                      <span className="text-sm text-gray-500 bg-gray-50 rounded-full px-2">
                        1
                      </span>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                      <img
                        src="../../../public/images/Antwork/project/project_icon.png" // 이미지 경로
                        alt="옵션"
                        className="w-6 h-6" // 이미지 크기 설정
                      />
                    </button>
                  </div>
                  <div>
                    <p className="text-[14px] text-gray-600 mt-3">
                      작업자 선정 후 Ready
                    </p>
                  </div>
                </div>
                <section className="p-3 min-h-[calc(100vh-16rem)] bg-blue-50/50">
                  <article className="bg-white rounded-lg p-4 shadow-sm mb-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-100 relative">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        AntWork Project
                      </span>
                      <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <img
                          src="../../../public/images/Antwork/project/project_more.png" // 이미지 경로
                          alt="옵션"
                          className="w-6 h-6" // 이미지 크기 설정
                        />
                      </button>
                    </div>
                    <h3 className="text-xl mb-2">REQ-004 공통 프로젝트 설계</h3>
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
                    <div className="flex gap-1">
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                        P0
                      </span>
                      <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                        XL
                      </span>
                    </div>
                  </article>
                  <button className="w-full flex items-center text-left text-sm text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-white/30">
                    <img
                      src="../../../public/images/Antwork/project/project_addItem.png"
                      alt="추가"
                      className="w-5 h-5 mr-2"
                    />
                    <p className="text-[13px] text-gray-500">Add item</p>
                  </button>
                </section>
              </article>

              <article className="flex-shrink-0 w-96 rounded-lg bg-white border border-blue-200">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">●</span>
                      <h2 className="font-semibold text-2xl">Doing</h2>
                      <span className="text-sm text-gray-500 bg-gray-50 rounded-full px-2">
                        1
                      </span>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                      <img
                        src="../../../public/images/Antwork/project/project_icon.png" // 이미지 경로
                        alt="옵션"
                        className="w-6 h-6" // 이미지 크기 설정
                      />
                    </button>
                  </div>
                  <div>
                    <p className="text-[14px] text-gray-600 mt-3">
                      작업자 선정 후 Ready
                    </p>
                  </div>
                </div>
                <section className="p-3 min-h-[calc(100vh-16rem)] bg-blue-50/50">
                  <article className="bg-white rounded-lg p-4 shadow-sm mb-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-100 relative">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        AntWork Project
                      </span>
                      <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <img
                          src="../../../public/images/Antwork/project/project_more.png" // 이미지 경로
                          alt="옵션"
                          className="w-6 h-6" // 이미지 크기 설정
                        />
                      </button>
                    </div>
                    <h3 className="text-xl mb-2">REQ-004 공통 프로젝트 설계</h3>
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
                    <div className="flex gap-1">
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                        P0
                      </span>
                      <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                        XL
                      </span>
                    </div>
                  </article>
                  <button className="w-full flex items-center text-left text-sm text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-white/30">
                    <img
                      src="../../../public/images/Antwork/project/project_addItem.png"
                      alt="추가"
                      className="w-5 h-5 mr-2"
                    />
                    <p className="text-[13px] text-gray-500">Add item</p>
                  </button>
                </section>
              </article>

              <article className="flex-shrink-0 w-96  rounded-lg bg-white border border-blue-200">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-green-500">●</span>
                      <h2 className="font-semibold text-2xl">Done</h2>
                      <span className="text-sm text-gray-500 bg-gray-50 rounded-full px-2">
                        1
                      </span>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                      <img
                        src="../../../public/images/Antwork/project/project_icon.png" // 이미지 경로
                        alt="옵션"
                        className="w-6 h-6" // 이미지 크기 설정
                      />
                    </button>
                  </div>
                  <div>
                    <p className="text-[14px] text-gray-600 mt-3">
                      작업자 선정 후 Ready
                    </p>
                  </div>
                </div>
                <section className="p-3 min-h-[calc(100vh-16rem)] bg-blue-50/50">
                  <article className="bg-white rounded-lg p-4 shadow-sm mb-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-100 relative">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-medium text-gray-600">
                        AntWork Project
                      </span>
                      <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <img
                          src="../../../public/images/Antwork/project/project_more.png" // 이미지 경로
                          alt="옵션"
                          className="w-6 h-6" // 이미지 크기 설정
                        />
                      </button>
                    </div>
                    <h3 className="text-xl mb-2">REQ-004 공통 프로젝트 설계</h3>
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
                    <div className="flex gap-1">
                      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                        P0
                      </span>
                      <span className="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                        XL
                      </span>
                    </div>
                  </article>
                  <button className="w-full flex items-center text-left text-sm text-gray-400 hover:text-gray-600 p-2 rounded-lg hover:bg-white/30">
                    <img
                      src="../../../public/images/Antwork/project/project_addItem.png"
                      alt="추가"
                      className="w-5 h-5 mr-2"
                    />
                    <p className="text-[13px] text-gray-500">Add item</p>
                  </button>
                </section>
              </article>

              <div className="text-center">
                <button
                  className="w-full flex items-center justify-center space-x-2 p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-blue-100 hover:border-blue-300 hover:text-blue-700 h-10 transition-colors"
                  style={{ backgroundColor: "#D9E8FF" }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
