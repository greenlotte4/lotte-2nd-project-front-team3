import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  PAGE_LIST_UID_URI,
  PAGE_LIST_MODIFIED_URI,
  PAGE_LIST_DELETED_URI,
} from "../../../api/_URI";

import { usePageList } from "../../../hooks/paging/usePageList";
import { usePageActions } from "../../../hooks/paging/usePageActions";
import { PageCard } from "./PageCard";
import useAuthStore from "@/store/AuthStore";

// prettier-ignore
export default function PagingSection() {

  // 유저 정보 불러오기
  const user = useAuthStore((state) => state.user);
  const uid = user?.uid;

  // 개인 페이지 목록 불러오기
  const { pages: personalPageList, setPages: setPersonalPageList }
        = usePageList(`${PAGE_LIST_UID_URI}/${uid}`);
  // 최근 수정된 페이지 목록 불러오기 
        const { pages: latestPages, setPages: setLatestPages }
        = usePageList(`${PAGE_LIST_MODIFIED_URI}/${uid}`);
  // 삭제된 페이지 목록 불러오기
  const { pages: deletedPages, setPages: setDeletedPages } 
        = usePageList(`${PAGE_LIST_DELETED_URI}/${uid}`);

  // 페이지 메뉴 상태 관리
  const [personalActiveMenu, setPersonalActiveMenu] = useState(null);
  const [latestActiveMenu, setLatestActiveMenu] = useState(null);
  const [deletedActiveMenu, setDeletedActiveMenu] = useState(null);

  // 페이지 삭제, 복구, 영구 삭제 기능 
  const { handleDeletePage, handleRestorePage, handleHardDeletePage } = usePageActions();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".menu-container")) {
        setPersonalActiveMenu(null);
        setLatestActiveMenu(null);
        setDeletedActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 
  const [showAllPersonal, setShowAllPersonal] = useState(false);
  const [showAllLatest, setShowAllLatest] = useState(false);
  const [showAllDeleted, setShowAllDeleted] = useState(false);

  // 개인 페이지 섹션 수정
  const displayedPersonalPages = showAllPersonal
    ? personalPageList
    : personalPageList.slice(0, 6);

  // 최근 수정된 페이지 섹션 수정
  const displayedLatestPages = showAllLatest
    ? latestPages
    : latestPages.slice(0, 3);

  // 삭제된 페이지 섹션 수정
  const displayedDeletedPages = showAllDeleted
    ? deletedPages
    : deletedPages.slice(0, 3);

  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <h1>Home</h1>
          <p> 페이지 Home 입니다.</p>

          <article className="page-list !mt-5 !min-h-[200px]">
            <div className="content-header">
              <div className="!inline-flex">
                <h1 className="!text-[19px]"> 개인 페이지</h1>
                {personalPageList.length > 3 && !showAllPersonal && (
                  <button
                    onClick={() => setShowAllPersonal(true)}
                    className="!ml-3 text-gray-500"
                  >
                    더보기 ({personalPageList.length - 3}개)
                  </button>
                )}
              </div>
              <p className="!text-[14px]">나의 페이지 입니다.</p>
            </div>

            <div className="page-grid">
              {displayedPersonalPages.map((page) => (
                <PageCard
                  key={page._id}
                  page={page}
                  menuActive={personalActiveMenu}
                  setMenuActive={setPersonalActiveMenu}
                  menuOptions={
                    <div className="absolute right-0 mt-2 p-4 !pb-0 w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <div className="border-t border-gray-300 border-b border-gray-300 p-3">
                          <button
                            onClick={() =>
                              handleDeletePage(page._id, {
                                personalPageList,
                                setPersonalPageList,
                                latestPages,
                                setLatestPages,
                                deletedPages,
                                setDeletedPages,
                              })
                            }
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
                  }
                />
              ))}
            </div>
          </article>
          <article className="page-list !mt-5 !min-h-[200px]">
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
          <article className="page-list !mt-5 !min-h-[200px]">
            <div className="content-header">
              <div className="!inline-flex">
                <h1 className="!text-[19px]"> 최근 수정된 페이지</h1>
                {latestPages.length > 3 && !showAllLatest && (
                  <button
                    onClick={() => setShowAllLatest(true)}
                    className="!ml-3 text-gray-500"
                  >
                    더보기 ({latestPages.length - 3}개)
                  </button>
                )}
              </div>
              <p className="!text-[14px]">최근 수정된 페이지 입니다.</p>
            </div>

            <div className="page-grid">
              {displayedLatestPages.map((page) => (
                <PageCard
                  key={page._id}
                  page={page}
                  menuActive={latestActiveMenu}
                  setMenuActive={setLatestActiveMenu}
                  menuOptions={
                    <div className="absolute right-0 mt-2 p-4 !pb-0 w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <div className="border-t border-gray-300 border-b border-gray-300 p-3">
                          <button
                            onClick={() =>
                              handleDeletePage(page._id, {
                                personalPageList,
                                setPersonalPageList,
                                latestPages,
                                setLatestPages,
                                deletedPages,
                                setDeletedPages,
                              })
                            }
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
                  }
                />
              ))}
            </div>
          </article>

          <article className="page-list !mt-5 !min-h-[200px]">
            <div className="content-header">
              <div className="!inline-flex">
                <h1 className="!text-[19px]"> 최근 삭제된 페이지</h1>
                {deletedPages.length > 3 && !showAllDeleted && (
                  <button
                    onClick={() => setShowAllDeleted(true)}
                    className="!ml-3 text-gray-500"
                  >
                    더보기 ({deletedPages.length - 3}개)
                  </button>
                )}
              </div>
              <p className="!text-[14px]">최근 7일 내 삭제된 목록입니다.</p>
            </div>

            <div className="page-grid">
              {displayedDeletedPages.map((page) => (
                <PageCard
                  key={page._id}
                  page={page}
                  menuActive={deletedActiveMenu}
                  setMenuActive={setDeletedActiveMenu}
                  menuOptions={
                    <div className="absolute right-0 mt-2 p-4 !pb-0 w-[200px] bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <div className="border-t border-gray-300 border-b border-gray-300 p-3 !mb-3">
                          <button
                            onClick={() =>
                              handleRestorePage(page._id, uid,{
                                setDeletedPages,
                                setPersonalPageList,
                                setLatestPages,
                          
                              })
                            }
                            className="w-full px-4 py-3 text-[14px] text-gray-700 hover:bg-gray-100 hover:rounded-[10px] text-left"
                          >
                            페이지 복구
                          </button>
                          <button
                            onClick={() => handleHardDeletePage(page._id)}
                            className="w-full px-4 py-3 text-[14px] text-red-600 hover:bg-gray-100 hover:rounded-[10px] text-left"
                          >
                            영구 삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  }
                />
              ))}
            </div>
          </article>
        </div>
      </article>
    </>
  );
}
