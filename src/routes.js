// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import BusinessDetails from "./components/Configurator/BusinessDetails.js";
import LineOfBusiness from "./components/Configurator/LineOfBusiness.js";
import CarrierDetails from "./components/Configurator/CarrierDetails.js";
import StatesOffExchangeIndividual from "./components/Configurator/StatesOffExchangeIndividual.js";
import StatesOnExchangeIndividual from "./components/Configurator/StatesOnExchangeIndividual.js";
import StatesOnExchangeGroup from "./components/Configurator/StatesOnExchangeGroup.js";
import StatesOffExchangeGroup from "./components/Configurator/StatesOffExchangeGroup.js";
import DashboardFirstPage from "./components/Configurator/Home";
import EdiParent from "./components/Configurator/EdiParent.js";
import LegalEntity1 from "./components/legalEntity/LegalEntity";
import LegalEntity2 from "./components/legalEntity/LegalEntity2";
import BankDetailsPage from "./components/Configurator/BankDetailsPage.js";
import CarrierRemittance from "./components/Configurator/CarrierRemittance.js";
import ConfimationPage from "./components/Configurator/ConfimationPage.js";
import Region from "./components/Configurator/Region.js";
const dashboardRoutes = [
  {
    path: "/BankDetailsPage",
    name: "BankDetailsPage",
    icon: Person,
    component: BankDetailsPage,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    on: Dashboard,
    component: DashboardFirstPage,
    layout: "/admin"
  },
  {
    path: "/BusinessDetails",
    name: "Business Details",
    icon: Person,
    component: BusinessDetails,
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
    icon: Person,
    component: LineOfBusiness,
    layout: "/admin"
  },
  {
    path: "/CarrierDetails",
    name: "Carrier Details",
    icon: Person,
    component: CarrierDetails,
    layout: "/admin"
  },
  {
    path: "/StatesOffExchangeIndividual",
    name: "States OffExchange",
    icon: Person,
    component: StatesOffExchangeIndividual,
    layout: "/admin"
  },
  {
    path: "/StatesOnExchangeIndividual",
    name: "States OnExchange",
    icon: Person,
    component: StatesOnExchangeIndividual,
    layout: "/admin"
  },
  {
    path: "/StatesOnExchangeGroup",
    name: "States Group",
    icon: Person,
    component: StatesOnExchangeGroup,
    layout: "/admin"
  },
  {
    path: "/StatesOffExchangeGroup",
    name: "States Group",
    icon: Person,
    component: StatesOffExchangeGroup,
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
    name: "LegalEntity1",
    icon: Person,
    component: LegalEntity1,
    layout: "/admin"
  },
  {
    path: "/LegalEntity2",
    name: "LegalEntity2",
    icon: Person,
    component: LegalEntity2,
    layout: "/admin"
  },
  {
    path: "/ConfimationPage",
    name: "ConfimationPage",
    icon: Person,
    component: ConfimationPage,
    layout: "/admin"
  },
  {
    path: "/Region",
    name: "Region",
    icon: Person,
    component: Region,
    layout: "/admin"
  }
];

export default dashboardRoutes;
