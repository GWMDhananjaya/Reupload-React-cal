import { ACTIONS } from "./App";
import PropTypes from 'prop-types';

function DigitButton({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}

// PropTypes validation
DigitButton.propTypes = {
  dispatch: PropTypes.func.isRequired,
  digit: PropTypes.string.isRequired, // or PropTypes.oneOfType([PropTypes.string, PropTypes.number]) if `digit` can be a number
};

export default DigitButton;
