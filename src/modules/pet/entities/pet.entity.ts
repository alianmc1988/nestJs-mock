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

export class Pet {
  readonly name: string;
  readonly breed: string;
  readonly age: number;
  readonly type: string;
  readonly owner: string;

  constructor(
    name: string,
    breed: string,
    age: number,
    type: string,
    owner: string,
  ) {
    this.name = name;
    this.breed = breed;
    this.age = age;
    this.type = type;
    this.owner = owner;
  }
}
