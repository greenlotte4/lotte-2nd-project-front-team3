/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
{
  /*
    날짜 : 2024/11/27(수)
    생성자 : 김민희
    내용 : BoardList.jsx - 게시판 목록 페이지 화면구현

    수정 내역 : 

  */
}

export default function BoardList() {

  // 컴포넌트 코드
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: '안녕하세요. 퇴사하겠습니다. 그럼 이만 총총총 헤헤헤 ^^ 글 잘리나 대표님 저 잘라주세요 글자도 잘라주세여',
      author: '김사원 ',
      date: '2024-11-27',
      views: 9697,
      likes: 1016,
      commentCount: 3
    },

    {
      id: 2,
      title: '오늘 점심 메뉴 추천 해주세여 - 엽떡이었으면 좋겠다 크크크크크크',
      author: '황사원 ',
      date: '2024-11-27',
      views: 9697,
      likes: 1016,
      commentCount: 3
    },
    {
      id: 3,
      title: '경고 메시지입니다 자유게시판이지만 너무 자유롭지 마십시오.',
      author: '최사원ᖳ ',
      date: '2024-11-27',
      views: 9697,
      likes: 1016,
      commentCount: 3
    },
    {
      id: 4,
      title: '안녕하세요. 앤드워크에 관한 모든 비밀을 담은 자료입니다!',
      author: '정사원ᖳ ',
      date: '2024-11-27',
      views: 9697,
      likes: 1016,
      commentCount: 3
    },
    {
      id: 5,
      title: '안녕하세요. 열람권한이 없는 게시물입니다.',
      author: '강사원ᖳ ',
      date: '2024-11-27',
      views: 9697,
      likes: 1016,
      commentCount: 3
    },
    {
      id: 6,
      title: '성과면담 및 이의제기 안내',
      author: '하사원ᖳ ',
      date: '2024-11-27',
      views: 9697,
      likes: 1016,
      commentCount: 1000
    },
  ]);


    return (
        <>
            <>
      <article className="page-list">
        <div className="content-header mx-auto">
          <h1>자유게시판</h1>
          <p className="!mb-5">친애하는 Antwork 여러분 마음속 깊은 이야기를 자유롭게 공유해 주십시오 ^^ !</p>
        </div>
        <section className="">
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              <span>전체 게시 글: </span>
              <strong>961,011 개</strong>
            </div>
            <div className="">
              <button className="cursor-pointer bg-blue-500 text-white py-2 px-4 rounded mr-2 hover:bg-blue-600">
                글쓰기
              </button>
              <button className="cursor-pointer bg-yellow-500 text-white py-2 px-4 rounded mr-2 hover:bg-yellow-600">
                내 글만 보기
              </button>
              <button className="cursor-pointer bg-red-500 text-white py-2 px-4 rounded mr-2 hover:bg-red-600">
                글 삭제
              </button>
              <button className="cursor-pointer bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
                휴지통
              </button>
            </div>
          </div>
        </section>
        <section className="h-[800px] overflow-auto">
          <div className="flex justify-between mb-4">

            <div className="flex items-center ">
            <select className="border border-gray-300 rounded py-2 px-2 mr-2 w-20 cursor-pointer">
                <option>제목</option>
                <option>작성자</option>
                <option>제목 + 작성자</option>
              </select>
              <input
                type="text"
                placeholder="검색어를 입력해 주세요."
                className="border border-gray-300 rounded py-2 px-4 mr-2"
              />
              <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                검색
              </button>
            </div>

            {/* 페이지 당 */}
            <div className="flex items-center">
              <span className="text-gray-600">페이지당</span>
              <select className="border border-gray-300 rounded mx-2">
                <option>10</option>
                <option>20</option>
                <option>50</option>
              </select>
              <span className="text-gray-600">개</span>
            </div>



          </div>
          <table className="w-full bg-white !border border-gray-200 rounded-lg overflow-hidden ml-4 mr-4 ">
            <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal rounded-[10px] text-center">
              <tr>
                <th className="py-3 px-6 text-center whitespace-nowrap w-11">번호</th>
                  <th className="py-3 px-6 text-center whitespace-nowrap w-1/2">
                    제목 
                  </th>
                
                <th className="py-3 px-6 text-center whitespace-nowrap w-1/11">작성자</th>
                <th className="py-3 px-6 text-center whitespace-nowrap w-1/6">날짜</th>
                <th className="py-3 px-6 text-center whitespace-nowrap w-1/10">조회</th>
                <th className="py-3 px-6 text-center whitespace-nowrap w-1/10">좋아요</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 text-sm font-light cursor-pointer">
              {posts.map((post, index) => (
                <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 w-10 text-center">{index + 1}</td> {/* 번호 */}

                  <Link to="/antwork/board/view"> {/* 제목 + 작성자 -> 링크 */}
                    <td className="py-3 px-6 w-1/2 text-left text-ellipsis truncate" title={post.title}> {/* 제목 */}
                      {post.title.length > 30 ? `${post.title.slice(0, 30)}...` : post.title}
                      <span className="text-blue-500"> {' '} {/* 공백, 댓글수 */}
                        {/* 댓글 아이콘 💬  */}
                        ({post.commentCount})</span>
                    </td>
                  </Link>

                  <td className="py-3 px-6 w-1/6 text-center"> {/* 작성자 */}
                    {post.author.charAt(0)}**{post.author.slice(-1)} 
                  </td>
                  <td className="py-3 px-6 w-1/10 text-center">{post.date}</td> {/* 날짜 */}
                  <td className="py-3 px-6 w-1/10 text-center">{post.views.toLocaleString()}</td> {/* 조회수 */}
                  <td className="py-3 px-6 w-1/10 text-center flex"> {/* 좋아요 */}
                    ❤️ ({post.likes})
                  </td>
                </tr>
              ))}
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
        </>
    );
  };

  export { BoardList };