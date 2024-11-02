import lists from "../../../data/lists.json" assert { type: "json" };
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ListMember from "./ListMember.tsx";
import { IList } from "../../../utils/types/listTypes.ts";

const ListDetail = () => {
  const params = useParams();
  const [list, setList] = useState<IList>({} as IList);

  useEffect(() => {
    setList(lists.filter((list) => String(list.id) === params.id)[0]);
  }, [lists]);

  return (
    <section
      className={
        "border py-12 px-16 rounded-md flex flex-col gap-6 shadow-lg w-[600px] overflow-hidden"
      }
    >
      <h2>{list.listName}</h2>
      <div>
        {list.members
          ? list.members.map((member, idx) => (
              <ListMember member={member} key={idx} />
            ))
          : null}
      </div>
    </section>
  );
};

export default ListDetail;
