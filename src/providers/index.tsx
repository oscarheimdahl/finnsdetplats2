import { ReactNode } from 'react';

import AppStateProvider from './app-state';

export default function Providers({ children }: { children: ReactNode }) {
  return <AppStateProvider>{children}</AppStateProvider>;
}
