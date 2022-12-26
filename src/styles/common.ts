import { Box, Select, TextField, styled } from '@mui/material';

export const AppContainer = styled('div')(() => ({
  display: 'flex',
  height: '100vh',
  width: '100vw',
  flexDirection: 'column',
  overflow: 'hidden',
  margin: 0,
  padding: 0
}));

export const HeaderContainer = styled('header')(({ theme }) => ({
  minHeight: '5rem',
  width: '100%',
  backgroundColor: theme.palette.info.light,
  display: 'flex',
  alignItems: 'center',
  padding: '0 1rem'
}));

export const Logo = styled('img')({
  height: '4rem',
  width: 'auto',
  margin: 0,
  padding: 0
});

export const MainContainer = styled('main')({
  flex: 1,
  overflow: 'auto'
});

export const FooterContainer = styled('footer')(({ theme }) => ({
  minHeight: '3rem',
  width: '100%',
  backgroundColor: theme.palette.grey[400],
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  padding: '0.8rem 1.2rem',
  borderRadius: '0.5rem'
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: theme.palette.common.white
  }
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.common.white
}));
