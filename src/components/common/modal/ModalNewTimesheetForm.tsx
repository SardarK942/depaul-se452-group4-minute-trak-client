import styled from '@emotion/styled';
import { Button, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import ModalDimmer from './ModalDimmer';
import { addDaysToISODateString, convertDateStringToISODateString } from '../../../utility/dateUtility';

type Props = {
  handleClose: Function;
  handleSubmit: Function;
};

function ModalNewTimesheetForm({ handleClose, handleSubmit }: Props) {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [error, setError] = useState<{ type: 'date' | 'duplicate'; msg: string } | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ModalDimmer handleClose={handleClose}>
        <Modal onMouseDown={(e) => e.stopPropagation()}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            New Timesheet Form
          </Typography>
          <div style={{ marginTop: '2rem' }} />
          <DesktopDatePicker
            label="Start Date"
            inputFormat="yyyy-MM-dd"
            value={startDate}
            onChange={(date) => setStartDate(date || '')}
            renderInput={(params) => <TextField {...params} />}
          />
          {startDate && (
            <>
              <Typography variant="h5" sx={{ marginTop: '1.5rem', fontWeight: 'bold' }}>
                {`Start Date: ${convertDateStringToISODateString(startDate)}`}
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {`End Date: ${addDaysToISODateString(startDate, 13)}`}
              </Typography>
            </>
          )}
          <Button
            onClick={() =>
              startDate &&
              handleSubmit(convertDateStringToISODateString(startDate), addDaysToISODateString(startDate, 13))
            }
            disabled={!startDate}
            variant="contained"
            sx={{ width: '100%', height: '3rem', marginTop: '1.5rem' }}
          >
            Submit
          </Button>
          <Button
            onClick={() => handleClose()}
            variant="outlined"
            color="warning"
            sx={{ width: '100%', height: '3rem', marginTop: '0.5rem' }}
          >
            CANCEL
          </Button>
        </Modal>
      </ModalDimmer>
    </LocalizationProvider>
  );
}

const Modal = styled.div`
  width: 100%;
  max-width: 32rem;
  min-width: 20rem;
  padding: 2rem 3rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 1px 1px 2px 0px rgb(255, 255, 255, 0.3);

  display: flex;
  flex-direction: column;
`;

export default ModalNewTimesheetForm;
