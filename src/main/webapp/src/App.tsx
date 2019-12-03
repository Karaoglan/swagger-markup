import React from 'react';
import logo from './logo.svg';
import './App.css';

const App: React.FC = () => {

  let resp : any;

  async function callExpress() {
    try {
      const response = await fetch('/api/climates')
          .then(res => resp = res);
      alert('Hi this is a response from the backend: ' + JSON.stringify(resp));
    } catch (err) {
      alert(err);
    }
  }

  callExpress();

  return (
    <div className="App">
      {JSON.stringify(resp)}
    </div>
  );
}

export default App;
