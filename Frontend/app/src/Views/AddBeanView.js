import React, { useState } from "react";
import {
  Form,
  FormGroup,
  FormInput,
  CardBody,
  Button,
  Alert,
} from "shards-react";
import { DatePickerInput } from "rc-datepicker";
import "moment/locale/fr.js";
import "rc-datepicker/lib/style.css";
import { PostBeanFunctions } from "../functions/PostBeanFunctions";
import { CustomTooltip } from "../Components/FormToolTip/CustomToolTip";
import { useHistory } from "react-router-dom";

export default function AddBeanView() {
  const history = useHistory();
  const [BeanFormData, SetBeanFormData] = useState({
    name: "",
    colour: "",
    aroma: "",
    price: "",
    date: "",
  });

  const [SelectedFile, SetSelectedFile] = useState({
    selectedFile: null,
  });

  const [isValidData, setDataValidity] = useState({
    name: {
      invalid: false,
      valid: false,
      validationRule: (val) => val && val.length >= 5,
    },
    aroma: {
      invalid: false,
      valid: false,
      validationRule: (val) => val && val.length >= 5,
    },
    colour: {
      invalid: false,
      valid: false,
      validationRule: (val) => val && val.length >= 3,
    },
    price: {
      invalid: false,
      valid: false,
      validationRule: (val) => val && val.length >= 1,
    },
    image: {
      invalid: false,
      valid: false,
      validationRule: (val) => val.match(/(image)+(\/jpeg|\/png)$/),
    },
    date: {
      invalid: false,
      valid: false,
      validationRule: (val) =>
        val.match(/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
    },
  });

  const [FormSubmitted, SetFormSubmitted] = useState({
    submitted: false,
    success: false,
    failed: false,
    message: "",
  });

  function CheckFormData(dataString, targetName) {
    let setData;
    if (isValidData[targetName].validationRule(dataString)) {
      setData = { ...isValidData[targetName], invalid: false, valid: true };
    } else {
      setData = { ...isValidData[targetName], invalid: true, valid: false };
    }
    setDataValidity({
      ...isValidData,
      [targetName]: setData,
    });
  }

  function onInputChangeHandler(event) {
    const target = event.target;

    SetBeanFormData({
      ...BeanFormData,
      [target.name]: target.value,
    });
    CheckFormData(target.value, target.name);
  }

  function onFileChangeHandler(event) {
    SetSelectedFile({
      selectedFile: event.target.files[0],
      loaded: 0,
    });
    CheckFormData(event.target.files[0].type, "image");
  }

  function onCalenderChangeHandler(event, formData) {
    const formattedDate = formData.split("T");
    SetBeanFormData({
      ...BeanFormData,
      date: formattedDate[0],
    });
    CheckFormData(formattedDate[0], "date");
  }

  function AllValidDataCheck() {
    const FieldChecks = ["name", "aroma", "price", "image", "colour", "date"];
    let currentValidity = 0;
    FieldChecks.forEach((valueCheck) => {
      currentValidity = isValidData[valueCheck].valid
        ? currentValidity + 1
        : currentValidity;
    });
    return currentValidity !== 6;
  }

  async function SendFormData() {
    SetFormSubmitted({
      ...FormSubmitted,
      submitted: true,
    });
    const ApiClient = new PostBeanFunctions();
    // Store Image
    const data = new FormData();
    data.append("file", SelectedFile.selectedFile);
    const result = await ApiClient.StoreImageRequest(data);

    if (result.isSuccess) {
      // If successful store details in the DB
      const DbInsertionResult = await ApiClient.AddNewBean({
        Bean: {
          BotdDate: BeanFormData.date,
          Name: BeanFormData.name,
          Cost: BeanFormData.price,
          Colour: BeanFormData.colour,
          Aroma: BeanFormData.aroma,
          Image: JSON.parse(result.body).imgName,
        },
        AuthToken: "ThisIsTheRequiredAuthToken",
      });
      if (DbInsertionResult.isSuccess) {
        SetBeanFormData({
          name: "",
          colour: "",
          aroma: "",
          price: "",
          date: "",
        });
        SetFormSubmitted({
          ...FormSubmitted,
          submitted: true,
          success: true,
          message: 'Successfully entered a new "Bean Of The Day"!',
        });
        return;
      }
    }
    SetFormSubmitted({
      ...FormSubmitted,
      submitted: true,
      failed: true,
      message: "Something didnt work on that! Please try again later!",
    });
  }

  function CustomAlert({ FormSubmitted }) {
    return FormSubmitted.submitted ? (
      <div>
        <Alert
          className="text-align"
          theme={FormSubmitted.success ? "success" : "danger"}
          open={FormSubmitted.submitted}
        >
          {FormSubmitted.message}
        </Alert>
      </div>
    ) : (
      <div></div>
    );
  }

  return (
    <div>
      <CardBody>
        <CustomTooltip></CustomTooltip>
        <h5>Add A Bean Of The Day</h5>
        <Form>
          <FormGroup>
            <label>Bean Name</label>
            <FormInput
              valid={isValidData.name.valid}
              invalid={isValidData.name.invalid}
              id="name"
              name="name"
              onChange={(e) => onInputChangeHandler(e)}
              placeholder="Bean Name"
            />
          </FormGroup>
          <FormGroup>
            <label>Date</label>
            <DatePickerInput
              id="date"
              locale="en"
              name="calender"
              onChange={(e, v) => onCalenderChangeHandler(e, v)}
            ></DatePickerInput>
          </FormGroup>
          <FormGroup>
            <label>Price (£)</label>
            <FormInput
              valid={isValidData.price.valid}
              invalid={isValidData.price.invalid}
              name="price"
              id="price"
              onChange={(e) => onInputChangeHandler(e)}
              placeholder="Price"
              type="number"
            />
          </FormGroup>
          <FormGroup>
            <label>Colour</label>
            <FormInput
              valid={isValidData.colour.valid}
              invalid={isValidData.colour.invalid}
              name="colour"
              id="colour"
              onChange={(e) => onInputChangeHandler(e)}
              placeholder="Colour"
            />
          </FormGroup>
          <FormGroup>
            <label>Aroma</label>
            <FormInput
              id="aroma"
              valid={isValidData.aroma.valid}
              invalid={isValidData.aroma.invalid}
              name="aroma"
              onChange={(e) => onInputChangeHandler(e)}
              placeholder="Aroma"
            />
          </FormGroup>
          <FormGroup>
            <label>Image</label>
            <FormInput
              id="image"
              valid={isValidData.image.valid}
              invalid={isValidData.image.invalid}
              type="file"
              name="file"
              onChange={(e) => onFileChangeHandler(e)}
            />
          </FormGroup>
          <FormGroup>
            <Button
              disabled={AllValidDataCheck() || FormSubmitted.submitted}
              block
              onClick={() => SendFormData()}
            >
              Submit
            </Button>
          </FormGroup>
          <CustomAlert FormSubmitted={FormSubmitted}></CustomAlert>
        </Form>
      </CardBody>
    </div>
  );
}
