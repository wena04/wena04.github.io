// Canvas-generated textures for the celestial scene.
// Cached as singletons so remounts / HMR don't regenerate the heavy moon texture.
import * as THREE from "three";
import { getViewportProfile } from "../utils/device";

let starTextureCache = null;
let moonTextureCache = null;
let moonTextureSizeCache = 0;

export const createStarTexture = () => {
  if (starTextureCache) return starTextureCache;

  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.2, "rgba(255,255,255,0.8)");
  gradient.addColorStop(0.5, "rgba(255,255,255,0.2)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  starTextureCache = new THREE.CanvasTexture(canvas);
  return starTextureCache;
};

export const createSoftMoonTexture = (sizeOverride) => {
  const size = sizeOverride ?? getViewportProfile().moonTextureSize;
  if (moonTextureCache && moonTextureSizeCache === size) return moonTextureCache;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  const scale = size / 1024;

  ctx.fillStyle = "#c25a1e";
  ctx.fillRect(0, 0, size, size);

  const patchCount = size <= 512 ? 28 : 50;
  for (let i = 0; i < patchCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = (Math.random() * 600 + 200) * scale;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, "rgba(40, 10, 0, 0.5)");
    grad.addColorStop(1, "rgba(40, 10, 0, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const craterCount = size <= 512 ? 100 : 200;
  for (let i = 0; i < craterCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = (Math.random() * 30 + 5) * scale;

    ctx.strokeStyle = "rgba(255, 200, 150, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    grad.addColorStop(0, "rgba(20, 5, 0, 0.3)");
    grad.addColorStop(0.8, "rgba(20, 5, 0, 0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const noiseCount = size <= 512 ? 250 : 500;
  for (let i = 0; i < noiseCount; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const radius = (Math.random() * 3 + 1) * scale;
    ctx.fillStyle =
      Math.random() > 0.5 ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  moonTextureCache = tex;
  moonTextureSizeCache = size;
  return tex;
};
