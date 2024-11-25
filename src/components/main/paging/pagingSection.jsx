import { Link } from "react-router-dom";

export default function PagingSection() {
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
              <div className="page-card">
                <div className="card-content">
                  <div className="user-details ">
                    <Link
                      to="/antwork/page/view"
                      className="!text-[15px] !mb-3 !font-normal"
                    >
                      🌹 업무일지
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
                  <button className="options-btn">⋮</button>
                </div>
              </div>
              <div className="page-card">
                <div className="card-content">
                  <div className="user-details ">
                    <h3 className="!text-[15px] !mb-3 !font-normal">
                      ✔ CheckList
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
                      ❓ Question
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
                      🎞 Movie Review
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
                <h1 className="!text-[19px]"> 최근 수정된 페이지</h1>{" "}
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
