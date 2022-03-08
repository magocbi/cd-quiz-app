import React from 'react';
import { Main } from './App.styles';
import Card from './components/Card/Card';
import Header from './components/Header/Header';
import HighscoresButton from './components/HighscoresButton/HighscoresButton';
import Start from './components/Start/Start';
import Timer from './components/Timer/Timer';
import GlobalStyle from './GlobalStyle';

function App(): JSX.Element {
  return (
    <div>
      <GlobalStyle />
      <Header>
        <HighscoresButton />
        <Timer
          gameStarted={false}
          setGameOver={() => {}}
          incorrectNumber={0}
          setTimeLeft={() => {}}
        />
      </Header>
      <Main>
        <Card title={'Coding Quiz Challenge'}>
          <Start startQuiz={() => {}} />
        </Card>
      </Main>
    </div>
  );
}

export default App;
