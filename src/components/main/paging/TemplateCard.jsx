import { Link } from "react-router-dom";

export const TemplateCard = ({
  page,
  menuActive,
  setMenuActive,
  menuOptions,
  isDeleted = false,
  onClick,
  hideAuthor = false,
}) => {
  return (
    <div className="page-card cursor-pointer" key={page._id} onClick={onClick}>
      <div className="card-content">
        <div className="user-details">
          {!isDeleted ? (
            <h3 className="!text-[15px] !mb-3 !font-normal">
              {page.icon}&nbsp;&nbsp;{page.title}
            </h3>
          ) : (
            <h3 className="!text-[15px] !mb-3 !font-normal">
              {page.icon}&nbsp;&nbsp;{page.title}
            </h3>
          )}
          {!hideAuthor && (
            <div className="user-info !ml-3">
              <img
                src={page.ownerImage || "/api/placeholder/32/32"}
                alt="profile"
                className="avatar"
              />
              <p className="!text-[13px]">{page.ownerName || "Unknown"}</p>
            </div>
          )}
        </div>
        <div className="relative menu-container">
          <button
            className="options-btn"
            onClick={(e) => {
              e.stopPropagation();
              setMenuActive(menuActive === page._id ? null : page._id);
            }}
          >
            ⋮
          </button>
          {menuActive === page._id && menuOptions}
        </div>
      </div>
    </div>
  );
};
