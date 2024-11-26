import AntWorkLayout from "../../../layouts/AntWorkLayout";

import Aside from "../../../components/common/aside/aside";
import DriveSection from "../../../components/main/drive/driveSection";
import DriveAside from "../../../components/common/aside/driveAside";

export default function DrivePage() {
  return (
    <>
      <AntWorkLayout>
        <DriveSection />
      </AntWorkLayout>
    </>
  );
}
