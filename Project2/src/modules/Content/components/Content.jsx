import React from 'react';
import Introduction from './Introduction';
import RecentProjects from './RecentProjects';
import Clients from './Clients';
import ProjectNumbers from './ProjectNumbers';
import Services from './Services';
import '../css/Content.less';

const Content = () => (
  <div
    className="content"
  >
    <Introduction />
    <RecentProjects />
    <Clients />
    <ProjectNumbers />
    <Services />
  </div>
);

export default Content;
