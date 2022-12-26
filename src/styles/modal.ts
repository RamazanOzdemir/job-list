import { DialogContent, styled } from '@mui/material';

export const StyledModalContent = styled(DialogContent)(({ theme }) => ({
  margin: '0.5rem 4.5rem',
  padding: '0rem',
  [theme.breakpoints.down('sm')]: {
    margin: '0.2rem 0.5rem'
  }
}));
