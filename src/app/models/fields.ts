export interface FieldTypeDefiniation {
    type: string;
    label: string;
    icon: string;
}

export interface FormField {
    id : string;
    type : string;
    label : string;
    required : boolean;
}