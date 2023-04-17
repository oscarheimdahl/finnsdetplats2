import { faAngleLeft, faAngleRight, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAppState } from '../providers/app-state';
import { fadeIn } from '../utils/keyframes';
import { getWeek, lastWeek, nextWeek, parseFullDate } from '../utils/week';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  animation-name: ${fadeIn};
  -webkit-animation-name: ${fadeIn};
  animation-duration: 0.3s;
  -webkit-animation-duration: 0.3s;
  animation-timing-function: ease-in;
  -webkit-animation-timing-function: ease-in;

  @media screen and (min-width: 501px) {
    padding: 0 1rem 1rem 1rem;
  }
`;

const Button = styled.span<{ next?: boolean; home?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: ${({ next, home }) => (next ? '.5rem 50% 50% .5rem' : home ? '.5rem' : '50% .5rem .5rem 50%')};
  background-color: rgb(6, 155, 229);
  font-size: 1.25rem;
  color: white;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    border-radius: ${({ next, home }) => (next ? '1rem 0 0 0' : home ? '1rem 1rem 0 0' : '0 1rem 0 0')};
    box-shadow: 0 0 0.25rem rgba(0, 0, 0, 25%);
  }

  @media screen and (min-width: 501px) {
    box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 15%);
  }
`;

export default function Navigate() {
  const { week, setWeek } = useAppState();
  const [show, setShow] = useState<boolean>(false);

  const handleLast = () => setWeek(lastWeek(week[0].date));
  const handleNext = () => setWeek(nextWeek(week[6].date));
  const handleCurrent = () => setWeek(getWeek());

  useEffect(() => {
    const currentDate = parseFullDate(new Date());
    if (week.filter(({ date }) => date === currentDate).length > 0) setShow(false);
    else setShow(true);
  }, [week]);

  return (
    <Container>
      <Button onClick={handleLast}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </Button>

      {show && (
        <Button home onClick={handleCurrent}>
          <FontAwesomeIcon icon={faCalendarDay} />
        </Button>
      )}

      <Button next onClick={handleNext}>
        <FontAwesomeIcon icon={faAngleRight} />
      </Button>
    </Container>
  );
}
