import PropTypes from "prop-types";
import styled from "@emotion/styled";
import IconButton from "../../../General/IconButton/IconButton";

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 6px;
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 0.875rem;
  color: rgba(15, 23, 42, 100%);
  background-color: rgba(248, 250, 252, 100%);
  border: 1px solid rgba(203, 213, 225, 100%);
  gap: 6px;
`;

const CustomTableHeader = (props) => {
  //--------------------------

  return (
    <Container>
      <IconButton icon="sync-alt" btnType="tinted" />
      <IconButton icon="archive" btnType="tinted" color="warning" />
      <IconButton icon="ban" btnType="tinted" color="danger" />
    </Container>
  );
};

// TODO : type
// CustomTableHeader.defaultProps = {
//   __TYPE__: "TABLE_HEADER",
// };
CustomTableHeader.propTypes = {
  __TYPE__: PropTypes.string,
};

export default CustomTableHeader;

CustomTableHeader.displayName = "TABLE_HEADER";
