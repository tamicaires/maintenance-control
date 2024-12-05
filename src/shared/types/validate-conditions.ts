export type ValidationConditionsType = {
  condition: boolean | boolean[];
  exception: {
    message: string;
    status: number;
  };
};