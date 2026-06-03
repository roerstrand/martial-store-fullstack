import { useState } from "react";

function KlarnaModal({ total, onConfirm, onClose }) {
  const [step, setStep] = useState("review"); // "review" | "processing"

  const handlePay = () => {
    setStep("processing");
    setTimeout(async () => {
      try {
        await onConfirm();
      } catch {
        setStep("error");
      }
    }, 1800);
  };

  return (
    <div className="klarna-overlay" onClick={onClose}>
      <div className="klarna-modal" onClick={(e) => e.stopPropagation()}>

        <div className="klarna-modal__header">
          <img src="/icons/Klarna.png" alt="Klarna" className="klarna-modal__logo" />
          <button className="klarna-modal__close" onClick={onClose} disabled={step === "processing"}>✕</button>
        </div>

        {step === "error" ? (
          <div className="klarna-modal__processing">
            <p style={{ color: "#d62839", fontWeight: 600 }}>Payment failed</p>
            <p style={{ fontSize: "0.8rem", color: "#888" }}>Something went wrong. Please try again.</p>
            <button className="klarna-modal__pay-btn" onClick={() => setStep("review")}>Try again</button>
          </div>
        ) : step === "review" ? (
          <>
            <p className="klarna-modal__title">Confirm your payment</p>
            <p className="klarna-modal__sub">You are about to pay with Klarna</p>

            <div className="klarna-modal__amount">
              <span className="klarna-modal__amount-label">Total</span>
              <span className="klarna-modal__amount-value">{total} EUR</span>
            </div>

            <div className="klarna-modal__options">
              <div className="klarna-modal__option klarna-modal__option--active">
                <span className="klarna-modal__option-name">Pay now</span>
                <span className="klarna-modal__option-desc">Full amount charged today</span>
              </div>
              <div className="klarna-modal__option">
                <span className="klarna-modal__option-name">Pay in 30 days</span>
                <span className="klarna-modal__option-desc">Interest-free, no fees</span>
              </div>
              <div className="klarna-modal__option">
                <span className="klarna-modal__option-name">3 interest-free payments</span>
                <span className="klarna-modal__option-desc">{Math.round(total / 3)} EUR / month</span>
              </div>
            </div>

            <button className="klarna-modal__pay-btn" onClick={handlePay}>
              Pay {total} EUR
            </button>
            <p className="klarna-modal__secure">🔒 Secured by Klarna · Demo mode</p>
          </>
        ) : (
          <div className="klarna-modal__processing">
            <div className="klarna-spinner" />
            <p>Processing payment...</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default KlarnaModal;
