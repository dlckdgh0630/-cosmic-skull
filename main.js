/* ============================================================
   Cosmic Skull – main.js
   Three.js r128 + MediaPipe Hands
   ============================================================ */

'use strict';

// ── 상수 ──────────────────────────────────────────────────────
const PARTICLE_COUNT = 25000;   // 해골 파티클
const STAR_COUNT     = 4000;    // 배경 별 (은하 연출용)
const GALAXY_COUNT   = 8000;    // 폭발 시 은하수 파티클

// 슬라이더로 실시간 조절되는 값
let LERP_SPEED    = 0.06;   // 복구 속도 (기본값 상향)
let EXPLODE_POWER = 8;      // 폭발 강도

// ══════════════════════════════════════════════════════════════
// 별자리 데이터 — 실제 주요 별자리 12개
// 각 별: [x, y, z] (해골 주변 구 표면에 배치, 반경 6~14)
// ══════════════════════════════════════════════════════════════
const CONSTELLATIONS = [
  { name:"Aries", color:"#FFE8C0", stars:[[5.45, 1.55, 1.98], [5.17, 1.85, 2.41], [5.04, 1.45, 2.91], [4.81, 1.25, 3.37]], lines:[[0, 1], [1, 2], [2, 3]] },
  { name:"Taurus", color:"#FFDDAA", stars:[[3.62, 2.05, 4.32], [3.3, 2.32, 4.71], [3.02, 1.85, 4.84], [2.9, 1.55, 5.02], [3.67, 1.27, 4.7], [3.95, 1.04, 4.39], [2.56, 1.98, 4.81], [2.38, 1.72, 5.11]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [1, 6], [6, 7]] },
  { name:"Gemini", color:"#DDFFAA", stars:[[0.0, 3.0, 5.2], [-0.44, 3.18, 5.07], [0.0, 2.09, 5.73], [-0.51, 1.89, 5.78], [0.21, 1.08, 6.1], [-0.64, 0.86, 6.11], [0.11, 0.0, 6.3], [-0.77, 0.0, 6.25]], lines:[[0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [0, 1]] },
  { name:"Cancer", color:"#AAFFCC", stars:[[-2.9, 1.55, 5.02], [-3.27, 1.85, 4.67], [-3.18, 1.06, 5.09], [-3.67, 1.27, 4.7], [-3.45, 0.65, 5.11]], lines:[[0, 1], [0, 2], [1, 3], [2, 4], [3, 4]] },
  { name:"Leo", color:"#FFD966", stars:[[-4.78, 2.05, 2.99], [-4.72, 2.49, 2.51], [-5.07, 2.21, 2.05], [-5.43, 1.85, 1.76], [-5.8, 1.06, 1.55], [-5.8, 0.54, 2.11], [-4.57, 1.89, 3.57], [-4.68, 1.08, 3.92]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [0, 6], [6, 7], [5, 7]] },
  { name:"Virgo", color:"#EECCFF", stars:[[-5.89, 0.52, -1.04], [-5.61, 1.02, -1.5], [-5.52, 0.51, -2.01], [-5.43, -0.21, -2.53], [-5.87, -0.53, -1.57], [-6.05, -1.08, -0.85], [-5.6, -0.85, -2.26]], lines:[[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [4, 6]] },
  { name:"Libra", color:"#CCFFEE", stars:[[-4.23, 0.52, -4.23], [-3.76, 0.82, -4.48], [-4.01, -0.21, -4.46], [-3.38, 0.21, -4.83], [-4.52, -0.53, -4.07]], lines:[[0, 1], [1, 2], [1, 3], [2, 4]] },
  { name:"Scorpius", color:"#FF8888", stars:[[-2.86, 1.01, -4.95], [-2.66, 0.62, -5.23], [-2.53, 0.21, -5.43], [-2.25, -0.21, -5.56], [-2.47, -0.64, -5.54], [-2.63, -1.06, -5.4], [-2.82, -1.5, -5.31], [-3.0, -1.95, -5.19], [-3.14, -2.4, -5.03], [-3.32, -2.64, -4.92], [-2.97, -2.64, -5.14]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [8, 10]] },
  { name:"Sagittarius", color:"#FFCC88", stars:[[-0.0, -1.55, -5.8], [0.49, -1.82, -5.59], [0.8, -1.23, -5.71], [0.21, -1.04, -5.91], [-0.2, -1.89, -5.8], [-0.5, -2.32, -5.73], [0.79, -2.29, -5.6], [1.15, -1.79, -5.4]], lines:[[0, 1], [1, 2], [2, 3], [3, 0], [1, 5], [5, 6], [6, 7], [7, 2]] },
  { name:"Capricornus", color:"#AADDFF", stars:[[2.9, -1.55, -5.02], [3.37, -1.25, -4.81], [3.61, -1.68, -4.62], [3.29, -2.09, -4.7], [2.87, -2.32, -4.98], [2.55, -2.12, -5.24], [2.38, -1.68, -5.36]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]] },
  { name:"Aquarius", color:"#88CCFF", stars:[[4.53, -1.04, -3.8], [4.87, -0.84, -3.41], [4.66, -1.48, -3.64], [4.97, -1.68, -3.11], [4.83, -2.12, -3.26], [5.02, -1.89, -2.9], [5.21, -1.55, -2.54]], lines:[[0, 1], [0, 2], [2, 3], [3, 4], [3, 5], [5, 6]] },
  { name:"Pisces", color:"#BBDDFF", stars:[[5.82, 1.04, -1.03], [5.8, 1.45, -0.51], [5.91, 1.04, -0.21], [6.05, 0.64, -0.42], [6.03, 0.43, -0.85], [5.79, 0.63, -1.44], [5.68, 1.04, -1.63], [5.65, 1.45, -1.41]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0]] },
  { name:"Ursa Major", color:"#B8D8FF", stars:[[-3.88, 5.73, 1.04], [-3.7, 5.94, 0.32], [-4.0, 5.73, -0.35], [-4.53, 5.52, -0.96], [-4.91, 5.16, -1.6], [-4.92, 4.88, -2.29], [-5.48, 4.56, -1.99]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]] },
  { name:"Ursa Minor", color:"#AACCFF", stars:[[0.03, 2.0, 0.0], [-0.14, 3.91, -0.82], [-0.83, 4.83, -0.99], [-1.31, 5.29, -0.76], [-1.93, 5.64, -0.7], [-1.64, 5.75, -1.64], [-0.76, 5.52, -1.62]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3]] },
  { name:"Cassiopeia", color:"#AAFFEE", stars:[[3.2, 5.63, 0.56], [3.33, 5.45, 1.21], [2.81, 5.63, 1.63], [2.79, 5.45, 2.18], [2.26, 5.63, 2.34]], lines:[[0, 1], [1, 2], [2, 3], [3, 4]] },
  { name:"Cepheus", color:"#CCFFCC", stars:[[2.27, 6.34, -1.9], [2.98, 6.18, -1.39], [2.46, 6.49, -0.9], [1.77, 6.66, -1.24], [1.69, 6.58, -1.69]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 3]] },
  { name:"Draco", color:"#AAFFBB", stars:[[-0.6, 5.52, -4.27], [-0.0, 5.73, -4.02], [0.64, 5.94, -3.65], [1.41, 5.9, -3.88], [1.98, 5.59, -4.25], [1.34, 5.16, -4.99], [-0.0, 5.35, -4.82], [-0.78, 5.36, -4.43]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0]] },
  { name:"Perseus", color:"#CCFFDD", stars:[[3.08, 4.6, 3.42], [2.57, 4.98, 3.29], [2.64, 4.6, 3.76], [2.21, 4.98, 3.54], [2.99, 4.37, 4.27], [3.44, 4.19, 4.1], [3.62, 4.37, 3.75]], lines:[[0, 1], [1, 2], [2, 3], [1, 4], [4, 5], [5, 6]] },
  { name:"Auriga", color:"#FFFFAA", stars:[[1.19, 4.6, 4.44], [0.73, 4.98, 4.11], [0.0, 4.83, 4.35], [-0.17, 4.35, 4.83], [0.43, 4.18, 4.96], [1.04, 4.18, 4.87]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]] },
  { name:"Cygnus", color:"#AAEEFF", stars:[[2.95, 4.6, -3.52], [3.52, 4.18, -3.52], [4.08, 3.73, -3.42], [4.97, 3.5, -3.48], [5.49, 2.96, -3.17], [3.0, 4.24, -3.0], [3.76, 3.73, -3.76]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [5, 1], [1, 6], [6, 2]] },
  { name:"Lyra", color:"#EEFFAA", stars:[[1.15, 4.0, -4.99], [1.62, 3.82, -5.0], [1.89, 3.44, -5.18], [1.33, 3.44, -5.35], [1.58, 3.05, -5.52]], lines:[[0, 1], [1, 2], [2, 3], [3, 0], [2, 4], [3, 4]] },
  { name:"Aquila", color:"#FFBBFF", stars:[[1.88, 0.9, -6.16], [2.21, 0.57, -6.08], [1.9, 0.23, -6.21], [2.53, 0.45, -5.97], [1.64, -0.24, -6.59], [2.44, -0.24, -6.34]], lines:[[0, 1], [1, 2], [0, 3], [2, 5], [3, 4], [4, 5]] },
  { name:"Hercules", color:"#DDFFBB", stars:[[-1.46, 3.25, -5.44], [-1.22, 2.75, -5.76], [-0.8, 3.05, -5.68], [-1.05, 2.43, -5.94], [-0.56, 2.33, -6.37], [-1.65, 2.33, -6.17], [-1.37, 1.76, -6.42], [-0.91, 1.76, -6.5]], lines:[[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 7], [6, 7]] },
  { name:"Bo\u00f6tes", color:"#FFEECC", stars:[[-5.29, 2.22, -3.05], [-4.83, 2.75, -3.38], [-4.87, 2.01, -3.81], [-4.62, 2.43, -3.87], [-5.57, 1.76, -3.48], [-5.38, 1.41, -3.91]], lines:[[0, 1], [0, 2], [1, 3], [2, 4], [3, 4], [4, 5]] },
  { name:"Corona Bor.", color:"#FFEEBB", stars:[[-3.53, 3.05, -4.52], [-3.16, 3.44, -4.52], [-2.89, 3.54, -4.62], [-2.67, 3.44, -4.82], [-2.52, 3.05, -5.16], [-3.77, 3.05, -4.33]], lines:[[5, 0], [0, 1], [1, 2], [2, 3], [3, 4]] },
  { name:"Serpens", color:"#CCFFAA", stars:[[-3.6, 1.68, -5.14], [-3.37, 1.35, -5.39], [-3.01, 1.13, -5.65], [-2.62, 0.9, -5.88], [-2.54, 0.47, -6.29], [-2.98, 0.24, -6.11]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]] },
  { name:"Ophiuchus", color:"#BBFFCC", stars:[[-1.68, 0.57, -6.25], [-1.33, 1.13, -6.26], [-0.9, 0.9, -6.37], [-0.57, 0.23, -6.47], [-1.41, 0.0, -6.65], [-2.1, 0.24, -6.46]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]] },
  { name:"Pegasus", color:"#FFE0CC", stars:[[5.44, 1.68, -3.14], [5.82, 1.68, -2.35], [5.97, 0.9, -2.41], [5.57, 0.9, -3.22], [5.04, 2.33, -3.93], [6.22, 2.1, -1.78]], lines:[[0, 1], [1, 2], [2, 3], [3, 0], [0, 4], [1, 5]] },
  { name:"Andromeda", color:"#FFDDF0", stars:[[5.27, 3.73, 0.74], [4.97, 4.0, 1.24], [4.54, 4.35, 1.65], [4.13, 4.6, 2.01], [4.83, 4.37, 1.95], [5.29, 4.0, 1.52]], lines:[[0, 1], [1, 2], [2, 3], [1, 4], [1, 5]] },
  { name:"Triangulum", color:"#FFDDEE", stars:[[4.88, 3.25, 2.81], [4.47, 3.63, 3.01], [4.44, 3.25, 3.47]], lines:[[0, 1], [1, 2], [2, 0]] },
  { name:"Centaurus", color:"#FFCC99", stars:[[-4.18, -4.35, -2.42], [-3.76, -4.6, -2.64], [-3.92, -4.18, -3.07], [-4.03, -3.82, -3.38], [-4.41, -3.82, -2.86], [-4.52, -4.0, -2.4], [-3.58, -5.21, -2.51]], lines:[[0, 1], [0, 2], [2, 3], [3, 4], [4, 5], [5, 0], [1, 6]] },
  { name:"Crux", color:"#AADDFF", stars:[[-3.22, -5.63, -0.45], [-3.69, -5.32, -0.52], [-3.44, -5.51, -0.18], [-3.36, -5.51, -0.77]], lines:[[0, 1], [2, 3]] },
  { name:"Carina", color:"#FFDDCC", stars:[[-3.76, -5.12, 1.37], [-3.6, -5.32, 0.96], [-3.94, -5.12, 0.69], [-4.16, -4.98, 0.36], [-3.99, -5.5, 0.14], [-3.57, -5.77, 0.5]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [2, 5]] },
  { name:"Vela", color:"#CCDDFF", stars:[[-3.25, -4.6, 3.25], [-3.33, -4.83, 2.8], [-3.76, -4.6, 2.64], [-4.1, -4.35, 2.56], [-3.76, -4.55, 3.38]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]] },
  { name:"Puppis", color:"#DDCCFF", stars:[[-2.56, -4.0, 4.44], [-2.86, -4.18, 4.08], [-3.24, -3.82, 4.14], [-2.86, -3.63, 4.57], [-3.71, -3.6, 4.42]], lines:[[0, 1], [1, 2], [2, 3], [3, 0], [2, 4]] },
  { name:"Columba", color:"#FFEEDD", stars:[[0.56, -3.73, 5.3], [0.18, -4.0, 5.12], [-0.18, -3.82, 5.26], [0.0, -4.37, 5.21], [0.36, -4.37, 5.2]], lines:[[0, 1], [1, 2], [1, 3], [1, 4]] },
  { name:"Lepus", color:"#EEFFDD", stars:[[1.06, -2.22, 6.02], [0.65, -2.01, 6.15], [0.21, -2.22, 6.1], [0.43, -2.77, 6.2], [1.08, -2.77, 6.12], [1.53, -2.55, 6.12]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0]] },
  { name:"Canis Major", color:"#FFFFCC", stars:[[-1.0, -1.65, 5.68], [-1.2, -2.32, 5.62], [-1.61, -2.12, 5.6], [-0.83, -2.64, 5.88], [-1.41, -2.85, 5.67], [-1.85, -1.95, 5.7]], lines:[[0, 1], [0, 2], [1, 3], [1, 4], [2, 5]] },
  { name:"Canis Minor", color:"#FFFFC0", stars:[[-2.43, -0.57, 6.0], [-2.75, -0.23, 5.89]], lines:[[0, 1]] },
  { name:"Hydra", color:"#AAFFAA", stars:[[-4.16, -0.57, 4.96], [-4.55, -0.9, 4.55], [-4.9, -1.13, 4.11], [-5.39, -1.35, 3.37], [-6.03, -1.41, 2.81], [-6.25, -1.76, 2.03], [-6.37, -2.1, 1.12]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]] },
  { name:"Corvus", color:"#FFAAAA", stars:[[-6.17, -2.01, -0.32], [-5.99, -2.43, -0.63], [-6.02, -2.22, -1.06], [-6.22, -1.68, -0.87]], lines:[[0, 1], [1, 2], [2, 3], [3, 0]] },
  { name:"Crater", color:"#FFBBCC", stars:[[-6.3, -1.35, 0.88], [-6.25, -1.68, 0.55], [-6.35, -1.35, 0.22], [-6.42, -0.9, 0.45], [-6.37, -0.9, 0.9]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]] },
  { name:"Eridanus", color:"#BBDDFF", stars:[[3.43, -0.52, 4.9], [3.76, -1.08, 4.81], [3.91, -1.63, 4.66], [4.02, -2.19, 4.47], [4.17, -2.75, 4.17], [4.25, -3.3, 3.82], [4.32, -3.84, 3.38], [4.32, -4.37, 2.91], [3.9, -5.36, 2.25]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]] },
  { name:"Fornax", color:"#FFCCBB", stars:[[4.18, -3.25, 3.77], [3.83, -3.44, 3.97], [4.13, -3.63, 3.46]], lines:[[0, 1], [1, 2], [2, 0]] },
  { name:"Phoenix", color:"#FFDDBB", stars:[[4.04, -4.98, 1.08], [4.14, -4.83, 1.34], [3.76, -5.12, 1.37], [3.71, -5.26, 0.92], [4.38, -4.89, 1.77]], lines:[[0, 1], [0, 2], [0, 3], [1, 4]] },
  { name:"Piscis Aus.", color:"#CCBBFF", stars:[[5.29, -3.25, -1.93], [5.52, -3.05, -1.58], [5.39, -3.44, -1.15], [5.35, -3.9, -1.54], [5.35, -3.6, -2.16]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]] },
  { name:"Sculptor", color:"#BBBBFF", stars:[[5.32, -3.44, 1.43], [5.46, -3.05, 1.77], [5.22, -3.25, 2.11], [5.0, -3.73, 1.82]], lines:[[0, 1], [1, 2], [2, 3], [3, 0]] },
  { name:"Cetus", color:"#AABBCC", stars:[[5.75, -1.13, 2.81], [5.57, -0.9, 3.22], [5.39, -1.35, 3.37], [5.54, -1.68, 2.95], [5.62, -0.59, 3.79], [5.36, -0.24, 4.18], [5.45, -0.95, 3.96]], lines:[[0, 1], [1, 2], [2, 3], [3, 0], [1, 4], [4, 5], [5, 6], [6, 1]] },
  { name:"Pavo", color:"#FFBBFF", stars:[[0.62, -5.89, -2.68], [0.84, -5.74, -2.93], [1.11, -5.63, -3.05], [0.79, -6.3, -2.42], [0.53, -6.3, -2.49]], lines:[[0, 1], [1, 2], [0, 3], [0, 4]] },
  { name:"Grus", color:"#CCFFFF", stars:[[3.9, -4.6, -2.44], [3.77, -4.83, -2.17], [4.13, -4.52, -2.2], [4.19, -4.55, -2.83], [4.54, -4.55, -2.22]], lines:[[0, 1], [0, 2], [0, 3], [0, 4]] },
  { name:"Tucana", color:"#DDFFDD", stars:[[2.81, -5.84, -0.49], [3.03, -5.74, -0.32], [2.75, -5.89, -0.1], [2.52, -6.3, -0.35]], lines:[[0, 1], [1, 2], [2, 3], [3, 0]] },
  { name:"Indus", color:"#FFEECC", stars:[[2.12, -5.51, -2.71], [2.49, -5.32, -2.77], [2.12, -5.74, -2.2], [1.88, -6.0, -2.58]], lines:[[0, 1], [0, 2], [0, 3]] },
  { name:"Microscopium", color:"#EECCFF", stars:[[3.52, -3.82, -3.91], [3.68, -4.0, -3.56], [3.83, -3.44, -3.97], [4.19, -3.8, -3.77]], lines:[[0, 1], [0, 2], [1, 3]] },
  { name:"Telescopium", color:"#FFCCEE", stars:[[0.69, -5.12, -3.94], [1.01, -4.98, -4.05], [1.03, -5.32, -3.58]], lines:[[0, 1], [1, 2]] },
  { name:"Ara", color:"#FFAA88", stars:[[-0.51, -5.39, -3.6], [-0.27, -5.26, -3.81], [-0.12, -5.51, -3.44], [-0.34, -5.63, -3.23], [-0.0, -5.36, -4.19]], lines:[[0, 1], [1, 2], [2, 3], [3, 0], [1, 4]] },
  { name:"Corona Aus.", color:"#EECC88", stars:[[0.67, -4.35, -4.78], [0.89, -4.52, -4.59], [1.15, -4.43, -4.61], [1.35, -4.26, -4.72], [0.51, -4.26, -4.88]], lines:[[4, 0], [0, 1], [1, 2], [2, 3]] },
  { name:"Norma", color:"#CCFFAA", stars:[[-1.83, -4.98, -3.76], [-1.5, -5.12, -3.71], [-1.49, -4.83, -4.09], [-1.8, -4.75, -4.05]], lines:[[0, 1], [1, 2], [2, 3], [3, 0]] },
  { name:"Lupus", color:"#FFDDAA", stars:[[-3.23, -4.35, -3.59], [-2.88, -4.52, -3.68], [-2.93, -4.18, -4.03], [-3.62, -4.37, -3.75], [-3.44, -4.19, -4.1]], lines:[[0, 1], [1, 2], [2, 4], [4, 3], [3, 0]] },
  { name:"Circinus", color:"#AAFFEE", stars:[[-2.34, -5.74, -1.96], [-2.42, -5.63, -2.17], [-2.56, -5.63, -2.0]], lines:[[0, 1], [0, 2]] },
  { name:"Triangulum Aus.", color:"#FFEEBB", stars:[[-0.99, -5.94, -2.45], [-0.88, -5.84, -2.71], [-0.76, -6.11, -2.09]], lines:[[0, 1], [1, 2], [2, 0]] },
  { name:"Apus", color:"#DDFFCC", stars:[[-0.27, -6.31, -1.55], [-0.19, -6.25, -1.78], [-0.05, -6.36, -1.35], [-0.16, -6.4, -1.12]], lines:[[0, 1], [1, 2], [0, 3]] },
  { name:"Chamaeleon", color:"#CCFFEE", stars:[[-1.11, -6.4, -0.2], [-1.31, -6.36, -0.35], [-1.06, -6.4, -0.39], [-0.76, -6.45, -0.22]], lines:[[0, 1], [1, 2], [2, 3], [3, 0]] },
  { name:"Musca", color:"#BBFFCC", stars:[[-2.38, -6.03, -0.51], [-2.14, -6.11, -0.61], [-2.51, -5.94, -0.82], [-2.76, -5.84, -0.69]], lines:[[0, 1], [1, 2], [2, 3], [3, 0]] },
  { name:"Volans", color:"#AACCFF", stars:[[-1.37, -6.11, 1.75], [-1.34, -6.18, 1.49], [-1.72, -6.03, 1.72], [-1.63, -5.98, 1.95]], lines:[[0, 1], [1, 2], [2, 3], [3, 0]] },
  { name:"Pictor", color:"#FFDDCC", stars:[[0.0, -5.12, 4.0], [-0.33, -5.26, 3.81], [-0.58, -4.98, 4.14]], lines:[[0, 1], [1, 2]] },
  { name:"Dorado", color:"#FFCCDD", stars:[[0.88, -5.39, 3.53], [0.56, -5.63, 3.2], [0.36, -5.51, 3.43], [0.66, -6.0, 3.12]], lines:[[0, 1], [1, 2], [1, 3]] },
  { name:"Reticulum", color:"#EEDDFF", stars:[[1.34, -5.74, 2.74], [1.22, -5.63, 3.01], [0.97, -5.84, 2.68], [1.08, -5.94, 2.42]], lines:[[0, 1], [1, 2], [2, 3], [3, 0]] },
  { name:"Horologium", color:"#FFBBCC", stars:[[3.25, -4.52, 3.36], [2.8, -4.98, 3.1], [2.34, -5.39, 2.78], [2.74, -5.64, 2.64]], lines:[[0, 1], [1, 2], [2, 3]] },
  { name:"Caelum", color:"#CCBBEE", stars:[[1.92, -4.0, 4.75], [1.62, -3.82, 5.0], [1.65, -4.35, 4.54]], lines:[[0, 1], [0, 2]] },
  { name:"Monoceros", color:"#CCFFFF", stars:[[-1.13, -0.23, 6.4], [-1.57, -0.57, 6.28], [-2.01, -0.34, 6.17], [-1.87, 0.24, 6.53], [-1.18, 0.36, 6.69]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]] },
  { name:"Pyxis", color:"#FFDDBB", stars:[[-3.69, -3.05, 4.4], [-3.98, -2.85, 4.27], [-4.13, -3.05, 3.99]], lines:[[0, 1], [1, 2]] },
  { name:"Antlia", color:"#CCDDEE", stars:[[-4.46, -3.82, 2.79], [-4.52, -4.0, 2.4], [-4.77, -3.44, 2.76]], lines:[[0, 1], [0, 2]] },
  { name:"Sextans", color:"#EEEEBB", stars:[[-5.74, -0.23, 3.05], [-5.93, 0.23, 2.64], [-6.01, -0.45, 2.43]], lines:[[0, 1], [1, 2]] },
  { name:"Leo Minor", color:"#FFFFCC", stars:[[-5.11, 3.44, 2.06], [-5.06, 3.73, 1.65], [-5.29, 3.54, 1.32], [-5.41, 3.25, 1.55]], lines:[[0, 1], [1, 2], [2, 3]] },
  { name:"Coma Ber.", color:"#DDEEFF", stars:[[-5.87, 2.75, -0.51], [-5.68, 3.05, -0.8], [-5.71, 2.85, -1.21]], lines:[[0, 1], [1, 2]] },
  { name:"Canes Ven.", color:"#FFCCFF", stars:[[-4.97, 4.0, -1.24], [-4.59, 4.35, -1.49]], lines:[[0, 1]] },
  { name:"Vulpecula", color:"#FFEEAA", stars:[[2.95, 2.75, -5.1], [3.24, 2.95, -4.8], [3.52, 2.54, -4.84]], lines:[[0, 1], [1, 2]] },
  { name:"Sagitta", color:"#FFEEBB", stars:[[2.61, 2.01, -5.6], [2.9, 2.01, -5.46], [3.15, 2.22, -5.24], [3.22, 1.79, -5.36]], lines:[[0, 1], [1, 2], [1, 3]] },
  { name:"Delphinus", color:"#BBDDFF", stars:[[3.91, 1.35, -5.01], [4.05, 1.57, -4.83], [4.25, 1.35, -4.72], [4.11, 1.13, -4.9], [4.51, 0.95, -5.0]], lines:[[0, 1], [1, 2], [2, 3], [3, 0], [3, 4]] },
  { name:"Equuleus", color:"#FFDDD0", stars:[[5.08, 0.79, -3.97], [5.19, 1.02, -3.77], [5.35, 0.79, -3.61]], lines:[[0, 1], [1, 2]] },
  { name:"Lacerta", color:"#EEFFBB", stars:[[4.26, 4.6, -1.72], [4.17, 4.75, -1.52], [4.37, 4.6, -1.42], [4.57, 4.43, -1.31], [4.59, 4.35, -1.49]], lines:[[0, 1], [1, 2], [2, 3], [3, 4]] },
  { name:"Lynx", color:"#DDFFEE", stars:[[-3.1, 4.35, 3.7], [-2.44, 4.6, 3.9], [-1.84, 4.83, 3.94], [-1.35, 5.21, 4.16], [-0.98, 4.89, 4.62]], lines:[[0, 1], [1, 2], [2, 3], [3, 4]] },
  { name:"Camelopardalis", color:"#CCFFDD", stars:[[0.0, 6.11, 2.22], [0.35, 6.18, 1.98], [0.83, 6.03, 2.29], [0.74, 6.16, 2.78], [0.25, 6.16, 2.86]], lines:[[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]] },
  { name:"Scutum", color:"#FFDDCC", stars:[[0.89, -1.13, -6.34], [1.1, -1.35, -6.26], [1.34, -0.9, -6.3], [1.12, -0.68, -6.37]], lines:[[0, 1], [1, 2], [2, 3], [3, 0]] },
  { name:"Serpens Cau.", color:"#AAFFBB", stars:[[0.9, 0.0, -6.44], [1.35, 0.23, -6.35], [1.68, -0.23, -6.27], [1.13, -0.45, -6.39]], lines:[[0, 1], [1, 2], [2, 3], [3, 0]] },
  { name:"Scutum B", color:"#FFCCAA", stars:[[0.23, -0.57, -6.47], [0.57, -0.34, -6.47], [0.45, -0.79, -6.44]], lines:[[0, 1], [0, 2]] },
  { name:"Pup B", color:"#CCDDCC", stars:[[-2.11, -3.25, 5.22], [-2.33, -3.44, 5.0], [-2.69, -3.05, 5.07]], lines:[[0, 1], [1, 2]] },
  { name:"Aries B", color:"#FFEEDD", stars:[[5.32, 2.43, 2.83], [5.18, 2.22, 3.24], [5.35, 2.01, 3.09]], lines:[[0, 1], [1, 2]] },
  { name:"Octans", color:"#BBCCDD", stars:[[0.57, -6.48, 0.0], [-0.28, -6.48, 0.49], [-0.28, -6.48, -0.49]], lines:[[0, 1], [1, 2], [2, 0]] },
  { name:"Mensa", color:"#DDCCFF", stars:[[0.05, -6.36, 1.35], [-0.05, -6.31, 1.57], [-0.1, -6.4, 1.12]], lines:[[0, 1], [1, 2]] },
  { name:"Hydrus", color:"#AADDCC", stars:[[1.52, -6.25, 0.95], [1.8, -6.11, 1.31], [0.73, -6.4, 0.86], [1.19, -6.36, 0.63]], lines:[[0, 1], [1, 2], [0, 3]] },
  { name:"Telescopium B", color:"#FFCCBB", stars:[[1.19, -4.6, -4.44], [1.34, -4.83, -4.14], [1.6, -4.52, -4.39]], lines:[[0, 1], [1, 2]] },
  { name:"Norma B", color:"#EEFFAA", stars:[[-2.3, -4.6, -3.98], [-2.01, -4.75, -3.95], [-1.98, -4.52, -4.24]], lines:[[0, 1], [1, 2]] },
];



