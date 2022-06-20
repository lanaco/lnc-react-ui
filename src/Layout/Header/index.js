import React from 'react'
import PropTypes from "prop-types";

const Header = (props) => {
  const { children, __TYPE__, ...rest } = props;

  return (
    <header {...rest}>
      {children}
    </header>
  )
}

Header.defaultProps = {
  __TYPE__: "Header"
};

Header.propTypes = {
  __TYPE__: PropTypes.string
};

export default Header