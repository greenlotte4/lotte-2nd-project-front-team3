import ProfileAside from "../../../components/common/profileAside";
import ProfileMain from "../../../components/main/profile/profileMain";
import AntWorkLayout from "../../../layouts/AntWorkLayout";

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
