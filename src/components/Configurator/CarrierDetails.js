import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { serviceURLHost } from "./constants/URLs";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardActions, CardHeader } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import updateCarrierCode from "../../actions/updateCarrierCode";
import updatecarrierName from "../../actions/updateCarrierName";
import updateCarrierId from "../../actions/updateCarrierId";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh"
  },
  label: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "20px",
    margin: theme.spacing.unit * 2,
    color: "#1C80B5",
    width: 800
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 670,
    height: 75
  },
  card: {
    height: 400
  },
  nextButton: {
    margin: theme.spacing.unit * 2,
    textTransform: "none",
    fontSize: 18,
    width: "200px",
    padding: "6px 12px",
    backgroundColor: "#1C80B5",
    color: "#ffffff",
    float: "right",
    justifyContent: "center"
  }
});
class CarrierDetails extends React.Component {
  state = {
    carrier_name: "",
    carrier_code: "X6",
    carrier_id: 10,
    Carrier_Code_option: []
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(`ComponentValue`);
    axios.get(`${serviceURLHost}/Carrier/getCarrierCode/`).then(res => {
      const Carrier_Code_option = res.data;
      console.log(Carrier_Code_option);
      this.setState({ Carrier_Code_option });
    });
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleUpdateCarrierCode = () => {
    this.props.handleUpdateCarrierCode(this.state.carrier_code);
  };
  handleUpdateCarrierName = () => {
    this.props.handleUpdateCarrierName(this.state.carrier_name);
  };
  handleUpdateCarrierId = data => {
    this.props.handleUpdateCarrierId(data);
  };
  handlenext = () => {
    const panels = {
      carriername: this.state.carrier_name,
      carriercode: this.state.carrier_code
    };

    console.log(JSON.stringify(panels));
    fetch(`${serviceURLHost}/Carrier/addCarrier/`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(panels)
    })
      .then(res => res.json())
      .then(data => {
        console.log("carrier Id" + data);
        // this.setState({ carrier_id: data });
        this.handleUpdateCarrierId(data);
      });
    this.props.history.push(`/admin/BusinessDetails`);
    console.log({ panels });
    this.handleUpdateCarrierCode();
    // this.handleUpdateCarrierId();
    this.handleUpdateCarrierName();
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={24}
          justify="space-between"
          className={classes.label}
        >
          <Grid item xs={11}>
            <Card>
              <CardHeader
                classes={{ title: classes.label }}
                title="Name of the Carrier"
              />
              <Divider variant="middle" />
              <CardContent>
                <TextField
                  id="standard-name"
                  variant="standard"
                  className={classes.textField}
                  value={this.state.carrier_name}
                  onChange={this.handleChange("carrier_name")}
                  margin="normal"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={11}>
            <Card>
              <CardHeader
                classes={{ title: classes.label }}
                title="Select your CarrierCode"
              />
              <Divider variant="middle" />
              <CardContent>
                <TextField
                  id="Carrier_Code"
                  select
                  className={classes.textField}
                  label="CarrierCode"
                  value={this.state.carrier_code}
                  fullWidth
                  onChange={this.handleChange("carrier_code")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {this.state.Carrier_Code_option.map((option, index) => (
                    <MenuItem key={index} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={11}>
            <Button
              disabled={this.state.nextButtonStatus}
              variant="contained"
              className={classes.nextButton}
              onClick={this.handlenext}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  carrierName: state.carrierName
});
const mapActionToProps = {
  handleUpdateCarrierCode: updateCarrierCode,
  handleUpdateCarrierName: updatecarrierName,
  handleUpdateCarrierId: updateCarrierId
};
const ReduxCarrierDetails = connect(
  mapStateToProps,
  mapActionToProps
)(CarrierDetails);
export default withStyles(styles)(ReduxCarrierDetails);
