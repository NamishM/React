import HeaderAlt from '../components/HeaderAlt';
import { connect } from 'react-redux';
import { filterJoin } from 'srs/common/utilities';
import { clearSelectedChart } from 'srs/redux/selectedChart/actions';

const mapStateToProps = ({
  selectedChart: {
    personId,
    chart,
    encounter,
    prevPathname,
    prevSearch,
  },
  login: {
    isTaskingEnabled,
  },
}) => ({
  encounterTime: encounter ? encounter.personDeskDate : null,
  selectedName: chart ? filterJoin(', ', chart.lastName, chart.firstName) : null,
  personId,
  prevPathname,
  prevSearch,
  isTaskingEnabled,
});

const Footer = connect(
  mapStateToProps,
  {
    onBackButtonClicked: clearSelectedChart,
  },
)(HeaderAlt);

export default Footer;
