import { mongoose } from "../database";

export interface IClient {
  _id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  city: string;
  street: string;
  address_number: string;
  cep: number;
  cpf: number;
  created_at: Date;
}

const ClientSchema = new mongoose.Schema<IClient>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  address_number: {
    type: String,
    required: true,
  },
  cep: {
    type: Number,
    required: true,
  },
  cpf: {
    type: Number,
    required: true,
    unique: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Client = mongoose.model<IClient>("Client", ClientSchema);

export { Client };
