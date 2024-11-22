import ChattingMain from "../../../components/main/chatting/chattingMain";
import AntWorkLayout from "../../../layouts/AntWorkLayout";
import ChattingAside from "./../../../components/common/chattingAside";

export default function ChattingPage() {
  return (
    <>
      <AntWorkLayout>
        <ChattingAside />
        <ChattingMain />
      </AntWorkLayout>
    </>
  );
}
