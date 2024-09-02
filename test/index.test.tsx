import React from 'react';
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';
import '@testing-library/jest-dom';
import Metas from '../src/components/Metas';
// import '@testing-library/jest-dom/extend-expect';
import LoginTela from '../src/components/loginTela';
// import '@testing-library/jest-dom/extend-expect';
import { AuthProvider } from '../src/context/AuthContext';
import { useAuth } from '../src/context/AuthContext';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';


// jest.mock('@/context/AuthContext', () => ({
//     useAuth: () => ({
//       token: 'mock-token',
//     }),
// }));

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => {
    return <img src={src} alt={alt} />;
  },
}));

describe('Metas Component', () => {
  it('renders the Metas component with correct metaMes and metaAno', () => {
    render(
      // <AuthProvider>
    
        <Metas metaMes={35.701} metaAno={401.170} />
      //  </AuthProvider>
    );

    // Verifica se os textos esperados estão no documento
    expect(screen.getByText('Meta Outubro')).toBeInTheDocument();
    expect(screen.getByText('R$ 35.701,54')).toBeInTheDocument();
    expect(screen.getByText('Meta 2024')).toBeInTheDocument();
    expect(screen.getByText('R$ 401.170,50')).toBeInTheDocument();
  });
});
