import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import * as yup from "yup";

import css from "./App.module.css";

type Hobbies = "sport" | "music" | "programming" | "reading" | "tourism";

interface Address {
  country: string;
  city: string;
  zip: string;
}

interface FormValues {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: Address;
  birthDate: Date | string;
  sex: "male" | "female" | "other";
  hobbies: Hobbies[];
  about: string;
  isConfirmed: boolean;
}

const initialValues: FormValues = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  address: {
    country: "",
    city: "",
    zip: "",
  },
  birthDate: new Date().toISOString().split("T")[0],
  sex: "male",
  hobbies: [],
  about: "",
  isConfirmed: false,
};

const userSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Ім'я має містити мінімум 2 символи")
    .required("Поле обов'язкове"),
  lastName: yup.string().required("Поле обов'язкове"),
  email: yup
    .string()
    .email("Введіть коректну пошту")
    .required("Поле обов'язкове"),
  phone: yup
    .string()
    .matches(/^\+380\d{9}$/, "Номер має бути у форматі +380XXXXXXXXX")
    .required("Поле обов'язкове"),
  password: yup
    .string()
    .min(8, "Пароль має містити мінімум 8 символів")
    .matches(/\d/, "Пароль має містити мінімум 1 цифру")
    .required("Поле обов'язкове"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Паролі мають співпадати")
    .required("Поле обов'язкове"),
  address: yup.object({
    country: yup.string().required("Поле обов'язкове"),
    city: yup.string().required("Поле обов'язкове"),
    zip: yup
      .string()
      .matches(/^\d+$/, "Поштовий індекс має бути цифровий")
      .required("Поле обов'язкове"),
  }),
  birthDate: yup.date().required("Поле обов'язкове"),
  sex: yup
    .string()
    .oneOf(["male", "female", "other"])
    .required("Поле обов'язкове"),
  hobbies: yup
    .array()
    .min(2, "Оберіть мінімум 2 хобі")
    .required("Поле обов'язкове"),
  about: yup.string().max(300, "Поле не має містити більше 300 символів"),
  isConfirmed: yup.boolean().oneOf([true], "Необхідно прийняти умови"),
});

export const App = () => {
  const handleSubmit = (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>,
  ) => {
    console.log(values);
    formikHelpers.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={userSchema}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className={css.wrapper}>
            <fieldset className={css.section}>
              <legend>Особисті дані</legend>
              <label className={css.label}>
                Ім'я:
                <Field
                  type="text"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                />
              </label>
              <label className={css.label}>
                Прізвище:
                <Field
                  type="text"
                  name="lastName"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                />
              </label>
              <label className={css.label}>
                Електронна пошта:
                <Field
                  type="email"
                  name="email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                />
              </label>
              <label className={css.label}>
                Номер телефону:
                <Field
                  type="text"
                  name="phone"
                  placeholder="+380XXXXXXXXX"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                />
              </label>
            </fieldset>
            <fieldset className={css.section}>
              <legend>Облікові дані</legend>
              <label className={css.label}>
                Пароль:
                <Field
                  type="password"
                  name="password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                />
              </label>
              <label className={css.label}>
                Підтвердіть пароль:
                <Field
                  type="password"
                  name="confirmPassword"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                />
              </label>
            </fieldset>
            <fieldset className={css.section}>
              <legend>Адреса</legend>
              <label className={css.label}>
                Країна:
                <Field
                  type="text"
                  name="address.country"
                />
                <ErrorMessage
                  name="address.country"
                  component="div"
                />
              </label>
              <label className={css.label}>
                Місто:
                <Field
                  type="text"
                  name="address.city"
                />
                <ErrorMessage
                  name="address.city"
                  component="div"
                />
              </label>
              <label className={css.label}>
                Поштовий індекс:
                <Field
                  type="text"
                  name="address.zip"
                />
                <ErrorMessage
                  name="address.zip"
                  component="div"
                />
              </label>
            </fieldset>
            <fieldset className={css.section}>
              <legend>Додаткова інформація</legend>
              <label className={css.label}>
                Дата народження:
                <Field
                  type="date"
                  name="birthDate"
                />
                <ErrorMessage
                  name="birthDate"
                  component="div"
                />
              </label>
              <div className={css.section}>
                <p>Стать: </p>
                <label className={css.label}>
                  <Field
                    type="radio"
                    name="sex"
                    value="male"
                  />
                  Чоловіча
                </label>
                <label className={css.label}>
                  <Field
                    type="radio"
                    name="sex"
                    value="female"
                  />
                  Жіноча
                </label>
                <label className={css.label}>
                  <Field
                    type="radio"
                    name="sex"
                    value="other"
                  />
                  Інше
                </label>
              </div>
              <ErrorMessage
                name="sex"
                component="div"
              />
              <div className={css.section}>
                <p>Хобі: </p>
                <label className={css.label}>
                  <Field
                    type="checkbox"
                    name="hobbies"
                    value="sport"
                  />
                  Спорт
                </label>
                <label className={css.label}>
                  <Field
                    type="checkbox"
                    name="hobbies"
                    value="music"
                  />
                  Музика
                </label>
                <label className={css.label}>
                  <Field
                    type="checkbox"
                    name="hobbies"
                    value="programming"
                  />
                  Програмування
                </label>
                <label className={css.label}>
                  <Field
                    type="checkbox"
                    name="hobbies"
                    value="reading"
                  />
                  Читання
                </label>
                <label className={css.label}>
                  <Field
                    type="checkbox"
                    name="hobbies"
                    value="tourism"
                  />
                  Туризм
                </label>
              </div>
              <ErrorMessage
                name="hobbies"
                component="div"
              />
              <label className={css.label}>
                Про себе:
                <Field
                  as="textarea"
                  name="about"
                  className={css.textarea}
                ></Field>
                <ErrorMessage
                  name="about"
                  component="div"
                />
              </label>
            </fieldset>
            <fieldset>
              <Field
                type="checkbox"
                name="isConfirmed"
                className={css.checkbox}
              />
              Я погоджуюсь з умовами
              <ErrorMessage
                name="isConfirmed"
                component="div"
              />
              <button
                type="submit"
                className={css.confirm_button}
                disabled={!(isValid && dirty)}
              >
                Надіслати
              </button>
            </fieldset>
          </Form>
        );
      }}
    </Formik>
  );
};
