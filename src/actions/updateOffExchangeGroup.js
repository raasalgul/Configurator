import { FETCH_OFFEXCHANGE_GROUP } from "./types";
function updateOffExchangeGroup(newValue) {
  return {
    type: FETCH_OFFEXCHANGE_GROUP,
    payload: { groupOffExchange: newValue }
  };
}
export default updateOffExchangeGroup;
