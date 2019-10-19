import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardDisplay from "./Card";
import { connect } from "react-redux";
import axios from "axios";
import { serviceURLHost } from "./constants/URLs";
const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center"
  },
  fab: {
    marginLeft: "90px",
    marginTop: "45px"
  },

  clearButton: {
    margin: theme.spacing.unit * 2,
    width: 175,
    height: 50,
    fontSize: "14px",
    float: "left"
    // position: "absolute",
    // bottom: "2rem",
    // left: "2rem"
  },
  paper: {
    textAlign: "center",
    padding: theme.spacing.unit * 2.5,
    border: 2,
    borderColor: "#090909",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "24px",

    color: "#1C80B5"
  },
  label: {
    alignItems: "center",

    margin: theme.spacing.unit * 2,

    width: 800
  }
});
class Home extends React.Component {
  state = {
    cards: [],
    carrier_code: "",
    carrier_name: "",
    carrier_id: ""
  };
  componentDidMount() {
    let cards = [];
    axios.get(`${serviceURLHost}/Carrier/getCarriers`).then(result => {
      result.data.map(card => {
        console.log(
          `data1 =` +
            card.carrier_code +
            ` data2 =` +
            card.carrier_full_name +
            `data3 =` +
            card.carrier_id
        );
        let temp = {
          carrier_name: card.carrier_full_name,
          carrier_code: card.carrier_code,
          carrier_id: card.carrier_id
        };
        cards.push(temp);
      });
      this.setState({ cards });
    });
  }
  handle = () => {
    this.props.history.push(`/admin/CarrierDetails`);
  };
  handleClick = () => {
    this.props.history.push(`/admin/ConfimationPage`);
  };
  render() {
    const { classes } = this.props;
    console.log(this.props);
    return (
      <div className={classes.paper}>
        {/* <Paper className={classes.paper}> */}
        Welcome To Configurator Use This Screen To Manage and Add New Carriers
        {/* </Paper> */}
        <br />
        <br />
        <div
          className={classes.root}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            // height: "70vh"
          }}
        >
          <Grid container xs={24}>
            {this.state.cards.map(card => (
              <Grid item xs={3}>
                <CardDisplay
                  key={card.carrier_code}
                  LocalcarrierCode={card.carrier_code}
                  LocalCarrierName={card.carrier_name}
                  LocalCarrierId={card.carrier_id}
                  handleClick={this.handleClick}
                  selected={true}
                />
              </Grid>
            ))}
            <Grid item xs={3}>
              <Fab
                size="large"
                aria-label="Add"
                onClick={this.handle}
                className={classes.fab}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </Grid>
        </div>
        {/* <Button
          className={classes.clearButton}
          variant="outlined"
          color="secondary"
          onClick={this.clear}
        >
          Delete
        </Button> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

const Reduxhome = connect(mapStateToProps)(Home);
export default withStyles(styles)(Reduxhome);
