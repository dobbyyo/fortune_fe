import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CategoryWrapper from '@/components/Home/CategoryWrapper';

jest.mock('@/components/Home/CategoryButton', () => ({
  __esModule: true,
  default: ({ label }: { label: string }) => <div>{label}</div>,
}));

describe('CategoryWrapper Component', () => {
  test('renders category title', () => {
    render(<CategoryWrapper />);
    expect(screen.getByText('전체 카테고리')).toBeInTheDocument();
  });

  test('renders correct number of category buttons', () => {
    render(<CategoryWrapper />);
    const buttons = screen.getAllByText(/타로|사주|꿈해몽|작명/);
    expect(buttons).toHaveLength(4);
  });

  test('passes correct props to CategoryButton', () => {
    render(<CategoryWrapper />);
    expect(screen.getByText('타로')).toBeInTheDocument();
    expect(screen.getByText('사주')).toBeInTheDocument();
    expect(screen.getByText('꿈해몽')).toBeInTheDocument();
    expect(screen.getByText('작명')).toBeInTheDocument();
  });
});
