import { Box, Button, TextField, Typography} from '@mui/material';
import React, { useState, useEffect } from 'react';
import adminAPI from '../../../apis/adminAPI';

// import { useInput } from '../../../utility/customHooks';
import  NavbarAdmin from '../../../components/common/navbar/NavbarAdmin';
import { Employee } from '../../../types/timesheetTypes';
import styles from './adminViews.module.css';


function AccountApprovals() {
  // const variable = useInput('');
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);


  useEffect(() => {
    (async () => {
      const employeeListData = filterEmployeesByPending(await getAllEmployees());
      setEmployeeList(employeeListData);

    })();
  }, []);


  function getAllEmployees(): Promise<Employee[]> {
    const data = adminAPI
      .get('/getAllEmployees')
      .then((res) => res.data)
      .catch((e) => alert(e));

    return data;
  }

  function respondToAction(bool: boolean, item: Employee): any {
    (bool ? item.isApproved = true : item.isApproved = false);
    const data = adminAPI
      .get('/updateEmployeeInfo', {
        params: {
          employeeEntity: item
        }
      })
      .then((res) => res.data)
      .catch((e) => alert(e));

    return data;
  }

  function filterEmployeesByPending(employeeList: Employee[]): Employee[]{
        return employeeList.filter(item => !item.isApproved && !item.isRejected);
  }




  return (
    <>
    <NavbarAdmin/>
    <div className={styles.container}> 
      <div className={styles.body}>
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8" >
          <div className="shadow overflow-hidden  sm:rounded-lg" >
            <table className="min-w-full zui-table zui-table-horizontal zui-table-highlight" >
              <thead className="bg-gray-200 border">
              <tr>
              <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Employee Full Name 
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  DOB
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                 PTO Bank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Current Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                Actions                
                </th>
              </tr>
              </thead>
              <tbody>
              {employeeList?.map(item => {
                return (
            <tr key={item.id}>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium uppercase">
                        {item.id}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" >
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium">
                        {item.firstName + " " + item.lastName}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium" >
                        {item.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium">
                        {item.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-500">
                        {item.dob.toString()}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-500">
                        {item.address}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-500">
                        {item.ptoBank}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-500">
                      {(!item.isApproved && !item.isRejected) ? "Pending": (item.isApproved ? "Approved" : "Rejected")}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-500">
                        <Button onClick={respondToAction(true, item)}>Approve</Button>
                        <Button onClick={respondToAction(false, item)}>Reject</Button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
              </tr>
              );
            })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
     </div>
     </>
     )

}

export default AccountApprovals;
