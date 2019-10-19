import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardActions, CardHeader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { serviceURLHost } from "../Configurator/constants/URLs";
import axios from "axios";
const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    margin: theme.spacing.unit * 2,
    backgroundColor: "#1C80B5",
    width: 150,
    height: 50,
    fontSize: "14px",
    color: "#ffffff",
    justifyContent: "center"
  },
  LEbutton: {
    margin: theme.spacing.unit * 2,
    backgroundColor: "#1C80B5",
    width: 250,
    height: 50,
    fontSize: "14px",
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
  card: {
    height: 200,
    width: 800
  },
  bankCard: {
    height: 320,
    width: 800
  },
  addresscard: {
    height: 800,
    width: 800
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

class LegalEntity extends React.Component {
  state = {
    nextButtonStatus: true,
    open: false,
    nameoflegalentity: "",
    codeoflegalentity: "",
    address: "",
    bank: "",
    accountnumber: "",
    bankAccountInfo: [],
    showmobile: false,
    addresstype: "",
    addressline1: "",
    addressline2: "",
    city: "",
    states: "",
    telPhoneExtension: "",
    telephonenumber: "",
    faxNumber: "",
    zip: "",
    workingHours: "",
    email: "",
    website: "",
    addressTypeOption: [],
    stateCodeOption: []
  };

  constructor(props) {
    super(props);
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    axios
      .get(`${serviceURLHost}/configurator/getBankInfo/${this.props.carrierId}`)
      .then(res => {
        const bankAccountInfo = res.data;
        console.log(bankAccountInfo);
        this.setState({ bankAccountInfo });
      });
    axios.get(`${serviceURLHost}/configurator/getStateCode`).then(res => {
      const stateCodeOption = res.data;
      console.log(stateCodeOption);
      this.setState({ stateCodeOption });
    });
    axios.get(`${serviceURLHost}/configurator/getAddressType`).then(res => {
      const addressTypeOption = res.data;
      console.log(addressTypeOption);
      this.setState({ addressTypeOption });
    });
  }
  handlemobilechange = () => {
    const { showmobile } = this.state;
    this.setState({ showmobile: !showmobile });
  };
  handleaddress = () => {
    //  e.preventDefault();
    this.props.onAddressChange(this.state);
    this.setState({ addresstype: "" });
    this.setState({ addressline1: "" });

    this.setState({ addressline2: "" });
    this.setState({ city: "" });
    this.setState({ states: "" });
    this.setState({ telephonenumber: "" });
    this.setState({ faxNumber: "" });
    this.setState({ zip: "" });
    this.setState({ email: "" });
    this.setState({ website: "" });
  };

  handlemobilevalue = (type, value) => {
    this.setState({ [type]: value });
    // const{mobile}=this.state;
    // mobile.push(value);
    // this.setState({mobile});
  };

  handleaddlegal = e => {
    this.setState({ nextButtonStatus: false });
    e.preventDefault();
    const { panels } = this.state;
    const post = {
      carrierId: this.props.carrierId,
      //carrierId: 10,
      legalEntityName: this.state.nameoflegalentity,
      legalEntityCode: this.state.codeoflegalentity,
      bankAccountNo: this.state.accountnumber,
      addressType: this.state.addresstype,
      addressLine1: this.state.addressline1,
      addressLine2: this.state.addressline2,
      city: this.state.city,
      state: this.state.states,
      zip: this.state.zip,
      extension: this.state.telPhoneExtension,
      telePhoneNumber: this.state.telephonenumber,
      faxNumber: this.state.faxNumber,
      workingHours: this.state.workingHours,
      email: this.state.email,
      website: this.state.website
    };
    console.log(JSON.stringify(post));
    fetch(`${serviceURLHost}/configurator/postLegalEntity`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => console.log(data));
    this.setState({ nameoflegalentity: "" });
    this.setState({ codeoflegalentity: "" });
    this.handleClickOpen();
  };
  handleNext = () => {
    this.props.history.push(`/admin/LegalEntity2`);
    //console.log({ panels });
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handlebank = e => {
    e.preventDefault();
    this.props.event(this.state);
    this.setState({ accountnumber: "" });
  };
  render() {
    const { classes } = this.props;
    console.log(this.state.Legalentity);
    return (
      <form className={classes.root} onSubmit={this.handleaddlegal}>
        <Grid
          container
          spacing={24}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.label}
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardHeader
                classes={{ title: classes.label }}
                title="Name of Legal Entity"
              />
              <Divider variant="middle" />
              <CardContent>
                <TextField
                  id="standard-name"
                  variant="standard"
                  fullWidth
                  value={this.state.nameoflegalentity}
                  onChange={this.handleChange("nameoflegalentity")}
                  margin="normal"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardHeader
                classes={{ title: classes.label }}
                title="Code of Legal Entity"
              />
              <Divider variant="middle" />
              <CardContent>
                <TextField
                  id="standard-name"
                  variant="standard"
                  fullWidth
                  value={this.state.codeoflegalentity}
                  onChange={this.handleChange("codeoflegalentity")}
                  margin="normal"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.bankCard}>
              <CardHeader
                classes={{ title: classes.label }}
                title="Bank Details"
              />
              <Divider className={classes.divider} />
              <CardContent>
                <Grid container spacing={24} className={classes.label}>
                  <Grid item xs={11}>
                    <TextField
                      select
                      id="Account Number"
                      variant="outlined"
                      label="Account Number"
                      className={classes.textField}
                      fullWidth
                      value={this.state.accountnumber}
                      onChange={this.handleChange("accountnumber")}
                      margin="normal"
                    >
                      {this.state.bankAccountInfo.map((bankAccount, index) => (
                        <MenuItem key={index} value={bankAccount}>
                          {bankAccount}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.addresscard}>
              <CardHeader classes={{ title: classes.label }} title="Address" />
              <Divider className={classes.divider} />
              <CardContent>
                <Grid container spacing={24} className={classes.label}>
                  <Grid item xs={4}>
                    <TextField
                      select
                      id="addresstype"
                      variant="outlined"
                      label="Address Type"
                      className={classes.textField}
                      fullWidth
                      value={this.state.addresstype}
                      onChange={this.handleChange("addresstype")}
                      margin="normal"
                    >
                      {this.state.addressTypeOption.map(
                        (addressTypeOption, index) => (
                          <MenuItem key={index} value={addressTypeOption}>
                            {addressTypeOption}
                          </MenuItem>
                        )
                      )}
                    </TextField>
                  </Grid>
                  <Grid item xs={7}>
                    <TextField
                      id="Addressline1-name"
                      variant="outlined"
                      placeholder="Address Line 1"
                      className={classes.textField}
                      fullWidth
                      value={this.state.addressline1}
                      onChange={this.handleChange("addressline1")}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      id="Addressline2-name"
                      variant="outlined"
                      placeholder="Address Line 2"
                      className={classes.textField}
                      value={this.state.addressline2}
                      fullWidth
                      onChange={this.handleChange("addressline2")}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      id="City"
                      variant="outlined"
                      placeholder="City"
                      className={classes.textField}
                      value={this.state.city}
                      fullWidth
                      onChange={this.handleChange("city")}
                      margin="normal"
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TextField
                      select
                      id="State"
                      variant="outlined"
                      label="State"
                      className={classes.textField}
                      fullWidth
                      value={this.state.states}
                      onChange={this.handleChange("states")}
                      margin="normal"
                    >
                      {this.state.stateCodeOption.map(
                        (stateCodeOption, index) => (
                          <MenuItem key={index} value={stateCodeOption}>
                            {stateCodeOption}
                          </MenuItem>
                        )
                      )}
                    </TextField>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      id="ZIP"
                      variant="outlined"
                      placeholder="ZIP"
                      type="Number"
                      fullWidth
                      className={classes.textField}
                      value={this.state.zip}
                      onChange={this.handleChange("zip")}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      id="telPhoneExtension"
                      className={classes.textField}
                      placeholder="Extension"
                      value={this.state.telPhoneExtension}
                      variant="outlined"
                      fullWidth
                      onChange={this.handleChange("telPhoneExtension")}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="telephonenumber"
                      variant="outlined"
                      placeholder="Telephone Number"
                      fullWidth
                      className={classes.textField}
                      value={this.state.telephonenumber}
                      onChange={this.handleChange("telephonenumber")}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      id="faxNumber"
                      variant="outlined"
                      placeholder="Fax Number"
                      fullWidth
                      className={classes.textField}
                      value={this.state.faxNumber}
                      onChange={this.handleChange("faxNumber")}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={11}>
                    <TextField
                      id="working-hours"
                      variant="outlined"
                      placeholder="Working Hours"
                      fullWidth
                      className={classes.textField}
                      value={this.state.workingHours}
                      onChange={this.handleChange("workingHours")}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <TextField
                      id="Email"
                      variant="outlined"
                      placeholder="Email"
                      type="Email"
                      fullWidth
                      className={classes.textField}
                      value={this.state.email}
                      onChange={this.handleChange("email")}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      id="Website"
                      variant="outlined"
                      placeholder="Website"
                      fullWidth
                      className={classes.textField}
                      value={this.state.website}
                      onChange={this.handleChange("website")}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <CardActions>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.LEbutton}
              onClick={this.handleaddlegal}
            >
              Add Legal Entity
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.state.open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Legal Entity"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  The Legal entity has been added.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Okay
                </Button>
              </DialogActions>
            </Dialog>
            <Button
              disabled={this.state.nextButtonStatus}
              variant="contained"
              className={classes.button}
              onClick={this.handleNext}
            >
              Next
            </Button>
          </CardActions>
        </Grid>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  carrierCode: state.carrierCode,
  carrierName: state.carrierName,
  carrierId: state.carrierId
});
const ReduxLegalEntity = connect(mapStateToProps)(LegalEntity);
export default withStyles(styles)(ReduxLegalEntity);
