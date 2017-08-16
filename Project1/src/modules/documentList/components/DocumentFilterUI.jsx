import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../../chartBin/css/chartBinFilter.less';
import SearchBox from 'srs/common/components/SearchBox';

class DocumentFilterUI extends Component {
  constructor(props) {
    super(props);
    this.state = { isChecked: this.props.isShowDeletedChecked === true };
    this.toggleChange = () => {
      this.setState({ isChecked: !this.state.isChecked });
    };
  }
  render() {
    const {
      toggleVisiblity,
      isFilterBoardVisible,
      buttonText,
      resetToDefault,
      filterDocuments,
    } = this.props;
    let showDeleted;
    return (
      <div className="filter-Panel">
        <div>
          <SearchBox
            textValue={buttonText}
            onAdvancedSearchClick={() => toggleVisiblity()}
            isFilterBoardVisible={isFilterBoardVisible}
          />
        </div>
        <div style={{ display: isFilterBoardVisible ? 'block' : 'none' }} >
          <label>
            <input
              type="checkbox"
              checked={this.state.isChecked}
              style={{
                marginTop: '10px',
                marginLeft: '2px',
              }}
              ref={(input) => { showDeleted = input; }}
              id="filterDeleted"
              onClick={this.toggleChange}
            /> Show Deleted
          </label>
          <div className="row button-container">
            <div className="col-md-12 text-right">
              <button
                type="submit"
                id="btnFilter"
                className="btn btn-primary btn-md"
                onClick={() => {
                  filterDocuments(showDeleted.checked);
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

DocumentFilterUI.propTypes = {
  toggleVisiblity: PropTypes.func.isRequired,
  resetToDefault: PropTypes.func.isRequired,
  filterDocuments: PropTypes.func.isRequired,
  isShowDeletedChecked: PropTypes.bool.isRequired,
  isFilterBoardVisible: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default DocumentFilterUI;
