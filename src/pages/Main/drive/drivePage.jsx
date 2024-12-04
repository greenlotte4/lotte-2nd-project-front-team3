import AntWorkLayout from "../../../layouts/AntWorkLayout";

import DriveSection from "../../../components/main/drive/driveSection";
import DriveAside from "../../../components/common/aside/driveAside";
import DriveModal from "../../../components/common/modal/driveModal";
import useAuthStore from "../../../store/AuthStore";
import { useEffect } from "react";

export default function DrivePage() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth(); // 앱 로드 시 Access Token 갱신
  }, [initializeAuth]);
  return (
    <>
      <AntWorkLayout>
        <DriveAside />
        <DriveSection /> {/* 상태를 자식 컴포넌트에 전달 */}
        <DriveModal />
      </AntWorkLayout>
    </>
  );
}
