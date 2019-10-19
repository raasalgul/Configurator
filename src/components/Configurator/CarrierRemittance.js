import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardActions, CardHeader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import { serviceURLHost } from "./constants/URLs";
const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    marginTop: "75px"
  },
  button: {
    margin: theme.spacing.unit,
    textTransform: "none",
    fontSize: 18,
    padding: "6px 12px",
    backgroundColor: "#1C80B5",
    color: "#ffffff",
    justifyContent: "center"
  },
  label: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "20px",
    margin: theme.spacing.unit * 2,
    color: "#1C80B5"
  },
  textField: {
    backgroundColor: "#F0F0F0",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "18px",
    margin: theme.spacing.unit,
    color: "#999794"
  },
  addresscard: {
    height: 800,
    width: 800
  },

  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

class CarrierRemittance extends React.Component {
  state = {
    carrier_name: this.props.carrierName,
    bill_logo_code: "",
    bill_question_tel: "",
    bill_question_website: "",
    payable_name: "",
    remit_name: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    zip: ""
  };

  constructor(props) {
    super(props);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handlenext = () => {
    const panels = this.state;
    console.log(JSON.stringify(panels));
    fetch(`${serviceURLHost}/CarrierRemit/addRemittanceDetails/`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(panels)
    })
      .then(res => res.json())
      .then(data => console.log(data));
    // this.props.history.push(``);
    console.log({ panels });
    this.props.history.push(`/admin/LineOfBusiness`);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.addresscard}>
          <CardHeader
            classes={{ title: classes.label }}
            title="Carrier Remittance"
          />
          <Divider className={classes.divider} />
          <CardContent>
            <Grid container spacing={24} className={classes.label}>
              <Grid item xs={4}>
                <TextField
                  id="Bill Logo Code"
                  variant="outlined"
                  placeholder="Bill Logo Code"
                  className={classes.textField}
                  fullWidth
                  value={this.state.bill_logo_code}
                  onChange={this.handleChange("bill_logo_code")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  id="Bill Question Telephone No"
                  variant="outlined"
                  placeholder="Bill Question Telephone No"
                  className={classes.textField}
                  fullWidth
                  value={this.state.bill_question_tel}
                  onChange={this.handleChange("bill_question_tel")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="Payable Name"
                  variant="outlined"
                  placeholder="Payable Name"
                  className={classes.textField}
                  value={this.state.payable_name}
                  fullWidth
                  onChange={this.handleChange("payable_name")}
                  margin="normal"
                />
              </Grid>

              <Grid item xs={5}>
                <TextField
                  id="Remit Name"
                  variant="outlined"
                  placeholder="Remit Name"
                  className={classes.textField}
                  value={this.state.remit_name}
                  fullWidth
                  onChange={this.handleChange("remit_name")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  id="Website"
                  variant="outlined"
                  placeholder="Website"
                  className={classes.textField}
                  fullWidth
                  value={this.state.bill_question_website}
                  onChange={this.handleChange("bill_question_website")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id="Address Line 1"
                  variant="outlined"
                  placeholder="Address Line 1"
                  fullWidth
                  className={classes.textField}
                  value={this.state.address_line1}
                  onChange={this.handleChange("address_line1")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="Address Line 2"
                  variant="outlined"
                  placeholder="Address Line 2"
                  fullWidth
                  className={classes.textField}
                  value={this.state.address_line2}
                  onChange={this.handleChange("address_line2")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="City"
                  variant="outlined"
                  placeholder="City"
                  fullWidth
                  className={classes.textField}
                  value={this.state.city}
                  onChange={this.handleChange("city")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  id="State Code"
                  variant="outlined"
                  placeholder="State Code"
                  fullWidth
                  className={classes.textField}
                  value={this.state.state}
                  onChange={this.handleChange("state")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id="Zip Code"
                  variant="outlined"
                  placeholder="Zip Code"
                  fullWidth
                  className={classes.textField}
                  value={this.state.zip}
                  onChange={this.handleChange("zip")}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            <Grid item xs={11}>
              <Button
                fullWidth
                variant="contained"
                className={classes.button}
                onClick={this.handlenext}
              >
                Next
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  carrierCode: state.carrierCode,
  carrierName: state.carrierName,
  individualOnExchange: state.individualOnExchange,
  individualOffExchange: state.individualOffExchange,
  groupOffExchange: state.groupOffExchange,
  groupOnExchange: state.groupOnExchange
});

const ReduxCarrierRemittance = connect(mapStateToProps)(CarrierRemittance);
export default withStyles(styles)(ReduxCarrierRemittance);
