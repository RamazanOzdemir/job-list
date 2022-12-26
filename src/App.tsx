import { FC } from 'react';
import { Footer, Header, Main } from '@/containers';
import { AppContainer } from './styles';
import './styles/reset.css';
type Props = {};

const App: FC<Props> = (props: Props) => {
  return (
    <AppContainer>
      <Header />
      <Main />
      <Footer />
    </AppContainer>
  );
};

export default App;
