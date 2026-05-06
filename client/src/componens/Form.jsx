import React, { useState } from "react";

function Form() {
  // const  [name, setName] = useState("");
  // const  [email, setEmail] = useState("");

  const name = useInput("");
  const email = useInput("");

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Skriv in ett namn"
        // value={name}
        // onChange={(e) => e.target.value}
        {...name}
      />

      {/* ...name sprider value och onchange automatiskt */}
      {/* vi slipper skriva setState */}

      <p>{name}</p>
    </Form>
  );
}

export default Form;
