import React, { useReducer, createContext } from "react";
import { v4 } from "uuid";
import Notification from "../components/UI/Notification";
import "./notification-context.css";

const NotificationContext = createContext({
  addNotification: (title, message, notType) => {},
  deleteNotification: (id) => {},
});

const defaultNotState = {
  notifications: [],
};

const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      const updatedNotifications = state.notifications.concat(
        action.notification
      );
      return { notifications: updatedNotifications };
    case "REMOVE_NOTIFICATION":
      const newNotifications = state.notifications.filter(
        (el) => el.id !== action.id
      );
      return {
        notifications: newNotifications,
      };

    default:
      return state.notifications;
  }
};
export const NotificationProvider = (props) => {
  const [notificationState, dispatchNotificationAction] = useReducer(
    NotificationReducer,
    defaultNotState
  );

  const addNotificationToNotHandler = (title, message, notType) => {
    dispatchNotificationAction({
      type: "ADD_NOTIFICATION",
      notification: { title, message, id: v4(), type: notType },
    });
  };
  const removeNotificationFromNotHandler = (id) => {
    dispatchNotificationAction({
      type: "REMOVE_NOTIFICATION",
      id,
    });
  };

  const contextValue = {
    addNotification: addNotificationToNotHandler,
    deleteNotification: removeNotificationFromNotHandler,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      <div className="notification__wrapper">
        {notificationState.notifications.map((notification) => {
          return <Notification key={notification.id} {...notification} />;
        })}
      </div>
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;
