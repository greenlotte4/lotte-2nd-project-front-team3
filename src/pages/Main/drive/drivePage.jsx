import AntWorkLayout from "../../../layouts/AntWorkLayout";

import Aside from "../../../components/common/aside";
import DriveSection from "../../../components/main/drive/driveSection";
import DriveAside from "../../../components/common/driveAside";

export default function DrivePage() {
  return (
    <>
      <AntWorkLayout>
        <DriveAside />
        <DriveSection />
      </AntWorkLayout>
    </>
  );
}