// 폭발 후 파티클이 이동할 목표 좌표 배열
let explodeTargets = null;   // Float32Array (파티클 수 × 3)
let explodeColors  = null;   // Float32Array (색상)

// 파티클 → 별자리 별에 1:1 매핑 생성
function buildExplodeTargets() {
  explodeTargets = new Float32Array(PARTICLE_COUNT * 3);
  explodeColors  = new Float32Array(PARTICLE_COUNT * 3);

  // 전체 별자리 별 좌표 + 색 수집
  const allStars = [];
  CONSTELLATIONS.forEach(con => {
    const c = new THREE.Color(con.color);
    con.stars.forEach(s => allStars.push({ x: s[0], y: s[1], z: s[2], r: c.r, g: c.g, b: c.b }));
  });

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const base = allStars[i % allStars.length];
    // 별 위치에서 약간 랜덤 퍼짐 (별자리 덩어리 느낌)
    const scatter = 0.4;
    explodeTargets[i*3]   = base.x + (Math.random()-0.5)*scatter;
    explodeTargets[i*3+1] = base.y + (Math.random()-0.5)*scatter;
    explodeTargets[i*3+2] = base.z + (Math.random()-0.5)*scatter;
    explodeColors[i*3]   = base.r * (0.5 + Math.random()*0.5);
    explodeColors[i*3+1] = base.g * (0.5 + Math.random()*0.5);
    explodeColors[i*3+2] = base.b * (0.5 + Math.random()*0.5);
  }
}

