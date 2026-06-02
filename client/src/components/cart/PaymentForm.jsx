import { useState } from "react";

function PaymentForm({ onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", zip: "", city: "" });
  const [shipping, setShipping] = useState("standard");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, shipping });
  };

  const shippingOptions = [
    { value: "standard", label: "Standard", meta: "3–5 days — 5 EUR" },
    { value: "express",  label: "Express",  meta: "1–2 days — 19 EUR" },
    { value: "pickup",   label: "Pickup",   meta: "In store — Free" },
  ];

  return (
    <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>

      <p className="checkout-section-title">Contact information</p>
      <input className="apex-input" type="text"  name="name"  placeholder="Name"  value={form.name}  onChange={handleChange} required />
      <input className="apex-input" type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input className="apex-input" type="tel"   name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />

      <p className="checkout-section-title">Shipping address</p>
      <input className="apex-input" type="text" name="address" placeholder="Address"     value={form.address} onChange={handleChange} required />
      <input className="apex-input" type="text" name="zip"     placeholder="Postal code" value={form.zip}     onChange={handleChange} required />
      <input className="apex-input" type="text" name="city"    placeholder="City"        value={form.city}    onChange={handleChange} required />

      <p className="checkout-section-title">Shipping method</p>
      <div className="shipping-options">
        {shippingOptions.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`shipping-option ${shipping === opt.value ? "shipping-option--active" : ""}`}
            onClick={() => setShipping(opt.value)}
          >
            <span>{opt.label}</span>
            <span className="shipping-option__meta">{opt.meta}</span>
          </button>
        ))}
      </div>

      <p className="checkout-section-title">Payment</p>
      <div className="payment-logos">
        <img src="/icons/Klarna.png" alt="Klarna" />
        <img src="/icons/Swish.png" alt="Swish" />
        <img src="/icons/Card payments.png" alt="Card" />
      </div>

    </form>
  );
}

export default PaymentForm;
