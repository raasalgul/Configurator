import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Fab from "@material-ui/core/Fab";
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import { CardActions, CardHeader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";

import { serviceURLHost } from "../Configurator/constants/URLs";

const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center"
    //    alignItems: "center",
    //         height: "100vh"
  },
  button: {
    margin: theme.spacing.unit,
    textTransform: "none",
    fontSize: 18,
    padding: "6px 12px",
    backgroundColor: "#1C80B5",
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
    height: 900,
    width: 800
  },
  fab: {
    marginLeft: "-65px"
  },

  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});
const mobile_types = [
  {
    value: "Mobile",
    label: "Mobile"
  },
  {
    value: "Office",
    label: "Office"
  }
];

class AddressDetails extends React.Component {
  state = {
    showmobile: false,
    addresstype: "",
    addressline1: "",
    addressline2: "",
    city: "",
    states: "",
    mtype1: "Mobile",
    mobilenumber1: "",
    mtype2: "Office",
    mobilenumber2: "",
    zip: "",
    email: "",
    website: "",
    addressTypeOption: [],
    stateCodeOption: []
  };

  constructor(props) {
    super(props);
  }
  componentDidMount() {
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
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
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
    this.setState({ mobilenumber1: "" });
    this.setState({ mobilenumber2: "" });
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

  render() {
    const { classes } = this.props;
    const { showmobile } = this.state;
    return (
      //
      <div className={classes.root}>
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
                  {this.state.stateCodeOption.map((stateCodeOption, index) => (
                    <MenuItem key={index} value={stateCodeOption}>
                      {stateCodeOption}
                    </MenuItem>
                  ))}
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

              {/* <Mobile mobilevalue={this.handlemobilevalue}/>
    <Grid item xs={1}>
    {!showmobile && <Fab color="primary"   disabled={showmobile} onClick={this.handlemobilechange} aria-label="Add" className={classes.fab}>
        <AddIcon />              
     </Fab>}
     {showmobile && <Fab color="primary"   disabled={!showmobile} onClick={this.handlemobilechange} aria-label="Add" className={classes.fab}>
        <DeleteIcon />              
     </Fab>}
    </Grid> */}
              {/* <Grid item xs={12}> */}
              <Grid item xs={3} className={classes.mtype}>
                <TextField
                  id="standard-select-contacttype"
                  select
                  className={classes.textField}
                  value={this.state.mtype1}
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChange("mtype1")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {mobile_types.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={8} className={classes.mobilenumber}>
                <TextField
                  id="mobilenumber"
                  variant="outlined"
                  placeholder="Mobile Number"
                  fullWidth
                  className={classes.textField}
                  value={this.state.mobilenumber1}
                  onChange={this.handleChange("mobilenumber1")}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={3} className={classes.mtype}>
                <TextField
                  id="standard-select-contacttype"
                  select
                  className={classes.textField}
                  value={this.state.mtype2}
                  variant="outlined"
                  fullWidth
                  onChange={this.handleChange("mtype2")}
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {mobile_types.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={8} className={classes.mobilenumber}>
                <TextField
                  id="mobilenumber"
                  variant="outlined"
                  placeholder="Mobile Number"
                  fullWidth
                  className={classes.textField}
                  value={this.state.mobilenumber2}
                  onChange={this.handleChange("mobilenumber2")}
                  margin="normal"
                />
              </Grid>
              {/* {showmobile && <Mobile/>} */}
              {/* </Grid>    */}

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
          <CardActions style={{ justifyContent: "center" }}>
            <Grid item xs={11}>
              {/* { this.props.status && */}
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handleaddress}
              >
                Add Address
              </Button>
              {/* }  onClick={this.props.event} */}
              {/* { !this.props.status &&
    <Button  fullWidth variant="contained" color="primary" className={classes.button} onClick={this.props.event}>
        Delete Address
      </Button>} */}
            </Grid>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(AddressDetails);
