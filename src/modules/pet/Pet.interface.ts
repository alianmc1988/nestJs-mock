// Create interface for a Pet
export interface IPet {
  readonly _id: string;
  readonly name: string;
  readonly breed: string;
  readonly age: number;
  readonly type: string;
  readonly owner: string;
}
