import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = ({
  selectedChart: {
    personId,
    encounterId,
  },
  browser: {
    screenLayout,
  },
  documentTabs: {
    selectedTabId,
  },
}, ownProps) => ({
  textValue: ownProps.label,
  hidden: screenLayout === 'desktop' && ownProps.hideWhenLarge,
  documentPath: () => {
    let path = '/document?';
    const lpersonId = ownProps.personId ? ownProps.personId : personId;
    const lencounterId = ownProps.encounterId ? ownProps.encounterId : encounterId;
    if (selectedTabId) {
      path = `${path}documentGroupId=${selectedTabId}&`;
    }
    if (lpersonId) {
      path = `${path}personId=${lpersonId}&`;
    }
    if (lencounterId && lencounterId !== '{00000000-0000-0000-0000-000000000000}') {
      path = `${path}encounterId=${lencounterId}&`;
    }
    return path.substring(0, ((path.length) - 1));
  },
  patientEncounterPath: () => {
    let path = '/patientEncounter?';
    const lpersonId = ownProps.personId ? ownProps.personId : personId;
    const lencounterId = ownProps.encounterId ? ownProps.encounterId : encounterId;
    if (lpersonId) {
      path = `${path}personId=${lpersonId}&`;
    }
    if (lencounterId) {
      path = `${path}encounterId=${lencounterId}&`;
    }
    return path.substring(0, ((path.length) - 1));
  },
});

const ChartNavigation = connect(mapStateToProps)(Header);

export default ChartNavigation;
