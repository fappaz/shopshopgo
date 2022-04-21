import { Autocomplete as MuiAutocomplete } from "@material-ui/lab";
import React, { useState } from "react";

/**
 * A custom autocomplete built on top of MUI's Autocomplete that submits the option as soon as the input/select is changed.
 * @param {import("@material-ui/lab").AutocompleteProps} props
 */
export default function Autocomplete({ onChange, ...props } = {}) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  /**
   * @param {Event} event
   * @param {string} value
   * @param {string} reason One of "create-option", "select-option", "remove-option", "blur" or "clear".
   */
  const handleChange = (event, value, reason) => {
    setValue(null);
    setInputValue("");

    if (!onChange) return;
    onChange(event, value, reason);
  };

  /**
   * @param {Event} event
   * @param {string} value
   * @param {string} reason One of "create-option", "select-option", "remove-option", "blur" or "clear".
   */
  const handleInputChange = (event, value, reason) => {
    setInputValue(value);
  };

  return (
    <>
      <MuiAutocomplete
        freeSolo
        value={value}
        inputValue={inputValue}
        onChange={handleChange}
        onInputChange={handleInputChange}
        {...props}
      />
    </>
  );
}