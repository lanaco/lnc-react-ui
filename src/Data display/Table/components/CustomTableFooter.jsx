import PropTypes from "prop-types";
import styled from "@emotion/styled";
import IconButton from "../../../General/IconButton/IconButton";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
  border-radius: 8px;
  padding: 6px;
  margin-top: 12px;
  font-weight: 700;
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 100%);
  background-color: rgba(248, 250, 252, 100%);
  border: 1px solid rgba(203, 213, 225, 100%);
  gap: 6px;
`;

const CustomTableFooter = () => {
  //--------------------------
  return (
    <Container>
      <IconButton icon="save" btnType="tinted" color="secondary" />
      <IconButton icon="info-circle" btnType="tinted" color="information" />
    </Container>
  );
};

// TODO : TYPE
// CustomTableFooter.defaultProps = {
//   __TYPE__: "TABLE_FOOTER",
// };
CustomTableFooter.propTypes = {
  __TYPE__: PropTypes.string,
};

export default CustomTableFooter;

CustomTableFooter.displayName = "TABLE_FOOTER";
