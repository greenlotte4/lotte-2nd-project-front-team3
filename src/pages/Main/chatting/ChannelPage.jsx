import AntWorkLayout from "../../../layouts/AntWorkLayout";
import ChattingModal from "../../../components/common/modal/chattingModal";
import ChannelMain from "../../../components/main/chatting/ChannelMain";

export default function ChannelPage() {
  return (
    <>
      <AntWorkLayout>
        <ChannelMain />
        <ChattingModal />
      </AntWorkLayout>
    </>
  );
}
