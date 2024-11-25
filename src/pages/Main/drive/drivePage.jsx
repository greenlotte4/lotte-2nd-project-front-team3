import AntWorkLayout from "../../../layouts/AntWorkLayout";

import Aside from "../../../components/common/aside";
import DriveSection from "../../../components/main/drive/driveSection";

export default function DrivePage() {
  return (
    <>
      <AntWorkLayout>
        <Aside />
        <DriveSection />
      </AntWorkLayout>
    </>
  );
}
