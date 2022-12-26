import { useJobContext } from "@/hooks";
import { StyledPriorityBox } from "@/styles";
import { FC, useMemo } from "react";

type JobPriorityProps = {
  priority: string;
};

const priorityColors = {
  "1": "error",
  "2": "warning",
  "3": "success",
};

export const JobPriority: FC<JobPriorityProps> = ({ priority }) => {
  const { priorities } = useJobContext();

  const priorityMap: Map<string, string> = useMemo(() => {
    const mapList = new Map<string, string>();
    priorities.forEach((priority) => mapList.set(priority.id, priority.name));
    return mapList;
  }, [priorities.length]);

  return (
    <StyledPriorityBox variant={priorityColors[priority] || "error"}>
      {priorityMap.get(priority)}
    </StyledPriorityBox>
  );
};
