import { FETCH_ID } from "./types";
function updateCarrierId(newCarrierCode) {
  return { type: FETCH_ID, payload: { carrierId: newCarrierCode } };
}
export default updateCarrierId;
