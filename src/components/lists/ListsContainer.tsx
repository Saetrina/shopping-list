import ListThumbnail from "./ListThumbnail.tsx";
import lists from "../../data/lists.json" assert { type: "json" };

const ListsContainer = () => {
  //TODO: get Lists from server when API is ready

  // const [lists, setLists] = useState<IList[]>([]);

  // useEffect(() => {
  //   axios
  //     .get<IList[]>("{url}/lists")
  //     .then((response) => setLists(response.data));
  // }, []);

  return (
    <section
      className={
        "border py-12 px-16 rounded-md flex flex-col gap-6 shadow-lg w-[600px] overflow-hidden"
      }
    >
      <h1 className={"text-2xl text-center"}>Přehled nákupních seznamů</h1>
      <div className={"w-full h-[1px] bg-lime-700"} />

      <section className={"overflow-y-scroll flex flex-col gap-6 "}>
        {lists.map((list, idx) => (
          <ListThumbnail list={list} key={idx} />
        ))}
      </section>
    </section>
  );
};

export default ListsContainer;
