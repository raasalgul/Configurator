import { FETCH_ONEXCHANGE_INDIVIDUAL } from "./types";
function updateOnExchangeIndividual(newValue) {
  return {
    type: FETCH_ONEXCHANGE_INDIVIDUAL,
    payload: { individualOnExchange: newValue }
  };
}
export default updateOnExchangeIndividual;
