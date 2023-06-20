import { IReport } from 'shared/index';

interface IDashboardOptions {
   report: IReport;
   tab?: string;
   position?: string;
   doctor?: number;
   reportId?: string;
}

export { IDashboardOptions }