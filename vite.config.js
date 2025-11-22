import { defineConfig } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// ==============================
// 🔧 基础路径常量
// ==============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SRC_DIR = resolve(__dirname, "src/js");
const OUT_DIR = resolve(__dirname, "templates/assets/js");

// ==============================
// 🧩 插件封装
// ==============================

// 开发模式下自动构建 main.js
function haloDevBuildPlugin(outDir, srcDir) {
  let isBuilding = false;
  
  const buildMainJs = async () => {
    if (isBuilding) return;
    isBuilding = true;
    
    try {
      const { build } = await import("vite");
      await build({
        build: {
          outDir,
          emptyOutDir: false,
          write: true,
          rollupOptions: {
            input: resolve(srcDir, "main.js"),
            output: {
              entryFileNames: "main.js",
              format: "es",
            },
          },
        },
      });
      console.log("📦 [dev-build] main.js 已构建");
    } catch (e) {
      console.error("❌ 构建错误:", e.message);
    } finally {
      isBuilding = false;
    }
  };
  
  return {
    name: "halo-dev-build",
    async buildStart() {
      // 确保目录存在
      fs.mkdirSync(outDir, { recursive: true });
      
      // 启动时构建一次
      await buildMainJs();
    },
    
    async handleHotUpdate({ file }) {
      const normalized = file.replace(/\\/g, "/");
      // 监听 src/js 目录的文件变化
      if (normalized.includes("/src/js/")) {
        console.log(`📝 检测到变化: ${normalized}`);
        await buildMainJs();
      }
    },
  };
}

// 构建完成输出日志
function haloBuildLogPlugin(outDir) {
  return {
    name: "halo-build-log",
    closeBundle() {
      console.log("\n✅ Halo JS 构建完成！");
      console.log(`📦 输出目录：${outDir}\n`);
    },
  };
}

// ==============================
// 🚀 主配置
// ==============================
export default defineConfig(({ command }) => {
  const isBuild = command === "build";

  return {
    publicDir: false,
    server: {
      watch: {
        ignored: ["!**/src/js/**"],
      },
    },
    build: {
      outDir: OUT_DIR,
      emptyOutDir: false,
      minify: isBuild ? "terser" : false, // 构建模式使用 terser
      terserOptions: {
        compress: {
          drop_console: true, // 删除 console.log
        },
        mangle: false, // 不混淆变量名
        format: {
          comments: false, // 删除注释
          beautify: false, // 输出一行
        },
      },
      rollupOptions: {
        treeshake: false,
        input: resolve(SRC_DIR, "main.js"),
        output: {
          entryFileNames: "main.js",
          assetFileNames: "[name].[ext]",
        },
      },
    },
    plugins: [
      !isBuild && haloDevBuildPlugin(OUT_DIR, SRC_DIR), 
      isBuild && haloBuildLogPlugin(OUT_DIR)
    ].filter(Boolean),
  };
});
