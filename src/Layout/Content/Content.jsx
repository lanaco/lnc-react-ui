/* eslint-disable react/prop-types */
import { forwardRef } from "react";

const Content = forwardRef((props, ref) => {
  const { children, ...rest } = props;

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

export default Content;

Content.displayName = "Content";
