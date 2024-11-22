import AntWorkLayout from "../../../layouts/AntWorkLayout";
import PageAside from "./../../../components/common/pageAside";
import PagingSection from "./../../../components/main/paging/pagingSection";

export default function PagingPage() {
  return (
    <>
      <AntWorkLayout>
        <PageAside />
        <PagingSection />
      </AntWorkLayout>
    </>
  );
}
