import React, { useState } from "react";
import Dropdown from "./Dropdown";

const Popup = ({ closePopup }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [schemaValues, setSchemaValues] = useState({});
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: "First Name", value: "first_name", type: "" },
    { label: "Last Name", value: "last_name", type: "" },
    { label: "Gender", value: "gender", type: "" },
    { label: "Age", value: "age", type: Number },
    { label: "Account Name", value: "account_name", type: "" },
    { label: "City", value: "city", type: "" },
    { label: "State", value: "state", type: "" },
  ]);

  // Handle schema addition
  const addSchema = (schema) => {
    if (schema && !selectedSchemas.some((s) => s.value === schema.value)) {
      setSelectedSchemas([...selectedSchemas, schema]);
      setAvailableSchemas(
        availableSchemas.filter((item) => item.value !== schema.value)
      );
      setSchemaValues({ ...schemaValues, [schema.value]: "" });
    }
  };

  // Handle schema removal
  const removeSchema = (schema) => {
    setSelectedSchemas(selectedSchemas.filter((s) => s.value !== schema.value));
    setAvailableSchemas([...availableSchemas, schema]);
    const newSchemaValues = { ...schemaValues };
    delete newSchemaValues[schema.value];
    setSchemaValues(newSchemaValues);
  };

  // Handle schema value input change
  const handleSchemaInputChange = (value, schemaKey) => {
    setSchemaValues({ ...schemaValues, [schemaKey]: value });
  };

  // Save handler
  const handleSave = () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schemaValues[schema.value],
      })),
    };

    fetch("https://webhook.site/92c446b0-2123-4c03-977f-4e3d231fd83e", {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log("Success: Segment saved");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    closePopup();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Saving Segment</h2>

        {/* Segment Name Input */}
        <input
          type="text"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          placeholder="Name of the segment"
          className="border p-2 mb-4 w-full"
        />

        <p className="text-sm mb-4">
          To save your segment, you need to add the schemas to build the query:
        </p>

        {/* Display dynamically added schema inputs */}
        {selectedSchemas.length > 0 && (
          <div className="space-y-2 mb-4">
            {selectedSchemas.map((schema, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-blue-100 p-2 rounded mb-2"
              >
                <div className="flex items-center space-x-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      schema.type === "User Traits"
                        ? "bg-green-500"
                        : "bg-pink-500"
                    }`}
                  ></span>
                  <span>{schema.label}</span>
                </div>

                {/* Input for schema value */}
                <input
                  type="text"
                  value={schemaValues[schema.value] || ""}
                  onChange={(e) =>
                    handleSchemaInputChange(e.target.value, schema.value)
                  }
                  placeholder={`Enter ${schema.label}`}
                  className="border p-1 rounded"
                />

                {/* Remove schema button */}
                <button
                  onClick={() => removeSchema(schema)}
                  className="text-red-500 ml-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Dropdown to Add New Schema */}
        <Dropdown options={availableSchemas} addSchema={addSchema} />

        {/* Save/Cancel Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            Save the Segment
          </button>
          <button
            onClick={closePopup}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
