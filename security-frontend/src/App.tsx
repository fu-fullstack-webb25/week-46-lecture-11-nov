import { useQuery } from "@tanstack/react-query";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { fetchProducts } from "./api/api";
import XssDemo from "./components/XssDemo";
import Checkout from "./components/Checkout";

const App = () => {
  const {
    data: products,
    isFetching,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    enabled: false
  });

  return (
    <main className="main">
      <LoginForm />
      <RegisterForm />

      <section className="products">
        <h2>Produkter</h2>

        <button
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? "Hämtar..." : "Visa produkter"}
        </button>

        {isError && <p>{error.message}</p>}

        {products && (
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name} – {product.price} kr
              </li>
            ))}
          </ul>
        )}
      </section>
      {/* <XssDemo /> */}
      <Checkout />
    </main>
  );
};

export default App;