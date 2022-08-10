import * as mongoose from 'mongoose';

export const PetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, length: 15 },
    type: { type: String },
    breed: { type: String },
    age: { type: Number },
    owner: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
