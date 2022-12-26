import { FC, useEffect, useState } from "react";
import { JobContext } from "./context";
import { IJobPriority } from "@/constants";
import { IndexDB } from "@/database";

export const JobProvider = ({ children }) => {
  const [priorities, setPriorities] = useState<IJobPriority[]>([]);

  useEffect(() => {
    IndexDB.getJobPriorities()
      .then((list) => {
        setPriorities(list);
      })
      .catch(() => {});
  }, []);

  return (
    <JobContext.Provider value={{ priorities, setPriorities }}>
      {children}
    </JobContext.Provider>
  );
};
