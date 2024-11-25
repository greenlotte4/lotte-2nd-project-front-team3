export default function PagingSection() {
  return (
    <>
      <article className="page-list">
        <div className="content-header">
          <h1>Home</h1>
          <p> 페이지 Home 입니다.</p>

          <article className="page-list !mt-5">
            <div className="content-header">
              <h1> 개인 페이지</h1>
              <p>공유 멤버가 없는 페이지 입니다.</p>
              <p></p>
            </div>
            <div className="page-grid">
              <div className="page-card">
                <div className="card-content">
                  <div className="user-details ">
                    <h3 className="!text-[15px] !mb-3">🌹 업무일지</h3>
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
                    <h3 className="!text-[15px] !mb-3">✔ CheckList</h3>
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
                    <h3 className="!text-[15px]">❓ Question</h3>
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
                    <h3 className="!text-[14px]">🎞 Movie Review</h3>
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
              <h1>✔ CheckList</h1>
              <p> 미리보기 </p>
              <div className="page-card !h-80">
                <span>여기에 미리보기로 보이면 될 듯</span>
              </div>
            </div>
          </article>

          <article className="page-list">
            <div className="content-header">
              <h1>❓ Question</h1>
              <p>나의 페이지 목록입니다.</p>
            </div>
            <div className="page-grid">
              <div className="page-card">
                <div className="card-content">
                  <div className="user-info">
                    <img
                      src="/api/placeholder/32/32"
                      alt="profile"
                      className="avatar"
                    />
                    <div className="user-details">
                      <h3>페이지 예시1</h3>
                      <p>관리자</p>
                    </div>
                  </div>
                  <button className="options-btn">⋮</button>
                </div>
              </div>
            </div>
          </article>

          <article className="page-list">
            <div className="content-header">
              <h1>🎞 MovieReview</h1>
              <p>나의 페이지 목록입니다.</p>
            </div>
            <div className="page-grid">
              <div className="page-card">
                <div className="card-content">
                  <div className="user-info">
                    <img
                      src="/api/placeholder/32/32"
                      alt="profile"
                      className="avatar"
                    />
                    <div className="user-details">
                      <h3>어벤져스</h3>
                      <p>관리자</p>
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
