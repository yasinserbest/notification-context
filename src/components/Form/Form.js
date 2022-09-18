import React, { useContext, useState } from "react";
import NotificationContext from "../../store/notification-context";
import "./Form.css";
function Form() {
  const [titleVal, settitleVal] = useState("");
  const [messageVal, setmessageVal] = useState("");
  const [type, settype] = useState("");
  const notificationCtx = useContext(NotificationContext);

  const addNot = () => {
    notificationCtx.addNotification(titleVal, messageVal, type);
  };

  const handleChange = (e) => {
    settype(e.target.value);
  };

  return (
    <div className="form__container">
      <h1 className="form__container--title">App State Notification Handler</h1>
      <div className="form__elements">
        <input
          className="form__elements--input"
          type="text"
          value={titleVal}
          onChange={(e) => settitleVal(e.target.value)}
          placeholder="Title"
        />
        <input
          className="form__elements--input"
          type="text"
          value={messageVal}
          onChange={(e) => setmessageVal(e.target.value)}
          placeholder="Message"
        />
        <select
          value={type}
          onChange={handleChange}
          className="form__elements--select"
        >
          <option>Choose Notification Type</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="WARNING">WARNING</option>
          <option value="ERROR">ERROR</option>
        </select>
      </div>
      <button className="form__elements--button" onClick={addNot}>
        Add Notification
      </button>
    </div>
  );
}

export default Form;
