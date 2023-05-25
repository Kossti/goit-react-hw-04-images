// import React from 'react';
import React, { Component } from 'react';
import { CiSearch } from 'react-icons/ci';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      return alert('enter a name for the image');
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: ' ' });
    this.reset();
  };

  reset = () => {
    this.setState({
      searchQuery: '',
    });
  };

  render() {
    return (
      <header className={css.searchBar}>
        <form onSubmit={this.handleSubmit} className={css.searchForm}>
          <button type="submit" className={css.searchFormButton}>
            <span className={css.searchFormButtonLable}>
              <CiSearch size={20} />
            </span>
          </button>

          <input
            className={css.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.searchQuery}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
