import { faHand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from 'firebase/auth';
import styled from 'styled-components';

import { auth } from '../firebase';
import { useAppState } from '../providers/app-state';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Icon = styled.span`
  font-size: 10rem;
  color: rgb(6, 155, 229);
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-top: 2rem;
  font-size: 1.5rem;
  color: rgb(6, 155, 229);
  text-align: center;

  & > span:first-child {
  }
`;

const Text = styled.div`
  padding: 1rem;
  margin-top: 1rem;
  font-size: 2em;
  color: rgb(6, 155, 229);
  text-align: center;
`;

const SignOut = styled.button`
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 15%);
  margin-top: 1rem;
  border: none;
  font-size: 1rem;
`;

export default function NotOk() {
  const { user } = useAppState();

  return (
    <Container>
      <Icon>
        <FontAwesomeIcon icon={faHand} />
      </Icon>

      <User>
        <span>{user!.displayName}</span>
        <span>{user!.email}</span>
      </User>

      <Text>
        Cygnianer only!
        <br />
        Använd din Cygni Mail
      </Text>

      <SignOut onClick={async () => await signOut(auth)}>Logga ut och försök igen...</SignOut>
    </Container>
  );
}
