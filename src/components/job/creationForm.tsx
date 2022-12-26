import { EVENT, EventHandler } from "@/constants";
import { IndexDB, TABLES } from "@/database";
import { useJobContext } from "@/hooks";
import {
  CreateJobButton,
  StyledBox,
  StyledSelect,
  StyledTextField,
} from "@/styles";
import { IValidationSchema, validate } from "@/utils";

import {
  Alert,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Snackbar,
} from "@mui/material";

import { FC, useCallback, useMemo, useState } from "react";

export const JobCreationForm: FC = () => {
  const [jobName, setJobName] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  const [error, setError] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const { priorities } = useJobContext();

  const validationSchema: IValidationSchema<string> = useMemo(
    () => ({
      jobName: {
        rules: [
          {
            action: (value) => value === "",
            message: "Job name is required!",
          },
          {
            action: (value) => value.length > 255,
            message: "Job name cannot exceed 255 characters!",
          },
          {
            action: (value) => !value.match(/^[a-z0-9 ]+$/i),
            message: "Job name can contain only alphanumeric characters!",
          },
        ],
      },
      priority: {
        rules: [
          {
            action: (value) => value === "",
            message: "Job priority is required!",
          },
        ],
      },
    }),
    []
  );

  const handleJobName: EventHandler<React.ChangeEvent<HTMLInputElement>> = (
    event
  ) => {
    setJobName(event.target.value);
  };

  const handlePriority: EventHandler<SelectChangeEvent> = (event) => {
    setPriority(event.target.value);
  };

  const handleSubmit = useCallback(
    (values: { jobName: string; priority: string }) => {
      const e = validate(values, validationSchema);

      if (e.size) {
        setError(e);
        return;
      }
      setLoading(true);
      IndexDB.add(TABLES.jobList, {
        name: values.jobName,
        priority: values.priority,
      })
        .then(() => {
          document.dispatchEvent(new CustomEvent(EVENT.listRefresh));
          setAlert({
            open: true,
            message: "The job added successfully",
            severity: "success",
          });
        })
        .catch(() => {
          setAlert({
            open: false,
            message: "An error occurred when adding job",
            severity: "error",
          });
        })
        .finally(() => {
          setJobName("");
          setPriority("");
          setError(new Map());
          setLoading(false);
        });
    },
    []
  );

  const handleClose = () => {
    setAlert({ open: false, message: "", severity: "success" });
  };

  return (
    <StyledBox>
      <form id="job-creation-form">
        <Grid container spacing={2}>
          <Grid item container spacing={2} xs={8} sm={10}>
            <Grid item sm={8} xs={12}>
              <FormControl fullWidth>
                <StyledTextField
                  label="Job Name"
                  size="small"
                  name="jobName"
                  error={!!error.get("jobName")}
                  fullWidth
                  placeholder="Please enter valid job name"
                  value={jobName}
                  onChange={handleJobName}
                  helperText={error.get("jobName") || ""}
                />
              </FormControl>
            </Grid>
            <Grid item sm={4} xs={12}>
              <FormControl
                error={!!error.get("priority")}
                fullWidth
                size="small"
              >
                <InputLabel id="job-priority-label">Job Priority</InputLabel>

                <StyledSelect
                  name="jobPriority"
                  labelId="job-priority-label"
                  label="Job Priority"
                  value={priority}
                  onChange={handlePriority}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {priorities.map((priority) => (
                    <MenuItem key={priority.name} value={priority.id}>
                      {priority.name}
                    </MenuItem>
                  ))}
                </StyledSelect>
                <FormHelperText>{error.get("priority") || ""}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item xs={4} sm={2} alignItems="flex-start">
            <CreateJobButton
              variant="contained"
              size="small"
              onClick={() => handleSubmit({ jobName, priority })}
              disabled={loading}
            >
              {loading ? <CircularProgress size={22} /> : "Create"}
            </CreateJobButton>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={alert.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={alert.severity}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </StyledBox>
  );
};
