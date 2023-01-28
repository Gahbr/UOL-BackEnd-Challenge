import mongoose, { Schema, model, connect, mongo} from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
interface IPlayer {
  nome: string;
  email: string;
  telefone: string;
  codinome: string;
  grupo : string;
 
}

// 2. Create a Schema corresponding to the document interface.
const playerSchema = new Schema<IPlayer>({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  telefone: { type: String },
  codinome: { type: String, unique:true},
  grupo: { type: String },
  
});

export const Player = model<IPlayer>("Player", playerSchema); 

