import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import { connect } from "react-redux";
import axios from "axios";
import Button from "@material-ui/core/Button";
import { serviceURLHost } from "./constants/URLs";
import { statesYellowColor } from "./constants/URLs";
const styles = theme => ({
  HPSBlue: {
    backgroundColor: "#1C80B5",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "18px",
    margin: theme.spacing.unit,
    color: "#FFFFF"
  },
  HPSYellow: {
    backgroundColor: "#F9AA1F",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "18px",
    margin: theme.spacing.unit,
    color: "#FFFFF"
  },
  defaultcolor: {
    backgroundColor: "#F0F0F0",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "18px",
    margin: theme.spacing.unit,
    color: "#999794"
  },
  clearButton: {
    margin: theme.spacing.unit * 2,
    width: 200,
    height: 50,
    fontSize: "14px"
  },
  nextButton: {
    margin: theme.spacing.unit * 2,
    backgroundColor: "#1C80B5",
    width: 150,
    height: 50,
    fontSize: "14px",
    color: "#ffffff"
  },
  button: {
    margin: theme.spacing.unit,
    textTransform: "none",
    fontSize: 18,
    padding: "6px 12px",
    backgroundColor: "#05EDF8",
    justifyContent: "center"
  },
  label: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "20px",
    margin: theme.spacing.unit * 2,
    color: "#1C80B5"
  },
  card: {
    maxWidth: 1080
  }
});
class StatesOnExchangeIndividual extends React.Component {
  state = {
    state_option: [],

    carrier_name: this.props.carrierName,
    business_sub_type: "on_exchange",
    business_type: "",
    carrierStateType: [],
    states: []
  };
  checkOptionColor = option => {
    console.log("Inside check color ".option);
    if (statesYellowColor.includes(option)) return true;
    else return false;
  };
  componentDidMount() {
    axios.get(`${serviceURLHost}/StateAPI/allStates`).then(res => {
      const state_option = res.data;
      console.log(state_option);
      this.setState({ state_option });
    });
  }
  handleChange = () => {
    const {
      carrier_name,
      business_type,
      business_sub_type,
      states
    } = this.state;
    const post = {
      carrier_name: this.props.carrierName,
      carrierStateType: [
        {
          business_type: "individual",
          business_sub_type: "on_exchange",
          states
        }
      ]
    };
    console.log(JSON.stringify(post));
    fetch(`${serviceURLHost}/StateAPI/addStates/`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => console.log(data));
    // this.props.history.push(``);
    console.log({ post });

    if (this.props.groupOffExchange === true)
      this.props.history.push(`/admin/StatesOffExchangeGroup`);
    else if (this.props.groupOnExchange === true)
      this.props.history.push(`/admin/StatesOnExchangeGroup`);
    else if (this.props.individualOnExchange === true)
      this.props.history.push(`/admin/BankDetailsPage`);
  };
  handleaddstates = event => {
    const { states } = this.state;
    var values = event.currentTarget.attributes.statevalue.nodeValue;
    console.log(event.currentTarget);
    var myBoolean = states.includes(values);
    if (myBoolean) {
      var index = states.indexOf(values);
      if (index !== -1) states.splice(index, 1);
    } else {
      states.push(values);
    }

    this.setState({ states });
  };
  handleremoveallStates = () => {
    const { states } = this.state;
    states.splice(0, states.length);
    this.setState({ states });
  };
  render() {
    const { classes } = this.props;
    const { state_option, states } = this.state;

    return (
      <div
        className={classes.root}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "70vh"
        }}
      >
        <Card className={classes.card}>
          <CardHeader
            classes={{ title: classes.label }}
            title="States the service available On exchange for individual"
          />
          <Divider variant="middle" />
          <CardContent>
            <Grid container spacing={24}>
              {state_option.map((option, index) => (
                <div key={index}>
                  <Grid item xs={2}>
                    <Button
                      key={index}
                      statevalue={option}
                      className={
                        this.checkOptionColor(option)
                          ? states.includes(option)
                            ? classes.HPSYellow
                            : classes.defaultcolor
                          : states.includes(option)
                          ? classes.HPSBlue
                          : classes.defaultcolor
                      }
                      onClick={this.handleaddstates}
                    >
                      {option}
                    </Button>
                  </Grid>
                </div>
              ))}
            </Grid>
          </CardContent>
          <Grid>
            <CardActions>
              <Button
                className={classes.clearButton}
                variant="outlined"
                color="secondary"
                onClick={this.handleremoveallStates}
              >
                Clear All
              </Button>
              <Grid
                container
                alignItems="flex-start"
                justify="flex-end"
                direction="row"
              >
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.nextButton}
                  onClick={this.handleChange}
                >
                  Next
                </Button>
              </Grid>
            </CardActions>
          </Grid>
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

const ReduxStatesOnExchangeIndividual = connect(mapStateToProps)(
  StatesOnExchangeIndividual
);
export default withStyles(styles)(ReduxStatesOnExchangeIndividual);
