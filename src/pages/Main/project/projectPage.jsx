import Aside from "../../../components/common/aside";
import ProjectSection from "../../../components/main/project/projectSection";
import AntWorkLayout from "../../../layouts/AntWorkLayout";

export default function ProjectPage() {
  return (
    <>
      <AntWorkLayout>
        <Aside />
        <ProjectSection />
      </AntWorkLayout>
    </>
  );
}
