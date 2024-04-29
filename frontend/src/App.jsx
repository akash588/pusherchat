
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from "./components/LoginPage";
import ChannelList from "./components/ChannelList"
import Card from "./components/Chat"
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'; 

function App() {
  const navigate = useNavigate();
  const [userinfo, setUserinfo] = useState(null);

  const onLogin = (userName) => {



    setUserinfo({ id: Date.now().toString(), userName });
    navigate(`/channels`);

  };

  return (
    <ErrorBoundary>
    <div className="App" style={{backgroundColor: '#E6DCF9'}}>
      <Routes>
        <Route path='/' element={<LoginPage onLogin={onLogin} />} />
        <Route path='/test' element={<Card />} />

        <Route path='/channels' element={<ChannelList />} />
        <Route path='/:channelName' element={<Card userinfo={userinfo} />} />
      </Routes>
    </div>
    </ErrorBoundary>
  );
}

export default App;
