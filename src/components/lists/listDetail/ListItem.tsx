import { IListItem } from "../../../utils/types/listTypes";

function ListItem({
  itemData,
  onChange,
}: {
  itemData: IListItem;
  onChange: (id: number) => void;
}) {
  const { itemName, isCompleted, id } = itemData;

  return (
    <div id={String(id)}>
      <label className="w-fit flex gap-2 px-4">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onChange(id)}
        />
        {itemName}
      </label>
    </div>
  );
}

export default ListItem;
