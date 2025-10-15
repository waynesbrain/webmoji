import { resolve } from "node:path";
import { transform } from "esbuild";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  publicDir: false,
  build: {
    // assetsInlineLimit: 0, // Consider if CSS gets inline?
    minify: "esbuild",
    lib: {
      entry: [
        resolve(__dirname, "./src/data.ts"),
        resolve(__dirname, "./src/data_all.ts"),
        resolve(__dirname, "./src/data_tags.ts"),
      ],
      name: "webmoji",
      formats: ["es"],
      // fileName: "index",
    },
    // rollupOptions: {
    //   external: [
    //     // /^@tiptap\//,
    //     // "@tiptap/core",
    //     // "@tiptap/pm",
    //     // "@tiptap/suggestion",
    //   ],
    //   /* To inspect source paths as-imported, use this:
    //   external: (source, importer, isResolved) => {
    //     console.log(source, { importer, isResolved });
    //     const externals: (string | RegExp)[] = [
    //       // ...copy from above
    //     ];
    //     return externals.some((external) => {
    //       return (external instanceof RegExp)
    //         ? external.test(source)
    //         : external === source;
    //     });
    //   },
    //   */
    //   // output: {
    //   //   globals: {
    //   //     react: "React",
    //   //     "react-dom": "ReactDOM",
    //   //   },
    //   // },
    // },
    // sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [
    minifyEs(),
    /**
     * Bundle type declarations into a single index.d.ts file.
     * See https://github.com/vitejs/vite/issues/2049
     */
    dts({
      rollupTypes: true,
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
});

// Workaround for https://github.com/vitejs/vite/issues/6555
function minifyEs() {
  return {
    name: "minifyEs",
    renderChunk: {
      order: "post" as const,
      async handler(code: any, _chunk: any, outputOptions: any) {
        if (
          outputOptions.format === "es"
          // && (!bundleComponents || chunk.fileName.endsWith(".min.js"))
        ) {
          return await transform(code, { minify: true });
        }
        return code;
      },
    },
  };
}
