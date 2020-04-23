import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  ListGroup,
  ListGroupItem,
  CardImg,
} from "shards-react";

export default function BeanCard({ currentBean }) {
  return (
    <Card>
      <CardHeader className="background-white text-align">
        <h5>Bean Name: {currentBean.name}</h5>
      </CardHeader>
      <CardImg className="title-img" src={currentBean.image} />
      <CardBody>
        <ListGroup>
          <ListGroupItem>
            <b>Colour:</b> {currentBean.colour}
          </ListGroupItem>
          <ListGroupItem>
            <b>Price:</b> £{currentBean.price} / per 100g
          </ListGroupItem>
          <ListGroupItem>
            <b>Aroma:</b> {currentBean.aroma}
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
  );
}
