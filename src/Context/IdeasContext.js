import { createContext, useEffect, useState } from "react";
import Axios from "axios";

export const IdeasContext = createContext();

export function IdeasProvider({ children }) {
  const [ideas, setIdeas] = useState([]);
  useEffect(() => {
    Axios.get("http://lightbulb-server-env.eba-je399ubq.ap-south-1.elasticbeanstalk.com/api/ideas/get-all")
      .then((res) => {
        setIdeas(res.data.data);
        console.log(res.data.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <IdeasContext.Provider value={{ ideas }}>{children}</IdeasContext.Provider>
  );
}
