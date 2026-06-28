import JavaScriptObfuscator from "javascript-obfuscator";

// Production-only obfuscation for app chunks (not Three.js / React — those break easily).
const SKIP = /three|react-vendor|workbox|virtual_pwa|sw\.js/i;

const OBFUSCATE_OPTIONS = {
  compact: true,
  controlFlowFlattening: false,
  deadCodeInjection: false,
  debugProtection: false,
  disableConsoleOutput: true,
  identifierNamesGenerator: "hexadecimal",
  numbersToExpressions: true,
  renameGlobals: false,
  selfDefending: false,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 8,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayEncoding: ["base64"],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 2,
  stringArrayWrappersType: "function",
  stringArrayThreshold: 0.75,
  transformObjectKeys: true,
  unicodeEscapeSequence: false,
};

export function obfuscatePlugin() {
  return {
    name: "obfuscate-app-chunks",
    apply: "build",
    renderChunk(code, chunk) {
      if (SKIP.test(chunk.fileName)) return null;
      const result = JavaScriptObfuscator.obfuscate(code, OBFUSCATE_OPTIONS);
      return { code: result.getObfuscatedCode(), map: null };
    },
  };
}
