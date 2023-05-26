import React, { FC, useState } from 'react';
import Content from 'widgets/content';
import LayoutPage from 'widgets/layout';

const MENU_SELECTED = ['main'];

const ReportsPage: FC = () => {
   const [loading, setLoading] = useState(true);

   return (
      <LayoutPage currentPage={MENU_SELECTED} loading={loading}>
         <Content loading={loading} setLoading={setLoading} />
      </LayoutPage>
   );
};

export default ReportsPage;
