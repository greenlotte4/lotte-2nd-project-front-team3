import ProjectViewSection from "../../../components/main/project/projectViewSection";
import AntWorkLayout from "../../../layouts/AntWorkLayout";

export default function ProjectViewPage() {
  return (
    <>
      <AntWorkLayout>
        <ProjectAside />
        <ProjectViewSection />
      </AntWorkLayout>
    </>
  );
}
