export type DataModelResponseType = {
  id: string;
  date: string;
  fridge: { min: string; cur: string; max: string };
  env: { min: string; cur: string; max: string };
  unit: string;
  user: string;
};
