import React, { Component } from "react";
import CardList from "../components/CardList";
import Errorboundary from "../components/Errorboundary";
import Scroll from "../components/Scroll";
import SearchBar from "../components/SearchBar";


class App extends Component {
    constructor() {
        super()
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => { this.setState({ robots: users }) });
    }


    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })

    }
    render() {
        const filterRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        if (this.state.robots.length === 0) {
            return <h1> Loading </h1>
        } else {
            return (
                <div className="tc">
                    <h1> RoboFriend </h1>
                    <SearchBar searchChange={this.onSearchChange} />
                    <Scroll>
                        <Errorboundary>
                            <CardList robots={filterRobots} />
                        </Errorboundary>
                    </Scroll>
                </div>
            );
        }
    }
}
export default App