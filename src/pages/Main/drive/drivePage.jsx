import AntWorkLayout from "../../../layouts/AntWorkLayout";

import DriveSection from "../../../components/main/drive/driveSection";
import DriveAside from "../../../components/common/aside/driveAside";
import DriveModal from "../../../components/common/modal/driveModal";

export default function DrivePage() {
  return (
    <>
      <AntWorkLayout>
        <DriveAside />
        <DriveSection /> {/* 상태를 자식 컴포넌트에 전달 */}
        <DriveModal /> {/* 모달에서 받은 데이터를 처리 */}
      </AntWorkLayout>
    </>
  );
}
