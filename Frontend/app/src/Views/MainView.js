import React, { useState } from "react";
import { Col, CardHeader, CardBody, CardTitle, CardImg } from "shards-react";
import CollapseBeanInfo from "../Components/BotdCollapse/collapse";
import ArrowPoint from "../Components/Title/ArrowPointer";

export default function MainView() {
  const [DisplayCoffeeInfo, SetDisplayCoffee] = useState(false);

  return (
    <Col>
      <CardHeader className="background-white">
        <h5 className="text-align">Click The Image To View</h5>
        <ArrowPoint></ArrowPoint>
      </CardHeader>
      <CardBody onClick={() => SetDisplayCoffee(!DisplayCoffeeInfo)}>
        <CardImg
          className="title-img"
          src="https://clipartstation.com/wp-content/uploads/2019/11/cup-of-coffee-clipart-transparent-1.jpg"
        />
        <div className="centre-text">
          <h1 className="title-font">The Bean of the Day.</h1>
        </div>
      </CardBody>
      <CardBody>
        <CollapseBeanInfo DisplaySection={DisplayCoffeeInfo}></CollapseBeanInfo>
      </CardBody>
    </Col>
  );
}
