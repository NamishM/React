import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../../chartBin/css/chartBinFilter.less';
import 'react-bootstrap-multiselect/less/bootstrap-multiselect.less';
import SearchBox from 'srs/common/components/SearchBox';
import Multiselect from 'react-bootstrap-multiselect';

class DocumentTabFilterUI extends Component {
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
    } = this.props;
    let drawersSelect;
    let hasDocumentSelect;
    return (
      <div className="filter-Panel">
        <div>
          <SearchBox
            textValue={buttonText}
            onAdvancedSearchClick={() => toggleVisiblity()}
            isFilterBoardVisible={isFilterBoardVisible}
          />
        </div>
        <div
          style={{ display: isFilterBoardVisible ? 'block' : 'none' }}
        >
          <div>
            <h5>Drawers:</h5>
            <Multiselect
              data={drawers}
              multiple
              id="selectDrawers"
              buttonWidth="100%"
              buttonClass="form-control btn-default text-left"
              nonSelectedText="No Drawer selected"
              includeSelectAllOption="true"
              numberDisplayed="false"
              maxHeight="120"
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
          <div className="row button-container">
            <div className="col-md-12 text-right">
              <button
                type="submit"
                id="btnFilter"
                className="btn btn-primary btn-md"
                onClick={() => {
                  filterTabs(drawersSelect.selectRef.children,
                    hasDocumentSelect.checked);
                }}
              >
                Filter
              </button>
              <button
                type="button"
                id="btnReset"
                className="btn btn-primary btn-md"
                onClick={() => {
                  this.setState({ isChecked: false });
                  resetToDefault();
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DocumentTabFilterUI.propTypes = {
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
};

export default DocumentTabFilterUI;
