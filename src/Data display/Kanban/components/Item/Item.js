import React, { useEffect } from "react";
import classNames from "classnames";

// import {Handle, Remove} from './components';

import styles from "./Item.module.css";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { getColorRgbaValue } from "../../../../_utils/utils";

const StyledItem = styled.div`
  font-family: ${(props) => props.theme?.typography?.fontFamily};
  background-color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "KanbanCard",
      props.color ? "primary" : props.color,
      "enabled",
      "background"
    )};
  color: ${(props) =>
    getColorRgbaValue(
      props.theme,
      "KanbanCard",
      props.color ? "primary" : props.color,
      "enabled",
      "text"
    )};
  &:hover .Actions > * {
    opacity: 1 !important;
  }
`;

export const Item = React.memo(
  React.forwardRef(
    (
      {
        cardProps,
        color,
        dragOverlay,
        dragging,
        disabled,
        fadeIn,
        handle,
        handleProps,
        height,
        index,
        listeners,
        onRemove,
        renderItem,
        sorting,
        transition,
        transform,
        value,
        wrapperStyle,
        className,
        style,
        children,
        ...props
      },
      ref
    ) => {
      const theme = useTheme();

      useEffect(() => {
        if (!dragOverlay) {
          return;
        }

        document.body.style.cursor = "grabbing";

        return () => {
          document.body.style.cursor = "";
        };
      }, [dragOverlay]);

      return renderItem ? (
        renderItem({
          dragOverlay: Boolean(dragOverlay),
          dragging: Boolean(dragging),
          sorting: Boolean(sorting),
          index,
          fadeIn: Boolean(fadeIn),
          listeners,
          ref,
          style,
          transform,
          transition,
          value,
        })
      ) : (
        <li
          className={classNames(
            styles.Wrapper,
            fadeIn && styles.fadeIn,
            sorting && styles.sorting,
            dragOverlay && styles.dragOverlay
          )}
          style={{
            ...wrapperStyle,
            transition: [transition, wrapperStyle?.transition]
              .filter(Boolean)
              .join(", "),
            "--translate-x": transform
              ? `${Math.round(transform.x)}px`
              : undefined,
            "--translate-y": transform
              ? `${Math.round(transform.y)}px`
              : undefined,
            "--scale-x": transform?.scaleX ? `${transform.scaleX}` : undefined,
            "--scale-y": transform?.scaleY ? `${transform.scaleY}` : undefined,
            "--index": index,
            "--color": color,
          }}
          ref={ref}
        >
          <StyledItem
            theme={theme}
            color={color}
            className={
              classNames(
                styles.Item,
                dragging && styles.dragging,
                handle && styles.withHandle,
                dragOverlay && styles.dragOverlay,
                disabled && styles.disabled,
                color && styles.color
              ) +
              " " +
              className
            }
            style={cardProps?.style}
            data-cypress="draggable-item"
            {...(!handle ? listeners : undefined)}
            {...props}
            tabIndex={!handle ? 0 : undefined}
          >
            {children}
            <span className={styles.Actions}>
              {/* {onRemove ? (
                <Remove className={styles.Remove} onClick={onRemove} />
              ) : null}
              {handle ? <Handle {...handleProps} {...listeners} /> : null} */}
            </span>
          </StyledItem>
        </li>
      );
    }
  )
);
