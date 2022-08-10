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
  private readonly name: string;
  private readonly breed: string;
  private readonly age: number;
  private readonly type: string;
  private readonly owner: string;

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

// @Schema()
// export class Pet extends Document {
//   @Prop({ required: true })
//   name: string;

//   @Prop({ default: 0 })
//   age: number;

//   @Prop({ required: false })
//   breed: string;

//   @Prop({ required: false })
//   color: string;

//   @Prop({ required: true })
//   type: string;
// }

// export const PetSchema = SchemaFactory.createForClass(Pet);