// 폭발 애니메이션 상태
let explodeAnim = { active: false, progress: 0, duration: 0.3 };  // 0.3초


// 명암용 팔레트: 각 모드마다 [밝은색, 어두운색] 쌍
// Y(높이)·Z(깊이) 기준으로 보간 → 입체감
const PALETTES = {
  default: {
    bright: new THREE.Color('#E8F0FF'),  // 상단·앞면: 밝은 청백
    mid   : new THREE.Color('#1EE3CF'),  // 중간: 청록
    dark  : new THREE.Color('#0D2A6B'),  // 하단·뒷면: 짙은 남색
  },
  fire: {
    bright: new THREE.Color('#FFE566'),  // 상단·앞: 밝은 노랑
    mid   : new THREE.Color('#FF6A00'),  // 중간: 주황
    dark  : new THREE.Color('#5C0000'),  // 하단·뒤: 짙은 적색
  },
  ghost: {
    bright: new THREE.Color('#DFFFFF'),  // 상단·앞: 밝은 민트
    mid   : new THREE.Color('#00CED1'),  // 중간: 청록
    dark  : new THREE.Color('#003340'),  // 하단·뒤: 짙은 청색
  },
};

// Y·Z 좌표 기반 명암 계산 → 색상 반환
// yNorm, zNorm: -1~1 범위 정규화된 좌표
function shadedColor(palette, yNorm, zNorm) {
  // y 위로 갈수록 밝음(0.6), 아래로 갈수록 어두움(0.4)
  // z 앞으로 갈수록 추가 밝음(+0.15), 뒤로 갈수록 어두움(-0.15)
  const t = THREE.MathUtils.clamp(yNorm * 0.6 + zNorm * 0.4, -1, 1);
  const c = new THREE.Color();
  if (t >= 0) {
    c.lerpColors(palette.mid, palette.bright, t);
  } else {
    c.lerpColors(palette.dark, palette.mid, t + 1);
  }
  return c;
}

