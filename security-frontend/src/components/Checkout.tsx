
import { useMutation } from "@tanstack/react-query";
import { checkout } from "../api/api";

const Checkout = () => {
  const { mutate: startCheckout, isPending, isError } = useMutation({
    mutationFn: checkout,
    onSuccess: (url) => {
      window.location.href = url;
    }
  });

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <header className="checkout-header">
          <span className="checkout-label">DIN BESTÄLLNING</span>
          <h1>Checkout</h1>
          <p>
            Kontrollera din beställning innan du går vidare
            till betalningen.
          </p>
        </header>

        <section className="checkout-card">
          <h2>Ordersammanfattning</h2>

          <div className="checkout-product">
            <div className="checkout-product-icon">🍖</div>

            <div className="checkout-product-info">
              <h3>SlowpokeTail Roast</h3>
              <p>Antal: 1</p>
            </div>

            <span className="checkout-product-price">
              149 kr
            </span>
          </div>

          <div className="checkout-total">
            <span>Totalt att betala</span>
            <strong>149 kr</strong>
          </div>

          {isError && (
            <p className="checkout-error">
              Något gick fel. Försök igen.
            </p>
          )}

          <button
            className="checkout-button"
            onClick={() => startCheckout()}
            disabled={isPending}
          >
            {isPending ? "Förbereder betalning..." : "Betala med Stripe →"}
          </button>

          <p className="checkout-security">
            🔒 Säker betalning via Stripe
          </p>
        </section>
      </div>
    </main>
  );
};

export default Checkout;
