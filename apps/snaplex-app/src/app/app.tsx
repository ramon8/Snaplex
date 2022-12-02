import { io } from 'socket.io-client';
import styled from 'styled-components';

const StyledApp = styled.div`
  // Your style here
`;

const socket = io('http://localhost:3000');
export function App() {
  return (
    <StyledApp>
      Snaplex
    </StyledApp>
  );
}

export default App;
