import styled from '@emotion/styled';
import { Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import ModalDimmer from './ModalDimmer';

type Props = {
  handleClose: Function;
  handleSubmit: Function;
};

function ModalNewRequest({ handleClose, handleSubmit }: Props) {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [reason, setReason] = useState<string | null>(null);
  const [radio, setRadio] = useState<'paid' | 'unpaid'>('paid');
  const [error, setError] = useState<{ type: 'date' | 'duplicate'; msg: string } | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ModalDimmer handleClose={handleClose}>
        <Modal onMouseDown={(e) => e.stopPropagation()}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            New Request
          </Typography>

          <div style={{ marginTop: '2rem' }} />
          <DesktopDatePicker
            label="Start Date"
            inputFormat="yyyy-MM-dd"
            value={startDate}
            onChange={(date) => setStartDate(date || '')}
            renderInput={(params) => <TextField {...params} />}
          />
          <div style={{ marginTop: '1rem' }} />
          <DesktopDatePicker
            label="End Date"
            inputFormat="yyyy-MM-dd"
            value={endDate}
            onChange={(date) => setEndDate(date || '')}
            renderInput={(params) => <TextField {...params} />}
          />

          <TextField
            sx={{ marginTop: '1rem' }}
            label="Reason for Request"
            variant="outlined"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

          <RadioGroup
            sx={{ marginTop: '1rem' }}
            value={radio}
            onChange={({ target: { value } }) => setRadio(value === 'paid' ? 'paid' : 'unpaid')}
          >
            <FlexContainer>
              <FormControlLabel value="paid" control={<Radio />} label="Paid" />
              <FormControlLabel sx={{ marginLeft: '0.5rem' }} value="unpaid" control={<Radio />} label="Unpaid" />
            </FlexContainer>
          </RadioGroup>

          {error && (
            <Typography variant="body1" sx={{ marginTop: '0.25rem', color: 'red' }}>
              {'This project already exist on this sheet.'}
            </Typography>
          )}
          <Button
            onClick={() => handleSubmit(startDate, endDate, reason, radio === 'paid')}
            disabled={!startDate || !endDate || !reason}
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
const FlexContainer = styled.div`
  display: flex;
`;

export default ModalNewRequest;
