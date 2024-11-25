import Aside from "../../../components/common/aside";
import AntWorkLayout from "../../../layouts/AntWorkLayout";

import PagingSection from "./../../../components/main/paging/pagingSection";

export default function PagingPage() {
  return (
    <>
      <AntWorkLayout>
        <Aside />
        <PagingSection />
      </AntWorkLayout>
    </>
  );
}
