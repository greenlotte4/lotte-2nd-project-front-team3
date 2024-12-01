import { Line, Doughnut, Bar, Bubble } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BubbleController,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  BubbleController,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AdminMain() {
  // 라인 차트 데이터
  const lineData = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월"],
    datasets: [
      {
        label: "활성 사용자 수",
        data: [50, 65, 80, 90, 120, 150],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
      },
    ],
  };

  // 도넛 차트 데이터
  const doughnutData = {
    labels: ["활성 사용자", "비활성 사용자"],
    datasets: [
      {
        label: "사용자 상태",
        data: [100, 25],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(255, 99, 132)"],
        hoverBackgroundColor: ["rgba(54, 162, 235, 0.8)", "rgba(255, 99, 132, 0.8)"],
      },
    ],
  };

  // 막대 차트 데이터 (프로젝트 상태)
  const barData = {
    labels: ["진행 중", "완료", "대기 중"],
    datasets: [
      {
        label: "프로젝트 상태",
        data: [10, 15, 5],
        backgroundColor: ["rgb(54, 162, 235)", "rgb(75, 192, 192)", "rgb(255, 206, 86)"],
        borderColor: ["rgba(54, 162, 235, 0.8)", "rgba(75, 192, 192, 0.8)", "rgba(255, 206, 86, 0.8)"],
        borderWidth: 1,
      },
    ],
  };

  // 버블 차트 데이터 (스프린트 진행률)
  const bubbleData = {
    datasets: [
      {
        label: "스프린트 진행률",
        data: [
          { x: 1, y: 80, r: 10 }, // 첫 번째 스프린트
          { x: 2, y: 60, r: 15 }, // 두 번째 스프린트
          { x: 3, y: 90, r: 12 }, // 세 번째 스프린트
        ],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <section className="p-6 space-y-6 bg-gray-100 rounded-lg shadow-lg">
      {/* 헤더 */}
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">관리자 대시보드</h1>
        <div className="flex items-center space-x-4">
          <p className="text-gray-600">관리자님 환영합니다</p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            로그아웃
          </button>
        </div>
      </header>

  {/* 통계 카드 */}
<div className="grid grid-cols-4 gap-6">
  {[
    { title: "총 사용자 수", value: "125명", color: "text-blue-500" },
    { title: "활성 사용자 수", value: "100명", color: "text-green-500" },
    { title: "업로드된 문서 수", value: "45건", color: "text-yellow-500" },
    { title: "결재 대기", value: "5건", color: "text-red-500" },
  ].map((card, index) => (
    <div key={index} className="p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h2>
      <p className={`text-4xl font-bold ${card.color} mt-2`}>{card.value}</p>
    </div>
  ))}
</div>


      {/* 차트와 기타 섹션 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 프로젝트 상태 (막대 차트) */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">프로젝트 상태</h3>
          <Bar data={barData} />
        </div>

        {/* 스프린트 진행률 (버블 차트) */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">스프린트 진행률</h3>
          <Bubble data={bubbleData} />
        </div>
      </div>

      {/* 추가 차트 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 라인 차트 */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">월별 활성 사용자 변화</h3>
          <Line data={lineData} />
        </div>

        {/* 도넛 차트 */}
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">사용자 상태</h3>
          <Doughnut data={doughnutData} />
        </div>
      </div>
    </section>
  );
}
