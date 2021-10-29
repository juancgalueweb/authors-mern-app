import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

export const AuthorForm = ({ processSubmit, initialValues }) => {
  const formSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(3, "Longitud mínima de 3 caracteres")
      .required("Nombre del autor es requerido"),
  });

  const history = useHistory();

  const returnHome = () => {
    history.push("/");
  };

  console.log("Valores iniciales del AuthorForm", initialValues);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={processSubmit}
    >
      {({ errors, touched, values, handleChange, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="fullName"
              placeholder="Ingrese un autor..."
              value={values?.fullName}
              onChange={handleChange}
              isValid={touched.fullName && !errors.fullName}
              isInvalid={!!errors.fullName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.fullName}
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit" className="mx-2">
            Submit
          </Button>
          <Button
            variant="dark"
            type="button"
            className="mx-2"
            onClick={returnHome}
          >
            Cancel
          </Button>
        </Form>
      )}
    </Formik>
  );
};
