import React, { useEffect, useState } from "react";
import { Col, Collapse, Card } from "shards-react";
import BeanCard from "../BeanDisplayCard/BeanCard";
import { GetBotdApiFunctions } from "../../functions/GetBotdApiFunctions";
import { DatePickerInput } from "rc-datepicker";
import "moment/locale/fr.js";
import "rc-datepicker/lib/style.css";

export default function BotdCollapse({ DisplaySection }) {
  const [currentBean, setCurrentBean] = useState();
  const [requestedDate, setRequestedDate] = useState("");
  useEffect(() => {
    const LoadBotd = async () => {
      let BotdResponse;
      if (
        DisplaySection.isAdmin &&
        requestedDate &&
        requestedDate.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)
      ) {
        BotdResponse = await new GetBotdApiFunctions().GetBotdInfo(
          `http://localhost:3000/inventory?date=${requestedDate}&key=ThisIsTheRequiredKey`
        );
      } else if (DisplaySection.isAdmin === false && requestedDate) {
        setCurrentBean();
        BotdResponse = await new GetBotdApiFunctions().GetBotdInfo(
          "http://localhost:3000/inventory"
        );
      } else {
        BotdResponse = await new GetBotdApiFunctions().GetBotdInfo(
          "http://localhost:3000/inventory"
        );
      }

      if (BotdResponse.isSuccess) {
        setCurrentBean(JSON.parse(BotdResponse.body));
      }
    };
    LoadBotd();
  }, [DisplaySection.DisplayCoffeeInfo, DisplaySection.isAdmin, requestedDate]);

  function IsBotdAvailable() {
    return currentBean && currentBean.name ? (
      <BeanCard currentBean={currentBean}></BeanCard>
    ) : (
      <div className="text-align">
        <h5>
          No Bean Of The Day Currently Available, Please Check Back Later!
        </h5>
      </div>
    );
  }

  function onCalenderChangeHandler(event, formData) {
    const formattedDate = formData.split("T");
    setRequestedDate(formattedDate[0]);
  }

  function IsUserAdmin() {
    return DisplaySection.isAdmin ? (
      <div className="pd-nav-top">
        <b>Select a date to preview?</b>
        <Card>
          <DatePickerInput
            id="date"
            locale="en"
            name="calender"
            onChange={(e, v) => onCalenderChangeHandler(e, v)}
          ></DatePickerInput>
        </Card>
      </div>
    ) : (
      <div></div>
    );
  }

  return (
    <Col>
      <Collapse open={DisplaySection.DisplayCoffeeInfo}>
        {IsBotdAvailable()}
        {IsUserAdmin()}
      </Collapse>
    </Col>
  );
}
