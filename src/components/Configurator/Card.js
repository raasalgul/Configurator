import React from "react";
import { Button } from "@material-ui/core";
//import carrierCodeReducer from "../reducers/carrierCodeReducer"
import updateCarrierCode from "../../actions/updateCarrierCode";
import updateCarrierName from "../../actions/updateCarrierName";
import { connect } from "react-redux";
import updateCarrierId from "../../actions/updateCarrierId";
import axios from "axios";
import { serviceURLHost } from "./constants/URLs";
class CardDefine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LocalcarrierCode: this.props.LocalcarrierCode,
      LocalCarrierName: this.props.LocalCarrierName,
      LocalCarrierId: this.props.LocalCarrierId
    };
  }

  handleUpdateCarrierCode = () => {
    this.props.handleUpdateCarrierCode(this.state.LocalcarrierCode);
  };
  handleUpdateCarrierName = () => {
    this.props.handleUpdateCarrierName(this.state.LocalCarrierName);
  };
  // handleUpdateCarrierId = res => {
  //   this.props.handleUpdateCarrierId(res);
  // };
  handleUpdateCarrierId = () => {
    this.props.handleUpdateCarrierId(this.state.LocalCarrierId);
  };
  handle = () => {
    this.handleUpdateCarrierCode();
    this.handleUpdateCarrierName();
    // axios
    //   .get(
    //     `${serviceURLHost}/Carrier/getCarrierId/${this.props.LocalcarrierCode}/${this.props.LocalCarrierName}`
    //   )
    //   .then(res => {
    //     console.log("Carrier Id res" + res);
    //     console.log("Carrier Id res data" + res.data);
    //     const LocalCarrierId = res.data;
    //     console.log("Carrier Id direct".LocalCarrierId);
    //     // console.log("Carrier Id in direct".LocalCarrierId.data);
    //     this.setState({ LocalCarrierId });
    //     this.handleUpdateCarrierId(res.data);
    //   });
    this.handleUpdateCarrierId();
    this.props.handleClick();
  };
  render() {
    return (
      <div>
        <Button
          style={{
            width: 200,
            margin: 25,
            fontFamily: "'Roboto",
            backgroundColor: "#CCCCCC",
            color: "#1C80B5",
            textAlign: "center",
            fontSize: 9
          }}
          onClick={this.handle}
        >
          <h1>{this.state.LocalCarrierName}</h1>
          <br />
          <h1>({this.state.LocalcarrierCode})</h1>
        </Button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};
const mapActionToProps = {
  handleUpdateCarrierCode: updateCarrierCode,
  handleUpdateCarrierName: updateCarrierName,
  handleUpdateCarrierId: updateCarrierId
};
export default connect(
  mapStateToProps,
  mapActionToProps
)(CardDefine);
