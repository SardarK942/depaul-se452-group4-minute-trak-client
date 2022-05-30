import { Box, Button, TextField, Typography} from '@mui/material';
import React, { useState, useEffect } from 'react';
import adminAPI from '../../../apis/adminAPI';

// import { useInput } from '../../../utility/customHooks';
import  NavbarAdmin from '../../../components/common/navbar/NavbarAdmin';
import { TimeoffsheetListItem } from '../../../types/timesheetTypes';
import styles from './adminViews.module.css';


function TimeOffRequestApprovals() {
  // const variable = useInput('');
  const [timeoffsheetList, setTimeoffsheetList] = useState<TimeoffsheetListItem[]>([]);

  
  useEffect(() => {
    (async () => {
      const timeOffSheetData = filterTimeOffSheetByPending(await getAllTimeOffSheets());
      setTimeoffsheetList(timeOffSheetData);

    })();
  }, []);


  function getAllTimeOffSheets(): Promise<TimeoffsheetListItem[]> {
    const data = adminAPI
      .get('/getAllTimeOffRequests')
      .then((res) => res.data)
      .catch((e) => alert(e));

    return data;
  }

  function respondToTimeOff(bool: boolean, item: TimeoffsheetListItem): any {
    (bool ? item.isApproved = true : item.isApproved = false);
    const data = adminAPI
      .get('/updateTimeRequest', {
        params: {
          timeOffRequestEntity: item
        }
      })
      .then((res) => res.data)
      .catch((e) => alert(e));

    return data;
  }

  function filterTimeOffSheetByPending(timeoffsheetList: TimeoffsheetListItem[]): TimeoffsheetListItem[]{
      return timeoffsheetList; //use filter 
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
                  req ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Employee ID 
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  From Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  To Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  PTO
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
              {timeoffsheetList?.map(item => {
                return (
            <tr key={item.rid}>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium uppercase">
                        {item.rid}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" >
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium">
                        {item.eid}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium" >
                        {item.startDate}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium">
                        {item.endDate}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-500">
                        {item.isPaid}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-500">
                        {(!item.isApproved) ? "Pending": "Approved"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-500">
                        <Button onClick={respondToTimeOff(true, item)}>Approve</Button>
                        <Button onClick={respondToTimeOff(false, item)}>Reject</Button>
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

export default TimeOffRequestApprovals;
