import { Box, Button, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import adminAPI from '../../../apis/adminAPI';
import timesheetAPI from '../../../apis/timesheetAPI';
// import { useInput } from '../../../utility/customHooks';
import  NavbarAdmin from '../../../components/common/navbar/NavbarAdmin';
import { AdminTimesheetListItem } from '../../../types/timesheetTypes';
import styles from './adminViews.module.css';



function TimesheetApprovals() {
  // const variable = useInput('');

  const [timesheetList, setTimesheetList] = useState<AdminTimesheetListItem[]>([]);

  
  useEffect(() => {
    (async () => {
      const timeSheetData = filterTimeSheetByPending(await getAllTimeSheets());
      setTimesheetList(timeSheetData);

    })();
  }, []);


  function getAllTimeSheets(): Promise<AdminTimesheetListItem[]> {
    const data = timesheetAPI
      .get('/list')
      .then((res) => res.data)
      .catch((e) => alert(e));

    return data;
  }

  function respondToTime(bool: boolean, item: AdminTimesheetListItem): any {
    (bool ? item.approved = true : item.rejected = true);
    const data = adminAPI
      .get('/updateTimesheet', {
        params: {
          timesheetEntity: item
        }
      })
      .then((res) => res.data)
      .catch((e) => alert(e));

    return data;
  }

  function filterTimeSheetByPending(timesheetList: AdminTimesheetListItem[]): AdminTimesheetListItem[]{
    return timesheetList.filter(item => !item.approved && !item.rejected);

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
                   tID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Employee Full Name 
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  Start Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                  End Date
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
              {timesheetList?.map(item => {
                return (
            <tr key={item.tid}>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium uppercase">
                        {item.tid}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap" >
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium">
                        {item.employee.firstName + " " + item.employee.lastName}
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
                        {item.submitted}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-500">
                        {(!item.approved && !item.rejected) ? "Pending": (item.approved ? "Approved" : "Rejected")}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-lg font-medium text-gray-500">
                        <Button onClick={respondToTime(true, item)}>Approve</Button>
                        <Button onClick={respondToTime(false, item)}>Reject</Button>
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

export default TimesheetApprovals;
