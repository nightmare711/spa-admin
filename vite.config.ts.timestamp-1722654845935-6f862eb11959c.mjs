// vite.config.ts
import { TanStackRouterVite } from "file:///Users/MAC/Desktop/work/spa-admin/node_modules/.pnpm/@tanstack+router-vite-plugin@1.45.8_vite@4.4.7_@types+node@20.14.11_less@4.2.0_terser@5.31.3__jrxkbl62gqxfyhmm4we26jxb5i/node_modules/@tanstack/router-vite-plugin/dist/esm/index.js";
import react from "file:///Users/MAC/Desktop/work/spa-admin/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.0_vite@4.4.7_@types+node@20.14.11_less@4.2.0_terser@5.31.3_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import { defineConfig } from "file:///Users/MAC/Desktop/work/spa-admin/node_modules/.pnpm/vitest@0.33.0_jsdom@24.1.1_less@4.2.0_playwright@1.45.3_terser@5.31.3/node_modules/vitest/dist/config.js";
var vite_config_default = defineConfig({
  plugins: [react(), TanStackRouterVite()],
  server: {
    host: true,
    strictPort: true
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    css: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvTUFDL0Rlc2t0b3Avd29yay9zcGEtYWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9NQUMvRGVza3RvcC93b3JrL3NwYS1hZG1pbi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvTUFDL0Rlc2t0b3Avd29yay9zcGEtYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBUYW5TdGFja1JvdXRlclZpdGUgfSBmcm9tIFwiQHRhbnN0YWNrL3JvdXRlci12aXRlLXBsdWdpblwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlc3QvY29uZmlnXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRwbHVnaW5zOiBbcmVhY3QoKSwgVGFuU3RhY2tSb3V0ZXJWaXRlKCldLFxuXHRzZXJ2ZXI6IHtcblx0XHRob3N0OiB0cnVlLFxuXHRcdHN0cmljdFBvcnQ6IHRydWUsXG5cdH0sXG5cdHRlc3Q6IHtcblx0XHRlbnZpcm9ubWVudDogXCJqc2RvbVwiLFxuXHRcdHNldHVwRmlsZXM6IFtcIi4vdml0ZXN0LnNldHVwLnRzXCJdLFxuXHRcdGNzczogdHJ1ZSxcblx0fSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUixTQUFTLDBCQUEwQjtBQUN4VCxPQUFPLFdBQVc7QUFDbEIsU0FBUyxvQkFBb0I7QUFHN0IsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsU0FBUyxDQUFDLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQztBQUFBLEVBQ3ZDLFFBQVE7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOLFlBQVk7QUFBQSxFQUNiO0FBQUEsRUFDQSxNQUFNO0FBQUEsSUFDTCxhQUFhO0FBQUEsSUFDYixZQUFZLENBQUMsbUJBQW1CO0FBQUEsSUFDaEMsS0FBSztBQUFBLEVBQ047QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
