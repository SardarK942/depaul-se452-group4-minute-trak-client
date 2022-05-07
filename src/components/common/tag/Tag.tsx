import styled from '@emotion/styled';

/* Styled components */
const Tag = styled.span`
  border-radius: 10rem;
  padding: 0.25rem 0.75rem;
  margin: auto;
  font-size: 0.75rem;
`;

const statusTagTheme: { [status: string]: { bg: string; color: string } } = {
  draft: {
    bg: '#c0c0c0',
    color: '#ffffff',
  },
  pending: {
    bg: '#337ea0',
    color: '#ffffff',
  },
  approved: {
    bg: '#67ce8b',
    color: '#ffffff',
  },
  rejected: {
    bg: '#bb4545',
    color: '#ffffff',
  },
};

type statusType = 'draft' | 'pending' | 'approved' | 'rejected';

const StyledStatusTag = styled(Tag)<{ status: statusType }>`
  background-color: ${(props) => statusTagTheme[props.status].bg};
  color: ${(props) => statusTagTheme[props.status].color};
`;

export function StatusTag(props: { status: statusType; style?: React.CSSProperties }) {
  return (
    <StyledStatusTag status={props.status} style={props.style}>
      {props.status.toUpperCase()}
    </StyledStatusTag>
  );
}
