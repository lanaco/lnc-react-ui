import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { useUpdateEffect } from "react-use";
import { useImperativeHandle } from "react";
import { useRef } from "react";

const StyledDataView = styled.div``;

const DataView = React.forwardRef((props, ref) => {
  const {
    defaultViewType,
    activeViewType,
    //------------------
    className,
    style,
    children,
    ...rest
  } = props;

  const [currentViewType, setCurrentViewType] = useState(
    activeViewType ? activeViewType : defaultViewType
  );
  const viewsHistory = useRef([defaultViewType]);

  //Expose functions through ref
  useImperativeHandle(ref, () => ({
    changeView(nextViewType) {
      changeView(nextViewType);
    },
    goToBackView() {
      goToPreviousView();
    },
  }));

  useUpdateEffect(() => {
    setCurrentViewType(activeViewType);
  }, [activeViewType]);

  const changeView = (nextViewType) => {
    setCurrentViewType(nextViewType);
    viewsHistory.current.push(nextViewType);
  };

  const goToPreviousView = () => {
    viewsHistory.current.pop();
    if(viewsHistory.current?.length > 0) setCurrentViewType(viewsHistory.current[viewsHistory.current.length - 1]);
  }


const clonedChild = React.Children.map(children, (child, index) => {
  if (React.isValidElement(child)) {
    console.log("type", child.props.__TYPE__, currentViewType)
    if (
      (child.props.__TYPE__ == "TABLE_VIEW" ||
      child.props.__TYPE__ == "DETAILS_VIEW" ||
      child.props.__TYPE__ == "FORM_VIEW" ||
      child.props.__TYPE__ == "KANBAN_VIEW")
      && child.props.__TYPE__ == currentViewType
    ) {
      return React.cloneElement(child, {
        goToPreviousView: goToPreviousView,
      });
    }
  }
});

  return (
    <StyledDataView {...rest}>
      {clonedChild}
    </StyledDataView>
  );
});

DataView.defaultProps = {
  //-----------------------
  style: {},
  size: "small",
};

DataView.propTypes = {
  defaultViewType: PropTypes.oneOf(["DETAILS_VIEW", "FORM_VIEW", "TABLE_VIEW", "KANBAN_VIEW"]).isRequired,
  activeViewType: PropTypes.oneOf(["DETAILS_VIEW", "FORM_VIEW", "TABLE_VIEW", "KANBAN_VIEW"]),
  //------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
};

export default DataView;