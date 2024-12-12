import React, { useState, useEffect } from "react";
import { getTemplates } from "../../../api/pageAPI";
import useAuthStore from "@/store/AuthStore";
import { TemplateCard } from "./TemplateCard";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import { PAGE_CREATE_URI } from "../../../api/_URI";

export default function PagingTemplate() {
  const user = useAuthStore((state) => state.user);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const navigate = useNavigate();

  const fetchTemplates = async () => {
    try {
      const response = await getTemplates();
      setTemplates(response);
    } catch (error) {
      console.error("템플릿 목록을 가져오는 중 오류 발생:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleTemplateClick = async (template) => {
    try {
      // 새 페이지 생성 요청 (템플릿의 title과 content만 사용)
      const response = await axiosInstance.post(PAGE_CREATE_URI, {
        title: template.title,
        content: template.content,
        owner: user.uid,
        ownerName: user.name,
        ownerImage: user.image,
      });

      // 생성된 페이지의 ID로 페이지 작성 화면으로 이동
      const newPageId = response.data;
      console.log(newPageId);
      navigate(`/antwork/page/write?id=${newPageId}`);
    } catch (error) {
      alert("페이지 생성에 실패했습니다.");
    }
  };

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  const displayedTemplates = showAllTemplates
    ? templates
    : templates.slice(0, 6);

  return (
    <article className="page-list">
      <div className="content-header">
        <h1>Template</h1>
        <p>페이지에서 사용할 수 있는 템플릿입니다.</p>
      </div>
      <article className="page-list !mt-5 !min-h-[200px]">
        <div className="content-header">
          <div className="!inline-flex">
            <h1 className="!text-[19px]">무료 페이지</h1>
            {templates.length > 6 && !showAllTemplates && (
              <button
                onClick={() => setShowAllTemplates(true)}
                className="!ml-3 text-gray-500"
              >
                더보기 ({templates.length - 6}개)
              </button>
            )}
          </div>
        </div>
        <div className="page-grid">
          {displayedTemplates.map((template) => (
            <TemplateCard
              key={template._id}
              page={template}
              onClick={() => handleTemplateClick(template)}
              hideAuthor={true}
            />
          ))}
        </div>
      </article>
    </article>
  );
}
