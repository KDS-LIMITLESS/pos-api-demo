import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()

const URI = process.env.MONGO_ATLAS_URI || process.env.MONGO_DOCKER_URI

/**
 * Mongodb client used accross the application
 */
export const client = new MongoClient(URI as string, {
  maxPoolSize: 100,
  minPoolSize: 0,
  maxIdleTimeMS: 1000,
  socketTimeoutMS: 8000
});

client.on("connectionPoolCreated", function(pool : any) {
  console.log("connection pool acquired... " + pool.options?.maxIdleTimeMS)
})

// client.on("connectionPoolClosed", function(pool : any) {
//  console.log("Pool clossed " + pool.time)
// })