// ── Three.js 기본 씬 ───────────────────────────────────────────
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.001, 1000);
camera.position.z = 2.7;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// ── Post-processing (Bloom) ───────────────────────────────────
const renderPass = new THREE.RenderPass(scene, camera);

const bloomPass  = new THREE.UnrealBloomPass(
  new THREE.Vector2(innerWidth, innerHeight), 1.5, 0.3, 0.85
);
bloomPass.threshold = 0;
bloomPass.strength  = 0.18;   // 아주 약한 bloom — 점 형태 유지

const composer = new THREE.EffectComposer(renderer);
composer.addPass(renderPass);
composer.addPass(bloomPass);

// ── 파티클 텍스처 (코드로 생성, 별도 파일 불필요) ──────────────
function makeParticleTexture() {
  const c  = document.createElement('canvas');
  c.width  = 64; c.height = 64;
  const ctx = c.getContext('2d');
  // 아주 작고 선명한 점 — 면 뭉침 방지, 해골 윤곽 선명
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 10);
  g.addColorStop(0,   'rgba(255,255,255,0.95)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.4)');
  g.addColorStop(1,   'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}
const pointTex = makeParticleTexture();

// ── 파티클 머티리얼 (커스텀 셰이더) ──────────────────────────
const particleMat = new THREE.ShaderMaterial({
  uniforms     : { pointTexture: { value: pointTex } },
  vertexShader : document.getElementById('vertexshader').textContent,
  fragmentShader: document.getElementById('fragmentshader').textContent,
  blending     : THREE.NormalBlending,   // 겹침 시 과도한 밝기 방지
  depthWrite   : false,
  transparent  : true,
});

// ── 파티클 그룹 (해골) ────────────────────────────────────────
const group = new THREE.Group();
scene.add(group);

let skullYRange = { min: 0, range: 1 };  // 명암 계산용 Y 범위
let skullZRange = { min: 0, range: 1 };  // 명암 계산용 Z 범위
let skullPoints       = null;  // THREE.Points
let originalPositions = null;  // Float32Array – 원래 좌표 (해골 형태)
let currentColors     = null;
let originalColors    = null;  // 해골 초기 명암 색상
let exploded          = false; // true이면 복구 중단
let particlesReady    = false; // OBJ 로드 완료 후 true

function buildParticles(mesh) {
  const sampler = new THREE.MeshSurfaceSampler(mesh).build();
  const pos  = new Float32Array(PARTICLE_COUNT * 3);
  const col  = new Float32Array(PARTICLE_COUNT * 3);
  const size = new Float32Array(PARTICLE_COUNT);
  const tmp  = new THREE.Vector3();

  // Y·Z 범위 파악을 위해 먼저 전체 샘플링
  const allPos = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    sampler.sample(tmp);
    allPos.push(tmp.x, tmp.y, tmp.z);
  }
  let minY = Infinity, maxY = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const y = allPos[i*3+1], z = allPos[i*3+2];
    if (y < minY) minY = y; if (y > maxY) maxY = y;
    if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
  }
  const rangeY = maxY - minY || 1;
  const rangeZ = maxZ - minZ || 1;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    pos[i*3]   = allPos[i*3];
    pos[i*3+1] = allPos[i*3+1];
    pos[i*3+2] = allPos[i*3+2];

    // -1 ~ 1 정규화
    const yNorm = ((allPos[i*3+1] - minY) / rangeY) * 2 - 1;
    const zNorm = ((allPos[i*3+2] - minZ) / rangeZ) * 2 - 1;

    const c = shadedColor(PALETTES.default, yNorm, zNorm);
    col[i*3]   = c.r;
    col[i*3+1] = c.g;
    col[i*3+2] = c.b;
    size[i] = Math.random() * 0.8 + 0.2;  // 작은 점 → 윤곽 선명
  }

  // 명암 계산에 필요한 범위 저장 (applyColorMode에서 재사용)
  skullYRange = { min: minY, range: rangeY };
  skullZRange = { min: minZ, range: rangeZ };

  originalPositions = new Float32Array(pos);
  originalColors     = new Float32Array(col);  // 명암 색상 보존
  currentColors     = col;

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position',    new THREE.BufferAttribute(pos,  3));
  geo.setAttribute('customColor', new THREE.BufferAttribute(col,  3));
  geo.setAttribute('size',        new THREE.BufferAttribute(size, 1));

  skullPoints = new THREE.Points(geo, particleMat);
  group.add(skullPoints);
  particlesReady = true;
  buildExplodeTargets();  // 별자리 타겟 좌표 생성
}

