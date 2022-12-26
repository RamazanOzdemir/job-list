import { EVENT } from '@/constants';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import { FC, useEffect, useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { IndexDB, TABLES } from '@/database';

export const DeleteModal: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [jobId, setJobId] = useState<string | null>(null);

  useEffect(() => {
    const handleEventListener: EventListener = (event: CustomEvent) => {
      setOpen(true);
      setJobId(event.detail.id);
    };
    document.addEventListener(EVENT.deleteJob, handleEventListener);

    return () => {
      document.removeEventListener(EVENT.deleteJob, () => {});
    };
  }, []);

  const handleCancel = () => {
    setOpen(false);
    setJobId(null);
  };

  const handleDelete = () => {
    IndexDB.remove(TABLES.jobList, jobId)
      .then(() => {
        document.dispatchEvent(new CustomEvent(EVENT.listRefresh));
      })
      .finally(() => {
        handleCancel();
      });
  };

  return (
    <Dialog open={open} id="delete-modal">
      <DialogTitle textAlign="center">
        <ErrorOutlineIcon color="error" fontSize="large" />
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1" gutterBottom textAlign="center">
          Are you sure want to delete it? {`${open}`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} variant="contained" color="inherit">
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
          autoFocus
        >
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};
