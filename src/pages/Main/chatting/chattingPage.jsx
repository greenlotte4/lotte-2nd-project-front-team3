import { useEffect, useState } from "react";
import ChattingMain from "../../../components/main/chatting/chattingMain";
import AntWorkLayout from "../../../layouts/AntWorkLayout";
import ChattingModal from "../../../components/common/modal/chattingModal";
import ChattingModalController from "../../../components/common/modal/chatting/ChattingModalController";

export default function ChattingPage() {
  // useEffect(() => {
  //   document.body.classList.add("no-scroll");
  //   return () => document.body.classList.remove("no-scroll");
  // }, []);

  return (
    <>
      <AntWorkLayout>
        <ChattingMain />
        <ChattingModalController />
      </AntWorkLayout>
    </>
  );
}
