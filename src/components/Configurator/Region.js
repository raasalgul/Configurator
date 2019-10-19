import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { serviceURLHost } from "./constants/URLs";
import axios from "axios";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    textTransform: "none",
    fontSize: 18,
    padding: "6px 12px",
    backgroundColor: "#1C80B5",
    color: "#ffffff",
    justifyContent: "center"
  }
});
class Region extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regionValue: "",
      regionDetials: [
        { regionId: "9", region: "DB2A", environment: "DEV" },
        { regionId: "10", region: "DB2J", environment: "DEV" }
      ]
    };
  }

  //TODO: must uncomment when giving the code.

  // componentDidMount() {
  //   let regionDetials = [];
  //   axios
  //     .get(`${serviceURLHost}/ConfirmationPage/getAvailableEnvironment`)
  //     .then(result => {
  //       result.data.map(regionDetails => {
  //         console.log(
  //           `data1 =` +
  //             regionDetails.region +
  //             ` data2 =` +
  //             regionDetails.environment
  //         );
  //         let temp = {
  //           regionId: regionDetails.regionId,
  //           region: regionDetails.region,
  //           environment: regionDetails.environment
  //         };
  //         regionDetials.push(temp);
  //       });
  //       this.setState({ regionDetials });
  //     });
  // }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  handleSubmit = () => {
    let res = this.state.regionValue.split(".");
    //console.log(res[0]);
    let regionId;
    this.state.regionDetials.map(regionDetail => {
      if (
        res[0] === regionDetail.region &&
        res[1] === regionDetail.environment
      ) {
        console.log(`Region is ${regionDetail.regionId}`);
        regionId = regionDetail.regionId;
      }
    });
    axios
      .get(
        `${serviceURLHost}/ConfirmationPage/getProcessorManager/${this.props.carrierId}/${regionId}`
      )
      .then(result => {
        console.log(result);
        alert(result.data.STATUS);
        this.props.history.push(`/admin/region`);
      });
  };
  render() {
    return (
      <div>
        <Select
          native
          value={this.state.regionValue}
          onChange={this.handleChange("regionValue")}
          inputProps={{
            name: "regionValue",
            id: "regionValue"
          }}
        >
          {this.state.regionDetials.map(regionInfo => (
            <option>
              {regionInfo.region}.{regionInfo.environment}
            </option>
          ))}
        </Select>

        <Button
          style={{
            //margin: theme.spacing.unit,
            textTransform: "none",
            fontSize: 18,
            padding: "6px 12px",
            backgroundColor: "#1C80B5",
            color: "#ffffff",
            justifyContent: "right",
            alignItems: "right",
            marginLeft: "50px"
          }}
          onClick={this.handleSubmit}
        >
          Submit
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  carrierCode: state.carrierCode,
  carrierName: state.carrierName,
  carrierId: state.carrierId
});

const ReduxRegion = connect(mapStateToProps)(Region);
export default withStyles(styles)(ReduxRegion);
