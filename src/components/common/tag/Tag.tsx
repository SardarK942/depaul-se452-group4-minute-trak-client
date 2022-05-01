import styled from '@emotion/styled';

/* Styled components */
const Tag = styled.span`
  border-radius: 10rem;
  padding: 0.25rem 0.75rem;
  text-align: center;
`;

const StyledTag = styled(Tag)<{ color: string; isOn: boolean }>`
  background-color: ${(props) => (props.isOn ? props.color : '#e0e0e0')};
  color: ${(props) => (props.isOn ? 'white' : '#f0f0f0')};
`;

/* Components  */
interface TagProps {
  isOn: boolean;
  style?: React.CSSProperties;
}

export function SubmittedTag({ isOn, style }: TagProps) {
  return (
    <StyledTag color="#0085c3" isOn={isOn} style={style}>
      Submitted
    </StyledTag>
  );
}

export function ApprovedTag({ isOn, style }: TagProps) {
  return (
    <StyledTag color="#339b57" isOn={isOn} style={style}>
      Approved
    </StyledTag>
  );
}
