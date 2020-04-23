import React, { useEffect, useState } from "react";
import { Col, Collapse } from "shards-react";
import BeanCard from "../BeanDisplayCard/BeanCard";
import { GetBotdApiFunctions } from "../../functions/GetBotdApiFunctions";

export default function BotdCollapse({ DisplaySection }) {
  const [currentBean, setCurrentBean] = useState();

  useEffect(() => {
    const LoadBotd = async () => {
      const BotdResponse = await new GetBotdApiFunctions().GetBotdInfo();
      if (BotdResponse.isSuccess) {
        setCurrentBean(JSON.parse(BotdResponse.body));
      }
    };
    LoadBotd();
  }, [DisplaySection]);

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

  return (
    <Col>
      <Collapse open={DisplaySection}>{IsBotdAvailable()}</Collapse>
    </Col>
  );
}
