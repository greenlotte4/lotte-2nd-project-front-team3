import React, { useState, useEffect } from "react";
import { getTemplates, createPageFromTemplate } from "../../../api/pageAPI";
import useAuthStore from "@/store/AuthStore";

export default function PagingTemplate() {
  const user = useAuthStore((state) => state.user);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTemplates = async () => {
    try {
      const response = await getTemplates();
      setTemplates(response);
    } catch (error) {
      console.error("템플릿 목록을 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleCopyTemplate = async (templateId) => {
    try {
      const newPage = await createPageFromTemplate(templateId, user.uid);
      alert(`템플릿이 복사되었습니다: ${newPage.title}`);
    } catch (error) {
      console.error("템플릿 복사 중 오류 발생:", error);
      alert("템플릿 복사에 실패했습니다.");
    }
  };

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

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
          </div>
        </div>
        <div className="template-list">
          {templates.map((template) => (
            <div key={template._id} className="template-card">
              <h2>{template.title}</h2>
              <p>{template.content}</p>
              <button onClick={() => handleCopyTemplate(template._id)}>
                복사하기
              </button>
            </div>
          ))}
        </div>
      </article>
    </article>
  );
}
