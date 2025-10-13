import { forwardRef } from "react";
import { Controller, useForm } from "react-hook-form";

import PropTypes from "prop-types";

import CheckBoxInput from "../../Basic Inputs/CheckBoxInput/CheckBoxInput";
import TextInput from "../../Basic Inputs/TextInput/TextInput";
import TextAreaInput from "../../Basic Inputs/TextAreaInput/TextAreaInput";
import Icon from "../../General/Icon/Icon";
import Button from "../../General/Button/Button";
import { Container } from "./style";

const ContactSection = forwardRef(
  (
    {
      title,
      description,
      image,
      phoneText,
      phones = [],
      emailText,
      emails = [],
      fullNamePlaceholderText = "Name Surname",
      emailPlaceholderText = "E-mail",
      subjectPlaceholderText = "Subject",
      messagePlaceholderText = "Message",
      messageMaxLength = 250,
      hasAgrement = false,
      agrementText = "I agree with Privacy policy.",
      submitText = "Submit",
      onSubmit = () => {},
    },
    ref
  ) => {
    const { watch, handleSubmit, control } = useForm();

    const watchMessage = watch("message");

    return (
      <Container ref={ref}>
        <div className="section__card">
          <img src={image} alt="Contact" className="card__image" />
          <div className="card__content">
            {phones?.length > 0 && (
              <div className="card__tile">
                <Icon
                  icon=" mng-lnc-phone--filled"
                  sizeInUnits="1.25rem"
                  className="tile__image"
                />
                <div className="tile__content">
                  <div className="tile__title">{phoneText}</div>
                  <div className="tile__items">
                    {phones?.map((phone, idx) => (
                      <div
                        key={`contanct-section-phone__${idx}`}
                        className="tile__item"
                      >
                        {phone}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {emails?.length > 0 && (
              <div className="card__tile">
                <Icon
                  icon=" mng-lnc-email-filled"
                  sizeInUnits="1.25rem"
                  className="tile__image"
                />
                <div className="tile__content">
                  <div className="tile__title">{emailText}</div>
                  <div className="tile__items">
                    {emails?.map((email, idx) => (
                      <div
                        key={`contanct-section-email__${idx}`}
                        className="tile__item"
                      >
                        {email}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="section__divider" />
        <div className="section__form">
          <div>
            {title && <div className="form__title">{title}</div>}
            {description && (
              <div className="form__description">{description}</div>
            )}
          </div>
          <div>
            <div className="form__fields">
              <div className="form__field">
                <Controller
                  control={control}
                  name="fullName"
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      className="field__text-input"
                      color="neutral"
                      placeholder={fullNamePlaceholderText}
                      debounceTime={200}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      className="field__text-input"
                      color="neutral"
                      placeholder={emailPlaceholderText}
                      debounceTime={200}
                    />
                  )}
                />
              </div>
              <div className="form__field">
                <Controller
                  control={control}
                  name="subject"
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      className="field__text-input"
                      color="neutral"
                      placeholder={subjectPlaceholderText}
                      debounceTime={200}
                    />
                  )}
                />
              </div>
              <div className="form__field">
                <div className="field__wrapper">
                  <Controller
                    control={control}
                    name="message"
                    render={({ field }) => (
                      <TextAreaInput
                        {...field}
                        className="field__text-input text-area"
                        color="neutral"
                        placeholder={messagePlaceholderText}
                        debounceTime={200}
                        minRows={7}
                        maxLength={messageMaxLength}
                      />
                    )}
                  />
                  <div className="field__hint">{`${
                    watchMessage?.length || 0
                  }/${messageMaxLength}`}</div>
                  {hasAgrement && (
                    <Controller
                      control={control}
                      name="agrement"
                      render={({ field }) => (
                        <CheckBoxInput
                          {...field}
                          label={agrementText}
                          size="medium"
                          className="field__checkbox-input"
                        />
                      )}
                    />
                  )}
                </div>
              </div>
              <div className="form__field right">
                <Button text={submitText} onClick={handleSubmit(onSubmit)} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
);

ContactSection.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  phoneText: PropTypes.string,
  phones: PropTypes.array,
  emailText: PropTypes.string,
  emails: PropTypes.array,
  fullNamePlaceholderText: PropTypes.string,
  emailPlaceholderText: PropTypes.string,
  subjectPlaceholderText: PropTypes.string,
  messagePlaceholderText: PropTypes.string,
  messageMaxLength: PropTypes.number,
  hasAgrement: PropTypes.bool,
  agrementText: PropTypes.string,
  submitText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default ContactSection;
