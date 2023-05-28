import React, { FC, useState } from 'react';
import ReferralList from 'widgets/referralList';
import LayoutPage from 'widgets/layout';

const MENU_SELECTED: string[] = ['referral'];
const ReportPage: FC = () => {
   const [loading, setLoading] = useState(true);
   return (
      <LayoutPage
         currentPage={MENU_SELECTED}
         loading={loading}
         title={'Список медицинских направлений'}
      >
         <ReferralList loading={loading} setLoading={setLoading} />
      </LayoutPage>
   );
};

export default ReportPage;
