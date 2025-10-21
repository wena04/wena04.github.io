import * as THREE from "three";

export function createPlanet() {
  const group = new THREE.Group();
  const timeRef = { current: 0 };

  const SUN_RADIUS = 0.9;

  // GLSL helpers: 3D noise + fbm (compact)
  const NOISE_GLSL = `
  // iq's hash/rot/noise compacted + fbm
  vec3 hash3(vec3 p){ p = vec3(dot(p,vec3(127.1,311.7, 74.7)),
                                dot(p,vec3(269.5,183.3,246.1)),
                                dot(p,vec3(113.5,271.9,124.6)));
    return -1.0 + 2.0*fract(sin(p)*43758.5453123);
  }
  float noise(vec3 p){
    vec3 i = floor(p), f = fract(p);
    vec3 u = f*f*(3.0-2.0*f);
    return mix(mix(mix( dot(hash3(i+vec3(0,0,0)), f-vec3(0,0,0)),
                          dot(hash3(i+vec3(1,0,0)), f-vec3(1,0,0)), u.x),
                     mix( dot(hash3(i+vec3(0,1,0)), f-vec3(0,1,0)),
                          dot(hash3(i+vec3(1,1,0)), f-vec3(1,1,0)), u.x), u.y),
                mix(mix( dot(hash3(i+vec3(0,0,1)), f-vec3(0,0,1)),
                          dot(hash3(i+vec3(1,0,1)), f-vec3(1,0,1)), u.x),
                     mix( dot(hash3(i+vec3(0,1,1)), f-vec3(0,1,1)),
                          dot(hash3(i+vec3(1,1,1)), f-vec3(1,1,1)), u.x), u.y), u.z);
  }
  float fbm(vec3 p){
    float a = 0.5, s = 0.0;
    for(int i=0;i<5;i++){ s += a*noise(p); p *= 2.0; a *= 0.55; }
    return s;
  }
  `;

  // Sun surface shader (granulation + lava cells + rim)
  const sunSurface = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorA: { value: new THREE.Color(0xffe29a) }, // bright
      uColorB: { value: new THREE.Color(0xff7a2a) }, // deep orange
      uGlow: { value: new THREE.Color(0xfff6c5) },
    },
    vertexShader: `
      varying vec3 vPos;
      varying vec3 vNormal;
      void main() {
        vPos = position;
        vNormal = normalMatrix * normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform float uTime;
      uniform vec3  uColorA, uColorB, uGlow;
      varying vec3  vPos;
      varying vec3  vNormal;
      ${NOISE_GLSL}
      void main(){
        // base 3D fbm sliding over the surface
        vec3 p = normalize(vPos) * 2.0;
        float t = uTime * 0.25;
        float n1 = fbm(p*2.2 + vec3(t*1.1, -t*0.9, t*0.7));
        float n2 = fbm(p*4.0 - vec3(t*0.6, t*0.4, -t*0.3));
        float cells = smoothstep(0.25, 0.8, n1 + n2*0.6);

        // rim boost (helps bloom at the edges)
        float fres = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0,0.0,1.0)), 0.0), 3.0);

        vec3 col = mix(uColorB, uColorA, cells);
        col += uGlow * fres * 0.6;

        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const sunMesh = new THREE.Mesh(
    new THREE.SphereGeometry(SUN_RADIUS, 96, 96),
    sunSurface
  );
  group.add(sunMesh);

  // Corona shell: faint, noisy transparency with fresnel
  const corona = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color(0xfff2b0) },
      uColor2: { value: new THREE.Color(0xff9b3b) },
      uRadius: { value: SUN_RADIUS },
    },
    vertexShader: `
      varying vec3 vN; varying vec3 vWPos;
      void main(){
        vN = normalize(normalMatrix * normal);
        vWPos = (modelMatrix * vec4(position,1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform float uTime;
      uniform vec3  uColor1, uColor2;
      varying vec3  vN; varying vec3 vWPos;
      ${NOISE_GLSL}
      void main(){
        // fresnel-ish mask
        float f = pow(1.0 - abs(vN.z), 2.5);

        // wavy flame noise drifting outward
        float n = fbm(vWPos*1.5 + vec3(0.0, uTime*0.5, 0.0));
        float alpha = smoothstep(0.35, 0.95, f + n*0.55);

        vec3 col = mix(uColor1, uColor2, n);
        gl_FragColor = vec4(col, alpha*0.5); // soft
      }
    `,
  });
  const coronaMesh = new THREE.Mesh(
    new THREE.SphereGeometry(SUN_RADIUS * 1.18, 96, 96),
    corona
  );
  group.add(coronaMesh);

  // Golden ring (orbital ring around the planet)
  const RING_RADIUS = 3.2;
  const ringCurve = new THREE.EllipseCurve(
    0,
    0,
    RING_RADIUS,
    RING_RADIUS,
    0,
    Math.PI * 2,
    false,
    0
  );
  const ringPoints = ringCurve
    .getPoints(200)
    .map((p) => new THREE.Vector3(p.x, 0, p.y));
  const ringPath = new THREE.CatmullRomCurve3(ringPoints, true);
  const ringGeometry = new THREE.TubeGeometry(ringPath, 300, 0.02, 8, true);
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0xffc760,
    transparent: true,
    opacity: 0.8,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);
  group.add(ring);

  // Spark trail particles
  const SPARKS = 6000;
  const sparkGeometry = new THREE.BufferGeometry();
  const sparkPos = new Float32Array(SPARKS * 3);
  const sparkPhase = new Float32Array(SPARKS);
  const sparkSpeed = new Float32Array(SPARKS);
  const sparkRadJitter = new Float32Array(SPARKS);
  const sparkSize = new Float32Array(SPARKS);

  for (let i = 0; i < SPARKS; i++) {
    sparkPos[i * 3 + 0] = 0;
    sparkPos[i * 3 + 1] = 0;
    sparkPos[i * 3 + 2] = 0;
    sparkPhase[i] = Math.random() * Math.PI * 2;
    sparkSpeed[i] = THREE.MathUtils.lerp(0.5, 2.2, Math.random());
    sparkRadJitter[i] = THREE.MathUtils.lerp(-0.15, 0.18, Math.random());
    sparkSize[i] = THREE.MathUtils.lerp(0.02, 0.08, Math.random());
  }

  sparkGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(sparkPos, 3)
  );
  sparkGeometry.setAttribute("phase", new THREE.BufferAttribute(sparkPhase, 1));
  sparkGeometry.setAttribute("speed", new THREE.BufferAttribute(sparkSpeed, 1));
  sparkGeometry.setAttribute(
    "rj",
    new THREE.BufferAttribute(sparkRadJitter, 1)
  );
  sparkGeometry.setAttribute("psize", new THREE.BufferAttribute(sparkSize, 1));

  // Custom shader material for spark particles
  const sparkMaterial = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uRadius: { value: RING_RADIUS },
      uColor1: { value: new THREE.Color(0xfff2b0) },
      uColor2: { value: new THREE.Color(0xff8a2a) },
    },
    vertexShader: `
      uniform float uTime;
      uniform float uRadius;
      attribute float phase;
      attribute float speed;
      attribute float rj;
      attribute float psize;

      varying float vFalloff;
      varying float vMix;

      void main() {
        float angle = phase + uTime * speed;
        float r = uRadius + rj;
        vec3 pos = vec3( r * cos(angle), 0.0, r * sin(angle) );

        // tiny vertical noise for thickness
        pos.y += sin(angle*7.0 + phase)*0.03;

        vFalloff = fract(angle / 6.28318530718);
        vMix = smoothstep(0.0, 1.0, vFalloff);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = psize * 120.0 / -mvPosition.z;
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying float vFalloff;
      varying float vMix;

      void main() {
        vec2 uv = gl_PointCoord * 2.0 - 1.0;
        float d = dot(uv, uv);
        float alpha = smoothstep(1.0, 0.0, d);

        vec3 col = mix(uColor1, uColor2, vMix);
        alpha *= 1.2 - d;

        gl_FragColor = vec4(col, alpha);
      }
    `,
  });

  const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
  group.add(sparks);

  // Light streaks across the planet
  function makeStreak(rotY, offsetY) {
    const geometry = new THREE.PlaneGeometry(9, 0.25);
    const material = new THREE.MeshBasicMaterial({
      color: 0xffdfa0,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = rotY;
    mesh.position.y = offsetY;
    return mesh;
  }
  group.add(makeStreak(Math.PI * 0.26, 0.35));
  group.add(makeStreak(Math.PI * 0.26, -0.35));

  // Animation function
  function animate(delta) {
    timeRef.current += delta;

    // Rotate the sun
    sunMesh.rotation.y += delta * 0.03;

    // Update shader uniforms
    sunSurface.uniforms.uTime.value = timeRef.current;
    corona.uniforms.uTime.value = timeRef.current;
    sparkMaterial.uniforms.uTime.value = timeRef.current;
  }

  // Store animation function and references
  group.userData.animate = animate;
  group.userData.sparkMaterial = sparkMaterial;
  group.userData.sunSurface = sunSurface;
  group.userData.corona = corona;

  return group;
}
