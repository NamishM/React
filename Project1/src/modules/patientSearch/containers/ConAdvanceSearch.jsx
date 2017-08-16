import { connect } from 'react-redux';
import AdvanceSearch from '../components/AdvanceSearch';
import {
  onChangeSearchView,
  onClearClicked,
  onFocusDate,
  onSearchClicked,
} from 'srs/redux/patients/actions';
import { actions as modelAction } from 'react-redux-form';

const mapStateToProps = state => ({
  canShowAdvanceSearchPanel: state.patientSearchData.hasAdvanceSearch,
  isDateFieldView: state.patientSearchData.isDateFieldView,
  searchCriteria: state.searchCriteria,
  searchCriteriaForm: state.searchCriteriaForm,
  allField: state.patientSearchData.allField,
});

const mapDispatchToProps = dispatch => ({
  onSearch: (searchCriteria) => {
    dispatch(onSearchClicked(searchCriteria, 1));
  },
  onClear: () => {
    dispatch(onClearClicked());
    dispatch(modelAction.reset('searchCriteria'));
  },
  setDateFieldView: (isDate) => {
    dispatch(onFocusDate(isDate));
    if (!isDate) {
      dispatch(modelAction.change('searchCriteria.dob', ''));
    }
  },
  onAdvanceSearchClick: (searchCriteria) => {
    dispatch(modelAction.change('searchCriteria.ssn', ''));
    dispatch(onChangeSearchView(searchCriteria));
  },
});

const ConAdvanceSearch = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdvanceSearch);

export default ConAdvanceSearch;
