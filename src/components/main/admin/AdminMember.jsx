import { Link } from "react-router-dom";

export default function AdminMember() {
  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <h1>멤버 관리</h1>
          <p className="!mb-5">멤버 초대링크 만드는 페이지 입니다.</p>
        </div>
        <section className="mb-4 mx-4">
          <div className="flex justify-between items-center">
            <div className="text-gray-600 mx-4">
              <span>전체 멤버 수: </span>
              <strong>165 명</strong>
            </div>
            <div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600">
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
              <select className="border border-gray-300 rounded mx-2">
                <option>20</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span className="text-gray-600">개</span>
            </div>
          </div>
          <table className="w-full bg-white !border border-gray-200 rounded-lg overflow-hidden ml-4 mr-4 ">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal rounded-[10px]">
              <tr>
                <th>
                  {" "}
                  <input type="checkbox" />
                </th>
                <th className="py-3 px-6 text-left whitespace-nowrap">이름</th>
                <th className="py-3 px-6 text-left whitespace-nowrap">부서</th>
                <th className="py-3 px-6 text-left whitespace-nowrap">직급</th>
                <th className="py-3 px-6 text-left whitespace-nowrap">
                  이메일
                </th>

                <th className="py-3 px-6 text-left whitespace-nowrap">멤버</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              <tr className="border-b border-gray-200 hover:bg-gray-100 ">
                <th className="">
                  {" "}
                  <input type="checkbox" />
                </th>
                <td className="py-3 px-6">황수빈</td>
                <td className="py-3 px-6">개발팀</td>
                <td className="py-3 px-6">사원</td>
                <td className="py-3 px-6">teacher@example.com</td>

                <td className="py-3 px-6">원활</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <th className="">
                  {" "}
                  <input type="checkbox" />
                </th>
                <td className="py-3 px-6">김민희</td>
                <td className="py-3 px-6">개발팀</td>
                <td className="py-3 px-6">사원</td>
                <td className="py-3 px-6">hongil@example.com</td>

                <td className="py-3 px-6">원활</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <th className="">
                  {" "}
                  <input type="checkbox" />
                </th>
                <td className="py-3 px-6">김민희</td>
                <td className="py-3 px-6">개발팀</td>
                <td className="py-3 px-6">사원</td>
                <td className="py-3 px-6">hongil@example.com</td>

                <td className="py-3 px-6">원활</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <th className="">
                  {" "}
                  <input type="checkbox" />
                </th>
                <td className="py-3 px-6">김민희</td>
                <td className="py-3 px-6">개발팀</td>
                <td className="py-3 px-6">사원</td>
                <td className="py-3 px-6">hongil@example.com</td>

                <td className="py-3 px-6">원활</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <th className="">
                  {" "}
                  <input type="checkbox" />
                </th>
                <td className="py-3 px-6">김민희</td>
                <td className="py-3 px-6">개발팀</td>
                <td className="py-3 px-6">사원</td>
                <td className="py-3 px-6">hongil@example.com</td>

                <td className="py-3 px-6">원활</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <th className="">
                  {" "}
                  <input type="checkbox" />
                </th>
                <td className="py-3 px-6">김민희</td>
                <td className="py-3 px-6">개발팀</td>
                <td className="py-3 px-6">사원</td>
                <td className="py-3 px-6">hongil@example.com</td>

                <td className="py-3 px-6">원활</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <th className="">
                  {" "}
                  <input type="checkbox" />
                </th>
                <td className="py-3 px-6">김민희</td>
                <td className="py-3 px-6">개발팀</td>
                <td className="py-3 px-6">사원</td>
                <td className="py-3 px-6">hongil@example.com</td>

                <td className="py-3 px-6">원활</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <th className="">
                  {" "}
                  <input type="checkbox" />
                </th>
                <td className="py-3 px-6">김민희</td>
                <td className="py-3 px-6">개발팀</td>
                <td className="py-3 px-6">사원</td>
                <td className="py-3 px-6">hongil@example.com</td>

                <td className="py-3 px-6">원활</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <th className="">
                  {" "}
                  <input type="checkbox" />
                </th>
                <td className="py-3 px-6">김민희</td>
                <td className="py-3 px-6">개발팀</td>
                <td className="py-3 px-6">사원</td>
                <td className="py-3 px-6">hongil@example.com</td>

                <td className="py-3 px-6">원활</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <th className="">
                  {" "}
                  <input type="checkbox" />
                </th>
                <td className="py-3 px-6">김민희</td>
                <td className="py-3 px-6">개발팀</td>
                <td className="py-3 px-6">사원</td>
                <td className="py-3 px-6">hongil@example.com</td>

                <td className="py-3 px-6">원활</td>
              </tr>

              {/* 추가 멤버 항목을 여기에 추가할 수 있습니다. */}
            </tbody>
          </table>
          <div className="flex justify-center items-center mt-4">
            <button className=" text-gray-700 py-2 px-4 rounded-l hover:bg-gray-100">
              이전
            </button>
            <Link to="" className="mx-4 text-black-600">
              1
            </Link>
            <Link to="" className="mx-4 text-gray-600">
              2
            </Link>
            <Link to="" className="mx-4 text-gray-600">
              3
            </Link>

            <button className="text-gray-700 py-2 px-4 rounded-r hover:bg-gray-100">
              다음
            </button>
          </div>
        </section>
      </article>
    </>
  );
}
