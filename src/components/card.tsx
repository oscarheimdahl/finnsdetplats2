import { fa1, fa2, faDisplay, faInfoCircle, faParking } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';

import { Booking } from '../providers/app-state';
import { fadeIn } from '../utils/keyframes';
import { hasPassed, isToday, isWeekend, parseDate, parseDay, parseMonth } from '../utils/week';
import Button from './button';
import Modal from './modal';

interface Styled {
  date: string;
}

interface Props extends Styled {
  bookings: Booking[];
}

const Container = styled.div<Styled>`
  display: flex;
  border-radius: 0.5rem;
  padding: ${({ date }) => (isToday(date) ? '.5rem 1rem' : '.5rem')};
  background-color: ${({ date }) =>
    hasPassed(date) ? 'rgba(255, 255, 255, 40%)' : isToday(date) ? 'white' : 'rgb(250, 250, 250)'};
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 15%);
  margin-left: ${({ date }) => (isToday(date) ? '-1rem' : '0')};
  margin-right: ${({ date }) => (isToday(date) ? '-1rem' : '0')};
  animation-name: ${fadeIn};
  -webkit-animation-name: ${fadeIn};
  animation-duration: 0.3s;
  -webkit-animation-duration: 0.3s;
  animation-timing-function: ease-in;
  -webkit-animation-timing-function: ease-in;

  @media screen and (max-width: 500px) {
    border-radius: ${({ date }) => (isToday(date) ? '0' : '.5rem')};
  }

  @media screen and (min-width: 501px) {
    margin-top: 1rem;
  }

  & .date {
    display: flex;
    align-items: center;
    font-size: ${({ date }) => (isToday(date) ? '4rem' : '3rem')};
    line-height: ${({ date }) => (isToday(date) ? '4rem' : '3rem')};
    letter-spacing: -0.25rem;
    font-weight: ${({ date }) => (isToday(date) ? '400' : '300')};
    font-family: 'Roboto Condensed', sans-serif;
    color: ${({ date }) => (hasPassed(date) ? 'rgb(150, 150, 150)' : isWeekend(date) ? 'rgb(200, 80, 80)' : '#222')};
  }

  & .daymonth {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    padding: 0 0.5rem;

    .dayname {
      font-size: ${({ date }) => (isToday(date) ? '1.5rem' : '1.25rem')};
      line-height: ${({ date }) => (isToday(date) ? '1.75rem' : '1.5rem')};
      letter-spacing: -0.05rem;
      font-family: 'Roboto Condensed', sans-serif;
      font-weight: 400;
      color: ${({ date }) =>
        hasPassed(date) ? 'rgb(180, 180, 180)' : isWeekend(date) ? 'rgb(200, 120, 120)' : '#555'};
      text-transform: uppercase;

      :first-letter {
        font-size: ${({ date }) => (isToday(date) ? '2.25rem' : '1.75rem')};
      }
    }

    .month {
      font-size: ${({ date }) => (isToday(date) ? '1.25rem' : '.9rem')};
      line-height: ${({ date }) => (isToday(date) ? '1.25rem' : '.9rem')};
      font-weight: 400;
      color: ${({ date }) =>
        hasPassed(date) ? 'rgb(190, 190, 190)' : isWeekend(date) ? 'rgb(200, 150, 150)' : '#888'};
      text-transform: uppercase;
      font-family: 'Roboto Condensed', sans-serif;
    }
  }

  & .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 0.5rem;
    margin-right: 0.5rem;
    font-size: 1.25rem;
    color: rgb(6, 155, 229);
    cursor: pointer;
  }

  & .actions {
    display: flex;
    gap: 0.5rem;
  }
`;

const UserDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;

  & > img {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
  }

  & > span {
    margin-left: 0.5rem;
    font-weight: 700;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  & span {
    font-weight: normal;
  }
`;

export default function Card({ date, bookings }: Props) {
  const [modal, setModal] = useState<boolean>(false);
  const dBookings = bookings.filter(({ type }) => type === 'd');
  const dBookingsPart1 = dBookings.filter(({ partOfDay }) => partOfDay === undefined || partOfDay === 1);
  const dBookingsPart2 = dBookings.filter(({ partOfDay }) => partOfDay === 2);
  const pBookings = bookings.filter(({ type }) => type === 'p');

  return (
    <>
      <Container date={date}>
        <div className='date'>{parseDate(date)}</div>

        <div className='daymonth'>
          <div className='dayname'>{parseDay(date)}</div>

          <div className='month'>{parseMonth(date)}</div>
        </div>

        {(dBookings.length > 0 || pBookings.length > 0) && (
          <div className='info' onClick={() => setModal(!modal)}>
            <FontAwesomeIcon icon={faInfoCircle} style={{ fontSize: isToday(date) ? '2rem' : '1.5rem' }} />
          </div>
        )}

        <div className='actions'>
          <Button type='d' date={date} partOfDay={1} bookings={dBookingsPart1} />
          <Button type='d' date={date} partOfDay={2} bookings={dBookingsPart2} />
          <Button type='p' date={date} bookings={pBookings} />
        </div>
      </Container>

      {modal && (
        <Modal close={() => setModal(!modal)}>
          <header>{parseDay(date) + ' ' + parseDate(date) + ' ' + parseMonth(date)}</header>

          <Main>
            {dBookingsPart1.length > 0 && (
              <div>
                <h4>Förmiddag</h4>
                {dBookingsPart1.map(({ displayName, photoURL }, key) => (
                  <UserDetails key={key}>
                    <img src={photoURL} alt={displayName} />
                    <span>{displayName}</span>
                  </UserDetails>
                ))}
              </div>
            )}
            {dBookingsPart2.length > 0 && (
              <div>
                <h4>Eftermiddag</h4>
                {dBookingsPart2.map(({ displayName, photoURL }, key) => (
                  <UserDetails key={key}>
                    <img src={photoURL} alt={displayName} />
                    <span>{displayName}</span>
                  </UserDetails>
                ))}
              </div>
            )}

            {pBookings.length > 0 && (
              <div>
                <h4>Parkering</h4>
                {pBookings.map(({ displayName, photoURL }, key) => (
                  <UserDetails key={key}>
                    <img src={photoURL} alt={displayName} />
                    <span>{displayName}</span>
                  </UserDetails>
                ))}
              </div>
            )}
          </Main>
        </Modal>
      )}
    </>
  );
}
