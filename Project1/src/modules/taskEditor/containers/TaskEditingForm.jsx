import { connect } from 'react-redux';
import TaskEditingUI from '../components/TaskEditingUI';
import * as actions from 'srs/redux/taskingForm/actions';

const mapStateToProps = ({
  taskingForm: {
    isVisible,
    isExpanded,
  },
}) => ({
  isVisible,
  isExpanded,
});

const mapDispatchToProps = dispatch => ({
  resetToDefault: () => {
    dispatch(actions.resetToDefault());
  },
  resizeModal: (isExpanded) => {
    dispatch(actions.resizeModal(isExpanded));
  },
});

const TaskEditingForm = connect(mapStateToProps, mapDispatchToProps)(TaskEditingUI);

export default TaskEditingForm;
