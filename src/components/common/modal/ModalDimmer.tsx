import styled from '@emotion/styled';
import React from 'react';

type Props = {
  children?: React.ReactNode;
  handleClose?: Function;
};

function ModalDimmer({ children, handleClose }: Props) {
  return (
    <Dimmer onClick={() => handleClose && handleClose()}>
      <Container>{children}</Container>
    </Dimmer>
  );
}

const Dimmer = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgb(0, 0, 0, 0.4);
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ModalDimmer;
