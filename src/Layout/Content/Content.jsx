/* eslint-disable react/display-name */
import { forwardRef } from "react";
import PropTypes from "prop-types";

const Content = forwardRef((props, ref) => {
  const { children, __TYPE__ = "Content", ...rest } = props;

  return (
    <main ref={ref} {...rest}>
      {children}
    </main>
  );
});

// TODO : type
// Content.defaultProps = {
//   __TYPE__: "Content",
// };

Content.propTypes = {
  /**
   * Do not override this property.
   * Should only be used as indicator for type if you are passing custom component.
   */
  __TYPE__: PropTypes.string,
};

export default Content;

Content.displayName = "Content";
