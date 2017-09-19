import React from 'react';
import Introduction from './Introduction';
import RecentProjects from './RecentProjects';
import Clients from './Clients';
import '../css/Content.less';

const Content = () => (
  <div
    className="content"
  >
    <Introduction />
    <RecentProjects />
    <Clients />
  </div>
);

export default Content;
