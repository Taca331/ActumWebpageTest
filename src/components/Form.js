import React from "react";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

import "../App.css";

var emailCheck = /\S+@\S+/;
// /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim;

function validateFields(name, lastName, email, kids, dateOfBirth) {
  return {
    email: email.length === 0 || !emailCheck.test(String(email)),
    name: name.length === 0,
    lastName: lastName.length === 0,
    kids: kids.length === 0 || kids < 0,
    dateOfBirth: dateOfBirth.length === 0
  };
}

class Form extends React.Component {
  state = {
    value: "female",
    kids: "",
    name: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    reponseStatus: "",

    touched: {
      kids: false,
      name: false,
      lastName: false,
      email: false,
      dateOfBirth: false
    }
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleChangeKids = event => {
    this.setState({ kids: event.target.value });
  };

  handleChangeName = event => {
    this.setState({ name: event.target.value });
  };

  handleChangeLastName = event => {
    this.setState({ lastName: event.target.value });
  };

  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };

  handleChangeDateOfBirth = event => {
    this.setState({ dateOfBirth: event.target.value });
  };

  postData = async (url = ``, data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    });
    const json = await response.json();

    if (response.ok) {
      this.setState({
        reponseStatus: "Data úspěšně odeslána!",
        value: "female",
        kids: "",
        name: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        touched: {
            kids: false,
            name: false,
            lastName: false,
            email: false,
            dateOfBirth: false
          }
      });
    } else {
      this.setState({
        responseStatus: "Chyba při odesílání dat!"
      });
    }
  };

  handleBlur = field => event => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  handleSubmit = event => {
    if (!this.canBeSubmitted()) {
      event.preventDefault();
      return;
    }
    const { name, lastName, email, kids, dateOfBirth } = this.state;
    alert(
      `Vyplněno jmeno: ${name}, příjmení: ${lastName}, email: ${email}, počet dětí: ${kids} a datum narození: ${dateOfBirth}`
    );
  }; 

  canBeSubmitted() {
    const errors = validateFields(
      this.state.name,
      this.state.lastName,
      this.state.email,
      this.state.kids,
      this.state.dateOfBirth
    );
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    return !isDisabled;
  }

  render() {
    const stylePaper = {
      paddingTop: "15px",
      paddingBottom: "15px",
      width: "50%",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "50px",
      marginBottom: "100px"
    };

    const styleFields = {
      width: "45%",
      marginRight: "auto",
      marginLeft: "25px",
      marginBottom: "25px"
    };

    const styleLabel = {
      marginLeft: "25px",
      paddingTop: "12px"
    };

    const styleGender = {
      width: "45%",
      marginRight: "auto",
      marginLeft: "25px",
      marginBottom: "25px"
    };

    const styleButton = {
      marginLeft: "33%",
      width: "250px",
      height: "50px"
    };

    const dataFetch = {
      name: this.state.name,
      surname: this.state.lastName,
      date: this.state.dateOfBirth,
      email: this.state.email,
      gender: this.state.value,
      children: this.state.kids
    };

    const errors = validateFields(
      this.state.name,
      this.state.lastName,
      this.state.email,
      this.state.kids,
      this.state.dateOfBirth
    );


    const isDisabled = Object.keys(errors).some(x => errors[x]);


    return (
      <Paper className="ccx" style={stylePaper} elevation={1}>
        <Typography
          variant="h5"
          component="h3"
          style={{ textAlign: "center", fontWeight: "900" }}
        >
          Formulář
        </Typography>
        <form>
          <TextField
            id="outlined-email-input"
            label="Jméno"
            value={this.state.name}
            onChange={this.handleChangeName}
            onBlur={this.handleBlur("name")}
            className="TextField"
            name="jmeno"
            error={this.state.touched.name && errors.name}
            helperText={
                this.state.touched.name && errors.name 
                ? "Vyplňte jméno, prosím!"
                : ""
            }
            margin="normal"
            variant="outlined"
            style={styleFields}
          />
         
          <TextField
            id="outlined-email-input"
            label="Příjmení"
            onBlur={this.handleBlur("lastName")}
            value={this.state.lastName}
            onChange={this.handleChangeLastName}
            className="TextField"
            name="prijmeni"
            error={this.state.touched.lastName && errors.lastName}
            helperText={
                this.state.touched.lastName && errors.lastName
                ? "Vyplňte přijmení, prosím!"
                : ""
            }
            margin="normal"
            variant="outlined"
            style={styleFields}
          />

          <TextField
            id="outlined-email-input"
            label="Datum narození"
            value={this.state.dateOfBirth}
            onChange={this.handleChangeDateOfBirth}
            onBlur={this.handleBlur("dateOfBirth")}
            type="date"
            error={this.state.touched.dateOfBirth && errors.dateOfBirth}
            helperText={
                this.state.touched.dateOfBirth && errors.dateOfBirth
                ? "Vyplňte datum vašeho narození, prosím!"
                : ""
            }
            variant="outlined"
            className="TextField"
            style={styleFields}
          />

          <TextField
            id="outlined-email-input"
            label="Email"
            value={this.state.email}
            onChange={this.handleChangeEmail}
            onBlur={this.handleBlur("email")}
            className="TextField"
            type="email"
            name="email"
            error={this.state.touched.email && errors.email}
            helperText={
                this.state.touched.email && errors.email
                ? "Vyplňte email a to ve správném formátu, prosím!"
                : ""
            }
            autoComplete="email"
            variant="outlined"
            style={styleFields}
          />

          <TextField
            id="outlined-number"
            label="Počet dětí"
            value={this.state.kids}
            onChange={this.handleChangeKids}
            onBlur={this.handleBlur("kids")}
            style={styleFields}
            type="number"
            error={this.state.touched.kids && errors.kids}
            helperText={
                this.state.touched.kids && errors.kids
                ? "Vyplňte počet vašich ratolestí, prosím! Záporný počet dětí nelze zadat!"
                : ""
            }
            className="TextField"
            InputLabelProps={{
              shrink: true
            }}
            margin="normal"
            variant="outlined"
          />

          <FormControl component="fieldset" style={{ width: "45%" }}>
            <FormLabel component="legend" style={styleLabel}>
              Gender
            </FormLabel>
            <RadioGroup
              aria-label="Gender"
              name="gender1"
              value={this.state.value}
              onChange={this.handleChange}
              style={styleGender}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            disableRipple
            disabled={isDisabled}
            style={styleButton}
            onClick={() =>
              this.postData(
                "https://actum-form-ulcrunoxba.now.sh/api/submit",
                dataFetch
              )
            }
          >
            Odeslat
          </Button>
        </form>
        {<p>{this.state.reponseStatus}</p>}
      </Paper>
    );
  }
}

export default Form;
