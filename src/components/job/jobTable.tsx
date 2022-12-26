import { useJobList } from '@/hooks';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { FC } from 'react';
import { JobPriority } from './jobPriority';
import { JobActions } from './jobActions';
import {
  JobNameContainer,
  StyledBox,
  StyledTableCell,
  StyledTableRow
} from '@/styles';

export const JobTable: FC = () => {
  const list = useJobList();

  return (
    <StyledBox>
      <TableContainer sx={{ maxHeight: '45vh' }}>
        <Table id="job-list" stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Priority</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list.map((job) => (
              <StyledTableRow key={job.id}>
                <StyledTableCell>
                  <JobNameContainer>
                    <Typography noWrap> {job.name}</Typography>{' '}
                  </JobNameContainer>
                </StyledTableCell>
                <StyledTableCell>
                  <JobPriority priority={job.priority} />
                </StyledTableCell>
                <StyledTableCell>
                  <JobActions
                    jobId={job.id}
                    jobName={job.name}
                    jobPriority={job.priority}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledBox>
  );
};
