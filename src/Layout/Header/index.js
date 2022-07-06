import React from "react";
import PropTypes from "prop-types";

const Header = React.forwardRef((props, ref) => {
  const { children, __TYPE__, ...rest } = props;

  return (
    <header ref={ref} {...rest}>
      {children}
    </header>
  );
});

Header.defaultProps = {
  __TYPE__: "Header",
};

Header.propTypes = {
  /**
   * Do not override this property.
   * Should only be used as indicator for type if you are passing custom component.
   */
  __TYPE__: PropTypes.string,
};

export default Header;
