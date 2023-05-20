import { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const IdeasContext = createContext();

export function IdeasProvider({ children }) {
  const [ideas, setIdeas] = useState([]);
  const base_url = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    Axios.get(`${base_url}/api/ideas/get-all`)
      .then((res) => {
        setIdeas(res.data.data);
        //  console.log(res.data.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <IdeasContext.Provider value={{ ideas, setIdeas }}>
      {children}
    </IdeasContext.Provider>
  );
}
