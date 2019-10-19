import { FETCH_ONEXCHANGE_GROUP } from "./types";
function updateOnExchangeGroup(newValue) {
  return {
    type: FETCH_ONEXCHANGE_GROUP,
    payload: { groupOnExchange: newValue }
  };
}
export default updateOnExchangeGroup;