// ── 배경 은하 (원반 나선 형태) ──────────────────────────────
let galaxyGroup = null;   // 은하 전체 그룹 (폭발 시 scale 연동)

(function buildGalaxy() {
  galaxyGroup = new THREE.Group();
  scene.add(galaxyGroup);

  const starColors = [
    new THREE.Color('#E8F0FF'),
    new THREE.Color('#1EE3CF'),
    new THREE.Color('#6B48FF'),
    new THREE.Color('#C8B8FF'),
    new THREE.Color('#125D98'),
    new THREE.Color('#FFE8AA'),
  ];

  // 배경 별 — 구 형태로 넓게
  const bgGeo = new THREE.BufferGeometry();
  const bgPos = new Float32Array(STAR_COUNT * 3);
  const bgCol = new Float32Array(STAR_COUNT * 3);
  const bgSz  = new Float32Array(STAR_COUNT);
  for (let i = 0; i < STAR_COUNT; i++) {
    bgPos[i*3]   = (Math.random() - 0.5) * 40;
    bgPos[i*3+1] = (Math.random() - 0.5) * 40;
    bgPos[i*3+2] = (Math.random() - 0.5) * 40;
    const c = starColors[i % starColors.length];
    bgCol[i*3] = c.r * 0.4; bgCol[i*3+1] = c.g * 0.4; bgCol[i*3+2] = c.b * 0.4;
    bgSz[i] = Math.random() * 0.6 + 0.1;
  }
  bgGeo.setAttribute('position',    new THREE.BufferAttribute(bgPos, 3));
  bgGeo.setAttribute('customColor', new THREE.BufferAttribute(bgCol, 3));
  bgGeo.setAttribute('size',        new THREE.BufferAttribute(bgSz,  1));
  galaxyGroup.add(new THREE.Points(bgGeo, particleMat));

  // 은하수 원반 — 나선팔 구조
  const galGeo = new THREE.BufferGeometry();
  const galPos = new Float32Array(GALAXY_COUNT * 3);
  const galCol = new Float32Array(GALAXY_COUNT * 3);
  const galSz  = new Float32Array(GALAXY_COUNT);
  for (let i = 0; i < GALAXY_COUNT; i++) {
    const r     = Math.sqrt(Math.random()) * 18 + 0.5;
    const arm   = Math.floor(Math.random() * 3);           // 나선팔 3개
    const angle = (arm / 3) * Math.PI * 2 + r * 0.4 + Math.random() * 0.6;
    const spread = (Math.random() - 0.5) * (r * 0.12);
    galPos[i*3]   = Math.cos(angle) * r + spread;
    galPos[i*3+1] = (Math.random() - 0.5) * (1.2 - r * 0.04); // 원반 두께
    galPos[i*3+2] = Math.sin(angle) * r + spread;
    const brightness = 0.25 + (1 - r / 18) * 0.45; // 중심 밝음
    const c = starColors[i % starColors.length];
    galCol[i*3] = c.r * brightness; galCol[i*3+1] = c.g * brightness; galCol[i*3+2] = c.b * brightness;
    galSz[i] = Math.random() * 0.5 + 0.1;
  }
  galGeo.setAttribute('position',    new THREE.BufferAttribute(galPos, 3));
  galGeo.setAttribute('customColor', new THREE.BufferAttribute(galCol, 3));
  galGeo.setAttribute('size',        new THREE.BufferAttribute(galSz,  1));
  galaxyGroup.add(new THREE.Points(galGeo, particleMat));

  // 천천히 회전
  (function rot() { requestAnimationFrame(rot); galaxyGroup.rotation.y += 0.0002; })();
})();

