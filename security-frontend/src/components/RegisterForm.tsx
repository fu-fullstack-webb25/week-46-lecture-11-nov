import { useRef, type SubmitEvent } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/api";

const RegisterForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const {
    mutate,
    isPending,
    isError,
    isSuccess,
    error
  } = useMutation({
    mutationFn: registerUser
  });

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const role = 'user';

    if (!username || !password) return;

    mutate({ username, password, role });
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Registrera dig</h2>
      <p>Skapa ett konto för att komma igång.</p>

      <div className="form-group">
        <label htmlFor="register-username">Användarnamn</label>
        <input
          id="register-username"
          type="text"
          placeholder="Ange användarnamn"
          ref={usernameRef}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="register-password">Lösenord</label>
        <input
          id="register-password"
          type="password"
          placeholder="Ange lösenord"
          ref={passwordRef}
          required
          minLength={8}
        />
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Registrerar..." : "Registrera"}
      </button>

      {isError && (
        <p role="alert">{error.message}</p>
      )}

      {isSuccess && (
        <p role="status">Kontot har skapats!</p>
      )}
    </form>
  );
};

export default RegisterForm;