import { FETCH_OFFEXCHANGE_INDIVIDUAL } from "./types";
function updateOffExchangeIndividual(newValue) {
  return {
    type: FETCH_OFFEXCHANGE_INDIVIDUAL,
    payload: { individualOffExchange: newValue }
  };
}
export default updateOffExchangeIndividual;
