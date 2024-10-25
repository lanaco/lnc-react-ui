import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import FlexGrid from "../../Layout/FlexGrid";
import FlexGridItem from "../../Layout/FlexGrid/FlexGridItem";
import Label from "../../General/Label";
import Button from "../../General/Button";
import IconButton from "../../General/IconButton";
import {
  getBorderRadiusValueWithUnits,
  getColorRgbaValue,
  getComponentPropValue,
} from "../../_utils/utils";
import { useTheme } from "@emotion/react";

const StyledToolbar = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledDetailsView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: ${(props) =>
    getComponentPropValue(
      props.theme,
      "Popover",
      props.color,
      "enabled",
      "boxShadow"
    )};
  border-radius: ${(props) =>
    getBorderRadiusValueWithUnits(props.theme, props.borderRadius)};
  border-top: 1px solid rgba(0, 0, 0, 0.04);
  padding: 12px;
  background-color: ${(props) =>
    getColorRgbaValue(props.theme, "Popover", "default", "enabled", "bg")};
`;

const DetailsView = React.forwardRef((props, ref) => {
  const {
    __TYPE__ = "DETAILS_VIEW",
    goToPreviousView,
    id,
    data = {},
    fields = {},
    flexGridProps,
    goBackText = "Go back",
    showBack = true,
    showNext = true,
    showPrevious = true,
    showEdit = true,
    disableGoBack = false,
    disableNext = false,
    disablePrevious = false,
    disableEdit = false,
    editOnTop = false,
    //------------------
    goToNext = () => {},
    goToPrevious = () => {},
    onEdit = () => {},
    goBack = () => {},
    //------------------
    className = "",
    style = {},
    color = "primary",
    size = "small",
    children,
    ...rest
  } = props;

  const theme = useTheme();

  const handleGoBack = (e, data) => {
    if (goToPreviousView) goToPreviousView();

    goBack(e, data);
  };

  const renderChildren = () => {
    return (
      <>
        {children || (
          <FlexGrid spacing={10} {...flexGridProps}>
            {fields.map((item, i) => (
              <FlexGridItem key={i} {...item}>
                <Label key={i} color={color} size={size}>
                  {item.label}:
                </Label>
                {data[item.accessor]}
              </FlexGridItem>
            ))}
          </FlexGrid>
        )}
      </>
    );
  };

  return (
    <StyledDetailsView
      ref={ref}
      theme={theme}
      color={color}
      borderRadius="regular"
      {...rest}
    >
      <StyledToolbar>
        {showBack && (
          <Button
            key={0}
            leadingIcon={"arrow-circle-left"}
            text={goBackText}
            btnType={"outline"}
            style={{ width: "fit-content" }}
            onClick={(e) => handleGoBack(e, data)}
            disabled={disableGoBack}
            color={color}
            size={size}
          />
        )}
        {showEdit && editOnTop && (
          <IconButton
            btnType="outline"
            icon="pen"
            disabled={disableEdit}
            onClick={(e) => onEdit(data, e)}
            color={color}
            size={size}
          />
        )}
      </StyledToolbar>
      {renderChildren()}
      <StyledToolbar>
        <div>
          {showNext && (
            <>
              <IconButton
                btnType="outline"
                icon="angle-left"
                disabled={disablePrevious}
                onClick={(e) => goToPrevious(data, e)}
                color={color}
                size={size}
              />
              &nbsp;&nbsp;
            </>
          )}
          {showPrevious && (
            <IconButton
              btnType="outline"
              icon="angle-right"
              disabled={disableNext}
              onClick={(e) => goToNext(data, e)}
              color={color}
              size={size}
            />
          )}
        </div>
        {showEdit && !editOnTop && (
          <IconButton
            btnType="outline"
            icon="pen"
            disabled={disableEdit}
            onClick={(e) => onEdit(data, e)}
            color={color}
            size={size}
          />
        )}
      </StyledToolbar>
    </StyledDetailsView>
  );
});

// TODO : TYPE
// DetailsView.defaultProps = {
//   __TYPE__: "DETAILS_VIEW",
//   goBackText: "Go Back",
//   showBack: true,
//   showNext: true,
//   showPrevious: true,
//   showEdit: true,
//   disableGoBack: false,
//   disableNext: false,
//   disablePrevious: false,
//   disableEdit: false,
//   fields: {},
//   data: {},
//   editOnTop: false,
//   //-----------------------
//   goToNext: () => {},
//   goToPrevious: () => {},
//   goBack: () => {},
//   onEdit: () => {},
//   //-----------------------
//   color: "primary",
//   style: {},
//   size: "small",
// };

DetailsView.propTypes = {
  __TYPE__: PropTypes.string,
  goBackText: PropTypes.string,
  fields: PropTypes.array,
  data: PropTypes.object,
  showBack: PropTypes.bool,
  showNext: PropTypes.bool,
  showPrevious: PropTypes.bool,
  showEdit: PropTypes.bool,
  disableGoBack: PropTypes.bool,
  disableNext: PropTypes.bool,
  disablePrevious: PropTypes.bool,
  disableEdit: PropTypes.bool,
  flexGridProps: PropTypes.any,
  editOnTop: PropTypes.bool,
  //-----------------------------------------------------------
  goToNext: PropTypes.func,
  goToPrevious: PropTypes.func,
  onEdit: PropTypes.func,
  goBack: PropTypes.func,
  //------------------------------------------------------------
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "warning",
    "danger",
    "information",
    "neutral",
    "gray",
  ]),
  size: PropTypes.oneOf(["small", "medium", "large"]),
};

export default DetailsView;

DetailsView.displayName = "DETAILS_VIEW";
