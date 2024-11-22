import AntWorkLayout from "../../../layouts/AntWorkLayout";
import PageAside from "./../../../components/common/pageAside";
import PagingSection from "./../../../components/paging/pagingSection";

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
