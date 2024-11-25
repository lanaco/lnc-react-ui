/* eslint-disable react/display-name */
import { forwardRef } from "react";
import PropTypes from "prop-types";

const Header = forwardRef((props, ref) => {
  const { children, __TYPE__ = "Header", ...rest } = props;

  return (
    <header ref={ref} {...rest}>
      {children}
    </header>
  );
});

// TODO : type
// Header.defaultProps = {
//   __TYPE__: "Header",
// };

Header.propTypes = {
  /**
   * Do not override this property.
   * Should only be used as indicator for type if you are passing custom component.
   */
  __TYPE__: PropTypes.string,
};

export default Header;

Header.displayName = "Header";
