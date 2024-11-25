export default function ProjectViewSection() {
  return (
    <div class="min-h-screen bg-gray-100 p-6">
      <div class="mb-6">
        <h1 class="text-sm text-gray-500">AntWork 프로젝트</h1>
      </div>

      <div class="flex gap-4 overflow-x-auto pb-6">
        <div class="flex-shrink-0 w-80 rounded-lg bg-white border border-gray-200">
          <div class="p-4 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-gray-400">○</span>
                <h2 class="font-semibold">Backlog</h2>
                <span class="text-sm text-gray-500 bg-gray-50 rounded-full px-2">
                  1/5
                </span>
              </div>
            </div>
          </div>
          <div class="p-3 min-h-[calc(100vh-16rem)] bg-gray-50">
            <div class="bg-white rounded-lg p-4 shadow-sm mb-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-100">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-sm font-medium text-gray-600">test</span>
              </div>
              <h3 class="font-medium mb-2">작업자가 선정되지 않은 할 일</h3>
            </div>

            <button class="w-full text-left text-sm text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-white/50">
              + Add item
            </button>
          </div>
        </div>

        <div class="flex-shrink-0 w-80 rounded-lg bg-white border border-blue-200">
          <div class="p-4 border-b border-gray-100">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-blue-500">◎</span>
                <h2 class="font-semibold">Ready</h2>
                <span class="text-sm text-gray-500 bg-gray-50 rounded-full px-2">
                  1
                </span>
              </div>
            </div>
          </div>
          <div class="p-3 min-h-[calc(100vh-16rem)] bg-blue-50/50">
            <div class="bg-white rounded-lg p-4 shadow-sm mb-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-100">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-sm font-medium text-gray-600">
                  team4-lotteon-project-#10
                </span>
              </div>
              <h3 class="font-medium mb-2">REQ-004 공통 프로젝트 설계</h3>
              <p class="text-sm text-gray-600 mb-2">작업자 선정 후 Ready</p>
              <div class="flex gap-1">
                <span class="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
                  P0
                </span>
                <span class="px-2 py-1 text-xs rounded bg-purple-100 text-purple-700">
                  XL
                </span>
              </div>
            </div>

            <button class="w-full text-left text-sm text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-white/50">
              + Add item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
