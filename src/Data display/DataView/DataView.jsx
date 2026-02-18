/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import {
  useState,
  forwardRef,
  Children,
  cloneElement,
  isValidElement,
} from "react";
import styled from "@emotion/styled";
import { useUpdateEffect } from "react-use";
import { useImperativeHandle } from "react";
import { useRef } from "react";

const StyledDataView = styled.div``;

const DataView = forwardRef((props, ref) => {
  const {
    defaultViewType,
    activeViewType,
    //------------------
    className = "",
    children,
    ...rest
  } = props;

  const [currentViewType, setCurrentViewType] = useState(
    activeViewType ? activeViewType : defaultViewType,
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
    if (viewsHistory.current?.length > 0)
      setCurrentViewType(viewsHistory.current[viewsHistory.current.length - 1]);
  };

  const clonedChild = Children.map(children, (child) => {
    if (isValidElement(child)) {
      if (
        (child.props.__TYPE__ == "TABLE_VIEW" ||
          child?.type?.displayName === "TABLE_VIEW" ||
          child.props.__TYPE__ == "DETAILS_VIEW" ||
          child?.type?.displayName === "DETAILS_VIEW" ||
          child.props.__TYPE__ == "FORM_VIEW" ||
          child?.type?.displayName === "FORM_VIEW" ||
          child.props.__TYPE__ == "KANBAN_VIEW" ||
          child?.type?.displayName === "KANBAN_VIEW") &&
        (child.props.__TYPE__ == currentViewType ||
          child?.type?.displayName === currentViewType)
      ) {
        return cloneElement(child, {
          goToPreviousView: goToPreviousView,
        });
      }
    }
  });

  return (
    <StyledDataView className={"lnc-ui-dataview " + className} {...rest}>
      {clonedChild}
    </StyledDataView>
  );
});

export default DataView;
