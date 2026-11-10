import { useRef, type SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/api";

const LoginForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: loginUser,
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) return;

    mutate({ username, password });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Logga in</h2>
      <p>Logga in för att komma åt din dashboard.</p>

      <div className="form-group">
        <label htmlFor="login-username">Användarnamn</label>
        <input
          id="login-username"
          type="text"
          placeholder="Ange användarnamn"
          ref={usernameRef}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="login-password">Lösenord</label>
        <input
          id="login-password"
          type="password"
          placeholder="Ange lösenord"
          ref={passwordRef}
          required
        />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Loggar in..." : "Logga in"}
      </button>

      {isError && <p role="alert">{error.message}</p>}

      {isSuccess && (
        <p role="status">Du är nu inloggad!</p>
      )}
    </form>
  );
};

export default LoginForm;