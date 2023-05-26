import React, { FC } from 'react';
import ReferralList from 'widgets/referralList';
import LayoutPage from 'widgets/layout';

const MENU_SELECTED: string[] = ['referral'];

const ReportPage: FC = () => {
   return (
      <LayoutPage
         currentPage={MENU_SELECTED}
         loading={false}
         title={'Список медицинских направлений'}
      >
         <ReferralList />
      </LayoutPage>
   );
};

export default ReportPage;
