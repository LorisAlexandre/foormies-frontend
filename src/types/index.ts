export type { Auth, JWTTokens } from "./auth";
export type { Form } from "./form";
export type { QuestionType } from "./question";

export interface Response {
  error?: string;
  statusCode?: number;
  message?: string | string[];
}
