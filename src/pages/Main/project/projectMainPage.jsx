import ProjectAside from "../../../components/common/projectAside";
import ProjectMainSection from "../../../components/main/project/projectMainSection";
import AntWorkLayout from "../../../layouts/AntWorkLayout";

export default function ProjectMainPage() {
  return (
    <>
      <AntWorkLayout>
        <ProjectAside />
        <ProjectMainSection />
      </AntWorkLayout>
    </>
  );
}
