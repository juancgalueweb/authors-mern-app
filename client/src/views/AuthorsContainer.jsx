import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useParams, useHistory, Link } from "react-router-dom";
import { AuthorForm } from "../components/AuthorForm";
import Swal from "sweetalert2";

export const AuthorsContainer = () => {
  const { id } = useParams();
  const startingData = { fullName: "" };
  const [initialData, setInitialData] = useState(startingData);
  const [loaded, setLoaded] = useState(false);
  const history = useHistory();

  //Get author by ID
  const authorById = async () => {
    try {
      const author = await axios.get(`http://localhost:8080/api/author/${id}`);
      console.log("Autor por ID de axios", author.data);
      setInitialData(author.data);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  //Create an author
  const createAuthor = async (values) => {
    console.log("Valores de crear usuario", values);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/author/new",
        values
      );
      console.log("Respuesta de axios al crear", response);
      history.push("/");
    } catch (err) {
      console.log("Error al crear autor", err.response.data.errors);
      Swal.fire({
        title: "Error al crear autor",
        icon: "error",
        showConfirmButton: true,
        text: `${err.response.data.errors.fullName.message}`,
      });
    }
  };

  //Update author
  const updateAuthor = async (values) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/author/${id}`,
        values
      );
      console.log("Update response", response);
      history.push("/");
    } catch (err) {
      console.log(err.response.data.errors);
      Swal.fire({
        title: "Error al editar autor",
        icon: "error",
        showConfirmButton: true,
        text: `${err.response.data.errors.fullName.message}`,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("ID dentro del useEffect", id);
      if (id) {
        await authorById();
      } else {
        setInitialData(startingData);
        setLoaded(true);
      }
    };
    fetchData();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className="m-3 mx-auto w-50 shadow bg-light">
      <Row>
        <Col>
          <h1>Autores favoritos</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="dark" className="float-start mb-3">
            <Link to="/" className="text-decoration-none text-light">
              Pantalla principal
            </Link>
          </Button>
        </Col>
      </Row>
      {id !== undefined ? (
        <Row>
          <Col>
            <h4>Editar este autor</h4>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <h4>Añadir un nuevo autor</h4>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          {loaded ? (
            <AuthorForm
              processSubmit={id !== undefined ? updateAuthor : createAuthor}
              initialValues={initialData}
            />
          ) : (
            <h1>Revisar...</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};
