import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import styles from './styles/style.module.css';
import './style.css';

function syncLocalStorageWithStateNumber(key, initialState) {
  const [state, setState] = React.useState(
    () => parseInt(window.localStorage.getItem(key)) || initialState
  );
  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [state]);
  return [state, setState];
}

function syncLocalStorageWithStateString(key, initialState) {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || initialState
  );
  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [state]);
  return [state, setState];
}

function Main() {
  const [value, setValue] = syncLocalStorageWithStateNumber('value', 0);
  const [name, setName] = syncLocalStorageWithStateString('countName', 'Count');
  const [goal, setGoal] = syncLocalStorageWithStateString(
    'countGoal',
    'Goal: 5'
  );
  const countRef = React.useRef(null);
  const goalRef = React.useRef(null);

  function onChangeCountEvent(e) {
    setName(e.target.value);
  }

  function onChangeGoalEvent(e) {
    setGoal(e.target.value);
  }

  return (
    <div className={styles.Main}>
      <input
        className={styles.Counter}
        value={name}
        ref={countRef}
        onChange={onChangeCountEvent}
      ></input>
      <div className={styles.Current}>{value}</div>
      <div className={styles.BtnBar}>
        <div className={styles.Btn} onClick={() => setValue(value + 1)}>
          Increment
        </div>
        <div className={styles.Btn} onClick={() => setValue(0)}>
          Reset
        </div>
      </div>
      <input
        className={styles.Counter}
        value={goal}
        ref={goalRef}
        onChange={onChangeGoalEvent}
      ></input>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
