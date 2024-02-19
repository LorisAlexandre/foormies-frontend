export interface QuestionType {
  title: string;
  questionType: string;
  hint?: string;
  instructions?: string;
  instructionFile?: {
    url: string;
    publicId: string;
  };

  options?: string[];
  multiple?: boolean;
  confidential: boolean;
  requiredAnswer: boolean;
  minLength?: number;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;

  form: string;
  userId: string;
  _id: string;
}
