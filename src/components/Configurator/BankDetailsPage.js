import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
import { serviceURLHost } from "./constants/URLs";
const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center"
  },
  button: {
    margin: theme.spacing.unit * 2,
    textTransform: "none",
    fontSize: 18,
    padding: "6px 12px",
    width: "400px",
    backgroundColor: "#1C80B5",
    color: "#ffffff",
    justifyContent: "center"
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
    width: 1000
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

class BankDetailsPage extends React.Component {
  state = {
    open: false,
    stateCode: "",
    bankAccountTypeId: "",
    bankName: "",
    bankAccountNo: "",
    bankNumCode: "",
    batchCoId: "",
    batchCoName: "",
    merchantID: "",
    securityKey: "",
    securityExpirationDate: "",
    siteCode: "",
    nextButtonStatus: true,
    stateCodeOption: ["123", "456", "789"],
    bankAccountTypeIdOption: ["123", "456", "789"],
    bankAccountTypeDescOption: [],
    jsonArray: []
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
    axios.get(`${serviceURLHost}/configurator/getStateCode`).then(res => {
      const stateCodeOption = res.data;
      console.log(stateCodeOption);
      this.setState({ stateCodeOption });
    });

    axios
      .get(`${serviceURLHost}/configurator/getBankAccountTypeId`)
      .then(res => {
        const bankAccountTypeIdOption = res.data;
        console.log(bankAccountTypeIdOption);
        this.setState({ bankAccountTypeIdOption });
      });
    axios
      .get(`${serviceURLHost}/configurator/getBankAccountTypeDesc`)
      .then(res => {
        const bankAccountTypeDescOption = res.data;
        console.log(bankAccountTypeDescOption);
        this.setState({ bankAccountTypeDescOption });
      });
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handlebank = () => {
    this.setState({ nextButtonStatus: false });
    let json = {
      carrierId: this.props.carrierId,
      //carrierId: 10,
      stateCode: this.state.stateCode,
      bankAccountTypeId: this.state.bankAccountTypeId,
      bankName: this.state.bankName,
      bankAccountNo: this.state.bankAccountNo,
      bankNumCode: this.state.bankNumCode,
      batchCoId: this.state.batchCoId,
      batchCoName: this.state.batchCoName,
      merchantID: this.state.merchantID,
      securityKey: this.state.securityKey,
      securityExpirationDate: this.state.securityExpirationDate,
      siteCode: this.state.siteCode
    };
    //json = JSON.stringify(json);
    let jsonArray = this.state.jsonArray;
    jsonArray.push(json);
    console.log(jsonArray);
    // this.setState({
    //   jsonArray: jsonArray,
    //   stateCode: "",
    //   bankAccountTypeId: "",
    //   bankName: "",
    //   bankAccountNo: "",
    //   bankNumCode: "",
    //   batchCoId: "",
    //   batchCoName: "",
    //   merchantID: "",
    //   securityKey: "",
    //   securityExpirationDate: "",
    //   siteCode: ""
    // });
    this.handleClickOpen();
  };
  handleNext = () => {
    const post = this.state.jsonArray;
    console.log(JSON.stringify(post));
    fetch(`${serviceURLHost}/configurator/postBankDetails`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => console.log(data));
    this.props.history.push(`/admin/CarrierRemittance`);
  };

  render() {
    const { classes } = this.props;

    return (
      <div
        className={classes.root}
        // style={{
        //   display: "flex",
        //  justifyContent: "center",
        // alignItems: "center",
        //   height: "100vh"

        // }}
      >
        <Grid>
          <Card className={classes.addresscard}>
            <CardHeader
              classes={{ title: classes.label }}
              title="Bank Details"
            />
            <Divider className={classes.divider} />
            <CardContent>
              <Grid container spacing={24} className={classes.label}>
                <Grid item xs={5}>
                  <TextField
                    id="State Code"
                    select
                    className={classes.textField}
                    label="State Code"
                    value={this.state.stateCode}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange("stateCode")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
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
                <Grid item xs={6}>
                  <TextField
                    id="Bank Account Type Id"
                    label="Bank Account Type Id"
                    select
                    variant="outlined"
                    className={classes.textField}
                    fullWidth
                    value={this.state.bankAccountTypeId}
                    onChange={this.handleChange("bankAccountTypeId")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {this.state.bankAccountTypeDescOption.map(
                      (option, index) => (
                        <MenuItem key={index} value={option}>
                          {option}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={11}>
                  <TextField
                    id="Bank Name"
                    variant="outlined"
                    placeholder="Bank Name"
                    className={classes.textField}
                    value={this.state.bankName}
                    fullWidth
                    onChange={this.handleChange("bankName")}
                    margin="normal"
                  />
                </Grid>

                <Grid item xs={5}>
                  <TextField
                    id="Bank Account Number"
                    variant="outlined"
                    placeholder="Bank Account Number"
                    className={classes.textField}
                    value={this.state.bankAccountNo}
                    fullWidth
                    onChange={this.handleChange("bankAccountNo")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="Bank Number Code"
                    variant="outlined"
                    placeholder="Bank Number Code"
                    className={classes.textField}
                    fullWidth
                    value={this.state.bankNumCode}
                    onChange={this.handleChange("bankNumCode")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    id="Batch Company Id"
                    variant="outlined"
                    placeholder="Batch Company Id"
                    fullWidth
                    className={classes.textField}
                    value={this.state.batchCoId}
                    onChange={this.handleChange("batchCoId")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="Batch Company Name"
                    variant="outlined"
                    placeholder="Batch Company Name"
                    fullWidth
                    className={classes.textField}
                    value={this.state.batchCoName}
                    onChange={this.handleChange("batchCoName")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    id="Merchant Id"
                    variant="outlined"
                    placeholder="Merchant Id"
                    fullWidth
                    className={classes.textField}
                    value={this.state.merchantID}
                    onChange={this.handleChange("merchantID")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="Security Key"
                    variant="outlined"
                    placeholder="Security Key"
                    fullWidth
                    className={classes.textField}
                    value={this.state.securityKey}
                    onChange={this.handleChange("securityKey")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={5}>
                  <TextField
                    label="Security Expiration Date"
                    type="date"
                    // defaultValue="2017-05-24"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                      fontSize: "40px"
                    }}
                    id="Security Expiration Date"
                    variant="outlined"
                    fullWidth
                    className={classes.textField}
                    value={this.state.securityExpirationDate}
                    onChange={this.handleChange("securityExpirationDate")}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="Site Code"
                    variant="outlined"
                    placeholder="Site Code"
                    fullWidth
                    className={classes.textField}
                    value={this.state.siteCode}
                    onChange={this.handleChange("siteCode")}
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Grid>
            <Button
              variant="contained"
              className={classes.button}
              onClick={this.handlebank}
            >
              Add Bank Details
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.state.open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Bank Details"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  The Bank details Added for the bank name {this.state.bankName}{" "}
                  and account number {this.state.bankAccountNo} has been added.
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
              className={classes.nextButton}
              onClick={this.handleNext}
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
  carrierCode: state.carrierCode,
  carrierName: state.carrierName,
  carrierId: state.carrierId
});

const ReduxBankDetails = connect(mapStateToProps)(BankDetailsPage);

export default withStyles(styles)(ReduxBankDetails);
