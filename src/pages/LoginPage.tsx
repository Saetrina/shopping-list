import { BaseSyntheticEvent, useEffect, useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const myFunc = () => {
    console.log(username);
  };

  useEffect(myFunc, [username, password]);

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();

    const formData = {
      username,
      password,
    };

    console.log(formData);

    //TODO: login api
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
          className={"border px-3 rounded-md py-1 border-lime-800"}
          placeholder="Přihlašovací jméno"
          value={username}
          onChange={(event: BaseSyntheticEvent) => {
            setUsername(event.target.value);
          }}
        />
        <input
          className={"border px-3 rounded-md py-1 border-lime-800"}
          type={"password"}
          placeholder="Heslo"
          value={password}
          onChange={(event: BaseSyntheticEvent) => {
            setPassword(event.target.value);
          }}
        />
        <button
          className={
            "border px-3 rounded-md py-2 bg-lime-800 text-white uppercase font-bold"
          }
        >
          Přihlásit se
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
