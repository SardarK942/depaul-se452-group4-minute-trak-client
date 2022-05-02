import { FormControl, MenuItem, Select } from '@mui/material';

interface TdSelectHourProps {
  idx: number;
  prop: string;
  value: number | null;
  handleChangeHourSelect: (index: number, prop: string, newValue: number) => void;
  isReadOnly: boolean;
}

function TdSelectHour({ idx, prop, value, handleChangeHourSelect, isReadOnly }: TdSelectHourProps) {
  const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <td>
      <FormControl sx={{ width: '100%' }}>
        <Select
          id={prop}
          sx={value ? { minWidth: '4rem', backgroundColor: '#a7d9ef' } : { minWidth: '4rem' }}
          value={value}
          onChange={(e) => handleChangeHourSelect(idx, prop, Number(e.target.value))}
          readOnly={isReadOnly}
        >
          {items.map((item, idx) => (
            <MenuItem key={idx} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </td>
  );
}

export default TdSelectHour;
