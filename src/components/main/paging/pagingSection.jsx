import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function PagingSection() {
  const [personalPageList, setPersonalPageList] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonalPages = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/page/list");
        setPersonalPageList(response.data);
      } catch (error) {
        console.error("개인 페이지 목록을 가져오는데 실패했습니다:", error);
      }
    };

    fetchPersonalPages();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeMenu && !event.target.closest(".menu-container")) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeMenu]);

  const handleDeletePage = async (pageId) => {
    if (!pageId) return;

    if (window.confirm("정말로 이 페이지를 삭제하시겠습니까?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/page/${pageId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          alert("페이지가 삭제되었습니다.");
          // 페이지 목록 새로고침
          const updatedPages = personalPageList.filter(
            (page) => page._id !== pageId
          );
          setPersonalPageList(updatedPages);
        } else {
          alert("페이지 삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting page:", error);
        alert("페이지 삭제 중 오류가 발생했습니다.");
      }
    }
    setActiveMenu(null);
  };

  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <h1>Home</h1>
          <p> 페이지 Home 입니다.</p>

          <article className="page-list !mt-5">
            <div className="content-header">
              <div className="!inline-flex">
                <h1 className="!text-[19px]"> 개인 페이지</h1>{" "}
                <Link to="/antwork/page/mypage" className="!ml-3 text-gray-500">
                  더보기
                </Link>
              </div>
              <p className="!text-[14px]">공유 멤버가 없는 페이지 입니다.</p>
            </div>

            <div className="page-grid">
              {personalPageList.map((page) => (
                <div className="page-card" key={page.id}>
                  <div className="card-content">
                    <div className="user-details">
                      <Link
                        to={`/antwork/page/write?id=${page._id}`}
                        className="!text-[15px] !mb-3 !font-normal"
                      >
                        <h3 className="!text-[15px] !mb-3 !font-normal">
                          {page.icon}&nbsp;&nbsp;{page.title}
                        </h3>
                      </Link>
                      <div className="user-info !ml-3">
                        <img
                          src="/api/placeholder/32/32"
                          alt="profile"
                          className="avatar"
                        />
                        <p className="!text-[13px]">황수빈</p>
                      </div>
                    </div>
                    <div className="relative menu-container">
                      <button
                        className="options-btn"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === page._id ? null : page._id
                          )
                        }
                      >
                        ⋮
                      </button>

                      {activeMenu === page._id && (
                        <div className="absolute right-0 mt-2 p-4 !pb-0 w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                          <div className="py-1">
                            <div className="border-t border-gray-300 border-b border-gray-300 p-3">
                              <button
                                onClick={() => handleDeletePage(page._id)}
                                className="w-full px-4 py-3 text-[14px] text-red-600 hover:bg-gray-100 hover:rounded-[10px] text-left"
                              >
                                페이지 삭제
                              </button>
                              <button className="w-full px-4 py-3 text-[14px] text-gray-700 hover:bg-gray-100 hover:rounded-[10px] text-left bt-black-200">
                                공유 멤버 관리
                              </button>
                            </div>
                            <div className="p-3">
                              <button className="w-full px-4 py-3 text-[14px] text-gray-700 hover:bg-gray-100 hover:rounded-[10px] text-left">
                                페이지 설정
                                <p className="!text-[11px] !text-slate-400 mt-[2px]">
                                  &nbsp;설정페이지로 이동
                                </p>
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
          <article className="page-list !mt-5">
            <div className="content-header">
              <div className="!inline-flex">
                <h1 className="!text-[19px]"> 공유 페이지</h1>{" "}
                <Link to="/antwork/page/mypage" className="!ml-3 text-gray-500">
                  더보기
                </Link>
              </div>
              <p className="!text-[14px]">내가 공유 멤버인 페이지 입니다.</p>
            </div>
            <div className="page-grid">
              <div className="page-card">
                <div className="card-content">
                  <div className="user-details ">
                    <h3 className="!text-[15px] !mb-3 !font-normal">
                      📃 OO병원 업무일지
                    </h3>
                    <div className="user-info !ml-3">
                      <img
                        src="/api/placeholder/32/32"
                        alt="profile"
                        className="avatar"
                      />
                      <p className="!text-[13px]">황수빈</p>
                    </div>
                  </div>
                  <button className="options-btn">⋮</button>
                </div>
              </div>
              <div className="page-card">
                <div className="card-content">
                  <div className="user-details ">
                    <h3 className="!text-[15px] !mb-3 !font-normal">
                      📃 OO학교 CheckList
                    </h3>
                    <div className="user-info !ml-3">
                      <img
                        src="/api/placeholder/32/32"
                        alt="profile"
                        className="avatar"
                      />
                      <p className="!text-[13px]">황수빈</p>
                    </div>
                  </div>
                  <button className="options-btn">⋮</button>
                </div>
              </div>
            </div>
          </article>
          <article className="page-list">
            <div className="content-header">
              <div className="content-header">
                <div className="!inline-flex">
                  <h1 className="!text-[19px]"> 최근 수정된 페이지</h1>{" "}
                  <Link
                    to="/antwork/page/mypage"
                    className="!ml-3 text-gray-500"
                  >
                    더보기
                  </Link>
                </div>
                <p className="!text-[14px]">제일 최근 수정된 페이지 입니다.</p>
              </div>
              <div className="page-card !h-80">
                <span>여기에 미리보기로 보이면 될 듯</span>
              </div>
            </div>
          </article>

          <article className="page-list">
            <div className="content-header">
              <div className="!inline-flex">
                <h1 className="!text-[19px]"> 최근 삭제된 페이지</h1>{" "}
                <Link to="/antwork/page/mypage" className="!ml-3 text-gray-500">
                  더보기
                </Link>
              </div>
              <p className="!text-[14px]">최근 7일 내 삭제된 목록입니다.</p>
            </div>
            <div className="page-grid">
              {" "}
              <div className="page-card">
                <div className="card-content">
                  <div className="user-details ">
                    <h3 className="!text-[15px] !mb-3 !font-normal">
                      📃 OO학교 CheckList
                    </h3>
                    <div className="user-info !ml-3">
                      <img
                        src="/api/placeholder/32/32"
                        alt="profile"
                        className="avatar"
                      />
                      <p className="!text-[13px]">황수빈</p>
                    </div>
                  </div>
                  <button className="options-btn">⋮</button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </article>
    </>
  );
}
