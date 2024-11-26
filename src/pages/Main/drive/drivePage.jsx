import AntWorkLayout from "../../../layouts/AntWorkLayout";

import DriveSection from "../../../components/main/drive/driveSection";
import DriveAside from "../../../components/common/aside/driveAside";
import DriveModal from "../../../components/common/modal/driveModal";

export default function DrivePage() {
  return (
    <>
      <AntWorkLayout>
        <DriveAside />
        <DriveSection />
        <DriveModal />
      </AntWorkLayout>
    </>
  );
}
