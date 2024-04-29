import React, { useState } from "react";
import { random } from "lodash"; // Import random function from lodash library

const PassWordEntry = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };



  
  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmed = window.confirm(
      `Are you sure you want to create a new password based on "${currentPassword}"?`
    );

    if (confirmed) {
      setConfirmNewPassword(true);
    }
  };

  const generateStrongPassword = (password) => {
    const shuffleString = (str) => {
     
      const array = str.split("");
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array.join("");
    };

    const addRandomNumbers = (str, count) => {
      
      const numbers = "0123456789";
      for (let i = 0; i < count; i++) {
        const randomDigit = numbers[Math.floor(Math.random() * numbers.length)];
        str += randomDigit;
      }
      return str;
    };


    let shuffledPassword = shuffleString(password);


    const desiredLength = Math.max(12, password.length); 
    const numbersToAdd = Math.max(0, desiredLength - password.length);

    // Add random numbers to the shuffled password
    shuffledPassword = addRandomNumbers(shuffledPassword, numbersToAdd);

    return shuffledPassword;
  };

  const generateWeakPassword = (password) => {

    return password.toUpperCase();
  };

  const handlePasswordLevelSelect = (level) => {
    const newGeneratedPassword =
      level === "Strong"
        ? generateStrongPassword(currentPassword)
        : generateWeakPassword(currentPassword);

    const confirmed = window.confirm(
      `You selected "${level}" level for password change. Proceed with new password: ${newGeneratedPassword}?`
    );

    if (confirmed) {
      console.log(
        `New password created with "${level}" strength:`,
        newGeneratedPassword
      );
      setCurrentPassword("");
      setConfirmNewPassword(false);
    }
  };

  return (
    <>
      <p>It's Time For Something New!</p>
      <div className="container">
        <div className="row justify-content-center">
          <form className="magic" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Enter Current Password"
                value={currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginTop: "10px" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {confirmNewPassword && (
        <div className="password-level-select">
          <h3>Select Password Change Level:</h3>
          <button
            className="btn btn-info"
            onClick={() => handlePasswordLevelSelect("Weak")}
            style={{ marginRight: "10px", marginTop: "10px" }}
          >
            Weak
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handlePasswordLevelSelect("Strong")}
            style={{ marginTop: "10px" }}
          >
            Strong
          </button>
        </div>
      )}
    </>
  );
};

export default PassWordEntry;
