import { connect } from 'react-redux';
import Header from '../components/Header';
import { getSelectedTab }
  from 'srs/redux/documentTabs/reducers/documentTabs';
import { backToTabs } from 'srs/redux/documentTabs/actions';
import { push } from 'react-router-redux';

const mapStateToProps = state => ({
  selectedTabId: state.documentTabs.selectedTabId,
  selectedTabName: getSelectedTab(state) ? getSelectedTab(state).documentGroupDesc : 'Document Tab',
  desktopLayout: (
    state.browser.mediaType === 'large' || state.browser.mediaType === 'extraLarge'
  ),
  selectedPersonId: state.selectedChart.personId,
  selectedEncounterId: state.selectedChart.encounterId === '{00000000-0000-0000-0000-000000000000}'
    ? null : state.selectedChart.encounterId,
});

const mapDispatchToProps = dispatch => ({
  backToTabs(personId, encounterId) {
    dispatch(backToTabs());
    dispatch(push({
      pathname: '/document',
      query: {
        personId,
        encounterId,
      },
    }));
  },
});
const DocumentListHeader = connect(mapStateToProps, mapDispatchToProps)(Header);

export default DocumentListHeader;
