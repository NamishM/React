import PropTypes from 'prop-types';
import React from 'react';
import '../css/patientSearch.less';
import { Control } from 'react-redux-form';
import InputElement from 'react-input-mask';
// import format from 'date-fns/format';
import isFuture from 'date-fns/is_future';
import isValid from 'date-fns/is_valid';
import parse from 'date-fns/parse';
import SearchBox from 'srs/common/components/SearchBox';
import DateTime from 'react-datetime';
import '!!style!css!react-datetime/css/react-datetime.css';

DateTime.displayName = 'DateTime';

const NativeField = props => (
  <Control.text
    component={InputElement}
    {...props}
  />
);

const DateTimeShim = props => (
  <Control
    component={DateTime}
    mapProps={{
      defaultValue: props.modelValue, // eslint-disable-line
      onFocus: () => {},
      onBlur: () => {},
      // onChange: (props) => props.onChange, // eslint-disable-line
      onChange: (props) => (value) => { // eslint-disable-line
        if (value && value.isValid && value.isValid()) {
          // reducer expects a string
          props.onChange(value.format('MM/DD/YYYY')); // eslint-disable-line
        } else {
          props.onChange(value); // eslint-disable-line
        }
      },
    }}
    {...props}
  />
);

const AdvanceSearch = ({
  canShowAdvanceSearchPanel,
  onSearch,
  onClear,
  searchCriteria,
  searchCriteriaForm: fields,
  allField,
  onAdvanceSearchClick,
}) => {
  const classNames = canShowAdvanceSearchPanel ? '' : 'hide';

  return (
    <div className="filter-Panel">
      <div>
        <SearchBox
          textValue={allField}
          onAdvancedSearchClick={() => onAdvanceSearchClick(searchCriteria)}
          isFilterBoardVisible={canShowAdvanceSearchPanel}
        />
      </div>
      <div className={classNames}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(searchCriteria);
          }}
        >
          <div className="search-Form">
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 leftbar">
                <div className={`${searchCriteria.lastName ? null : 'resetInputColor'}`}>
                  <Control
                    model="searchCriteria.lastName"
                    type="text"
                    className="form-control"
                    id="txtLastName"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 rightbar">
                <div className={`${searchCriteria.firstName ? null : 'resetInputColor'}`}>
                  <Control
                    model="searchCriteria.firstName"
                    type="text"
                    className="form-control"
                    id="txtFirstName"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 leftbar">
                <div className={`${fields.dob.valid ? null : 'has-error'}`}>
                  <DateTimeShim
                    model="searchCriteria.dob"
                    validators={{
                      isDate: (value) => {
                        const parsed = parse(value);
                        return !value ? true : isValid(parsed) && !isFuture(parsed);
                      },
                    }}
                    validateOn="change"
                    closeOnSelect
                    dateFormat="MM/DD/YYYY"
                    value={searchCriteria.dob ? searchCriteria.dob : null}
                    viewMode="days"
                    timeFormat={false}
                    inputProps={{
                      placeholder: 'DOB',
                      readOnly: true,
                    }}
                    isValidDate={current => !isFuture(current)}
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 rightbar">
                <div className={`${searchCriteria.sharedId ? null : 'resetInputColor'}`}>
                  <Control
                    model="searchCriteria.sharedId"
                    type="text"
                    className="form-control"
                    id="txtSharedId"
                    placeholder="Shared Id"
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 leftbar">
                <div>
                  <NativeField
                    model="searchCriteria.phone"
                    className="form-control"
                    id="txtPhone"
                    mask={searchCriteria.phoneMask}
                    placeholder="Phone"
                  />
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 rightbar">
                <div>
                  <NativeField
                    model="searchCriteria.ssn"
                    className="form-control"
                    id="txtSSN"
                    mask={searchCriteria.ssnMask}
                    placeholder="SSN"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 text-right">
                <button
                  type="submit"
                  id="btnFind"
                  className="btn btn-primary btn-md"
                  disabled={!fields.dob.valid}
                >
                  Find
                </button>
                <button
                  type="button"
                  id="btnClear"
                  className="btn btn-primary btn-md"
                  onClick={() => onClear()}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

AdvanceSearch.propTypes = {
  canShowAdvanceSearchPanel: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  searchCriteria: PropTypes.shape().isRequired,
  searchCriteriaForm: PropTypes.shape().isRequired,
  isDateFieldView: PropTypes.bool.isRequired,
  setDateFieldView: PropTypes.func.isRequired,
  onAdvanceSearchClick: PropTypes.func.isRequired,
  allField: PropTypes.string.isRequired,
};

export default AdvanceSearch;
