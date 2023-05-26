import React, { FC, memo } from 'react';
import { IReport } from 'shared/index';

interface IContentOptions {
   report: IReport;
}

const Dashboard: FC<IContentOptions> = memo((props: IContentOptions) => {
   return <div>Тут будут дашборды</div>;
});

export default Dashboard;
