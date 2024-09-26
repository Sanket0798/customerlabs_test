import React, { useState } from "react";
import Dropdown from "./Dropdown";

const Popup = ({ closePopup }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);

  const addSchema = (schema) => {
    if (schema && !selectedSchemas.includes(schema)) {
      setSelectedSchemas([...selectedSchemas, schema]);
      setAvailableSchemas(
        availableSchemas.filter((item) => item.value !== schema.value)
      );
    }
  };

  const handleSave = () => {
    const data = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label,
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
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    closePopup();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-xl mb-4">Save Segment</h2>
        <input
          type="text"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
          placeholder="Segment Name"
          className="border p-2 mb-4 w-full"
        />

        <Dropdown options={availableSchemas} addSchema={addSchema} />

        {selectedSchemas.length > 0 && (
          <div className="mt-4">
            {selectedSchemas.map((schema, index) => (
              <div key={index} className="bg-blue-100 p-2 mb-2 rounded">
                {schema.label}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          Save Segment
        </button>
      </div>
    </div>
  );
};

export default Popup;
