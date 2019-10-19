import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import DeleteIcon from "@material-ui/icons/Delete";
import MenuItem from "@material-ui/core/MenuItem";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import axios from "axios";

import { serviceURLHost } from "../Configurator/constants/URLs";
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
    width: 1160,
    border: 2,
    borderColor: "#090909"
  },
  button: {
    // position: "absolute",
    // bottom: "2rem",
    // right: "2rem",
    // justifyContent: "center",
    // margin: theme.spacing.unit * 2,
    // backgroundColor: "#1C80B5",
    // width: 125,
    // //height: 50,
    // fontSize: "14px",
    // color: "#ffffff"
    justifyContent: "center",
    margin: theme.spacing.unit * 2,
    backgroundColor: "#1C80B5",
    width: 125,
    height: 40,
    float: "right",
    fontSize: "14px",
    color: "#ffffff"
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
    marginLeft: "180px",
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
    border: 2,
    width: 1160,
    borderColor: "#090909",
    marginBottom: "15px"
  },
  addresscard: {
    height: 300,
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
class LegalEntity2 extends React.Component {
  state = {
    legalEntity: "",
    businessTypeValue: "",
    state: "",
    productType: "",
    productcode: "",
    legal_entity_option: [],
    states_option: [],
    product_option: [],
    product_type_option: [],
    panels: [],
    business: []
  };
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    axios
      .get(
        `${serviceURLHost}/configurator/getLegalEntityNames/${this.props.carrierId}`
      )
      .then(res => {
        const legal_entity_option = res.data;
        console.log(legal_entity_option);
        this.setState({ legal_entity_option });
      });
    // axios
    //   .get(
    //     `${serviceURLHost}/configurator/getAllLegalEntityStates/${
    //       this.props.carrierId
    //     }`
    //   )
    //   .then(res => {
    //     const states_option = res.data;
    //     console.log(states_option);
    //     this.setState({ states_option });
    //   });
    axios
      .get(
        `${serviceURLHost}/configurator/getAllProducts/${this.props.carrierId}`
      )
      .then(res => {
        const product_option = res.data;
        console.log(product_option);
        this.setState({ product_option });
      });
    axios.get(`${serviceURLHost}/configurator/getAllProductType`).then(res => {
      const product_type_option = res.data;
      console.log(product_type_option);
      this.setState({ product_type_option });
    });
    axios
      .get(
        `${serviceURLHost}/configurator/getBusinessType/${this.props.carrierId}`
      )
      .then(res => {
        const business = res.data;
        console.log(business);
        this.setState({ business });
      });
  }
  addNewlist = () => {
    const {
      businessTypeValue,
      legalEntity,
      state,
      productType,
      productcode,
      panels
    } = this.state;
    panels.push({
      businessTypeValue,
      legalEntity,
      state,
      productType,
      productcode
    });
    this.setState({ panels });
  };
  handleLegalEntity = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleStates = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleProduct = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleProductType = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleNext = () => {
    const { panels } = this.state;
    const post = {
      carrier_id: this.props.carrierId,
      legalEntityChild: panels
    };
    console.log(JSON.stringify(post));
    fetch(`${serviceURLHost}/configurator/addLegalEntity2`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => console.log(data));
    this.props.history.push(`/admin/ConfimationPage`);
    console.log({ panels });
  };
  validateSelections = () => {
    const { legalEntity, state, productType, productcode } = this.state;
    return !legalEntity || !state || !productType || !productcode;
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
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
        //   const state = res;
        //   console.log(state);
        //   // this.setState({ state });
        // })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          this.setState({ states_option: data });
        });
    }
  };
  deletepanels = event => {
    const { panels } = this.state;
    var index = event.currentTarget.attributes.deletevalue.nodeValue;
    console.log(event.currentTarget.attributes.deletevalue.nodeValue);
    panels.splice(index, 1);
    this.setState({ panels });
  };
  render() {
    const { classes } = this.props;
    const { legalEntity, state, productType, productcode, panels } = this.state;
    return (
      <div className={classes.root}>
        <Grid>
          <Card className={classes.addresscard}>
            <CardHeader
              classes={{ title: classes.label }}
              title="Configure Legal Entity and Prod Type"
            />
            <Divider className={classes.divider} />
            <CardContent>
              <Grid container spacing={24} className={classes.label}>
                <Grid item xs={2}>
                  <TextField
                    id="Legal_Entity"
                    select
                    className={classes.textField}
                    label="Legal Entity"
                    value={this.state.legalEntity}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleLegalEntity("legalEntity")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {this.state.legal_entity_option.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="business"
                    select
                    className={classes.textField}
                    label="Business"
                    value={this.state.businessTypeValue}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleChange("businessTypeValue")}
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
                <Grid item xs={2}>
                  <TextField
                    id="State_Value"
                    select
                    className={classes.textField}
                    label="State"
                    value={this.state.state}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleStates("state")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {this.state.states_option.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={2}>
                  <TextField
                    id="Product"
                    select
                    className={classes.textField}
                    label="Product"
                    value={this.state.productType}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleProduct("productType")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {this.state.product_option.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="Designer"
                    select
                    className={classes.textField}
                    label="Product_Type"
                    value={this.state.productcode}
                    variant="outlined"
                    fullWidth
                    onChange={this.handleProductType("productcode")}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                  >
                    {this.state.product_type_option.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={1}>
                  <Fab
                    color="primary"
                    disabled={this.validateSelections()}
                    onClick={this.addNewlist}
                    aria-label="Add"
                    className={classes.fab}
                  >
                    <AddIcon />
                  </Fab>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Grid item xs={11}>
            {panels.map((event, index) => (
              <div key={index}>
                <Paper className={classes.paper}>
                  {`${event.legalEntity} in ${event.state} sells ${event.productType} and configured as Prod_Type ${event.productcode}`}
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
const ReduxLegalEntity2 = connect(mapStateToProps)(LegalEntity2);
export default withStyles(styles)(ReduxLegalEntity2);
