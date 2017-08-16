import PropTypes from 'prop-types';
import React, { Component } from 'react';
import 'react-bootstrap-multiselect/less/bootstrap-multiselect.less';
import SearchBox from 'srs/common/components/SearchBox';
import Multiselect from 'react-bootstrap-multiselect';
import SortIndicator from '../../../common/components/SortIndicator';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classes from '../css/dtFilterDesktopUI.css';

class DocumentTabFilterDesktopUI extends Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: this.props.ishasDocumentChecked === true };
    this.toggleChange = () => {
      this.setState({ isChecked: !this.state.isChecked });
    };
  }
  render() {
    const {
      toggleVisiblity,
      isFilterBoardVisible,
      drawers = [],
      buttonText,
      resetToDefault,
      filterTabs,
      sortColumns,
      onSortChanged,
    } = this.props;
    let drawersSelect;
    let hasDocumentSelect;
    return (
      <div className={classes.container}>
        <div>
          <div className={classes.searchControl}>
            <SearchBox
              textValue={buttonText}
              onAdvancedSearchClick={() => toggleVisiblity()}
              isFilterBoardVisible={isFilterBoardVisible}
            />
          </div>
          <ReactCSSTransitionGroup
            transitionEnterTimeout={500}
            transitionLeaveTimeout={325}
            transitionName={{
              enter: classes.enter,
              enterActive: classes.enterActive,
              leave: classes.leave,
              leaveActive: classes.leaveActive,
            }}
          >
            {
              isFilterBoardVisible ?
                <div className={classes.searchAdvanced}>
                  <div>
                    <Multiselect
                      data={drawers}
                      multiple
                      id="selectDrawers"
                      buttonWidth="100%"
                      buttonClass="form-control btn-default text-left"
                      nonSelectedText="No Drawer selected"
                      includeSelectAllOption="true"
                      numberDisplayed="false"
                      maxHeight="95"
                      nSelectedText="doctors selected"
                      allSelectedText="All doctors selected"
                      delimiterText=";"
                      ref={(input) => { drawersSelect = input; }}
                      buttonText={(options) => {
                        if (options.length === 0) {
                          return 'No drawer selected';
                        } else if (options.length === 1) {
                          return options[0].label;
                        }
                        return 'Multiple Drawers';
                      }}
                    />
                  </div>
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        checked={this.state.isChecked}
                        style={{
                          marginTop: '10px',
                          marginLeft: '2px',
                        }}
                        ref={(input) => { hasDocumentSelect = input; }}
                        id="filterHasDocument"
                        onClick={this.toggleChange}
                      /> Has Documents
                    </label>
                  </div>
                  <div className={`${classes.buttonGroup} btn-group text-right`}>
                    <button
                      type="submit"
                      id="btnFilter"
                      className="btn btn-primary btn-md"
                      onClick={() => {
                        filterTabs(drawersSelect.selectRef.children,
                          hasDocumentSelect.checked);
                      }}
                    >Filter
                    </button>
                    <button
                      type="button"
                      id="btnReset"
                      className="btn btn-primary btn-md"
                      onClick={() => {
                        this.setState({ isChecked: false });
                        resetToDefault();
                      }}
                    >Reset
                    </button>
                  </div>
                </div> : null
            }
          </ReactCSSTransitionGroup>
        </div>
        <div className={`${classes.sortArea}`}>
          {
            !sortColumns ?
              <div />
              : sortColumns.map(column => (
                column.label !== '' && column.name !== '' ?
                  <SortIndicator
                    key={column.id}
                    onClick={() => onSortChanged(column.id)}
                    label={column.label}
                    status={column.state}
                    disabled={!column.name}
                    externalCssClass={classes.documentTabSort}
                  /> :
                  null
              ))
          }
        </div>
      </div>
    );
  }
}

DocumentTabFilterDesktopUI.propTypes = {
  toggleVisiblity: PropTypes.func.isRequired,
  resetToDefault: PropTypes.func.isRequired,
  filterTabs: PropTypes.func.isRequired,
  isFilterBoardVisible: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  drawers: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired),
  ishasDocumentChecked: PropTypes.bool.isRequired,
  onSortChanged: PropTypes.func.isRequired,
  sortColumns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
  }).isRequired),
};

export default DocumentTabFilterDesktopUI;
