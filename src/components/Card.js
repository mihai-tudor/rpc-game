import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlipCard from '@kennethormandy/react-flipcard';
import '@kennethormandy/react-flipcard/dist/Flipcard.css'
import './Card.css';
import rock from '../images/rock.svg';
import paper from '../images/paper.svg';
import scissors from '../images/scissors.svg';
import cardBack from '../images/card-back.svg';

const getRoundClass = (wonState) => {
  if (wonState === null) {
    return 'box is-paddingless has-background-warning';
  }
  if (wonState) {
    return 'box is-paddingless has-background-success';
  }
  return 'box is-paddingless has-background-danger';
};

const getCardImageSrc = (cardNumber) => {
  switch (cardNumber) {
    case 0: return rock;
    case 1: return paper;
    default: return scissors;
  }
};

const getCardName = (cardNumber) => {
  switch (cardNumber) {
    case 0: return 'rock';
    case 1: return 'paper';
    default: return 'scissors';
  }
};

const CardImage = ({ cardNumber, won }) => (
  <div className={getRoundClass(won)}>
    <img src={getCardImageSrc(cardNumber)} alt={getCardName(cardNumber)} />
  </div>
);

CardImage.propTypes = {
  cardNumber: PropTypes.number.isRequired,
  won: PropTypes.bool
};

CardImage.defaultProps = {
  won: null
};

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFlipped: false
    }
  }

  componentDidMount() {
    if (this.props.turnCard && this.props.playing) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.setState({
            isFlipped: true
          });
        });
      });
    } else {
      this.setState({ // eslint-disable-line react/no-did-mount-set-state
        isFlipped: this.props.turnCard
      });
    }
  }

  render() {
    const { cardNumber, won } = this.props;
    return (
      <div className="tile is-child has-text-centered" role="presentation">
        <FlipCard flipped={this.state.isFlipped} type="horizontal">
          <div className="box has-background-light">
            <img src={cardBack} width="155" height="155" alt="hidden card" />
          </div>
          <CardImage cardNumber={cardNumber} won={won} />
        </FlipCard>
      </div>
    );
  }
}

Card.propTypes = {
  cardNumber: PropTypes.number.isRequired,
  won: PropTypes.bool,
  turnCard: PropTypes.bool,
  playing: PropTypes.bool.isRequired
};

Card.defaultProps = {
  won: null,
  turnCard: false
};

export default Card;
