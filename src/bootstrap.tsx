import App from "./App";
import * as ReactDOMClient from "react-dom/client";
import Startup from "./Startup";
import { JobProvider } from "./contexts";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(container);

root.render(
  <Startup>
    <JobProvider>
      <App />
    </JobProvider>
  </Startup>
);
