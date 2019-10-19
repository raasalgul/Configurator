import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { serviceURLHost } from "./constants/URLs";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import axios from "axios";
const styles = theme => ({
  card: {
    width: "100%"
  },
  button: {
    //margin: theme.spacing.unit * 2,
    textTransform: "none",
    fontSize: 18,
    padding: "6px 12px",
    width: "400px",
    backgroundColor: "#1C80B5",
    color: "#ffffff",
    justifyContent: "center",
    marginTop: "50px"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  root: {
    textAlign: "center",
    padding: theme.spacing.unit * 2.5,
    border: 2,
    width: "100%",
    borderColor: "#090909"
  },
  confirmbutton: {
    margin: theme.spacing.unit * 2,
    backgroundColor: "#1C80B5",
    width: 150,
    height: 50,
    fontSize: "14px",
    color: "#ffffff"
  },
  table: {
    minWidth: 650
  },
  individualGrids: {}
});

let carrierDetails = {
  labelCarrierCode: "Carrier Code",
  // carrierCode: this.props.carrierId, //this.props.carrierCode
  labelCarrierName: "Carrier Name",
  //  carrierName: this.props.carrierName, //this.props.carrierName
  labelLineOfBusiness: "Line Of Business"
  // lineOfBusiness: ""
};
const businessDetailsHeader = [
  "Business Type",
  "",
  "",
  "",
  "",
  "",
  "Business States"
];

const bankDetailsHeader = [
  "State Code",
  "Bank Account Type",
  "Bank Name",
  "Bank Account Number",
  "Bank Number Code"
];
const lineOfBusinessHeader = [
  "Name Of Legal Entity",
  "Code Of Legal Entity",
  "Bank Details",
  "Address"
];
class ConfimatorPage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    legalEntityValue: [],
    legalEntityName: "",
    legalEntityCode: "",
    bankDetails: "",
    address: "",
    bankDetailsValue: [],
    stateCode: "",
    bankAccountType: "",
    bankName: "",
    bankAccountNumber: "",
    bankNumberCode: "",
    lineOfBusiness: "",
    businessDetailsValue: [],
    businessType: "",
    states: "",
    configvalue: "",
    loadDefaultConfigState: false
  };

  componentDidMount() {
    let legalEntityValue = [];
    let bankDetailsValue = [];
    let businessDetailsValue = [];
    axios
      .get(`${serviceURLHost}/View/getAllStates/${this.props.carrierId}`)
      .then(result => {
        result.data.map(businessDetail => {
          // console.log(
          //   `data1 =` + businessDetail.carrier_code + ` data2 =` + businessDetail.carrier_full_name
          // );
          let temp = {
            businessType: businessDetail.businessType,
            states: businessDetail.states
          };
          businessDetailsValue.push(temp);
        });
        this.setState({ businessDetailsValue });
      });

    axios
      .get(
        `${serviceURLHost}/LOBAPI/getIndividualLineOfBusiness/${this.props.carrierId}`
      )
      .then(res => {
        const lineOfBusiness = res.data;
        console.log(lineOfBusiness);
        this.setState({ lineOfBusiness });
      });

    axios
      .get(`${serviceURLHost}/View/getBankDetails/${this.props.carrierId}`)
      .then(result => {
        result.data.map(bankDetail => {
          // console.log(
          //   `data1 =` + bankDetail.carrier_code + ` data2 =` + bankDetail.carrier_full_name
          // );
          let temp = {
            stateCode: bankDetail.stateCode,
            bankAccountType: bankDetail.bankAccountType,
            bankName: bankDetail.bankName,
            bankAccountNumber: bankDetail.bankAccountNumber,
            bankNumberCode: bankDetail.bankNumberCode
          };
          bankDetailsValue.push(temp);
        });
        this.setState({ bankDetailsValue });
      });

    axios
      .get(`${serviceURLHost}/View/getLegalEntity/${this.props.carrierId}`)
      .then(result => {
        result.data.map(legalEntity => {
          // console.log(
          //   `data1 =` + legalEntity.carrier_code + ` data2 =` + legalEntity.carrier_full_name
          // );
          let temp = {
            legalEntityName: legalEntity.legalEntityName,
            legalEntityCode: legalEntity.legalEntityCode,
            bankDetails: legalEntity.bankDetails,
            address: legalEntity.address
          };
          legalEntityValue.push(temp);
        });
        this.setState({ legalEntityValue });
      });
    // setTimeout(
    //   function() {
    //     //Start the timer
    //     this.setState({ render: true }); //After 1 second, set render to true
    //   }.bind(this),
    //   5000
    // );
  }
  handleconfig = () => {
    console.log(`Clicked`);
    let configvalue;
    let check = false;
    this.setState({ loadDefaultConfigState: true });
    axios
      .get(
        `${serviceURLHost}/ConfirmationPage/loadCarrierConfigValue/${this.props.carrierId}`
      )
      .then(res => {
        configvalue = res.data;
        console.log(configvalue.STATUS);

        if (configvalue.STATUS === "SUCCESS")
          this.props.history.push(`/admin/region`);
        else alert(`${configvalue.STATUS}`);
      });
    console.log(check);
    if (check === true) {
      console.log("Inside ");
    }
  };

  render() {
    const { classes } = this.props;
    console.log(this.props.carrierId);
    return (
      <div>
        <Grid
          container
          spacing={24}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Card>
            <Grid item xs={12} style={{ maxWidth: "100%" }}>
              <Paper className={classes.root}>
                <Typography
                  style={{ textAlign: "center", color: "#1C80B5" }}
                  variant="h5"
                  component="h2"
                >
                  Carrier Details
                </Typography>
                <Table className={classes.table}>
                  <TableBody>
                    <TableRow key={carrierDetails.label}>
                      <TableCell
                        align="center"
                        style={{
                          color: "rgba(0, 0, 0, 0.54)",
                          fontSize: "1.00rem",
                          fontWeight: 600
                        }}
                      >
                        {carrierDetails.labelCarrierCode}
                      </TableCell>

                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell align="center">
                        {this.props.carrierCode}
                      </TableCell>
                    </TableRow>
                    <TableRow
                      style={{ background: "#fdffe0" }}
                      key={carrierDetails.label}
                    >
                      <TableCell
                        style={{
                          color: "rgba(0, 0, 0, 0.54)",
                          fontSize: "1.00rem",
                          fontWeight: 600
                        }}
                        align="center"
                      >
                        {carrierDetails.labelCarrierName}
                      </TableCell>

                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell align="center">
                        {this.props.carrierName}
                      </TableCell>
                    </TableRow>
                    <TableRow key={carrierDetails.label}>
                      <TableCell
                        style={{
                          color: "rgba(0, 0, 0, 0.54)",
                          fontSize: "1.00rem",
                          fontWeight: 600
                        }}
                        align="center"
                      >
                        {carrierDetails.labelLineOfBusiness}
                      </TableCell>

                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell />
                      <TableCell align="center">
                        {this.state.lineOfBusiness}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={12} style={{ maxWidth: "100%" }}>
              <Paper className={classes.root}>
                <Typography
                  style={{ textAlign: "center", color: "#1C80B5" }}
                  variant="h5"
                  component="h2"
                >
                  Carrier Business
                </Typography>
                <br />
                <Table className={classes.table}>
                  <TableHead>
                    {businessDetailsHeader.map(row => (
                      <TableCell
                        style={{
                          color: "rgba(0, 0, 0, 0.54)"
                          // fontSize: "1.00rem",
                          // fontWeight: 600
                        }}
                        align="center"
                        component="th"
                        scope="row"
                      >
                        {row}
                      </TableCell>
                    ))}
                  </TableHead>
                  <TableBody>
                    {this.state.businessDetailsValue.map((row, index) => (
                      <TableRow
                        style={
                          index % 2
                            ? { background: "#fdffe0" }
                            : { background: "white" }
                        }
                        key={row.BusinessType}
                      >
                        <TableCell align="center">{row.businessType}</TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell />
                        <TableCell align="center">{row.states}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={12} style={{ maxWidth: "100%" }}>
              <Paper className={classes.root}>
                <Typography
                  style={{ textAlign: "center", color: "#1C80B5" }}
                  variant="h5"
                  component="h2"
                >
                  Carrier Bank Details
                </Typography>
                <br />
                <Table className={classes.table}>
                  <TableHead>
                    {bankDetailsHeader.map(row => (
                      <TableCell align="center" component="th" scope="row">
                        {row}
                      </TableCell>
                    ))}
                  </TableHead>
                  <TableBody>
                    {this.state.bankDetailsValue.map((row, index) => (
                      <TableRow
                        style={
                          index % 2
                            ? { background: "#fdffe0" }
                            : { background: "white" }
                        }
                        key={row.bankAccountNumber}
                      >
                        <TableCell align="center">{row.stateCode}</TableCell>
                        <TableCell align="center">
                          {row.bankAccountType}
                        </TableCell>
                        <TableCell align="center">{row.bankName}</TableCell>
                        <TableCell align="center">
                          {row.bankAccountNumber}
                        </TableCell>
                        <TableCell align="center">
                          {row.bankNumberCode}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={12} style={{ maxWidth: "100%" }}>
              <Paper className={classes.root}>
                <Typography
                  style={{ textAlign: "center", color: "#1C80B5" }}
                  variant="h5"
                  component="h2"
                >
                  Carrier Legal Entity
                </Typography>
                <br />
                <Table className={classes.table}>
                  <TableHead>
                    {lineOfBusinessHeader.map(row => (
                      <TableCell align="center" component="th" scope="row">
                        {row}
                      </TableCell>
                    ))}
                  </TableHead>
                  <TableBody>
                    {this.state.legalEntityValue.map((row, index) => (
                      <TableRow
                        style={
                          index % 2
                            ? { background: "#fdffe0" }
                            : { background: "white" }
                        }
                        key={row.legalEntityCode}
                      >
                        <TableCell align="center">
                          {row.legalEntityName}
                        </TableCell>
                        <TableCell align="center">
                          {row.legalEntityCode}
                        </TableCell>
                        <TableCell align="center">{row.bankDetails}</TableCell>
                        <TableCell size="small" align="center">
                          {row.address}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Card>
          <Button
            variant="contained"
            className={classes.button}
            onClick={this.handleconfig}
            disabled={this.state.loadDefaultConfigState}
          >
            LOAD DEFAULT CONFIG
          </Button>
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

const ReduxConfimatorPage = connect(mapStateToProps)(ConfimatorPage);
export default withStyles(styles)(ReduxConfimatorPage);
