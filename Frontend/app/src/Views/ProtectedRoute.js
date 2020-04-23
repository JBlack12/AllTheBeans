import React from "react";
import { useHistory } from "react-router-dom";
import AddBeanView from "./AddBeanView";

export default function ProtectedRoute({ UserLevel }) {
  const history = useHistory();

  if (UserLevel === "Admin") {
    return <AddBeanView></AddBeanView>;
  } else {
    history.push("/");
    return <div>Route not found</div>;
  }
}
