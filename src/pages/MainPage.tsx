import ListsContainer from "../components/lists/ListsContainer.tsx";
import { IoAdd, IoFilter } from "react-icons/io5";
import Modal from "../components/modals/Modal.tsx";
import { useState } from "react";
import { useUserContext } from "../context/UserContextProvider.tsx";
import IconButton from "../components/buttons/iconButton.tsx";

const MainPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { user } = useUserContext();
  const [showArchived, setShowArchived] = useState(false);
  return (
    <div className={"h-full w-full flex flex-col items-center"}>
      <section
        className={
          "border py-8 px-4 rounded-md flex flex-col gap-6 shadow-lg w-full md:w-2/3 xl:w-[1000px] h-full overflow-hidden"
        }
      >
        <header className={"text-lg flex items-center justify-between"}>
          <h1 className={"text-2xl text-center"}>Přehled nákupních seznamů</h1>
          <div className={"flex gap-2"}>
            <IconButton
              icon={<IoFilter />}
              onClick={() => setShowArchived((prevValue) => !prevValue)}
            />

            {user ? (
              <IconButton icon={<IoAdd />} onClick={() => setModalOpen(true)} />
            ) : null}
          </div>
        </header>
        <div className={"w-full h-[1px] bg-lime-700"} />
        <ListsContainer showArchived={showArchived} />
      </section>
      <Modal
        title={"Vytvořit nový seznam"}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </div>
  );
};

export default MainPage;
