import { FormFields } from './fields';

export interface FormRow {
  id: string;
  sectionName: string;
  fields: FormFields[];
}
