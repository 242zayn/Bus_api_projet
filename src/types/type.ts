export interface BustSearchListType {
  status: string;
  statusCode?: null;
  redirect?: null;
  data: Data;
  modal?: null;
  successImage?: null;
  message: string;
  modalStatus?: null;
  alert?: null;
  login?: null;
  title?: null;
  verifyOtp?: null;
  className?: null;
  hideClass?: null;
  modalClose?: null;
  modalId?: null;
  dataTarget?: null;
}
export interface Data {
  requestId: string;
  tripDetails?: TripDetailsEntity[] | null;
}
export interface TripDetailsEntity {
  AC: boolean;
  arrivalTime: string;
  availableSeats: number;
  boardingDetails?: BoardingDetailsEntity[] | null;
  bookable: boolean;
  busKey: string;
  busType: string;
  departureTime: string;
  dropPointMandatory: boolean;
  droppingDetails?: DroppingDetailsEntity[] | null;
  duration: string;
  fareMasters?: FareMastersEntity[] | null;
  fromCity: string;
  getFareMandatory: boolean;
  operatorName: string;
  partialCancellationAllowed: boolean;
  seatLayout: boolean;
  seatType: number;
  serviceNextDay: boolean;
  toCity: string;
  travelDate: string;
  vehicleType: string;
  mTicket: boolean;
}
export interface BoardingDetailsEntity {
  boardingAddress: string;
  boardingContact: string;
  boardingId: string;
  boardingLandmark: string;
  boardingName: string;
  boardingTime: string;
}
export interface DroppingDetailsEntity {
  droppingAddress: string;
  droppingContact: string;
  droppingId: string;
  droppingLandmark: string;
  droppingName: string;
  droppingTime: string;
}
export interface FareMastersEntity {
  basicAmount: number;
  cancellationCharges: number;
  fareDetails?: FareDetailsEntity[] | null;
  GST: number;
  grossCommission: number;
  netCommission: number;
  otherAmount: number;
  serviceFeeAmount: number;
  totalAmount: number;
  tradeMarkupAmount: number;
}
export interface FareDetailsEntity {
  amount: number;
  fareDesc: string;
  refundable: boolean;
}

// Seat type data

export interface SeatMap {
  status: string;
  statusCode?: null;
  redirect?: null;
  data?: DataEntity[] | null;
}
export interface DataEntity {
  boardingDetails?: BoardingDetailsEntity[] | null;
  dropPointMandatory: boolean;
  droppingDetails?: DroppingDetailsEntity[] | null;
  requiredPAXDetail: RequiredPAXDetail;
  responseHeader: ResponseHeader;
}
export interface BoardingDetailsEntity {
  boardingAddress: string;
  boardingContact: string;
  boardingId: string;
  boardingLandmark: string;
  boardingName: string;
  boardingTime: string;
}
export interface DroppingDetailsEntity {
  droppingAddress: string;
  droppingContact: string;
  droppingId: string;
  droppingLandmark: string;
  droppingName: string;
  droppingTime: string;
}
export interface RequiredPAXDetail {
  age: boolean;
  DOB: boolean;
  gender: boolean;
  IDProof: boolean;
  name: boolean;
  title: boolean;
}
export interface ResponseHeader {
  errorCode: string;
  errorDesc: string;
  errorInnerException: string;
  requestId: string;
  statusId: string;
}

// Seat layout data virtualization

export interface SeatVirtualMap {
  status: string;
  statusCode?: null;
  redirect?: null;
  data: Data;
  modal?: null;
  successImage?: null;
  message: string;
  modalStatus?: null;
  alert?: null;
  login?: null;
  title?: null;
  verifyOtp?: null;
  className?: null;
  hideClass?: null;
  modalClose?: null;
  modalId?: null;
  dataTarget?: null;
}
export interface Data {
  seatLayout?: SeatLayoutEntity[] | null;
  seatLayoutKey: string;
}
export interface SeatLayoutEntity {
  bookable: boolean;
  column: number;
  fareMaster: FareMaster;
  ladiesSeat: boolean;
  length: string;
  row: string;
  seatKey: string;
  seatNumber: string;
  width: string;
  ZIndex: string;
}
export interface FareMaster {
  basicAmount: number;
  cancellationCharges: number;
  fareDetails?: FareDetailsEntity[] | null;
  GST: number;
  grossCommission: number;
  netCommission: number;
  otherAmount: number;
  serviceFeeAmount: number;
  totalAmount: number;
  tradeMarkupAmount: number;
}
export interface FareDetailsEntity {
  amount: number;
  fareDesc: string;
  refundable: boolean;
}

// Filter bus data type

export interface FilterBusList {
  AC: boolean;
  arrivalTime: string;
  availableSeats: number;
  boardingDetails?: BoardingDetailsEntity[] | null;
  bookable: boolean;
  busKey: string;
  busType: string;
  departureTime: string;
  dropPointMandatory: boolean;
  droppingDetails?: DroppingDetailsEntity[] | null;
  duration: string;
  fareMasters?: FareMastersEntity[] | null;
  fromCity: string;
  getFareMandatory: boolean;
  operatorName: string;
  partialCancellationAllowed: boolean;
  seatLayout: boolean;
  seatType: number;
  serviceNextDay: boolean;
  toCity: string;
  travelDate: string;
  vehicleType: string;
  mTicket: boolean;
}
export interface BoardingDetailsEntity {
  boardingAddress: string;
  boardingContact: string;
  boardingId: string;
  boardingLandmark: string;
  boardingName: string;
  boardingTime: string;
}
export interface DroppingDetailsEntity {
  droppingAddress: string;
  droppingContact: string;
  droppingId: string;
  droppingLandmark: string;
  droppingName: string;
  droppingTime: string;
}
export interface FareMastersEntity {
  basicAmount: number;
  cancellationCharges: number;
  fareDetails?: FareDetailsEntity[] | null;
  GST: number;
  grossCommission: number;
  netCommission: number;
  otherAmount: number;
  serviceFeeAmount: number;
  totalAmount: number;
  tradeMarkupAmount: number;
}
export interface FareDetailsEntity {
  amount: number;
  fareDesc: string;
  refundable: boolean;
}
