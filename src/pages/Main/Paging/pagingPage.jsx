import AntWorkLayout from "../../../layouts/AntWorkLayout";

import PagingSection from "./../../../components/main/paging/pagingSection";
import Aside from "./../../../components/common/aside";

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
