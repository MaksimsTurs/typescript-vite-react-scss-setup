import { defineConfig } from "vitest/config"

export default defineConfig(() => {
  return {
    test: {
      environment:  "jsdom",
      isolate:      true,
      include:      ["./src/**/*.test.*"],
      clearMocks:   true,
      restoreMocks: true,
      mockReset:    true,
      exclude: [
        "**/node_modules/**", 
        "**/output/**", 
        "**/.{idea,git,cache,output,temp}/**", 
        "**/{vite,vitest}.config.*"
      ]
    },
  };
});