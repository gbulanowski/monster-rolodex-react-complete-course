import { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users").then((respose) =>
      respose.json().then((users) => this.setState(() => ({ monsters: users })))
    );
  }

  onSearchChange = (event) => {
    const searchField = event.target.value.toLowerCase();
    return this.setState(() => ({ searchField }));
  };

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    return (
      <div className="App">
        <h1 className="app-title">MonstersRolodex</h1>
        <SearchBox
          className="mosters-search-box"
          onChangeHandler={onSearchChange}
          placeholder="search for monsters"
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
