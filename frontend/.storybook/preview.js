import 'semantic-ui-css/semantic.min.css';
import '../src/index.css';
import { addDecorator, configure } from '@storybook/react';
import StoryRouter from 'storybook-react-router';
import requireContext from 'require-context.macro';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
};
addDecorator(StoryRouter());
