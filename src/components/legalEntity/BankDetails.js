import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardActions, CardHeader } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import axios from "axios";
import MenuItem from "@material-ui/core/MenuItem";

import { serviceURLHost } from "../Configurator/constants/URLs";
const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center"
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
    height: 450,
    width: 800
  },

  divider: {
    margin: `${theme.spacing.unit * 2}px 0`
  }
});

class BankDetails extends React.Component {
  state = {
    accountnumber: "",
    bankAccountInfo: []
  };

  constructor(props) {
    super(props);
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handlebank = e => {
    e.preventDefault();
    this.props.event(this.state);
    this.setState({ accountnumber: "" });
  };
  componentDidMount() {
    axios.get(`${serviceURLHost}/configurator/getBankInfo/${10}`).then(res => {
      const bankAccountInfo = res.data;
      console.log(bankAccountInfo);
      this.setState({ bankAccountInfo });
    });
  }
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
        <Card className={classes.addresscard}>
          <CardHeader classes={{ title: classes.label }} title="Bank Details" />
          <Divider className={classes.divider} />
          <CardContent>
            <Grid container spacing={24} className={classes.label}>
              <Grid item xs={11}>
                <TextField
                  select
                  id="Account Number"
                  variant="outlined"
                  label="Account Number"
                  className={classes.textField}
                  fullWidth
                  value={this.state.accountnumber}
                  onChange={this.handleChange("accountnumber")}
                  margin="normal"
                >
                  {this.state.bankAccountInfo.map((bankAccount, index) => (
                    <MenuItem key={index} value={bankAccount}>
                      {bankAccount}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions style={{ justifyContent: "center" }}>
            <Grid item xs={11}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this.handlebank}
              >
                Add Bank Details
              </Button>
            </Grid>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(BankDetails);
