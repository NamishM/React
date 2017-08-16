import { connect } from 'react-redux';
import DemoGraphics from '../components/DemoGraphics';
import { filterJoin } from '../../../common/utilities';

const mapStateToProps = ({
  selectedChart: {
    chart,
  },
}) => ({
  patientName: chart ? filterJoin(', ', chart.lastName, chart.firstName) : null,
});

const DemoGraphicsContainer = connect(mapStateToProps)(DemoGraphics);

export default DemoGraphicsContainer;
