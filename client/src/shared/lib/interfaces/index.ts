interface IType {
   name: string;
   count: number;
}

export interface ITypeCount {
   all: IType[];
   [key: string]: IType[];
}

interface IPatientSex {
   male: number;
   female: number;
}

interface IDirection {
   name: string;
   isRequired: boolean;
   isAdditional?: boolean;
   percent?: number;
}

export interface IPatient {
   id: number;
   name: string;
   date: Date;
   percent: number;
   diagnosis: string;
   direction: IDirection[];
   requiredByDiagnosis: IDirection[];
}

export interface IDoctor {
   id: number;
   name: string;
   percent: number;
   position: string;
   patients: IPatient[];
   reportsTypeCount: IType[];
}

export interface IPosition {
   [key: string]: string;
}

export interface IReport {
   reportId: number;
   name: string;
   positions: IPosition;
   reportsTypeCount: ITypeCount;
   percentByDepartment: {
      [key: string]: number;
   };
   doctors: IDoctor[];
}
