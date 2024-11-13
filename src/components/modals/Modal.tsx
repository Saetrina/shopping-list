import { SetStateAction, useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import lists from "../../data/lists.json" assert { type: "json" };
import dayjs from "dayjs";
import { useUserContext } from "../../context/UserContextProvider.tsx";
import { useNavigate } from "react-router";

interface IModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  title: string;
}

const Modal = ({ open, setOpen, title }: IModalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;
    if (containerRef.current && !containerRef.current.contains(target)) {
      handleClose();
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [listName, setListName] = useState("");

  const handleClose = () => {
    setListName("");
    setOpen(false);
  };

  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <div
      className={`${open ? "flex" : "hidden"} overflow-hidden z-10 w-screen h-screen bg-gray-700/30 backdrop-blur-sm absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center`}
    >
      <div
        ref={containerRef}
        className={"border rounded-md bg-white flex flex-col"}
      >
        <div className={"flex justify-between items-center px-4 py-2"}>
          <h1>{title}</h1>
          <IoClose className="cursor-pointer" onClick={handleClose} />
        </div>

        <div className="w-full h-[1px] bg-green-700" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className={"flex flex-col gap-2 w-full px-4 py-4 text-xs"}
        >
          <h2>Opravdu si přejete vytvořit nový seznam?</h2>

          <input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder={"Název seznamu"}
            className={
              "border rounded-md outline-0 focus:border-green-700 px-1"
            }
          />
        </form>

        <div className="w-full h-[1px] bg-green-700" />
        <div className={"flex justify-end gap-2 px-4 py-2 text-sm"}>
          <button
            className={
              "border rounded-md px-1.5 py-0.5 text-xs uppercse font-bold"
            }
            onClick={handleClose}
          >
            Zrušit
          </button>
          <button
            className={
              "border rounded-md px-1.5 py-0.5 bg-green-700 text-white uppercase text-xs font-bold"
            }
            onClick={() => {
              console.log("create");
              const id = Math.floor(Math.random() * 1000);
              lists.push({
                id: id,
                listName: listName,
                dateCreated: dayjs().toISOString(),
                listAuthor: user ? user.fullName : "Neznámý autor",
                members: [],
                items: [],
                isArchived: false,
              });

              navigate(`/detail/${id}`);
            }}
          >
            Vytvořit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
