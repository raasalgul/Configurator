import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { CardActions, CardHeader } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import { serviceURLHost } from "./constants/URLs";
const styles = theme => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center"
  },
  HPSBlue: {
    backgroundColor: "#1C80B5",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "18px",
    margin: theme.spacing.unit * 3,
    width: 175,
    color: "#FFFFF"
  },
  button: {
    margin: theme.spacing.unit,
    textTransform: "none",
    fontSize: 18,
    padding: "6px 12px",
    backgroundColor: "#05EDF8",
    justifyContent: "center"
  },
  clearButton: {
    margin: theme.spacing.unit * 2,
    width: 175,
    // height: 50,
    fontSize: "14px"
  },
  nextbutton: {
    margin: theme.spacing.unit * 2,
    marginLeft: 200,
    textTransform: "none",
    fontSize: 18,
    width: 175,
    height: 40,
    backgroundColor: "#1C80B5",
    color: "#ffffff",
    justifyContent: "center"
  },
  default: {
    backgroundColor: "#F0F0F0",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "18px",
    width: 175,
    margin: theme.spacing.unit * 3,
    color: "#999794"
  },
  label: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontSize: "25px",
    //textAlign: "center",
    margin: theme.spacing.unit * 2,
    color: "#1C80B5"
  },

  card: {
    //textAlign: "center",
    // marginTop: 500,
    height: 380,
    width: 800
  }
});
class LineOfBusiness extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line_of_business_option: [],
      lob: []
    };
  }

  componentDidMount() {
    axios.get(`${serviceURLHost}/LOBAPI/getLineOfBusiness`).then(res => {
      const line_of_business_option = res.data;
      console.log(line_of_business_option);
      this.setState({ line_of_business_option });
    });
  }

  handleChange = () => {
    const { lob } = this.state;

    const post = {
      carrier_name: this.props.carrierName,
      lob
    };
    console.log(JSON.stringify(post));
    fetch(`${serviceURLHost}/LOBAPI/addLineOfBusiness/`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(post)
    })
      .then(res => res.json())
      .then(data => console.log(data));
    this.props.history.push(`/admin/EdiParent`);
    console.log({ post });
  };

  handleaddlob = event => {
    const { lob } = this.state;
    var values = event.currentTarget.attributes.lobvalue.nodeValue;

    var myBoolean = lob.includes(values);
    if (myBoolean) {
      var index = lob.indexOf(values);
      if (index !== -1) lob.splice(index, 1);
    } else {
      lob.push(values);
    }

    this.setState({ lob });
  };
  handleremovealllob = () => {
    const { lob } = this.state;
    lob.splice(0, lob.length);
    this.setState({ lob });
  };
  render() {
    const { classes } = this.props;
    const { line_of_business_option, lob } = this.state;
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
            title="Line of Business"
          >
            >
          </CardHeader>
          <Divider variant="middle" />
          <CardContent>
            <Grid container spacing={3}>
              {line_of_business_option.map((option, index) => (
                <div key={index}>
                  <Grid item xs={4} sm={3}>
                    <Button
                      key={index}
                      lobvalue={option}
                      variant="outlined"
                      className={
                        lob.includes(option) ? classes.HPSBlue : classes.default
                      }
                      onClick={this.handleaddlob}
                    >
                      {option}
                    </Button>
                  </Grid>
                </div>
              ))}
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={3}>
                <Button
                  className={classes.clearButton}
                  variant="outlined"
                  color="secondary"
                  onClick={this.handleremovealllob}
                >
                  Clear All
                </Button>
              </Grid>
              <Grid item xs={6} sm={3} />
              <Grid item xs={2} sm={3}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.nextbutton}
                  onClick={this.handleChange}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  carrierCode: state.carrierCode,
  carrierName: state.carrierName
});
const ReduxLineOfBusiness = connect(mapStateToProps)(LineOfBusiness);
export default withStyles(styles)(ReduxLineOfBusiness);
