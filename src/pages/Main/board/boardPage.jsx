import Aside from "../../../components/common/aside/aside";
import BoardMain from "../../../components/main/board/boardMain";
import AntWorkLayout from "../../../layouts/AntWorkLayout";

export default function BoardPage() {
  return (
    <>
      <AntWorkLayout>
        <BoardMain />
      </AntWorkLayout>
    </>
  );
}