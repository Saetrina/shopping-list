import { useNavigate } from "react-router";
import { useUserContext } from "../../context/UserContextProvider";

const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useUserContext();

  return (
    <section
      className={
        "bg-lime-900 flex gap-4 h-fit justify-end shadow-lg py-4 px-6 w-screen"
      }
    >
      <button
        className={
          "bg-white px-6 py-2 rounded-lg font-bold uppercase text-lime-800 transition duration-100 hover:-translate-y-0.5 hover:shadow-md shadow-black"
        }
        onClick={() => navigate("/login")}
      >
        {user ? user.fullName : "Login"}
      </button>
    </section>
  );
};

export default Navbar;
