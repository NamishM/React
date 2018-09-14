import { connect } from 'react-redux';
import MainViewUI from '../components/MainViewUI';
import * as actions from 'src/redux/actions/EmpAction';

const mapStateToProps = state => ({
  employeeData: state.employeeData,
});

const mapDispatchToProps = dispatch => ({
  onNewEmployeeCreation: () => {
    dispatch(actions.onNewEmployeeCreation());
  },
  onEmployeeDeletion: (id) => {
    dispatch(actions.onEmployeeDeletion(id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainViewUI);
