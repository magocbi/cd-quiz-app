import React from 'react';
import { Main } from './App.styles';
import Card from './components/Card/Card';
import Header from './components/Header/Header';
import HighscoresButton from './components/HighscoresButton/HighscoresButton';
import Options from './components/Options/Options';
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
          <Options
            options={[
              '1. option 1',
              '2. option 2',
              '3. option 3',
              '4. option 4',
            ]}
            checkAnswer={() => {}}
          />
        </Card>
      </Main>
    </div>
  );
}

export default App;
