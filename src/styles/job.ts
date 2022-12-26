import { IStyledPriorityBox } from '@/constants';
import {
  Box,
  Button,
  TableCell,
  TableRow,
  circularProgressClasses,
  styled,
  tableCellClasses
} from '@mui/material';

export const JobContainer = styled('section')(({ theme }) => ({
  width: '100%',
  padding: '0.5rem 1rem',
  margin: 0,
  [theme.breakpoints.down('sm')]: {
    padding: '0.4rem 0.3rem'
  }
}));

export const ContainerTitle = styled('h2')(() => ({
  fontSize: '1.3rem',
  fontWeight: 'bold',
  margin: '0.2 inherit'
}));

export const CreateJobButton = styled(Button)(({ theme }) => ({
  width: '100%',
  height: '2.4rem',
  [theme.breakpoints.down('sm')]: {
    height: '100%'
  },
  [`& .${circularProgressClasses.circle}`]: {
    color: theme.palette.common.white
  }
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '1rem',
    padding: '0.6rem'
  }
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.common.white
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.selected
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

export const JobNameContainer = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '40rem',
  [theme.breakpoints.down('md')]: {
    width: '20rem'
  },
  [theme.breakpoints.down('sm')]: {
    width: '8rem'
  }
}));

export const JobActionContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  columnGap: '0.4rem',
  justifyContent: 'center',
  alignItems: 'center',
  width: '5rem',
  height: '100%',
  [theme.breakpoints.down('sm')]: {
    width: '3.5rem',
    columnGap: '0.2rem'
  }
}));

export const StyledPriorityBox = styled(Box)<IStyledPriorityBox>(
  ({ theme, variant }) => ({
    height: '2.2rem',
    width: '5rem',
    backgroundColor: theme.palette[variant]['light'],
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0.2rem',
    fontWeight: 'bold',
    [theme.breakpoints.down('sm')]: {
      width: '3.5rem',
      height: '2rem',
      fontSize: '0.8rem'
    }
  })
);
