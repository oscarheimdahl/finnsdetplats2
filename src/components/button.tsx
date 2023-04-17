import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParking, fa1, fa2 } from '@fortawesome/free-solid-svg-icons';

import { Booking, useAppState } from '../providers/app-state';
import { firestore } from '../firebase';
import { useEffect, useState } from 'react';
import { hasPassed, isToday } from '../utils/week';

interface Styled {
  button: string;
}

interface Props {
  type: 'd' | 'p';
  date: string;
  bookings: Booking[];
  partOfDay?: number;
}

const Container = styled.div<Styled>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 100%;
  border-radius: 0.5rem;
  background-color: ${({ button }) =>
    button === 'check' ? 'rgb(230, 250, 255)' : button === 'free' ? 'rgb(200, 250, 200)' : 'none'};
  color: ${({ button }) =>
    button === 'passed'
      ? 'rgb(150, 150, 150)'
      : button === 'check'
      ? 'rgb(6, 155, 229)'
      : button === 'free'
      ? 'rgb(40, 100, 40)'
      : 'rgb(130, 0, 0)'};
  box-shadow: ${({ button }) =>
    button === 'check'
      ? '0 .1rem .1rem rgba(0, 0, 0, 20%) inset'
      : button === 'free'
      ? '0 .1rem .1rem rgba(0, 0, 0, 20%)'
      : 'none'};
  cursor: ${({ button }) => (button === 'full' ? 'not-allowed' : 'pointer')};
`;

const ContainerP = styled(Container)`
  background-color: ${({ button }) =>
    button === 'check' ? 'rgb(230, 250, 255)' : button === 'free' ? 'rgb(200, 200, 250)' : 'none'};
  color: ${({ button }) =>
    button === 'passed'
      ? 'rgb(150, 150, 150)'
      : button === 'check'
      ? 'rgb(6, 155, 229)'
      : button === 'free'
      ? 'rgb(40, 40, 100)'
      : 'rgb(130, 0, 0)'};
`;

const Text = styled.span<{ date: string; trigger?: boolean }>`
  margin-top: 0.25rem;
  font-size: ${({ date }) => (isToday(date) ? '1rem' : '.8rem')};
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.05rem;
`;

interface Doc {
  date: string;
  type: 'p' | 'd';
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  partOfDay?: number;
}

export default function Button({ type, date, bookings, partOfDay }: Props) {
  const { user } = useAppState();
  const { uid, displayName, photoURL } = user!;
  const [loading, setLoading] = useState<boolean>(false);
  const [button, setButton] = useState<'passed' | 'free' | 'full' | 'check'>('free');
  const booked = bookings.filter((booking) => booking.date === date && booking.type === type);
  const personal = booked.filter((booking) => booking.uid === uid);
  const quantity = type === 'd' ? (!(date <= '2022-06-12' || date >= '2022-07-06') ? 5 : 8) : 3;

  const handleAdd = async () => {
    setLoading(true);
    const doc: Doc = {
      date,
      type,
      uid,
      displayName,
      photoURL,
    };
    if (partOfDay) doc.partOfDay = partOfDay;
    await addDoc(collection(firestore, 'bookings'), doc);
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    await deleteDoc(doc(firestore, 'bookings', personal[0].id!));
    setLoading(false);
  };

  useEffect(() => {
    if (hasPassed(date)) setButton('passed');
    else {
      if (personal.length > 0) setButton('check');
      else {
        if (booked.length >= quantity) setButton('full');
        else setButton('free');
      }
    }
    // eslint-disable-next-line
  }, [bookings]);

  const onClick = () => {
    if (loading) return;
    if (button === 'check' && !hasPassed(date)) handleDelete();
    if (button !== 'check' && button === 'free' && !hasPassed(date)) handleAdd();
  };

  if (type === 'p')
    return (
      <ContainerP button={button} onClick={onClick}>
        <FontAwesomeIcon icon={faParking} style={{ fontSize: isToday(date) ? '1.25rem' : '1rem' }} />
        <Text date={date}>{loading ? '...' : `${bookings.length} / ${quantity}`}</Text>
      </ContainerP>
    );

  return (
    <Container button={button} onClick={onClick}>
      <FontAwesomeIcon icon={partOfDay === 1 ? fa1 : fa2} style={{ fontSize: isToday(date) ? '1.25rem' : '1rem' }} />
      <Text date={date}>{loading ? '...' : `${bookings.length} / ${quantity}`}</Text>
    </Container>
  );
}
