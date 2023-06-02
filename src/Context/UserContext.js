import { createContext, useEffect, useState } from "react";
import Axios from "axios";
export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState([]);
  const base_url = process.env.REACT_APP_BACKEND_URL;
  // console.log(base_url)
  useEffect(() => {
    Axios.get(`${base_url}/api/auth/get-all`)
      .then((res) => {
       setUser(res.data.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
