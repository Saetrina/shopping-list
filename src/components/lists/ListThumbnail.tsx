import { IList } from "../../utils/types/listTypes.ts";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import IconButton from "../buttons/iconButton.tsx";

const ListThumbnail = ({ list }: { list: IList }) => {
  const { dateCreated, listAuthor, isArchived, listName, id } = list;
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/detail/${id}`)}
      className={`w-full border rounded-md px-4 py-2 shadow-md relative cursor-pointer pr-16
    ${isArchived ? "text-gray-400" : "bg-neutral-50 text-neutral-800"}`}
    >
      <h2 className={"text-xl w-full"}>{listName}</h2>
      <div className={"flex gap-2 text-lg"}>
        <h3>{listAuthor}</h3>•<h3>{dayjs(dateCreated).format("D. M. YYYY")}</h3>
      </div>
      <IconButton
        icon={<FaArrowRight color={"gray"} />}
        className="absolute right-4 top-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default ListThumbnail;