// ── OBJ 로드 ─────────────────────────────────────────────────
const loader = new THREE.OBJLoader();
loader.load(
  'models/skull_model.obj',
  (obj) => { buildParticles(obj.children[0]); },
  (xhr) => { if (xhr.total) console.log((xhr.loaded / xhr.total * 100).toFixed(0) + '% loaded'); },
  (err) => { console.error('OBJ 로드 오류:', err); }
);

// ── 별자리 선 + 이름 (확대 시 표시) ─────────────────────────
let constellationGroup = null;

function buildConstellationLines() {
  constellationGroup = new THREE.Group();
  scene.add(constellationGroup);
  constellationGroup.visible = false;

  CONSTELLATIONS.forEach(con => {
    const color = new THREE.Color(con.color);
    // 연결선
    con.lines.forEach(([a, b]) => {
      const sa = con.stars[a], sb = con.stars[b];
      if (!sa || !sb) return;
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(sa[0], sa[1], sa[2]),
        new THREE.Vector3(sb[0], sb[1], sb[2]),
      ]);
      const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 });
      constellationGroup.add(new THREE.Line(geo, mat));
    });
    // 이름 스프라이트
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 64;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = con.color;
    ctx.font = 'bold 28px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(con.name, 128, 40);
    const tex = new THREE.CanvasTexture(canvas);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.8 }));
    // 별자리 중심에 배치
    const cx = con.stars.reduce((s,v)=>s+v[0],0)/con.stars.length;
    const cy = con.stars.reduce((s,v)=>s+v[1],0)/con.stars.length + 0.8;
    const cz = con.stars.reduce((s,v)=>s+v[2],0)/con.stars.length;
    sprite.position.set(cx, cy, cz);
    sprite.scale.set(1.2, 0.3, 1);
    constellationGroup.add(sprite);
  });
}
buildConstellationLines();

