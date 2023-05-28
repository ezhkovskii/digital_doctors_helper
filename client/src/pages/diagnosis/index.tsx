import React, { FC, useState } from 'react';
import DiagnosisContent from 'widgets/diagnosisContent';
import LayoutPage from 'widgets/layout';

const MENU_SELECTED = ['diagnosis'];

const DiagnosisPage: FC = () => {
   const [loading, setLoading] = useState(true);

   return (
      <LayoutPage currentPage={MENU_SELECTED} loading={loading}>
         <DiagnosisContent loading={loading} setLoading={setLoading} />
      </LayoutPage>
   );
};

export default DiagnosisPage;
