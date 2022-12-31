import './App.css';
import Nav from './components/Nav/Nav';
import SelectorForm from './components/Selector/SelectorForm';
import UserInfo from './components/UserInfo/UserInfo';



function App() {
  return (
    <div className="App">
      <h2>Selector Form</h2>
      <Nav></Nav>
      <SelectorForm></SelectorForm> 
      <UserInfo></UserInfo>
     
    </div>
  );
}

export default App;
