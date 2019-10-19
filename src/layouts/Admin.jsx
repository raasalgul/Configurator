/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
// import PerfectScrollbar from "/perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Navbar from "../components/Navbars/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";

import routes from "../routes.js";

import dashboardStyle from "../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "../assets/img/configurator-sidebar.jpg";
import logo from "../assets/img/reactlogo.png";

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import BusinessDetails from "../components/Configurator/BusinessDetails.js";
import LineOfBusiness from "../components/Configurator/LineOfBusiness.js";
import CarrierDetails from "../components/Configurator/CarrierDetails.js";
import StatesOffExchangeIndividual from "../components/Configurator/StatesOffExchangeIndividual.js";
import StatesOnExchangeIndividual from "../components/Configurator/StatesOnExchangeIndividual.js";
import DashboardFirstPage from "../components/Configurator/Home";
import EdiParent from "../components/Configurator/EdiParent.js";
import LegalEntity1 from "../components/legalEntity/LegalEntity";
import { connect } from "react-redux";
import StatesOnExchangeGroup from "../components/Configurator/StatesOnExchangeGroup.js";
import StatesOffExchangeGroup from "../components/Configurator/StatesOffExchangeGroup.js";
import BankDetailsPage from "../components/Configurator/BankDetailsPage.js";
import CarrierRemittance from "../components/Configurator/CarrierRemittance.js";
import ConfimationPage from "../components/Configurator/ConfimationPage.js";
// core components/views for RTL layout
let dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    //rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardFirstPage,
    layout: "/admin"
  },

  {
    path: "/CarrierDetails",
    name: "Carrier Details",
    //rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: CarrierDetails,
    layout: "/admin"
  },
  {
    path: "/BusinessDetails",
    name: "Business Details",
    //rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: BusinessDetails,
    layout: "/admin"
  },

  {
    path: "/StatesOffExchangeIndividual",
    name: "States",
    //rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: StatesOffExchangeIndividual,
    layout: "/admin"
  },
  {
    path: "/BankDetailsPage",
    name: "BankDetailsPage",
    icon: Person,
    component: BankDetailsPage,
    layout: "/admin"
  },
  {
    path: "/CarrierRemittance",
    name: "CarrierRemittance",
    icon: Person,
    component: CarrierRemittance,
    layout: "/admin"
  },
  {
    path: "/LineOfBusiness",
    name: "Line Of Business",
    //rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: LineOfBusiness,
    layout: "/admin"
  },
  {
    path: "/EdiParent",
    name: "EDI",
    icon: Person,
    component: EdiParent,
    layout: "/admin"
  },
  {
    path: "/LegalEntity",
    name: "LegalEntity",
    icon: Person,
    component: LegalEntity1,
    layout: "/admin"
  },
  {
    path: "/ConfimationPage",
    name: "ConfimationPage",
    icon: Person,
    component: ConfimationPage,
    layout: "/admin"
  }
];

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
    })}
  </Switch>
);
class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: image,
      color: "blue",
      hasImage: true,
      fixedClasses: "dropdown show",
      mobileOpen: false
    };
  }
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/admin/maps";
  }
  resizeFunction = () => {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  };
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      //const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    dashboardRoutes.map(event => {
      if (event.name === "States") {
        if (this.props.individualOnExchange) {
          event.component = StatesOnExchangeIndividual;
          event.path = "/StatesOnExchangeIndividual";
        } else if (this.props.individualOffExchange) {
          event.component = StatesOffExchangeIndividual;
          event.path = "/StatesOffExchangeIndividual";
        } else if (this.props.groupOnExchange) {
          event.component = StatesOnExchangeGroup;
          event.path = "/StatesOnExchangeGroup";
        } else if (this.props.groupOffExchange) {
          event.component = StatesOffExchangeGroup;
          event.path = "/StatesOffExchangeGroup";
        }
      }
      // if(event.name === 'Carrier Details' && this.props.carrierName)
      // {

      //   event.name = `Carrier Details  ${this.props.individualOffExchange}`;
      // }
    });
    const dash = dashboardRoutes;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dash}
          logoText={"Configurator"}
          logo={logo}
          image={this.state.image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color={this.state.color}
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Navbar
            routes={dash}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {/* {this.getRoute() ? <Footer /> : null} */}
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  carrierCode: state.carrierCode,
  carrierName: state.carrierName,
  individualOnExchange: state.individualOnExchange,
  individualOffExchange: state.individualOffExchange,
  groupOffExchange: state.groupOffExchange,
  groupOnExchange: state.groupOnExchange
});

const ReduxDashboard = connect(mapStateToProps)(DashboardPage);

export default withStyles(dashboardStyle)(ReduxDashboard);
