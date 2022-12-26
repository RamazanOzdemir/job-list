import { ReactElement, useEffect, useState } from "react";
import { IndexDB } from "./database";
import { DoorBack } from "@mui/icons-material";
import { getJobPriorities } from "./services";

const Startup = (props: IStartupProps) => {
  const { children } = props;
  const [component, setComponent] = useState(false);

  /**
   *
   */
  useEffect(() => {
    const init = async () => {
      return IndexDB.initDatabase();
    };

    init().then((result: boolean) => {
      getJobPriorities();

      setComponent(result);
    });
  }, []);

  return component ? children : null;
};

interface IStartupProps {
  children: ReactElement;
}

export default Startup;
