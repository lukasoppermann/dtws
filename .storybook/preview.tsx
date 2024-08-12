import React from 'react';
import type { Preview } from "@storybook/react";

import '../src/stories/documentation.css';
import { DocsContainer } from '@storybook/blocks';


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
