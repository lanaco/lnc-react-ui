import React from 'react'
import PropTypes from "prop-types";

const Content = (props) => {
  const { children, __TYPE__, ...rest } = props;

  return (
    <main {...rest}>
      {children}
    </main>
  )
}

Content.defaultProps = {
  __TYPE__: "Content"
};

Content.propTypes = {
  __TYPE__: PropTypes.string
};

export default Content