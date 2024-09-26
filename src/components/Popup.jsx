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

  const addSchema = (schema) => {
    if (schema && !selectedSchemas.some((s) => s.value === schema.value)) {
      setSelectedSchemas([...selectedSchemas, schema]);
      setAvailableSchemas(
        availableSchemas.filter((item) => item.value !== schema.value)
      );
      setSchemaValues({ ...schemaValues, [schema.value]: "" });
    }
  };

  const removeSchema = (schema) => {
    setSelectedSchemas(selectedSchemas.filter((s) => s.value !== schema.value));
    setAvailableSchemas([...availableSchemas, schema]);
    const newSchemaValues = { ...schemaValues };
    delete newSchemaValues[schema.value];
    setSchemaValues(newSchemaValues);
  };

  const handleSchemaInputChange = (value, schemaKey) => {
    setSchemaValues({ ...schemaValues, [schemaKey]: value });
  };

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
        // console.log("Success: Segment saved");
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    closePopup();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-md w-full max-w-lg h-full sm:h-[500px] md:h-[600px] lg:h-[700px] flex flex-col justify-between">
        <div>
          <div className="h-[76px]">
            <h2 className="text-lg sm:text-xl md:text-2xl p-4 font-semibold mb-4 h-[76px] text-white bg-[rgba(57,175,189,255)] items-center flex">
              Saving Segment
            </h2>
          </div>

          <div className="p-4 sm:p-6">
            <p className="text-black text-[12px] sm:text-[14px] mb-4">
              Enter the Name of the Segment
            </p>
            <input
              type="text"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              placeholder="Name of the segment"
              className="border border-[rgba(202,202,202,255)] placeholder:text-[12px] sm:placeholder:text-[14px] p-2 mb-4 w-full"
            />

            <p className="text-xs sm:text-sm mb-4 font-medium">
              To save your segment, you need to add the schemas to build the
              query:
            </p>

            {selectedSchemas.length > 0 && (
              <div className="space-y-2 mb-4">
                {selectedSchemas.map((schema, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-2 rounded mb-2"
                  >
                    <div className="flex items-center space-x-2 mb-2 sm:mb-0">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          schema.type === "User Traits"
                            ? "bg-green-500"
                            : "bg-pink-500"
                        }`}
                      ></span>
                      <span>{schema.label}</span>
                    </div>

                    <input
                      type="text"
                      value={schemaValues[schema.value] || ""}
                      onChange={(e) =>
                        handleSchemaInputChange(e.target.value, schema.value)
                      }
                      placeholder={`Enter ${schema.label}`}
                      className="border p-1 rounded w-full sm:w-auto mb-2 sm:mb-0"
                    />

                    <button
                      onClick={() => removeSchema(schema)}
                      className="text-red-500 ml-0 sm:ml-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-4 w-4"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <Dropdown options={availableSchemas} addSchema={addSchema} />
          </div>
        </div>

        <div>
          <div className="flex justify-start space-x-3 bg-[rgba(246,246,246,255)] h-[80px] items-center p-4">
            <button
              onClick={handleSave}
              className="bg-[#41b392] text-white py-2 px-4 rounded-md"
            >
              Save the Segment
            </button>
            <button
              onClick={closePopup}
              className="bg-white text-black py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
