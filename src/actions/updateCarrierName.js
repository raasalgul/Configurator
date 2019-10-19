import { FETCH_NAME } from "../actions/types";
function updateCarrierCode(newCarrierName) {
  return { type: FETCH_NAME, payload: { carrierName: newCarrierName } };
}
export default updateCarrierCode;
