import React from 'react'
import PropTypes from "prop-types";

const Footer = (props) => {
  const { children, __TYPE__, ...rest } = props;

  return (
    <footer {...rest}>
      {children}
    </footer>
  )
}

Footer.defaultProps = {
  __TYPE__: "Footer"
};

Footer.propTypes = {
  __TYPE__: PropTypes.string
};

export default Footer