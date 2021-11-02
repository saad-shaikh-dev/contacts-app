import React, { useContext } from "react";
import AlertContext from "../../context/alert/alertContext";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      <div>
        <i className="fas fa-info-circle" />
        &nbsp;
        {alert.message}
      </div>
    ))
  );
};

export default Alerts;
