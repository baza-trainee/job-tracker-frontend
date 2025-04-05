import NotesMain from "@/components/Notes/components/NotesMain";

import PageHeader from "@/components/commonComponents/PageHeader";

function Notes() {
  return (
    <div className="container pb-5 pt-4 sm:pb-6 sm:pt-4 md:py-6 xl:py-10">
      <PageHeader isArchive={true} />
      <NotesMain />
    </div>
  );
}

export default Notes;
