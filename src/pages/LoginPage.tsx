import { BaseSyntheticEvent, useEffect, useState } from "react";
import users from "../data/users.json" assert { type: "json" };
import { useUserContext } from "../context/UserContextProvider";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (username && password) setIsDisabled(false);
  }, [username, password]);

  const { setUser } = useUserContext();

  const navigate = useNavigate();

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();

    setIsDisabled(true);

    setTimeout(() => {
      const user = users.find(
        (user) => user.username === username && user.password === password
      );

      if (!user) {
        setIsError(true);
      } else {
        setUser(user);
        navigate("/");
      }

      //TODO: login api

      setIsDisabled(false);
    }, 1000);
  };

  return (
    <div className={"flex items-center h-full"}>
      <form
        className={
          "flex flex-col gap-4 text-lg border border-dashed border-lime-700 px-8 py-8 rounded-lg shadow-lg"
        }
        onSubmit={handleSubmit}
      >
        <h1 className={"text-center mb-4 text-2xl"}>Přihlášení</h1>

        <input
          className={`border px-3 rounded-md py-1 outline-0 ${
            isError ? "border-red-600" : "border-lime-800"
          }`}
          placeholder="Přihlašovací jméno"
          value={username}
          onChange={(event: BaseSyntheticEvent) => {
            setUsername(event.target.value);
          }}
        />
        <input
          className={`border px-3 rounded-md py-1 outline-0 ${
            isError ? "border-red-600" : "border-lime-800"
          }`}
          type={"password"}
          placeholder="Heslo"
          value={password}
          onChange={(event: BaseSyntheticEvent) => {
            setPassword(event.target.value);
          }}
        />
        <button
          disabled={isDisabled}
          className={`border px-3 bg-lime-800 rounded-md py-2 text-white uppercase font-bold ${
            isDisabled ? "opacity-30" : "opacity-100"
          }`}
        >
          Přihlásit se
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
