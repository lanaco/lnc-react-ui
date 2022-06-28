import React from "react";
import PropTypes from "prop-types";

const Content = (props) => {
  const { children, __TYPE__, ...rest } = props;

  return <main {...rest}>{children}</main>;
};

Content.defaultProps = {
  __TYPE__: "Content",
};

Content.propTypes = {
  /**
   * Do not override this property. 
   * Should only be used as indicator for type if you are passing custom component.
   */
  __TYPE__: PropTypes.string,
};

export default Content;
