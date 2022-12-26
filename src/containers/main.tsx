import { FC } from "react";
import { CreateJob, JobList } from "./job";
import { MainContainer } from "@/styles";

export const Main: FC = () => {
  return (
    <MainContainer>
      <CreateJob />
      <JobList />
    </MainContainer>
  );
};
