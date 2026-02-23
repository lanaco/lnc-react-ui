import { forwardRef, useRef, useState } from "react";

import Icon from "../../../General/Icon/Icon";
import Button from "../../../General/Button/Button";
import Popover from "../../../Utility/Popover/Popover";
import PopoverTrigger from "../../../Utility/Popover/PopoverTrigger";
import PopoverContent from "../../../Utility/Popover/PopoverContent";
import Drawer from "../../../Utility/Drawer/Drawer";
import useDetectMobile from "../../../_utils/useDetectMobile";
import { Container, PopoverContainer } from "./style";

const PartnerCardsSection = forwardRef(
  (
    {
      icon,
      title,
      description,
      items,
      learnMoreText = "Learn more",
      onSelectCard = () => {},
    },
    ref,
  ) => {
    const isMobile = useDetectMobile();

    const drawerRef = useRef(null);

    const [open, setOpen] = useState(null);
    const [item, setItem] = useState(null);

    const handleOpenPopover = (idx) => {
      setOpen(idx);
    };

    const handleClosePopover = () => {
      setOpen(null);
    };

    const handleOpenDrawer = (item) => {
      setItem(item);

      drawerRef?.current?.open();
    };

    const handleCloseDrawer = () => {
      setItem(null);
    };

    return (
      <Container>
        <div className="section__text">
          {icon && (
            <Icon
              icon={icon}
              sizeInUnits="2.5rem"
              color="warning"
              className="section__icon"
            />
          )}
          {title && (
            <div className="section__title">
              <span>{title}</span>
            </div>
          )}
          {description && (
            <div className="section__description">{description}</div>
          )}
        </div>
        {items && items?.length > 0 && (
          <div className="section__items">
            {isMobile
              ? items?.map((item, idx) => (
                  <div
                    key={`partner-cards-section-item__${idx + 1}`}
                    className="section__item"
                    onClick={() => handleOpenDrawer(item)}
                  >
                    <img
                      src={item?.imageUrl}
                      alt={`Partner card image ${idx + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))
              : items?.map((item, idx) => (
                  <Popover
                    key={`partner-cards-section-item__${idx + 1}`}
                    open={idx === open}
                    placement="top-end"
                    offsetValue={4}
                  >
                    <PopoverTrigger className="section__trigger">
                      <div
                        className="section__item"
                        onMouseEnter={() => handleOpenPopover(idx)}
                        onMouseLeave={handleClosePopover}
                        onClick={() => onSelectCard(item)}
                      >
                        <img
                          src={item?.imageUrl}
                          alt={`Partner card image ${idx + 1}`}
                          loading="lazy"
                        />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent style={{ padding: 0, borderRadius: 12 }}>
                      <PopoverContainer>{item?.description}</PopoverContainer>
                    </PopoverContent>
                  </Popover>
                ))}
          </div>
        )}
        {isMobile && (
          <Drawer
            ref={drawerRef}
            direction="bottom"
            className="section__drawer"
            onClose={handleCloseDrawer}
          >
            <img
              src={item?.imageUrl}
              alt="Drawer image"
              className="drawer__image"
              loading="lazy"
            />
            <div className="drawer__content">
              <div className="drawer__description">{item?.description}</div>
              <Button
                text={learnMoreText}
                btnType="outline"
                borderRadius="curved"
                trailingIcon="fa-light fa-up-right-from-square fa-xs"
                color="neutral"
                className="drawer__action"
                onClick={() => onSelectCard(item)}
              />
            </div>
          </Drawer>
        )}
      </Container>
    );
  },
);

export default PartnerCardsSection;
