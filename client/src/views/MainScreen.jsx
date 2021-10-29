import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Link } from "react-router-dom";

export const MainScreen = () => {
  const [authors, setAuthors] = useState([]);
  const [loaded, setLoaded] = useState(false);

  //Get authors
  const getAuthors = async () => {
    try {
      const authorsData = await axios.get("http://localhost:8080/api/authors");
      console.log("Get all authors", authorsData);
      setAuthors(authorsData.data);
      setLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAuthor = async (authorId) => {
    try {
      await axios.delete(`http://localhost:8080/api/author/delete/${authorId}`);
      setAuthors(authors.filter((author) => author._id !== authorId));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAuthors();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className="my-3 mx-auto shadow rounded w-50 bg-light">
      <Row>
        <Col>
          <h1>Artistas favoritos</h1>
          <Button variant="primary" className="my-2 float-start">
            <Link to={"/new"} className="text-decoration-none text-light">
              Agregar un autor
            </Link>
          </Button>
          <Table striped bordered hover>
            <thead>
              <tr className="text-center">
                <th>Autores</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loaded && authors.length === 0 ? (
                <tr>
                  <td colSpan="2" className="text-center text-uppercase fs-4">
                    No hay autores agregados
                  </td>
                </tr>
              ) : (
                authors.map((author) => (
                  <tr key={author._id}>
                    <td>{author.fullName}</td>
                    <td className="text-center">
                      <Button variant="secondary" className="mx-2">
                        <Link
                          to={`/edit/${author._id}`}
                          className="text-decoration-none text-light"
                        >
                          Editar
                        </Link>
                      </Button>
                      <Button
                        variant="danger"
                        className="mx-2"
                        onClick={() => {
                          deleteAuthor(author._id);
                        }}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
