import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import FormLabel from "@material-ui/core/FormLabel";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import updateCarrierCode from "../../actions/updateCarrierCode";
import { connect } from "react-redux";
import updateOffExchangeGroup from "../../actions/updateOffExchangeGroup";
import updateOnExchangeGroup from "../../actions/updateOnExchangeGroup";
import axios from "axios";
import { serviceURLHost } from "./constants/URLs";
import updateOnExchangeIndividual from "../../actions/updateOnExchangeIndividual";
import updateOffExchangeIndividual from "../../actions/updateOffExchangeIndividual";
const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0,0,0,.03)",
    borderBottom: "1px solid rgba(0,0,0,.125)"
  }
})(props => <MuiExpansionPanelSummary {...props} />);

ExpansionPanelSummary.muiName = "ExpansionPanelSummary";

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing.unit
  }
}))(MuiExpansionPanelDetails);

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex"
    //justifyContent: "center"
    //    alignItems: "center",
    //         height: "100vh"
  },
  HPSBlue: {
    backgroundColor: "#1C80B5",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "18px",
    margin: theme.spacing.unit,
    color: "#FFFFF"
  },
  default: {
    backgroundColor: "#F0F0F0",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "18px",
    margin: theme.spacing.unit,
    color: "#999794"
  },
  nextButton: {
    backgroundColor: "#1C80B5",
    width: 150,
    height: 40,
    fontSize: "14px",
    position: "absolute",
    bottom: "2rem",
    right: "2rem",
    color: "#ffffff"
  },
  label: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "30px",
    textAlign: "center",
    margin: theme.spacing.unit * 2
  },
  clearButton: {
    margin: theme.spacing.unit * 2,
    width: 150,
    height: 40,
    fontSize: "14px",
    //float: "left"
    position: "absolute",
    bottom: "2rem",
    left: "2rem"
  }
});

class ContainedButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      individual: false,
      individualOnExchange: false,
      individualOffExchange: false,
      groupOnExchange: false,
      groupOffExchange: false,
      group: false,
      individualCarrierCode: "",
      groupCarrierCode: "",
      expanded: "panel1"
    };
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleUpdateIndividualOffExchange = () => {
    this.props.handleUpdateIndividualOffExchange(
      this.state.individualOffExchange
    );
  };
  handleUpdateGroupOffExchange = () => {
    this.props.handleUpdateGroupOffExchange(this.state.groupOffExchange);
  };
  handleUpdateIndividualOnExchange = () => {
    this.props.handleUpdateIndividualOnExchange(
      this.state.individualOnExchange
    );
  };
  handleUpdateGroupOnExchange = () => {
    this.props.handleUpdateGroupOnExchange(this.state.groupOnExchange);
  };
  handleSubmit = e => {
    e.preventDefault();
    let individualArray = [],
      groupArray = [];
    if (this.state.individualOnExchange === true)
      individualArray.push(`on_exchange`);
    if (this.state.individualOffExchange === true)
      individualArray.push(`off_exchange`);
    if (this.state.groupOnExchange === true) groupArray.push(`on_exchange`);
    if (this.state.groupOffExchange === true) groupArray.push(`off_exchange`);
    const post = {
      carriername: this.props.carrierName,
      individual: individualArray,
      group: groupArray
    };
    console.log(JSON.stringify(post));
    this.handleUpdateIndividualOffExchange();
    this.handleUpdateGroupOffExchange();
    this.handleUpdateIndividualOnExchange();
    this.handleUpdateGroupOnExchange();
    fetch(`${serviceURLHost}/CarrierBusinessAPI/addCarrierBusiness/`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => console.log(data));
    if (this.state.individualOffExchange === true)
      this.props.history.push(`/admin/StatesOffExchangeIndividual`);
    else if (this.state.individualOnExchange === true)
      this.props.history.push(`/admin/StatesOnExchangeIndividual`);
    else if (this.state.groupOnExchange === true)
      this.props.history.push(`/admin/StatesOnExchangeGroup`);
    else if (this.state.groupOffExchange === true)
      this.props.history.push(`/admin/StatesOffExchangeGroup`);
    else alert("Please choose your business type !!");
  };
  changeIndividual = () => {
    if (this.state.individual === true) {
      this.setState({ individual: false });
      this.setState({ individualOffExchange: false });
      this.setState({ individualOnExchange: false });
    } else this.setState({ individual: true });
  };
  changeIndividualOnExchange = () => {
    if (this.state.individualOnExchange === true)
      this.setState({ individualOnExchange: false });
    else {
      this.setState({ individualOnExchange: true });
    }
  };
  changeIndividualOffExchange = () => {
    if (this.state.individualOffExchange === true)
      this.setState({ individualOffExchange: false });
    else {
      this.setState({ individualOffExchange: true });
    }
  };
  changeGroup = () => {
    if (this.state.group === true) {
      this.setState({ group: false });
      this.setState({ groupOnExchange: false });
      this.setState({ groupOffExchange: false });
    } else {
      this.setState({ group: true });
    }
  };
  changeGroupOnExchange = () => {
    if (this.state.groupOnExchange === true)
      this.setState({ groupOnExchange: false });
    else {
      this.setState({ groupOnExchange: true });
    }
  };
  changeGroupOffExchange = () => {
    if (this.state.groupOffExchange === true)
      this.setState({ groupOffExchange: false });
    else {
      this.setState({ groupOffExchange: true });
    }
  };
  clear = () => {
    // axios
    //   .delete(
    //     `http://10.24.46.202:8080/businessapi/deleteBusinessType/${
    //       this.props.carrierName
    //     }`
    //   )
    //   .then(res => res.json())
    //   .then(data => console.log(data));
  };
  render() {
    const { classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <FormLabel className={classes.label} component="legend">
          Please Choose your Business Type
        </FormLabel>

        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "70vh" }}
        >
          <MuiExpansionPanel>
            <ExpansionPanelSummary onClick={this.changeIndividual}>
              <Button
                variant="outlined"
                onClick={this.changeIndividual}
                className={
                  this.state.individual === true
                    ? classes.HPSBlue
                    : classes.default
                }
              >
                individual
              </Button>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Fade in={this.state.individual}>
                <div style={{ width: 770 }}>
                  {/* <p style={{ color: "#255f90" }}> On or Of Exchange ?</p> */}
                  <Button
                    variant="outlined"
                    onClick={this.changeIndividualOnExchange}
                    className={
                      this.state.individualOnExchange === true
                        ? classes.HPSBlue
                        : classes.default
                    }
                  >
                    On Exchange
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={this.changeIndividualOffExchange}
                    className={
                      this.state.individualOffExchange === true
                        ? classes.HPSBlue
                        : classes.default
                    }
                  >
                    Off Exchange
                  </Button>
                </div>
              </Fade>
            </ExpansionPanelDetails>
          </MuiExpansionPanel>
          <MuiExpansionPanel>
            <ExpansionPanelSummary onClick={this.changeGroup}>
              <Button
                variant="outlined"
                onClick={this.changeGroup}
                className={
                  this.state.group === true ? classes.HPSBlue : classes.default
                }
              >
                Group
              </Button>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Fade in={this.state.group}>
                <div style={{ width: 770 }}>
                  {/* <p style={{ color: "#255f90" }}>Carrier Code for Group</p> */}
                  <Button
                    variant="outlined"
                    onClick={this.changeGroupOnExchange}
                    className={
                      this.state.groupOnExchange === true
                        ? classes.HPSBlue
                        : classes.default
                    }
                  >
                    On Exchange
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={this.changeGroupOffExchange}
                    className={
                      this.state.groupOffExchange === true
                        ? classes.HPSBlue
                        : classes.default
                    }
                  >
                    Off Exchange
                  </Button>
                </div>
              </Fade>
            </ExpansionPanelDetails>
          </MuiExpansionPanel>
        </Grid>
        <Grid
          container
          alignItems="flex-start"
          justify="flex-end"
          direction="row"
        >
          <Button type="submit" className={classes.nextButton}>
            Next
          </Button>
        </Grid>
        <Button
          className={classes.clearButton}
          variant="outlined"
          color="secondary"
          onClick={this.clear}
        >
          Delete
        </Button>
      </form>
    );
  }
}
const mapStateToProps = state => ({
  carrierCode: state.carrierCode,
  carrierName: state.carrierName
});
const mapActionToProps = {
  handleUpdateGroupOffExchange: updateOffExchangeGroup,
  handleUpdateGroupOnExchange: updateOnExchangeGroup,
  handleUpdateIndividualOnExchange: updateOnExchangeIndividual,
  handleUpdateIndividualOffExchange: updateOffExchangeIndividual
};
const BusinessDetails = connect(
  mapStateToProps,
  mapActionToProps
)(ContainedButtons);
export default withStyles(styles)(BusinessDetails);
