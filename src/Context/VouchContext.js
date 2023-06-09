import { createContext, useContext, useEffect, useState } from "react";
import Axios from "axios";
import { AuthContext } from "./AuthContext";

export const VouchContext = createContext({});

export function VouchProvider({ children }) {
  const { currentUser } = useContext(AuthContext);
  const [vouchedData, setVouchedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const base_url = process.env.REACT_APP_BACKEND_URL;

  // console.log(currentUser?.uid)
  useEffect(() => {
    Axios.get(
      `${base_url}/api/vouches/vouched-ideas?userID=${currentUser?.uid}`
    ).then((res) => {
      // console.log(res.data.data);
      setVouchedData(res.data.data);
      setLoading(false);
    });
  }, [currentUser]);

  return (
    <VouchContext.Provider value={{ vouchedData, loading, setVouchedData }}>
      {children}
    </VouchContext.Provider>
  );
}
