import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DreamTitle from '@/components/Dream/DreamTitle';

describe('DreamTitle Component', () => {
  test('renders the correct title text', () => {
    render(<DreamTitle />);

    const titleElement = screen.getByText('꿈을 해석해 드립니다');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('text-[18px]', 'sm:text-[20px]', 'font-bold', 'mt-5', 'text-center');
  });
});
