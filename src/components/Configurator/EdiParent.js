import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuItem from "@material-ui/core/MenuItem";
import CardContent from "@material-ui/core/CardContent";
import { CardActions, CardHeader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import { connect } from "react-redux";
import { serviceURLHost } from "./constants/URLs";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center"
    //    alignItems: "center",
    //         height: "100vh"
  },

  paper: {
    textAlign: "center",
    padding: theme.spacing.unit * 2.5,
    border: 2,
    width: 1160,
    borderColor: "#090909"
  },
  button: {
    justifyContent: "center",
    margin: theme.spacing.unit * 2,
    backgroundColor: "#1C80B5",
    width: 125,
    height: 40,
    float: "right",
    fontSize: "14px",
    color: "#ffffff"
  },
  addEdi: {
    margin: theme.spacing.unit * 2,
    backgroundColor: "#1C80B5",
    width: 225,
    height: 45,
    // float: "right",
    fontSize: "14px",
    color: "#ffffff"
  },
  clearButton: {
    margin: theme.spacing.unit * 2,
    width: 125,
    height: 40,
    fontSize: "14px",
    float: "left"
  },
  label: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "20px",
    margin: theme.spacing.unit * 2,
    color: "#1C80B5"
  },
  fab: {
    right: 1,
    marginLeft: "30px",
    marginTop: "8px"
  },
  deletefab: {
    position: "absolute",
    marginLeft: "60px",
    marginTop: "-8px"
  },
  textField: {
    backgroundColor: "#F0F0F0",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "18px",
    margin: theme.spacing.unit,
    color: "#999794"
  },
  paper: {
    textAlign: "center",
    padding: theme.spacing.unit * 2.5,
    width: 1160,
    border: 2,
    borderColor: "#090909",
    marginBottom: "15px"
  },
  addresscard: {
    height: 500,
    width: 1200
  },
  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  },
  TextInputStyleClass: {
    textAlign: "centre",
    borderWidth: 2,
    borderColor: "#090909",
    height: 50
  }
});
class Edi extends React.Component {
  state = {
    stateValue: "",
    carrierId: "",
    tpaId: "",
    hiosId: "",
    payeeId: "",
    senderId: "",
    receiverId: "",
    owningCarrierList: [],
    owningCarrier: "",
    taxId: "",
    qhpId: "",
    businessTypeValue: "",
    panels: [],
    states: [],
    business: []
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // axios
    //   .get(`${serviceURLHost}/configurator/getEdiStates/${10}`)
    //   .then(res => {
    //     const states = res.data;
    //     console.log(states);
    //     this.setState({ states });
    //   });
    axios
      .get(
        `${serviceURLHost}/configurator/getBusinessType/${this.props.carrierId}`
      )
      .then(res => {
        const business = res.data;
        console.log(business);
        this.setState({ business });
      });
    // axios
    //   .get(`${serviceURLHost}/configurator/getOwningCarriers/${10}`)
    //   .then(res => {
    //     const owningCarrierList = res.data;
    //     console.log(owningCarrierList);
    //     this.setState({ owningCarrierList });
    //   });
  }
  addNewlist = () => {
    const {
      businessTypeValue,
      // owningCarrier,
      stateValue,
      tpaId,
      hiosId,
      payeeId,
      senderId,
      taxId,
      receiverId,
      qhpId,
      panels
    } = this.state;
    panels.push({
      businessTypeValue,
      //owningCarrier,
      stateValue,
      tpaId,
      hiosId,
      payeeId,
      senderId,
      qhpId,
      taxId,
      receiverId
    });
    this.setState({ panels });
  };
  handleNext = () => {
    const { panels } = this.state;
    const post = {
      carrierId: this.props.carrierId,
      ediData: panels
    };
    console.log(JSON.stringify(post));
    fetch(`${serviceURLHost}/configurator/postEdi`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => console.log(data));

    this.props.history.push(`/admin/LegalEntity`);
  };
  validateSelections = () => {
    const {
      stateValue,
      tpaId,
      hiosId,
      payeeId,
      senderId,
      qhpId,
      taxId,
      receiverId
    } = this.state;
    return (
      !stateValue ||
      !tpaId ||
      !hiosId ||
      !payeeId ||
      !senderId ||
      !receiverId ||
      !qhpId ||
      !taxId
    );
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleChangeService = prop => event => {
    this.setState({ [prop]: event.target.value });
    const businessType = event.target.value;
    if (prop === `businessTypeValue`) {
      let post = {
        carrier_id: this.props.carrierId,
        businessTypeValue: event.target.value
      };
      fetch(`${serviceURLHost}/configurator/getEdiStates`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(post)
      })
        // .then(res => {
        //   const states = res;
        //   console.log(states);
        //   // this.setState({ states });
        // })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({ states: data });
        });
    }
    console.log(businessType);
    // axios
    //   .get(
    //     `http://10.24.46.202:8080/stateapi/getStateDetails/${
    //       this.props.carrierName
    //     }/${businessType}`
    //   )
    //   .then(res => {
    //     const states = res.data;
    //     console.log(states);
    //     this.setState({ states });
    //   });
  };

  clear = () => {
    // axios
    //   .delete(
    //     `http://10.24.46.202:8080/ediapi/deleteEdi/Health/${
    //       this.props.carrierName
    //     }`
    //   )
    //   .then(res => res.json())
    //   .then(data => console.log(data));
  };
  deletepanels = event => {
    const { panels } = this.state;
    var index = event.currentTarget.attributes.deletevalue.nodeValue;
    console.log(event.currentTarget.attributes.deletevalue.nodeValue);
    panels.splice(index, 1);
    this.setState({ panels });
  };
  render() {
    // console.log(this.state.panels);
    const { classes } = this.props;
    const {
      businessType,
      stateValue,
      tpaId,
      hiosId,
      payeeId,
      senderId,
      receiverId,
      taxId,
      qhpId,
      panels
    } = this.state;
    return (
      <div className={classes.root}>
        <Grid>
          <Card className={classes.addresscard}>
            <CardHeader
              classes={{ title: classes.label }}
              title="EDI Configure for States"
            />
            <Divider className={classes.divider} />
            <CardContent>
              <Grid container spacing={24} className={classes.label}>
                <Grid item xs={5}>
                  <TextField
                    id="business"
                    select
                    className={classes.textField}
                    label="Business"
                    value={this.state.businessTypeValue}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChangeService("businessTypeValue")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {this.state.business.map((stateCodeOption, index) => (
                      <MenuItem key={index} value={stateCodeOption}>
                        {stateCodeOption}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                {/* <Grid item xs={2}>
                  <TextField
                    id="Owning"
                    select
                    className={classes.textField}
                    label="Owning Carriers"
                    value={this.state.owningCarrier}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChangeService("owningCarrier")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {this.state.owningCarrierList.map(
                      (stateCodeOption, index) => (
                        <MenuItem key={index} value={stateCodeOption}>
                          {stateCodeOption}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Grid> */}
                <Grid item xs={4}>
                  <TextField
                    id="State_Value"
                    select
                    className={classes.textField}
                    label="State"
                    value={this.state.stateValue}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange("stateValue")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {this.state.states.map((stateCodeOption, index) => (
                      <MenuItem key={index} value={stateCodeOption}>
                        {stateCodeOption}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={3}>
                  {/* <Fab
                    color="primary"
                    disabled={this.validateSelections()}
                    onClick={this.addNewlist}
                    aria-label="Add"
                    className={classes.fab}
                  >
                    <AddIcon />
                  </Fab> */}
                  <Button
                    className={classes.addEdi}
                    /*disabled={this.validateSelections()}*/
                    onClick={this.addNewlist}
                  >
                    ADD EDI Configuration
                  </Button>
                </Grid>
              </Grid>
              <Grid container spacing={24} className={classes.label}>
                <Grid item xs={3}>
                  <TextField
                    id="senderId"
                    className={classes.textField}
                    label="senderId"
                    value={this.state.senderId}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange("senderId")}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="receiverId"
                    className={classes.textField}
                    label="receiverId"
                    value={this.state.receiverId}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange("receiverId")}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="tpaId"
                    className={classes.textField}
                    label="tpaId"
                    value={this.state.tpaId}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange("tpaId")}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="payeeId"
                    className={classes.textField}
                    label="payeeId"
                    value={this.state.payeeId}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange("payeeId")}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24} className={classes.label}>
                <Grid item xs={4}>
                  <TextField
                    id="hiosId"
                    className={classes.textField}
                    label="hiosId"
                    value={this.state.hiosId}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange("hiosId")}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    id="taxId"
                    className={classes.textField}
                    label="taxId"
                    value={this.state.taxId}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange("taxId")}
                  />
                </Grid>

                <Grid item xs={3}>
                  <TextField
                    id="qhpId"
                    className={classes.textField}
                    label="qhpId"
                    value={this.state.qhpId}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange("qhpId")}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* <CardActions> */}
          {/* <Button
            className={classes.clearButton}
            variant="outlined"
            color="secondary"
            onClick={this.clear}
          >
            Delete
          </Button> */}

          {/* </CardActions>
        </Card> */}
          <Grid item xs={11}>
            {panels.map((event, index) => (
              <div key={index}>
                <Paper className={classes.paper}>
                  {`${event.stateValue}'s TPA ID is ${event.tpaId}, HIOS ID is ${event.hiosId}, PAYEE ID ${event.payeeId} SENDER ID is ${event.senderId}, RECEIVER ID is ${event.receiverId}`}
                  <Fab
                    color="primary"
                    deletevalue={index}
                    onClick={this.deletepanels}
                    size="small"
                    aria-label="Delete"
                    className={classes.deletefab}
                  >
                    <DeleteIcon />
                  </Fab>
                </Paper>
              </div>
            ))}
          </Grid>
          <Grid>
            <Button className={classes.button} onClick={this.handleNext}>
              next
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
const ReduxEdi = connect(mapStateToProps)(Edi);
export default withStyles(styles)(ReduxEdi);
