import React from "react";
import { AppContext } from "../context";

const useGlobalContext = () => {
  const context = React.useContext(AppContext);

  if (!context) throw new Error("Auth context must be use inside AuthProvider");

  return context;
};

export default useGlobalContext;
