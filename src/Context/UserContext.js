import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [data, setData] = useState({});

  const setChangedData = (data) => {
    setData(data);
  };

  return (
    <UserContext.Provider value={{ data, setChangedData }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
