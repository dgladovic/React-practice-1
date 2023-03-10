import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Button(props) {
  const handleClick = () => props.onClickFunction(props.increment)
  return (
    <button onClick={ handleClick}>
      +{props.increment}
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
  const incrementCounter = (incrementVal) => setCounter(counter+incrementVal);
  return(
    <div>
      <Button onClickFunction={incrementCounter} increment={1}/>
      <Button onClickFunction={incrementCounter} increment={5}/>
      <Button onClickFunction={incrementCounter} increment={10}/>
      <Button onClickFunction={incrementCounter} increment={100}/>

      <Display message={counter}/>
  </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);