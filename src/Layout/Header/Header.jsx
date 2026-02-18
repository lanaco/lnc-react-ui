/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { forwardRef } from "react";

const Header = forwardRef((props, ref) => {
  const { children, ...rest } = props;

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

export default Header;

Header.displayName = "Header";
