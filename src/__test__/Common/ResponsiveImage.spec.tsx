import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ResponsiveImage from '@/components/Common/ResponsiveImage';

describe('ResponsiveImage Component', () => {
  test('renders <picture> and <img> elements correctly', () => {
    render(
      <ResponsiveImage
        webpSrc="/home/webp/tarot.webp"
        pngSrc="/home/png/tarot.png"
        alt="Responsive Test"
        className="test-class"
      />,
    );

    // <picture> 태그 확인
    const picture = screen.getByRole('img').parentElement;
    expect(picture).toBeInTheDocument();
    expect(picture?.tagName).toBe('PICTURE');

    // <img> 태그 확인
    const img = screen.getByAltText('Responsive Test');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/home/png/tarot.png'); // PNG 경로 확인
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveClass('test-class');
  });

  test('renders correct WebP source', () => {
    render(<ResponsiveImage webpSrc="/home/webp/tarot.webp" pngSrc="/home/png/tarot.png" alt="Responsive Test" />);

    const source = screen.getByRole('img').previousElementSibling;
    expect(source).toBeInTheDocument();
    expect(source).toHaveAttribute('srcset', '/home/webp/tarot.webp'); // WebP 경로 확인
    expect(source).toHaveAttribute('type', 'image/webp');
  });

  test('handles click events', () => {
    const handleClick = jest.fn();

    render(
      <ResponsiveImage
        webpSrc="/home/webp/tarot.webp"
        pngSrc="/home/png/tarot.png"
        alt="Responsive Test"
        handleClick={handleClick}
      />,
    );

    const img = screen.getByAltText('Responsive Test');
    fireEvent.click(img);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
