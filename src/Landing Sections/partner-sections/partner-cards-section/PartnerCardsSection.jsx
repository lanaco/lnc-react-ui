import { forwardRef, useState } from "react";

import Icon from "../../../General/Icon/Icon";
import Popover from "../../../Utility/Popover/Popover";
import PopoverTrigger from "../../../Utility/Popover/PopoverTrigger";
import PopoverContent from "../../../Utility/Popover/PopoverContent";
import { Container, PopoverContainer } from "./style";

const PartnerCardsSection = forwardRef(
  ({ icon, title, description, items, onSelectCard = () => {} }, ref) => {
    const [open, setOpen] = useState(null);

    const handleOpenPopover = (idx) => {
      setOpen(idx);
    };

    const handleClosePopover = () => {
      setOpen(null);
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
            {items?.map((item, idx) => (
              <Popover
                key={`partner-cards-section-item__${idx + 1}`}
                open={idx === open}
                placement="top-end"
                offsetValue={4}
              >
                <PopoverTrigger className="section__trigger">
                  <div
                    className="section__item"
                    onMouseEnter={() => {
                      handleOpenPopover(idx);
                    }}
                    onMouseLeave={handleClosePopover}
                    onClick={() => {
                      onSelectCard(item);
                    }}
                  >
                    <img
                      src={item?.imageUrl}
                      alt={`Partner card image ${idx + 1}`}
                      loading="lazy"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent style={{ padding: 0, borderRadius: 12 }}>
                  <PopoverContainer>{description}</PopoverContainer>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        )}
      </Container>
    );
  },
);

export default PartnerCardsSection;
