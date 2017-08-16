import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Multiselect from 'react-bootstrap-multiselect';
import { v4 } from 'uuid';
import Select from 'react-select';
import VirtualizedSelect from 'react-virtualized-select';
import '../css/ReactSelect.less';
import Link from 'react-router/lib/Link';
import Highlighter from 'react-highlight-words';
import { updatePatientStatusTypes, isTaskFavorite } from 'srs/redux/tasking/reducers/taskingDetails';
import { unAuthorizeTitleText } from 'srs/redux/tasking/constants/constantTexts';

const favClassNameSelected = 'fa fa-star selectFavorites selected';
const favClassNameNotSelected = 'fa fa-star selectFavorites not-selected';

class TaskEditorForm extends Component {
  constructor(props) {
    super(props);
    this.state = { id: `id-${v4().toString()}`,
      isTaskGroupSelected: false,
      isDescriptionEntered: false,
      favSelected: false,
      textValue: '',
      availableOptions: [],
      placeholder: 'Description',
      statusTypes: [],
    };
  }
  componentWillMount() {
    this.setState({ statusTypes: [...this.props.patientStatusTypes] });
  }
  componentWillUpdate(nextProps, nextState) {
    nextState.availableOptions = nextProps.favoriteOptions;
  }
  render() {
    const {
      patientStatusTypes = [],
      onClick,
      encounterId,
      favoriteOptions,
      originalFavoriteOptions,
      onGetFavoriteOptions,
      onClickFavoritesDelete,
      onClickFavoritesCreate,
      canCreateTasks,
      // isDesktopLayout,
    } = this.props;
    const searchSpan = document.getElementsByClassName('Select-value');
    const setfavoriteMenu = (input, callback) => {
      setTimeout(() => {
        callback(null, {
          options: favoriteOptions,
          complete: true,
        });
      }, 0);
    };
    const handleBlurAndFocus = (event) => {
      event.persist();
      setTimeout(() => {
        if (this.state.textValue.length > 0) {
          event.target.value = this.state.textValue;
        } else {
          event.target.value = '';
        }
      }, 0);
      if (searchSpan.length) searchSpan[0].style.display = 'none';
    };
    const setFavoriteBtnState = () => {
      const selectedID = Array.from(this.patientStatusTypesSelect.selectRef.children)
        .filter(x => x.selected).map(x => x.value);
      if (selectedID.length !== 0 && this.txtDescription.value !== '') {
        if (isTaskFavorite(
          this.state.availableOptions,
          selectedID,
          this.txtDescription.value.trim(),
        )) {
          this.setState({ favSelected: true });
        } else {
          this.setState({ favSelected: false });
        }
      } else {
        this.setState({ favSelected: false });
      }
    };
    const customOptionRenderer = ({
      key, option, selectValue,
    }) => (
      <Link
        key={key}
        type="button"
        onClick={() => selectValue(option)}
        className="favOption"
      >
        <p>
          <i className="fa fa-circle" style={{ color: option.color }} aria-hidden="true" />
          <Highlighter
            searchWords={[this.state.textValue]}
            textToHighlight={` ${option.label}`}
            highlightStyle={{ background: 'none', fontWeight: 'bold', padding: '0' }}
          />
        </p>
      </Link>
    );
    const updateComponentState = (action) => {
      const alteredState = this.state.statusTypes.map(state =>
        updatePatientStatusTypes(state, action));
      this.setState({ statusTypes: alteredState });
    };
    return (
      <span
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Multiselect
          disabled={!canCreateTasks}
          data-auto="select_taskinggroup"
          data={this.state.statusTypes}
          multiple
          buttonWidth="190"
          buttonClass="form-control btn-default text-left"
          nonSelectedText={canCreateTasks ? 'Select Tasking Group' : `Group selection ${unAuthorizeTitleText}`}
          includeSelectAllOption="true"
          numberDisplayed="false"
          maxHeight="120"
          id={this.state.id}
          key={this.state.id}
          nSelectedText="Tasking Groups Selected"
          allSelectedText="All Tasking Groups Selected"
          delimiterText=";"
          enableHTML
          ref={(input) => { this.patientStatusTypesSelect = input; }}
          buttonText={(options) => {
            let btnText = 'Select Tasking Group';
            if (options.length === 1) {
              btnText = options[0].label;
            } else if (options.length > 1) {
              btnText = 'Multiple Tasking Groups';
            }

            if (options.length > 0) {
              this.setState({ isTaskGroupSelected: true });
            } else {
              this.setState({ isTaskGroupSelected: false });
            }
            return btnText;
          }}
          optionLabel={(element) => {
            const statusColor = (patientStatusTypes.find(
              x => x.value.toString() === element.value.toString()) || {}).color;
            const elem = `<i class="fa fa-circle" style="color:${statusColor}" aria-hidden="true" /> ${element.label}`;
            return elem;
          }}
          onChange={() => { // check for favorite button to be highlighted or not
            setFavoriteBtnState();
            if (searchSpan.length) searchSpan[0].style.display = 'block';
          }}
          onSelectAll={() => {
            setFavoriteBtnState();
            if (searchSpan.length) searchSpan[0].style.display = 'block';
          }}
          onDeselectAll={() => {
            setFavoriteBtnState();
            if (searchSpan.length) searchSpan[0].style.display = 'block';
          }}
        />
        <VirtualizedSelect
          placeholder={this.state.placeholder}
          name="form-field-name"
          ref={(input) => { this.favoriteSelect = input; }}
          options={favoriteOptions}
          loadOptions={(input, callback) => {
            if (input.length > 1) {
              onGetFavoriteOptions({
                taskDesc: input,
                patientStatusTypeIds: Array.from(this.patientStatusTypesSelect.selectRef.children)
                  .filter(x => x.selected)
                  .map(x => x.value),
              });
              setfavoriteMenu(input, callback);
            } else {
              callback(null, {
                options: [],
                complete: true,
              });
            }
          }}
          onChange={(newValue) => {
            if (newValue === null) { // clear button clicked
              this.setState({ isDescriptionEntered: false });
              this.setState({ textValue: '' });
              this.setState({ favSelected: false });
              updateComponentState({ type: 'Template_Clear' });
              this.patientStatusTypesSelect.$multiselect
                .multiselect('deselectAll', false)
                .multiselect('updateButtonText');
              this.favoriteSelect._selectRef.select.wrapper.querySelector('#fav-search-input').focus();
              setTimeout(() => { // fix for IE as menu got open after clear
                this.favoriteSelect._selectRef.select.setState({ isOpen: false });
              }, 0);
            }
            if (newValue) { // menu options clicked
              this.setState({ textValue: newValue.value });
              this.setState({ favSelected: true });
              this.setState({ isDescriptionEntered: true });
              updateComponentState({ groupId: newValue.groupId, type: 'Template_Select' });
              this.favoriteSelect._selectRef.select.setState({ inputValue: newValue.value });
            }
          }}
          onInputChange={(selectValue) => { // keyboard events on textbox
            this.setState({ textValue: selectValue });
            this.setState({ favSelected: false });
            setTimeout(() => { // needed as state is taking time to update, textbox not updated
              if (this.txtDescription.value.length > 0) {
                this.setState({ isDescriptionEntered: true });
              } else {
                this.setState({ isDescriptionEntered: false });
                this.setState({ favSelected: false });
              }
            }, 200);
          }}
          value={this.state.textValue || ''}
          autoload={false}
          selectComponent={Select.Async}
          async
          autofocus
          maxHeight={120}
          onBlurResetsInput={false}
          onCloseResetsInput={false}
          autosize={false}
          autoBlur
          onFocus={(e) => {
            handleBlurAndFocus(e); // remember old value
            setTimeout(() => { // fix for Defect-14324,14418 Duplicate defect
              this.favoriteSelect._selectRef.select.setState({ isOpen: false });
            }, 0);
          }}
          onBlur={(e) => {
            handleBlurAndFocus(e); // remember old value
            setFavoriteBtnState();
          }}
          inputProps={{
            'maxLength': '255', // eslint-disable-line quote-props
            'data-auto': 'input_taskDetails',
            'id': 'fav-search-input', // eslint-disable-line quote-props
          }}
          backspaceRemoves={false}
          deleteRemoves={false}
          optionRenderer={customOptionRenderer}
          cache={false}
          disabled={!canCreateTasks}
        />
        <button
          disabled={!canCreateTasks ||
                    !encounterId ||
                    patientStatusTypes.length === 0 ||
                    (!this.state.isDescriptionEntered || !this.state.isTaskGroupSelected ||
                    this.state.textValue.length <= 2)
          }
          className={
            this.state.favSelected ? 'glow' : 'dull'
          }
          type="button"
          id="btnFav"
          title="Favorite"
          onClick={() => {
            const selectedID = Array.from(this.patientStatusTypesSelect.selectRef.children)
              .filter(x => x.selected).map(x => x.value);
            if (this.state.textValue === '' || selectedID.length === 0) {
              this.setState({ favSelected: false });
            } else {
              this.setState({ favSelected: !this.state.favSelected });
              if (this.state.favSelected) { // delete favorite
                this.setState({ placeholder: 'Favorite Deleted' }); // set new description
                onClickFavoritesDelete({
                  selections: selectedID,
                  templateDetails: this.state.textValue,
                  originalFavoriteOptions,
                });
                this.setState({ textValue: '' });
                this.favoriteSelect._selectRef.select.setState({ inputValue: '' });
                updateComponentState({ type: 'Template_Clear' });
                setTimeout(() => { // set sometime for user to see newly set description
                  this.setState({ placeholder: 'Description' }); // set to old/original description
                }, 1000);
              } else { // create favorite
                onClickFavoritesCreate({
                  selections: selectedID,
                  templateDetails: this.state.textValue,
                });
                this.favoriteSelect._selectRef.select.wrapper.querySelector('#fav-search-input').focus();
              }
            }
          }}
        >
          <i
            className={
              this.state.favSelected ? favClassNameSelected : favClassNameNotSelected
            }
            aria-hidden="true"
          />
        </button>
        <input
          type="hidden"
          value={this.state.textValue}
          ref={(input) => { this.txtDescription = input; }}
        />
        <span
          style={{
            width: '200px',
            marginLeft: '2px',
          }}
          className="btn-task"
        >
          <button
            disabled={!canCreateTasks || !encounterId ||
              patientStatusTypes.length === 0 ||
              (!this.state.isDescriptionEntered || !this.state.isTaskGroupSelected ||
              this.state.textValue.length <= 2)
            }
            data-auto="btn_createTask"
            type="button"
            className="btn btn-success"
            title={canCreateTasks ? 'Create Tasks' : `Create Tasks ${unAuthorizeTitleText}`}
            ref={(input) => { this.btnSave = input; }}
            onClick={() => {
              onClick({
                value: JSON.stringify({ details: this.txtDescription.value.trim() }),
                selections: Array.from(this.patientStatusTypesSelect.selectRef.children)
                  .filter(x => x.selected)
                  .map(x => x.value),
                encounterId,
              });
              this.setState({ textValue: '' });
              this.setState({ favSelected: false });
              this.favoriteSelect._selectRef.select.setState({ inputValue: '' });
              this.favoriteSelect._selectRef.select.wrapper.querySelector('#fav-search-input').focus();
              this.patientStatusTypesSelect.$multiselect
                .multiselect('deselectAll', false)
                .multiselect('updateButtonText');
            }}
          >
            Create Tasks <i className="fa fa-floppy-o" aria-hidden="true" />
          </button>
        </span>
      </span>
    );
  }
}

TaskEditorForm.propTypes = {
  patientStatusTypes: PropTypes.arrayOf(PropTypes.shape),
  favoriteOptions: PropTypes.arrayOf(PropTypes.shape),
  originalFavoriteOptions: PropTypes.arrayOf(PropTypes.shape),
  onGetFavoriteOptions: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  isDesktopLayout: PropTypes.bool.isRequired,
  encounterId: PropTypes.string.isRequired,
  onClickFavoritesDelete: PropTypes.func.isRequired,
  onClickFavoritesCreate: PropTypes.func.isRequired,
  canCreateTasks: PropTypes.bool,
};

export default TaskEditorForm;
