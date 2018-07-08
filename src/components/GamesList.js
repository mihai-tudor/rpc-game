import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGames } from '../actions/games';

const Game = ({
  id, name, player1, player2
}) => (
  <div>
    <div>Game id: {id}</div>
    <div>Game name: <Link to={{ pathname: `/game/${id}` }}>{name}</Link></div>
    <div>Player 1: {player1}</div>
    <div>Player 2: {player2}</div>
  </div>
);

Game.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  player1: PropTypes.arrayOf(PropTypes.number).isRequired,
  player2: PropTypes.arrayOf(PropTypes.number).isRequired
};

class GamesList extends Component {
  componentDidMount() {
    this.props.fetchGames();
  }

  render() {
    const { games, isLoading, error } = this.props;

    return (
      <div>
        <div>Games</div>
        <div>{ isLoading ? 'Loading games...' : '' }</div>
        {games.map((game) => (<Game
          key={game._id}
          id={game._id}
          name={game.name}
          player1={game.p1}
          player2={game.p2}
        />))}
        <div>{ error }</div>
      </div>
    )
  }
}

GamesList.propTypes = {
  games: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchGames: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired
};

const mapStateToProps = (state) => ({
  games: state.games.games,
  isLoading: state.games.loading,
  error: state.games.error
});

const mapDispatchToProps = {
  fetchGames
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesList);