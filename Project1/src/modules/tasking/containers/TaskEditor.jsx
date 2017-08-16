import TaskEditorForm from '../components/TaskEditorForm';
import { connect } from 'react-redux';
import {
  getFavoriteOptions,
  taskFavoriteDelete,
  taskFavoriteCreate,
}
  from 'srs/redux/tasking/actions/taskingActions';
import { getStructuredFavorites, getTemplateMappingId, getDeNormalizedPatientStatus }
  from '../../../redux/tasking/reducers/taskingDetails';

const mapStateToProps = (state, ownProps) => ({
  patientStatusTypes: getDeNormalizedPatientStatus(state),
  colSpan: ownProps.colSpan,
  encounterId: ownProps.encounterId,
  isDesktopLayout: state.browser.screenLayout === 'desktop',
  favoriteOptions: getStructuredFavorites(state),
  originalFavoriteOptions: state.taskingDetails.selectedFavorites,
  canCreateTasks: state.settings.users.tasking.canCreateTasks,
});

const mapDispatchToProps = dispatch => ({
  onGetFavoriteOptions: ({ taskDesc, patientStatusTypeIds }) =>
    dispatch(getFavoriteOptions({ taskDesc, patientStatusTypeIds })),
  onClickFavoritesDelete: ({
    selections,
    templateDetails,
    originalFavoriteOptions,
  }) => selections.map(groupId =>
    (
      dispatch(taskFavoriteDelete(
        getTemplateMappingId(groupId, templateDetails, originalFavoriteOptions),
      ))
    )),
  onClickFavoritesCreate: ({
    selections,
    templateDetails,
  }) => selections.map(groupId => dispatch(taskFavoriteCreate(groupId, templateDetails))),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditorForm);
