import ProfileAside from "../../../components/common/profileAside";
import ProfileMain from "../../../components/main/profile/profileMain";
import AntWorkLayout from "../../../layouts/AntWorkLayout";
import Aside from "./../../../components/common/aside";

export default function ProfilePage() {
  return (
    <>
      <AntWorkLayout>
        <ProfileAside />
        <ProfileMain />
      </AntWorkLayout>
    </>
  );
}
