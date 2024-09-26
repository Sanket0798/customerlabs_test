import React, { useState } from "react";
import Popup from "./components/Popup";

const App = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleSaveSegment = () => {
    setShowPopup(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <button
        onClick={handleSaveSegment}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save segment
      </button>

      {showPopup && <Popup closePopup={() => setShowPopup(false)} />}
    </div>
  );
};

export default App;
