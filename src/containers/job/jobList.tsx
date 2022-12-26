import { DeleteModal, FilterForm, JobTable, UpdateModal } from "@/components";
import { ContainerTitle, JobContainer } from "@/styles";
import { FC } from "react";

export const JobList: FC = () => {
  return (
    <JobContainer>
      <ContainerTitle>Job List</ContainerTitle>
      <FilterForm />
      <JobTable />
      <DeleteModal />
      <UpdateModal />
    </JobContainer>
  );
};
