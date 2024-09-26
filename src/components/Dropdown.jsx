import React, { useState } from "react";

const Dropdown = ({ options, addSchema }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleAddSchema = () => {
    if (selectedOption) {
      addSchema(selectedOption);
      setSelectedOption(null);
    }
  };

  return (
    <div>
      <select
        value={selectedOption?.value || ""}
        onChange={(e) => {
          const selected = options.find((opt) => opt.value === e.target.value);
          setSelectedOption(selected);
        }}
        className="border p-2 mb-4 w-full"
      >
        <option value="">Add schema to segment</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <button
        onClick={handleAddSchema}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        +Add new schema
      </button>
    </div>
  );
};

export default Dropdown;
