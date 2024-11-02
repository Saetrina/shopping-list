const ListMember = ({ member }: { member: string }) => {
  return (
    <div className={"bg-gray-200 rounded-xl w-fit px-2 py-1"}>{member}</div>
  );
};

export default ListMember;