function updateConstellationLines(show) {
  if (!constellationGroup) return;
  constellationGroup.visible = show;
  // group과 같은 회전 동기화
  constellationGroup.rotation.copy(group.rotation);
}

// ── 제스처 함수 ───────────────────────────────────────────────
function countFingers(lm) {
  // 엄지는 x 방향, 나머지는 y 방향으로 판단
  let count = 0;
  // 검지~소지 (8,12,16,20) tip vs pip
  const tips = [8, 12, 16, 20];
  const pips  = [6, 10, 14, 18];
  for (let i = 0; i < 4; i++) {
    if (lm[tips[i]].y < lm[pips[i]].y) count++;
  }
  return count;
}

function isFist(lm) { return countFingers(lm) === 0; }
function isOpen(lm) { return countFingers(lm) >= 4; }

// ── 폭발: 파티클이 별자리 위치로 0.3초 내 빠르게 날아감 ────
function explode() {
  if (!skullPoints || exploded) return;
  exploded = true;
  bloomPass.strength = 0.5;
  // 현재 위치를 출발점으로 저장
  explodeAnim.startPos = new Float32Array(skullPoints.geometry.attributes.position.array);
  explodeAnim.startCol = new Float32Array(skullPoints.geometry.attributes.customColor.array);
  explodeAnim.active   = true;
  explodeAnim.progress = 0;
}

// ── 파티클 색상 변경 — 명암 적용 ────────────────────────────
function applyColorMode(mode) {
  if (!skullPoints) return;
  const palette = PALETTES[mode] || PALETTES.default;
  const col = skullPoints.geometry.attributes.customColor;
  const pos = skullPoints.geometry.attributes.position;

  for (let i = 0; i < col.count; i++) {
    const yNorm = ((pos.array[i*3+1] - skullYRange.min) / skullYRange.range) * 2 - 1;
    const zNorm = ((pos.array[i*3+2] - skullZRange.min) / skullZRange.range) * 2 - 1;
    const c = shadedColor(palette, yNorm, zNorm);
    col.array[i*3]   = c.r;
    col.array[i*3+1] = c.g;
    col.array[i*3+2] = c.b;
  }
  col.needsUpdate = true;
  // 현재 색상을 새 원본으로 저장 (복구 시 이 색으로 돌아옴)
  if (originalColors) originalColors = new Float32Array(col.array);
  bloomPass.strength = (mode === 'fire') ? 0.55 : (mode === 'ghost') ? 0.4 : 0.18;
}

// ── GSAP 흔들기 (손가락 3개) ──────────────────────────────────
let shaking = false;
function shakeSkull() {
  if (!skullPoints || shaking) return;
  shaking = true;
  gsap.to(group.rotation, {
    z: 0.15, duration: 0.1, yoyo: true, repeat: 9, ease: 'power1.inOut',
    onComplete: () => { group.rotation.z = 0; shaking = false; }
  });
}

// ── 손 인식 결과 처리 ─────────────────────────────────────────
const hudRight = document.getElementById('hud-right');
const hudLeft  = document.getElementById('hud-left');
const gesLabel = document.getElementById('gesture-label');

let targetRotY = 0;  // 스무스 Y축 회전 목표값
let targetCamZ  = 2.7;  // 카메라 Z 위치 (엄지-검지로 줌 인/아웃)
const CAM_NEAR  = 0.5;  // 최대 확대 (별자리 클로즈업)
const CAM_FAR   = 12.0; // 최대 축소 (은하 전체)
const CAM_SKULL = 2.7;  // 해골 기본 거리

function onHandResults(results) {
  // 캔버스 초기화
  handCtx.clearRect(0, 0, handCanvas.width, handCanvas.height);

  if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
    hudRight.textContent = '-';
    hudLeft.textContent  = '-';
    gesLabel.textContent = '손을 인식하는 중...';
    return;
  }

  const handedness = results.multiHandedness;

  results.multiHandLandmarks.forEach((lm, idx) => {
    // 랜드마크 그리기
    drawConnectors(handCtx, lm, HAND_CONNECTIONS, { color: 'rgba(30,227,207,0.7)', lineWidth: 1 });
    drawLandmarks(handCtx, lm, { color: 'rgba(255,255,255,0.9)', lineWidth: 0.5, radius: 2 });

    // MediaPipe 'Left'/'Right'는 카메라 기준 → 거울 반전이므로 swap
    const label = handedness[idx]?.label;  // 'Left' or 'Right' (카메라 기준)
    const isRight = (label === 'Left');    // 거울 반전이므로 Left=실제 오른손

    const wrist  = lm[0];
    const index5 = lm[5];   // 검지 MCP (손바닥 기준점)
    const middle = lm[12];  // 중지 끝

    if (isRight) {
      // ── 오른손 ──────────────────────────────────────────
      // 기울기 → Y축(좌우) 회전
      const dx = index5.x - wrist.x;
      targetRotY = dx * Math.PI * 6;  // 민감도 2배 — 조금만 움직여도 많이 회전

      if (isFist(lm)) {
        // ✊ 주먹 → 폭발
        explode();
        hudRight.textContent = '✊ 주먹 → 폭발';

      } else if (isOpen(lm)) {
        // 🖐 펼침 → 복구
        exploded = false;
        bloomPass.strength = 0.18;
        if (constellationGroup) constellationGroup.visible = false;
        targetCamZ = CAM_SKULL;  // 카메라 해골 위치로 복귀
        hudRight.textContent = '🖐 펼침 → 복구 중';

      } else {
        hudRight.textContent = '✋ 기울기 조작 중';
      }

    } else {
      // ── 왼손 ────────────────────────────────────────────
      // 엄지(4)·검지(8) 거리 → 항상 확대/축소 반영
      const thumb = lm[4];
      const indexTip = lm[8];
      const pinchDist = Math.hypot(thumb.x - indexTip.x, thumb.y - indexTip.y);
      // 거리 0.03(붙임)~0.35(최대벌림) → scale 0.4~2.8
      // 엄지-검지 거리 → 카메라 줌 (벌릴수록 확대=카메라 가까워짐)
      targetCamZ = THREE.MathUtils.clamp(
        THREE.MathUtils.mapLinear(pinchDist, 0.03, 0.35, CAM_NEAR, CAM_FAR),
        CAM_NEAR, CAM_FAR
      );

      // 손가락 수 → 색상/효과 (엄지·검지 외 나머지 3개 기준)
      const fingers = countFingers(lm);
      switch (fingers) {
        case 0:
          applyColorMode('default');
          hudLeft.textContent = '✊ 기본';
          gesLabel.textContent = '기본 상태';
          break;
        case 1:
          applyColorMode('fire');
          hudLeft.textContent = '☝️ Fire 모드';
          gesLabel.textContent = '🔥 파이어 모드';
          break;
        case 2:
          applyColorMode('ghost');
          bloomPass.strength = 1.0;
          hudLeft.textContent = '✌️ Ghost 모드';
          gesLabel.textContent = '👻 고스트 모드';
          break;
        case 3:
          applyColorMode('default');
          shakeSkull();
          hudLeft.textContent = '🤟 흔들기';
          gesLabel.textContent = '💫 흔들림!';
          break;
        default:
          hudLeft.textContent = '줌 조절 중';
      }
    }
  });
}

