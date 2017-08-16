import PropTypes from 'prop-types';
import React from 'react';

const DemoGraphics = ({ patientName }) => (
  <div className="demoGraphics">
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <label
        data-auto="Label_IDash_PatientName"
      >
        {patientName}
      </label>
    </div>
    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
      <a data-auto="AnchorTag_IDash_VDS" disabled="disabled" className="btn pull-right" >View data summary</a>
    </div>
  </div>
);

DemoGraphics.propTypes = {
  patientName: PropTypes.string,
};

export default DemoGraphics;
