import React, { useState, useEffect, useContext } from "react";
import "./Notification.css";
import NotificationContext from "../../store/notification-context";

const Notification = (props) => {
  const notificationCtx = useContext(NotificationContext);

  const [width, setWidth] = useState(0);
  const [intervalID, setIntervalID] = useState(null);
  const [exit, setExit] = useState(false);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prevState) => {
        if (prevState < 100) {
          return prevState + 0.5; //add 0.5 to bar width in every 10 ms
        }
        clearInterval(id);
        return prevState;
      });
    }, 10);
    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      notificationCtx.deleteNotification(props.id);
    }, 200); //removes from dom
  };

  useEffect(() => {
    if (width === 100) {
      //if bar width == 100 close notification
      handleCloseNotification();
    }
  }, [width]);

  useEffect(() => {
    handleStartTimer();
  }, []);

  const findNotificationClassess = () => {
    switch (props.type) {
      case "SUCCESS":
        return "success";
      case "ERROR":
        return "error";
      case "WARNING":
        return "warning";

      default:
        return "";
    }
  };
  const notificationClasses = findNotificationClassess();

  return (
    <div
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      className={`notification ${notificationClasses} ${exit ? "exit" : ""} `}
    >
      <p className="notification__title">{props.title}</p>
      <p className="notification__message">{props.message}</p>
      <div className="notification__bar" style={{ width: `${width}%` }} />
      <span onClick={() => setExit(true)} className="notification__exit">
        X
      </span>
    </div>
  );
};

export default Notification;
