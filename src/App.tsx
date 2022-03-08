import React from 'react';
import Header from './components/Header/Header';
import HighscoresButton from './components/HighscoresButton/HighscoresButton';
import Timer from './components/Timer/Timer';
import GlobalStyle from './GlobalStyle';

function App(): JSX.Element {
  return (
    <div className='App'>
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
    </div>
  );
}

export default App;
