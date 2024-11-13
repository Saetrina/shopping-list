import { useNavigate } from "react-router";
import { useUserContext } from "../../context/UserContextProvider";
import { IoHome } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useUserContext();

  return (
    <section
      className={
        "bg-lime-900 flex gap-4 h-fit shadow-lg py-4 px-6 w-screen items-center justify-between"
      }
    >
      <IoHome
        color={"white"}
        size={30}
        onClick={() => navigate("/")}
        className={"cursor-pointer"}
      />
      <button
        className={
          "bg-white px-4 py-1 rounded-lg font-bold uppercase text-lime-800 transition duration-100 hover:-translate-y-0.5 hover:shadow-md shadow-black"
        }
        onClick={() => navigate("/login")}
      >
        {user ? user.fullName : "Login"}
      </button>
    </section>
  );
};

export default Navbar;
