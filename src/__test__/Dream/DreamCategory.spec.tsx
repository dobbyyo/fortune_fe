import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import DreamCategory from '@/components/Dream/DreamCategory';
import { RecoilRoot } from 'recoil';

describe('DreamCategory Component', () => {
  test('renders all category buttons with correct labels', () => {
    render(
      <RecoilRoot>
        <DreamCategory />
      </RecoilRoot>,
    );

    const categories = ['사람/행동', '죽음/영혼', '동물/곤충', '식품/과일', '자연현상', '생활용품', '태몽'];

    categories.forEach((label) => {
      const button = screen.getByText(label);
      expect(button).toBeInTheDocument();
    });
  });

  test('updates title when a category is clicked', () => {
    render(
      <RecoilRoot>
        <DreamCategory />
      </RecoilRoot>,
    );

    const categoryButton = screen.getByText('사람/행동');
    expect(categoryButton).toBeInTheDocument();

    // 클릭하여 상태 업데이트
    fireEvent.click(categoryButton);

    // Recoil 상태를 확인
    const updatedButton = screen.getByText('사람/행동');
    expect(updatedButton.closest('button')).toHaveClass('bg-[#eded]');
  });

  test('renders ResponsiveImage with correct props', () => {
    render(
      <RecoilRoot>
        <DreamCategory />
      </RecoilRoot>,
    );

    const image = screen.getByAltText('사람/행동');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/dream/png/person.png');
  });
});
