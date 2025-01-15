import '@testing-library/jest-dom';

import RenderTabContent from '@/components/Naming/RenderTabContent';
import { render } from '@testing-library/react';

jest.mock('@/components/Naming', () => ({
  AiNaming: jest.fn(() => <div>Mocked AI Naming</div>),
  ProfessionalNaming: jest.fn(() => <div>Mocked Professional Naming</div>),
}));

describe('renderTabContent', () => {
  test('renders AiNaming component when activeTabKey is "aiNaming"', () => {
    const { getByText } = render(<RenderTabContent activeTabKey="aiNaming" />);
    expect(getByText('Mocked AI Naming')).toBeInTheDocument();
  });

  test('renders ProfessionalNaming component when activeTabKey is "professionalNaming"', () => {
    const { getByText } = render(<RenderTabContent activeTabKey="professionalNaming" />);
    expect(getByText('Mocked Professional Naming')).toBeInTheDocument();
  });

  test('renders default content when activeTabKey is invalid', () => {
    const { getByText } = render(<RenderTabContent activeTabKey="invalidTabKey" />);
    expect(getByText('탭을 선택하세요')).toBeInTheDocument();
  });
});
