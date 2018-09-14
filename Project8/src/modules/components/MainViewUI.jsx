import React from 'react';
import PropTypes from 'prop-types';

const MainViewUI = ({
  onNewEmployeeCreation,
  onEmployeeDeletion,
  employeeData,
}) =>
  (
    <div
      className="main_view"
    >
      <table>
        <thead>
          <tr>
            <th>EmpID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Salary</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {
            employeeData && employeeData.length > 0 ?
              employeeData.map(emp =>
                <tr>
                  <td>emp.empId</td>
                  <td>emp.name</td>
                  <td>emp.age</td>
                  <td>emp.salary</td>
                  <td>
                    <button
                      onClick={onEmployeeDeletion(emp.empId)}
                    >
                      -Remove
                    </button>
                  </td>
                </tr>,
              ) : null
          }
          <tr>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td>
              <button
                onClick={onNewEmployeeCreation}
              >
                +Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

MainViewUI.propTypes = {
  onNewEmployeeCreation: PropTypes.func.isRequired,
  onEmployeeDeletion: PropTypes.func.isRequired,
  employeeData: PropTypes.string.isRequired,
};

export default MainViewUI;
