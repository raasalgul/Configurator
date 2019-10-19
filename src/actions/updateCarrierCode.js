import { FETCH_CODE } from "./types";
function updateCarrierCode(newCarrierCode) {
  return { type: FETCH_CODE, payload: { carrierCode: newCarrierCode } };
}
export default updateCarrierCode;
