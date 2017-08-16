import { connect } from 'react-redux';
import Allergy from '../components/Allergy';
import { widgetOpened, widgetDataAdded } from 'srs/redux/rx/actions';
import objectMapper from 'object-mapper';
import { allergyAddUpdate } from 'srs/redux/rx/mappers/allergyMapper';

const mapStateToProps = state => ({
  isMedWidgetOpenedSuccessfully: state.Rx.isMedWidgetOpened,
  patientId: state.Rx.patientExternalId,
});
let reformattedArray = '';
const mapDispatchToProps = dispatch => ({
  showWidget: (widgetName, targetDiv) => {
    const widget = global.Rcopia.embedWidget({
      widgetName,
      targetDiv,
      properties: {
        patientKey: 'default',
        viewMode: 'full',
      },
    });
    widget.open();
    dispatch(widgetOpened());
  },
  addAllergySubscriber: (widgetName, patientId) => {
    global.Rcopia.subscribeEvent({ eventName: 'allergy.change',
      callback: (data) => {
        const result = objectMapper(data, allergyAddUpdate);
        if (result.allergy.AllergyGroup != null) {
          reformattedArray = result.allergy.AllergyGroup.map((obj) => {
            const rObj = {};
            rObj.AllergyGroupName = obj.name;
            rObj.AllergyGroupType = obj.type;
            rObj.AllergyGroupExternalId =
            obj.groupAllergen.groupId.simpleId;
            return rObj;
          });
        }
        if (result.actionType === 'created') {
          result.allergy.isActive = data.payload.action === 'inactivated' ? 0 : 1;
          result.allergy.AllergyExternalId = (Math.floor(Math.random() * 6000) + 1);//  TODO
          result.allergy.PersonId = patientId;
          result.allergy.AllergyGroup = reformattedArray.length > 0 ? reformattedArray : null;
          dispatch(widgetDataAdded(result.allergy, widgetName, 'Allergy'));
        }
      },
    });
  },
  onFailure: () => {
    console.log('Problem in loading RcopiaJs'); // eslint-disable-line no-console
  },
});

const AllergyContainer = connect(mapStateToProps, mapDispatchToProps)(Allergy);

export default AllergyContainer;
