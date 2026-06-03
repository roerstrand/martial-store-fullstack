import { useState } from "react";

const PAYMENT_METHODS = [
  { value: "card",   label: "Credit / Debit Card", icon: "/icons/Card payments.png" },
  { value: "swish",  label: "Swish",               icon: "/icons/Swish.png" },
  { value: "klarna", label: "Klarna",               icon: "/icons/Klarna.png" },
];

function PaymentForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", zip: "", city: "" });
  const [shipping, setShipping] = useState("standard");
  const [payment, setPayment] = useState("card");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedOption = shippingOptions.find((o) => o.value === shipping);
    onSubmit({ ...form, shipping, payment, carrier: selectedOption?.carrier ?? null });
  };

  const shippingOptions = [
    { value: "standard", label: "Standard", meta: "3–5 days · 5 EUR", carrier: "PostNord" },
    { value: "express",  label: "Express",  meta: "1–2 days · 19 EUR", carrier: "DHL" },
    { value: "pickup",   label: "Pickup",   meta: "In store · Free",   carrier: null },
  ];

  return (
    <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>

      <p className="checkout-section-title">Contact information</p>
      <input className="apex-input" type="text"  name="name"  placeholder="Full name"  value={form.name}  onChange={handleChange} required />
      <input className="apex-input" type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
      <input className="apex-input" type="tel"   name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} required />

      <p className="checkout-section-title">Shipping address</p>
      <input className="apex-input" type="text" name="address" placeholder="Street address" value={form.address} onChange={handleChange} required />
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input className="apex-input" type="text" name="zip"  placeholder="Postal code" value={form.zip}  onChange={handleChange} required />
        <input className="apex-input" type="text" name="city" placeholder="City"         value={form.city} onChange={handleChange} required />
      </div>

      <p className="checkout-section-title">Shipping method</p>
      <div className="shipping-options">
        {shippingOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`shipping-option${shipping === opt.value ? " shipping-option--active" : ""}`}
            onClick={() => setShipping(opt.value)}
          >
            <span>{opt.label}{opt.carrier ? ` · ${opt.carrier}` : ""}</span>
            <span className="shipping-option__meta">{opt.meta}</span>
          </button>
        ))}
      </div>

      <p className="checkout-section-title">Payment method</p>
      <div className="payment-methods">
        {PAYMENT_METHODS.map((m) => (
          <button
            key={m.value}
            type="button"
            className={`payment-method${payment === m.value ? " payment-method--active" : ""}`}
            onClick={() => setPayment(m.value)}
          >
            <img src={m.icon} alt={m.label} className="payment-method__icon" />
            <span>{m.label}</span>
          </button>
        ))}
      </div>

    </form>
  );
}

export default PaymentForm;
