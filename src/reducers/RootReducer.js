import {
  FETCH_CODE,
  FETCH_NAME,
  FETCH_ID,
  FETCH_ONEXCHANGE_INDIVIDUAL,
  FETCH_OFFEXCHANGE_INDIVIDUAL,
  FETCH_OFFEXCHANGE_GROUP,
  FETCH_ONEXCHANGE_GROUP
} from "../actions/types";

const initialState = {
  carrierCode: "",
  carrierName: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_CODE:
      return {
        ...state,
        carrierCode: action.payload.carrierCode
      };
    case FETCH_NAME:
      return {
        ...state,
        carrierName: action.payload.carrierName
      };
    case FETCH_ONEXCHANGE_INDIVIDUAL:
      return {
        ...state,
        individualOnExchange: action.payload.individualOnExchange
      };
    case FETCH_OFFEXCHANGE_INDIVIDUAL:
      return {
        ...state,
        individualOffExchange: action.payload.individualOffExchange
      };
    case FETCH_ID:
      return {
        ...state,
        carrierId: action.payload.carrierId
      };
    case FETCH_OFFEXCHANGE_GROUP:
      return {
        ...state,
        groupOffExchange: action.payload.groupOffExchange
      };
    case FETCH_ONEXCHANGE_GROUP:
      return {
        ...state,
        groupOnExchange: action.payload.groupOnExchange
      };
    default:
      return state;
  }
}
