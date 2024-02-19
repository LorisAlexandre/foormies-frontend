import { QuestionType } from ".";

export interface Form {
  _id?: string;
  projectName?: string;
  questions?: QuestionType[];
}
