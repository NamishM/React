import { connect } from 'react-redux';
import Header from '../components/Header';
import { searchClick, appointmentView } from 'srs/redux/appointmentList/actions';
import { actions as modelAction } from 'react-redux-form';
import { getChartBinFilterUrl } from 'srs/redux/chartBinFilter/reducers/chartBinFilter';

const mapStateToProps = (state, ownProps) => ({
  textValue: ownProps.label,
  chartbinQueryString: getChartBinFilterUrl(state),
  mainArea: state.wireframe.mainArea,
});

const mapDispatchToProps = dispatch => ({
  selectSerach() {
    dispatch(searchClick());
  },
  selectAppointment() {
    dispatch(modelAction.change('searchCriteria.ssn', ''));
    dispatch(appointmentView());
  },
});

const FilterNavigation = connect(mapStateToProps, mapDispatchToProps)(Header);

export default FilterNavigation;
