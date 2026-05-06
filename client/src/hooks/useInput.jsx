import React, { useState } from "react";

function useInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    onChange: (e) => setValue(e.target.value),
    reset: () => setValue(initialValue),
  };

//   Value (useState) lagrar värdet
//   Onchange som uppdaterar värdet när användaren skriver
//   Reset återställer till start värdet
}

export default useInput;
