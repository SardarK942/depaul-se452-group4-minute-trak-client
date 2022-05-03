import styled from '@emotion/styled';
import { Button, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { useState } from 'react';
import { Project, Work } from '../../../types/timesheetTypes';
import ModalDimmer from './ModalDimmer';

interface Props {
  projects: Project[] | null;
  works: Work[] | undefined;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddRow: (pId: number) => void;
}

function ModalSelectProject({ projects, works, setModal, handleAddRow }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  function handleSubmit() {
    if (!selectedId) return;
    handleAddRow(selectedId);
    setModal(false);
  }

  function handleChangeSelect(e: SelectChangeEvent<number | null>) {
    const value = Number(e.target.value);
    isDuplicatedProject(value, works) ? setError(true) : setError(false);
    setSelectedId(value);
  }

  function isDuplicatedProject(pId: number, works: Work[] | undefined): boolean {
    if (!works) return true;
    return works.filter((work) => work.pId === pId).length > 0;
  }

  return (
    <ModalDimmer handleClose={() => setModal(false)}>
      <Modal onMouseDown={(e) => e.stopPropagation()}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Select a project
        </Typography>
        <Select
          sx={{ width: '30rem', marginTop: '1.5rem', height: '3.5rem' }}
          value={selectedId}
          onChange={handleChangeSelect}
        >
          {projects?.map((project) => (
            <MenuItem value={project.pId} sx={{ fontWeight: 'bold' }}>
              {project.projectName}
            </MenuItem>
          ))}
        </Select>
        {error && (
          <Typography variant="body1" sx={{ marginTop: '0.25rem', color: 'red' }}>
            {'This project already exist on this sheet.'}
          </Typography>
        )}
        <Button
          onClick={handleSubmit}
          disabled={error || !selectedId}
          variant="contained"
          sx={{ width: '100%', height: '3rem', marginTop: '1.5rem' }}
        >
          SELECT
        </Button>
        <Button
          onClick={() => setModal(false)}
          variant="outlined"
          color="warning"
          sx={{ width: '100%', height: '3rem', marginTop: '0.5rem' }}
        >
          CANCEL
        </Button>
      </Modal>
    </ModalDimmer>
  );
}

const Modal = styled.div`
  min-width: 20rem;
  padding: 2rem 2rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 1px 1px 2px 0px rgb(255, 255, 255, 0.3);

  display: flex;
  flex-direction: column;
`;

export default ModalSelectProject;
