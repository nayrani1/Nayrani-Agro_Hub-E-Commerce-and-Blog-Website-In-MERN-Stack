// Popup.js
import React from 'react';
import * as IoIcons  from 'react-icons/io5';

const Popup = ({ isOpen, onClose, content }) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div className="popup-overlay">
      <div className="popup-container">
          <IoIcons.IoClose className="close-button" onClick={onClose}/>
        <div>
        {content}
        </div>
      </div>
    </div>
  );
};

export default Popup;

// const [isPopupOpen, setPopupOpen] = useState(false);

// const openPopup = () => {
//   setPopupOpen(true);
// };

// const closePopup = () => {
//   setPopupOpen(false);
// };
// return (
// <div>
//    <h1>Your App</h1>
//     <button onClick={openPopup}>Open Popup</button>
//     <Popup isOpen={isPopupOpen} onClose={closePopup} />
//     {/* Other components/content */}
//   </div>
// )
