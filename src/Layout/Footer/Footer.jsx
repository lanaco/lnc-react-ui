/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

const Footer = forwardRef((props, ref) => {
  const { children, ...rest } = props;

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

export default Footer;

Footer.displayName = "Footer";
