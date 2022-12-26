import { JobCreationForm } from "@/components";
import { ContainerTitle, JobContainer } from "@/styles";
import { FC } from "react";

export const CreateJob: FC = () => {
  return (
    <JobContainer>
      <ContainerTitle>Create New Job</ContainerTitle>
      <JobCreationForm />
    </JobContainer>
  );
};
