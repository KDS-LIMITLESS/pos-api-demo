// import HttpStatusCodes from "../app-constants/HttpStatusCodes";

// /** */

// interface ILogErrors {
//     log(status:HttpStatusCodes, 
//     payload?: string | number | any[]) : void
// }

// class LogError extends Error  {
//     status!: HttpStatusCodes
//     payload!: number | string | number
//     constructor (message:string, log:ILogErrors['log']) {
//         super(message);
//         log(this.status, this.payload? |null)
//     }
// }
// let lo = new LogError("hey", (HttpStatusCodes.ACCEPTED))