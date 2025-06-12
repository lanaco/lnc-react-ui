import { forwardRef, Fragment } from "react";
import { Container, ContainerHeader, ListWrapper } from "./style";
import Button from "../../../General/Button/Button";
import { isDefined } from "../../../_utils/utils";

const BannerSectionWithList = forwardRef((props, ref) => {
  const {
    title,
    subtitle,
    buttonText,
    list,
    fallback = () => {},
    onBannerClick,
  } = props;

  return (
    <Container>
      {(isDefined(title) || isDefined(subtitle)) && (
        <ContainerHeader>
          {isDefined(title) && <div className="header-title">{title}</div>}
          {isDefined(subtitle) && (
            <div className="header-subitle">{subtitle}</div>
          )}
        </ContainerHeader>
      )}
      <ListWrapper>
        {list?.map((x, index) => (
          <Fragment key={index}>
            <div className="list-item">
              <i className="mng mng-lnc-checkmark--filled" />
              <span>{x}</span>
            </div>
          </Fragment>
        ))}
      </ListWrapper>
      <Button
        size="medium"
        color="neutral"
        type="button"
        onClick={() =>
          isDefined(onBannerClick) ? onBannerClick() : fallback()
        }
      >
        {buttonText}
      </Button>
    </Container>
  );
});

export default BannerSectionWithList;
