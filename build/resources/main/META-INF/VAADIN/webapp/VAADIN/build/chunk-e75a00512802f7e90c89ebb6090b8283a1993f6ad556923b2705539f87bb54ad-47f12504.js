import{r as O,E as G,h as T,F as qi,T as I,P as S,o as ji,O as ii,a as ai,b as ln,c as si,p as li,f as Vi,d as Qi,s as An,e as Xi,w as fe,t as Gi,m as Ki,g as Ji,D as Zi,j as ea,k as ta,l as ra,n as ui,q as na,u as ci,C as zt,S as U,v as oa,x as ia,y as fi,z as aa,A as di,B as sa,G as X,H as la,I as Qt,J as Xt,K as hi,L as ua,M as ca,N as fa,Q as da,R as ha,U as pi,V as pa,W as ma,X as mi,Y as ya,Z as _a,_ as yi,a0 as _i,a1 as va,a2 as ga,i as ba,$ as wa}from"./generated-flow-imports-fd41e85b.js";import{R as vi,a as ge,M as gi}from"./lit-renderer-54db14fd.js";import{i as x,D as bi,x as On}from"./indexhtml-d2d9fc34.js";O("vaadin-form-layout",x`
    :host {
      --vaadin-form-layout-column-spacing: var(--lumo-space-l);
    }
  `,{moduleId:"lumo-form-layout"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class xn extends vi(G(I(S))){static get template(){return T`
      <style>
        :host {
          display: block;
          max-width: 100%;
          animation: 1ms vaadin-form-layout-appear;
          /* CSS API for host */
          --vaadin-form-item-label-width: 8em;
          --vaadin-form-item-label-spacing: 1em;
          --vaadin-form-item-row-spacing: 1em;
          --vaadin-form-layout-column-spacing: 2em; /* (default) */
          align-self: stretch;
        }

        @keyframes vaadin-form-layout-appear {
          to {
            opacity: 1 !important; /* stylelint-disable-line keyframe-declaration-no-important */
          }
        }

        :host([hidden]) {
          display: none !important;
        }

        #layout {
          display: flex;

          align-items: baseline; /* default \`stretch\` is not appropriate */

          flex-wrap: wrap; /* the items should wrap */
        }

        #layout ::slotted(*) {
          /* Items should neither grow nor shrink. */
          flex-grow: 0;
          flex-shrink: 0;

          /* Margins make spacing between the columns */
          margin-left: calc(0.5 * var(--vaadin-form-layout-column-spacing));
          margin-right: calc(0.5 * var(--vaadin-form-layout-column-spacing));
        }

        #layout ::slotted(br) {
          display: none;
        }
      </style>
      <div id="layout">
        <slot id="slot"></slot>
      </div>
    `}static get is(){return"vaadin-form-layout"}static get properties(){return{responsiveSteps:{type:Array,value(){return[{minWidth:0,columns:1,labelsPosition:"top"},{minWidth:"20em",columns:1},{minWidth:"40em",columns:2}]},observer:"_responsiveStepsChanged"},_columnCount:{type:Number},_labelsOnTop:{type:Boolean}}}static get observers(){return["_invokeUpdateLayout(_columnCount, _labelsOnTop)"]}ready(){this._styleElement=document.createElement("style"),this.appendChild(this._styleElement),this._styleElement.textContent=" ",super.ready(),this.addEventListener("animationend",this.__onAnimationEnd)}connectedCallback(){super.connectedCallback(),requestAnimationFrame(()=>this._selectResponsiveStep()),requestAnimationFrame(()=>this._updateLayout()),this._observeChildrenColspanChange()}disconnectedCallback(){super.disconnectedCallback(),this.__mutationObserver.disconnect(),this.__childObserver.disconnect()}_observeChildrenColspanChange(){const e={attributes:!0};this.__mutationObserver=new MutationObserver(t=>{t.forEach(n=>{n.type==="attributes"&&(n.attributeName==="colspan"||n.attributeName==="hidden")&&this._updateLayout()})}),this.__childObserver=new qi(this,t=>{const n=this._getObservableNodes(t.addedNodes),o=this._getObservableNodes(t.removedNodes);n.forEach(i=>{this.__mutationObserver.observe(i,e)}),(n.length>0||o.length>0)&&this._updateLayout()})}_getObservableNodes(e){const t=["template","style","dom-repeat","dom-if"];return Array.from(e).filter(n=>n.nodeType===Node.ELEMENT_NODE&&t.indexOf(n.localName.toLowerCase())===-1)}_naturalNumberOrOne(e){return typeof e=="number"&&e>=1&&e<1/0?Math.floor(e):1}_isValidCSSLength(e){return e==="inherit"||e==="normal"?!1:(this._styleElement.firstChild.nodeValue=`#styleElement { word-spacing: ${e}; }`,this._styleElement.sheet?["",null].indexOf(this._styleElement.sheet.cssRules[0].style.getPropertyValue("word-spacing"))<0:!0)}_responsiveStepsChanged(e,t){try{if(!Array.isArray(e))throw new Error('Invalid "responsiveSteps" type, an Array is required.');if(e.length<1)throw new Error('Invalid empty "responsiveSteps" array, at least one item is required.');e.forEach(n=>{if(this._naturalNumberOrOne(n.columns)!==n.columns)throw new Error(`Invalid 'columns' value of ${n.columns}, a natural number is required.`);if(n.minWidth!==void 0&&!this._isValidCSSLength(n.minWidth))throw new Error(`Invalid 'minWidth' value of ${n.minWidth}, a valid CSS length required.`);if(n.labelsPosition!==void 0&&["aside","top"].indexOf(n.labelsPosition)===-1)throw new Error(`Invalid 'labelsPosition' value of ${n.labelsPosition}, 'aside' or 'top' string is required.`)})}catch(n){t&&t!==e?(console.warn(`${n.message} Using previously set 'responsiveSteps' instead.`),this.responsiveSteps=t):(console.warn(`${n.message} Using default 'responsiveSteps' instead.`),this.responsiveSteps=[{minWidth:0,columns:1,labelsPosition:"top"},{minWidth:"20em",columns:1},{minWidth:"40em",columns:2}])}this._selectResponsiveStep()}__onAnimationEnd(e){e.animationName.indexOf("vaadin-form-layout-appear")===0&&this._selectResponsiveStep()}_selectResponsiveStep(){let e;const t="background-position";this.responsiveSteps.forEach(n=>{this.$.layout.style.setProperty(t,n.minWidth),parseFloat(getComputedStyle(this.$.layout).getPropertyValue(t))<=this.offsetWidth&&(e=n)}),this.$.layout.style.removeProperty(t),e&&(this._columnCount=e.columns,this._labelsOnTop=e.labelsPosition==="top")}_invokeUpdateLayout(){this._updateLayout()}_updateLayout(){const e=getComputedStyle(this),t=e.getPropertyValue("--vaadin-form-layout-column-spacing"),n=e.direction,o=`margin-${n==="ltr"?"left":"right"}`,i=`margin-${n==="ltr"?"right":"left"}`,a=this.offsetWidth;let s=0;Array.from(this.children).filter(l=>l.localName==="br"||getComputedStyle(l).display!=="none").forEach((l,u,f)=>{if(l.localName==="br"){s=0;return}let c;c=this._naturalNumberOrOne(parseFloat(l.getAttribute("colspan"))),c=Math.min(c,this._columnCount);const d=c/this._columnCount;l.style.width=`calc(${d*99.9}% - ${1-d} * ${t})`,s+c>this._columnCount&&(s=0),s===0?l.style.setProperty(o,"0px"):l.style.removeProperty(o);const h=u+1,_=h<f.length&&f[h].localName==="br";if(s+c===this._columnCount)l.style.setProperty(i,"0px");else if(_){const D=(this._columnCount-s-c)/this._columnCount;l.style.setProperty(i,`calc(${D*a}px + ${D} * ${t})`)}else l.style.removeProperty(i);s=(s+c)%this._columnCount,l.localName==="vaadin-form-item"&&(this._labelsOnTop?l.getAttribute("label-position")!=="top"&&(l.__useLayoutLabelPosition=!0,l.setAttribute("label-position","top")):l.__useLayoutLabelPosition&&(delete l.__useLayoutLabelPosition,l.removeAttribute("label-position")))})}_onResize(){this._selectResponsiveStep()}}customElements.define(xn.is,xn);const Aa=x`
  /* Optical centering */
  :host::before,
  :host::after {
    content: '';
    flex-basis: 0;
    flex-grow: 1;
  }

  :host::after {
    flex-grow: 1.1;
  }

  [part='overlay'] {
    border-radius: var(--lumo-border-radius-l);
    box-shadow: 0 0 0 1px var(--lumo-shade-5pct), var(--lumo-box-shadow-xl);
    background-image: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  [part='content'] {
    padding: var(--lumo-space-l);
  }

  :host(:is([has-header], [has-title])) [part='header'] + [part='content'] {
    padding-top: 0;
  }

  [part='header'],
  [part='header-content'],
  [part='footer'] {
    gap: var(--lumo-space-xs) var(--lumo-space-s);
    line-height: var(--lumo-line-height-s);
  }

  [part='header'] {
    padding: var(--lumo-space-m);
    background-color: var(--lumo-base-color);
    border-radius: var(--lumo-border-radius-l) var(--lumo-border-radius-l) 0 0; /* Needed for Safari */
  }

  [part='footer'] {
    padding: var(--lumo-space-s) var(--lumo-space-m);
    background-color: var(--lumo-contrast-5pct);
    border-radius: 0 0 var(--lumo-border-radius-l) var(--lumo-border-radius-l); /* Needed for Safari */
  }

  [part='title'] {
    font-size: var(--lumo-font-size-xl);
    font-weight: 600;
    color: var(--lumo-header-text-color);
    margin-inline-start: calc(var(--lumo-space-l) - var(--lumo-space-m));
  }

  /* No padding */
  :host([theme~='no-padding']) [part='content'] {
    padding: 0;
  }

  @media (min-height: 320px) {
    :host([overflow~='top']) [part='header'] {
      box-shadow: 0 1px 0 0 var(--lumo-contrast-10pct);
    }
  }

  /* Animations */

  :host([opening]),
  :host([closing]) {
    animation: 0.25s lumo-overlay-dummy-animation;
  }

  :host([opening]) [part='overlay'] {
    animation: 0.12s 0.05s vaadin-dialog-enter cubic-bezier(0.215, 0.61, 0.355, 1) both;
  }

  @keyframes vaadin-dialog-enter {
    0% {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  :host([closing]) [part='overlay'] {
    animation: 0.1s 0.03s vaadin-dialog-exit cubic-bezier(0.55, 0.055, 0.675, 0.19) both;
  }

  :host([closing]) [part='backdrop'] {
    animation-delay: 0.05s;
  }

  @keyframes vaadin-dialog-exit {
    100% {
      opacity: 0;
      transform: scale(1.02);
    }
  }
`;O("vaadin-dialog-overlay",[ji,Aa],{moduleId:"lumo-dialog"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */O("vaadin-dialog-overlay",x`
    [part='header'],
    [part='header-content'],
    [part='footer'] {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      flex: none;
      pointer-events: none;
      z-index: 1;
    }

    [part='header'] {
      flex-wrap: nowrap;
    }

    ::slotted([slot='header-content']),
    ::slotted([slot='title']),
    ::slotted([slot='footer']) {
      display: contents;
      pointer-events: auto;
    }

    ::slotted([slot='title']) {
      font: inherit !important;
      overflow-wrap: anywhere;
    }

    [part='header-content'] {
      flex: 1;
    }

    :host([has-title]) [part='header-content'],
    [part='footer'] {
      justify-content: flex-end;
    }

    :host(:not([has-title]):not([has-header])) [part='header'],
    :host(:not([has-header])) [part='header-content'],
    :host(:not([has-title])) [part='title'],
    :host(:not([has-footer])) [part='footer'] {
      display: none !important;
    }

    :host(:is([has-title], [has-header], [has-footer])) [part='content'] {
      height: auto;
    }

    @media (min-height: 320px) {
      :host(:is([has-title], [has-header], [has-footer])) .resizer-container {
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      :host(:is([has-title], [has-header], [has-footer])) [part='content'] {
        flex: 1;
        overflow: auto;
      }
    }

    /*
      NOTE(platosha): Make some min-width to prevent collapsing of the content
      taking the parent width, e. g., <vaadin-grid> and such.
    */
    [part='content'] {
      min-width: 12em; /* matches the default <vaadin-text-field> width */
    }

    :host([has-bounds-set]) [part='overlay'] {
      max-width: none;
    }

    @media (forced-colors: active) {
      [part='overlay'] {
        outline: 3px solid !important;
      }
    }
  `,{moduleId:"vaadin-dialog-overlay-styles"});let de;class Pn extends ii{static get is(){return"vaadin-dialog-overlay"}static get template(){if(!de){de=super.template.cloneNode(!0);const e=de.content.querySelector('[part="content"]'),t=de.content.querySelector('[part="overlay"]'),n=document.createElement("section");n.id="resizerContainer",n.classList.add("resizer-container"),n.appendChild(e),t.appendChild(n);const o=document.createElement("header");o.setAttribute("part","header"),n.insertBefore(o,e);const i=document.createElement("div");i.setAttribute("part","title"),o.appendChild(i);const a=document.createElement("slot");a.setAttribute("name","title"),i.appendChild(a);const s=document.createElement("div");s.setAttribute("part","header-content"),o.appendChild(s);const l=document.createElement("slot");l.setAttribute("name","header-content"),s.appendChild(l);const u=document.createElement("footer");u.setAttribute("part","footer"),n.appendChild(u);const f=document.createElement("slot");f.setAttribute("name","footer"),u.appendChild(f)}return de}static get observers(){return["_headerFooterRendererChange(headerRenderer, footerRenderer, opened)","_headerTitleChanged(headerTitle, opened)"]}static get properties(){return{modeless:Boolean,withBackdrop:Boolean,headerTitle:String,headerRenderer:Function,footerRenderer:Function}}ready(){super.ready(),this.__resizeObserver=new ResizeObserver(()=>{this.__updateOverflow()}),this.__resizeObserver.observe(this.$.resizerContainer),this.$.content.addEventListener("scroll",()=>{this.__updateOverflow()})}__createContainer(e){const t=document.createElement("div");return t.setAttribute("slot",e),t}__clearContainer(e){e.innerHTML="",delete e._$litPart$}__initContainer(e,t){return e?this.__clearContainer(e):e=this.__createContainer(t),e}_headerFooterRendererChange(e,t,n){const o=this.__oldHeaderRenderer!==e;this.__oldHeaderRenderer=e;const i=this.__oldFooterRenderer!==t;this.__oldFooterRenderer=t;const a=this._oldOpenedFooterHeader!==n;this._oldOpenedFooterHeader=n,this.toggleAttribute("has-header",!!e),this.toggleAttribute("has-footer",!!t),o&&(e?this.headerContainer=this.__initContainer(this.headerContainer,"header-content"):this.headerContainer&&(this.headerContainer.remove(),this.headerContainer=null,this.__updateOverflow())),i&&(t?this.footerContainer=this.__initContainer(this.footerContainer,"footer"):this.footerContainer&&(this.footerContainer.remove(),this.footerContainer=null,this.__updateOverflow())),(e&&(o||a)||t&&(i||a))&&n&&this.requestContentUpdate()}_headerTitleChanged(e,t){this.toggleAttribute("has-title",!!e),t&&(e||this._oldHeaderTitle)&&this.requestContentUpdate(),this._oldHeaderTitle=e}_headerTitleRenderer(){this.headerTitle?(this.headerTitleElement||(this.headerTitleElement=document.createElement("h2"),this.headerTitleElement.setAttribute("slot","title"),this.headerTitleElement.classList.add("draggable")),this.appendChild(this.headerTitleElement),this.headerTitleElement.textContent=this.headerTitle):this.headerTitleElement&&(this.headerTitleElement.remove(),this.headerTitleElement=null)}requestContentUpdate(){super.requestContentUpdate(),this.headerContainer&&(this.headerContainer.parentElement||this.appendChild(this.headerContainer),this.headerRenderer&&this.headerRenderer.call(this.owner,this.headerContainer,this.owner)),this.footerContainer&&(this.footerContainer.parentElement||this.appendChild(this.footerContainer),this.footerRenderer&&this.footerRenderer.call(this.owner,this.footerContainer,this.owner)),this._headerTitleRenderer(),this.__updateOverflow()}setBounds(e){const t=this.$.overlay,n={...e};t.style.position!=="absolute"&&(t.style.position="absolute",this.setAttribute("has-bounds-set","")),Object.keys(n).forEach(o=>{typeof n[o]=="number"&&(n[o]=`${n[o]}px`)}),Object.assign(t.style,n)}getBounds(){const e=this.$.overlay.getBoundingClientRect(),t=this.getBoundingClientRect(),n=e.top-t.top,o=e.left-t.left,i=e.width,a=e.height;return{top:n,left:o,width:i,height:a}}__updateOverflow(){let e="";if(this.hasAttribute("has-header")||this.hasAttribute("has-footer")||this.headerTitle){const n=this.$.content;n.scrollTop>0&&(e+=" top"),n.scrollTop<n.scrollHeight-n.clientHeight&&(e+=" bottom")}const t=e.trim();t.length>0&&this.getAttribute("overflow")!==t?this.setAttribute("overflow",t):t.length===0&&this.hasAttribute("overflow")&&this.removeAttribute("overflow")}}customElements.define(Pn.is,Pn);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function at(r){return r.touches?r.touches[0]:r}function wi(r){return r.clientX>=0&&r.clientX<=window.innerWidth&&r.clientY>=0&&r.clientY<=window.innerHeight}/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Oa=r=>class extends r{static get properties(){return{draggable:{type:Boolean,value:!1,reflectToAttribute:!0},_touchDevice:{type:Boolean,value:ai},__dragHandleClassName:{type:String}}}ready(){super.ready(),this._originalBounds={},this._originalMouseCoords={},this._startDrag=this._startDrag.bind(this),this._drag=this._drag.bind(this),this._stopDrag=this._stopDrag.bind(this),this.$.overlay.$.overlay.addEventListener("mousedown",this._startDrag),this.$.overlay.$.overlay.addEventListener("touchstart",this._startDrag)}_startDrag(t){if(!(t.type==="touchstart"&&t.touches.length>1)&&this.draggable&&(t.button===0||t.touches)){const n=this.$.overlay.$.resizerContainer,o=t.target===n,i=t.offsetX>n.clientWidth||t.offsetY>n.clientHeight,a=t.target===this.$.overlay.$.content,s=t.composedPath().some((l,u)=>{if(!l.classList)return!1;const f=l.classList.contains(this.__dragHandleClassName||"draggable"),c=l.classList.contains("draggable-leaf-only"),d=u===0;return c&&d||f&&(!c||d)});if(o&&!i||a||s){s||t.preventDefault(),this._originalBounds=this.$.overlay.getBounds();const l=at(t);this._originalMouseCoords={top:l.pageY,left:l.pageX},window.addEventListener("mouseup",this._stopDrag),window.addEventListener("touchend",this._stopDrag),window.addEventListener("mousemove",this._drag),window.addEventListener("touchmove",this._drag),this.$.overlay.$.overlay.style.position!=="absolute"&&this.$.overlay.setBounds(this._originalBounds)}}}_drag(t){const n=at(t);if(wi(n)){const o=this._originalBounds.top+(n.pageY-this._originalMouseCoords.top),i=this._originalBounds.left+(n.pageX-this._originalMouseCoords.left);this.$.overlay.setBounds({top:o,left:i})}}_stopDrag(){window.removeEventListener("mouseup",this._stopDrag),window.removeEventListener("touchend",this._stopDrag),window.removeEventListener("mousemove",this._drag),window.removeEventListener("touchmove",this._drag)}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */O("vaadin-dialog-overlay",x`
    [part='overlay'] {
      position: relative;
      overflow: visible;
      max-height: 100%;
      display: flex;
    }

    [part='content'] {
      box-sizing: border-box;
      height: 100%;
    }

    .resizer-container {
      overflow: auto;
      flex-grow: 1;
      border-radius: inherit; /* prevent child elements being drawn outside part=overlay */
    }

    [part='overlay'][style] .resizer-container {
      min-height: 100%;
      width: 100%;
    }

    :host(:not([resizable])) .resizer {
      display: none;
    }

    :host([resizable]) [part='title'] {
      cursor: move;
      -webkit-user-select: none;
      user-select: none;
    }

    .resizer {
      position: absolute;
      height: 16px;
      width: 16px;
    }

    .resizer.edge {
      height: 8px;
      width: 8px;
      top: -4px;
      right: -4px;
      bottom: -4px;
      left: -4px;
    }

    .resizer.edge.n {
      width: auto;
      bottom: auto;
      cursor: ns-resize;
    }

    .resizer.ne {
      top: -4px;
      right: -4px;
      cursor: nesw-resize;
    }

    .resizer.edge.e {
      height: auto;
      left: auto;
      cursor: ew-resize;
    }

    .resizer.se {
      bottom: -4px;
      right: -4px;
      cursor: nwse-resize;
    }

    .resizer.edge.s {
      width: auto;
      top: auto;
      cursor: ns-resize;
    }

    .resizer.sw {
      bottom: -4px;
      left: -4px;
      cursor: nesw-resize;
    }

    .resizer.edge.w {
      height: auto;
      right: auto;
      cursor: ew-resize;
    }

    .resizer.nw {
      top: -4px;
      left: -4px;
      cursor: nwse-resize;
    }
  `,{moduleId:"vaadin-dialog-resizable-overlay-styles"});const xa=r=>class extends r{static get properties(){return{resizable:{type:Boolean,value:!1,reflectToAttribute:!0}}}ready(){super.ready(),this._originalBounds={},this._originalMouseCoords={},this._resizeListeners={start:{},resize:{},stop:{}},this._addResizeListeners()}_addResizeListeners(){["n","e","s","w","nw","ne","se","sw"].forEach(t=>{const n=document.createElement("div");this._resizeListeners.start[t]=o=>this._startResize(o,t),this._resizeListeners.resize[t]=o=>this._resize(o,t),this._resizeListeners.stop[t]=()=>this._stopResize(t),t.length===1&&n.classList.add("edge"),n.classList.add("resizer"),n.classList.add(t),n.addEventListener("mousedown",this._resizeListeners.start[t]),n.addEventListener("touchstart",this._resizeListeners.start[t]),this.$.overlay.$.resizerContainer.appendChild(n)})}_startResize(t,n){if(!(t.type==="touchstart"&&t.touches.length>1)&&(t.button===0||t.touches)){t.preventDefault(),this._originalBounds=this.$.overlay.getBounds();const o=at(t);this._originalMouseCoords={top:o.pageY,left:o.pageX},window.addEventListener("mousemove",this._resizeListeners.resize[n]),window.addEventListener("touchmove",this._resizeListeners.resize[n]),window.addEventListener("mouseup",this._resizeListeners.stop[n]),window.addEventListener("touchend",this._resizeListeners.stop[n]),this.$.overlay.$.overlay.style.position!=="absolute"&&this.$.overlay.setBounds(this._originalBounds)}}_resize(t,n){const o=at(t);wi(o)&&n.split("").forEach(a=>{switch(a){case"n":{const s=this._originalBounds.height-(o.pageY-this._originalMouseCoords.top),l=this._originalBounds.top+(o.pageY-this._originalMouseCoords.top);s>40&&this.$.overlay.setBounds({top:l,height:s});break}case"e":{const s=this._originalBounds.width+(o.pageX-this._originalMouseCoords.left);s>40&&this.$.overlay.setBounds({width:s});break}case"s":{const s=this._originalBounds.height+(o.pageY-this._originalMouseCoords.top);s>40&&this.$.overlay.setBounds({height:s});break}case"w":{const s=this._originalBounds.width-(o.pageX-this._originalMouseCoords.left),l=this._originalBounds.left+(o.pageX-this._originalMouseCoords.left);s>40&&this.$.overlay.setBounds({left:l,width:s});break}}})}_stopResize(t){window.removeEventListener("mousemove",this._resizeListeners.resize[t]),window.removeEventListener("touchmove",this._resizeListeners.resize[t]),window.removeEventListener("mouseup",this._resizeListeners.stop[t]),window.removeEventListener("touchend",this._resizeListeners.stop[t]),this.dispatchEvent(new CustomEvent("resize",{detail:this._getResizeDimensions()}))}_getResizeDimensions(){const t=this.$.overlay.$.resizerContainer.scrollTop,{width:n,height:o}=getComputedStyle(this.$.overlay.$.overlay),i=this.$.overlay.$.content;i.setAttribute("style","position: absolute; top: 0; right: 0; bottom: 0; left: 0; box-sizing: content-box; height: auto;");const{width:a,height:s}=getComputedStyle(i);return i.removeAttribute("style"),this.$.overlay.$.resizerContainer.scrollTop=t,{width:n,height:o,contentWidth:a,contentHeight:s}}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Dn extends ln(si(G(Oa(xa(S))))){static get template(){return T`
      <style>
        :host {
          display: none !important;
        }
      </style>

      <vaadin-dialog-overlay
        id="overlay"
        header-title="[[headerTitle]]"
        on-opened-changed="_onOverlayOpened"
        on-mousedown="_bringOverlayToFront"
        on-touchstart="_bringOverlayToFront"
        theme$="[[_theme]]"
        modeless="[[modeless]]"
        with-backdrop="[[!modeless]]"
        resizable$="[[resizable]]"
        restore-focus-on-close
        focus-trap
      ></vaadin-dialog-overlay>
    `}static get is(){return"vaadin-dialog"}static get properties(){return{opened:{type:Boolean,value:!1,notify:!0},noCloseOnOutsideClick:{type:Boolean,value:!1},noCloseOnEsc:{type:Boolean,value:!1},ariaLabel:{type:String,value:""},renderer:Function,headerTitle:String,headerRenderer:Function,footerRenderer:Function,modeless:{type:Boolean,value:!1}}}static get observers(){return["_openedChanged(opened)","_ariaLabelChanged(ariaLabel, headerTitle)","_rendererChanged(renderer, headerRenderer, footerRenderer)"]}ready(){super.ready();const e=this.$.overlay;e.setAttribute("role","dialog"),e.addEventListener("vaadin-overlay-outside-click",this._handleOutsideClick.bind(this)),e.addEventListener("vaadin-overlay-escape-press",this._handleEscPress.bind(this)),this._overlayElement=e,li(this)}requestContentUpdate(){this.$&&this.$.overlay.requestContentUpdate()}_rendererChanged(e,t,n){this.$.overlay.setProperties({owner:this,renderer:e,headerRenderer:t,footerRenderer:n})}connectedCallback(){super.connectedCallback(),this.__restoreOpened&&(this.opened=!0)}disconnectedCallback(){super.disconnectedCallback(),setTimeout(()=>{this.isConnected||(this.__restoreOpened=this.opened,this.opened=!1)})}_openedChanged(e){this.$.overlay.opened=e}_ariaLabelChanged(e,t){e||t?this.$.overlay.setAttribute("aria-label",e||t):this.$.overlay.removeAttribute("aria-label")}_onOverlayOpened(e){e.detail.value===!1&&(this.opened=!1)}_handleOutsideClick(e){this.noCloseOnOutsideClick&&e.preventDefault()}_handleEscPress(e){this.noCloseOnEsc&&e.preventDefault()}_bringOverlayToFront(){this.modeless&&this.$.overlay.bringToFront()}}customElements.define(Dn.is,Dn);O("vaadin-progress-bar",x`
    :host {
      height: calc(var(--lumo-size-l) / 10);
      margin: var(--lumo-space-s) 0;
    }

    [part='bar'] {
      border-radius: var(--lumo-border-radius-m);
      background-color: var(--lumo-contrast-10pct);
    }

    [part='value'] {
      border-radius: var(--lumo-border-radius-m);
      background-color: var(--lumo-primary-color);
      /* Use width instead of transform to preserve border radius */
      transform: none;
      width: calc(var(--vaadin-progress-value) * 100%);
      will-change: width;
      transition: 0.1s width linear;
    }

    /* Indeterminate mode */
    :host([indeterminate]) [part='value'] {
      --lumo-progress-indeterminate-progress-bar-background: linear-gradient(
        to right,
        var(--lumo-primary-color-10pct) 10%,
        var(--lumo-primary-color)
      );
      --lumo-progress-indeterminate-progress-bar-background-reverse: linear-gradient(
        to left,
        var(--lumo-primary-color-10pct) 10%,
        var(--lumo-primary-color)
      );
      width: 100%;
      background-color: transparent !important;
      background-image: var(--lumo-progress-indeterminate-progress-bar-background);
      opacity: 0.75;
      will-change: transform;
      animation: vaadin-progress-indeterminate 1.6s infinite cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    @keyframes vaadin-progress-indeterminate {
      0% {
        transform: scaleX(0.015);
        transform-origin: 0% 0%;
      }

      25% {
        transform: scaleX(0.4);
      }

      50% {
        transform: scaleX(0.015);
        transform-origin: 100% 0%;
        background-image: var(--lumo-progress-indeterminate-progress-bar-background);
      }

      50.1% {
        transform: scaleX(0.015);
        transform-origin: 100% 0%;
        background-image: var(--lumo-progress-indeterminate-progress-bar-background-reverse);
      }

      75% {
        transform: scaleX(0.4);
      }

      100% {
        transform: scaleX(0.015);
        transform-origin: 0% 0%;
        background-image: var(--lumo-progress-indeterminate-progress-bar-background-reverse);
      }
    }

    :host(:not([aria-valuenow])) [part='value']::before,
    :host([indeterminate]) [part='value']::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      background-color: var(--lumo-primary-color);
      will-change: opacity;
      animation: vaadin-progress-pulse3 1.6s infinite cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    @keyframes vaadin-progress-pulse3 {
      0% {
        opacity: 1;
      }

      10% {
        opacity: 0;
      }

      40% {
        opacity: 0;
      }

      50% {
        opacity: 1;
      }

      50.1% {
        opacity: 1;
      }

      60% {
        opacity: 0;
      }

      90% {
        opacity: 0;
      }

      100% {
        opacity: 1;
      }
    }

    /* Contrast color */
    :host([theme~='contrast']) [part='value'],
    :host([theme~='contrast']) [part='value']::before {
      background-color: var(--lumo-contrast-80pct);
      --lumo-progress-indeterminate-progress-bar-background: linear-gradient(
        to right,
        var(--lumo-contrast-5pct) 10%,
        var(--lumo-contrast-80pct)
      );
      --lumo-progress-indeterminate-progress-bar-background-reverse: linear-gradient(
        to left,
        var(--lumo-contrast-5pct) 10%,
        var(--lumo-contrast-60pct)
      );
    }

    /* Error color */
    :host([theme~='error']) [part='value'],
    :host([theme~='error']) [part='value']::before {
      background-color: var(--lumo-error-color);
      --lumo-progress-indeterminate-progress-bar-background: linear-gradient(
        to right,
        var(--lumo-error-color-10pct) 10%,
        var(--lumo-error-color)
      );
      --lumo-progress-indeterminate-progress-bar-background-reverse: linear-gradient(
        to left,
        var(--lumo-error-color-10pct) 10%,
        var(--lumo-error-color)
      );
    }

    /* Primary color */
    :host([theme~='success']) [part='value'],
    :host([theme~='success']) [part='value']::before {
      background-color: var(--lumo-success-color);
      --lumo-progress-indeterminate-progress-bar-background: linear-gradient(
        to right,
        var(--lumo-success-color-10pct) 10%,
        var(--lumo-success-color)
      );
      --lumo-progress-indeterminate-progress-bar-background-reverse: linear-gradient(
        to left,
        var(--lumo-success-color-10pct) 10%,
        var(--lumo-success-color)
      );
    }

    /* RTL specific styles */
    :host([indeterminate][dir='rtl']) [part='value'] {
      --lumo-progress-indeterminate-progress-bar-background: linear-gradient(
        to left,
        var(--lumo-primary-color-10pct) 10%,
        var(--lumo-primary-color)
      );
      --lumo-progress-indeterminate-progress-bar-background-reverse: linear-gradient(
        to right,
        var(--lumo-primary-color-10pct) 10%,
        var(--lumo-primary-color)
      );
      animation: vaadin-progress-indeterminate-rtl 1.6s infinite cubic-bezier(0.355, 0.045, 0.645, 1);
    }

    :host(:not([aria-valuenow])[dir='rtl']) [part='value']::before,
    :host([indeterminate][dir='rtl']) [part='value']::before {
      animation: vaadin-progress-pulse3 1.6s infinite cubic-bezier(0.355, 0.045, 0.645, 1);
    }

    @keyframes vaadin-progress-indeterminate-rtl {
      0% {
        transform: scaleX(0.015);
        transform-origin: 100% 0%;
      }

      25% {
        transform: scaleX(0.4);
      }

      50% {
        transform: scaleX(0.015);
        transform-origin: 0% 0%;
        background-image: var(--lumo-progress-indeterminate-progress-bar-background);
      }

      50.1% {
        transform: scaleX(0.015);
        transform-origin: 0% 0%;
        background-image: var(--lumo-progress-indeterminate-progress-bar-background-reverse);
      }

      75% {
        transform: scaleX(0.4);
      }

      100% {
        transform: scaleX(0.015);
        transform-origin: 100% 0%;
        background-image: var(--lumo-progress-indeterminate-progress-bar-background-reverse);
      }
    }

    /* Contrast color */
    :host([theme~='contrast'][dir='rtl']) [part='value'],
    :host([theme~='contrast'][dir='rtl']) [part='value']::before {
      --lumo-progress-indeterminate-progress-bar-background: linear-gradient(
        to left,
        var(--lumo-contrast-5pct) 10%,
        var(--lumo-contrast-80pct)
      );
      --lumo-progress-indeterminate-progress-bar-background-reverse: linear-gradient(
        to right,
        var(--lumo-contrast-5pct) 10%,
        var(--lumo-contrast-60pct)
      );
    }

    /* Error color */
    :host([theme~='error'][dir='rtl']) [part='value'],
    :host([theme~='error'][dir='rtl']) [part='value']::before {
      --lumo-progress-indeterminate-progress-bar-background: linear-gradient(
        to left,
        var(--lumo-error-color-10pct) 10%,
        var(--lumo-error-color)
      );
      --lumo-progress-indeterminate-progress-bar-background-reverse: linear-gradient(
        to right,
        var(--lumo-error-color-10pct) 10%,
        var(--lumo-error-color)
      );
    }

    /* Primary color */
    :host([theme~='success'][dir='rtl']) [part='value'],
    :host([theme~='success'][dir='rtl']) [part='value']::before {
      --lumo-progress-indeterminate-progress-bar-background: linear-gradient(
        to left,
        var(--lumo-success-color-10pct) 10%,
        var(--lumo-success-color)
      );
      --lumo-progress-indeterminate-progress-bar-background-reverse: linear-gradient(
        to right,
        var(--lumo-success-color-10pct) 10%,
        var(--lumo-success-color)
      );
    }
  `,{moduleId:"lumo-progress-bar"});const Ai=document.createElement("template");Ai.innerHTML=`
  <style>
    @keyframes vaadin-progress-pulse3 {
      0% { opacity: 1; }
      10% { opacity: 0; }
      40% { opacity: 0; }
      50% { opacity: 1; }
      50.1% { opacity: 1; }
      60% { opacity: 0; }
      90% { opacity: 0; }
      100% { opacity: 1; }
    }
  </style>
`;document.head.appendChild(Ai.content);/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Pa=x`
  :host {
    display: block;
    width: 100%; /* prevent collapsing inside non-stretching column flex */
    height: 8px;
  }

  :host([hidden]) {
    display: none !important;
  }

  [part='bar'] {
    height: 100%;
  }

  [part='value'] {
    height: 100%;
    transform-origin: 0 50%;
    transform: scaleX(var(--vaadin-progress-value));
  }

  :host([dir='rtl']) [part='value'] {
    transform-origin: 100% 50%;
  }

  @media (forced-colors: active) {
    [part='bar'] {
      outline: 1px solid;
    }

    [part='value'] {
      background-color: AccentColor !important;
      forced-color-adjust: none;
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Da=r=>class extends r{static get properties(){return{value:{type:Number,observer:"_valueChanged"},min:{type:Number,value:0,observer:"_minChanged"},max:{type:Number,value:1,observer:"_maxChanged"},indeterminate:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["_normalizedValueChanged(value, min, max)"]}ready(){super.ready(),this.setAttribute("role","progressbar")}_normalizedValueChanged(t,n,o){const i=this._normalizeValue(t,n,o);this.style.setProperty("--vaadin-progress-value",i)}_valueChanged(t){this.setAttribute("aria-valuenow",t)}_minChanged(t){this.setAttribute("aria-valuemin",t)}_maxChanged(t){this.setAttribute("aria-valuemax",t)}_normalizeValue(t,n,o){let i;return!t&&t!==0?i=0:n>=o?i=1:(i=(t-n)/(o-n),i=Math.min(Math.max(i,0),1)),i}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */O("vaadin-progress-bar",Pa,{moduleId:"vaadin-progress-bar-styles"});class Tn extends G(I(Da(S))){static get is(){return"vaadin-progress-bar"}static get template(){return T`
      <div part="bar">
        <div part="value"></div>
      </div>
    `}}customElements.define(Tn.is,Tn);O("vaadin-upload",x`
    :host {
      line-height: var(--lumo-line-height-m);
    }

    :host(:not([nodrop])) {
      overflow: hidden;
      border: 1px dashed var(--lumo-contrast-20pct);
      border-radius: var(--lumo-border-radius-l);
      padding: var(--lumo-space-m);
      transition: background-color 0.6s, border-color 0.6s;
    }

    [part='drop-label'] {
      display: inline-block;
      white-space: normal;
      padding: 0 var(--lumo-space-s);
      color: var(--lumo-secondary-text-color);
      font-family: var(--lumo-font-family);
    }

    :host([dragover-valid]) {
      border-color: var(--lumo-primary-color-50pct);
      background: var(--lumo-primary-color-10pct);
      transition: background-color 0.1s, border-color 0.1s;
    }

    :host([dragover-valid]) [part='drop-label'] {
      color: var(--lumo-primary-text-color);
    }

    :host([max-files-reached]) [part='drop-label'] {
      color: var(--lumo-disabled-text-color);
    }
  `,{moduleId:"lumo-upload"});O("vaadin-upload-icon",x`
    :host::before {
      content: var(--lumo-icons-upload);
      font-family: lumo-icons;
      font-size: var(--lumo-icon-size-m);
      line-height: 1;
      vertical-align: -0.25em;
    }
  `,{moduleId:"lumo-upload-icon"});O("vaadin-upload-file-list",x`
    ::slotted(li:not(:first-of-type)) {
      border-top: 1px solid var(--lumo-contrast-10pct);
    }
  `,{moduleId:"lumo-upload-file-list"});const Ta=x`
  :host {
    padding: var(--lumo-space-s) 0;
    outline: none;
  }

  :host([focus-ring]) [part='row'] {
    border-radius: var(--lumo-border-radius-s);
    box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);
  }

  [part='row'] {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  [part='status'],
  [part='error'] {
    color: var(--lumo-secondary-text-color);
    font-size: var(--lumo-font-size-s);
  }

  [part='info'] {
    display: flex;
    align-items: baseline;
    flex: auto;
  }

  [part='meta'] {
    width: 0.001px;
    flex: 1 1 auto;
  }

  [part='name'] {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  [part='commands'] {
    display: flex;
    align-items: baseline;
    flex: none;
  }

  [part$='icon'] {
    margin-right: var(--lumo-space-xs);
    font-size: var(--lumo-icon-size-m);
    font-family: 'lumo-icons';
    line-height: 1;
  }

  /* When both icons are hidden, let us keep space for one */
  [part='done-icon'][hidden] + [part='warning-icon'][hidden] {
    display: block !important;
    visibility: hidden;
  }

  [part$='button'] {
    flex: none;
    margin-left: var(--lumo-space-xs);
    cursor: var(--lumo-clickable-cursor);
  }

  [part$='button']:focus {
    outline: none;
    border-radius: var(--lumo-border-radius-s);
    box-shadow: 0 0 0 2px var(--lumo-primary-color-50pct);
  }

  [part$='icon']::before,
  [part$='button']::before {
    vertical-align: -0.25em;
  }

  [part='done-icon']::before {
    content: var(--lumo-icons-checkmark);
    color: var(--lumo-primary-text-color);
  }

  [part='warning-icon']::before {
    content: var(--lumo-icons-error);
    color: var(--lumo-error-text-color);
  }

  [part='start-button']::before {
    content: var(--lumo-icons-play);
  }

  [part='retry-button']::before {
    content: var(--lumo-icons-reload);
  }

  [part='remove-button']::before {
    content: var(--lumo-icons-cross);
  }

  [part='error'] {
    color: var(--lumo-error-text-color);
  }

  ::slotted([slot='progress']) {
    width: auto;
    margin-left: calc(var(--lumo-icon-size-m) + var(--lumo-space-xs));
    margin-right: calc(var(--lumo-icon-size-m) + var(--lumo-space-xs));
  }
`;O("vaadin-upload-file",[Vi,Ta],{moduleId:"lumo-upload-file"});/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const Ca=Qi(S);class Cn extends Ca{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!An,readOnly:!0},initialCount:{type:Number},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"},notifyDomChange:{type:Boolean},reuseChunkedInstances:{type:Boolean}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__renderStartTime=null,this.__itemsArrayChanged=!1,this.__shouldMeasureChunk=!1,this.__shouldContinueChunking=!1,this.__chunkingId=0,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null,this._templateInfo}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let e=0;e<this.__instances.length;e++)this.__detachInstance(e);this.__chunkingId&&cancelAnimationFrame(this.__chunkingId)}connectedCallback(){if(super.connectedCallback(),Xi()||(this.style.display="none"),this.__isDetached){this.__isDetached=!1;let e=fe(fe(this).parentNode);for(let t=0;t<this.__instances.length;t++)this.__attachInstance(t,e);this.__chunkingId&&this.__render()}}__ensureTemplatized(){if(!this.__ctor){const e=this;let t=this.template=e._templateInfo?e:this.querySelector("template");if(!t){let o=new MutationObserver(()=>{if(this.querySelector("template"))o.disconnect(),this.__render();else throw new Error("dom-repeat requires a <template> child")});return o.observe(this,{childList:!0}),!1}let n={};n[this.as]=!0,n[this.indexAs]=!0,n[this.itemsIndexAs]=!0,this.__ctor=Gi(t,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:n,forwardHostProp:function(o,i){let a=this.__instances;for(let s=0,l;s<a.length&&(l=a[s]);s++)l.forwardHostProp(o,i)},notifyInstanceProp:function(o,i,a){if(Ki(this.as,i)){let s=o[this.itemsIndexAs];i==this.as&&(this.items[s]=a);let l=Ji(this.as,`${JSCompiler_renameProperty("items",this)}.${s}`,i);this.notifyPath(l,a)}}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(e){if(typeof e=="string"){let t=e,n=this.__getMethodHost();return function(){return n[t].apply(n,arguments)}}return e}__sortChanged(e){this.__sortFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__filterChanged(e){this.__filterFn=this.__functionFromPropertyValue(e),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(e){return Math.ceil(1e3/e)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__handleObservedPaths(e){if(this.__sortFn||this.__filterFn){if(!e)this.__debounceRender(this.__render,this.delay);else if(this.__observePaths){let t=this.__observePaths;for(let n=0;n<t.length;n++)e.indexOf(t[n])===0&&this.__debounceRender(this.__render,this.delay)}}}__itemsChanged(e){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(e.path,e.value)||(e.path==="items"&&(this.__itemsArrayChanged=!0),this.__debounceRender(this.__render))}__debounceRender(e,t=0){this.__renderDebouncer=Zi.debounce(this.__renderDebouncer,t>0?ea.after(t):ta,e.bind(this)),ra(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),ui()}__render(){if(!this.__ensureTemplatized())return;let e=this.items||[];const t=this.__sortAndFilterItems(e),n=this.__calculateLimit(t.length);this.__updateInstances(e,n,t),this.initialCount&&(this.__shouldMeasureChunk||this.__shouldContinueChunking)&&(cancelAnimationFrame(this.__chunkingId),this.__chunkingId=requestAnimationFrame(()=>{this.__chunkingId=null,this.__continueChunking()})),this._setRenderedItemCount(this.__instances.length),(!An||this.notifyDomChange)&&this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}__sortAndFilterItems(e){let t=new Array(e.length);for(let n=0;n<e.length;n++)t[n]=n;return this.__filterFn&&(t=t.filter((n,o,i)=>this.__filterFn(e[n],o,i))),this.__sortFn&&t.sort((n,o)=>this.__sortFn(e[n],e[o])),t}__calculateLimit(e){let t=e;const n=this.__instances.length;if(this.initialCount){let o;!this.__chunkCount||this.__itemsArrayChanged&&!this.reuseChunkedInstances?(t=Math.min(e,this.initialCount),o=Math.max(t-n,0),this.__chunkCount=o||1):(o=Math.min(Math.max(e-n,0),this.__chunkCount),t=Math.min(n+o,e)),this.__shouldMeasureChunk=o===this.__chunkCount,this.__shouldContinueChunking=t<e,this.__renderStartTime=performance.now()}return this.__itemsArrayChanged=!1,t}__continueChunking(){if(this.__shouldMeasureChunk){const e=performance.now()-this.__renderStartTime,t=this._targetFrameTime/e;this.__chunkCount=Math.round(this.__chunkCount*t)||1}this.__shouldContinueChunking&&this.__debounceRender(this.__render)}__updateInstances(e,t,n){const o=this.__itemsIdxToInstIdx={};let i;for(i=0;i<t;i++){let a=this.__instances[i],s=n[i],l=e[s];o[s]=i,a?(a._setPendingProperty(this.as,l),a._setPendingProperty(this.indexAs,i),a._setPendingProperty(this.itemsIndexAs,s),a._flushProperties()):this.__insertInstance(l,i,s)}for(let a=this.__instances.length-1;a>=i;a--)this.__detachAndRemoveInstance(a)}__detachInstance(e){let t=this.__instances[e];const n=fe(t.root);for(let o=0;o<t.children.length;o++){let i=t.children[o];n.appendChild(i)}return t}__attachInstance(e,t){let n=this.__instances[e];t.insertBefore(n.root,this)}__detachAndRemoveInstance(e){this.__detachInstance(e),this.__instances.splice(e,1)}__stampInstance(e,t,n){let o={};return o[this.as]=e,o[this.indexAs]=t,o[this.itemsIndexAs]=n,new this.__ctor(o)}__insertInstance(e,t,n){const o=this.__stampInstance(e,t,n);let i=this.__instances[t+1],a=i?i.children[0]:this;return fe(fe(this).parentNode).insertBefore(o.root,a),this.__instances[t]=o,o}_showHideChildren(e){for(let t=0;t<this.__instances.length;t++)this.__instances[t]._showHideChildren(e)}__handleItemPath(e,t){let n=e.slice(6),o=n.indexOf("."),i=o<0?n:n.substring(0,o);if(i==parseInt(i,10)){let a=o<0?"":n.substring(o+1);this.__handleObservedPaths(a);let s=this.__itemsIdxToInstIdx[i],l=this.__instances[s];if(l){let u=this.as+(a?"."+a:"");l._setPendingPropertyOrPath(u,t,!1,!0),l._flushProperties()}return!0}}itemForElement(e){let t=this.modelForElement(e);return t&&t[this.as]}indexForElement(e){let t=this.modelForElement(e);return t&&t[this.indexAs]}modelForElement(e){return na(this.template,e)}}customElements.define(Cn.is,Cn);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Sn extends I(S){static get is(){return"vaadin-upload-icon"}static get template(){return T`
      <style>
        :host {
          display: inline-block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>
    `}}customElements.define(Sn.is,Sn);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Oi=document.createElement("template");Oi.innerHTML=`
  <style>
    @font-face {
      font-family: 'vaadin-upload-icons';
      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAasAAsAAAAABmAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABPUy8yAAABCAAAAGAAAABgDxIF5mNtYXAAAAFoAAAAVAAAAFQXVtKMZ2FzcAAAAbwAAAAIAAAACAAAABBnbHlmAAABxAAAAfQAAAH0bBJxYWhlYWQAAAO4AAAANgAAADYPD267aGhlYQAAA/AAAAAkAAAAJAfCA8tobXR4AAAEFAAAACgAAAAoHgAAx2xvY2EAAAQ8AAAAFgAAABYCSgHsbWF4cAAABFQAAAAgAAAAIAAOADVuYW1lAAAEdAAAAhYAAAIWmmcHf3Bvc3QAAAaMAAAAIAAAACAAAwAAAAMDtwGQAAUAAAKZAswAAACPApkCzAAAAesAMwEJAAAAAAAAAAAAAAAAAAAAARAAAAAAAAAAAAAAAAAAAAAAQAAA6QUDwP/AAEADwABAAAAAAQAAAAAAAAAAAAAAIAAAAAAAAwAAAAMAAAAcAAEAAwAAABwAAwABAAAAHAAEADgAAAAKAAgAAgACAAEAIOkF//3//wAAAAAAIOkA//3//wAB/+MXBAADAAEAAAAAAAAAAAAAAAEAAf//AA8AAQAAAAAAAAAAAAIAADc5AQAAAAABAAAAAAAAAAAAAgAANzkBAAAAAAEAAAAAAAAAAAACAAA3OQEAAAAAAgAA/8AEAAPAABkAMgAAEz4DMzIeAhczLgMjIg4CBycRIScFIRcOAyMiLgInIx4DMzI+AjcXphZGWmo6SH9kQwyADFiGrmJIhXJbIEYBAFoDWv76YBZGXGw8Rn5lRQyADFmIrWBIhHReIkYCWjJVPSIyVnVDXqN5RiVEYTxG/wBa2loyVT0iMlZ1Q16jeUYnRWE5RgAAAAABAIAAAAOAA4AAAgAAExEBgAMAA4D8gAHAAAAAAwAAAAAEAAOAAAIADgASAAAJASElIiY1NDYzMhYVFAYnETMRAgD+AAQA/gAdIyMdHSMjXYADgPyAgCMdHSMjHR0jwAEA/wAAAQANADMD5gNaAAUAACUBNwUBFwHT/jptATMBppMzAU2a4AIgdAAAAAEAOv/6A8YDhgALAAABJwkBBwkBFwkBNwEDxoz+xv7GjAFA/sCMAToBOoz+wAL6jP7AAUCM/sb+xowBQP7AjAE6AAAAAwAA/8AEAAPAAAcACwASAAABFSE1IREhEQEjNTMJAjMRIRECwP6A/sAEAP0AgIACQP7A/sDAAQABQICA/oABgP8AgAHAAUD+wP6AAYAAAAABAAAAAQAAdhiEdV8PPPUACwQAAAAAANX4FR8AAAAA1fgVHwAA/8AEAAPAAAAACAACAAAAAAAAAAEAAAPA/8AAAAQAAAAAAAQAAAEAAAAAAAAAAAAAAAAAAAAKBAAAAAAAAAAAAAAAAgAAAAQAAAAEAACABAAAAAQAAA0EAAA6BAAAAAAAAAAACgAUAB4AagB4AJwAsADSAPoAAAABAAAACgAzAAMAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAADgCuAAEAAAAAAAEAEwAAAAEAAAAAAAIABwDMAAEAAAAAAAMAEwBaAAEAAAAAAAQAEwDhAAEAAAAAAAUACwA5AAEAAAAAAAYAEwCTAAEAAAAAAAoAGgEaAAMAAQQJAAEAJgATAAMAAQQJAAIADgDTAAMAAQQJAAMAJgBtAAMAAQQJAAQAJgD0AAMAAQQJAAUAFgBEAAMAAQQJAAYAJgCmAAMAAQQJAAoANAE0dmFhZGluLXVwbG9hZC1pY29ucwB2AGEAYQBkAGkAbgAtAHUAcABsAG8AYQBkAC0AaQBjAG8AbgBzVmVyc2lvbiAxLjAAVgBlAHIAcwBpAG8AbgAgADEALgAwdmFhZGluLXVwbG9hZC1pY29ucwB2AGEAYQBkAGkAbgAtAHUAcABsAG8AYQBkAC0AaQBjAG8AbgBzdmFhZGluLXVwbG9hZC1pY29ucwB2AGEAYQBkAGkAbgAtAHUAcABsAG8AYQBkAC0AaQBjAG8AbgBzUmVndWxhcgBSAGUAZwB1AGwAYQBydmFhZGluLXVwbG9hZC1pY29ucwB2AGEAYQBkAGkAbgAtAHUAcABsAG8AYQBkAC0AaQBjAG8AbgBzRm9udCBnZW5lcmF0ZWQgYnkgSWNvTW9vbi4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAYgB5ACAASQBjAG8ATQBvAG8AbgAuAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==) format('woff');
      font-weight: normal;
      font-style: normal;
    }
  </style>
`;document.head.appendChild(Oi.content);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class $n extends ci(I(zt(S))){static get template(){return T`
      <style>
        :host {
          display: block;
        }

        [hidden] {
          display: none;
        }

        [part='row'] {
          list-style-type: none;
        }

        button {
          background: transparent;
          padding: 0;
          border: none;
          box-shadow: none;
        }

        :host([complete]) ::slotted([slot='progress']),
        :host([error]) ::slotted([slot='progress']) {
          display: none !important;
        }
      </style>

      <div part="row">
        <div part="info">
          <div part="done-icon" hidden$="[[!complete]]" aria-hidden="true"></div>
          <div part="warning-icon" hidden$="[[!errorMessage]]" aria-hidden="true"></div>

          <div part="meta">
            <div part="name" id="name">[[fileName]]</div>
            <div part="status" hidden$="[[!status]]" id="status">[[status]]</div>
            <div part="error" id="error" hidden$="[[!errorMessage]]">[[errorMessage]]</div>
          </div>
        </div>
        <div part="commands">
          <button
            type="button"
            part="start-button"
            file-event="file-start"
            on-click="_fireFileEvent"
            hidden$="[[!held]]"
            aria-label$="[[i18n.file.start]]"
            aria-describedby="name"
          ></button>
          <button
            type="button"
            part="retry-button"
            file-event="file-retry"
            on-click="_fireFileEvent"
            hidden$="[[!errorMessage]]"
            aria-label$="[[i18n.file.retry]]"
            aria-describedby="name"
          ></button>
          <button
            type="button"
            part="remove-button"
            file-event="file-abort"
            on-click="_fireFileEvent"
            aria-label$="[[i18n.file.remove]]"
            aria-describedby="name"
          ></button>
        </div>
      </div>

      <slot name="progress"></slot>
    `}static get is(){return"vaadin-upload-file"}static get properties(){return{complete:{type:Boolean,value:!1,reflectToAttribute:!0},errorMessage:{type:String,value:"",observer:"_errorMessageChanged"},file:{type:Object},fileName:{type:String},held:{type:Boolean,value:!1},indeterminate:{type:Boolean,value:!1,reflectToAttribute:!0},i18n:{type:Object},progress:{type:Number},status:{type:String},tabindex:{type:Number,value:0,reflectToAttribute:!0},uploading:{type:Boolean,value:!1,reflectToAttribute:!0},_progress:{type:Object}}}static get observers(){return["__updateProgress(_progress, progress, indeterminate)"]}ready(){super.ready(),this.addController(new U(this,"progress","vaadin-progress-bar",{initializer:e=>{this._progress=e}})),this.shadowRoot.addEventListener("focusin",e=>{e.composedPath()[0].getAttribute("part").endsWith("button")&&this._setFocused(!1)}),this.shadowRoot.addEventListener("focusout",e=>{e.relatedTarget===this&&this._setFocused(!0)})}_shouldSetFocus(e){return e.composedPath()[0]===this}_errorMessageChanged(e){this.toggleAttribute("error",!!e)}__updateProgress(e,t,n){e&&(e.value=isNaN(t)?0:t/100,e.indeterminate=n)}_fireFileEvent(e){return e.preventDefault(),this.dispatchEvent(new CustomEvent(e.target.getAttribute("file-event"),{detail:{file:this.file},bubbles:!0,composed:!0}))}}customElements.define($n.is,$n);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class kn extends I(S){static get is(){return"vaadin-upload-file-list"}static get template(){return T`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none !important;
        }

        [part='list'] {
          padding: 0;
          margin: 0;
          list-style-type: none;
        }
      </style>
      <ul part="list">
        <slot></slot>
      </ul>
    `}static get properties(){return{items:{type:Array},i18n:{type:Object}}}static get observers(){return["__updateItems(items, i18n)"]}__updateItems(e,t){e&&t&&this.requestContentUpdate()}requestContentUpdate(){const{items:e,i18n:t}=this;bi(On`
        ${e.map(n=>On`
            <li>
              <vaadin-upload-file
                .file="${n}"
                .complete="${n.complete}"
                .errorMessage="${n.error}"
                .fileName="${n.name}"
                .held="${n.held}"
                .indeterminate="${n.indeterminate}"
                .progress="${n.progress}"
                .status="${n.status}"
                .uploading="${n.uploading}"
                .i18n="${t}"
              ></vaadin-upload-file>
            </li>
          `)}
      `,this)}}customElements.define(kn.is,kn);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Sa extends U{constructor(e){super(e,"add-button","vaadin-button")}initNode(e){e._isDefault&&(this.defaultNode=e),e.addEventListener("touchend",t=>{this.host._onAddFilesTouchEnd(t)}),e.addEventListener("click",t=>{this.host._onAddFilesClick(t)}),this.host._addButton=e}}class $a extends U{constructor(e){super(e,"drop-label","span")}initNode(e){e._isDefault&&(this.defaultNode=e),this.host._dropLabel=e}}class En extends G(I(zt(S))){static get template(){return T`
      <style>
        :host {
          display: block;
          position: relative;
          box-sizing: border-box;
        }

        :host([hidden]) {
          display: none !important;
        }

        [hidden] {
          display: none !important;
        }
      </style>

      <div part="primary-buttons">
        <slot name="add-button"></slot>
        <div part="drop-label" hidden$="[[nodrop]]" id="dropLabelContainer" aria-hidden="true">
          <slot name="drop-label-icon"></slot>
          <slot name="drop-label"></slot>
        </div>
      </div>
      <slot name="file-list"></slot>
      <slot></slot>
      <input
        type="file"
        id="fileInput"
        hidden
        on-change="_onFileInputChange"
        accept$="{{accept}}"
        multiple$="[[_isMultiple(maxFiles)]]"
        capture$="[[capture]]"
      />
    `}static get is(){return"vaadin-upload"}static get properties(){return{nodrop:{type:Boolean,reflectToAttribute:!0,value:ai},target:{type:String,value:""},method:{type:String,value:"POST"},headers:{type:Object,value:{}},timeout:{type:Number,value:0},_dragover:{type:Boolean,value:!1,observer:"_dragoverChanged"},files:{type:Array,notify:!0,value:()=>[]},maxFiles:{type:Number,value:1/0},maxFilesReached:{type:Boolean,value:!1,notify:!0,readOnly:!0,reflectToAttribute:!0,computed:"_maxFilesAdded(maxFiles, files.length)"},accept:{type:String,value:""},maxFileSize:{type:Number,value:1/0},_dragoverValid:{type:Boolean,value:!1,observer:"_dragoverValidChanged"},formDataName:{type:String,value:"file"},noAuto:{type:Boolean,value:!1},withCredentials:{type:Boolean,value:!1},capture:String,i18n:{type:Object,value(){return{dropFiles:{one:"Drop file here",many:"Drop files here"},addFiles:{one:"Upload File...",many:"Upload Files..."},error:{tooManyFiles:"Too Many Files.",fileIsTooBig:"File is Too Big.",incorrectFileType:"Incorrect File Type."},uploading:{status:{connecting:"Connecting...",stalled:"Stalled",processing:"Processing File...",held:"Queued"},remainingTime:{prefix:"remaining time: ",unknown:"unknown remaining time"},error:{serverUnavailable:"Upload failed, please try again later",unexpectedServerError:"Upload failed due to server error",forbidden:"Upload forbidden"}},file:{retry:"Retry",start:"Start",remove:"Remove"},units:{size:["B","kB","MB","GB","TB","PB","EB","ZB","YB"]}}}},_addButton:{type:Object},_dropLabel:{type:Object},_fileList:{type:Object},_files:{type:Array}}}static get observers(){return["__updateAddButton(_addButton, maxFiles, i18n, maxFilesReached)","__updateDropLabel(_dropLabel, maxFiles, i18n)","__updateFileList(_fileList, files, i18n)"]}get __acceptRegexp(){if(!this.accept)return null;const e=this.accept.split(",").map(t=>{let n=t.trim();return n=n.replace(/[+.]/gu,"\\$&"),n.startsWith("\\.")&&(n=`.*${n}$`),n.replace(/\/\*/gu,"/.*")});return new RegExp(`^(${e.join("|")})$`,"iu")}ready(){super.ready(),this.addEventListener("dragover",this._onDragover.bind(this)),this.addEventListener("dragleave",this._onDragleave.bind(this)),this.addEventListener("drop",this._onDrop.bind(this)),this.addEventListener("file-retry",this._onFileRetry.bind(this)),this.addEventListener("file-abort",this._onFileAbort.bind(this)),this.addEventListener("file-start",this._onFileStart.bind(this)),this.addEventListener("file-reject",this._onFileReject.bind(this)),this.addEventListener("upload-start",this._onUploadStart.bind(this)),this.addEventListener("upload-success",this._onUploadSuccess.bind(this)),this.addEventListener("upload-error",this._onUploadError.bind(this)),this._addButtonController=new Sa(this),this.addController(this._addButtonController),this._dropLabelController=new $a(this),this.addController(this._dropLabelController),this.addController(new U(this,"file-list","vaadin-upload-file-list",{initializer:e=>{this._fileList=e}})),this.addController(new U(this,"drop-label-icon","vaadin-upload-icon"))}_formatSize(e){if(typeof this.i18n.formatSize=="function")return this.i18n.formatSize(e);const t=this.i18n.units.sizeBase||1e3,n=~~(Math.log(e)/Math.log(t)),o=Math.max(0,Math.min(3,n-1));return`${parseFloat((e/t**n).toFixed(o))} ${this.i18n.units.size[n]}`}_splitTimeByUnits(e){const t=[60,60,24,1/0],n=[0];for(let o=0;o<t.length&&e>0;o++)n[o]=e%t[o],e=Math.floor(e/t[o]);return n}_formatTime(e,t){if(typeof this.i18n.formatTime=="function")return this.i18n.formatTime(e,t);for(;t.length<3;)t.push(0);return t.reverse().map(n=>(n<10?"0":"")+n).join(":")}_formatFileProgress(e){const t=e.loaded>0?this.i18n.uploading.remainingTime.prefix+e.remainingStr:this.i18n.uploading.remainingTime.unknown;return`${e.totalStr}: ${e.progress}% (${t})`}_maxFilesAdded(e,t){return e>=0&&t>=e}__updateAddButton(e,t,n,o){e&&(e.disabled=o,e===this._addButtonController.defaultNode&&(e.textContent=this._i18nPlural(t,n.addFiles)))}__updateDropLabel(e,t,n){e&&e===this._dropLabelController.defaultNode&&(e.textContent=this._i18nPlural(t,n.dropFiles))}__updateFileList(e,t,n){e&&(e.items=[...t],e.i18n=n)}_onDragover(e){e.preventDefault(),!this.nodrop&&!this._dragover&&(this._dragoverValid=!this.maxFilesReached,this._dragover=!0),e.dataTransfer.dropEffect=!this._dragoverValid||this.nodrop?"none":"copy"}_onDragleave(e){e.preventDefault(),this._dragover&&!this.nodrop&&(this._dragover=this._dragoverValid=!1)}_onDrop(e){this.nodrop||(e.preventDefault(),this._dragover=this._dragoverValid=!1,this._addFiles(e.dataTransfer.files))}_createXhr(){return new XMLHttpRequest}_configureXhr(e){if(typeof this.headers=="string")try{this.headers=JSON.parse(this.headers)}catch{this.headers=void 0}Object.entries(this.headers).forEach(([t,n])=>{e.setRequestHeader(t,n)}),this.timeout&&(e.timeout=this.timeout),e.withCredentials=this.withCredentials}_setStatus(e,t,n,o){e.elapsed=o,e.elapsedStr=this._formatTime(e.elapsed,this._splitTimeByUnits(e.elapsed)),e.remaining=Math.ceil(o*(t/n-1)),e.remainingStr=this._formatTime(e.remaining,this._splitTimeByUnits(e.remaining)),e.speed=~~(t/o/1024),e.totalStr=this._formatSize(t),e.loadedStr=this._formatSize(n),e.status=this._formatFileProgress(e)}uploadFiles(e=this.files){e&&!Array.isArray(e)&&(e=[e]),e=e.filter(t=>!t.complete),Array.prototype.forEach.call(e,this._uploadFile.bind(this))}_uploadFile(e){if(e.uploading)return;const t=Date.now(),n=e.xhr=this._createXhr();let o,i;n.upload.onprogress=u=>{clearTimeout(o),i=Date.now();const f=(i-t)/1e3,c=u.loaded,d=u.total,h=~~(c/d*100);e.loaded=c,e.progress=h,e.indeterminate=c<=0||c>=d,e.error?e.indeterminate=e.status=void 0:e.abort||(h<100?(this._setStatus(e,d,c,f),o=setTimeout(()=>{e.status=this.i18n.uploading.status.stalled,this._renderFileList()},2e3)):(e.loadedStr=e.totalStr,e.status=this.i18n.uploading.status.processing)),this._renderFileList(),this.dispatchEvent(new CustomEvent("upload-progress",{detail:{file:e,xhr:n}}))},n.onreadystatechange=()=>{if(n.readyState===4){if(clearTimeout(o),e.indeterminate=e.uploading=!1,e.abort||(e.status="",!this.dispatchEvent(new CustomEvent("upload-response",{detail:{file:e,xhr:n},cancelable:!0}))))return;n.status===0?e.error=this.i18n.uploading.error.serverUnavailable:n.status>=500?e.error=this.i18n.uploading.error.unexpectedServerError:n.status>=400&&(e.error=this.i18n.uploading.error.forbidden),e.complete=!e.error,this.dispatchEvent(new CustomEvent(`upload-${e.error?"error":"success"}`,{detail:{file:e,xhr:n}})),this._renderFileList()}};const a=new FormData;if(e.uploadTarget=e.uploadTarget||this.target||"",e.formDataName=this.formDataName,!this.dispatchEvent(new CustomEvent("upload-before",{detail:{file:e,xhr:n},cancelable:!0})))return;a.append(e.formDataName,e,e.name),n.open(this.method,e.uploadTarget,!0),this._configureXhr(n),e.status=this.i18n.uploading.status.connecting,e.uploading=e.indeterminate=!0,e.complete=e.abort=e.error=e.held=!1,n.upload.onloadstart=()=>{this.dispatchEvent(new CustomEvent("upload-start",{detail:{file:e,xhr:n}})),this._renderFileList()},this.dispatchEvent(new CustomEvent("upload-request",{detail:{file:e,xhr:n,formData:a},cancelable:!0}))&&n.send(a)}_retryFileUpload(e){this.dispatchEvent(new CustomEvent("upload-retry",{detail:{file:e,xhr:e.xhr},cancelable:!0}))&&this._uploadFile(e)}_abortFileUpload(e){this.dispatchEvent(new CustomEvent("upload-abort",{detail:{file:e,xhr:e.xhr},cancelable:!0}))&&(e.abort=!0,e.xhr&&e.xhr.abort(),this._removeFile(e))}_renderFileList(){this._fileList&&this._fileList.requestContentUpdate()}_addFiles(e){Array.prototype.forEach.call(e,this._addFile.bind(this))}_addFile(e){if(this.maxFilesReached){this.dispatchEvent(new CustomEvent("file-reject",{detail:{file:e,error:this.i18n.error.tooManyFiles}}));return}if(this.maxFileSize>=0&&e.size>this.maxFileSize){this.dispatchEvent(new CustomEvent("file-reject",{detail:{file:e,error:this.i18n.error.fileIsTooBig}}));return}const t=this.__acceptRegexp;if(t&&!(t.test(e.type)||t.test(e.name))){this.dispatchEvent(new CustomEvent("file-reject",{detail:{file:e,error:this.i18n.error.incorrectFileType}}));return}e.loaded=0,e.held=!0,e.status=this.i18n.uploading.status.held,this.files=[e,...this.files],this.noAuto||this._uploadFile(e)}_removeFile(e){this.files.indexOf(e)>-1&&(this.files=this.files.filter(t=>t!==e),this.dispatchEvent(new CustomEvent("file-remove",{detail:{file:e},bubbles:!0,composed:!0})))}_onAddFilesTouchEnd(e){e.preventDefault(),this._onAddFilesClick(e)}_onAddFilesClick(e){this.maxFilesReached||(e.stopPropagation(),this.$.fileInput.value="",this.$.fileInput.click())}_onFileInputChange(e){this._addFiles(e.target.files)}_onFileStart(e){this._uploadFile(e.detail.file)}_onFileRetry(e){this._retryFileUpload(e.detail.file)}_onFileAbort(e){this._abortFileUpload(e.detail.file)}_onFileReject(e){ge(`${e.detail.file.name}: ${e.detail.file.error}`,{mode:"alert"})}_onUploadStart(e){ge(`${e.detail.file.name}: 0%`,{mode:"alert"})}_onUploadSuccess(e){ge(`${e.detail.file.name}: 100%`,{mode:"alert"})}_onUploadError(e){ge(`${e.detail.file.name}: ${e.detail.file.error}`,{mode:"alert"})}_dragoverChanged(e){e?this.setAttribute("dragover",e):this.removeAttribute("dragover")}_dragoverValidChanged(e){e?this.setAttribute("dragover-valid",e):this.removeAttribute("dragover-valid")}_i18nPlural(e,t){return e===1?t.one:t.many}_isMultiple(e){return e!==1}}customElements.define(En.is,En);O("vaadin-form-item",x`
    :host {
      --vaadin-form-item-row-spacing: 0;
    }

    /* font-weight, margin-bottom, transition and line-height same as for part label in text-field */
    [part='label'] {
      color: var(--lumo-secondary-text-color);
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-s);
      font-weight: 500;
      margin-top: var(--lumo-space-m);
      margin-left: calc(var(--lumo-border-radius-m) / 4);
      margin-bottom: var(--lumo-space-xs);
      transition: color 0.4s;
      line-height: 1.333;
    }

    [part='required-indicator']::after {
      content: var(--lumo-required-field-indicator, '\\2022');
      transition: opacity 0.2s;
      opacity: 0;
      color: var(--lumo-required-field-indicator-color, var(--lumo-primary-text-color));
      position: relative;
      width: 1em;
      text-align: center;
    }

    :host([required]) [part='required-indicator']::after {
      opacity: 1;
    }

    :host([invalid]) [part='required-indicator']::after {
      color: var(--lumo-required-field-indicator-color, var(--lumo-error-text-color));
    }
  `,{moduleId:"lumo-form-item"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Rn extends I(S){static get template(){return T`
      <style>
        :host {
          display: inline-flex;
          flex-direction: row;
          align-items: baseline;
          margin: calc(0.5 * var(--vaadin-form-item-row-spacing, 1em)) 0;
        }

        :host([label-position='top']) {
          flex-direction: column;
          align-items: stretch;
        }

        :host([hidden]) {
          display: none !important;
        }

        #label {
          width: var(--vaadin-form-item-label-width, 8em);
          flex: 0 0 auto;
        }

        :host([label-position='top']) #label {
          width: auto;
        }

        #spacing {
          width: var(--vaadin-form-item-label-spacing, 1em);
          flex: 0 0 auto;
        }

        #content {
          flex: 1 1 auto;
        }

        #content ::slotted(.full-width) {
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
        }
      </style>
      <div id="label" part="label" on-click="__onLabelClick">
        <slot name="label" id="labelSlot" on-slotchange="__onLabelSlotChange"></slot>
        <span part="required-indicator" aria-hidden="true"></span>
      </div>
      <div id="spacing"></div>
      <div id="content">
        <slot id="contentSlot" on-slotchange="__onContentSlotChange"></slot>
      </div>
    `}static get is(){return"vaadin-form-item"}constructor(){super(),this.__updateInvalidState=this.__updateInvalidState.bind(this),this.__fieldNodeObserver=new MutationObserver(()=>this.__updateRequiredState(this.__fieldNode.required)),this.__labelNode=null,this.__fieldNode=null}_getFieldAriaTarget(e){return e.ariaTarget||e}__linkLabelToField(e){oa(this._getFieldAriaTarget(e),"aria-labelledby",this.__labelId)}__unlinkLabelFromField(e){ia(this._getFieldAriaTarget(e),"aria-labelledby",this.__labelId)}__onLabelClick(){const e=this.__fieldNode;e&&(e.focus(),e.click())}__getValidateFunction(e){return e.validate||e.checkValidity}__onLabelSlotChange(){this.__labelNode&&(this.__labelNode=null,this.__fieldNode&&this.__unlinkLabelFromField(this.__fieldNode));const e=this.$.labelSlot.assignedElements()[0];e&&(this.__labelNode=e,this.__labelNode.id?this.__labelId=this.__labelNode.id:(this.__labelId=`label-${this.localName}-${fi()}`,this.__labelNode.id=this.__labelId),this.__fieldNode&&this.__linkLabelToField(this.__fieldNode))}__onContentSlotChange(){this.__fieldNode&&(this.__unlinkLabelFromField(this.__fieldNode),this.__updateRequiredState(!1),this.__fieldNodeObserver.disconnect(),this.__fieldNode=null);const e=this.$.contentSlot.assignedElements();e.length>1&&console.warn(`WARNING: Since Vaadin 23, placing multiple fields directly to a <vaadin-form-item> is deprecated.
Please wrap fields with a <vaadin-custom-field> instead.`);const t=e.find(n=>!!this.__getValidateFunction(n));t&&(this.__fieldNode=t,this.__updateRequiredState(this.__fieldNode.required),this.__fieldNodeObserver.observe(this.__fieldNode,{attributes:!0,attributeFilter:["required"]}),this.__labelNode&&this.__linkLabelToField(this.__fieldNode))}__updateRequiredState(e){e?(this.setAttribute("required",""),this.__fieldNode.addEventListener("blur",this.__updateInvalidState),this.__fieldNode.addEventListener("change",this.__updateInvalidState)):(this.removeAttribute("invalid"),this.removeAttribute("required"),this.__fieldNode.removeEventListener("blur",this.__updateInvalidState),this.__fieldNode.removeEventListener("change",this.__updateInvalidState))}__updateInvalidState(){const e=this.__getValidateFunction(this.__fieldNode).call(this.__fieldNode);this.toggleAttribute("invalid",e===!1)}}customElements.define(Rn.is,Rn);const ka=x`
  [part='overlay'] {
    /*
  Width:
      date cell widths
    + month calendar side padding
    + year scroller width
  */
    /* prettier-ignore */
    width:
    calc(
        var(--lumo-size-m) * 7
      + var(--lumo-space-xs) * 2
      + 57px
    );
    height: 100%;
    max-height: calc(var(--lumo-size-m) * 14);
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
  }

  [part='overlay'] {
    flex-direction: column;
  }

  [part='content'] {
    padding: 0;
    height: 100%;
    overflow: hidden;
    -webkit-mask-image: none;
    mask-image: none;
  }

  :host([top-aligned]) [part~='overlay'] {
    margin-top: var(--lumo-space-xs);
  }

  :host([bottom-aligned]) [part~='overlay'] {
    margin-bottom: var(--lumo-space-xs);
  }

  @media (max-width: 420px), (max-height: 420px) {
    [part='overlay'] {
      width: 100vw;
      height: 70vh;
      max-height: 70vh;
    }
  }
`;O("vaadin-date-picker-overlay",[aa,ka],{moduleId:"lumo-date-picker-overlay"});O("vaadin-date-picker-year",x`
    :host([current]) [part='year-number'] {
      color: var(--lumo-primary-text-color);
    }

    :host(:not([current])) [part='year-number'],
    [part='year-separator'] {
      opacity: var(--_lumo-date-picker-year-opacity, 0.7);
      transition: 0.2s opacity;
    }

    [part='year-number'],
    [part='year-separator'] {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50%;
      transform: translateY(-50%);
    }

    [part='year-separator']::after {
      color: var(--lumo-disabled-text-color);
      content: '\\2022';
    }
  `,{moduleId:"lumo-date-picker-year"});O("vaadin-date-picker-overlay-content",x`
    :host {
      position: relative;
      /* Background for the year scroller, placed here as we are using a mask image on the actual years part */
      background-image: linear-gradient(var(--lumo-shade-5pct), var(--lumo-shade-5pct));
      background-size: 57px 100%;
      background-position: top right;
      background-repeat: no-repeat;
      cursor: default;
    }

    ::slotted([slot='months']) {
      /* Month calendar height:
              header height + margin-bottom
            + weekdays height + margin-bottom
            + date cell heights
            + small margin between month calendars
        */
      /* prettier-ignore */
      --vaadin-infinite-scroller-item-height:
          calc(
              var(--lumo-font-size-l) + var(--lumo-space-m)
            + var(--lumo-font-size-xs) + var(--lumo-space-s)
            + var(--lumo-size-m) * 6
            + var(--lumo-space-s)
          );
      --vaadin-infinite-scroller-buffer-offset: 10%;
      -webkit-mask-image: linear-gradient(transparent, #000 10%, #000 85%, transparent);
      mask-image: linear-gradient(transparent, #000 10%, #000 85%, transparent);
      position: relative;
      margin-right: 57px;
    }

    ::slotted([slot='years']) {
      /* TODO get rid of fixed magic number */
      --vaadin-infinite-scroller-buffer-width: 97px;
      width: 57px;
      height: auto;
      top: 0;
      bottom: 0;
      font-size: var(--lumo-font-size-s);
      box-shadow: inset 2px 0 4px 0 var(--lumo-shade-5pct);
      -webkit-mask-image: linear-gradient(transparent, #000 35%, #000 65%, transparent);
      mask-image: linear-gradient(transparent, #000 35%, #000 65%, transparent);
      cursor: var(--lumo-clickable-cursor);
    }

    ::slotted([slot='years']:hover) {
      --_lumo-date-picker-year-opacity: 1;
    }

    /* TODO unsupported selector */
    #scrollers {
      position: static;
      display: block;
    }

    /* TODO fix this in vaadin-date-picker that it adapts to the width of the year scroller */
    :host([desktop]) ::slotted([slot='months']) {
      right: auto;
    }

    /* Year scroller position indicator */
    ::slotted([slot='years'])::before {
      border: none;
      width: 1em;
      height: 1em;
      background-color: var(--lumo-base-color);
      background-image: linear-gradient(var(--lumo-tint-5pct), var(--lumo-tint-5pct));
      transform: translate(-75%, -50%) rotate(45deg);
      border-top-right-radius: var(--lumo-border-radius-s);
      box-shadow: 2px -2px 6px 0 var(--lumo-shade-5pct);
      z-index: 1;
    }

    [part='toolbar'] {
      padding: var(--lumo-space-s);
      border-bottom-left-radius: var(--lumo-border-radius-l);
      margin-right: 57px;
    }

    [part='toolbar'] ::slotted(vaadin-button) {
      margin: 0;
    }

    /* Narrow viewport mode (fullscreen) */

    :host([fullscreen]) [part='toolbar'] {
      order: -1;
      background-color: var(--lumo-base-color);
    }

    :host([fullscreen]) [part='overlay-header'] {
      order: -2;
      height: var(--lumo-size-m);
      padding: var(--lumo-space-s);
      position: absolute;
      left: 0;
      right: 0;
      justify-content: center;
    }

    :host([fullscreen]) [part='toggle-button'],
    :host([fullscreen]) [part='clear-button'],
    [part='overlay-header'] [part='label'] {
      display: none;
    }

    /* Very narrow screen (year scroller initially hidden) */

    [part='years-toggle-button'] {
      display: flex;
      align-items: center;
      height: var(--lumo-size-s);
      padding: 0 0.5em;
      border-radius: var(--lumo-border-radius-m);
      z-index: 3;
      color: var(--lumo-primary-text-color);
      font-weight: 500;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    :host([years-visible]) [part='years-toggle-button'] {
      background-color: var(--lumo-primary-color);
      color: var(--lumo-primary-contrast-color);
    }

    /* TODO magic number (same as used for media-query in vaadin-date-picker-overlay-content) */
    @media screen and (max-width: 374px) {
      :host {
        background-image: none;
      }

      [part='toolbar'],
      ::slotted([slot='months']) {
        margin-right: 0;
      }

      /* TODO make date-picker adapt to the width of the years part */
      ::slotted([slot='years']) {
        --vaadin-infinite-scroller-buffer-width: 90px;
        width: 50px;
        background-color: var(--lumo-shade-5pct);
      }

      :host([years-visible]) ::slotted([slot='months']) {
        padding-left: 50px;
      }
    }
  `,{moduleId:"lumo-date-picker-overlay-content"});O("vaadin-month-calendar",x`
    :host {
      -moz-user-select: none;
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      font-size: var(--lumo-font-size-m);
      color: var(--lumo-body-text-color);
      text-align: center;
      padding: 0 var(--lumo-space-xs);
    }

    /* Month header */

    [part='month-header'] {
      color: var(--lumo-header-text-color);
      font-size: var(--lumo-font-size-l);
      line-height: 1;
      font-weight: 500;
      margin-bottom: var(--lumo-space-m);
    }

    /* Week days and numbers */

    [part='weekdays'],
    [part='weekday'],
    [part='week-number'] {
      font-size: var(--lumo-font-size-xxs);
      line-height: 1;
      color: var(--lumo-secondary-text-color);
    }

    [part='weekdays'] {
      margin-bottom: var(--lumo-space-s);
    }

    [part='weekday']:empty,
    [part='week-number'] {
      width: var(--lumo-size-xs);
    }

    /* Date and week number cells */

    [part~='date'],
    [part='week-number'] {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--lumo-size-m);
      position: relative;
    }

    [part~='date'] {
      transition: color 0.1s;
    }

    [part~='date']:not(:empty) {
      cursor: var(--lumo-clickable-cursor);
    }

    :host([week-numbers]) [part='weekday']:not(:empty),
    :host([week-numbers]) [part~='date'] {
      width: calc((100% - var(--lumo-size-xs)) / 7);
    }

    /* Today date */

    [part~='date'][part~='today'] {
      color: var(--lumo-primary-text-color);
    }

    /* Focused date */

    [part~='date']::before {
      content: '';
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 2em;
      min-height: 2em;
      width: 80%;
      height: 80%;
      max-height: 100%;
      max-width: 100%;
      border-radius: var(--lumo-border-radius-m);
    }

    [part~='date'][part~='focused']::before {
      box-shadow: 0 0 0 1px var(--lumo-base-color), 0 0 0 3px var(--lumo-primary-color-50pct);
    }

    :host(:not([focused])) [part~='date'][part~='focused']::before {
      animation: vaadin-date-picker-month-calendar-focus-date 1.4s infinite;
    }

    @keyframes vaadin-date-picker-month-calendar-focus-date {
      50% {
        box-shadow: 0 0 0 1px var(--lumo-base-color), 0 0 0 3px transparent;
      }
    }

    [part~='date']:not(:empty):not([part~='disabled']):not([part~='selected']):hover::before {
      background-color: var(--lumo-primary-color-10pct);
    }

    [part~='date'][part~='selected'] {
      color: var(--lumo-primary-contrast-color);
    }

    [part~='date'][part~='selected']::before {
      background-color: var(--lumo-primary-color);
    }

    [part~='date'][part~='disabled'] {
      color: var(--lumo-disabled-text-color);
    }

    @media (pointer: coarse) {
      [part~='date']:hover:not([part~='selected'])::before,
      [part~='focused']:not([part~='selected'])::before {
        display: none;
      }

      [part~='date']:not(:empty):not([part~='disabled']):active::before {
        display: block;
      }

      [part~='date'][part~='selected']::before {
        box-shadow: none;
      }
    }

    /* Disabled */

    :host([disabled]) * {
      color: var(--lumo-disabled-text-color) !important;
    }
  `,{moduleId:"lumo-month-calendar"});const xi=document.createElement("template");xi.innerHTML=`
  <style>
    @keyframes vaadin-date-picker-month-calendar-focus-date {
      50% {
        box-shadow: 0 0 0 2px transparent;
      }
    }
  </style>
`;document.head.appendChild(xi.content);const Ea=x`
  :host {
    outline: none;
  }

  [part='toggle-button']::before {
    content: var(--lumo-icons-calendar);
  }

  [part='clear-button']::before {
    content: var(--lumo-icons-cross);
  }

  @media (max-width: 420px), (max-height: 420px) {
    [part='overlay-content'] {
      height: 70vh;
    }
  }

  :host([dir='rtl']) [part='input-field'] ::slotted(input) {
    --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em);
  }

  :host([dir='rtl']) [part='input-field'] ::slotted(input:placeholder-shown) {
    --_lumo-text-field-overflow-mask-image: none;
  }
`;O("vaadin-date-picker",[di,Ea],{moduleId:"lumo-date-picker"});/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */O("vaadin-date-picker-overlay",x`
    [part='overlay'] {
      display: flex;
      flex: auto;
    }

    [part~='content'] {
      flex: auto;
    }

    @media (forced-colors: active) {
      [part='overlay'] {
        outline: 3px solid;
      }
    }
  `,{moduleId:"vaadin-date-picker-overlay-styles"});let be;class Mn extends sa(ii){static get is(){return"vaadin-date-picker-overlay"}static get template(){return be||(be=super.template.cloneNode(!0),be.content.querySelector('[part~="overlay"]').removeAttribute("tabindex")),be}}customElements.define(Mn.is,Mn);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function Ra(r){let e=r.getDay();e===0&&(e=7);const t=4-e,n=new Date(r.getTime()+t*24*3600*1e3),o=new Date(0,0);o.setFullYear(n.getFullYear());const i=n.getTime()-o.getTime(),a=Math.round(i/(24*3600*1e3));return Math.floor(a/7+1)}function q(r,e){return r instanceof Date&&e instanceof Date&&r.getFullYear()===e.getFullYear()&&r.getMonth()===e.getMonth()&&r.getDate()===e.getDate()}function me(r,e,t){return(!e||r>=e)&&(!t||r<=t)}function Pi(r,e){return e.filter(t=>t!==void 0).reduce((t,n)=>{if(!n)return t;if(!t)return n;const o=Math.abs(r.getTime()-n.getTime()),i=Math.abs(t.getTime()-r.getTime());return o<i?n:t})}function un(r){return{day:r.getDate(),month:r.getMonth(),year:r.getFullYear()}}function Di(r){const e=new Date,t=new Date(e);return t.setDate(1),t.setMonth(parseInt(r)+e.getMonth()),t}function Ma(r,e,t=0,n=1){if(e>99)throw new Error("The provided year cannot have more than 2 digits.");if(e<0)throw new Error("The provided year cannot be negative.");let o=e+Math.floor(r.getFullYear()/100)*100;return r<new Date(o-50,t,n)?o-=100:r>new Date(o+50,t,n)&&(o+=100),o}function ne(r){const e=/^([-+]\d{1}|\d{2,4}|[-+]\d{6})-(\d{1,2})-(\d{1,2})$/u.exec(r);if(!e)return;const t=new Date(0,0);return t.setFullYear(parseInt(e[1],10)),t.setMonth(parseInt(e[2],10)-1),t.setDate(parseInt(e[3],10)),t}/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class In extends ci(I(S)){static get template(){return T`
      <style>
        :host {
          display: block;
        }

        #monthGrid {
          width: 100%;
          border-collapse: collapse;
        }

        #days-container tr,
        #weekdays-container tr {
          display: flex;
        }

        [part~='date'] {
          outline: none;
        }

        [part~='disabled'] {
          pointer-events: none;
        }

        [part='week-number'][hidden],
        [part='weekday'][hidden] {
          display: none;
        }

        [part='weekday'],
        [part~='date'] {
          width: calc(100% / 7);
          padding: 0;
          font-weight: normal;
        }

        [part='weekday']:empty,
        [part='week-number'] {
          width: 12.5%;
          flex-shrink: 0;
          padding: 0;
        }

        :host([week-numbers]) [part='weekday']:not(:empty),
        :host([week-numbers]) [part~='date'] {
          width: 12.5%;
        }

        @media (forced-colors: active) {
          [part~='date'][part~='focused'] {
            outline: 1px solid;
          }
          [part~='date'][part~='selected'] {
            outline: 3px solid;
          }
        }
      </style>

      <div part="month-header" id="month-header" aria-hidden="true">[[_getTitle(month, i18n.monthNames)]]</div>
      <table
        id="monthGrid"
        role="grid"
        aria-labelledby="month-header"
        on-touchend="_preventDefault"
        on-touchstart="_onMonthGridTouchStart"
      >
        <thead id="weekdays-container">
          <tr role="row" part="weekdays">
            <th
              part="weekday"
              aria-hidden="true"
              hidden$="[[!_showWeekSeparator(showWeekNumbers, i18n.firstDayOfWeek)]]"
            ></th>
            <template
              is="dom-repeat"
              items="[[_getWeekDayNames(i18n.weekdays, i18n.weekdaysShort, showWeekNumbers, i18n.firstDayOfWeek)]]"
            >
              <th role="columnheader" part="weekday" scope="col" abbr$="[[item.weekDay]]" aria-hidden="true">
                [[item.weekDayShort]]
              </th>
            </template>
          </tr>
        </thead>
        <tbody id="days-container">
          <template is="dom-repeat" items="[[_weeks]]" as="week">
            <tr role="row">
              <td
                part="week-number"
                aria-hidden="true"
                hidden$="[[!_showWeekSeparator(showWeekNumbers, i18n.firstDayOfWeek)]]"
              >
                [[__getWeekNumber(week)]]
              </td>
              <template is="dom-repeat" items="[[week]]">
                <td
                  role="gridcell"
                  part$="[[__getDatePart(item, focusedDate, selectedDate, minDate, maxDate)]]"
                  date="[[item]]"
                  tabindex$="[[__getDayTabindex(item, focusedDate)]]"
                  disabled$="[[__isDayDisabled(item, minDate, maxDate)]]"
                  aria-selected$="[[__getDayAriaSelected(item, selectedDate)]]"
                  aria-disabled$="[[__getDayAriaDisabled(item, minDate, maxDate)]]"
                  aria-label$="[[__getDayAriaLabel(item)]]"
                  >[[_getDate(item)]]</td
                >
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    `}static get is(){return"vaadin-month-calendar"}static get properties(){return{month:{type:Date,value:new Date},selectedDate:{type:Date,notify:!0},focusedDate:Date,showWeekNumbers:{type:Boolean,value:!1},i18n:{type:Object},ignoreTaps:Boolean,_notTapping:Boolean,minDate:{type:Date,value:null},maxDate:{type:Date,value:null},_days:{type:Array,computed:"_getDays(month, i18n.firstDayOfWeek, minDate, maxDate)"},_weeks:{type:Array,computed:"_getWeeks(_days)"},disabled:{type:Boolean,reflectToAttribute:!0,computed:"_isDisabled(month, minDate, maxDate)"}}}static get observers(){return["_showWeekNumbersChanged(showWeekNumbers, i18n.firstDayOfWeek)","__focusedDateChanged(focusedDate, _days)"]}get focusableDateElement(){return[...this.shadowRoot.querySelectorAll("[part~=date]")].find(e=>q(e.date,this.focusedDate))}ready(){super.ready(),X(this.$.monthGrid,"tap",this._handleTap.bind(this))}_isDisabled(e,t,n){const o=new Date(0,0);o.setFullYear(e.getFullYear()),o.setMonth(e.getMonth()),o.setDate(1);const i=new Date(0,0);return i.setFullYear(e.getFullYear()),i.setMonth(e.getMonth()+1),i.setDate(0),t&&n&&t.getMonth()===n.getMonth()&&t.getMonth()===e.getMonth()&&n.getDate()-t.getDate()>=0?!1:!me(o,t,n)&&!me(i,t,n)}_getTitle(e,t){if(!(e===void 0||t===void 0))return this.i18n.formatTitle(t[e.getMonth()],e.getFullYear())}_onMonthGridTouchStart(){this._notTapping=!1,setTimeout(()=>{this._notTapping=!0},300)}_dateAdd(e,t){e.setDate(e.getDate()+t)}_applyFirstDayOfWeek(e,t){if(!(e===void 0||t===void 0))return e.slice(t).concat(e.slice(0,t))}_getWeekDayNames(e,t,n,o){if(!(e===void 0||t===void 0||n===void 0||o===void 0))return e=this._applyFirstDayOfWeek(e,o),t=this._applyFirstDayOfWeek(t,o),e=e.map((i,a)=>({weekDay:i,weekDayShort:t[a]})),e}__focusedDateChanged(e,t){t.some(n=>q(n,e))?this.removeAttribute("aria-hidden"):this.setAttribute("aria-hidden","true")}_getDate(e){return e?e.getDate():""}_showWeekNumbersChanged(e,t){e&&t===1?this.setAttribute("week-numbers",""):this.removeAttribute("week-numbers")}_showWeekSeparator(e,t){return e&&t===1}_isToday(e){return q(new Date,e)}_getDays(e,t){if(e===void 0||t===void 0)return;const n=new Date(0,0);for(n.setFullYear(e.getFullYear()),n.setMonth(e.getMonth()),n.setDate(1);n.getDay()!==t;)this._dateAdd(n,-1);const o=[],i=n.getMonth(),a=e.getMonth();for(;n.getMonth()===a||n.getMonth()===i;)o.push(n.getMonth()===a?new Date(n.getTime()):null),this._dateAdd(n,1);return o}_getWeeks(e){return e.reduce((t,n,o)=>(o%7===0&&t.push([]),t[t.length-1].push(n),t),[])}_handleTap(e){!this.ignoreTaps&&!this._notTapping&&e.target.date&&!e.target.hasAttribute("disabled")&&(this.selectedDate=e.target.date,this.dispatchEvent(new CustomEvent("date-tap",{detail:{date:e.target.date},bubbles:!0,composed:!0})))}_preventDefault(e){e.preventDefault()}__getDatePart(e,t,n,o,i){const a=["date"];return this.__isDayDisabled(e,o,i)&&a.push("disabled"),this.__isDayFocused(e,t)&&a.push("focused"),this.__isDaySelected(e,n)&&a.push("selected"),this._isToday(e)&&a.push("today"),a.join(" ")}__getWeekNumber(e){const t=e.reduce((n,o)=>!n&&o?o:n);return Ra(t)}__isDayFocused(e,t){return q(e,t)}__isDaySelected(e,t){return q(e,t)}__getDayAriaSelected(e,t){if(this.__isDaySelected(e,t))return"true"}__isDayDisabled(e,t,n){return!me(e,t,n)}__getDayAriaDisabled(e,t,n){if(!(e===void 0||t===void 0||n===void 0)&&this.__isDayDisabled(e,t,n))return"true"}__getDayAriaLabel(e){if(!e)return"";let t=`${this._getDate(e)} ${this.i18n.monthNames[e.getMonth()]} ${e.getFullYear()}, ${this.i18n.weekdays[e.getDay()]}`;return this._isToday(e)&&(t+=`, ${this.i18n.today}`),t}__getDayTabindex(e,t){return this.__isDayFocused(e,t)?"0":"-1"}}customElements.define(In.is,In);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ti extends S{static get template(){return T`
      <style>
        :host {
          display: block;
          overflow: hidden;
          height: 500px;
        }

        #scroller {
          position: relative;
          height: 100%;
          overflow: auto;
          outline: none;
          margin-right: -40px;
          -webkit-overflow-scrolling: touch;
          overflow-x: hidden;
        }

        #scroller.notouchscroll {
          -webkit-overflow-scrolling: auto;
        }

        #scroller::-webkit-scrollbar {
          display: none;
        }

        .buffer {
          position: absolute;
          width: var(--vaadin-infinite-scroller-buffer-width, 100%);
          box-sizing: border-box;
          padding-right: 40px;
          top: var(--vaadin-infinite-scroller-buffer-offset, 0);
          animation: fadein 0.2s;
        }

        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      </style>

      <div id="scroller" on-scroll="_scroll">
        <div class="buffer"></div>
        <div class="buffer"></div>
        <div id="fullHeight"></div>
      </div>
    `}static get properties(){return{bufferSize:{type:Number,value:20},_initialScroll:{value:5e5},_initialIndex:{value:0},_buffers:Array,_preventScrollEvent:Boolean,_mayHaveMomentum:Boolean,_initialized:Boolean,active:{type:Boolean,observer:"_activated"}}}get bufferOffset(){return this._buffers[0].offsetTop}get itemHeight(){if(!this._itemHeightVal){const e=getComputedStyle(this).getPropertyValue("--vaadin-infinite-scroller-item-height"),t="background-position";this.$.fullHeight.style.setProperty(t,e);const n=getComputedStyle(this.$.fullHeight).getPropertyValue(t);this.$.fullHeight.style.removeProperty(t),this._itemHeightVal=parseFloat(n)}return this._itemHeightVal}get _bufferHeight(){return this.itemHeight*this.bufferSize}get position(){return(this.$.scroller.scrollTop-this._buffers[0].translateY)/this.itemHeight+this._firstIndex}set position(e){this._preventScrollEvent=!0,e>this._firstIndex&&e<this._firstIndex+this.bufferSize*2?this.$.scroller.scrollTop=this.itemHeight*(e-this._firstIndex)+this._buffers[0].translateY:(this._initialIndex=~~e,this._reset(),this._scrollDisabled=!0,this.$.scroller.scrollTop+=e%1*this.itemHeight,this._scrollDisabled=!1),this._mayHaveMomentum&&(this.$.scroller.classList.add("notouchscroll"),this._mayHaveMomentum=!1,setTimeout(()=>{this.$.scroller.classList.remove("notouchscroll")},10))}ready(){super.ready(),this._buffers=[...this.shadowRoot.querySelectorAll(".buffer")],this.$.fullHeight.style.height=`${this._initialScroll*2}px`,la&&(this.$.scroller.tabIndex=-1)}forceUpdate(){this._debouncerUpdateClones&&(this._buffers[0].updated=this._buffers[1].updated=!1,this._updateClones(),this._debouncerUpdateClones.cancel())}_createElement(){}_updateElement(e,t){}_activated(e){e&&!this._initialized&&(this._createPool(),this._initialized=!0)}_finishInit(){this._initDone||(this._buffers.forEach(e=>{[...e.children].forEach(t=>{this._ensureStampedInstance(t._itemWrapper)})}),this._buffers[0].translateY||this._reset(),this._initDone=!0,this.dispatchEvent(new CustomEvent("init-done")))}_translateBuffer(e){const t=e?1:0;this._buffers[t].translateY=this._buffers[t?0:1].translateY+this._bufferHeight*(t?-1:1),this._buffers[t].style.transform=`translate3d(0, ${this._buffers[t].translateY}px, 0)`,this._buffers[t].updated=!1,this._buffers.reverse()}_scroll(){if(this._scrollDisabled)return;const e=this.$.scroller.scrollTop;(e<this._bufferHeight||e>this._initialScroll*2-this._bufferHeight)&&(this._initialIndex=~~this.position,this._reset());const t=this.itemHeight+this.bufferOffset,n=e>this._buffers[1].translateY+t,o=e<this._buffers[0].translateY+t;(n||o)&&(this._translateBuffer(o),this._updateClones()),this._preventScrollEvent||(this.dispatchEvent(new CustomEvent("custom-scroll",{bubbles:!1,composed:!0})),this._mayHaveMomentum=!0),this._preventScrollEvent=!1,this._debouncerScrollFinish=Qt.debounce(this._debouncerScrollFinish,Xt.after(200),()=>{const i=this.$.scroller.getBoundingClientRect();!this._isVisible(this._buffers[0],i)&&!this._isVisible(this._buffers[1],i)&&(this.position=this.position)})}_reset(){this._scrollDisabled=!0,this.$.scroller.scrollTop=this._initialScroll,this._buffers[0].translateY=this._initialScroll-this._bufferHeight,this._buffers[1].translateY=this._initialScroll,this._buffers.forEach(e=>{e.style.transform=`translate3d(0, ${e.translateY}px, 0)`}),this._buffers[0].updated=this._buffers[1].updated=!1,this._updateClones(!0),this._debouncerUpdateClones=Qt.debounce(this._debouncerUpdateClones,Xt.after(200),()=>{this._buffers[0].updated=this._buffers[1].updated=!1,this._updateClones()}),this._scrollDisabled=!1}_createPool(){const e=this.getBoundingClientRect();this._buffers.forEach(t=>{for(let n=0;n<this.bufferSize;n++){const o=document.createElement("div");o.style.height=`${this.itemHeight}px`,o.instance={};const i=`vaadin-infinite-scroller-item-content-${fi()}`,a=document.createElement("slot");a.setAttribute("name",i),a._itemWrapper=o,t.appendChild(a),o.setAttribute("slot",i),this.appendChild(o),this._isVisible(o,e)&&this._ensureStampedInstance(o)}}),hi(this,()=>{this._finishInit()})}_ensureStampedInstance(e){if(e.firstElementChild)return;const t=e.instance;e.instance=this._createElement(),e.appendChild(e.instance),Object.keys(t).forEach(n=>{e.instance.set(n,t[n])})}_updateClones(e){this._firstIndex=~~((this._buffers[0].translateY-this._initialScroll)/this.itemHeight)+this._initialIndex;const t=e?this.$.scroller.getBoundingClientRect():void 0;this._buffers.forEach((n,o)=>{if(!n.updated){const i=this._firstIndex+this.bufferSize*o;[...n.children].forEach((a,s)=>{const l=a._itemWrapper;(!e||this._isVisible(l,t))&&this._updateElement(l.instance,i+s)}),n.updated=!0}})}_isVisible(e,t){const n=e.getBoundingClientRect();return n.bottom>t.top&&n.top<t.bottom}}/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ia=T`
  <style>
    :host {
      --vaadin-infinite-scroller-item-height: 270px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
    }
  </style>
