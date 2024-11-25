import Aside from "../../../components/common/aside";
import ProjectAside from "../../../components/common/projectAside";
import ProjectSection from "../../../components/main/project/projectSection";
import AntWorkLayout from "../../../layouts/AntWorkLayout";


export default function ProjectPage() {
  return (
    <>
      <AntWorkLayout>
        <ProjectAside />
        <ProjectSection />
      </AntWorkLayout>
    </>
  );
}
