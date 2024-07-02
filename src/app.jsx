import './App.css';
import SearchBar from './components/SearchBar';

function App() {
   state = []

  let getProfile
  getProfile = async (e) => {
    const profileName = e.target.elements.profileName.value;
    e.preventDefault();
    const api_call = await fetch("http://localhost:8000/api/developers/");
    const data = await api_call.json();
    console.log(state[0].age);
    this.state = data;
  }
  
  return (

    <div className="App">
      <header className="App-header">
       <h1 className="App-title">Profile Search</h1>
      </header>
      <SearchBar getProfile={getProfile}/>
      { this.state.map((profile) => {
        return <h1>{ profile.age }</h1>
      }) }
    </div>
  );
}

export default App;