`;let we;class Fn extends Ti{static get is(){return"vaadin-date-picker-month-scroller"}static get template(){return we||(we=super.template.cloneNode(!0),we.content.appendChild(Ia.content.cloneNode(!0))),we}static get properties(){return{bufferSize:{type:Number,value:3}}}_createElement(){return document.createElement("vaadin-month-calendar")}_updateElement(e,t){e.month=Di(t)}}customElements.define(Fn.is,Fn);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Fa=T`
  <style>
    :host {
      --vaadin-infinite-scroller-item-height: 80px;
      width: 50px;
      display: block;
      height: 100%;
      position: absolute;
      right: 0;
      transform: translateX(100%);
      -webkit-tap-highlight-color: transparent;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      /* Center the year scroller position. */
      --vaadin-infinite-scroller-buffer-offset: 50%;
    }

    :host::before {
      content: '';
      display: block;
      background: transparent;
      width: 0;
      height: 0;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      border-width: 6px;
      border-style: solid;
      border-color: transparent;
      border-left-color: #000;
    }
  </style>
`;let Ae;class Bn extends Ti{static get is(){return"vaadin-date-picker-year-scroller"}static get template(){return Ae||(Ae=super.template.cloneNode(!0),Ae.content.appendChild(Fa.content.cloneNode(!0))),Ae}static get properties(){return{bufferSize:{type:Number,value:12}}}_createElement(){return document.createElement("vaadin-date-picker-year")}_updateElement(e,t){e.year=this._yearAfterXYears(t)}_yearAfterXYears(e){const t=new Date,n=new Date(t);return n.setFullYear(parseInt(e)+t.getFullYear()),n.getFullYear()}}customElements.define(Bn.is,Bn);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Nn extends I(S){static get is(){return"vaadin-date-picker-year"}static get template(){return T`
      <style>
        :host {
          display: block;
          height: 100%;
        }
      </style>
      <div part="year-number">[[year]]</div>
      <div part="year-separator" aria-hidden="true"></div>
    `}static get properties(){return{year:{type:String},selectedDate:{type:Object}}}static get observers(){return["__updateSelected(year, selectedDate)"]}__updateSelected(e,t){this.toggleAttribute("selected",t&&t.getFullYear()===e),this.toggleAttribute("current",e===new Date().getFullYear())}}customElements.define(Nn.is,Nn);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Yn extends zt(I(ca(S))){static get template(){return T`
      <style>
        :host {
          display: flex;
          flex-direction: column;
          height: 100%;
          width: 100%;
          outline: none;
        }

        [part='overlay-header'] {
          display: flex;
          flex-shrink: 0;
          flex-wrap: nowrap;
          align-items: center;
        }

        :host(:not([fullscreen])) [part='overlay-header'] {
          display: none;
        }

        [part='label'] {
          flex-grow: 1;
        }

        [hidden] {
          display: none !important;
        }

        [part='years-toggle-button'] {
          display: flex;
        }

        #scrollers {
          display: flex;
          height: 100%;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        :host([desktop]) ::slotted([slot='months']) {
          right: 50px;
          transform: none !important;
        }

        :host([desktop]) ::slotted([slot='years']) {
          transform: none !important;
        }

        :host(.animate) ::slotted([slot='months']),
        :host(.animate) ::slotted([slot='years']) {
          transition: all 200ms;
        }

        [part='toolbar'] {
          display: flex;
          justify-content: space-between;
          z-index: 2;
          flex-shrink: 0;
        }
      </style>

      <div part="overlay-header" on-touchend="_preventDefault" aria-hidden="true">
        <div part="label">[[_formatDisplayed(selectedDate, i18n.formatDate, label)]]</div>
        <div part="clear-button" hidden$="[[!selectedDate]]"></div>
        <div part="toggle-button"></div>

        <div part="years-toggle-button" hidden$="[[_desktopMode]]" aria-hidden="true">
          [[_yearAfterXMonths(_visibleMonthIndex)]]
        </div>
      </div>

      <div id="scrollers">
        <slot name="months"></slot>
        <slot name="years"></slot>
      </div>

      <div on-touchend="_preventDefault" role="toolbar" part="toolbar">
        <slot name="today-button"></slot>
        <slot name="cancel-button"></slot>
      </div>
    `}static get is(){return"vaadin-date-picker-overlay-content"}static get properties(){return{scrollDuration:{type:Number,value:300},selectedDate:{type:Date,value:null},focusedDate:{type:Date,notify:!0,observer:"_focusedDateChanged"},_focusedMonthDate:Number,initialPosition:{type:Date,observer:"_initialPositionChanged"},_originDate:{value:new Date},_visibleMonthIndex:Number,_desktopMode:{type:Boolean,observer:"_desktopModeChanged"},_desktopMediaQuery:{type:String,value:"(min-width: 375px)"},_translateX:{observer:"_translateXChanged"},_yearScrollerWidth:{value:50},i18n:{type:Object},showWeekNumbers:{type:Boolean,value:!1},_ignoreTaps:Boolean,_notTapping:Boolean,minDate:Date,maxDate:Date,label:String,_cancelButton:{type:Object},_todayButton:{type:Object},calendars:{type:Array,value:()=>[]},years:{type:Array,value:()=>[]}}}static get observers(){return["__updateCalendars(calendars, i18n, minDate, maxDate, selectedDate, focusedDate, showWeekNumbers, _ignoreTaps, _theme)","__updateCancelButton(_cancelButton, i18n)","__updateTodayButton(_todayButton, i18n, minDate, maxDate)","__updateYears(years, selectedDate, _theme)"]}get __useSubMonthScrolling(){return this._monthScroller.clientHeight<this._monthScroller.itemHeight+this._monthScroller.bufferOffset}get focusableDateElement(){return this.calendars.map(e=>e.focusableDateElement).find(Boolean)}ready(){super.ready(),this.setAttribute("role","dialog"),X(this.$.scrollers,"track",this._track.bind(this)),X(this.shadowRoot.querySelector('[part="clear-button"]'),"tap",this._clear.bind(this)),X(this.shadowRoot.querySelector('[part="toggle-button"]'),"tap",this._cancel.bind(this)),X(this.shadowRoot.querySelector('[part="years-toggle-button"]'),"tap",this._toggleYearScroller.bind(this)),this.addController(new gi(this._desktopMediaQuery,e=>{this._desktopMode=e})),this.addController(new U(this,"today-button","vaadin-button",{observe:!1,initializer:e=>{e.setAttribute("theme","tertiary"),e.addEventListener("keydown",t=>this.__onTodayButtonKeyDown(t)),X(e,"tap",this._onTodayTap.bind(this)),this._todayButton=e}})),this.addController(new U(this,"cancel-button","vaadin-button",{observe:!1,initializer:e=>{e.setAttribute("theme","tertiary"),e.addEventListener("keydown",t=>this.__onCancelButtonKeyDown(t)),X(e,"tap",this._cancel.bind(this)),this._cancelButton=e}})),this.__initMonthScroller(),this.__initYearScroller()}connectedCallback(){super.connectedCallback(),this._closeYearScroller(),this._toggleAnimateClass(!0),ua(this.$.scrollers,"pan-y")}focusCancel(){this._cancelButton.focus()}scrollToDate(e,t){const n=this.__useSubMonthScrolling?this._calculateWeekScrollOffset(e):0;this._scrollToPosition(this._differenceInMonths(e,this._originDate)+n,t),this._monthScroller.forceUpdate()}__initMonthScroller(){this.addController(new U(this,"months","vaadin-date-picker-month-scroller",{observe:!1,initializer:e=>{e.addEventListener("custom-scroll",()=>{this._onMonthScroll()}),e.addEventListener("touchstart",()=>{this._onMonthScrollTouchStart()}),e.addEventListener("keydown",t=>{this.__onMonthCalendarKeyDown(t)}),e.addEventListener("init-done",()=>{const t=[...this.querySelectorAll("vaadin-month-calendar")];t.forEach(n=>{n.addEventListener("selected-date-changed",o=>{this.selectedDate=o.detail.value})}),this.calendars=t}),this._monthScroller=e}}))}__initYearScroller(){this.addController(new U(this,"years","vaadin-date-picker-year-scroller",{observe:!1,initializer:e=>{e.setAttribute("aria-hidden","true"),X(e,"tap",t=>{this._onYearTap(t)}),e.addEventListener("custom-scroll",()=>{this._onYearScroll()}),e.addEventListener("touchstart",()=>{this._onYearScrollTouchStart()}),e.addEventListener("init-done",()=>{this.years=[...this.querySelectorAll("vaadin-date-picker-year")]}),this._yearScroller=e}}))}__updateCancelButton(e,t){e&&(e.textContent=t&&t.cancel)}__updateTodayButton(e,t,n,o){e&&(e.textContent=t&&t.today,e.disabled=!this._isTodayAllowed(n,o))}__updateCalendars(e,t,n,o,i,a,s,l,u){e&&e.length&&e.forEach(f=>{f.setProperties({i18n:t,minDate:n,maxDate:o,focusedDate:a,selectedDate:i,showWeekNumbers:s,ignoreTaps:l}),u?f.setAttribute("theme",u):f.removeAttribute("theme")})}__updateYears(e,t,n){e&&e.length&&e.forEach(o=>{o.selectedDate=t,n?o.setAttribute("theme",n):o.removeAttribute("theme")})}_selectDate(e){this.selectedDate=e,this.dispatchEvent(new CustomEvent("date-selected",{detail:{date:e},bubbles:!0,composed:!0}))}_desktopModeChanged(e){this.toggleAttribute("desktop",e)}_focusedDateChanged(e){this.revealDate(e)}revealDate(e,t=!0){if(!e)return;const n=this._differenceInMonths(e,this._originDate);if(this.__useSubMonthScrolling){const l=this._calculateWeekScrollOffset(e);this._scrollToPosition(n+l,t);return}const o=this._monthScroller.position>n,a=Math.max(this._monthScroller.itemHeight,this._monthScroller.clientHeight-this._monthScroller.bufferOffset*2)/this._monthScroller.itemHeight,s=this._monthScroller.position+a-1<n;o?this._scrollToPosition(n,t):s&&this._scrollToPosition(n-a+1,t)}_calculateWeekScrollOffset(e){const t=new Date(0,0);t.setFullYear(e.getFullYear()),t.setMonth(e.getMonth()),t.setDate(1);let n=0;for(;t.getDate()<e.getDate();)t.setDate(t.getDate()+1),t.getDay()===this.i18n.firstDayOfWeek&&(n+=1);return n/6}_initialPositionChanged(e){this._monthScroller&&this._yearScroller&&(this._monthScroller.active=!0,this._yearScroller.active=!0),this.scrollToDate(e)}_repositionYearScroller(){const e=this._monthScroller.position;this._visibleMonthIndex=Math.floor(e),this._yearScroller.position=(e+this._originDate.getMonth())/12}_repositionMonthScroller(){this._monthScroller.position=this._yearScroller.position*12-this._originDate.getMonth(),this._visibleMonthIndex=Math.floor(this._monthScroller.position)}_onMonthScroll(){this._repositionYearScroller(),this._doIgnoreTaps()}_onYearScroll(){this._repositionMonthScroller(),this._doIgnoreTaps()}_onYearScrollTouchStart(){this._notTapping=!1,setTimeout(()=>{this._notTapping=!0},300),this._repositionMonthScroller()}_onMonthScrollTouchStart(){this._repositionYearScroller()}_doIgnoreTaps(){this._ignoreTaps=!0,this._debouncer=Qt.debounce(this._debouncer,Xt.after(300),()=>{this._ignoreTaps=!1})}_formatDisplayed(e,t,n){return e?t(un(e)):n}_onTodayTap(){const e=new Date;Math.abs(this._monthScroller.position-this._differenceInMonths(e,this._originDate))<.001?(this._selectDate(e),this._close()):this._scrollToCurrentMonth()}_scrollToCurrentMonth(){this.focusedDate&&(this.focusedDate=new Date),this.scrollToDate(new Date,!0)}_onYearTap(e){if(!this._ignoreTaps&&!this._notTapping){const n=(e.detail.y-(this._yearScroller.getBoundingClientRect().top+this._yearScroller.clientHeight/2))/this._yearScroller.itemHeight;this._scrollToPosition(this._monthScroller.position+n*12,!0)}}_scrollToPosition(e,t){if(this._targetPosition!==void 0){this._targetPosition=e;return}if(!t){this._monthScroller.position=e,this._targetPosition=void 0,this._repositionYearScroller(),this.__tryFocusDate();return}this._targetPosition=e;let n;this._revealPromise=new Promise(l=>{n=l});const o=(l,u,f,c)=>(l/=c/2,l<1?f/2*l*l+u:(l-=1,-f/2*(l*(l-2)-1)+u));let i=0;const a=this._monthScroller.position,s=l=>{i||(i=l);const u=l-i;if(u<this.scrollDuration){const f=o(u,a,this._targetPosition-a,this.scrollDuration);this._monthScroller.position=f,window.requestAnimationFrame(s)}else this.dispatchEvent(new CustomEvent("scroll-animation-finished",{bubbles:!0,composed:!0,detail:{position:this._targetPosition,oldPosition:a}})),this._monthScroller.position=this._targetPosition,this._targetPosition=void 0,n(),this._revealPromise=void 0;setTimeout(this._repositionYearScroller.bind(this),1)};window.requestAnimationFrame(s)}_limit(e,t){return Math.min(t.max,Math.max(t.min,e))}_handleTrack(e){if(Math.abs(e.detail.dx)<10||Math.abs(e.detail.ddy)>10)return;Math.abs(e.detail.ddx)>this._yearScrollerWidth/3&&this._toggleAnimateClass(!0);const t=this._translateX+e.detail.ddx;this._translateX=this._limit(t,{min:0,max:this._yearScrollerWidth})}_track(e){if(!this._desktopMode)switch(e.detail.state){case"start":this._toggleAnimateClass(!1);break;case"track":this._handleTrack(e);break;case"end":this._toggleAnimateClass(!0),this._translateX>=this._yearScrollerWidth/2?this._closeYearScroller():this._openYearScroller();break}}_toggleAnimateClass(e){e?this.classList.add("animate"):this.classList.remove("animate")}_toggleYearScroller(){this._isYearScrollerVisible()?this._closeYearScroller():this._openYearScroller()}_openYearScroller(){this._translateX=0,this.setAttribute("years-visible","")}_closeYearScroller(){this.removeAttribute("years-visible"),this._translateX=this._yearScrollerWidth}_isYearScrollerVisible(){return this._translateX<this._yearScrollerWidth/2}_translateXChanged(e){this._desktopMode||(this._monthScroller.style.transform=`translateX(${e-this._yearScrollerWidth}px)`,this._yearScroller.style.transform=`translateX(${e}px)`)}_yearAfterXMonths(e){return Di(e).getFullYear()}_differenceInMonths(e,t){return(e.getFullYear()-t.getFullYear())*12-t.getMonth()+e.getMonth()}_clear(){this._selectDate("")}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_cancel(){this.focusedDate=this.selectedDate,this._close()}_preventDefault(e){e.preventDefault()}__toggleDate(e){q(e,this.selectedDate)?(this._clear(),this.focusedDate=e):this._selectDate(e)}__onMonthCalendarKeyDown(e){let t=!1;switch(e.key){case"ArrowDown":this._moveFocusByDays(7),t=!0;break;case"ArrowUp":this._moveFocusByDays(-7),t=!0;break;case"ArrowRight":this._moveFocusByDays(this.__isRTL?-1:1),t=!0;break;case"ArrowLeft":this._moveFocusByDays(this.__isRTL?1:-1),t=!0;break;case"Enter":this._selectDate(this.focusedDate),this._close(),t=!0;break;case" ":this.__toggleDate(this.focusedDate),t=!0;break;case"Home":this._moveFocusInsideMonth(this.focusedDate,"minDate"),t=!0;break;case"End":this._moveFocusInsideMonth(this.focusedDate,"maxDate"),t=!0;break;case"PageDown":this._moveFocusByMonths(e.shiftKey?12:1),t=!0;break;case"PageUp":this._moveFocusByMonths(e.shiftKey?-12:-1),t=!0;break;case"Tab":this._onTabKeyDown(e,"calendar");break}t&&(e.preventDefault(),e.stopPropagation())}_onTabKeyDown(e,t){switch(e.stopPropagation(),t){case"calendar":e.shiftKey&&(e.preventDefault(),this.hasAttribute("fullscreen")?this.focusCancel():this.__focusInput());break;case"today":e.shiftKey&&(e.preventDefault(),this.focusDateElement());break;case"cancel":e.shiftKey||(e.preventDefault(),this.hasAttribute("fullscreen")?this.focusDateElement():this.__focusInput());break}}__onTodayButtonKeyDown(e){e.key==="Tab"&&this._onTabKeyDown(e,"today")}__onCancelButtonKeyDown(e){e.key==="Tab"&&this._onTabKeyDown(e,"cancel")}__focusInput(){this.dispatchEvent(new CustomEvent("focus-input",{bubbles:!0,composed:!0}))}__tryFocusDate(){if(this.__pendingDateFocus){const t=this.focusableDateElement;t&&q(t.date,this.__pendingDateFocus)&&(delete this.__pendingDateFocus,t.focus())}}async focusDate(e,t){const n=e||this.selectedDate||this.initialPosition||new Date;this.focusedDate=n,t||(this._focusedMonthDate=n.getDate()),await this.focusDateElement(!1)}async focusDateElement(e=!0){this.__pendingDateFocus=this.focusedDate,this.calendars.length||await new Promise(t=>{hi(this,()=>{ui(),t()})}),e&&this.revealDate(this.focusedDate),this._revealPromise&&await this._revealPromise,this.__tryFocusDate()}_focusClosestDate(e){this.focusDate(Pi(e,[this.minDate,this.maxDate]))}_focusAllowedDate(e,t,n){this._dateAllowed(e)?this.focusDate(e,n):this._dateAllowed(this.focusedDate)?t>0?this.focusDate(this.maxDate):this.focusDate(this.minDate):this._focusClosestDate(this.focusedDate)}_getDateDiff(e,t){const n=new Date(0,0);return n.setFullYear(this.focusedDate.getFullYear()),n.setMonth(this.focusedDate.getMonth()+e),t&&n.setDate(this.focusedDate.getDate()+t),n}_moveFocusByDays(e){const t=this._getDateDiff(0,e);this._focusAllowedDate(t,e,!1)}_moveFocusByMonths(e){const t=this._getDateDiff(e),n=t.getMonth();this._focusedMonthDate||(this._focusedMonthDate=this.focusedDate.getDate()),t.setDate(this._focusedMonthDate),t.getMonth()!==n&&t.setDate(0),this._focusAllowedDate(t,e,!0)}_moveFocusInsideMonth(e,t){const n=new Date(0,0);n.setFullYear(e.getFullYear()),t==="minDate"?(n.setMonth(e.getMonth()),n.setDate(1)):(n.setMonth(e.getMonth()+1),n.setDate(0)),this._dateAllowed(n)?this.focusDate(n):this._dateAllowed(e)?this.focusDate(this[t]):this._focusClosestDate(e)}_dateAllowed(e,t=this.minDate,n=this.maxDate){return(!t||e>=t)&&(!n||e<=n)}_isTodayAllowed(e,t){const n=new Date,o=new Date(0,0);return o.setFullYear(n.getFullYear()),o.setMonth(n.getMonth()),o.setDate(n.getDate()),this._dateAllowed(o,e,t)}}customElements.define(Yn.is,Yn);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ba=r=>class extends ln(zt(fa(da(ha(r))))){static get properties(){return{_selectedDate:{type:Date},_focusedDate:Date,value:{type:String,notify:!0,value:""},initialPosition:String,opened:{type:Boolean,reflectToAttribute:!0,notify:!0,observer:"_openedChanged"},autoOpenDisabled:Boolean,showWeekNumbers:{type:Boolean,value:!1},_fullscreen:{type:Boolean,value:!1},_fullscreenMediaQuery:{value:"(max-width: 420px), (max-height: 420px)"},i18n:{type:Object,value:()=>({monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],firstDayOfWeek:0,today:"Today",cancel:"Cancel",referenceDate:"",formatDate(t){const n=String(t.year).replace(/\d+/u,o=>"0000".substr(o.length)+o);return[t.month+1,t.day,n].join("/")},parseDate(t){const n=t.split("/"),o=new Date;let i,a=o.getMonth(),s=o.getFullYear();if(n.length===3){if(a=parseInt(n[0])-1,i=parseInt(n[1]),s=parseInt(n[2]),n[2].length<3&&s>=0){const l=this.referenceDate?ne(this.referenceDate):new Date;s=Ma(l,s,a,i)}}else n.length===2?(a=parseInt(n[0])-1,i=parseInt(n[1])):n.length===1&&(i=parseInt(n[0]));if(i!==void 0)return{day:i,month:a,year:s}},formatTitle:(t,n)=>`${t} ${n}`})},min:{type:String},max:{type:String},_minDate:{type:Date,computed:"__computeMinOrMaxDate(min)"},_maxDate:{type:Date,computed:"__computeMinOrMaxDate(max)"},_noInput:{type:Boolean,computed:"_isNoInput(inputElement, _fullscreen, _ios, i18n, opened, autoOpenDisabled)"},_ios:{type:Boolean,value:pi},_focusOverlayOnOpen:Boolean,_overlayContent:Object,_hasInputValue:{type:Boolean}}}static get observers(){return["_selectedDateChanged(_selectedDate, i18n.formatDate)","_focusedDateChanged(_focusedDate, i18n.formatDate)","__updateOverlayContent(_overlayContent, i18n, label, _minDate, _maxDate, _focusedDate, _selectedDate, showWeekNumbers)","__updateOverlayContentTheme(_overlayContent, _theme)","__updateOverlayContentFullScreen(_overlayContent, _fullscreen)"]}static get constraints(){return[...super.constraints,"min","max"]}constructor(){super(),this._boundOnClick=this._onClick.bind(this),this._boundOnScroll=this._onScroll.bind(this),this._boundOverlayRenderer=this._overlayRenderer.bind(this)}get _inputElementValue(){return super._inputElementValue}set _inputElementValue(t){super._inputElementValue=t,this._hasInputValue=!1}get clearElement(){return null}get _nativeInput(){return this.inputElement?this.inputElement.focusElement||this.inputElement:null}_onFocus(t){super._onFocus(t),this._noInput&&t.target.blur()}_onBlur(t){super._onBlur(t),this.opened||(this.autoOpenDisabled&&this._selectParsedOrFocusedDate(),document.hasFocus()&&this.validate(),this._inputElementValue===""&&this.value!==""&&(this.value=""))}ready(){super.ready(),this.addEventListener("click",this._boundOnClick),this.addController(new gi(this._fullscreenMediaQuery,n=>{this._fullscreen=n})),this.addController(new pa(this));const t=this.$.overlay;this._overlayElement=t,t.renderer=this._boundOverlayRenderer,this.addEventListener("mousedown",()=>this.__bringToFront()),this.addEventListener("touchstart",()=>this.__bringToFront())}disconnectedCallback(){super.disconnectedCallback(),this.opened=!1}_propertiesChanged(t,n,o){super._propertiesChanged(t,n,o),"value"in n&&this.__dispatchChange&&(this.dispatchEvent(new CustomEvent("change",{bubbles:!0})),this.__dispatchChange=!1)}open(){!this.disabled&&!this.readonly&&(this.opened=!0)}close(){this.$.overlay.close()}_overlayRenderer(t){if(t.firstChild)return;const n=document.createElement("vaadin-date-picker-overlay-content");t.appendChild(n),this._overlayContent=n,n.addEventListener("close",()=>{this._close()}),n.addEventListener("focus-input",this._focusAndSelect.bind(this)),n.addEventListener("date-tap",o=>{this.__userConfirmedDate=!0,this._selectDate(o.detail.date),this._close()}),n.addEventListener("date-selected",o=>{this.__userConfirmedDate=!!o.detail.date,this._selectDate(o.detail.date)}),n.addEventListener("focusin",()=>{this._keyboardActive&&this._setFocused(!0)}),n.addEventListener("focused-date-changed",o=>{this._focusedDate=o.detail.value})}checkValidity(){const t=this._inputElementValue,n=!t||!!this._selectedDate&&t===this._getFormattedDate(this.i18n.formatDate,this._selectedDate),o=!this._selectedDate||me(this._selectedDate,this._minDate,this._maxDate);let i=!0;return this.inputElement&&(this.inputElement.checkValidity?i=this.inputElement.checkValidity():this.inputElement.validate&&(i=this.inputElement.validate())),n&&o&&i}_shouldSetFocus(t){return!this._shouldKeepFocusRing}_shouldRemoveFocus(t){return!this.opened}_setFocused(t){super._setFocused(t),this._shouldKeepFocusRing=t&&this._keyboardActive}_selectDate(t){const n=this._formatISO(t);this.value!==n&&(this.__dispatchChange=!0),this._selectedDate=t}_close(){this._focus(),this.close()}__bringToFront(){requestAnimationFrame(()=>{this.$.overlay.bringToFront()})}_isNoInput(t,n,o,i,a,s){return!t||n&&(!s||a)||o&&a||!i.parseDate}_formatISO(t){if(!(t instanceof Date))return"";const n=(f,c="00")=>(c+f).substr((c+f).length-c.length);let o="",i="0000",a=t.getFullYear();a<0?(a=-a,o="-",i="000000"):t.getFullYear()>=1e4&&(o="+",i="000000");const s=o+n(a,i),l=n(t.getMonth()+1),u=n(t.getDate());return[s,l,u].join("-")}_inputElementChanged(t){super._inputElementChanged(t),t&&(t.autocomplete="off",t.setAttribute("role","combobox"),t.setAttribute("aria-haspopup","dialog"),t.setAttribute("aria-expanded",!!this.opened),this._applyInputValue(this._selectedDate))}_openedChanged(t){this.inputElement&&this.inputElement.setAttribute("aria-expanded",t)}_selectedDateChanged(t,n){if(t===void 0||n===void 0)return;const o=this._formatISO(t);this.__keepInputValue||this._applyInputValue(t),o!==this.value&&(this.validate(),this.value=o),this._ignoreFocusedDateChange=!0,this._focusedDate=t,this._ignoreFocusedDateChange=!1}_focusedDateChanged(t,n){t===void 0||n===void 0||!this._ignoreFocusedDateChange&&!this._noInput&&this._applyInputValue(t)}_valueChanged(t,n){const o=ne(t);if(t&&!o){this.value=n;return}t?q(this._selectedDate,o)||(this._selectedDate=o,n!==void 0&&this.validate()):this._selectedDate=null,this._toggleHasValue(this._hasValue)}__updateOverlayContent(t,n,o,i,a,s,l,u){t&&t.setProperties({i18n:n,label:o,minDate:i,maxDate:a,focusedDate:s,selectedDate:l,showWeekNumbers:u})}__updateOverlayContentTheme(t,n){t&&(n?t.setAttribute("theme",n):t.removeAttribute("theme"))}__updateOverlayContentFullScreen(t,n){t&&t.toggleAttribute("fullscreen",n)}_onOverlayEscapePress(){this._focusedDate=this._selectedDate,this._close()}_onOverlayOpened(){const t=this._overlayContent,n=this._getInitialPosition();t.initialPosition=n;const o=t.focusedDate||n;t.scrollToDate(o),this._ignoreFocusedDateChange=!0,t.focusedDate=o,this._ignoreFocusedDateChange=!1,window.addEventListener("scroll",this._boundOnScroll,!0),this._focusOverlayOnOpen?(t.focusDateElement(),this._focusOverlayOnOpen=!1):this._focus();const i=this._nativeInput;this._noInput&&i&&(i.blur(),this._overlayContent.focusDateElement());const a=this._noInput?t:[i,t];this.__showOthers=ma(a)}_getInitialPosition(){const t=ne(this.initialPosition),n=this._selectedDate||this._overlayContent.initialPosition||t||new Date;return t||me(n,this._minDate,this._maxDate)?n:Pi(n,[this._minDate,this._maxDate])}_selectParsedOrFocusedDate(){if(this._ignoreFocusedDateChange=!0,this.i18n.parseDate){const t=this._inputElementValue||"",n=this._getParsedDate(t);this._isValidDate(n)?this._selectDate(n):(this.__keepInputValue=!0,this._selectDate(null),this._selectedDate=null,this.__keepInputValue=!1)}else this._focusedDate&&this._selectDate(this._focusedDate);this._ignoreFocusedDateChange=!1}_onOverlayClosed(){this.__showOthers&&(this.__showOthers(),this.__showOthers=null),window.removeEventListener("scroll",this._boundOnScroll,!0),this.__userConfirmedDate?this.__userConfirmedDate=!1:this._selectParsedOrFocusedDate(),this._nativeInput&&this._nativeInput.selectionStart&&(this._nativeInput.selectionStart=this._nativeInput.selectionEnd),this.value||this.validate()}_onScroll(t){(t.target===window||!this._overlayContent.contains(t.target))&&this._overlayContent._repositionYearScroller()}_focus(){this._noInput||this.inputElement.focus()}_focusAndSelect(){this._focus(),this._setSelectionRange(0,this._inputElementValue.length)}_applyInputValue(t){this._inputElementValue=t?this._getFormattedDate(this.i18n.formatDate,t):""}_getFormattedDate(t,n){return t(un(n))}_setSelectionRange(t,n){this._nativeInput&&this._nativeInput.setSelectionRange&&this._nativeInput.setSelectionRange(t,n)}_isValidDate(t){return t&&!isNaN(t.getTime())}_onChange(t){this._inputElementValue===""&&(this.__dispatchChange=!0),t.stopPropagation()}_onClick(t){this._isClearButton(t)||this._onHostClick(t)}_onHostClick(t){(!this.autoOpenDisabled||this._noInput)&&(t.preventDefault(),this.open())}_onClearButtonClick(t){t.preventDefault(),this._inputElementValue="",this.value="",this.validate(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}_onKeyDown(t){switch(super._onKeyDown(t),this._noInput&&[9].indexOf(t.keyCode)===-1&&t.preventDefault(),t.key){case"ArrowDown":case"ArrowUp":t.preventDefault(),this.opened?this._overlayContent.focusDateElement():(this._focusOverlayOnOpen=!0,this.open());break;case"Tab":this.opened&&(t.preventDefault(),t.stopPropagation(),this._setSelectionRange(0,0),t.shiftKey?this._overlayContent.focusCancel():this._overlayContent.focusDateElement());break}}_onEnter(t){const n=this.value;this.opened?this.close():this._selectParsedOrFocusedDate(),n===this.value&&this.validate()}_onEscape(t){if(!this.opened){if(this.clearButtonVisible&&this.value){t.stopPropagation(),this._onClearButtonClick(t);return}this.autoOpenDisabled?(this.inputElement.value===""&&this._selectDate(null),this._applyInputValue(this._selectedDate)):(this._focusedDate=this._selectedDate,this._selectParsedOrFocusedDate())}}_getParsedDate(t=this._inputElementValue){const n=this.i18n.parseDate&&this.i18n.parseDate(t);return n&&ne(`${n.year}-${n.month+1}-${n.day}`)}_isClearButton(t){return t.composedPath()[0]===this.clearElement}_onInput(){!this.opened&&this.inputElement.value&&!this.autoOpenDisabled&&this.open(),this._userInputValueChanged()}_userInputValueChanged(){if(this._inputElementValue){const t=this._getParsedDate();this._isValidDate(t)&&(this._ignoreFocusedDateChange=!0,q(t,this._focusedDate)||(this._focusedDate=t),this._ignoreFocusedDateChange=!1)}}__computeMinOrMaxDate(t){return ne(t)}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */O("vaadin-date-picker",mi,{moduleId:"vaadin-date-picker-styles"});class Ln extends Ba(ya(I(G(S)))){static get is(){return"vaadin-date-picker"}static get template(){return T`
      <style>
        :host([opened]) {
          pointer-events: auto;
        }

        :host([dir='rtl']) [part='input-field'] {
          direction: ltr;
        }

        :host([dir='rtl']) [part='input-field'] ::slotted(input)::placeholder {
          direction: rtl;
          text-align: left;
        }
      </style>

      <div class="vaadin-date-picker-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" on-click="focus"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          readonly="[[readonly]]"
          disabled="[[disabled]]"
          invalid="[[invalid]]"
          theme$="[[_theme]]"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="input"></slot>
          <div id="clearButton" part="clear-button" slot="suffix" aria-hidden="true"></div>
          <div part="toggle-button" slot="suffix" aria-hidden="true" on-click="_toggle"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <vaadin-date-picker-overlay
        id="overlay"
        fullscreen$="[[_fullscreen]]"
        theme$="[[_theme]]"
        opened="{{opened}}"
        on-vaadin-overlay-escape-press="_onOverlayEscapePress"
        on-vaadin-overlay-open="_onOverlayOpened"
        on-vaadin-overlay-closing="_onOverlayClosed"
        restore-focus-on-close
        restore-focus-node="[[inputElement]]"
      ></vaadin-date-picker-overlay>

      <slot name="tooltip"></slot>
    `}get clearElement(){return this.$.clearButton}ready(){super.ready(),this.addController(new _a(this,t=>{this._setInputElement(t),this._setFocusElement(t),this.stateTarget=t,this.ariaTarget=t})),this.addController(new yi(this.inputElement,this._labelController)),this._tooltipController=new _i(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setShouldShow(t=>!t.opened),this.shadowRoot.querySelector('[part="toggle-button"]').addEventListener("mousedown",t=>t.preventDefault()),this.$.overlay.addEventListener("vaadin-overlay-close",this._onVaadinOverlayClose.bind(this))}_onVaadinOverlayClose(e){e.detail.sourceEvent&&e.detail.sourceEvent.composedPath().includes(this)&&e.preventDefault()}_toggle(e){e.stopPropagation(),this.$.overlay.opened?this.close():this.open()}_openedChanged(e){super._openedChanged(e),this.$.overlay.positionTarget=this.shadowRoot.querySelector('[part="input-field"]'),this.$.overlay.noVerticalOverlap=!0}}customElements.define(Ln.is,Ln);function P(r,e){if(e.length<r)throw new TypeError(r+" argument"+(r>1?"s":"")+" required, but only "+e.length+" present")}function Oe(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Oe=function(t){return typeof t}:Oe=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Oe(r)}function Na(r){return P(1,arguments),r instanceof Date||Oe(r)==="object"&&Object.prototype.toString.call(r)==="[object Date]"}function xe(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?xe=function(t){return typeof t}:xe=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},xe(r)}function k(r){P(1,arguments);var e=Object.prototype.toString.call(r);return r instanceof Date||xe(r)==="object"&&e==="[object Date]"?new Date(r.getTime()):typeof r=="number"||e==="[object Number]"?new Date(r):((typeof r=="string"||e==="[object String]")&&typeof console<"u"&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn(new Error().stack)),new Date(NaN))}function Gt(r){if(P(1,arguments),!Na(r)&&typeof r!="number")return!1;var e=k(r);return!isNaN(Number(e))}function M(r){if(r===null||r===!0||r===!1)return NaN;var e=Number(r);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function Ya(r,e){P(2,arguments);var t=k(r).getTime(),n=M(e);return new Date(t+n)}function Ci(r,e){P(2,arguments);var t=M(e);return Ya(r,-t)}var La=864e5;function za(r){P(1,arguments);var e=k(r),t=e.getTime();e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0);var n=e.getTime(),o=t-n;return Math.floor(o/La)+1}function oe(r){P(1,arguments);var e=1,t=k(r),n=t.getUTCDay(),o=(n<e?7:0)+n-e;return t.setUTCDate(t.getUTCDate()-o),t.setUTCHours(0,0,0,0),t}function Si(r){P(1,arguments);var e=k(r),t=e.getUTCFullYear(),n=new Date(0);n.setUTCFullYear(t+1,0,4),n.setUTCHours(0,0,0,0);var o=oe(n),i=new Date(0);i.setUTCFullYear(t,0,4),i.setUTCHours(0,0,0,0);var a=oe(i);return e.getTime()>=o.getTime()?t+1:e.getTime()>=a.getTime()?t:t-1}function Ua(r){P(1,arguments);var e=Si(r),t=new Date(0);t.setUTCFullYear(e,0,4),t.setUTCHours(0,0,0,0);var n=oe(t);return n}var Wa=6048e5;function $i(r){P(1,arguments);var e=k(r),t=oe(e).getTime()-Ua(e).getTime();return Math.round(t/Wa)+1}var Ha={};function ie(){return Ha}function te(r,e){var t,n,o,i,a,s,l,u;P(1,arguments);var f=ie(),c=M((t=(n=(o=(i=e==null?void 0:e.weekStartsOn)!==null&&i!==void 0?i:e==null||(a=e.locale)===null||a===void 0||(s=a.options)===null||s===void 0?void 0:s.weekStartsOn)!==null&&o!==void 0?o:f.weekStartsOn)!==null&&n!==void 0?n:(l=f.locale)===null||l===void 0||(u=l.options)===null||u===void 0?void 0:u.weekStartsOn)!==null&&t!==void 0?t:0);if(!(c>=0&&c<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var d=k(r),h=d.getUTCDay(),_=(h<c?7:0)+h-c;return d.setUTCDate(d.getUTCDate()-_),d.setUTCHours(0,0,0,0),d}function cn(r,e){var t,n,o,i,a,s,l,u;P(1,arguments);var f=k(r),c=f.getUTCFullYear(),d=ie(),h=M((t=(n=(o=(i=e==null?void 0:e.firstWeekContainsDate)!==null&&i!==void 0?i:e==null||(a=e.locale)===null||a===void 0||(s=a.options)===null||s===void 0?void 0:s.firstWeekContainsDate)!==null&&o!==void 0?o:d.firstWeekContainsDate)!==null&&n!==void 0?n:(l=d.locale)===null||l===void 0||(u=l.options)===null||u===void 0?void 0:u.firstWeekContainsDate)!==null&&t!==void 0?t:1);if(!(h>=1&&h<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var _=new Date(0);_.setUTCFullYear(c+1,0,h),_.setUTCHours(0,0,0,0);var D=te(_,e),v=new Date(0);v.setUTCFullYear(c,0,h),v.setUTCHours(0,0,0,0);var E=te(v,e);return f.getTime()>=D.getTime()?c+1:f.getTime()>=E.getTime()?c:c-1}function qa(r,e){var t,n,o,i,a,s,l,u;P(1,arguments);var f=ie(),c=M((t=(n=(o=(i=e==null?void 0:e.firstWeekContainsDate)!==null&&i!==void 0?i:e==null||(a=e.locale)===null||a===void 0||(s=a.options)===null||s===void 0?void 0:s.firstWeekContainsDate)!==null&&o!==void 0?o:f.firstWeekContainsDate)!==null&&n!==void 0?n:(l=f.locale)===null||l===void 0||(u=l.options)===null||u===void 0?void 0:u.firstWeekContainsDate)!==null&&t!==void 0?t:1),d=cn(r,e),h=new Date(0);h.setUTCFullYear(d,0,c),h.setUTCHours(0,0,0,0);var _=te(h,e);return _}var ja=6048e5;function ki(r,e){P(1,arguments);var t=k(r),n=te(t,e).getTime()-qa(t,e).getTime();return Math.round(n/ja)+1}function m(r,e){for(var t=r<0?"-":"",n=Math.abs(r).toString();n.length<e;)n="0"+n;return t+n}var Va={y:function(e,t){var n=e.getUTCFullYear(),o=n>0?n:1-n;return m(t==="yy"?o%100:o,t.length)},M:function(e,t){var n=e.getUTCMonth();return t==="M"?String(n+1):m(n+1,2)},d:function(e,t){return m(e.getUTCDate(),t.length)},a:function(e,t){var n=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];case"aaaa":default:return n==="am"?"a.m.":"p.m."}},h:function(e,t){return m(e.getUTCHours()%12||12,t.length)},H:function(e,t){return m(e.getUTCHours(),t.length)},m:function(e,t){return m(e.getUTCMinutes(),t.length)},s:function(e,t){return m(e.getUTCSeconds(),t.length)},S:function(e,t){var n=t.length,o=e.getUTCMilliseconds(),i=Math.floor(o*Math.pow(10,n-3));return m(i,t.length)}};const Q=Va;var re={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},Qa={G:function(e,t,n){var o=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(o,{width:"abbreviated"});case"GGGGG":return n.era(o,{width:"narrow"});case"GGGG":default:return n.era(o,{width:"wide"})}},y:function(e,t,n){if(t==="yo"){var o=e.getUTCFullYear(),i=o>0?o:1-o;return n.ordinalNumber(i,{unit:"year"})}return Q.y(e,t)},Y:function(e,t,n,o){var i=cn(e,o),a=i>0?i:1-i;if(t==="YY"){var s=a%100;return m(s,2)}return t==="Yo"?n.ordinalNumber(a,{unit:"year"}):m(a,t.length)},R:function(e,t){var n=Si(e);return m(n,t.length)},u:function(e,t){var n=e.getUTCFullYear();return m(n,t.length)},Q:function(e,t,n){var o=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(o);case"QQ":return m(o,2);case"Qo":return n.ordinalNumber(o,{unit:"quarter"});case"QQQ":return n.quarter(o,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(o,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(o,{width:"wide",context:"formatting"})}},q:function(e,t,n){var o=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(o);case"qq":return m(o,2);case"qo":return n.ordinalNumber(o,{unit:"quarter"});case"qqq":return n.quarter(o,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(o,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(o,{width:"wide",context:"standalone"})}},M:function(e,t,n){var o=e.getUTCMonth();switch(t){case"M":case"MM":return Q.M(e,t);case"Mo":return n.ordinalNumber(o+1,{unit:"month"});case"MMM":return n.month(o,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(o,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(o,{width:"wide",context:"formatting"})}},L:function(e,t,n){var o=e.getUTCMonth();switch(t){case"L":return String(o+1);case"LL":return m(o+1,2);case"Lo":return n.ordinalNumber(o+1,{unit:"month"});case"LLL":return n.month(o,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(o,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(o,{width:"wide",context:"standalone"})}},w:function(e,t,n,o){var i=ki(e,o);return t==="wo"?n.ordinalNumber(i,{unit:"week"}):m(i,t.length)},I:function(e,t,n){var o=$i(e);return t==="Io"?n.ordinalNumber(o,{unit:"week"}):m(o,t.length)},d:function(e,t,n){return t==="do"?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):Q.d(e,t)},D:function(e,t,n){var o=za(e);return t==="Do"?n.ordinalNumber(o,{unit:"dayOfYear"}):m(o,t.length)},E:function(e,t,n){var o=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(o,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(o,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(o,{width:"short",context:"formatting"});case"EEEE":default:return n.day(o,{width:"wide",context:"formatting"})}},e:function(e,t,n,o){var i=e.getUTCDay(),a=(i-o.weekStartsOn+8)%7||7;switch(t){case"e":return String(a);case"ee":return m(a,2);case"eo":return n.ordinalNumber(a,{unit:"day"});case"eee":return n.day(i,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(i,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(i,{width:"short",context:"formatting"});case"eeee":default:return n.day(i,{width:"wide",context:"formatting"})}},c:function(e,t,n,o){var i=e.getUTCDay(),a=(i-o.weekStartsOn+8)%7||7;switch(t){case"c":return String(a);case"cc":return m(a,t.length);case"co":return n.ordinalNumber(a,{unit:"day"});case"ccc":return n.day(i,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(i,{width:"narrow",context:"standalone"});case"cccccc":return n.day(i,{width:"short",context:"standalone"});case"cccc":default:return n.day(i,{width:"wide",context:"standalone"})}},i:function(e,t,n){var o=e.getUTCDay(),i=o===0?7:o;switch(t){case"i":return String(i);case"ii":return m(i,t.length);case"io":return n.ordinalNumber(i,{unit:"day"});case"iii":return n.day(o,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(o,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(o,{width:"short",context:"formatting"});case"iiii":default:return n.day(o,{width:"wide",context:"formatting"})}},a:function(e,t,n){var o=e.getUTCHours(),i=o/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(i,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},b:function(e,t,n){var o=e.getUTCHours(),i;switch(o===12?i=re.noon:o===0?i=re.midnight:i=o/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(i,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},B:function(e,t,n){var o=e.getUTCHours(),i;switch(o>=17?i=re.evening:o>=12?i=re.afternoon:o>=4?i=re.morning:i=re.night,t){case"B":case"BB":case"BBB":return n.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(i,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(i,{width:"wide",context:"formatting"})}},h:function(e,t,n){if(t==="ho"){var o=e.getUTCHours()%12;return o===0&&(o=12),n.ordinalNumber(o,{unit:"hour"})}return Q.h(e,t)},H:function(e,t,n){return t==="Ho"?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):Q.H(e,t)},K:function(e,t,n){var o=e.getUTCHours()%12;return t==="Ko"?n.ordinalNumber(o,{unit:"hour"}):m(o,t.length)},k:function(e,t,n){var o=e.getUTCHours();return o===0&&(o=24),t==="ko"?n.ordinalNumber(o,{unit:"hour"}):m(o,t.length)},m:function(e,t,n){return t==="mo"?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):Q.m(e,t)},s:function(e,t,n){return t==="so"?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):Q.s(e,t)},S:function(e,t){return Q.S(e,t)},X:function(e,t,n,o){var i=o._originalDate||e,a=i.getTimezoneOffset();if(a===0)return"Z";switch(t){case"X":return Un(a);case"XXXX":case"XX":return ee(a);case"XXXXX":case"XXX":default:return ee(a,":")}},x:function(e,t,n,o){var i=o._originalDate||e,a=i.getTimezoneOffset();switch(t){case"x":return Un(a);case"xxxx":case"xx":return ee(a);case"xxxxx":case"xxx":default:return ee(a,":")}},O:function(e,t,n,o){var i=o._originalDate||e,a=i.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+zn(a,":");case"OOOO":default:return"GMT"+ee(a,":")}},z:function(e,t,n,o){var i=o._originalDate||e,a=i.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+zn(a,":");case"zzzz":default:return"GMT"+ee(a,":")}},t:function(e,t,n,o){var i=o._originalDate||e,a=Math.floor(i.getTime()/1e3);return m(a,t.length)},T:function(e,t,n,o){var i=o._originalDate||e,a=i.getTime();return m(a,t.length)}};function zn(r,e){var t=r>0?"-":"+",n=Math.abs(r),o=Math.floor(n/60),i=n%60;if(i===0)return t+String(o);var a=e||"";return t+String(o)+a+m(i,2)}function Un(r,e){if(r%60===0){var t=r>0?"-":"+";return t+m(Math.abs(r)/60,2)}return ee(r,e)}function ee(r,e){var t=e||"",n=r>0?"-":"+",o=Math.abs(r),i=m(Math.floor(o/60),2),a=m(o%60,2);return n+i+t+a}const Xa=Qa;var Wn=function(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}},Ei=function(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}},Ga=function(e,t){var n=e.match(/(P+)(p+)?/)||[],o=n[1],i=n[2];if(!i)return Wn(e,t);var a;switch(o){case"P":a=t.dateTime({width:"short"});break;case"PP":a=t.dateTime({width:"medium"});break;case"PPP":a=t.dateTime({width:"long"});break;case"PPPP":default:a=t.dateTime({width:"full"});break}return a.replace("{{date}}",Wn(o,t)).replace("{{time}}",Ei(i,t))},Ka={p:Ei,P:Ga};const Kt=Ka;function Ri(r){var e=new Date(Date.UTC(r.getFullYear(),r.getMonth(),r.getDate(),r.getHours(),r.getMinutes(),r.getSeconds(),r.getMilliseconds()));return e.setUTCFullYear(r.getFullYear()),r.getTime()-e.getTime()}var Ja=["D","DD"],Za=["YY","YYYY"];function Mi(r){return Ja.indexOf(r)!==-1}function Ii(r){return Za.indexOf(r)!==-1}function st(r,e,t){if(r==="YYYY")throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(t,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if(r==="YY")throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(t,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if(r==="D")throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(t,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if(r==="DD")throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(t,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var es={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},ts=function(e,t,n){var o,i=es[e];return typeof i=="string"?o=i:t===1?o=i.one:o=i.other.replace("{{count}}",t.toString()),n!=null&&n.addSuffix?n.comparison&&n.comparison>0?"in "+o:o+" ago":o};const rs=ts;function qt(r){return function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=e.width?String(e.width):r.defaultWidth,n=r.formats[t]||r.formats[r.defaultWidth];return n}}var ns={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},os={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},is={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},as={date:qt({formats:ns,defaultWidth:"full"}),time:qt({formats:os,defaultWidth:"full"}),dateTime:qt({formats:is,defaultWidth:"full"})};const ss=as;var ls={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},us=function(e,t,n,o){return ls[e]};const cs=us;function he(r){return function(e,t){var n=t!=null&&t.context?String(t.context):"standalone",o;if(n==="formatting"&&r.formattingValues){var i=r.defaultFormattingWidth||r.defaultWidth,a=t!=null&&t.width?String(t.width):i;o=r.formattingValues[a]||r.formattingValues[i]}else{var s=r.defaultWidth,l=t!=null&&t.width?String(t.width):r.defaultWidth;o=r.values[l]||r.values[s]}var u=r.argumentCallback?r.argumentCallback(e):e;return o[u]}}var fs={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},ds={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},hs={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},ps={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},ms={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},ys={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},_s=function(e,t){var n=Number(e),o=n%100;if(o>20||o<10)switch(o%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},vs={ordinalNumber:_s,era:he({values:fs,defaultWidth:"wide"}),quarter:he({values:ds,defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:he({values:hs,defaultWidth:"wide"}),day:he({values:ps,defaultWidth:"wide"}),dayPeriod:he({values:ms,defaultWidth:"wide",formattingValues:ys,defaultFormattingWidth:"wide"})};const gs=vs;function pe(r){return function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=t.width,o=n&&r.matchPatterns[n]||r.matchPatterns[r.defaultMatchWidth],i=e.match(o);if(!i)return null;var a=i[0],s=n&&r.parsePatterns[n]||r.parsePatterns[r.defaultParseWidth],l=Array.isArray(s)?ws(s,function(c){return c.test(a)}):bs(s,function(c){return c.test(a)}),u;u=r.valueCallback?r.valueCallback(l):l,u=t.valueCallback?t.valueCallback(u):u;var f=e.slice(a.length);return{value:u,rest:f}}}function bs(r,e){for(var t in r)if(r.hasOwnProperty(t)&&e(r[t]))return t}function ws(r,e){for(var t=0;t<r.length;t++)if(e(r[t]))return t}function As(r){return function(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},n=e.match(r.matchPattern);if(!n)return null;var o=n[0],i=e.match(r.parsePattern);if(!i)return null;var a=r.valueCallback?r.valueCallback(i[0]):i[0];a=t.valueCallback?t.valueCallback(a):a;var s=e.slice(o.length);return{value:a,rest:s}}}var Os=/^(\d+)(th|st|nd|rd)?/i,xs=/\d+/i,Ps={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},Ds={any:[/^b/i,/^(a|c)/i]},Ts={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},Cs={any:[/1/i,/2/i,/3/i,/4/i]},Ss={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},$s={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},ks={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},Es={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},Rs={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},Ms={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},Is={ordinalNumber:As({matchPattern:Os,parsePattern:xs,valueCallback:function(e){return parseInt(e,10)}}),era:pe({matchPatterns:Ps,defaultMatchWidth:"wide",parsePatterns:Ds,defaultParseWidth:"any"}),quarter:pe({matchPatterns:Ts,defaultMatchWidth:"wide",parsePatterns:Cs,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:pe({matchPatterns:Ss,defaultMatchWidth:"wide",parsePatterns:$s,defaultParseWidth:"any"}),day:pe({matchPatterns:ks,defaultMatchWidth:"wide",parsePatterns:Es,defaultParseWidth:"any"}),dayPeriod:pe({matchPatterns:Rs,defaultMatchWidth:"any",parsePatterns:Ms,defaultParseWidth:"any"})};const Fs=Is;var Bs={code:"en-US",formatDistance:rs,formatLong:ss,formatRelative:cs,localize:gs,match:Fs,options:{weekStartsOn:0,firstWeekContainsDate:1}};const Fi=Bs;var Ns=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Ys=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,Ls=/^'([^]*?)'?$/,zs=/''/g,Us=/[a-zA-Z]/;function Ws(r,e,t){var n,o,i,a,s,l,u,f,c,d,h,_,D,v,E,W,K,J;P(2,arguments);var ae=String(e),R=ie(),N=(n=(o=t==null?void 0:t.locale)!==null&&o!==void 0?o:R.locale)!==null&&n!==void 0?n:Fi,H=M((i=(a=(s=(l=t==null?void 0:t.firstWeekContainsDate)!==null&&l!==void 0?l:t==null||(u=t.locale)===null||u===void 0||(f=u.options)===null||f===void 0?void 0:f.firstWeekContainsDate)!==null&&s!==void 0?s:R.firstWeekContainsDate)!==null&&a!==void 0?a:(c=R.locale)===null||c===void 0||(d=c.options)===null||d===void 0?void 0:d.firstWeekContainsDate)!==null&&i!==void 0?i:1);if(!(H>=1&&H<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var j=M((h=(_=(D=(v=t==null?void 0:t.weekStartsOn)!==null&&v!==void 0?v:t==null||(E=t.locale)===null||E===void 0||(W=E.options)===null||W===void 0?void 0:W.weekStartsOn)!==null&&D!==void 0?D:R.weekStartsOn)!==null&&_!==void 0?_:(K=R.locale)===null||K===void 0||(J=K.options)===null||J===void 0?void 0:J.weekStartsOn)!==null&&h!==void 0?h:0);if(!(j>=0&&j<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!N.localize)throw new RangeError("locale must contain localize property");if(!N.formatLong)throw new RangeError("locale must contain formatLong property");var V=k(r);if(!Gt(V))throw new RangeError("Invalid time value");var se=Ri(V),le=Ci(V,se),ue={firstWeekContainsDate:H,weekStartsOn:j,locale:N,_originalDate:V},Ut=ae.match(Ys).map(function($){var F=$[0];if(F==="p"||F==="P"){var Z=Kt[F];return Z($,N.formatLong)}return $}).join("").match(Ns).map(function($){if($==="''")return"'";var F=$[0];if(F==="'")return Hs($);var Z=Xa[F];if(Z)return!(t!=null&&t.useAdditionalWeekYearTokens)&&Ii($)&&st($,e,String(r)),!(t!=null&&t.useAdditionalDayOfYearTokens)&&Mi($)&&st($,e,String(r)),Z(le,$,N.localize,ue);if(F.match(Us))throw new RangeError("Format string contains an unescaped latin alphabet character `"+F+"`");return $}).join("");return Ut}function Hs(r){var e=r.match(Ls);return e?e[1].replace(zs,"'"):r}function qs(r,e){if(r==null)throw new TypeError("assign requires that input parameter not be null or undefined");for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(r[t]=e[t]);return r}function Pe(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Pe=function(t){return typeof t}:Pe=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Pe(r)}function Bi(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Jt(r,e)}function Jt(r,e){return Jt=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Jt(r,e)}function Ni(r){var e=Vs();return function(){var n=lt(r),o;if(e){var i=lt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return js(this,o)}}function js(r,e){return e&&(Pe(e)==="object"||typeof e=="function")?e:Zt(r)}function Zt(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Vs(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function lt(r){return lt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},lt(r)}function fn(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Hn(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function dn(r,e,t){return e&&Hn(r.prototype,e),t&&Hn(r,t),r}function er(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Qs=10,Yi=function(){function r(){fn(this,r),er(this,"subPriority",0)}return dn(r,[{key:"validate",value:function(t,n){return!0}}]),r}(),Xs=function(r){Bi(t,r);var e=Ni(t);function t(n,o,i,a,s){var l;return fn(this,t),l=e.call(this),l.value=n,l.validateValue=o,l.setValue=i,l.priority=a,s&&(l.subPriority=s),l}return dn(t,[{key:"validate",value:function(o,i){return this.validateValue(o,this.value,i)}},{key:"set",value:function(o,i,a){return this.setValue(o,i,this.value,a)}}]),t}(Yi),Gs=function(r){Bi(t,r);var e=Ni(t);function t(){var n;fn(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),er(Zt(n),"priority",Qs),er(Zt(n),"subPriority",-1),n}return dn(t,[{key:"set",value:function(o,i){if(i.timestampIsSet)return o;var a=new Date(0);return a.setFullYear(o.getUTCFullYear(),o.getUTCMonth(),o.getUTCDate()),a.setHours(o.getUTCHours(),o.getUTCMinutes(),o.getUTCSeconds(),o.getUTCMilliseconds()),a}}]),t}(Yi);function Ks(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function qn(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Js(r,e,t){return e&&qn(r.prototype,e),t&&qn(r,t),r}var p=function(){function r(){Ks(this,r)}return Js(r,[{key:"run",value:function(t,n,o,i){var a=this.parse(t,n,o,i);return a?{setter:new Xs(a.value,this.validate,this.set,this.priority,this.subPriority),rest:a.rest}:null}},{key:"validate",value:function(t,n,o){return!0}}]),r}();function De(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?De=function(t){return typeof t}:De=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},De(r)}function Zs(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function jn(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function el(r,e,t){return e&&jn(r.prototype,e),t&&jn(r,t),r}function tl(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&tr(r,e)}function tr(r,e){return tr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},tr(r,e)}function rl(r){var e=ol();return function(){var n=ut(r),o;if(e){var i=ut(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return nl(this,o)}}function nl(r,e){return e&&(De(e)==="object"||typeof e=="function")?e:rr(r)}function rr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function ol(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function ut(r){return ut=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},ut(r)}function Vn(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var il=function(r){tl(t,r);var e=rl(t);function t(){var n;Zs(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Vn(rr(n),"priority",140),Vn(rr(n),"incompatibleTokens",["R","u","t","T"]),n}return el(t,[{key:"parse",value:function(o,i,a){switch(i){case"G":case"GG":case"GGG":return a.era(o,{width:"abbreviated"})||a.era(o,{width:"narrow"});case"GGGGG":return a.era(o,{width:"narrow"});case"GGGG":default:return a.era(o,{width:"wide"})||a.era(o,{width:"abbreviated"})||a.era(o,{width:"narrow"})}}},{key:"set",value:function(o,i,a){return i.era=a,o.setUTCFullYear(a,0,1),o.setUTCHours(0,0,0,0),o}}]),t}(p),al=6e4,sl=36e5,ll=1e3,w={month:/^(1[0-2]|0?\d)/,date:/^(3[0-1]|[0-2]?\d)/,dayOfYear:/^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,week:/^(5[0-3]|[0-4]?\d)/,hour23h:/^(2[0-3]|[0-1]?\d)/,hour24h:/^(2[0-4]|[0-1]?\d)/,hour11h:/^(1[0-1]|0?\d)/,hour12h:/^(1[0-2]|0?\d)/,minute:/^[0-5]?\d/,second:/^[0-5]?\d/,singleDigit:/^\d/,twoDigits:/^\d{1,2}/,threeDigits:/^\d{1,3}/,fourDigits:/^\d{1,4}/,anyDigitsSigned:/^-?\d+/,singleDigitSigned:/^-?\d/,twoDigitsSigned:/^-?\d{1,2}/,threeDigitsSigned:/^-?\d{1,3}/,fourDigitsSigned:/^-?\d{1,4}/},L={basicOptionalMinutes:/^([+-])(\d{2})(\d{2})?|Z/,basic:/^([+-])(\d{2})(\d{2})|Z/,basicOptionalSeconds:/^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,extended:/^([+-])(\d{2}):(\d{2})|Z/,extendedOptionalSeconds:/^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/};function A(r,e){return r&&{value:e(r.value),rest:r.rest}}function g(r,e){var t=e.match(r);return t?{value:parseInt(t[0],10),rest:e.slice(t[0].length)}:null}function z(r,e){var t=e.match(r);if(!t)return null;if(t[0]==="Z")return{value:0,rest:e.slice(1)};var n=t[1]==="+"?1:-1,o=t[2]?parseInt(t[2],10):0,i=t[3]?parseInt(t[3],10):0,a=t[5]?parseInt(t[5],10):0;return{value:n*(o*sl+i*al+a*ll),rest:e.slice(t[0].length)}}function Li(r){return g(w.anyDigitsSigned,r)}function b(r,e){switch(r){case 1:return g(w.singleDigit,e);case 2:return g(w.twoDigits,e);case 3:return g(w.threeDigits,e);case 4:return g(w.fourDigits,e);default:return g(new RegExp("^\\d{1,"+r+"}"),e)}}function ct(r,e){switch(r){case 1:return g(w.singleDigitSigned,e);case 2:return g(w.twoDigitsSigned,e);case 3:return g(w.threeDigitsSigned,e);case 4:return g(w.fourDigitsSigned,e);default:return g(new RegExp("^-?\\d{1,"+r+"}"),e)}}function hn(r){switch(r){case"morning":return 4;case"evening":return 17;case"pm":case"noon":case"afternoon":return 12;case"am":case"midnight":case"night":default:return 0}}function zi(r,e){var t=e>0,n=t?e:1-e,o;if(n<=50)o=r||100;else{var i=n+50,a=Math.floor(i/100)*100,s=r>=i%100;o=r+a-(s?100:0)}return t?o:1-o}function Ui(r){return r%400===0||r%4===0&&r%100!==0}function Te(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Te=function(t){return typeof t}:Te=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Te(r)}function ul(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Qn(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function cl(r,e,t){return e&&Qn(r.prototype,e),t&&Qn(r,t),r}function fl(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&nr(r,e)}function nr(r,e){return nr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},nr(r,e)}function dl(r){var e=pl();return function(){var n=ft(r),o;if(e){var i=ft(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return hl(this,o)}}function hl(r,e){return e&&(Te(e)==="object"||typeof e=="function")?e:or(r)}function or(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function pl(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function ft(r){return ft=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},ft(r)}function Xn(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var ml=function(r){fl(t,r);var e=dl(t);function t(){var n;ul(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Xn(or(n),"priority",130),Xn(or(n),"incompatibleTokens",["Y","R","u","w","I","i","e","c","t","T"]),n}return cl(t,[{key:"parse",value:function(o,i,a){var s=function(u){return{year:u,isTwoDigitYear:i==="yy"}};switch(i){case"y":return A(b(4,o),s);case"yo":return A(a.ordinalNumber(o,{unit:"year"}),s);default:return A(b(i.length,o),s)}}},{key:"validate",value:function(o,i){return i.isTwoDigitYear||i.year>0}},{key:"set",value:function(o,i,a){var s=o.getUTCFullYear();if(a.isTwoDigitYear){var l=zi(a.year,s);return o.setUTCFullYear(l,0,1),o.setUTCHours(0,0,0,0),o}var u=!("era"in i)||i.era===1?a.year:1-a.year;return o.setUTCFullYear(u,0,1),o.setUTCHours(0,0,0,0),o}}]),t}(p);function Ce(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ce=function(t){return typeof t}:Ce=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ce(r)}function yl(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Gn(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function _l(r,e,t){return e&&Gn(r.prototype,e),t&&Gn(r,t),r}function vl(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&ir(r,e)}function ir(r,e){return ir=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},ir(r,e)}function gl(r){var e=wl();return function(){var n=dt(r),o;if(e){var i=dt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return bl(this,o)}}function bl(r,e){return e&&(Ce(e)==="object"||typeof e=="function")?e:ar(r)}function ar(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function wl(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function dt(r){return dt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},dt(r)}function Kn(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Al=function(r){vl(t,r);var e=gl(t);function t(){var n;yl(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Kn(ar(n),"priority",130),Kn(ar(n),"incompatibleTokens",["y","R","u","Q","q","M","L","I","d","D","i","t","T"]),n}return _l(t,[{key:"parse",value:function(o,i,a){var s=function(u){return{year:u,isTwoDigitYear:i==="YY"}};switch(i){case"Y":return A(b(4,o),s);case"Yo":return A(a.ordinalNumber(o,{unit:"year"}),s);default:return A(b(i.length,o),s)}}},{key:"validate",value:function(o,i){return i.isTwoDigitYear||i.year>0}},{key:"set",value:function(o,i,a,s){var l=cn(o,s);if(a.isTwoDigitYear){var u=zi(a.year,l);return o.setUTCFullYear(u,0,s.firstWeekContainsDate),o.setUTCHours(0,0,0,0),te(o,s)}var f=!("era"in i)||i.era===1?a.year:1-a.year;return o.setUTCFullYear(f,0,s.firstWeekContainsDate),o.setUTCHours(0,0,0,0),te(o,s)}}]),t}(p);function Se(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Se=function(t){return typeof t}:Se=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Se(r)}function Ol(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Jn(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function xl(r,e,t){return e&&Jn(r.prototype,e),t&&Jn(r,t),r}function Pl(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&sr(r,e)}function sr(r,e){return sr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},sr(r,e)}function Dl(r){var e=Cl();return function(){var n=ht(r),o;if(e){var i=ht(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Tl(this,o)}}function Tl(r,e){return e&&(Se(e)==="object"||typeof e=="function")?e:lr(r)}function lr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Cl(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function ht(r){return ht=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},ht(r)}function Zn(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Sl=function(r){Pl(t,r);var e=Dl(t);function t(){var n;Ol(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Zn(lr(n),"priority",130),Zn(lr(n),"incompatibleTokens",["G","y","Y","u","Q","q","M","L","w","d","D","e","c","t","T"]),n}return xl(t,[{key:"parse",value:function(o,i){return ct(i==="R"?4:i.length,o)}},{key:"set",value:function(o,i,a){var s=new Date(0);return s.setUTCFullYear(a,0,4),s.setUTCHours(0,0,0,0),oe(s)}}]),t}(p);function $e(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?$e=function(t){return typeof t}:$e=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},$e(r)}function $l(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function eo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function kl(r,e,t){return e&&eo(r.prototype,e),t&&eo(r,t),r}function El(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&ur(r,e)}function ur(r,e){return ur=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},ur(r,e)}function Rl(r){var e=Il();return function(){var n=pt(r),o;if(e){var i=pt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Ml(this,o)}}function Ml(r,e){return e&&($e(e)==="object"||typeof e=="function")?e:cr(r)}function cr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Il(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function pt(r){return pt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},pt(r)}function to(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Fl=function(r){El(t,r);var e=Rl(t);function t(){var n;$l(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),to(cr(n),"priority",130),to(cr(n),"incompatibleTokens",["G","y","Y","R","w","I","i","e","c","t","T"]),n}return kl(t,[{key:"parse",value:function(o,i){return ct(i==="u"?4:i.length,o)}},{key:"set",value:function(o,i,a){return o.setUTCFullYear(a,0,1),o.setUTCHours(0,0,0,0),o}}]),t}(p);function ke(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?ke=function(t){return typeof t}:ke=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ke(r)}function Bl(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function ro(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Nl(r,e,t){return e&&ro(r.prototype,e),t&&ro(r,t),r}function Yl(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&fr(r,e)}function fr(r,e){return fr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},fr(r,e)}function Ll(r){var e=Ul();return function(){var n=mt(r),o;if(e){var i=mt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return zl(this,o)}}function zl(r,e){return e&&(ke(e)==="object"||typeof e=="function")?e:dr(r)}function dr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Ul(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function mt(r){return mt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},mt(r)}function no(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Wl=function(r){Yl(t,r);var e=Ll(t);function t(){var n;Bl(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),no(dr(n),"priority",120),no(dr(n),"incompatibleTokens",["Y","R","q","M","L","w","I","d","D","i","e","c","t","T"]),n}return Nl(t,[{key:"parse",value:function(o,i,a){switch(i){case"Q":case"QQ":return b(i.length,o);case"Qo":return a.ordinalNumber(o,{unit:"quarter"});case"QQQ":return a.quarter(o,{width:"abbreviated",context:"formatting"})||a.quarter(o,{width:"narrow",context:"formatting"});case"QQQQQ":return a.quarter(o,{width:"narrow",context:"formatting"});case"QQQQ":default:return a.quarter(o,{width:"wide",context:"formatting"})||a.quarter(o,{width:"abbreviated",context:"formatting"})||a.quarter(o,{width:"narrow",context:"formatting"})}}},{key:"validate",value:function(o,i){return i>=1&&i<=4}},{key:"set",value:function(o,i,a){return o.setUTCMonth((a-1)*3,1),o.setUTCHours(0,0,0,0),o}}]),t}(p);function Ee(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ee=function(t){return typeof t}:Ee=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ee(r)}function Hl(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function oo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function ql(r,e,t){return e&&oo(r.prototype,e),t&&oo(r,t),r}function jl(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&hr(r,e)}function hr(r,e){return hr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},hr(r,e)}function Vl(r){var e=Xl();return function(){var n=yt(r),o;if(e){var i=yt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Ql(this,o)}}function Ql(r,e){return e&&(Ee(e)==="object"||typeof e=="function")?e:pr(r)}function pr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Xl(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function yt(r){return yt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},yt(r)}function io(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Gl=function(r){jl(t,r);var e=Vl(t);function t(){var n;Hl(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),io(pr(n),"priority",120),io(pr(n),"incompatibleTokens",["Y","R","Q","M","L","w","I","d","D","i","e","c","t","T"]),n}return ql(t,[{key:"parse",value:function(o,i,a){switch(i){case"q":case"qq":return b(i.length,o);case"qo":return a.ordinalNumber(o,{unit:"quarter"});case"qqq":return a.quarter(o,{width:"abbreviated",context:"standalone"})||a.quarter(o,{width:"narrow",context:"standalone"});case"qqqqq":return a.quarter(o,{width:"narrow",context:"standalone"});case"qqqq":default:return a.quarter(o,{width:"wide",context:"standalone"})||a.quarter(o,{width:"abbreviated",context:"standalone"})||a.quarter(o,{width:"narrow",context:"standalone"})}}},{key:"validate",value:function(o,i){return i>=1&&i<=4}},{key:"set",value:function(o,i,a){return o.setUTCMonth((a-1)*3,1),o.setUTCHours(0,0,0,0),o}}]),t}(p);function Re(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Re=function(t){return typeof t}:Re=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Re(r)}function Kl(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function ao(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Jl(r,e,t){return e&&ao(r.prototype,e),t&&ao(r,t),r}function Zl(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&mr(r,e)}function mr(r,e){return mr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},mr(r,e)}function eu(r){var e=ru();return function(){var n=_t(r),o;if(e){var i=_t(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return tu(this,o)}}function tu(r,e){return e&&(Re(e)==="object"||typeof e=="function")?e:yr(r)}function yr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function ru(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function _t(r){return _t=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},_t(r)}function so(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var nu=function(r){Zl(t,r);var e=eu(t);function t(){var n;Kl(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),so(yr(n),"incompatibleTokens",["Y","R","q","Q","L","w","I","D","i","e","c","t","T"]),so(yr(n),"priority",110),n}return Jl(t,[{key:"parse",value:function(o,i,a){var s=function(u){return u-1};switch(i){case"M":return A(g(w.month,o),s);case"MM":return A(b(2,o),s);case"Mo":return A(a.ordinalNumber(o,{unit:"month"}),s);case"MMM":return a.month(o,{width:"abbreviated",context:"formatting"})||a.month(o,{width:"narrow",context:"formatting"});case"MMMMM":return a.month(o,{width:"narrow",context:"formatting"});case"MMMM":default:return a.month(o,{width:"wide",context:"formatting"})||a.month(o,{width:"abbreviated",context:"formatting"})||a.month(o,{width:"narrow",context:"formatting"})}}},{key:"validate",value:function(o,i){return i>=0&&i<=11}},{key:"set",value:function(o,i,a){return o.setUTCMonth(a,1),o.setUTCHours(0,0,0,0),o}}]),t}(p);function Me(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Me=function(t){return typeof t}:Me=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Me(r)}function ou(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function lo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function iu(r,e,t){return e&&lo(r.prototype,e),t&&lo(r,t),r}function au(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&_r(r,e)}function _r(r,e){return _r=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},_r(r,e)}function su(r){var e=uu();return function(){var n=vt(r),o;if(e){var i=vt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return lu(this,o)}}function lu(r,e){return e&&(Me(e)==="object"||typeof e=="function")?e:vr(r)}function vr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function uu(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function vt(r){return vt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},vt(r)}function uo(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var cu=function(r){au(t,r);var e=su(t);function t(){var n;ou(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),uo(vr(n),"priority",110),uo(vr(n),"incompatibleTokens",["Y","R","q","Q","M","w","I","D","i","e","c","t","T"]),n}return iu(t,[{key:"parse",value:function(o,i,a){var s=function(u){return u-1};switch(i){case"L":return A(g(w.month,o),s);case"LL":return A(b(2,o),s);case"Lo":return A(a.ordinalNumber(o,{unit:"month"}),s);case"LLL":return a.month(o,{width:"abbreviated",context:"standalone"})||a.month(o,{width:"narrow",context:"standalone"});case"LLLLL":return a.month(o,{width:"narrow",context:"standalone"});case"LLLL":default:return a.month(o,{width:"wide",context:"standalone"})||a.month(o,{width:"abbreviated",context:"standalone"})||a.month(o,{width:"narrow",context:"standalone"})}}},{key:"validate",value:function(o,i){return i>=0&&i<=11}},{key:"set",value:function(o,i,a){return o.setUTCMonth(a,1),o.setUTCHours(0,0,0,0),o}}]),t}(p);function fu(r,e,t){P(2,arguments);var n=k(r),o=M(e),i=ki(n,t)-o;return n.setUTCDate(n.getUTCDate()-i*7),n}function Ie(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ie=function(t){return typeof t}:Ie=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ie(r)}function du(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function co(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function hu(r,e,t){return e&&co(r.prototype,e),t&&co(r,t),r}function pu(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&gr(r,e)}function gr(r,e){return gr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},gr(r,e)}function mu(r){var e=_u();return function(){var n=gt(r),o;if(e){var i=gt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return yu(this,o)}}function yu(r,e){return e&&(Ie(e)==="object"||typeof e=="function")?e:br(r)}function br(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function _u(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function gt(r){return gt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},gt(r)}function fo(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var vu=function(r){pu(t,r);var e=mu(t);function t(){var n;du(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),fo(br(n),"priority",100),fo(br(n),"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","i","t","T"]),n}return hu(t,[{key:"parse",value:function(o,i,a){switch(i){case"w":return g(w.week,o);case"wo":return a.ordinalNumber(o,{unit:"week"});default:return b(i.length,o)}}},{key:"validate",value:function(o,i){return i>=1&&i<=53}},{key:"set",value:function(o,i,a,s){return te(fu(o,a,s),s)}}]),t}(p);function gu(r,e){P(2,arguments);var t=k(r),n=M(e),o=$i(t)-n;return t.setUTCDate(t.getUTCDate()-o*7),t}function Fe(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Fe=function(t){return typeof t}:Fe=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Fe(r)}function bu(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function ho(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function wu(r,e,t){return e&&ho(r.prototype,e),t&&ho(r,t),r}function Au(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&wr(r,e)}function wr(r,e){return wr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},wr(r,e)}function Ou(r){var e=Pu();return function(){var n=bt(r),o;if(e){var i=bt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return xu(this,o)}}function xu(r,e){return e&&(Fe(e)==="object"||typeof e=="function")?e:Ar(r)}function Ar(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Pu(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function bt(r){return bt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},bt(r)}function po(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Du=function(r){Au(t,r);var e=Ou(t);function t(){var n;bu(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),po(Ar(n),"priority",100),po(Ar(n),"incompatibleTokens",["y","Y","u","q","Q","M","L","w","d","D","e","c","t","T"]),n}return wu(t,[{key:"parse",value:function(o,i,a){switch(i){case"I":return g(w.week,o);case"Io":return a.ordinalNumber(o,{unit:"week"});default:return b(i.length,o)}}},{key:"validate",value:function(o,i){return i>=1&&i<=53}},{key:"set",value:function(o,i,a){return oe(gu(o,a))}}]),t}(p);function Be(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Be=function(t){return typeof t}:Be=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Be(r)}function Tu(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function mo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Cu(r,e,t){return e&&mo(r.prototype,e),t&&mo(r,t),r}function Su(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Or(r,e)}function Or(r,e){return Or=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Or(r,e)}function $u(r){var e=Eu();return function(){var n=wt(r),o;if(e){var i=wt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return ku(this,o)}}function ku(r,e){return e&&(Be(e)==="object"||typeof e=="function")?e:Ne(r)}function Ne(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Eu(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function wt(r){return wt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},wt(r)}function jt(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Ru=[31,28,31,30,31,30,31,31,30,31,30,31],Mu=[31,29,31,30,31,30,31,31,30,31,30,31],Iu=function(r){Su(t,r);var e=$u(t);function t(){var n;Tu(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),jt(Ne(n),"priority",90),jt(Ne(n),"subPriority",1),jt(Ne(n),"incompatibleTokens",["Y","R","q","Q","w","I","D","i","e","c","t","T"]),n}return Cu(t,[{key:"parse",value:function(o,i,a){switch(i){case"d":return g(w.date,o);case"do":return a.ordinalNumber(o,{unit:"date"});default:return b(i.length,o)}}},{key:"validate",value:function(o,i){var a=o.getUTCFullYear(),s=Ui(a),l=o.getUTCMonth();return s?i>=1&&i<=Mu[l]:i>=1&&i<=Ru[l]}},{key:"set",value:function(o,i,a){return o.setUTCDate(a),o.setUTCHours(0,0,0,0),o}}]),t}(p);function Ye(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ye=function(t){return typeof t}:Ye=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ye(r)}function Fu(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function yo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Bu(r,e,t){return e&&yo(r.prototype,e),t&&yo(r,t),r}function Nu(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&xr(r,e)}function xr(r,e){return xr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},xr(r,e)}function Yu(r){var e=zu();return function(){var n=At(r),o;if(e){var i=At(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Lu(this,o)}}function Lu(r,e){return e&&(Ye(e)==="object"||typeof e=="function")?e:Le(r)}function Le(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function zu(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function At(r){return At=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},At(r)}function Vt(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Uu=function(r){Nu(t,r);var e=Yu(t);function t(){var n;Fu(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Vt(Le(n),"priority",90),Vt(Le(n),"subpriority",1),Vt(Le(n),"incompatibleTokens",["Y","R","q","Q","M","L","w","I","d","E","i","e","c","t","T"]),n}return Bu(t,[{key:"parse",value:function(o,i,a){switch(i){case"D":case"DD":return g(w.dayOfYear,o);case"Do":return a.ordinalNumber(o,{unit:"date"});default:return b(i.length,o)}}},{key:"validate",value:function(o,i){var a=o.getUTCFullYear(),s=Ui(a);return s?i>=1&&i<=366:i>=1&&i<=365}},{key:"set",value:function(o,i,a){return o.setUTCMonth(0,a),o.setUTCHours(0,0,0,0),o}}]),t}(p);function pn(r,e,t){var n,o,i,a,s,l,u,f;P(2,arguments);var c=ie(),d=M((n=(o=(i=(a=t==null?void 0:t.weekStartsOn)!==null&&a!==void 0?a:t==null||(s=t.locale)===null||s===void 0||(l=s.options)===null||l===void 0?void 0:l.weekStartsOn)!==null&&i!==void 0?i:c.weekStartsOn)!==null&&o!==void 0?o:(u=c.locale)===null||u===void 0||(f=u.options)===null||f===void 0?void 0:f.weekStartsOn)!==null&&n!==void 0?n:0);if(!(d>=0&&d<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var h=k(r),_=M(e),D=h.getUTCDay(),v=_%7,E=(v+7)%7,W=(E<d?7:0)+_-D;return h.setUTCDate(h.getUTCDate()+W),h}function ze(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?ze=function(t){return typeof t}:ze=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ze(r)}function Wu(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function _o(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Hu(r,e,t){return e&&_o(r.prototype,e),t&&_o(r,t),r}function qu(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Pr(r,e)}function Pr(r,e){return Pr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Pr(r,e)}function ju(r){var e=Qu();return function(){var n=Ot(r),o;if(e){var i=Ot(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Vu(this,o)}}function Vu(r,e){return e&&(ze(e)==="object"||typeof e=="function")?e:Dr(r)}function Dr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Qu(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Ot(r){return Ot=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Ot(r)}function vo(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Xu=function(r){qu(t,r);var e=ju(t);function t(){var n;Wu(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),vo(Dr(n),"priority",90),vo(Dr(n),"incompatibleTokens",["D","i","e","c","t","T"]),n}return Hu(t,[{key:"parse",value:function(o,i,a){switch(i){case"E":case"EE":case"EEE":return a.day(o,{width:"abbreviated",context:"formatting"})||a.day(o,{width:"short",context:"formatting"})||a.day(o,{width:"narrow",context:"formatting"});case"EEEEE":return a.day(o,{width:"narrow",context:"formatting"});case"EEEEEE":return a.day(o,{width:"short",context:"formatting"})||a.day(o,{width:"narrow",context:"formatting"});case"EEEE":default:return a.day(o,{width:"wide",context:"formatting"})||a.day(o,{width:"abbreviated",context:"formatting"})||a.day(o,{width:"short",context:"formatting"})||a.day(o,{width:"narrow",context:"formatting"})}}},{key:"validate",value:function(o,i){return i>=0&&i<=6}},{key:"set",value:function(o,i,a,s){return o=pn(o,a,s),o.setUTCHours(0,0,0,0),o}}]),t}(p);function Ue(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ue=function(t){return typeof t}:Ue=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ue(r)}function Gu(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function go(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Ku(r,e,t){return e&&go(r.prototype,e),t&&go(r,t),r}function Ju(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Tr(r,e)}function Tr(r,e){return Tr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Tr(r,e)}function Zu(r){var e=tc();return function(){var n=xt(r),o;if(e){var i=xt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return ec(this,o)}}function ec(r,e){return e&&(Ue(e)==="object"||typeof e=="function")?e:Cr(r)}function Cr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function tc(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function xt(r){return xt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},xt(r)}function bo(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var rc=function(r){Ju(t,r);var e=Zu(t);function t(){var n;Gu(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),bo(Cr(n),"priority",90),bo(Cr(n),"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","E","i","c","t","T"]),n}return Ku(t,[{key:"parse",value:function(o,i,a,s){var l=function(f){var c=Math.floor((f-1)/7)*7;return(f+s.weekStartsOn+6)%7+c};switch(i){case"e":case"ee":return A(b(i.length,o),l);case"eo":return A(a.ordinalNumber(o,{unit:"day"}),l);case"eee":return a.day(o,{width:"abbreviated",context:"formatting"})||a.day(o,{width:"short",context:"formatting"})||a.day(o,{width:"narrow",context:"formatting"});case"eeeee":return a.day(o,{width:"narrow",context:"formatting"});case"eeeeee":return a.day(o,{width:"short",context:"formatting"})||a.day(o,{width:"narrow",context:"formatting"});case"eeee":default:return a.day(o,{width:"wide",context:"formatting"})||a.day(o,{width:"abbreviated",context:"formatting"})||a.day(o,{width:"short",context:"formatting"})||a.day(o,{width:"narrow",context:"formatting"})}}},{key:"validate",value:function(o,i){return i>=0&&i<=6}},{key:"set",value:function(o,i,a,s){return o=pn(o,a,s),o.setUTCHours(0,0,0,0),o}}]),t}(p);function We(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?We=function(t){return typeof t}:We=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},We(r)}function nc(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function wo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function oc(r,e,t){return e&&wo(r.prototype,e),t&&wo(r,t),r}function ic(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Sr(r,e)}function Sr(r,e){return Sr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Sr(r,e)}function ac(r){var e=lc();return function(){var n=Pt(r),o;if(e){var i=Pt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return sc(this,o)}}function sc(r,e){return e&&(We(e)==="object"||typeof e=="function")?e:$r(r)}function $r(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function lc(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Pt(r){return Pt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Pt(r)}function Ao(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var uc=function(r){ic(t,r);var e=ac(t);function t(){var n;nc(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Ao($r(n),"priority",90),Ao($r(n),"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","E","i","e","t","T"]),n}return oc(t,[{key:"parse",value:function(o,i,a,s){var l=function(f){var c=Math.floor((f-1)/7)*7;return(f+s.weekStartsOn+6)%7+c};switch(i){case"c":case"cc":return A(b(i.length,o),l);case"co":return A(a.ordinalNumber(o,{unit:"day"}),l);case"ccc":return a.day(o,{width:"abbreviated",context:"standalone"})||a.day(o,{width:"short",context:"standalone"})||a.day(o,{width:"narrow",context:"standalone"});case"ccccc":return a.day(o,{width:"narrow",context:"standalone"});case"cccccc":return a.day(o,{width:"short",context:"standalone"})||a.day(o,{width:"narrow",context:"standalone"});case"cccc":default:return a.day(o,{width:"wide",context:"standalone"})||a.day(o,{width:"abbreviated",context:"standalone"})||a.day(o,{width:"short",context:"standalone"})||a.day(o,{width:"narrow",context:"standalone"})}}},{key:"validate",value:function(o,i){return i>=0&&i<=6}},{key:"set",value:function(o,i,a,s){return o=pn(o,a,s),o.setUTCHours(0,0,0,0),o}}]),t}(p);function cc(r,e){P(2,arguments);var t=M(e);t%7===0&&(t=t-7);var n=1,o=k(r),i=o.getUTCDay(),a=t%7,s=(a+7)%7,l=(s<n?7:0)+t-i;return o.setUTCDate(o.getUTCDate()+l),o}function He(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?He=function(t){return typeof t}:He=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},He(r)}function fc(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Oo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function dc(r,e,t){return e&&Oo(r.prototype,e),t&&Oo(r,t),r}function hc(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&kr(r,e)}function kr(r,e){return kr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},kr(r,e)}function pc(r){var e=yc();return function(){var n=Dt(r),o;if(e){var i=Dt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return mc(this,o)}}function mc(r,e){return e&&(He(e)==="object"||typeof e=="function")?e:Er(r)}function Er(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function yc(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Dt(r){return Dt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Dt(r)}function xo(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var _c=function(r){hc(t,r);var e=pc(t);function t(){var n;fc(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),xo(Er(n),"priority",90),xo(Er(n),"incompatibleTokens",["y","Y","u","q","Q","M","L","w","d","D","E","e","c","t","T"]),n}return dc(t,[{key:"parse",value:function(o,i,a){var s=function(u){return u===0?7:u};switch(i){case"i":case"ii":return b(i.length,o);case"io":return a.ordinalNumber(o,{unit:"day"});case"iii":return A(a.day(o,{width:"abbreviated",context:"formatting"})||a.day(o,{width:"short",context:"formatting"})||a.day(o,{width:"narrow",context:"formatting"}),s);case"iiiii":return A(a.day(o,{width:"narrow",context:"formatting"}),s);case"iiiiii":return A(a.day(o,{width:"short",context:"formatting"})||a.day(o,{width:"narrow",context:"formatting"}),s);case"iiii":default:return A(a.day(o,{width:"wide",context:"formatting"})||a.day(o,{width:"abbreviated",context:"formatting"})||a.day(o,{width:"short",context:"formatting"})||a.day(o,{width:"narrow",context:"formatting"}),s)}}},{key:"validate",value:function(o,i){return i>=1&&i<=7}},{key:"set",value:function(o,i,a){return o=cc(o,a),o.setUTCHours(0,0,0,0),o}}]),t}(p);function qe(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?qe=function(t){return typeof t}:qe=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},qe(r)}function vc(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Po(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function gc(r,e,t){return e&&Po(r.prototype,e),t&&Po(r,t),r}function bc(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Rr(r,e)}function Rr(r,e){return Rr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Rr(r,e)}function wc(r){var e=Oc();return function(){var n=Tt(r),o;if(e){var i=Tt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Ac(this,o)}}function Ac(r,e){return e&&(qe(e)==="object"||typeof e=="function")?e:Mr(r)}function Mr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Oc(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Tt(r){return Tt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Tt(r)}function Do(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var xc=function(r){bc(t,r);var e=wc(t);function t(){var n;vc(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Do(Mr(n),"priority",80),Do(Mr(n),"incompatibleTokens",["b","B","H","k","t","T"]),n}return gc(t,[{key:"parse",value:function(o,i,a){switch(i){case"a":case"aa":case"aaa":return a.dayPeriod(o,{width:"abbreviated",context:"formatting"})||a.dayPeriod(o,{width:"narrow",context:"formatting"});case"aaaaa":return a.dayPeriod(o,{width:"narrow",context:"formatting"});case"aaaa":default:return a.dayPeriod(o,{width:"wide",context:"formatting"})||a.dayPeriod(o,{width:"abbreviated",context:"formatting"})||a.dayPeriod(o,{width:"narrow",context:"formatting"})}}},{key:"set",value:function(o,i,a){return o.setUTCHours(hn(a),0,0,0),o}}]),t}(p);function je(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?je=function(t){return typeof t}:je=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},je(r)}function Pc(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function To(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Dc(r,e,t){return e&&To(r.prototype,e),t&&To(r,t),r}function Tc(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Ir(r,e)}function Ir(r,e){return Ir=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Ir(r,e)}function Cc(r){var e=$c();return function(){var n=Ct(r),o;if(e){var i=Ct(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Sc(this,o)}}function Sc(r,e){return e&&(je(e)==="object"||typeof e=="function")?e:Fr(r)}function Fr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function $c(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Ct(r){return Ct=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Ct(r)}function Co(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var kc=function(r){Tc(t,r);var e=Cc(t);function t(){var n;Pc(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Co(Fr(n),"priority",80),Co(Fr(n),"incompatibleTokens",["a","B","H","k","t","T"]),n}return Dc(t,[{key:"parse",value:function(o,i,a){switch(i){case"b":case"bb":case"bbb":return a.dayPeriod(o,{width:"abbreviated",context:"formatting"})||a.dayPeriod(o,{width:"narrow",context:"formatting"});case"bbbbb":return a.dayPeriod(o,{width:"narrow",context:"formatting"});case"bbbb":default:return a.dayPeriod(o,{width:"wide",context:"formatting"})||a.dayPeriod(o,{width:"abbreviated",context:"formatting"})||a.dayPeriod(o,{width:"narrow",context:"formatting"})}}},{key:"set",value:function(o,i,a){return o.setUTCHours(hn(a),0,0,0),o}}]),t}(p);function Ve(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ve=function(t){return typeof t}:Ve=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ve(r)}function Ec(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function So(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Rc(r,e,t){return e&&So(r.prototype,e),t&&So(r,t),r}function Mc(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Br(r,e)}function Br(r,e){return Br=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Br(r,e)}function Ic(r){var e=Bc();return function(){var n=St(r),o;if(e){var i=St(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Fc(this,o)}}function Fc(r,e){return e&&(Ve(e)==="object"||typeof e=="function")?e:Nr(r)}function Nr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Bc(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function St(r){return St=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},St(r)}function $o(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Nc=function(r){Mc(t,r);var e=Ic(t);function t(){var n;Ec(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),$o(Nr(n),"priority",80),$o(Nr(n),"incompatibleTokens",["a","b","t","T"]),n}return Rc(t,[{key:"parse",value:function(o,i,a){switch(i){case"B":case"BB":case"BBB":return a.dayPeriod(o,{width:"abbreviated",context:"formatting"})||a.dayPeriod(o,{width:"narrow",context:"formatting"});case"BBBBB":return a.dayPeriod(o,{width:"narrow",context:"formatting"});case"BBBB":default:return a.dayPeriod(o,{width:"wide",context:"formatting"})||a.dayPeriod(o,{width:"abbreviated",context:"formatting"})||a.dayPeriod(o,{width:"narrow",context:"formatting"})}}},{key:"set",value:function(o,i,a){return o.setUTCHours(hn(a),0,0,0),o}}]),t}(p);function Qe(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Qe=function(t){return typeof t}:Qe=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Qe(r)}function Yc(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function ko(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Lc(r,e,t){return e&&ko(r.prototype,e),t&&ko(r,t),r}function zc(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Yr(r,e)}function Yr(r,e){return Yr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Yr(r,e)}function Uc(r){var e=Hc();return function(){var n=$t(r),o;if(e){var i=$t(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Wc(this,o)}}function Wc(r,e){return e&&(Qe(e)==="object"||typeof e=="function")?e:Lr(r)}function Lr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Hc(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function $t(r){return $t=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},$t(r)}function Eo(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var qc=function(r){zc(t,r);var e=Uc(t);function t(){var n;Yc(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Eo(Lr(n),"priority",70),Eo(Lr(n),"incompatibleTokens",["H","K","k","t","T"]),n}return Lc(t,[{key:"parse",value:function(o,i,a){switch(i){case"h":return g(w.hour12h,o);case"ho":return a.ordinalNumber(o,{unit:"hour"});default:return b(i.length,o)}}},{key:"validate",value:function(o,i){return i>=1&&i<=12}},{key:"set",value:function(o,i,a){var s=o.getUTCHours()>=12;return s&&a<12?o.setUTCHours(a+12,0,0,0):!s&&a===12?o.setUTCHours(0,0,0,0):o.setUTCHours(a,0,0,0),o}}]),t}(p);function Xe(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Xe=function(t){return typeof t}:Xe=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Xe(r)}function jc(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Ro(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Vc(r,e,t){return e&&Ro(r.prototype,e),t&&Ro(r,t),r}function Qc(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&zr(r,e)}function zr(r,e){return zr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},zr(r,e)}function Xc(r){var e=Kc();return function(){var n=kt(r),o;if(e){var i=kt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Gc(this,o)}}function Gc(r,e){return e&&(Xe(e)==="object"||typeof e=="function")?e:Ur(r)}function Ur(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Kc(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function kt(r){return kt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},kt(r)}function Mo(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Jc=function(r){Qc(t,r);var e=Xc(t);function t(){var n;jc(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Mo(Ur(n),"priority",70),Mo(Ur(n),"incompatibleTokens",["a","b","h","K","k","t","T"]),n}return Vc(t,[{key:"parse",value:function(o,i,a){switch(i){case"H":return g(w.hour23h,o);case"Ho":return a.ordinalNumber(o,{unit:"hour"});default:return b(i.length,o)}}},{key:"validate",value:function(o,i){return i>=0&&i<=23}},{key:"set",value:function(o,i,a){return o.setUTCHours(a,0,0,0),o}}]),t}(p);function Ge(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ge=function(t){return typeof t}:Ge=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ge(r)}function Zc(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Io(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function ef(r,e,t){return e&&Io(r.prototype,e),t&&Io(r,t),r}function tf(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Wr(r,e)}function Wr(r,e){return Wr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Wr(r,e)}function rf(r){var e=of();return function(){var n=Et(r),o;if(e){var i=Et(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return nf(this,o)}}function nf(r,e){return e&&(Ge(e)==="object"||typeof e=="function")?e:Hr(r)}function Hr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function of(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Et(r){return Et=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Et(r)}function Fo(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var af=function(r){tf(t,r);var e=rf(t);function t(){var n;Zc(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Fo(Hr(n),"priority",70),Fo(Hr(n),"incompatibleTokens",["h","H","k","t","T"]),n}return ef(t,[{key:"parse",value:function(o,i,a){switch(i){case"K":return g(w.hour11h,o);case"Ko":return a.ordinalNumber(o,{unit:"hour"});default:return b(i.length,o)}}},{key:"validate",value:function(o,i){return i>=0&&i<=11}},{key:"set",value:function(o,i,a){var s=o.getUTCHours()>=12;return s&&a<12?o.setUTCHours(a+12,0,0,0):o.setUTCHours(a,0,0,0),o}}]),t}(p);function Ke(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ke=function(t){return typeof t}:Ke=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ke(r)}function sf(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Bo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function lf(r,e,t){return e&&Bo(r.prototype,e),t&&Bo(r,t),r}function uf(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&qr(r,e)}function qr(r,e){return qr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},qr(r,e)}function cf(r){var e=df();return function(){var n=Rt(r),o;if(e){var i=Rt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return ff(this,o)}}function ff(r,e){return e&&(Ke(e)==="object"||typeof e=="function")?e:jr(r)}function jr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function df(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Rt(r){return Rt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Rt(r)}function No(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var hf=function(r){uf(t,r);var e=cf(t);function t(){var n;sf(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),No(jr(n),"priority",70),No(jr(n),"incompatibleTokens",["a","b","h","H","K","t","T"]),n}return lf(t,[{key:"parse",value:function(o,i,a){switch(i){case"k":return g(w.hour24h,o);case"ko":return a.ordinalNumber(o,{unit:"hour"});default:return b(i.length,o)}}},{key:"validate",value:function(o,i){return i>=1&&i<=24}},{key:"set",value:function(o,i,a){var s=a<=24?a%24:a;return o.setUTCHours(s,0,0,0),o}}]),t}(p);function Je(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Je=function(t){return typeof t}:Je=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Je(r)}function pf(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Yo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function mf(r,e,t){return e&&Yo(r.prototype,e),t&&Yo(r,t),r}function yf(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Vr(r,e)}function Vr(r,e){return Vr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Vr(r,e)}function _f(r){var e=gf();return function(){var n=Mt(r),o;if(e){var i=Mt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return vf(this,o)}}function vf(r,e){return e&&(Je(e)==="object"||typeof e=="function")?e:Qr(r)}function Qr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function gf(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Mt(r){return Mt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Mt(r)}function Lo(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var bf=function(r){yf(t,r);var e=_f(t);function t(){var n;pf(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Lo(Qr(n),"priority",60),Lo(Qr(n),"incompatibleTokens",["t","T"]),n}return mf(t,[{key:"parse",value:function(o,i,a){switch(i){case"m":return g(w.minute,o);case"mo":return a.ordinalNumber(o,{unit:"minute"});default:return b(i.length,o)}}},{key:"validate",value:function(o,i){return i>=0&&i<=59}},{key:"set",value:function(o,i,a){return o.setUTCMinutes(a,0,0),o}}]),t}(p);function Ze(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ze=function(t){return typeof t}:Ze=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Ze(r)}function wf(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function zo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Af(r,e,t){return e&&zo(r.prototype,e),t&&zo(r,t),r}function Of(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Xr(r,e)}function Xr(r,e){return Xr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Xr(r,e)}function xf(r){var e=Df();return function(){var n=It(r),o;if(e){var i=It(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Pf(this,o)}}function Pf(r,e){return e&&(Ze(e)==="object"||typeof e=="function")?e:Gr(r)}function Gr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Df(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function It(r){return It=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},It(r)}function Uo(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Tf=function(r){Of(t,r);var e=xf(t);function t(){var n;wf(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Uo(Gr(n),"priority",50),Uo(Gr(n),"incompatibleTokens",["t","T"]),n}return Af(t,[{key:"parse",value:function(o,i,a){switch(i){case"s":return g(w.second,o);case"so":return a.ordinalNumber(o,{unit:"second"});default:return b(i.length,o)}}},{key:"validate",value:function(o,i){return i>=0&&i<=59}},{key:"set",value:function(o,i,a){return o.setUTCSeconds(a,0),o}}]),t}(p);function et(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?et=function(t){return typeof t}:et=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},et(r)}function Cf(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Wo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Sf(r,e,t){return e&&Wo(r.prototype,e),t&&Wo(r,t),r}function $f(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Kr(r,e)}function Kr(r,e){return Kr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Kr(r,e)}function kf(r){var e=Rf();return function(){var n=Ft(r),o;if(e){var i=Ft(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Ef(this,o)}}function Ef(r,e){return e&&(et(e)==="object"||typeof e=="function")?e:Jr(r)}function Jr(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Rf(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Ft(r){return Ft=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Ft(r)}function Ho(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Mf=function(r){$f(t,r);var e=kf(t);function t(){var n;Cf(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Ho(Jr(n),"priority",30),Ho(Jr(n),"incompatibleTokens",["t","T"]),n}return Sf(t,[{key:"parse",value:function(o,i){var a=function(l){return Math.floor(l*Math.pow(10,-i.length+3))};return A(b(i.length,o),a)}},{key:"set",value:function(o,i,a){return o.setUTCMilliseconds(a),o}}]),t}(p);function tt(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?tt=function(t){return typeof t}:tt=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},tt(r)}function If(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function qo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Ff(r,e,t){return e&&qo(r.prototype,e),t&&qo(r,t),r}function Bf(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&Zr(r,e)}function Zr(r,e){return Zr=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},Zr(r,e)}function Nf(r){var e=Lf();return function(){var n=Bt(r),o;if(e){var i=Bt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Yf(this,o)}}function Yf(r,e){return e&&(tt(e)==="object"||typeof e=="function")?e:en(r)}function en(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Lf(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Bt(r){return Bt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Bt(r)}function jo(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var zf=function(r){Bf(t,r);var e=Nf(t);function t(){var n;If(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),jo(en(n),"priority",10),jo(en(n),"incompatibleTokens",["t","T","x"]),n}return Ff(t,[{key:"parse",value:function(o,i){switch(i){case"X":return z(L.basicOptionalMinutes,o);case"XX":return z(L.basic,o);case"XXXX":return z(L.basicOptionalSeconds,o);case"XXXXX":return z(L.extendedOptionalSeconds,o);case"XXX":default:return z(L.extended,o)}}},{key:"set",value:function(o,i,a){return i.timestampIsSet?o:new Date(o.getTime()-a)}}]),t}(p);function rt(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?rt=function(t){return typeof t}:rt=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},rt(r)}function Uf(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Vo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Wf(r,e,t){return e&&Vo(r.prototype,e),t&&Vo(r,t),r}function Hf(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&tn(r,e)}function tn(r,e){return tn=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},tn(r,e)}function qf(r){var e=Vf();return function(){var n=Nt(r),o;if(e){var i=Nt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return jf(this,o)}}function jf(r,e){return e&&(rt(e)==="object"||typeof e=="function")?e:rn(r)}function rn(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function Vf(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Nt(r){return Nt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Nt(r)}function Qo(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var Qf=function(r){Hf(t,r);var e=qf(t);function t(){var n;Uf(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Qo(rn(n),"priority",10),Qo(rn(n),"incompatibleTokens",["t","T","X"]),n}return Wf(t,[{key:"parse",value:function(o,i){switch(i){case"x":return z(L.basicOptionalMinutes,o);case"xx":return z(L.basic,o);case"xxxx":return z(L.basicOptionalSeconds,o);case"xxxxx":return z(L.extendedOptionalSeconds,o);case"xxx":default:return z(L.extended,o)}}},{key:"set",value:function(o,i,a){return i.timestampIsSet?o:new Date(o.getTime()-a)}}]),t}(p);function nt(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?nt=function(t){return typeof t}:nt=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},nt(r)}function Xf(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Xo(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function Gf(r,e,t){return e&&Xo(r.prototype,e),t&&Xo(r,t),r}function Kf(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&nn(r,e)}function nn(r,e){return nn=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},nn(r,e)}function Jf(r){var e=ed();return function(){var n=Yt(r),o;if(e){var i=Yt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return Zf(this,o)}}function Zf(r,e){return e&&(nt(e)==="object"||typeof e=="function")?e:on(r)}function on(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function ed(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Yt(r){return Yt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Yt(r)}function Go(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var td=function(r){Kf(t,r);var e=Jf(t);function t(){var n;Xf(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Go(on(n),"priority",40),Go(on(n),"incompatibleTokens","*"),n}return Gf(t,[{key:"parse",value:function(o){return Li(o)}},{key:"set",value:function(o,i,a){return[new Date(a*1e3),{timestampIsSet:!0}]}}]),t}(p);function ot(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?ot=function(t){return typeof t}:ot=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},ot(r)}function rd(r,e){if(!(r instanceof e))throw new TypeError("Cannot call a class as a function")}function Ko(r,e){for(var t=0;t<e.length;t++){var n=e[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(r,n.key,n)}}function nd(r,e,t){return e&&Ko(r.prototype,e),t&&Ko(r,t),r}function od(r,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(e&&e.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),e&&an(r,e)}function an(r,e){return an=Object.setPrototypeOf||function(n,o){return n.__proto__=o,n},an(r,e)}function id(r){var e=sd();return function(){var n=Lt(r),o;if(e){var i=Lt(this).constructor;o=Reflect.construct(n,arguments,i)}else o=n.apply(this,arguments);return ad(this,o)}}function ad(r,e){return e&&(ot(e)==="object"||typeof e=="function")?e:sn(r)}function sn(r){if(r===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return r}function sd(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Lt(r){return Lt=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},Lt(r)}function Jo(r,e,t){return e in r?Object.defineProperty(r,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):r[e]=t,r}var ld=function(r){od(t,r);var e=id(t);function t(){var n;rd(this,t);for(var o=arguments.length,i=new Array(o),a=0;a<o;a++)i[a]=arguments[a];return n=e.call.apply(e,[this].concat(i)),Jo(sn(n),"priority",20),Jo(sn(n),"incompatibleTokens","*"),n}return nd(t,[{key:"parse",value:function(o){return Li(o)}},{key:"set",value:function(o,i,a){return[new Date(a),{timestampIsSet:!0}]}}]),t}(p),ud={G:new il,y:new ml,Y:new Al,R:new Sl,u:new Fl,Q:new Wl,q:new Gl,M:new nu,L:new cu,w:new vu,I:new Du,d:new Iu,D:new Uu,E:new Xu,e:new rc,c:new uc,i:new _c,a:new xc,b:new kc,B:new Nc,h:new qc,H:new Jc,K:new af,k:new hf,m:new bf,s:new Tf,S:new Mf,X:new zf,x:new Qf,t:new td,T:new ld};function it(r){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?it=function(t){return typeof t}:it=function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},it(r)}function Zo(r,e){var t;if(typeof Symbol>"u"||r[Symbol.iterator]==null){if(Array.isArray(r)||(t=cd(r))||e&&r&&typeof r.length=="number"){t&&(r=t);var n=0,o=function(){};return{s:o,n:function(){return n>=r.length?{done:!0}:{done:!1,value:r[n++]}},e:function(u){throw u},f:o}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var i=!0,a=!1,s;return{s:function(){t=r[Symbol.iterator]()},n:function(){var u=t.next();return i=u.done,u},e:function(u){a=!0,s=u},f:function(){try{!i&&t.return!=null&&t.return()}finally{if(a)throw s}}}}function cd(r,e){if(r){if(typeof r=="string")return ei(r,e);var t=Object.prototype.toString.call(r).slice(8,-1);if(t==="Object"&&r.constructor&&(t=r.constructor.name),t==="Map"||t==="Set")return Array.from(r);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return ei(r,e)}}function ei(r,e){(e==null||e>r.length)&&(e=r.length);for(var t=0,n=new Array(e);t<e;t++)n[t]=r[t];return n}var fd=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,dd=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,hd=/^'([^]*?)'?$/,pd=/''/g,md=/\S/,yd=/[a-zA-Z]/;function ti(r,e,t,n){var o,i,a,s,l,u,f,c,d,h,_,D,v,E,W,K,J,ae;P(3,arguments);var R=String(r),N=String(e),H=ie(),j=(o=(i=n==null?void 0:n.locale)!==null&&i!==void 0?i:H.locale)!==null&&o!==void 0?o:Fi;if(!j.match)throw new RangeError("locale must contain match property");var V=M((a=(s=(l=(u=n==null?void 0:n.firstWeekContainsDate)!==null&&u!==void 0?u:n==null||(f=n.locale)===null||f===void 0||(c=f.options)===null||c===void 0?void 0:c.firstWeekContainsDate)!==null&&l!==void 0?l:H.firstWeekContainsDate)!==null&&s!==void 0?s:(d=H.locale)===null||d===void 0||(h=d.options)===null||h===void 0?void 0:h.firstWeekContainsDate)!==null&&a!==void 0?a:1);if(!(V>=1&&V<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var se=M((_=(D=(v=(E=n==null?void 0:n.weekStartsOn)!==null&&E!==void 0?E:n==null||(W=n.locale)===null||W===void 0||(K=W.options)===null||K===void 0?void 0:K.weekStartsOn)!==null&&v!==void 0?v:H.weekStartsOn)!==null&&D!==void 0?D:(J=H.locale)===null||J===void 0||(ae=J.options)===null||ae===void 0?void 0:ae.weekStartsOn)!==null&&_!==void 0?_:0);if(!(se>=0&&se<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(N==="")return R===""?k(t):new Date(NaN);var le={firstWeekContainsDate:V,weekStartsOn:se,locale:j},ue=[new Gs],Ut=N.match(dd).map(function(C){var y=C[0];if(y in Kt){var B=Kt[y];return B(C,j.formatLong)}return C}).join("").match(fd),$=[],F=Zo(Ut),Z;try{var Wi=function(){var y=Z.value;!(n!=null&&n.useAdditionalWeekYearTokens)&&Ii(y)&&st(y,N,r),!(n!=null&&n.useAdditionalDayOfYearTokens)&&Mi(y)&&st(y,N,r);var B=y[0],ve=ud[B];if(ve){var gn=ve.incompatibleTokens;if(Array.isArray(gn)){var bn=$.find(function(wn){return gn.includes(wn.token)||wn.token===B});if(bn)throw new RangeError("The format string mustn't contain `".concat(bn.fullToken,"` and `").concat(y,"` at the same time"))}else if(ve.incompatibleTokens==="*"&&$.length>0)throw new RangeError("The format string mustn't contain `".concat(y,"` and any other token at the same time"));$.push({token:B,fullToken:y});var Ht=ve.run(R,y,j.match,le);if(!Ht)return{v:new Date(NaN)};ue.push(Ht.setter),R=Ht.rest}else{if(B.match(yd))throw new RangeError("Format string contains an unescaped latin alphabet character `"+B+"`");if(y==="''"?y="'":B==="'"&&(y=_d(y)),R.indexOf(y)===0)R=R.slice(y.length);else return{v:new Date(NaN)}}};for(F.s();!(Z=F.n()).done;){var mn=Wi();if(it(mn)==="object")return mn.v}}catch(C){F.e(C)}finally{F.f()}if(R.length>0&&md.test(R))return new Date(NaN);var Hi=ue.map(function(C){return C.priority}).sort(function(C,y){return y-C}).filter(function(C,y,B){return B.indexOf(C)===y}).map(function(C){return ue.filter(function(y){return y.priority===C}).sort(function(y,B){return B.subPriority-y.subPriority})}).map(function(C){return C[0]}),Wt=k(t);if(isNaN(Wt.getTime()))return new Date(NaN);var ce=Ci(Wt,Ri(Wt)),yn={},ye=Zo(Hi),_n;try{for(ye.s();!(_n=ye.n()).done;){var vn=_n.value;if(!vn.validate(ce,le))return new Date(NaN);var _e=vn.set(ce,yn,le);Array.isArray(_e)?(ce=_e[0],qs(yn,_e[1])):ce=_e}}catch(C){ye.e(C)}finally{ye.f()}return ce}function _d(r){return r.match(hd)[1].replace(pd,"'")}(function(){const r=function(e){return window.Vaadin.Flow.tryCatchWrapper(e,"Vaadin Date Picker")};window.Vaadin.Flow.datepickerConnector={initLazy:e=>r(function(t){if(t.$connector)return;t.$connector={};const n=function(a){try{new Date().toLocaleDateString(a)}catch{return console.warn("The locale is not supported, using default format setting (ISO 8601)."),"yyyy-MM-dd"}let l=new Date(Date.UTC(1234,4,6)).toLocaleDateString(a,{timeZone:"UTC"});return l=l.replace(/([a-zA-Z]+)/g,"'$1'").replace("06","dd").replace("6","d").replace("05","MM").replace("5","M").replace("1234","yyyy"),l.includes("d")&&l.includes("M")&&l.includes("y")?l:(console.warn("The locale is not supported, using default format setting (ISO 8601)."),"yyyy-MM-dd")},o=r(function(a){if(!a||a.length===0)throw new Error("Array of custom date formats is null or empty");function s(c){if(c.includes("yyyy")&&!c.includes("yyyyy"))return c.replace("yyyy","yy");if(c.includes("YYYY")&&!c.includes("YYYYY"))return c.replace("YYYY","YY")}function l(c){return c.includes("y")?!c.includes("yyy"):c.includes("Y")?!c.includes("YYY"):!1}function u(c){const d=a[0],h=ne(`${c.year}-${c.month+1}-${c.day}`);return Ws(h,d)}function f(c){const d=i();for(let h of a){const _=s(h);if(_){const v=ti(c,_,d);if(Gt(v)){let E=v.getFullYear();return t.$connector._lastParsedYear&&E===t.$connector._lastParsedYear%100&&(E=t.$connector._lastParsedYear),{day:v.getDate(),month:v.getMonth(),year:E}}}const D=ti(c,h,d);if(Gt(D)){let v=D.getFullYear();return t.$connector._lastParsedYear&&v%100===t.$connector._lastParsedYear%100&&l(h)?v=t.$connector._lastParsedYear:t.$connector._lastParsedYear=v,{day:D.getDate(),month:D.getMonth(),year:v}}}return t.$connector._lastParsedYear=void 0,!1}return{formatDate:u,parseDate:f}});function i(){const{referenceDate:a}=t.i18n;return a?new Date(a.year,a.month,a.day):new Date}t.$connector.updateI18n=r(function(a,s){const l=s&&s.dateFormats&&s.dateFormats.length>0;s&&s.referenceDate&&(s.referenceDate=un(new Date(s.referenceDate)));const u=l?s.dateFormats:[n(a)],f=o(u);t.i18n=Object.assign({},t.i18n,s,f)})})(e)}})();/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const vd=x`
  [part='input-field'],
  [part='input-field'] ::slotted(textarea) {
    height: auto;
    box-sizing: border-box;
  }

  [part='input-field'] {
    /* Equal to the implicit padding in vaadin-text-field */
    padding-top: calc((var(--lumo-text-field-size) - 1em * var(--lumo-line-height-s)) / 2);
    padding-bottom: calc((var(--lumo-text-field-size) - 1em * var(--lumo-line-height-s)) / 2);
    transition: background-color 0.1s;
    line-height: var(--lumo-line-height-s);
  }

  :host(:not([readonly])) [part='input-field']::after {
    display: none;
  }

  :host([readonly]) [part='input-field'] {
    border: 1px dashed var(--lumo-contrast-30pct);
  }

  :host([readonly]) [part='input-field']::after {
    border: none;
  }

  :host(:hover:not([readonly]):not([focused]):not([invalid])) [part='input-field'] {
    background-color: var(--lumo-contrast-20pct);
  }

  @media (pointer: coarse) {
    :host(:hover:not([readonly]):not([focused]):not([invalid])) [part='input-field'] {
      background-color: var(--lumo-contrast-10pct);
    }

    :host(:active:not([readonly]):not([focused])) [part='input-field'] {
      background-color: var(--lumo-contrast-20pct);
    }
  }

  [part='input-field'] ::slotted(textarea) {
    line-height: inherit;
    --_lumo-text-field-overflow-mask-image: none;
  }

  /* Vertically align icon prefix/suffix with the first line of text */
  [part='input-field'] ::slotted(vaadin-icon) {
    margin-top: calc((var(--lumo-icon-size-m) - 1em * var(--lumo-line-height-s)) / -2);
  }
