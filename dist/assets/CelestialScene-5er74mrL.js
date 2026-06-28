import{r as z,c as it,j as w,f as rt}from"./index-BGpz1I1S.js";import{M as be,O as at,B as Se,F as He,e as F,U as Me,f as y,W as re,H as ae,g as ot,h as Ne,C as U,V,A as Ce,c as nt,i as Ge,j as Oe,k as ne,P as Ye,a as Xe,G as lt,l as ct,S as Ve,d as ht,m as L,n as ut,o as ft,p as dt,q as pt,r as mt,s as gt,t as vt}from"./three-CMw2AZwd.js";import"./react-vendor-CYXFpJKG.js";const oe={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class K{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const xt=new at(-1,1,1,-1,0,1);class wt extends Se{constructor(){super(),this.setAttribute("position",new He([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new He([0,2,0,0,2,0],2))}}const bt=new wt;class Ke{constructor(e){this._mesh=new be(bt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,xt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Mt extends K{constructor(e,s="tDiffuse"){super(),this.textureID=s,this.uniforms=null,this.material=null,e instanceof F?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Me.clone(e.uniforms),this.material=new F({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Ke(this.material)}render(e,s,t){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=t.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(s),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class We extends K{constructor(e,s){super(),this.scene=e,this.camera=s,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,s,t){const o=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let c,h;this.inverse?(c=0,h=1):(c=1,h=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),i.buffers.stencil.setFunc(o.ALWAYS,c,4294967295),i.buffers.stencil.setClear(h),i.buffers.stencil.setLocked(!0),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(o.EQUAL,1,4294967295),i.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),i.buffers.stencil.setLocked(!0)}}class yt extends K{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class St{constructor(e,s){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),s===void 0){const t=e.getSize(new y);this._width=t.width,this._height=t.height,s=new re(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:ae}),s.texture.name="EffectComposer.rt1"}else this._width=s.width,this._height=s.height;this.renderTarget1=s,this.renderTarget2=s.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Mt(oe),this.copyPass.material.blending=ot,this.clock=new Ne}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,s){this.passes.splice(s,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const s=this.passes.indexOf(e);s!==-1&&this.passes.splice(s,1)}isLastEnabledPass(e){for(let s=e+1;s<this.passes.length;s++)if(this.passes[s].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const s=this.renderer.getRenderTarget();let t=!1;for(let o=0,i=this.passes.length;o<i;o++){const c=this.passes[o];if(c.enabled!==!1){if(c.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(o),c.render(this.renderer,this.writeBuffer,this.readBuffer,e,t),c.needsSwap){if(t){const h=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(h.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(h.EQUAL,1,4294967295)}this.swapBuffers()}We!==void 0&&(c instanceof We?t=!0:c instanceof yt&&(t=!1))}}this.renderer.setRenderTarget(s)}reset(e){if(e===void 0){const s=this.renderer.getSize(new y);this._pixelRatio=this.renderer.getPixelRatio(),this._width=s.width,this._height=s.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,s){this._width=e,this._height=s;const t=this._width*this._pixelRatio,o=this._height*this._pixelRatio;this.renderTarget1.setSize(t,o),this.renderTarget2.setSize(t,o);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(t,o)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Ct extends K{constructor(e,s,t=null,o=null,i=null){super(),this.scene=e,this.camera=s,this.overrideMaterial=t,this.clearColor=o,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new U}render(e,s,t){const o=e.autoClear;e.autoClear=!1;let i,c;this.overrideMaterial!==null&&(c=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:t),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=c),e.autoClear=o}}const Tt={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new U(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class W extends K{constructor(e,s=1,t,o){super(),this.strength=s,this.radius=t,this.threshold=o,this.resolution=e!==void 0?new y(e.x,e.y):new y(256,256),this.clearColor=new U(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),c=Math.round(this.resolution.y/2);this.renderTargetBright=new re(i,c,{type:ae}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let r=0;r<this.nMips;r++){const d=new re(i,c,{type:ae});d.texture.name="UnrealBloomPass.h"+r,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const u=new re(i,c,{type:ae});u.texture.name="UnrealBloomPass.v"+r,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),i=Math.round(i/2),c=Math.round(c/2)}const h=Tt;this.highPassUniforms=Me.clone(h.uniforms),this.highPassUniforms.luminosityThreshold.value=o,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new F({uniforms:this.highPassUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];i=Math.round(this.resolution.x/2),c=Math.round(this.resolution.y/2);for(let r=0;r<this.nMips;r++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[r])),this.separableBlurMaterials[r].uniforms.invSize.value=new y(1/i,1/c),i=Math.round(i/2),c=Math.round(c/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=s,this.compositeMaterial.uniforms.bloomRadius.value=.1;const f=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=f,this.bloomTintColors=[new V(1,1,1),new V(1,1,1),new V(1,1,1),new V(1,1,1),new V(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Me.clone(oe.uniforms),this.blendMaterial=new F({uniforms:this.copyUniforms,vertexShader:oe.vertexShader,fragmentShader:oe.fragmentShader,blending:Ce,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new U,this._oldClearAlpha=1,this._basic=new nt,this._fsQuad=new Ke(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,s){let t=Math.round(e/2),o=Math.round(s/2);this.renderTargetBright.setSize(t,o);for(let i=0;i<this.nMips;i++)this.renderTargetsHorizontal[i].setSize(t,o),this.renderTargetsVertical[i].setSize(t,o),this.separableBlurMaterials[i].uniforms.invSize.value=new y(1/t,1/o),t=Math.round(t/2),o=Math.round(o/2)}render(e,s,t,o,i){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const c=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),i&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=t.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=t.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let h=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=h.texture,this.separableBlurMaterials[l].uniforms.direction.value=W.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=W.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),h=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,i&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=c}_getSeparableBlurMaterial(e){const s=[];for(let t=0;t<e;t++)s.push(.39894*Math.exp(-.5*t*t/(e*e))/e);return new F({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new y(.5,.5)},direction:{value:new y(.5,.5)},gaussianCoefficients:{value:s}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new F({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}W.BlurDirectionX=new y(1,0);W.BlurDirectionY=new y(0,1);function ye(){const n=window.innerWidth,e=window.matchMedia("(pointer: coarse)").matches,s=n<768,t=s||e;return{isMobile:s,isTouch:e,lowPower:t,pixelRatioCap:t?1.25:2,xScale:s?Math.max(.38,n/1080):1,enableBloom:n>=480,starCounts:t?{far:2200,mid:1100,near:320}:{far:4e3,mid:2e3,near:600},moonTextureSize:t?512:1024,antialias:!t}}let se=null,xe=null,Qe=0;const _t=()=>{if(se)return se;const n=document.createElement("canvas");n.width=32,n.height=32;const e=n.getContext("2d"),s=e.createRadialGradient(16,16,0,16,16,16);return s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(.2,"rgba(255,255,255,0.8)"),s.addColorStop(.5,"rgba(255,255,255,0.2)"),s.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=s,e.fillRect(0,0,32,32),se=new Ge(n),se},Pt=n=>{const e=ye().moonTextureSize;if(xe&&Qe===e)return xe;const s=document.createElement("canvas");s.width=e,s.height=e;const t=s.getContext("2d"),o=e/1024;t.fillStyle="#c25a1e",t.fillRect(0,0,e,e);const i=e<=512?28:50;for(let f=0;f<i;f++){const r=Math.random()*e,d=Math.random()*e,u=(Math.random()*600+200)*o,p=t.createRadialGradient(r,d,0,r,d,u);p.addColorStop(0,"rgba(40, 10, 0, 0.5)"),p.addColorStop(1,"rgba(40, 10, 0, 0)"),t.fillStyle=p,t.beginPath(),t.arc(r,d,u,0,Math.PI*2),t.fill()}const c=e<=512?100:200;for(let f=0;f<c;f++){const r=Math.random()*e,d=Math.random()*e,u=(Math.random()*30+5)*o;t.strokeStyle="rgba(255, 200, 150, 0.15)",t.lineWidth=1,t.beginPath(),t.arc(r,d,u,0,Math.PI*2),t.stroke();const p=t.createRadialGradient(r,d,0,r,d,u);p.addColorStop(0,"rgba(20, 5, 0, 0.3)"),p.addColorStop(.8,"rgba(20, 5, 0, 0)"),t.fillStyle=p,t.beginPath(),t.arc(r,d,u,0,Math.PI*2),t.fill()}const h=e<=512?250:500;for(let f=0;f<h;f++){const r=Math.random()*e,d=Math.random()*e,u=(Math.random()*3+1)*o;t.fillStyle=Math.random()>.5?"rgba(255, 255, 255, 0.05)":"rgba(0, 0, 0, 0.05)",t.beginPath(),t.arc(r,d,u,0,Math.PI*2),t.fill()}const l=new Ge(s);return l.wrapS=Oe,l.wrapT=Oe,xe=l,Qe=e,l},we=(n,e,s,t,o,i=.1)=>{const c=new Se,h=new Float32Array(n*3),l=new Float32Array(n*3);for(let r=0;r<n;r++){const d=Math.random()*Math.PI*2,u=Math.acos(2*Math.random()-1),p=e+(Math.random()-.5)*50;h[r*3]=p*Math.sin(u)*Math.cos(d),h[r*3+1]=p*Math.sin(u)*Math.sin(d),h[r*3+2]=p*Math.cos(u);const M=new U(o);M.offsetHSL((Math.random()-.5)*i,0,(Math.random()-.5)*.2),l[r*3]=M.r,l[r*3+1]=M.g,l[r*3+2]=M.b}c.setAttribute("position",new ne(h,3)),c.setAttribute("color",new ne(l,3));const f=new Ye({size:s,transparent:!0,opacity:t,blending:Ce,depthWrite:!1,vertexColors:!0});return new Xe(c,f)},zt=()=>{const n=new lt;n.rotation.z=-Math.PI/5,n.rotation.x=-Math.PI/2.5,n.position.z=-20,n.position.x=0;const e=new ct({map:Pt(),roughness:.8,metalness:.1,emissive:16729344,emissiveIntensity:.15,transparent:!0});e.userData={baseOpacity:1};const s=new be(new Ve(1,128,128),e);n.add(s);const t=new F({transparent:!0,side:ht,uniforms:{glowColor:{value:new U(16739125)}},vertexShader:`
      varying vec3 vN;
      void main() {
        vN = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,fragmentShader:`
      uniform vec3 glowColor;
      varying vec3 vN;
      void main() {
        float i = pow(0.65 - dot(vN, vec3(0,0,1)), 4.0);
        gl_FragColor = vec4(glowColor, i);
      }
    `});n.add(new be(new Ve(1.05,64,64),t));const o=new Se,i=8e3,c=new Float32Array(i*3),h=new Float32Array(i*3);for(let r=0;r<i;r++){const d=Math.random()*6.28,u=2.5+Math.random()*1.5;c[r*3]=Math.cos(d)*u,c[r*3+1]=(Math.random()-.5)*.2,c[r*3+2]=Math.sin(d)*u;const p=new U().setHSL(.08,1,.5);h[r*3]=p.r,h[r*3+1]=p.g,h[r*3+2]=p.b}o.setAttribute("position",new ne(c,3)),o.setAttribute("color",new ne(h,3));const l=new Ye({size:.015,vertexColors:!0,transparent:!0,opacity:.6,blending:Ce,depthWrite:!1});l.userData={baseOpacity:.6};const f=new Xe(o,l);return f.rotation.x=Math.PI/2.2,n.add(f),{celestialGroup:n,planet:s,rings:f}},{lerp:X,clamp:ie}=L,Rt=n=>{const e=document.documentElement.scrollHeight-window.innerHeight||1,s={};for(const t of n){const o=document.getElementById(t);s[t]=o?(o.getBoundingClientRect().top+window.scrollY)/e:null}return s},Bt=(n,e,s={})=>{const t=s.xScale??1,o=e.intro??.1,i=e.experience??.22,c=e.research??.38,h=e.education??.46,l=e.projects??.58,f=e.friends??.82,r=[{at:0,x:0,z:-15,s:1},{at:o*.85,x:6,z:-5,s:1},{at:i,x:6,z:-5,s:1},{at:c,x:0,z:-7,s:1},{at:h,x:-7,z:-9,s:1},{at:l,x:0,z:-7,s:1},{at:f,x:-4.6,z:-2.5,s:1.3},{at:1,x:-5.1,z:-2.4,s:1.4}];let d=r[0].x,u=r[0].z,p=r[0].s;for(let C=0;C<r.length-1;C++){const R=r[C],B=r[C+1];if(n>=R.at&&n<=B.at){const I=(n-R.at)/Math.max(B.at-R.at,1e-4);d=X(R.x,B.x,I),u=X(R.z,B.z,I),p=X(R.s,B.s,I);break}}if(n>=r[r.length-1].at){const C=r[r.length-1];d=C.x,u=C.z,p=C.s}const M=(h+l)/2;let k=1;n>=M&&(k=X(1,.05,ie((n-M)/Math.max(l-M,1e-4),0,1)));const S=n>=f?ie((n-f)/Math.max((1-f)*.25,1e-4),0,1):0,b=X(1,.14,S),_=n>=f?ie((n-f)/Math.max(1-f,1e-4),0,1):0,le=ie((_-.14)/.18,0,1);return{x:d*t,z:u,scale:p,friendsActive:n>=f,ringsOpacity:k,crescent:S,planetOpacity:b,globeVis:le}},Lt=({scrollPercent:n=0,onReady:e})=>{const s=z.useRef(null),[t,o]=z.useState(!1),[i,c]=z.useState(0),h=z.useRef(0),l=z.useRef({friendsActive:!1}),f=z.useRef(null),r=z.useRef(ye());return z.useEffect(()=>{h.current=n},[n]),z.useEffect(()=>{if(!s.current)return;const d=s.current,u=new ut,p=r.current,M=window.innerWidth,k=window.innerHeight,S=new ft(75,M/k,.1,1e3);S.position.z=5;const b=new dt({antialias:p.antialias,alpha:!0,powerPreference:p.lowPower?"low-power":"high-performance"});b.setSize(M,k),b.setPixelRatio(Math.min(window.devicePixelRatio,p.pixelRatioCap)),b.toneMapping=pt,b.toneMappingExposure=1.2,d.appendChild(b.domElement);const _=p.enableBloom?new St(b):null;if(_){_.addPass(new Ct(u,S));const a=new W(new y(M/2,k/2),1.4,.4,.1);_.addPass(a)}_t();const{far:le,mid:C,near:R}=p.starCounts,B=we(le,200,.05,.6,16777215,.05),I=we(C,100,.08,.5,16765066,.15),Te=we(R,60,.12,.4,16747586,.2);u.add(B,I,Te);const qe=[B,I,Te],{celestialGroup:T,planet:q,rings:J}=zt();u.add(T);const x=it(rt);x.position.set(0,-.55,0),x.scale.setScalar(.74),x.traverse(a=>{a.material&&(a.material.userData={baseOpacity:a.material.opacity},a.material.opacity=0,a.material.transparent=!0,a.material.depthWrite=!1)}),x.visible=!1,u.add(x);let P=0,ce=1;const Z=x.userData.friendMeshes||[],_e=new vt,he=new y,Q=new V;let E=null,ue=!1;const Pe=Z.map(a=>{const g=document.createElement("div");return g.className="friend-label",g.textContent=a.userData.name||"",a.userData.url&&g.addEventListener("click",v=>{v.stopPropagation(),Re(a)}),f.current?.appendChild(g),g}),ze=a=>{if(!l.current.friendsActive||P<.15)return null;he.x=a.clientX/window.innerWidth*2-1,he.y=-(a.clientY/window.innerHeight)*2+1,_e.setFromCamera(he,S);const g=_e.intersectObjects(Z,!0);if(!g.length)return null;let v=g[0].object;for(;v&&!Z.includes(v);)v=v.parent;return v||null},Re=a=>{const g=a?.userData?.url;g&&window.open(g,"_blank","noopener")},Be=new mt(16777215,.3);u.add(Be);const De=new gt(16777215,1.5);De.position.set(5,3,5),u.add(De);let N=!1,j=null,$={x:0,y:0},G={x:0,y:0},Y={x:0,y:0};const fe=()=>{const a=window.scrollY;c(a<200?a:200)},Je=a=>a?.closest?.("a, button, input, textarea, select, label, .orbit-arrow, .arch-row, .navbar, .scroll-rail"),H=a=>{document.body.style.cursor=a},Ee=a=>{Je(a.target)||(a.pointerType==="touch"&&a.preventDefault(),N=!0,j=a.pointerId,ue=!1,$={x:a.clientX,y:a.clientY})},ee=a=>{if(!(j!==null&&a.pointerId!==j)){if(!ue&&l.current.friendsActive){const g=ze(a)||E;Re(g)}N=!1,j=null,l.current.friendsActive?H(E?.userData?.url?"pointer":"grab"):H("grab")}},Ae=a=>{if(j!==null&&a.pointerId!==j)return;if(!N){if(l.current.friendsActive&&a.pointerType!=="touch"){E=ze(a);const pe=!!E?.userData?.url;H(pe?"pointer":"grab")}else l.current.friendsActive||H("grab");return}H("grabbing");const g=a.clientX-$.x,v=a.clientY-$.y;Math.abs(g)+Math.abs(v)>4&&(o(!0),ue=!0),l.current.friendsActive?(x.rotation.y-=g*.005,x.rotation.x-=v*.005,Y={x:-v*.005,y:-g*.005}):(T.rotation.y-=g*.005,T.rotation.x-=v*.005,G={x:-v*.005,y:-g*.005}),$={x:a.clientX,y:a.clientY}};window.addEventListener("scroll",fe),fe(),window.addEventListener("pointerdown",Ee,{passive:!1}),window.addEventListener("pointerup",ee),window.addEventListener("pointercancel",ee),window.addEventListener("pointermove",Ae);const de=new Ne,te={planet:.04,rings:.05,globe:.02,stars:.004};let Le=!1;const Fe=()=>{requestAnimationFrame(Fe),Le||(Le=!0,e?.());const a=Math.min(de.getDelta(),.05),g=Rt(["intro","experience","research","education","projects","friends"]),v=Bt(h.current,g,{xScale:r.current.xScale}),{x:pe,z:Ze,ringsOpacity:$e}=v;T.position.z=Ze,T.position.x=pe,T.scale.setScalar(v.scale),N||(T.rotation.y+=G.y,T.rotation.x+=G.x,G.x*=.95,G.y*=.95,T.rotation.y+=te.planet*a),J.rotation.y+=te.rings*a,de.elapsedTime<2.5&&(T.rotation.y+=.6*(1-de.elapsedTime/2.5)*a),N||(x.rotation.y+=Y.y,x.rotation.x+=Y.x,Y.x*=.95,Y.y*=.95,x.rotation.y+=te.globe*a),qe.forEach((m,O)=>{m.rotation.y+=te.stars*(O+1)*a,m.material.opacity=m.material.opacity*.99+(Math.random()*.1+(.4+O*.2))*.01,m.material.opacity=L.clamp(m.material.opacity,.1,.85)}),ce=L.lerp(ce,v.planetOpacity,.1),q.material.opacity=(q.material.userData?.baseOpacity??1)*ce,q.material.transparent=!0,q.material.emissiveIntensity=L.lerp(.15,.005,v.crescent),Be.intensity=L.lerp(.3,.05,v.crescent),J.material.opacity=(J.material.userData?.baseOpacity??.6)*$e,J.material.transparent=!0;let me=0;const ke=document.getElementById("friends");if(ke){const m=window.innerHeight,O=ke.getBoundingClientRect().top;me=L.clamp((m*.3-O)/(m*.32),0,1)}x.visible=P>.01,P=L.lerp(P,me,.06),l.current.friendsActive=me>.2,x.visible?(x.traverse(m=>{m.material&&m.material.userData.baseOpacity!==void 0&&(m.material.opacity=m.material.userData.baseOpacity*P)}),Z.forEach((m,O)=>{const D=Pe[O];if(!D)return;m.getWorldPosition(Q);const et=Q.z-x.position.z;Q.project(S);const tt=(Q.x*.5+.5)*window.innerWidth,st=(-Q.y*.5+.5)*window.innerHeight,A=E===m,Ie=!!m.userData.url,ge=(et>-.2||A)&&P>.3;if(m.scale.setScalar(A?1.9:1),m.material){m.material.color.setHex(A?16774374:m.userData.baseColor);const je=m.userData.baseOpacity*P;m.material.opacity=A?Math.min(je*1.15,1):je}const ve=m.userData.halo;ve&&(ve.lookAt(S.position),ve.material.opacity=A?.7*P:0),D.style.left=tt+"px",D.style.top=st+"px",D.style.opacity=ge?String(P*(A?1:.75)):"0",D.style.pointerEvents=ge&&Ie?"auto":"none",D.classList.toggle("hot",A),D.classList.toggle("has-link",Ie),D.setAttribute("aria-hidden",ge?"false":"true")})):E&&(E=null),_?_.render():b.render(u,S)};Fe();const Ue=()=>{r.current=ye(),S.aspect=window.innerWidth/window.innerHeight,S.updateProjectionMatrix(),b.setSize(window.innerWidth,window.innerHeight),b.setPixelRatio(Math.min(window.devicePixelRatio,r.current.pixelRatioCap)),_&&_.setSize(window.innerWidth,window.innerHeight)};return window.addEventListener("resize",Ue),()=>{window.removeEventListener("scroll",fe),window.removeEventListener("pointerdown",Ee),window.removeEventListener("pointerup",ee),window.removeEventListener("pointercancel",ee),window.removeEventListener("pointermove",Ae),window.removeEventListener("resize",Ue),H(""),Pe.forEach(a=>a.remove()),d.removeChild(b.domElement),b.dispose()}},[e]),w.jsxs(w.Fragment,{children:[w.jsx("div",{ref:s,style:{position:"fixed",inset:0,zIndex:-1,background:"black",touchAction:"none"}}),w.jsx("div",{ref:f,style:{position:"fixed",inset:0,zIndex:5,pointerEvents:"none"}}),i<150&&w.jsxs("div",{style:{position:"fixed",bottom:"2.5rem",left:"50%",transform:"translateX(-50%)",zIndex:10,display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",pointerEvents:"none",opacity:Math.max(1-i/100,0),transition:"opacity 0.3s ease"},children:[w.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"0.5rem",animation:"hintBounce 2s ease-in-out infinite"},children:[w.jsx("span",{style:{color:"rgba(255, 200, 160, 0.5)",fontFamily:"var(--font-sans)",fontSize:"0.7rem",letterSpacing:"2px",textTransform:"uppercase"},children:"Scroll to begin"}),w.jsx("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"rgba(255, 140, 66, 0.5)",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:w.jsx("polyline",{points:"6 9 12 15 18 9"})})]}),!t&&w.jsxs("span",{style:{display:"flex",alignItems:"center",gap:"0.4rem",color:"rgba(255, 200, 160, 0.45)",fontFamily:"var(--font-sans)",fontSize:"0.65rem",letterSpacing:"1.5px",textTransform:"uppercase",animation:"dragNudge 2.4s ease-in-out infinite"},children:[w.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"rgba(255, 200, 160, 0.55)",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[w.jsx("path",{d:"M18 11V6a2 2 0 0 0-4 0M14 10V4a2 2 0 0 0-4 0v2M10 10.5V6a2 2 0 0 0-4 0v8"}),w.jsx("path",{d:"M18 8a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"})]}),"or drag the planet"]})]}),w.jsx("style",{children:`
        @keyframes hintBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        @keyframes dragNudge {
          0%, 100% { transform: translateX(0); opacity: 0.45; }
          50% { transform: translateX(5px); opacity: 0.8; }
        }
        .friend-label {
          position: absolute;
          transform: translate(-50%, -150%);
          white-space: nowrap;
          font-family: var(--font-sans);
          font-size: 0.66rem;
          letter-spacing: 0.5px;
          color: #fff;
          background: rgba(10, 7, 5, 0.74);
          border: 1px solid rgba(255, 208, 138, 0.3);
          border-radius: 10px;
          padding: 0.12rem 0.5rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.2s;
        }
        .friend-label.has-link {
          cursor: pointer;
        }
        .friend-label.hot {
          border-color: #ffd08a;
          background: rgba(30, 18, 10, 0.92);
          box-shadow: 0 0 18px rgba(255, 140, 66, 0.55), 0 0 4px rgba(255, 208, 138, 0.8);
          transform: translate(-50%, -150%) scale(1.08);
          color: #fff4e6;
        }
        .friend-label.hot.has-link::after {
          content: " ↗";
          color: #ff8c42;
          font-size: 0.58rem;
        }
      `})]})};export{Lt as default};
