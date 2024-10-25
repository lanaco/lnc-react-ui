import React from "react";
import PropTypes from "prop-types";

const Footer = React.forwardRef((props, ref) => {
  const { children, __TYPE__ = "Footer", ...rest } = props;

  return (
    <footer ref={ref} {...rest}>
      {children}
    </footer>
  );
});

// TODO : type
// Footer.defaultProps = {
//   __TYPE__: "Footer",
// };

Footer.propTypes = {
  /**
   * Do not override this property.
   * Should only be used as indicator for type if you are passing custom component.
   */
  __TYPE__: PropTypes.string,
};

export default Footer;

Footer.displayName = 'Footer';