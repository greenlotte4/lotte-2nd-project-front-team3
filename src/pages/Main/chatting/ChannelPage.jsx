import AntWorkLayout from "../../../layouts/AntWorkLayout";
import ChattingModal from "../../../components/common/modal/chattingModal";
import ChannelMain from "../../../components/main/chatting/ChannelMain";
import ChattingModalController from "../../../components/common/modal/chatting/ChattingModalController";

export default function ChannelPage() {
  return (
    <>
      <AntWorkLayout>
        <ChannelMain />
        <ChattingModalController />
      </AntWorkLayout>
    </>
  );
}
