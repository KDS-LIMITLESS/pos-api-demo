import { Collection } from 'mongodb'
import { db } from "./connection"
import { IItem } from './item'



export const ItemsCollection: Collection<IItem> = db.collection('items');


