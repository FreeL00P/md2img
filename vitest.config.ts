import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['node_modules', '.next', 'tests/e2e/**']
  }
});
