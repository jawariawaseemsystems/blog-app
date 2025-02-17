/**
 * @jest-environment jsdom
 */
  
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Sidebar } from '../components/Sidebar';
import { useUser } from '../hooks/useUser'; 


jest.mock('../hooks/useUser');

describe('Sidebar', () => {
  
    it('displays user info when data is loaded', async () => {
        (useUser as jest.Mock).mockReturnValue({
            user: { name: 'John Doe', email: 'johndoe@example.com' },
            loading: false
        });

        render(<Sidebar />);

        expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByText(/johndoe@example.com/i)).toBeInTheDocument();
    });
});
