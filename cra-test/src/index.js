import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Button(props) {
  return (
    <button onClick={props.onClickFunction}>
      +1
    </button>
  );
}

function Display(props){
  return(
    <div>{props.message}</div>
  );
}

function App(){
  const [counter, setCounter] = useState(0);
  const incrementCounter = () => setCounter(counter+1);
  return(
    <div>
      <Button onClickFunction={incrementCounter}/>
      <Display message={counter}/>
  </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);