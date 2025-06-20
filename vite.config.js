/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react/jsx-runtime"],
    },
    lib: {
      entry: [
        resolve(__dirname, "src/index.jsx"),
        //--------------------------------------------------------------------
        resolve(__dirname, "src/Basic Inputs/CheckBoxInput/CheckBoxInput.jsx"),
        resolve(__dirname, "src/Basic Inputs/ColorInput/ColorInput.jsx"),
        resolve(__dirname, "src/Basic Inputs/DateInput/DateInput.jsx"),
        resolve(__dirname, "src/Basic Inputs/DecimalInput/DecimalInput.jsx"),
        resolve(
          __dirname,
          "src/Basic Inputs/DecimalInputV2/DecimalInputV2.jsx"
        ),
        resolve(__dirname, "src/Basic Inputs/FileInput/FileInput.jsx"),
        resolve(__dirname, "src/Basic Inputs/NumberInput/NumberInput.jsx"),
        resolve(__dirname, "src/Basic Inputs/PasswordInput/PasswordInput.jsx"),
        resolve(__dirname, "src/Basic Inputs/RadioInput/RadioInput.jsx"),
        resolve(__dirname, "src/Basic Inputs/RangeSlider/RangeSlider.jsx"),
        resolve(__dirname, "src/Basic Inputs/TextAreaInput/TextAreaInput.jsx"),
        resolve(__dirname, "src/Basic Inputs/TextInput/TextInput.jsx"),
        resolve(__dirname, "src/Basic Inputs/TimeInput/TimeInput.jsx"),
        //--------------------------------------------------------------------
        resolve(__dirname, "src/Data display/Badge/Badge.jsx"),
        resolve(__dirname, "src/Data display/Chip/Chip.jsx"),
        resolve(__dirname, "src/Data display/DataView/DataView.jsx"),
        resolve(__dirname, "src/Data display/DetailsView/DetailsView.jsx"),
        resolve(__dirname, "src/Data display/EditableTable/EditableTable.jsx"),
        resolve(__dirname, "src/Data display/FormView/FormView.jsx"),
        resolve(__dirname, "src/Data display/Kanban/Kanban.jsx"),
        resolve(
          __dirname,
          "src/Data display/Kanban/components/KanbanCard/KanbanCard.jsx"
        ),
        resolve(
          __dirname,
          "src/Data display/Kanban/components/KanbanHeader/KanbanHeader.jsx"
        ),
        resolve(
          __dirname,
          "src/Data display/Kanban/components/KanbanFooter/KanbanFooter.jsx"
        ),
        resolve(__dirname, "src/Data display/KanbanView/KanbanView.jsx"),
        resolve(
          __dirname,
          "src/Data display/KanbanView/KanbanActionsToolbar.jsx"
        ),
        resolve(__dirname, "src/Data display/Table/Table.jsx"),
        resolve(__dirname, "src/Data display/TableView/TableView.jsx"),
        resolve(__dirname, "src/Data display/TableView/ActionsToolbar.jsx"),
        //--------------------------------------------------------------------
        resolve(__dirname, "src/Feedback/Alert/Alert.jsx"),
        resolve(__dirname, "src/Feedback/Notification/Notification.jsx"),
        resolve(
          __dirname,
          "src/Feedback/Notification/NotificationContainer.jsx"
        ),
        resolve(__dirname, "src/Feedback/Notification/NotificationMessage.jsx"),
        resolve(__dirname, "src/Feedback/ProgressBar/ProgressBar.jsx"),
        resolve(__dirname, "src/Feedback/Spinner/Spinner.jsx"),
        //--------------------------------------------------------------------
        resolve(__dirname, "src/General/Avatar/Avatar.jsx"),
        resolve(__dirname, "src/General/Button/Button.jsx"),
        resolve(__dirname, "src/General/Icon/Icon.jsx"),
        resolve(__dirname, "src/General/IconButton/IconButton.jsx"),
        resolve(__dirname, "src/General/Link/Link.jsx"),
        resolve(__dirname, "src/General/Surface/Surface.jsx"),
        resolve(__dirname, "src/General/UploadedFile/UploadedFile.jsx"),
        //--------------------------------------------------------------------
        resolve(
          __dirname,
          "src/Inputs/DoubleRangeSlider/DoubleRangeSlider.jsx"
        ),
        resolve(__dirname, "src/Inputs/DragAndDropFile/DragAndDropFile.jsx"),
        resolve(__dirname, "src/Inputs/DragDropFiles/DragDropFiles.jsx"),
        resolve(__dirname, "src/Inputs/Dropdown/Dropdown.jsx"),
        resolve(__dirname, "src/Inputs/DropdownLookup/DropdownLookup.jsx"),
        resolve(
          __dirname,
          "src/Inputs/MultiSelectDropdown/MultiSelectDropdown.jsx"
        ),
        resolve(
          __dirname,
          "src/Inputs/MultiSelectDropdownLookup/MultiSelectDropdownLookup.jsx"
        ),
        resolve(__dirname, "src/Inputs/RadioGroup/RadioGroup.jsx"),
        resolve(__dirname, "src/Inputs/SearchBar/SearchBar.jsx"),
        resolve(__dirname, "src/Inputs/Toggle/Toggle.jsx"),
        //--------------------------------------------------------------------
        resolve(__dirname, "src/Layout/Button Group/ButtonGroup.jsx"),
        resolve(__dirname, "src/Layout/Content/Content.jsx"),
        resolve(__dirname, "src/Layout/FlexBox/FlexBox.jsx"),
        resolve(__dirname, "src/Layout/FlexGrid/FlexGrid.jsx"),
        resolve(__dirname, "src/Layout/FlexGrid/FlexGridItem.jsx"),
        resolve(__dirname, "src/Layout/Footer/Footer.jsx"),
        resolve(__dirname, "src/Layout/FormField/FormField.jsx"),
        resolve(__dirname, "src/Layout/Grid/Grid.jsx"),
        resolve(__dirname, "src/Layout/GridItem/GridItem.jsx"),
        resolve(__dirname, "src/Layout/Header/Header.jsx"),
        resolve(__dirname, "src/Layout/PageLayout/PageLayout.jsx"),
        resolve(__dirname, "src/Layout/Sidebar/Sidebar.jsx"),
        resolve(__dirname, "src/Layout/Tabs/Tabs.jsx"),
        resolve(__dirname, "src/Layout/Tabs/TabItem.jsx"),
        //-------------------------------------------------------------------
        resolve(__dirname, "src/Utility/Accordion/Accordion.jsx"),
        resolve(__dirname, "src/Utility/Accordion/AccordionSummary.jsx"),
        resolve(__dirname, "src/Utility/Accordion/AccordionDetails.jsx"),
        resolve(__dirname, "src/Utility/Breadcrumbs/Breadcrumbs.jsx"),
        resolve(__dirname, "src/Utility/ConfirmationForm/ConfirmationForm.jsx"),
        resolve(__dirname, "src/Utility/Drawer/Drawer.jsx"),
        resolve(__dirname, "src/Utility/DropdownMenu/DropdownMenu.jsx"),
        resolve(__dirname, "src/Utility/DropdownMenu/DropdownItem.jsx"),
        resolve(__dirname, "src/Utility/DropdownMenu/NestedDropdownItem.jsx"),
        resolve(__dirname, "src/Utility/DropdownMenu/Separator.jsx"),
        resolve(__dirname, "src/Utility/Modal/Modal.jsx"),
        resolve(__dirname, "src/Utility/SwipeableDrawer/SwipeableDrawer.jsx"),
        resolve(__dirname, "src/Utility/TreeMenu/TreeMenu.jsx"),
        resolve(__dirname, "src/Utility/TreeMenu/MenuItem.jsx"),
        resolve(__dirname, "src/Utility/TreeMenu/NestedMenuItem.jsx"),
        resolve(__dirname, "src/Utility/TreeMenu/TreeMenuSeparator.jsx"),
        resolve(__dirname, "src/Utility/Popover/Popover.jsx"),
        resolve(__dirname, "src/Utility/Popover/PopoverClose.jsx"),
        resolve(__dirname, "src/Utility/Popover/PopoverContent.jsx"),
        resolve(__dirname, "src/Utility/Popover/PopoverContext.jsx"),
        resolve(__dirname, "src/Utility/Popover/PopoverDescription.jsx"),
        resolve(__dirname, "src/Utility/Popover/PopoverHeading.jsx"),
        resolve(__dirname, "src/Utility/Popover/PopoverTrigger.jsx"),
        resolve(__dirname, "src/Utility/Popover/usePopover.jsx"),
        resolve(__dirname, "src/Utility/Pagination/Pagination.jsx"),
        //--------------------------------------------------------------------
        resolve(__dirname, "src/ThemeProvider/ThemeProvider.jsx"),
        //--------------------------------------------------------------------
        resolve(
          __dirname,
          "src/Landing Sections/general-sections/masonry-general-cards-section/MasonryGeneralCardsSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/products-sections/detailed-products-section/DetailedProductsSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/products-sections/products-with-banner-section/ProductsWithBannerSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/products-sections/simple-products-section/SimpleProductsSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/products-sections/urgent-sale-products-section/UrgentSaleProductsSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/blogs-sections/blogs-section-detailed/BlogsSectionDetailed.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/blogs-sections/blogs-section-large/BlogsSectionLarge.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/blogs-sections/blogs-section-simple/BlogsSectionSimple.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/blogs-sections/blogs-section-simple-centered/BlogsSectionSimpleCentered.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/blogs-sections/blogs-section-with-filters/BlogsSectionWithFilters.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/custom-sections/custom-loan-map-section/CustomLoanMapSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/simple-categories-section/SimpleCategoriesSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/banners-sections/banner-section-basic/BannerSectionBasic.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/banners-sections/banner-section-carousel/BannerSectionCarousel.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/banners-sections/banner-section-grid/BannerSectionGrid.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/banners-sections/banner-section-simple/BannerSectionSimple.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/banners-sections/banner-section-with-list/BannerSectionWithList.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/banners-sections/banner-section-with-list-image/BannerSectionWithListImage.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/gift-sections/gift-cards-section/GiftCardsSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/brand-sections/brand-hits-section/BrandHitsSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/field-of-interests-sections/field-of-interests-masonry-section/FieldOfInterestsMasonrySection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/field-of-interests-sections/field-of-interests-with-avatars-cards-section/FieldOfInterestsWithAvatarsCardsSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/field-of-interests-sections/field-of-interests-with-tags-cards-section/FieldOfInterestsWithTagsCardsSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/general-sections/general-with-tags-cards-section/GeneralWithTagsCardsSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/general-sections/overlay-general-cards-section/OverlayGeneralCardsSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/shop-sections/shop-cards-section/ShopCardsSection.jsx"
        ),
<<<<<<< Updated upstream
        resolve(
          __dirname,
          "src/Landing Sections/questionaire-sections/quiz-section/QuizSection.jsx"
=======
         resolve(
          __dirname,
          "src/Landing Sections/locations-sections/locations-search-section/LocationSearchSection.jsx"
        ),
        resolve(
          __dirname,
          "src/Landing Sections/campaigns-sections/sales-campaign-section/SalesCampaignSection.jsx"
        ),
         resolve(
          __dirname,
          "src/Landing Sections/custom-sections/calorie-calculator-section/CalorieCalculatorSection.jsx"
>>>>>>> Stashed changes
        ),
      ],
      name: "@lanaco/lnc-react-ui",
      fileName: (format, name) => {
        if (format === "es") {
          return `${name}.js`;
        }

        return `${name}.${format}`;
      },
    },
  },
});
