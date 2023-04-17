import { keyframes } from 'styled-components';

export const fadeInOut = keyframes`
  0% { 
    transform: scale(.8);
    -webkit-transform: scale(.8);
    opacity: 0;
    -webkit-opacity: 0;
  }
  25% { 
    transform: scale(1);
    -webkit-transform: scale(1);
    opacity: 1;
    -webkit-opacity: 1;
  }
  100% { 
    transform: scale(.8);
    -webkit-transform: scale(.8);
    opacity: 0;
    -webkit-opacity: 0;
   }
`;

export const notice = keyframes`
  0% { 
    transform: scale(1);
    -webkit-transform: scale(1);
  }
  25% { 
    transform: scale(1.5);
    -webkit-transform: scale(1.5);
    opacity: .6;
    -webkit-opacity: .6;
  }
  100% { 
    transform: scale(1);
    -webkit-transform: scale(.8);
    opacity: 1;
    -webkit-opacity: 1;
   }
`;

export const fadeIn = keyframes`
  0% { 
    opacity: 0;
    -webkit-opacity: 0;
  }
  100% {
    opacity: 1;
    -webkit-opacity: 1;
  }
`;

export const fadeOut = keyframes`
  0% { 
    opacity: 1;
    -webkit-opacity: 1;
  }
  100% { 
    opacity: 0; 
    -webkit-opacity: 0;
  }
`;