`;O("vaadin-text-area",[di,vd],{moduleId:"lumo-text-area"});/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class gd extends U{constructor(e,t){super(e,"textarea","textarea",{initializer:(n,o)=>{const i=o.getAttribute("value");i&&(n.value=i);const a=o.getAttribute("name");a&&n.setAttribute("name",a),n.id=this.defaultId,typeof t=="function"&&t(n)},useUniqueId:!0})}}/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const bd=r=>class extends vi(va(r)){static get properties(){return{maxlength:{type:Number},minlength:{type:Number},pattern:{type:String}}}static get delegateAttrs(){return[...super.delegateAttrs,"maxlength","minlength","pattern"]}static get constraints(){return[...super.constraints,"maxlength","minlength","pattern"]}get clearElement(){return this.$.clearButton}_onResize(){this.__scrollPositionUpdated()}_onScroll(){this.__scrollPositionUpdated()}ready(){super.ready(),this.addController(new gd(this,t=>{this._setInputElement(t),this._setFocusElement(t),this.stateTarget=t,this.ariaTarget=t})),this.addController(new yi(this.inputElement,this._labelController)),this.addEventListener("animationend",this._onAnimationEnd),this._inputField=this.shadowRoot.querySelector("[part=input-field]"),this._inputField.addEventListener("wheel",t=>{const n=this._inputField.scrollTop;this._inputField.scrollTop+=t.deltaY,n!==this._inputField.scrollTop&&(t.preventDefault(),this.__scrollPositionUpdated())}),this._updateHeight(),this.__scrollPositionUpdated()}__scrollPositionUpdated(){this._inputField.style.setProperty("--_text-area-vertical-scroll-position","0px"),this._inputField.style.setProperty("--_text-area-vertical-scroll-position",`${this._inputField.scrollTop}px`)}_onAnimationEnd(t){t.animationName.indexOf("vaadin-text-area-appear")===0&&this._updateHeight()}_valueChanged(t,n){super._valueChanged(t,n),this._updateHeight()}_updateHeight(){const t=this.inputElement,n=this._inputField;if(!t||!n)return;const o=n.scrollTop,i=this.value?this.value.length:0;if(this._oldValueLength>=i){const s=getComputedStyle(n).height,l=getComputedStyle(t).width;n.style.display="block",n.style.height=s,t.style.maxWidth=l,t.style.height="auto"}this._oldValueLength=i;const a=t.scrollHeight;a>t.clientHeight&&(t.style.height=`${a}px`),t.style.removeProperty("max-width"),n.style.removeProperty("display"),n.style.removeProperty("height"),n.scrollTop=o}checkValidity(){if(!super.checkValidity())return!1;if(!this.pattern||!this.inputElement.value)return!0;try{const t=this.inputElement.value.match(this.pattern);return t?t[0]===t.input:!1}catch{return!0}}};/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const wd=x`
  :host {
    animation: 1ms vaadin-text-area-appear;
  }

  .vaadin-text-area-container {
    flex: auto;
  }

  /* The label, helper text and the error message should neither grow nor shrink. */
  [part='label'],
  [part='helper-text'],
  [part='error-message'] {
    flex: none;
  }

  [part='input-field'] {
    flex: auto;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  ::slotted(textarea) {
    -webkit-appearance: none;
    -moz-appearance: none;
    flex: auto;
    overflow: hidden;
    width: 100%;
    height: 100%;
    outline: none;
    resize: none;
    margin: 0;
    padding: 0 0.25em;
    border: 0;
    border-radius: 0;
    min-width: 0;
    font: inherit;
    font-size: 1em;
    line-height: normal;
    color: inherit;
    background-color: transparent;
    /* Disable default invalid style in Firefox */
    box-shadow: none;
  }

  /* Override styles from <vaadin-input-container> */
  [part='input-field'] ::slotted(textarea) {
    align-self: stretch;
    white-space: pre-wrap;
  }

  [part='input-field'] ::slotted(:not(textarea)) {
    align-self: flex-start;
  }

  /* Workaround https://bugzilla.mozilla.org/show_bug.cgi?id=1739079 */
  :host([disabled]) ::slotted(textarea) {
    user-select: none;
  }

  @keyframes vaadin-text-area-appear {
    to {
      opacity: 1;
    }
  }
`;/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */O("vaadin-text-area",[mi,wd],{moduleId:"vaadin-text-area-styles"});class ri extends bd(I(G(S))){static get is(){return"vaadin-text-area"}static get template(){return T`
      <div class="vaadin-text-area-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          readonly="[[readonly]]"
          disabled="[[disabled]]"
          invalid="[[invalid]]"
          theme$="[[_theme]]"
          on-scroll="_onScroll"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="textarea"></slot>
          <slot name="suffix" slot="suffix"></slot>
          <div id="clearButton" part="clear-button" slot="suffix" aria-hidden="true"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>

      <slot name="tooltip"></slot>
    `}ready(){super.ready(),this._tooltipController=new _i(this),this._tooltipController.setPosition("top"),this.addController(this._tooltipController)}}customElements.define(ri.is,ri);O("vaadin-notification-card",x`
    :host {
      position: relative;
      margin: var(--lumo-space-s);
    }

    [part='overlay'] {
      background: var(--lumo-base-color) linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct));
      border-radius: var(--lumo-border-radius-l);
      box-shadow: 0 0 0 1px var(--lumo-contrast-10pct), var(--lumo-box-shadow-l);
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
      font-weight: 400;
      line-height: var(--lumo-line-height-s);
      letter-spacing: 0;
      text-transform: none;
      -webkit-text-size-adjust: 100%;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    [part='content'] {
      padding: var(--lumo-space-wide-l);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    [part='content'] ::slotted(vaadin-button) {
      flex: none;
      margin: 0 calc(var(--lumo-space-s) * -1) 0 var(--lumo-space-m);
    }

    :host([slot^='middle']) {
      max-width: 80vw;
      margin: var(--lumo-space-s) auto;
    }

    :host([slot\$='stretch']) {
      margin: 0;
    }

    :host([slot\$='stretch']) [part='overlay'] {
      border-radius: 0;
    }

    @media (min-width: 421px) {
      :host(:not([slot\$='stretch'])) {
        display: flex;
      }

      :host([slot\$='end']) {
        justify-content: flex-end;
      }

      :host([slot^='middle']),
      :host([slot\$='center']) {
        display: flex;
        justify-content: center;
      }
    }

    @keyframes lumo-notification-exit-fade-out {
      100% {
        opacity: 0;
      }
    }

    @keyframes lumo-notification-enter-fade-in {
      0% {
        opacity: 0;
      }
    }

    @keyframes lumo-notification-enter-slide-down {
      0% {
        transform: translateY(-200%);
        opacity: 0;
      }
    }

    @keyframes lumo-notification-exit-slide-up {
      100% {
        transform: translateY(-200%);
        opacity: 0;
      }
    }

    @keyframes lumo-notification-enter-slide-up {
      0% {
        transform: translateY(200%);
        opacity: 0;
      }
    }

    @keyframes lumo-notification-exit-slide-down {
      100% {
        transform: translateY(200%);
        opacity: 0;
      }
    }

    :host([slot='middle'][opening]) {
      animation: lumo-notification-enter-fade-in 300ms;
    }

    :host([slot='middle'][closing]) {
      animation: lumo-notification-exit-fade-out 300ms;
    }

    :host([slot^='top'][opening]) {
      animation: lumo-notification-enter-slide-down 300ms;
    }

    :host([slot^='top'][closing]) {
      animation: lumo-notification-exit-slide-up 300ms;
    }

    :host([slot^='bottom'][opening]) {
      animation: lumo-notification-enter-slide-up 300ms;
    }

    :host([slot^='bottom'][closing]) {
      animation: lumo-notification-exit-slide-down 300ms;
    }

    :host([theme~='primary']) [part='overlay'] {
      background: var(--lumo-primary-color);
      color: var(--lumo-primary-contrast-color);
      box-shadow: var(--lumo-box-shadow-l);
    }

    :host([theme~='primary']) {
      --_lumo-button-background-color: var(--lumo-shade-20pct);
      --_lumo-button-color: var(--lumo-primary-contrast-color);
      --_lumo-button-primary-background-color: var(--lumo-primary-contrast-color);
      --_lumo-button-primary-color: var(--lumo-primary-text-color);
    }

    :host([theme~='contrast']) [part='overlay'] {
      background: var(--lumo-contrast);
      color: var(--lumo-base-color);
      box-shadow: var(--lumo-box-shadow-l);
    }

    :host([theme~='contrast']) {
      --_lumo-button-background-color: var(--lumo-contrast-20pct);
      --_lumo-button-color: var(--lumo-base-color);
      --_lumo-button-primary-background-color: var(--lumo-base-color);
      --_lumo-button-primary-color: var(--lumo-contrast);
    }

    :host([theme~='success']) [part='overlay'] {
      background: var(--lumo-success-color);
      color: var(--lumo-success-contrast-color);
      box-shadow: var(--lumo-box-shadow-l);
    }

    :host([theme~='success']) {
      --_lumo-button-background-color: var(--lumo-shade-20pct);
      --_lumo-button-color: var(--lumo-success-contrast-color);
      --_lumo-button-primary-background-color: var(--lumo-success-contrast-color);
      --_lumo-button-primary-color: var(--lumo-success-text-color);
    }

    :host([theme~='error']) [part='overlay'] {
      background: var(--lumo-error-color);
      color: var(--lumo-error-contrast-color);
      box-shadow: var(--lumo-box-shadow-l);
    }

    :host([theme~='error']) {
      --_lumo-button-background-color: var(--lumo-shade-20pct);
      --_lumo-button-color: var(--lumo-error-contrast-color);
      --_lumo-button-primary-background-color: var(--lumo-error-contrast-color);
      --_lumo-button-primary-color: var(--lumo-error-text-color);
    }

    :host([theme~='warning']) [part='overlay'] {
      background: var(--lumo-warning-color);
      color: var(--lumo-warning-contrast-color);
      box-shadow: inset 0 0 0 1px var(--lumo-contrast-20pct), var(--lumo-box-shadow-l);
    }

    :host([theme~='warning']) {
      --_lumo-button-background-color: var(--lumo-shade-20pct);
      --_lumo-button-color: var(--lumo-warning-contrast-color);
      --_lumo-button-primary-background-color: var(--lumo-shade-50pct);
      --_lumo-button-primary-color: var(--lumo-primary-contrast-color);
    }
  `,{moduleId:"lumo-notification-card"});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class ni extends I(G(S)){static get template(){return T`
      <style>
        :host {
          position: fixed;
          z-index: 1000;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          box-sizing: border-box;

          display: flex;
          flex-direction: column;
          align-items: stretch;
          pointer-events: none;
        }

        [region-group] {
          flex: 1 1 0%;
          display: flex;
        }

        [region-group='top'] {
          align-items: flex-start;
        }

        [region-group='bottom'] {
          align-items: flex-end;
        }

        [region-group] > [region] {
          flex: 1 1 0%;
        }

        @media (max-width: 420px) {
          [region-group] {
            flex-direction: column;
            align-items: stretch;
          }

          [region-group='top'] {
            justify-content: flex-start;
          }

          [region-group='bottom'] {
            justify-content: flex-end;
          }

          [region-group] > [region] {
            flex: initial;
          }
        }
      </style>

      <div region="top-stretch"><slot name="top-stretch"></slot></div>
      <div region-group="top">
        <div region="top-start"><slot name="top-start"></slot></div>
        <div region="top-center"><slot name="top-center"></slot></div>
        <div region="top-end"><slot name="top-end"></slot></div>
      </div>
      <div region="middle"><slot name="middle"></slot></div>
      <div region-group="bottom">
        <div region="bottom-start"><slot name="bottom-start"></slot></div>
        <div region="bottom-center"><slot name="bottom-center"></slot></div>
        <div region="bottom-end"><slot name="bottom-end"></slot></div>
      </div>
      <div region="bottom-stretch"><slot name="bottom-stretch"></slot></div>
    `}static get is(){return"vaadin-notification-container"}static get properties(){return{opened:{type:Boolean,value:!1,observer:"_openedChanged"}}}constructor(){super(),this._boundVaadinOverlayClose=this._onVaadinOverlayClose.bind(this),pi&&(this._boundIosResizeListener=()=>this._detectIosNavbar())}_openedChanged(e){e?(document.body.appendChild(this),document.addEventListener("vaadin-overlay-close",this._boundVaadinOverlayClose),this._boundIosResizeListener&&(this._detectIosNavbar(),window.addEventListener("resize",this._boundIosResizeListener))):(document.body.removeChild(this),document.removeEventListener("vaadin-overlay-close",this._boundVaadinOverlayClose),this._boundIosResizeListener&&window.removeEventListener("resize",this._boundIosResizeListener))}_detectIosNavbar(){const e=window.innerHeight,n=window.innerWidth>e,o=document.documentElement.clientHeight;n&&o>e?this.style.bottom=`${o-e}px`:this.style.bottom="0"}_onVaadinOverlayClose(e){const t=e.detail.sourceEvent;t&&t.composedPath().indexOf(this)>=0&&e.preventDefault()}}class oi extends I(S){static get template(){return T`
      <style>
        :host {
          display: block;
        }

        [part='overlay'] {
          pointer-events: auto;
        }

        @media (forced-colors: active) {
          [part='overlay'] {
            outline: 3px solid;
          }
        }
      </style>

      <div part="overlay">
        <div part="content">
          <slot></slot>
        </div>
      </div>
    `}static get is(){return"vaadin-notification-card"}ready(){super.ready(),this.setAttribute("role","alert"),this.setAttribute("aria-live","polite")}}class Y extends ln(si(G(S))){static get template(){return T`
      <style>
        :host {
          display: none !important;
        }
      </style>
      <vaadin-notification-card theme$="[[_theme]]"> </vaadin-notification-card>
    `}static get is(){return"vaadin-notification"}static get properties(){return{duration:{type:Number,value:5e3},opened:{type:Boolean,value:!1,notify:!0,observer:"_openedChanged"},position:{type:String,value:"bottom-start",observer:"_positionChanged"},renderer:Function}}static get observers(){return["_durationChanged(duration, opened)","_rendererChanged(renderer, opened, _overlayElement)"]}static show(e,t){return ga(e)?Y._createAndShowNotification(n=>{bi(e,n)},t):Y._createAndShowNotification(n=>{n.innerText=e},t)}static _createAndShowNotification(e,t){const n=document.createElement(Y.is);return t&&Number.isFinite(t.duration)&&(n.duration=t.duration),t&&t.position&&(n.position=t.position),t&&t.theme&&n.setAttribute("theme",t.theme),n.renderer=e,document.body.appendChild(n),n.opened=!0,n.addEventListener("opened-changed",o=>{o.detail.value||n.remove()}),n}get _container(){return Y._container||(Y._container=document.createElement("vaadin-notification-container"),document.body.appendChild(Y._container)),Y._container}get _card(){return this._overlayElement}ready(){super.ready(),this._overlayElement=this.shadowRoot.querySelector("vaadin-notification-card"),li(this)}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected||(this.opened=!1)})}requestContentUpdate(){this.renderer&&this.renderer(this._card,this)}_rendererChanged(e,t,n){if(!n)return;const o=this._oldRenderer!==e;this._oldRenderer=e,o&&(n.innerHTML="",delete n._$litPart$),t&&(this._didAnimateNotificationAppend||this._animatedAppendNotificationCard(),this.requestContentUpdate())}open(){this.opened=!0}close(){this.opened=!1}_openedChanged(e){e?(this._container.opened=!0,this._animatedAppendNotificationCard()):this._card&&this._closeNotificationCard()}_animatedAppendNotificationCard(){if(this._card){this._card.setAttribute("opening",""),this._appendNotificationCard();const e=()=>{this._card.removeEventListener("animationend",e),this._card.removeAttribute("opening")};this._card.addEventListener("animationend",e),this._didAnimateNotificationAppend=!0}else this._didAnimateNotificationAppend=!1}_appendNotificationCard(){if(this._card){if(!this._container.shadowRoot.querySelector(`slot[name="${this.position}"]`)){console.warn(`Invalid alignment parameter provided: position=${this.position}`);return}this._card.slot=this.position,this._container.firstElementChild&&/top/u.test(this.position)?this._container.insertBefore(this._card,this._container.firstElementChild):this._container.appendChild(this._card)}}_removeNotificationCard(){this._card.parentNode&&this._card.parentNode.removeChild(this._card),this._card.removeAttribute("closing"),this._container.opened=!!this._container.firstElementChild}_closeNotificationCard(){this._durationTimeoutId&&clearTimeout(this._durationTimeoutId),this._animatedRemoveNotificationCard()}_animatedRemoveNotificationCard(){this._card.setAttribute("closing","");const e=getComputedStyle(this._card).getPropertyValue("animation-name");if(e&&e!=="none"){const t=()=>{this._removeNotificationCard(),this._card.removeEventListener("animationend",t)};this._card.addEventListener("animationend",t)}else this._removeNotificationCard()}_positionChanged(){this.opened&&this._animatedAppendNotificationCard()}_durationChanged(e,t){t&&(clearTimeout(this._durationTimeoutId),e>0&&(this._durationTimeoutId=setTimeout(()=>this.close(),e)))}}customElements.define(ni.is,ni);customElements.define(oi.is,oi);customElements.define(Y.is,Y);ba(wa.toString(),"CSSImport end",document);
