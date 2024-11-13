import ListThumbnail from "./ListThumbnail.tsx";
import lists from "../../data/lists.json" assert { type: "json" };

const ListsContainer = ({ showArchived }: { showArchived: boolean }) => {
  //TODO: get Lists from server when API is ready

  // const [lists, setLists] = useState<IList[]>([]);

  // useEffect(() => {
  //   axios
  //     .get<IList[]>("{url}/lists")
  //     .then((response) => setLists(response.data));
  // }, []);

  return (
    <section>
      {lists
        .filter((list) => (showArchived ? true : !list.isArchived))
        .map((list, idx) => (
          <ListThumbnail list={list} key={idx} />
        ))}
    </section>
  );
};

export default ListsContainer;
