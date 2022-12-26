import { FC } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { EVENT, EventHandler } from "@/constants";
import { JobActionContainer } from "@/styles";

export type JobActionsProps = {
  jobId: string;
  jobName: string;
  jobPriority: string;
};

export const JobActions: FC<JobActionsProps> = (props) => {
  const { jobId, jobName, jobPriority } = props;

  const handleDeleteJob: EventHandler<
    React.MouseEvent<HTMLButtonElement>
  > = () => {
    document.dispatchEvent(
      new CustomEvent(EVENT.deleteJob, { detail: { id: jobId } })
    );
  };

  const handleUpdateJob: EventHandler<
    React.MouseEvent<HTMLButtonElement>
  > = () => {
    document.dispatchEvent(
      new CustomEvent(EVENT.updateJob, {
        detail: { id: jobId, name: jobName, priority: jobPriority },
      })
    );
  };

  return (
    <JobActionContainer>
      <IconButton aria-label="delete" color="error" onClick={handleDeleteJob}>
        <DeleteOutlineIcon />
      </IconButton>
      <IconButton aria-label="edit" color="primary" onClick={handleUpdateJob}>
        <EditIcon />
      </IconButton>
    </JobActionContainer>
  );
};
