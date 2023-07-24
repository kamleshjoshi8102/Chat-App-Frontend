import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Join from "./Components/Join/Join";
import Chat from "./Components/Chat/Chat";

// import socketIO from 'socket.io-client';

// const ENDPOINT = "http://localhost:4500/";
// const socket = socketIO(ENDPOINT,{transports:['websocket']});

function App() {
  return (
      <Router> 
        <Routes>
          <Route exact path="/" element={<Join/>} />
          <Route path="/chat" element=<Chat/>/>
        </Routes>
      </Router>
  );
}

export default App;
