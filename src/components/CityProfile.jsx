import React, { useState, useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Figure from "react-bootstrap/Figure";
import { useLocation } from "react-router-dom";
import { getDailyForecast } from "../api";
import Loading from "./Loading";

const CityProfile = () => {
  const [cityData, setCityData] = useState([]);
  let { state } = useLocation();
  console.log(state.weatherObj, state.metaLocation);

  const cityPrepData = async () => {
    try {
      const cityInfo = await getDailyForecast(state.metaLocation);
      console.log(cityInfo.forecast, 'lets see')
      setCityData(cityInfo.forecast)
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    cityPrepData();
    console.log(cityData, "please no undefined");
  }, [state.metaLocation]);

  return cityData.length > 0 ? (
    <>
      <Figure>
        <Figure.Image
          width={171}
          height={180}
          alt="171x180"
          src={`./images/${state.weatherObj.symbol}.png`}
        />
        <Figure.Caption>
          Nulla vitae elit libero, a pharetra augue mollis interdum.
        </Figure.Caption>
      </Figure>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <Container>
              <Row>
                <Col>1 of 3</Col>
                <Col>2 of 3</Col>
                <Col>3 of 3</Col>
              </Row>
            </Container>
          </Accordion.Header>
          <Accordion.Body>
            <Container fluid>
              <Row>
                <Col>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body className="testMe">
                      <Card.Title>Card Title</Card.Title>
                      <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col>
                  <Row>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                  </Row>
                  <Row>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                  </Row>
                  <Row>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>Hi</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  ) : (
    <Loading />
  );
};

export default CityProfile;
