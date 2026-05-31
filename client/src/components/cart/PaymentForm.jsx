import { useState } from "react";

function PaymentForm({ onSubmit, isLoading }) {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  const [shipping, setShipping] = useState("standard");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, shipping });
  };

  return (
    <form className="checkout-form" onSubmit={handleSubmit}>
      <p className="checkout-section-title">Shipping info</p>
    </form>
  );
}

export default PaymentForm;