// ── MediaPipe Hands 초기화 ────────────────────────────────────
const webcamEl  = document.getElementById('webcam');
const handCanvas = document.getElementById('hand-canvas');
const handCtx   = handCanvas.getContext('2d');
handCanvas.width  = 220;
handCanvas.height = 165;

const hands = new Hands({
  locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`
});

hands.setOptions({
  maxNumHands          : 2,
  modelComplexity      : 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence : 0.5,
});

hands.onResults(onHandResults);

const camFeed = new Camera(webcamEl, {
  onFrame: async () => { await hands.send({ image: webcamEl }); },
  width : 220,
  height: 165,
});
camFeed.start();

// ── 애니메이션 루프 ───────────────────────────────────────────
function animate() {
  requestAnimationFrame(animate);

  if (skullPoints) {
    // 스무스 회전 (Lerp)
    group.rotation.y += (targetRotY - group.rotation.y) * 0.14;
    // 별자리 그룹도 해골 그룹과 함께 회전
    if (constellationGroup) constellationGroup.rotation.y = group.rotation.y;
    // 카메라 줌 lerp (엄지-검지 거리 기반)
    camera.position.z += (targetCamZ - camera.position.z) * 0.07;

    // 확대 시 별자리 선/이름 가시성 조절
    if (constellationGroup && constellationGroup.visible) {
      const zoomT = 1 - THREE.MathUtils.clamp((camera.position.z - CAM_NEAR) / (CAM_FAR - CAM_NEAR), 0, 1);
      constellationGroup.children.forEach(child => {
        if (child.material) child.material.opacity = THREE.MathUtils.clamp(zoomT * 2 - 0.2, 0, 0.9);
      });
    }

    // 폭발 애니메이션 — 0.3초 내 easeOut으로 별자리 위치로 이동
    if (explodeAnim.active && skullPoints && explodeTargets) {
      explodeAnim.progress += (1 / 60) / explodeAnim.duration;
      const t = Math.min(explodeAnim.progress, 1);
      // easeOutQuart: 처음에 빠르고 끝에 부드럽게 안착
      const ease = 1 - Math.pow(1 - t, 4);
      const pos = skullPoints.geometry.attributes.position;
      const col = skullPoints.geometry.attributes.customColor;
      for (let i = 0; i < pos.count; i++) {
        pos.array[i*3]   = explodeAnim.startPos[i*3]   + (explodeTargets[i*3]   - explodeAnim.startPos[i*3])   * ease;
        pos.array[i*3+1] = explodeAnim.startPos[i*3+1] + (explodeTargets[i*3+1] - explodeAnim.startPos[i*3+1]) * ease;
        pos.array[i*3+2] = explodeAnim.startPos[i*3+2] + (explodeTargets[i*3+2] - explodeAnim.startPos[i*3+2]) * ease;
        col.array[i*3]   = explodeAnim.startCol[i*3]   + (explodeColors[i*3]   - explodeAnim.startCol[i*3])   * ease;
        col.array[i*3+1] = explodeAnim.startCol[i*3+1] + (explodeColors[i*3+1] - explodeAnim.startCol[i*3+1]) * ease;
        col.array[i*3+2] = explodeAnim.startCol[i*3+2] + (explodeColors[i*3+2] - explodeAnim.startCol[i*3+2]) * ease;
      }
      pos.needsUpdate = true;
      col.needsUpdate = true;
      if (t >= 1) {
        explodeAnim.active = false;
        updateConstellationLines(true);  // 별자리 선 표시
      }
    }

    // 파티클 복구 — 위치 + 색상 동시 lerp
    if (particlesReady && !exploded) {
      const pos = skullPoints.geometry.attributes.position;
      const col = skullPoints.geometry.attributes.customColor;
      let maxDiff = 0;
      for (let i = 0; i < pos.array.length; i++) {
        const diff = originalPositions[i] - pos.array[i];
        const absDiff = Math.abs(diff);
        if (absDiff > maxDiff) maxDiff = absDiff;
        pos.array[i] += diff * LERP_SPEED;
      }
      // 색상도 원래 해골 명암으로 lerp 복구
      if (originalColors) {
        for (let i = 0; i < col.array.length; i++) {
          col.array[i] += (originalColors[i] - col.array[i]) * LERP_SPEED * 1.5;
        }
        col.needsUpdate = true;
      }
      // 거의 다 왔으면 정확히 스냅
      if (maxDiff < 0.001) {
        for (let i = 0; i < pos.array.length; i++) {
          pos.array[i] = originalPositions[i];
        }
        if (originalColors) {
          for (let i = 0; i < col.array.length; i++) {
            col.array[i] = originalColors[i];
          }
          col.needsUpdate = true;
        }
        bloomPass.strength = 0.18;
      }
      pos.needsUpdate = true;
      if (maxDiff < 0.05 && bloomPass.strength > 0.20) {
        bloomPass.strength = THREE.MathUtils.lerp(bloomPass.strength, 0.18, 0.08);
      }
    }
  }

  composer.render();
}
animate();

// ── 리사이즈 대응 ─────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  composer.setSize(innerWidth, innerHeight);
  bloomPass.setSize(innerWidth, innerHeight);
});

// ── 슬라이더 연결 ─────────────────────────────────────────────
const slRestore = document.getElementById('sl-restore');
const slExplode = document.getElementById('sl-explode');
const valRestore = document.getElementById('val-restore');
const valExplode = document.getElementById('val-explode');

slRestore.addEventListener('input', () => {
  const v = Number(slRestore.value);
  // 1~10 → lerp 속도 0.01 ~ 0.12 (비선형, 기본값 6 ≈ 0.06)
  LERP_SPEED = v * v * 0.001 + 0.006;
  valRestore.textContent = v;
});

slExplode.addEventListener('input', () => {
  const v = Number(slExplode.value);
  // 1~10 → 폭발 반경 2 ~ 20
  EXPLODE_POWER = v * 2;
  valExplode.textContent = v;
});
