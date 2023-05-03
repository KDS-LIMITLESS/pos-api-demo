import HttpStatusCodes from '../../../app-constants/HttpStatusCodes';

export class LogError extends Error {
  status: HttpStatusCodes;
  payload?: Record<string, string | number>;

  constructor(
    status:HttpStatusCodes, message:string , 
    payload?: Record<string, string | number>
  ){
    super(message);
    this.status = status;
    this.payload = payload;
  }
}