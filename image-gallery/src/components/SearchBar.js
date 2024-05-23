import React, { Component } from 'react';

class SearchBar extends Component {
    handleInputChange = (event) => {
        this.props.onSearch(event.target.value);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.props.query.trim() !== '') {
            this.props.onSearch(this.props.query);
        }
    }

    handleClear = () => {
        this.props.onSearch('');
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    placeholder="Search for images..."
                    value={this.props.query}
                    onChange={this.handleInputChange}
                    autoFocus
                    autoComplete="off"
                />
                <button type="button" onClick={this.handleClear}>Clear</button>
            </form>
        );
    }
}

export default SearchBar;
