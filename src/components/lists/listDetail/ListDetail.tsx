import lists from "../../../data/lists.json" assert { type: "json" };
import { BaseSyntheticEvent, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import { GiCrossMark } from "react-icons/gi";
import { IList, IListItem } from "../../../utils/types/listTypes.ts";
import ListItem from "./ListItem.tsx";
import { FaPen } from "react-icons/fa";
import { useUserContext } from "../../../context/UserContextProvider.tsx";
import dayjs from "dayjs";
import { IoLogOutSharp } from "react-icons/io5";

const ListDetail = () => {
  const params = useParams();
  const [list, setList] = useState<IList>({} as IList);
  const [isAuthor, setIsAuthor] = useState(false);
  const [newItem, setNewItem] = useState<IListItem>(createNewItem());
  const [showAllItems, setShowAllItems] = useState(false);
  const [newMember, setNewMember] = useState("");

  const navigate = useNavigate();

  const { user } = useUserContext();

  useEffect(() => {
    setList(lists.filter((list) => String(list.id) === params.id)[0]);
  }, [lists]);

  function handleListNameChange(event: BaseSyntheticEvent) {
    const value = event.target.value;

    setList((prevValue) => ({ ...prevValue, listName: value }));
  }

  function handleCompleteItem(itemId: number) {
    if (!user) return;

    const updatedItems = list.items.map((item) =>
      item.id === itemId ? { ...item, isCompleted: !item.isCompleted } : item
    );

    setList((prevData) => ({ ...prevData, items: updatedItems }));
  }

  function createNewItem() {
    return {
      id: Math.floor(Math.random() * 1000),
      itemName: "",
      isCompleted: false,
    };
  }

  function handleNewItem() {
    const items = list.items;

    items.push(newItem);

    setList((prevData) => {
      return { ...prevData, items: items };
    });

    setNewItem(createNewItem());
  }

  function handleRemoveMember(value: number) {
    const members = list.members;
    members.splice(value, 1);

    setList((prevData) => ({ ...prevData, members: members }));
  }

  useEffect(() => {
    if (user && list) setIsAuthor(user.fullName === list.listAuthor);
  }, [user, list]);

  return (
    <section
      className={
        "border py-12 px-16 rounded-md flex flex-col gap-6 shadow-lg w-[600px] overflow-hidden"
      }
    >
      <div>
        <div className="flex w-full justify-between">
          {isAuthor ? (
            <div className="flex justify-between gap-2 items-center border-b rounded-md w-min focus-within:border-gray-400 py-1">
              <input
                className="outline-0"
                value={list.listName}
                onChange={handleListNameChange}
                placeholder="Název seznamu"
              />

              <FaPen color={"gray"} />
            </div>
          ) : (
            <h2>{list.listName}</h2>
          )}
          {!isAuthor && user ? (
            <IoLogOutSharp
              onClick={() => navigate("/")}
              color="red"
              size={24}
            />
          ) : null}
        </div>
        <div className="flex gap-2">
          <h3>{list.listAuthor}</h3>•
          <h3>{dayjs(list.dateCreated).format("D.M.YYYY")}</h3>
        </div>
      </div>

      <div>
        <h4 className="font-bold border-b mb-2">Členové</h4>
        <div className="flex flex-col gap-2 px-9">
          {list.members
            ? list.members.map((member, idx) => (
                <div className="flex gap-2 items-center relative" key={idx}>
                  <GiCrossMark
                    data-member-index={idx}
                    onClick={(event) => {
                      if (!isAuthor) return;

                      let el = event.target as HTMLElement;

                      if (el.tagName === "path") {
                        el = el.parentNode as HTMLElement;
                      }

                      handleRemoveMember(Number(el.dataset.memberIndex));
                    }}
                    size={12}
                    className="absolute -left-5"
                  />
                  {member}
                </div>
              ))
            : null}
          {isAuthor ? (
            <div className="w-fit flex gap-2">
              <input
                value={newMember}
                onChange={(event: BaseSyntheticEvent) => {
                  setNewMember(event.target.value);
                }}
                className="outline-0 border rounded-md px-2"
              />
              <button
                className="w-fit"
                onClick={() => {
                  const members = list.members;
                  members.push(newMember);
                  setList((prevData) => ({ ...prevData, members: members }));
                  setNewMember("");
                }}
              >
                Přidat
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <div>
        <div className="flex flex-row gap-6 form-control mb-2 border-b">
          <h4 className="font-bold flex w-fit">Položky</h4>
          <div className="flex gap-2 items-center">
            Pouze aktivní
            <input
              type="checkbox"
              checked={showAllItems}
              onChange={() => {
                setShowAllItems((prevValue) => !prevValue);
              }}
              className="toggle toggle-xs"
            />
            Všechny
          </div>
        </div>

        <div className="flex flex-col">
          {list.items
            ? list.items
                .filter((item) =>
                  showAllItems ? true : item.isCompleted === false
                )
                .map((item, idx) => {
                  return (
                    <ListItem
                      itemData={item}
                      onChange={handleCompleteItem}
                      key={idx}
                    />
                  );
                })
            : null}
          {isAuthor ? (
            <div className="w-fit flex gap-2 px-4">
              <input
                type="checkbox"
                checked={newItem.isCompleted}
                onChange={() =>
                  setNewItem((prevData) => ({
                    ...prevData,
                    isCompleted: !prevData.isCompleted,
                  }))
                }
              />
              <input
                value={newItem.itemName}
                onChange={(event: BaseSyntheticEvent) => {
                  setNewItem((prevData) => ({
                    ...prevData,
                    itemName: event.target.value,
                  }));
                }}
                className="outline-0 border rounded-md px-2"
              />
              <button className="w-fit" onClick={handleNewItem}>
                Přidat
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default ListDetail;
