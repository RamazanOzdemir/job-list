import { EVENT, EventHandler, IJob } from '@/constants';
import { IndexDB, TABLES } from '@/database';
import { useJobContext } from '@/hooks';
import { StyledModalContent } from '@/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { FC, useEffect, useState } from 'react';

export const UpdateModal: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [job, setJob] = useState<IJob | null>(null);
  const [priority, setPriority] = useState<string>('');

  const { priorities } = useJobContext();

  const handleCancel = () => {
    setOpen(false);
    setJob(null);
  };

  const handleUpdate = () => {
    const newJob = { ...job, priority };
    IndexDB.update(TABLES.jobList, newJob)
      .then(() => {
        document.dispatchEvent(new CustomEvent(EVENT.listRefresh));
      })
      .finally(() => {
        handleCancel();
      });
  };

  const handlePriority: EventHandler<SelectChangeEvent> = (event) => {
    setPriority(event.target.value);
  };

  useEffect(() => {
    const handleEventListener: EventListener = (event: CustomEvent) => {
      setOpen(true);
      setJob(event.detail);
      setPriority(event.detail.priority);
    };
    document.addEventListener(EVENT.updateJob, handleEventListener);

    return () => {
      document.removeEventListener(EVENT.deleteJob, () => {});
    };
  }, []);

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">
        <Typography sx={{ fontSize: '1.2rem' }} gutterBottom textAlign="center">
          Job Edit
        </Typography>
      </DialogTitle>
      <StyledModalContent>
        <Grid container gap={2} padding="1.5rem">
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Job Name"
                size="small"
                name="jobName"
                fullWidth
                value={job?.name}
                disabled
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth size="small">
              <InputLabel tabIndex={1} id="job-priority-label">
                Job Priority
              </InputLabel>

              <Select
                name="jobPriority"
                labelId="job-priority-label"
                label="Job Priority"
                value={priority}
                onChange={handlePriority}
              >
                {priorities.map((priority) => (
                  <MenuItem key={priority.name} value={priority.id}>
                    {priority.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </StyledModalContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="contained" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          variant="contained"
          color="error"
          autoFocus
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
