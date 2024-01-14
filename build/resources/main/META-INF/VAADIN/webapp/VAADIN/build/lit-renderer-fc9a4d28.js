import{_ as ft,i as D,D as pt,x as mt}from"./indexhtml-35887fc8.js";import{v as Ze,x as Xe,p as Se,I as T,a3 as oe,M as ge,P as B,F as K,r as P,a4 as gt,z as bt,a5 as vt,U as we,a6 as $e,a7 as Ct,B as yt,a8 as Je,O as xt,a9 as et,u as At,h as ie,T as ae,R as wt,aa as tt,ab as X,J,C as ze,a as be,b as Et,E as Re,ac as _e,G as ve,ad as it,c as It,ae as rt,af as St,ag as zt,ah as Rt,ai as Tt,N as kt,Z as Ot,_ as Ft,a0 as st,aj as fe,ak as Lt,al as $t,am as Dt,H as Pt,an as De,ao as Mt,ap as Bt,D as ce,aq as Pe,j as Me}from"./generated-flow-imports-89510b94.js";/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function ee(o){return o.__cells||Array.from(o.querySelectorAll('[part~="cell"]:not([part~="details-cell"])'))}function k(o,r){[...o.children].forEach(r)}function te(o,r){ee(o).forEach(r),o.__detailsCell&&r(o.__detailsCell)}function nt(o,r,e){let t=1;o.forEach(i=>{t%10===0&&(t+=1),i._order=e+t*r,t+=1})}function Ce(o,r,e){switch(typeof e){case"boolean":o.toggleAttribute(r,e);break;case"string":o.setAttribute(r,e);break;default:o.removeAttribute(r);break}}function W(o,r,e){r||r===""?Ze(o,"part",e):Xe(o,"part",e)}function G(o,r,e){o.forEach(t=>{W(t,e,r)})}function ne(o,r){const e=ee(o);Object.entries(r).forEach(([t,i])=>{Ce(o,t,i);const s=`${t}-row`;W(o,i,s),G(e,`${s}-cell`,i)})}function Be(o,r){const e=ee(o);Object.entries(r).forEach(([t,i])=>{const s=o.getAttribute(t);if(Ce(o,t,i),s){const n=`${t}-${s}-row`;W(o,!1,n),G(e,`${n}-cell`,!1)}if(i){const n=`${t}-${i}-row`;W(o,i,n),G(e,`${n}-cell`,i)}})}function U(o,r,e,t,i){Ce(o,r,e),i&&W(o,!1,i),W(o,e,t||`${r}-cell`)}/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ot=o=>class extends o{static get properties(){return{resizable:{type:Boolean,value(){if(this.localName==="vaadin-grid-column-group")return;const e=this.parentNode;return e&&e.localName==="vaadin-grid-column-group"&&e.resizable||!1}},frozen:{type:Boolean,value:!1},frozenToEnd:{type:Boolean,value:!1},hidden:{type:Boolean,value:!1},header:{type:String},textAlign:{type:String},_lastFrozen:{type:Boolean,value:!1},_bodyContentHidden:{type:Boolean,value:!1},_firstFrozenToEnd:{type:Boolean,value:!1},_order:Number,_reorderStatus:Boolean,_emptyCells:Array,_headerCell:Object,_footerCell:Object,_grid:Object,__initialized:{type:Boolean,value:!0},headerRenderer:Function,_headerRenderer:{type:Function,computed:"_computeHeaderRenderer(headerRenderer, header, __initialized)"},footerRenderer:Function,_footerRenderer:{type:Function,computed:"_computeFooterRenderer(footerRenderer, __initialized)"},__gridColumnElement:{type:Boolean,value:!0}}}static get observers(){return["_widthChanged(width, _headerCell, _footerCell, _cells.*)","_frozenChanged(frozen, _headerCell, _footerCell, _cells.*)","_frozenToEndChanged(frozenToEnd, _headerCell, _footerCell, _cells.*)","_flexGrowChanged(flexGrow, _headerCell, _footerCell, _cells.*)","_textAlignChanged(textAlign, _cells.*, _headerCell, _footerCell)","_orderChanged(_order, _headerCell, _footerCell, _cells.*)","_lastFrozenChanged(_lastFrozen)","_firstFrozenToEndChanged(_firstFrozenToEnd)","_onRendererOrBindingChanged(_renderer, _cells, _bodyContentHidden, _cells.*, path)","_onHeaderRendererOrBindingChanged(_headerRenderer, _headerCell, path, header)","_onFooterRendererOrBindingChanged(_footerRenderer, _footerCell)","_resizableChanged(resizable, _headerCell)","_reorderStatusChanged(_reorderStatus, _headerCell, _footerCell, _cells.*)","_hiddenChanged(hidden, _headerCell, _footerCell, _cells.*)"]}get _grid(){return this._gridValue||(this._gridValue=this._findHostGrid()),this._gridValue}get _allCells(){return[].concat(this._cells||[]).concat(this._emptyCells||[]).concat(this._headerCell).concat(this._footerCell).filter(e=>e)}connectedCallback(){super.connectedCallback(),requestAnimationFrame(()=>{this._grid&&this._allCells.forEach(e=>{e._content.parentNode||this._grid.appendChild(e._content)})})}disconnectedCallback(){super.disconnectedCallback(),requestAnimationFrame(()=>{this._grid||this._allCells.forEach(e=>{e._content.parentNode&&e._content.parentNode.removeChild(e._content)})}),this._gridValue=void 0}ready(){super.ready(),Se(this)}_findHostGrid(){let e=this;for(;e&&!/^vaadin.*grid(-pro)?$/u.test(e.localName);)e=e.assignedSlot?e.assignedSlot.parentNode:e.parentNode;return e||void 0}_renderHeaderAndFooter(){this._renderHeaderCellContent(this._headerRenderer,this._headerCell),this._renderFooterCellContent(this._footerRenderer,this._footerCell)}_flexGrowChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("flexGrow"),this._allCells.forEach(t=>{t.style.flexGrow=e})}_orderChanged(e){this._allCells.forEach(t=>{t.style.order=e})}_widthChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("width"),this._allCells.forEach(t=>{t.style.width=e})}_frozenChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("frozen",e),this._allCells.forEach(t=>{U(t,"frozen",e)}),this._grid&&this._grid._frozenCellsChanged&&this._grid._frozenCellsChanged()}_frozenToEndChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("frozenToEnd",e),this._allCells.forEach(t=>{this._grid&&t.parentElement===this._grid.$.sizer||U(t,"frozen-to-end",e)}),this._grid&&this._grid._frozenCellsChanged&&this._grid._frozenCellsChanged()}_lastFrozenChanged(e){this._allCells.forEach(t=>{U(t,"last-frozen",e)}),this.parentElement&&this.parentElement._columnPropChanged&&(this.parentElement._lastFrozen=e)}_firstFrozenToEndChanged(e){this._allCells.forEach(t=>{this._grid&&t.parentElement===this._grid.$.sizer||U(t,"first-frozen-to-end",e)}),this.parentElement&&this.parentElement._columnPropChanged&&(this.parentElement._firstFrozenToEnd=e)}_generateHeader(e){return e.substr(e.lastIndexOf(".")+1).replace(/([A-Z])/gu,"-$1").toLowerCase().replace(/-/gu," ").replace(/^./u,t=>t.toUpperCase())}_reorderStatusChanged(e){const t=this.__previousReorderStatus,i=t?`reorder-${t}-cell`:"",s=`reorder-${e}-cell`;this._allCells.forEach(n=>{U(n,"reorder-status",e,s,i)}),this.__previousReorderStatus=e}_resizableChanged(e,t){e===void 0||t===void 0||t&&[t].concat(this._emptyCells).forEach(i=>{if(i){const s=i.querySelector('[part~="resize-handle"]');if(s&&i.removeChild(s),e){const n=document.createElement("div");n.setAttribute("part","resize-handle"),i.appendChild(n)}}})}_textAlignChanged(e){if(e===void 0)return;if(["start","end","center"].indexOf(e)===-1){console.warn('textAlign can only be set as "start", "end" or "center"');return}let t;getComputedStyle(this._grid).direction==="ltr"?e==="start"?t="left":e==="end"&&(t="right"):e==="start"?t="right":e==="end"&&(t="left"),this._allCells.forEach(i=>{i._content.style.textAlign=e,getComputedStyle(i._content).textAlign!==e&&(i._content.style.textAlign=t)})}_hiddenChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("hidden",e),!!e!=!!this._previousHidden&&this._grid&&(e===!0&&this._allCells.forEach(t=>{t._content.parentNode&&t._content.parentNode.removeChild(t._content)}),this._grid._debouncerHiddenChanged=T.debounce(this._grid._debouncerHiddenChanged,oe,()=>{this._grid&&this._grid._renderColumnTree&&this._grid._renderColumnTree(this._grid._columnTree)}),this._grid._debounceUpdateFrozenColumn&&this._grid._debounceUpdateFrozenColumn(),this._grid._resetKeyboardNavigation&&this._grid._resetKeyboardNavigation()),this._previousHidden=e}_runRenderer(e,t,i){const s=[t._content,this];i&&i.item&&s.push(i),e.apply(this,s)}__renderCellsContent(e,t){this.hidden||!this._grid||t.forEach(i=>{if(!i.parentElement)return;const s=this._grid.__getRowModel(i.parentElement);e&&(i._renderer!==e&&this._clearCellContent(i),i._renderer=e,(s.item||e===this._headerRenderer||e===this._footerRenderer)&&this._runRenderer(e,i,s))})}_clearCellContent(e){e._content.innerHTML="",delete e._content._$litPart$}_renderHeaderCellContent(e,t){!t||!e||(this.__renderCellsContent(e,[t]),this._grid&&t.parentElement&&this._grid.__debounceUpdateHeaderFooterRowVisibility(t.parentElement))}_onHeaderRendererOrBindingChanged(e,t,...i){this._renderHeaderCellContent(e,t)}_renderBodyCellsContent(e,t){!t||!e||this.__renderCellsContent(e,t)}_onRendererOrBindingChanged(e,t,...i){this._renderBodyCellsContent(e,t)}_renderFooterCellContent(e,t){!t||!e||(this.__renderCellsContent(e,[t]),this._grid&&t.parentElement&&this._grid.__debounceUpdateHeaderFooterRowVisibility(t.parentElement))}_onFooterRendererOrBindingChanged(e,t){this._renderFooterCellContent(e,t)}__setTextContent(e,t){e.textContent!==t&&(e.textContent=t)}__textHeaderRenderer(){this.__setTextContent(this._headerCell._content,this.header)}_defaultHeaderRenderer(){this.path&&this.__setTextContent(this._headerCell._content,this._generateHeader(this.path))}_defaultRenderer(e,t,{item:i}){this.path&&this.__setTextContent(e,this.get(this.path,i))}_defaultFooterRenderer(){}_computeHeaderRenderer(e,t){return e||(t!=null?this.__textHeaderRenderer:this._defaultHeaderRenderer)}_computeRenderer(e){return e||this._defaultRenderer}_computeFooterRenderer(e){return e||this._defaultFooterRenderer}};class Ee extends ot(ge(B)){static get is(){return"vaadin-grid-column"}static get properties(){return{width:{type:String,value:"100px"},flexGrow:{type:Number,value:1},renderer:Function,_renderer:{type:Function,computed:"_computeRenderer(renderer, __initialized)"},path:{type:String},autoWidth:{type:Boolean,value:!1},_focusButtonMode:{type:Boolean,value:!1},_cells:Array}}}customElements.define(Ee.is,Ee);{class o extends Ee{static get is(){return"vaadin-grid-flow-selection-column"}static get properties(){return{autoWidth:{type:Boolean,value:!0},width:{type:String,value:"56px"},flexGrow:{type:Number,value:0},selectAll:{type:Boolean,value:!1,notify:!0},indeterminate:{type:Boolean,value:!1,notify:!0},selectAllHidden:Boolean}}constructor(){super(),this._boundOnSelectEvent=this._onSelectEvent.bind(this),this._boundOnDeselectEvent=this._onDeselectEvent.bind(this)}static get observers(){return["_onHeaderRendererOrBindingChanged(_headerRenderer, _headerCell, path, header, selectAll, indeterminate, selectAllHidden)"]}connectedCallback(){super.connectedCallback(),this._grid&&(this._grid.addEventListener("select",this._boundOnSelectEvent),this._grid.addEventListener("deselect",this._boundOnDeselectEvent))}disconnectedCallback(){super.disconnectedCallback(),this._grid&&(this._grid.removeEventListener("select",this._boundOnSelectEvent),this._grid.removeEventListener("deselect",this._boundOnDeselectEvent))}_defaultHeaderRenderer(e,t){let i=e.firstElementChild;i||(i=document.createElement("vaadin-checkbox"),i.id="selectAllCheckbox",i.setAttribute("aria-label","Select All"),i.classList.add("vaadin-grid-select-all-checkbox"),i.addEventListener("click",this._onSelectAllClick.bind(this)),e.appendChild(i));const s=this.selectAll;i.hidden=this.selectAllHidden,i.checked=s,i.indeterminate=this.indeterminate}_defaultRenderer(e,t,{item:i,selected:s}){let n=e.firstElementChild;n||(n=document.createElement("vaadin-checkbox"),n.setAttribute("aria-label","Select Row"),n.addEventListener("click",this._onSelectClick.bind(this)),e.appendChild(n)),n.__item=i,n.checked=s}_onSelectClick(e){e.currentTarget.checked?this._grid.$connector.doDeselection([e.currentTarget.__item],!0):this._grid.$connector.doSelection([e.currentTarget.__item],!0)}_onSelectAllClick(e){if(e.preventDefault(),this._grid.hasAttribute("disabled")){e.currentTarget.checked=!e.currentTarget.checked;return}this.selectAll?this.$server.deselectAll():this.$server.selectAll()}_onSelectEvent(e){}_onDeselectEvent(e){e.detail.userOriginated&&(this.selectAll=!1)}}customElements.define(o.is,o),Vaadin.GridFlowSelectionColumnElement=o}(/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1)&&(window.Vaadin.__forceApplyMobileDragDrop=!0,ft(()=>import("./vaadin-mobile-drag-drop-3bc4cb01.js"),["./vaadin-mobile-drag-drop-3bc4cb01.js","./_commonjsHelpers-725317a4.js"],import.meta.url));window.Vaadin=window.Vaadin||{};window.Vaadin.Flow=window.Vaadin.Flow||{};window.Vaadin.Flow.dndConnector={__ondragenterListener:function(o){const r=o.currentTarget.__dropEffect;o.currentTarget.hasAttribute("disabled")||(r&&(o.dataTransfer.dropEffect=r),r&&r!=="none"&&(o.currentTarget.classList.contains("v-drag-over-target")?o.currentTarget["__skip-leave"]=!0:o.currentTarget.classList.add("v-drag-over-target"),o.preventDefault(),o.stopPropagation()))},__ondragoverListener:function(o){if(!o.currentTarget.hasAttribute("disabled")){const r=o.currentTarget.__dropEffect;r&&(o.dataTransfer.dropEffect=r),o.preventDefault(),o.stopPropagation()}},__ondragleaveListener:function(o){o.currentTarget["__skip-leave"]?o.currentTarget["__skip-leave"]=!1:o.currentTarget.classList.remove("v-drag-over-target"),o.stopPropagation()},__ondropListener:function(o){const r=o.currentTarget.__dropEffect;r&&(o.dataTransfer.dropEffect=r),o.currentTarget.classList.remove("v-drag-over-target"),o.preventDefault(),o.stopPropagation()},updateDropTarget:function(o){o.__active?(o.addEventListener("dragenter",this.__ondragenterListener,!1),o.addEventListener("dragover",this.__ondragoverListener,!1),o.addEventListener("dragleave",this.__ondragleaveListener,!1),o.addEventListener("drop",this.__ondropListener,!1)):(o.removeEventListener("dragenter",this.__ondragenterListener,!1),o.removeEventListener("dragover",this.__ondragoverListener,!1),o.removeEventListener("dragleave",this.__ondragleaveListener,!1),o.removeEventListener("drop",this.__ondropListener,!1),o.classList.remove("v-drag-over-target"))},__dragstartListener:function(o){o.stopPropagation(),o.dataTransfer.setData("text/plain",""),o.currentTarget.hasAttribute("disabled")?o.preventDefault():(o.currentTarget.__effectAllowed&&(o.dataTransfer.effectAllowed=o.currentTarget.__effectAllowed),o.currentTarget.classList.add("v-dragged"))},__dragendListener:function(o){o.currentTarget.classList.remove("v-dragged")},updateDragSource:function(o){o.draggable?(o.addEventListener("dragstart",this.__dragstartListener,!1),o.addEventListener("dragend",this.__dragendListener,!1)):(o.removeEventListener("dragstart",this.__dragstartListener,!1),o.removeEventListener("dragend",this.__dragendListener,!1))}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ne extends ot(B){static get is(){return"vaadin-grid-column-group"}static get properties(){return{_childColumns:{value(){return this._getChildColumns(this)}},flexGrow:{type:Number,readOnly:!0},width:{type:String,readOnly:!0},_visibleChildColumns:Array,_colSpan:Number,_rootColumns:Array}}static get observers(){return["_groupFrozenChanged(frozen, _rootColumns)","_groupFrozenToEndChanged(frozenToEnd, _rootColumns)","_groupHiddenChanged(hidden)","_colSpanChanged(_colSpan, _headerCell, _footerCell)","_groupOrderChanged(_order, _rootColumns)","_groupReorderStatusChanged(_reorderStatus, _rootColumns)","_groupResizableChanged(resizable, _rootColumns)"]}connectedCallback(){super.connectedCallback(),this._addNodeObserver(),this._updateFlexAndWidth()}disconnectedCallback(){super.disconnectedCallback(),this._observer&&this._observer.disconnect()}_columnPropChanged(r,e){r==="hidden"&&(this._preventHiddenSynchronization=!0,this._updateVisibleChildColumns(this._childColumns),this._preventHiddenSynchronization=!1),/flexGrow|width|hidden|_childColumns/u.test(r)&&this._updateFlexAndWidth(),r==="frozen"&&!this.frozen&&(this.frozen=e),r==="lastFrozen"&&!this._lastFrozen&&(this._lastFrozen=e),r==="frozenToEnd"&&!this.frozenToEnd&&(this.frozenToEnd=e),r==="firstFrozenToEnd"&&!this._firstFrozenToEnd&&(this._firstFrozenToEnd=e)}_groupOrderChanged(r,e){if(e){const t=e.slice(0);if(!r){t.forEach(l=>{l._order=0});return}const i=/(0+)$/u.exec(r).pop().length,s=~~(Math.log(e.length)/Math.LN10)+1,n=10**(i-s);t[0]&&t[0]._order&&t.sort((l,u)=>l._order-u._order),nt(t,n,r)}}_groupReorderStatusChanged(r,e){r===void 0||e===void 0||e.forEach(t=>{t._reorderStatus=r})}_groupResizableChanged(r,e){r===void 0||e===void 0||e.forEach(t=>{t.resizable=r})}_updateVisibleChildColumns(r){this._visibleChildColumns=Array.prototype.filter.call(r,e=>!e.hidden),this._colSpan=this._visibleChildColumns.length,this._updateAutoHidden()}_updateFlexAndWidth(){if(this._visibleChildColumns){if(this._visibleChildColumns.length>0){const r=this._visibleChildColumns.reduce((e,t)=>(e+=` + ${(t.width||"0px").replace("calc","")}`,e),"").substring(3);this._setWidth(`calc(${r})`)}else this._setWidth("0px");this._setFlexGrow(Array.prototype.reduce.call(this._visibleChildColumns,(r,e)=>r+e.flexGrow,0))}}__scheduleAutoFreezeWarning(r,e){if(this._grid){const t=e.replace(/([A-Z])/gu,"-$1").toLowerCase(),i=r[0][e]||r[0].hasAttribute(t);r.every(n=>(n[e]||n.hasAttribute(t))===i)||(this._grid.__autoFreezeWarningDebouncer=T.debounce(this._grid.__autoFreezeWarningDebouncer,oe,()=>{console.warn(`WARNING: Joining ${e} and non-${e} Grid columns inside the same column group! This will automatically freeze all the joined columns to avoid rendering issues. If this was intentional, consider marking each joined column explicitly as ${e}. Otherwise, exclude the ${e} columns from the joined group.`)}))}}_groupFrozenChanged(r,e){e===void 0||r===void 0||r!==!1&&(this.__scheduleAutoFreezeWarning(e,"frozen"),Array.from(e).forEach(t=>{t.frozen=r}))}_groupFrozenToEndChanged(r,e){e===void 0||r===void 0||r!==!1&&(this.__scheduleAutoFreezeWarning(e,"frozenToEnd"),Array.from(e).forEach(t=>{t.frozenToEnd=r}))}_groupHiddenChanged(r){(r||this.__groupHiddenInitialized)&&this._synchronizeHidden(),this.__groupHiddenInitialized=!0}_updateAutoHidden(){const r=this._autoHidden;this._autoHidden=(this._visibleChildColumns||[]).length===0,(r||this._autoHidden)&&(this.hidden=this._autoHidden)}_synchronizeHidden(){this._childColumns&&!this._preventHiddenSynchronization&&this._childColumns.forEach(r=>{r.hidden=this.hidden})}_colSpanChanged(r,e,t){e&&(e.setAttribute("colspan",r),this._grid&&this._grid._a11yUpdateCellColspan(e,r)),t&&(t.setAttribute("colspan",r),this._grid&&this._grid._a11yUpdateCellColspan(t,r))}_getChildColumns(r){return K.getFlattenedNodes(r).filter(this._isColumnElement)}_addNodeObserver(){this._observer=new K(this,r=>{(r.addedNodes.filter(this._isColumnElement).length>0||r.removedNodes.filter(this._isColumnElement).length>0)&&(this._preventHiddenSynchronization=!0,this._rootColumns=this._getChildColumns(this),this._childColumns=this._rootColumns,this._updateVisibleChildColumns(this._childColumns),this._preventHiddenSynchronization=!1,this._grid&&this._grid._debounceUpdateColumnTree&&this._grid._debounceUpdateColumnTree())}),this._observer.flush()}_isColumnElement(r){return r.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/u.test(r.localName)}}customElements.define(Ne.is,Ne);const Nt=D`
  /* :hover needed to workaround https://github.com/vaadin/web-components/issues/3133 */
  :host(:hover) {
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
  }

  :host([role='menuitem'][menu-item-checked]) [part='checkmark']::before {
    opacity: 1;
  }

  :host([aria-haspopup='true'])::after {
    font-family: lumo-icons;
    font-size: var(--lumo-icon-size-xs);
    content: var(--lumo-icons-angle-right);
    color: var(--lumo-tertiary-text-color);
  }

  :host(:not([dir='rtl'])[aria-haspopup='true'])::after {
    margin-right: calc(var(--lumo-space-m) * -1);
    padding-left: var(--lumo-space-m);
  }

  :host([expanded]) {
    background-color: var(--lumo-primary-color-10pct);
  }

  /* RTL styles */
  :host([dir='rtl'][aria-haspopup='true'])::after {
    content: var(--lumo-icons-angle-left);
    margin-left: calc(var(--lumo-space-m) * -1);
    padding-right: var(--lumo-space-m);
  }
`;P("vaadin-context-menu-item",[gt,Nt],{moduleId:"lumo-context-menu-item"});const at=D`
  :host {
    -webkit-tap-highlight-color: transparent;
    --_lumo-item-selected-icon-display: var(--_lumo-list-box-item-selected-icon-display, block);
  }

  /* Dividers */
  [part='items'] ::slotted(hr) {
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) var(--lumo-border-radius-m);
    background-color: var(--lumo-contrast-10pct);
  }
`;P("vaadin-list-box",at,{moduleId:"lumo-list-box"});const Ht=D`
  :host {
    --_lumo-list-box-item-selected-icon-display: block;
  }

  /* Normal item */
  [part='items'] ::slotted([role='menuitem']) {
    -webkit-tap-highlight-color: var(--lumo-primary-color-10pct);
    cursor: default;
    outline: none;
    border-radius: var(--lumo-border-radius-m);
    padding-left: calc(var(--lumo-border-radius-m) / 4);
    padding-right: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
  }

  /* Hovered item */
  /* TODO a workaround until we have "focus-follows-mouse". After that, use the hover style for focus-ring as well */
  [part='items'] ::slotted([role='menuitem']:hover:not([disabled])),
  [part='items'] ::slotted([role='menuitem'][expanded]:not([disabled])) {
    background-color: var(--lumo-primary-color-10pct);
  }

  /* RTL styles */
  :host([dir='rtl']) [part='items'] ::slotted([role='menuitem']) {
    padding-left: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
    padding-right: calc(var(--lumo-border-radius-m) / 4);
  }

  /* Focused item */
  @media (pointer: coarse) {
    [part='items'] ::slotted([role='menuitem']:hover:not([expanded]):not([disabled])) {
      background-color: transparent;
    }
  }
`;P("vaadin-context-menu-list-box",[at,Ht],{moduleId:"lumo-context-menu-list-box"});const Gt=D`
  :host([phone]) {
    top: 0 !important;
    right: 0 !important;
    bottom: var(--vaadin-overlay-viewport-bottom) !important;
    left: 0 !important;
    align-items: stretch;
    justify-content: flex-end;
  }

  /* TODO These style overrides should not be needed.
   We should instead offer a way to have non-selectable items inside the context menu. */

  :host {
    --_lumo-list-box-item-selected-icon-display: none;
    --_lumo-list-box-item-padding-left: calc(var(--lumo-space-m) + var(--lumo-border-radius-m) / 4);
  }

  [part='overlay'] {
    outline: none;
  }
`;P("vaadin-context-menu-overlay",[bt,Gt],{moduleId:"lumo-context-menu-overlay"});/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */vt({name:"vaadin-contextmenu",deps:["touchstart","touchmove","touchend","contextmenu"],flow:{start:["touchstart","contextmenu"],end:["contextmenu"]},emits:["vaadin-contextmenu"],info:{sourceEvent:null},reset(){this.info.sourceEvent=null,this._cancelTimer(),this.info.touchJob=null,this.info.touchStartCoords=null},_cancelTimer(){this._timerId&&(clearTimeout(this._timerId),delete this._fired)},_setSourceEvent(o){this.info.sourceEvent=o;const r=o.composedPath();this.info.sourceEvent.__composedPath=r},touchstart(o){this._setSourceEvent(o),this.info.touchStartCoords={x:o.changedTouches[0].clientX,y:o.changedTouches[0].clientY};const r=o.composedPath()[0]||o.target;this._timerId=setTimeout(()=>{const e=o.changedTouches[0];o.shiftKey||(we&&(this._fired=!0,this.fire(r,e.clientX,e.clientY)),$e("tap"))},500)},touchmove(o){const e=this.info.touchStartCoords;(Math.abs(e.x-o.changedTouches[0].clientX)>15||Math.abs(e.y-o.changedTouches[0].clientY)>15)&&this._cancelTimer()},touchend(o){this._fired&&o.preventDefault(),this._cancelTimer()},contextmenu(o){o.shiftKey||(this._setSourceEvent(o),this.fire(o.target,o.clientX,o.clientY),$e("tap"))},fire(o,r,e){const t=this.info.sourceEvent,i=new Event("vaadin-contextmenu",{bubbles:!0,cancelable:!0,composed:!0});i.detail={x:r,y:e,sourceEvent:t},o.dispatchEvent(i),i.defaultPrevented&&t&&t.preventDefault&&t.preventDefault()}});/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Wt=o=>class extends Ct(yt(o)){static get properties(){return{parentOverlay:{type:Object,readOnly:!0}}}static get observers(){return["_themeChanged(_theme)"]}ready(){super.ready(),this.restoreFocusOnClose=!0,this.addEventListener("keydown",e=>{if(!e.defaultPrevented&&e.composedPath()[0]===this.$.overlay&&[38,40].indexOf(e.keyCode)>-1){const t=this.getFirstChild();t&&Array.isArray(t.items)&&t.items.length&&(e.preventDefault(),e.keyCode===38?t.items[t.items.length-1].focus():t.focus())}})}getFirstChild(){return this.querySelector(":not(style):not(slot)")}_themeChanged(){this.close()}getBoundaries(){const e=this.getBoundingClientRect(),t=this.$.overlay.getBoundingClientRect();let i=e.bottom-t.height;const s=this.parentOverlay;if(s&&s.hasAttribute("bottom-aligned")){const n=getComputedStyle(s);i=i-parseFloat(n.bottom)-parseFloat(n.height)}return{xMax:e.right-t.width,xMin:e.left+t.width,yMax:i}}_updatePosition(){if(super._updatePosition(),this.positionTarget&&this.parentOverlay){const e=this.$.content,t=getComputedStyle(e);!!this.style.left?this.style.left=`${parseFloat(this.style.left)+parseFloat(t.paddingLeft)}px`:this.style.right=`${parseFloat(this.style.right)+parseFloat(t.paddingRight)}px`,!!this.style.bottom?this.style.bottom=`${parseFloat(this.style.bottom)-parseFloat(t.paddingBottom)}px`:this.style.top=`${parseFloat(this.style.top)-parseFloat(t.paddingTop)}px`}}_shouldRestoreFocus(){return this.parentOverlay?!1:super._shouldRestoreFocus()}_deepContains(e){let t=Je(this.localName,e);for(;t;){if(t===this)return!0;t=t.parentOverlay}return!1}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Vt=D`
  :host {
    align-items: flex-start;
    justify-content: flex-start;
  }

  :host([right-aligned]),
  :host([end-aligned]) {
    align-items: flex-end;
  }

  :host([bottom-aligned]) {
    justify-content: flex-end;
  }

  [part='overlay'] {
    background-color: #fff;
  }

  @media (forced-colors: active) {
    [part='overlay'] {
      outline: 3px solid !important;
    }
  }
`;/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */P("vaadin-context-menu-overlay",Vt,{moduleId:"vaadin-context-menu-overlay-styles"});class He extends Wt(xt){static get is(){return"vaadin-context-menu-overlay"}}customElements.define(He.is,He);/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class qt{constructor(r,e){this.query=r,this.callback=e,this._boundQueryHandler=this._queryHandler.bind(this)}hostConnected(){this._removeListener(),this._mediaQuery=window.matchMedia(this.query),this._addListener(),this._queryHandler(this._mediaQuery)}hostDisconnected(){this._removeListener()}_addListener(){this._mediaQuery&&this._mediaQuery.addListener(this._boundQueryHandler)}_removeListener(){this._mediaQuery&&this._mediaQuery.removeListener(this._boundQueryHandler),this._mediaQuery=null}_queryHandler(r){typeof this.callback=="function"&&this.callback(r.matches)}}/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ut=o=>class extends et(At(o)){static get properties(){return{_hasVaadinItemMixin:{value:!0},selected:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_selectedChanged"},_value:String}}get _activeKeys(){return["Enter"," "]}get value(){return this._value!==void 0?this._value:this.textContent.trim()}set value(e){this._value=e}ready(){super.ready();const e=this.getAttribute("value");e!==null&&(this.value=e)}focus(){this.disabled||(super.focus(),this._setFocused(!0))}_shouldSetActive(e){return!this.disabled&&!(e.type==="keydown"&&e.defaultPrevented)}_selectedChanged(e){this.setAttribute("aria-selected",e)}_disabledChanged(e){super._disabledChanged(e),e&&(this.selected=!1,this.blur())}_onKeyDown(e){super._onKeyDown(e),this._activeKeys.includes(e.key)&&!e.defaultPrevented&&(e.preventDefault(),this.click())}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ge extends Ut(ae(ge(B))){static get is(){return"vaadin-context-menu-item"}static get template(){return ie`
      <style>
        :host {
          display: inline-block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("role","menuitem")}}customElements.define(Ge.is,Ge);/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function Ie(o,r){const{scrollLeft:e}=o;return r!=="rtl"?e:o.scrollWidth-o.clientWidth+e}function Kt(o,r,e){r!=="rtl"?o.scrollLeft=e:o.scrollLeft=o.clientWidth-o.scrollWidth+e}/**
 * @license
 * Copyright (c) 2022 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const jt=o=>class extends wt(o){get focused(){return(this._getItems()||[]).find(tt)}get _vertical(){return!0}focus(){const e=this._getItems();if(Array.isArray(e)){const t=this._getAvailableIndex(e,0,null,i=>!X(i));t>=0&&e[t].focus()}}_getItems(){return Array.from(this.children)}_onKeyDown(e){if(super._onKeyDown(e),e.metaKey||e.ctrlKey)return;const{key:t}=e,i=this._getItems()||[],s=i.indexOf(this.focused);let n,l;const f=!this._vertical&&this.getAttribute("dir")==="rtl"?-1:1;this.__isPrevKey(t)?(l=-f,n=s-f):this.__isNextKey(t)?(l=f,n=s+f):t==="Home"?(l=1,n=0):t==="End"&&(l=-1,n=i.length-1),n=this._getAvailableIndex(i,n,l,_=>!X(_)),n>=0&&(e.preventDefault(),this._focus(n,!0))}__isPrevKey(e){return this._vertical?e==="ArrowUp":e==="ArrowLeft"}__isNextKey(e){return this._vertical?e==="ArrowDown":e==="ArrowRight"}_focus(e,t=!1){const i=this._getItems();this._focusItem(i[e],t)}_focusItem(e){e&&(e.focus(),e.setAttribute("focus-ring",""))}_getAvailableIndex(e,t,i,s){const n=e.length;let l=t;for(let u=0;typeof l=="number"&&u<n;u+=1,l+=i||1){l<0?l=n-1:l>=n&&(l=0);const f=e[l];if(!f.hasAttribute("disabled")&&this.__isMatchingItem(f,s))return l}return-1}__isMatchingItem(e,t){return typeof t=="function"?t(e):!0}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Yt=o=>class extends jt(o){static get properties(){return{_hasVaadinListMixin:{value:!0},disabled:{type:Boolean,value:!1,reflectToAttribute:!0},selected:{type:Number,reflectToAttribute:!0,notify:!0},orientation:{type:String,reflectToAttribute:!0,value:""},items:{type:Array,readOnly:!0,notify:!0},_searchBuf:{type:String,value:""}}}static get observers(){return["_enhanceItems(items, orientation, selected, disabled)"]}get _isRTL(){return!this._vertical&&this.getAttribute("dir")==="rtl"}get _scrollerElement(){return console.warn(`Please implement the '_scrollerElement' property in <${this.localName}>`),this}get _vertical(){return this.orientation!=="horizontal"}focus(){this._observer&&this._observer.flush();const e=this.querySelector('[tabindex="0"]')||(this.items?this.items[0]:null);this._focusItem(e)}ready(){super.ready(),this.addEventListener("click",e=>this._onClick(e)),this._observer=new K(this,()=>{this._setItems(this._filterItems(K.getFlattenedNodes(this)))})}_getItems(){return this.items}_enhanceItems(e,t,i,s){if(!s&&e){this.setAttribute("aria-orientation",t||"vertical"),e.forEach(l=>{t?l.setAttribute("orientation",t):l.removeAttribute("orientation")}),this._setFocusable(i||0);const n=e[i];e.forEach(l=>{l.selected=l===n}),n&&!n.disabled&&this._scrollToItem(i)}}_filterItems(e){return e.filter(t=>t._hasVaadinItemMixin)}_onClick(e){if(e.metaKey||e.shiftKey||e.ctrlKey||e.defaultPrevented)return;const t=this._filterItems(e.composedPath())[0];let i;t&&!t.disabled&&(i=this.items.indexOf(t))>=0&&(this.selected=i)}_searchKey(e,t){this._searchReset=T.debounce(this._searchReset,J.after(500),()=>{this._searchBuf=""}),this._searchBuf+=t.toLowerCase(),this.items.some(s=>this.__isMatchingKey(s))||(this._searchBuf=t.toLowerCase());const i=this._searchBuf.length===1?e+1:e;return this._getAvailableIndex(this.items,i,1,s=>this.__isMatchingKey(s)&&getComputedStyle(s).display!=="none")}__isMatchingKey(e){return e.textContent.replace(/[^\p{L}\p{Nd}]/gu,"").toLowerCase().startsWith(this._searchBuf)}_onKeyDown(e){if(e.metaKey||e.ctrlKey)return;const t=e.key,i=this.items.indexOf(this.focused);if(/[a-zA-Z0-9]/u.test(t)&&t.length===1){const s=this._searchKey(i,t);s>=0&&this._focus(s);return}super._onKeyDown(e)}_isItemHidden(e){return getComputedStyle(e).display==="none"}_setFocusable(e){e=this._getAvailableIndex(this.items,e,1);const t=this.items[e];this.items.forEach(i=>{i.tabIndex=i===t?0:-1})}_focus(e){this.items.forEach((t,i)=>{t.focused=i===e}),this._setFocusable(e),this._scrollToItem(e),super._focus(e)}_scrollToItem(e){const t=this.items[e];if(!t)return;const i=this._vertical?["top","bottom"]:this._isRTL?["right","left"]:["left","right"],s=this._scrollerElement.getBoundingClientRect(),n=(this.items[e+1]||t).getBoundingClientRect(),l=(this.items[e-1]||t).getBoundingClientRect();let u=0;!this._isRTL&&n[i[1]]>=s[i[1]]||this._isRTL&&n[i[1]]<=s[i[1]]?u=n[i[1]]-s[i[1]]:(!this._isRTL&&l[i[0]]<=s[i[0]]||this._isRTL&&l[i[0]]>=s[i[0]])&&(u=l[i[0]]-s[i[0]]),this._scroll(u)}_scroll(e){if(this._vertical)this._scrollerElement.scrollTop+=e;else{const t=this.getAttribute("dir")||"ltr",i=Ie(this._scrollerElement,t)+e;Kt(this._scrollerElement,t,i)}}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class We extends Yt(ae(ge(ze(B)))){static get is(){return"vaadin-context-menu-list-box"}static get template(){return ie`
      <style>
        :host {
          display: flex;
        }

        :host([hidden]) {
          display: none !important;
        }

        [part='items'] {
          height: 100%;
          width: 100%;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
      </style>
      <div part="items">
        <slot></slot>
      </div>
    `}static get properties(){return{orientation:{readOnly:!0}}}get _scrollerElement(){return this.shadowRoot.querySelector('[part="items"]')}ready(){super.ready(),this.setAttribute("role","menu")}}customElements.define(We.is,We);/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Qt=o=>class extends o{static get properties(){return{items:Array}}get _tagNamePrefix(){return"vaadin-context-menu"}ready(){super.ready(),this.__itemsOutsideClickListener=e=>{e.composedPath().some(t=>t.localName===`${this._tagNamePrefix}-overlay`)||this.dispatchEvent(new CustomEvent("items-outside-click"))},this.addEventListener("items-outside-click",()=>this.items&&this.close())}connectedCallback(){super.connectedCallback(),document.documentElement.addEventListener("click",this.__itemsOutsideClickListener)}disconnectedCallback(){super.disconnectedCallback(),document.documentElement.removeEventListener("click",this.__itemsOutsideClickListener)}__forwardFocus(){const e=this.$.overlay,t=e.getFirstChild();if(e.parentOverlay){const i=e.parentOverlay.querySelector("[expanded]");i&&i.hasAttribute("focused")&&t?t.focus():e.$.overlay.focus()}else t&&t.focus()}__openSubMenu(e,t,i){e.items=t._item.children,e.listenOn=t,e.overlayClass=i;const s=this.$.overlay,n=e.$.overlay;n.positionTarget=t,n.noHorizontalOverlap=!0,n._setParentOverlay(s),s.hasAttribute("theme")?e.setAttribute("theme",s.getAttribute("theme")):e.removeAttribute("theme");const l=e.$.overlay.$.content;l.style.minWidth="",t.dispatchEvent(new CustomEvent("opensubmenu",{detail:{children:t._item.children}}))}__createComponent(e){let t;return e.component instanceof HTMLElement?t=e.component:t=document.createElement(e.component||`${this._tagNamePrefix}-item`),t._hasVaadinItemMixin&&t.setAttribute("role","menuitem"),t.localName==="hr"?t.setAttribute("role","separator"):t.setAttribute("aria-haspopup","false"),this._setMenuItemTheme(t,e,this._theme),t._item=e,e.text&&(t.textContent=e.text),this.__toggleMenuComponentAttribute(t,"menu-item-checked",e.checked),this.__toggleMenuComponentAttribute(t,"disabled",e.disabled),e.children&&e.children.length&&(this.__updateExpanded(t,!1),t.setAttribute("aria-haspopup","true")),t}__initListBox(){const e=document.createElement(`${this._tagNamePrefix}-list-box`);return this._theme&&e.setAttribute("theme",this._theme),e.addEventListener("selected-changed",t=>{const{value:i}=t.detail;if(typeof i=="number"){const s=e.items[i]._item;s.children||this.dispatchEvent(new CustomEvent("item-selected",{detail:{value:s}})),e.selected=null}}),e}__initOverlay(){const e=this.$.overlay;e.$.backdrop.addEventListener("click",()=>{this.close()}),e.addEventListener(be?"click":"mouseover",t=>{this.__showSubMenu(t)}),e.addEventListener("keydown",t=>{const{key:i}=t,s=this.__isRTL,n=i==="ArrowRight",l=i==="ArrowLeft";!s&&n||s&&l||i==="Enter"||i===" "?this.__showSubMenu(t):!s&&l||s&&n||i==="Escape"?(i==="Escape"&&t.stopPropagation(),this.close(),this.listenOn.focus()):i==="Tab"&&this.dispatchEvent(new CustomEvent("close-all-menus"))})}__initSubMenu(){const e=document.createElement(this.constructor.is);return e._modeless=!0,e.openOn="opensubmenu",e.setAttribute("hidden",""),this.addEventListener("opened-changed",t=>{t.detail.value||this._subMenu.close()}),e.addEventListener("close-all-menus",()=>{this.dispatchEvent(new CustomEvent("close-all-menus"))}),e.addEventListener("item-selected",t=>{const{detail:i}=t;this.dispatchEvent(new CustomEvent("item-selected",{detail:i}))}),this.addEventListener("close-all-menus",()=>{this.close()}),this.addEventListener("item-selected",()=>{this.close()}),e.addEventListener("opened-changed",t=>{if(!t.detail.value){const i=this._listBox.querySelector("[expanded]");i&&this.__updateExpanded(i,!1)}}),e}__showSubMenu(e,t=e.composedPath().find(i=>i.localName===`${this._tagNamePrefix}-item`)){if(!this.__openListenerActive)return;if(this.$.overlay.hasAttribute("opening")){requestAnimationFrame(()=>{this.__showSubMenu(e,t)});return}const i=this._subMenu;if(t){const{children:s}=t._item;if(i.items!==s&&i.close(),!this.opened)return;if(s&&s.length){this.__updateExpanded(t,!0);const{overlayClass:n}=this;this.__openSubMenu(i,t,n)}else i.listenOn.focus()}}__itemsRenderer(e,t,{detail:i}){this.__initMenu(e,t);const s=e.querySelector(this.constructor.is);s.closeOn=t.closeOn;const n=e.querySelector(`${this._tagNamePrefix}-list-box`);n.innerHTML="",[...i.children||t.items].forEach(l=>{const u=this.__createComponent(l);n.appendChild(u)})}_setMenuItemTheme(e,t,i){let s=e.getAttribute("theme")||i;t.theme!=null&&(s=Array.isArray(t.theme)?t.theme.join(" "):t.theme),this.__updateTheme(e,s)}__toggleMenuComponentAttribute(e,t,i){i?(e.setAttribute(t,""),e[`__has-${t}`]=!0):e[`__has-${t}`]&&(e.removeAttribute(t),e[`__has-${t}`]=!1)}__initMenu(e,t){if(e.firstElementChild)this.__updateTheme(this._listBox,this._theme);else{this.__initOverlay();const i=this.__initListBox();this._listBox=i,e.appendChild(i);const s=this.__initSubMenu();this._subMenu=s,e.appendChild(s),requestAnimationFrame(()=>{this.__openListenerActive=!0})}}__updateExpanded(e,t){e.setAttribute("aria-expanded",t.toString()),e.toggleAttribute("expanded",t)}__updateTheme(e,t){t?e.setAttribute("theme",t):e.removeAttribute("theme")}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ve extends Et(ze(Re(It(Qt(B))))){static get template(){return ie`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>

      <slot id="slot"></slot>

      <vaadin-context-menu-overlay
        id="overlay"
        on-opened-changed="_onOverlayOpened"
        on-vaadin-overlay-open="_onVaadinOverlayOpen"
        modeless="[[_modeless]]"
        with-backdrop="[[_phone]]"
        phone$="[[_phone]]"
        model="[[_context]]"
        theme$="[[_theme]]"
      ></vaadin-context-menu-overlay>
    `}static get is(){return"vaadin-context-menu"}static get properties(){return{selector:{type:String},opened:{type:Boolean,value:!1,notify:!0,readOnly:!0},openOn:{type:String,value:"vaadin-contextmenu"},listenOn:{type:Object,value(){return this}},closeOn:{type:String,value:"click",observer:"_closeOnChanged"},renderer:{type:Function},_modeless:{type:Boolean},_context:Object,_phone:{type:Boolean},_touch:{type:Boolean,value:be},_wide:{type:Boolean},_wideMediaQuery:{type:String,value:"(min-device-width: 750px)"}}}static get observers(){return["_openedChanged(opened)","_targetOrOpenOnChanged(listenOn, openOn)","_rendererChanged(renderer, items)","_touchOrWideChanged(_touch, _wide)"]}constructor(){super(),this._boundOpen=this.open.bind(this),this._boundClose=this.close.bind(this),this._boundPreventDefault=this._preventDefault.bind(this),this._boundOnGlobalContextMenu=this._onGlobalContextMenu.bind(this)}connectedCallback(){super.connectedCallback(),this.__boundOnScroll=this.__onScroll.bind(this),window.addEventListener("scroll",this.__boundOnScroll,!0),this.__restoreOpened&&this._setOpened(!0)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("scroll",this.__boundOnScroll,!0),this.__restoreOpened=this.opened,this.close()}ready(){super.ready(),this._overlayElement=this.$.overlay,this.addController(new qt(this._wideMediaQuery,r=>{this._wide=r})),Se(this)}_onOverlayOpened(r){this._setOpened(r.detail.value),this.__alignOverlayPosition()}_onVaadinOverlayOpen(){this.__alignOverlayPosition(),this.$.overlay.style.opacity="",this.__forwardFocus()}_targetOrOpenOnChanged(r,e){this._oldListenOn&&this._oldOpenOn&&(this._unlisten(this._oldListenOn,this._oldOpenOn,this._boundOpen),this._oldListenOn.style.webkitTouchCallout="",this._oldListenOn.style.webkitUserSelect="",this._oldListenOn.style.userSelect="",this._oldListenOn=null,this._oldOpenOn=null),r&&e&&(this._listen(r,e,this._boundOpen),this._oldListenOn=r,this._oldOpenOn=e)}_touchOrWideChanged(r,e){this._phone=!e&&r}_setListenOnUserSelect(r){this.listenOn.style.webkitTouchCallout=r,this.listenOn.style.webkitUserSelect=r,this.listenOn.style.userSelect=r,document.getSelection().removeAllRanges()}_closeOnChanged(r,e){const t="vaadin-overlay-outside-click",i=this.$.overlay;e&&this._unlisten(i,e,this._boundClose),r?(this._listen(i,r,this._boundClose),i.removeEventListener(t,this._boundPreventDefault)):i.addEventListener(t,this._boundPreventDefault)}_preventDefault(r){r.preventDefault()}_openedChanged(r){r?(document.documentElement.addEventListener("contextmenu",this._boundOnGlobalContextMenu,!0),this._setListenOnUserSelect("none")):(document.documentElement.removeEventListener("contextmenu",this._boundOnGlobalContextMenu,!0),this._setListenOnUserSelect("")),this.$.overlay.opened=r}requestContentUpdate(){!this._overlayElement||!this.renderer||this._overlayElement.requestContentUpdate()}_rendererChanged(r,e){if(e){if(r)throw new Error("The items API cannot be used together with a renderer");this.closeOn==="click"&&(this.closeOn=""),r=this.__itemsRenderer}this.$.overlay.setProperties({owner:this,renderer:r})}close(){this._setOpened(!1)}_contextTarget(r){if(this.selector){const e=this.listenOn.querySelectorAll(this.selector);return Array.prototype.filter.call(e,t=>r.composedPath().indexOf(t)>-1)[0]}return r.target}open(r){r&&!this.opened&&(this._context={detail:r.detail,target:this._contextTarget(r)},this._context.target&&(r.preventDefault(),r.stopPropagation(),this.__x=this._getEventCoordinate(r,"x"),this.__pageXOffset=window.pageXOffset,this.__y=this._getEventCoordinate(r,"y"),this.__pageYOffset=window.pageYOffset,this.$.overlay.style.opacity="0",this._setOpened(!0)))}__onScroll(){if(!this.opened)return;const r=window.pageYOffset-this.__pageYOffset,e=window.pageXOffset-this.__pageXOffset;this.__adjustPosition("left",-e),this.__adjustPosition("right",e),this.__adjustPosition("top",-r),this.__adjustPosition("bottom",r),this.__pageYOffset+=r,this.__pageXOffset+=e}__adjustPosition(r,e){const i=this.$.overlay.style;i[r]=`${(parseInt(i[r])||0)+e}px`}__alignOverlayPosition(){const r=this.$.overlay;if(r.positionTarget)return;const e=r.style;["top","right","bottom","left"].forEach(_=>e.removeProperty(_)),["right-aligned","end-aligned","bottom-aligned"].forEach(_=>r.removeAttribute(_));const{xMax:t,xMin:i,yMax:s}=r.getBoundaries(),n=this.__x,l=this.__y,u=document.documentElement.clientWidth,f=document.documentElement.clientHeight;this.__isRTL?n>u/2||n>i?e.right=`${Math.max(0,u-n)}px`:(e.left=`${n}px`,this._setEndAligned(r)):n<u/2||n<t?e.left=`${n}px`:(e.right=`${Math.max(0,u-n)}px`,this._setEndAligned(r)),l<f/2||l<s?e.top=`${l}px`:(e.bottom=`${Math.max(0,f-l)}px`,r.setAttribute("bottom-aligned",""))}_setEndAligned(r){r.setAttribute("end-aligned",""),this.__isRTL||r.setAttribute("right-aligned","")}_getEventCoordinate(r,e){if(r.detail instanceof Object){if(r.detail[e])return r.detail[e];if(r.detail.sourceEvent)return this._getEventCoordinate(r.detail.sourceEvent,e)}else{const t=`client${e.toUpperCase()}`,i=r.changedTouches?r.changedTouches[0][t]:r[t];if(i===0){const s=r.target.getBoundingClientRect();return e==="x"?s.left:s.top+s.height}return i}}_listen(r,e,t){_e[e]?ve(r,e,t):r.addEventListener(e,t)}_unlisten(r,e,t){_e[e]?it(r,e,t):r.removeEventListener(e,t)}_onGlobalContextMenu(r){r.shiftKey||(r.preventDefault(),this.close())}}customElements.define(Ve.is,Ve);(function(){function o(n){return window.Vaadin.Flow.tryCatchWrapper(n,"Vaadin Context Menu")}function r(n,l){try{return window.Vaadin.Flow.clients[n].getByNodeId(l)}catch(u){console.error("Could not get node %s from app %s",l,n),console.error(u)}}function e(n,l){n.$connector||(n.$connector={generateItems:o(u=>{const f=t(l,u);n.items=f})})}function t(n,l){const u=r(n,l);if(u)return Array.from(u.children).map(f=>{const _={component:f,checked:f._checked,theme:f.__theme};return f._hasVaadinItemMixin&&f._containerNodeId&&(_.children=t(n,f._containerNodeId)),f._item=_,_})}function i(n,l){n._item&&(n._item.checked=l)}function s(n,l){n._item&&(n._item.theme=l)}window.Vaadin.Flow.contextMenuConnector={initLazy(...n){return o(e)(...n)},generateItemsTree(...n){return o(t)(...n)},setChecked(...n){return o(i)(...n)},setTheme(...n){return o(s)(...n)}}})();(function(){function o(e){return window.Vaadin.Flow.tryCatchWrapper(e,"Vaadin Context Menu Target")}function r(e){e.$contextMenuTargetConnector||(e.$contextMenuTargetConnector={openOnHandler:o(function(t){t.preventDefault(),t.stopPropagation(),this.$contextMenuTargetConnector.openEvent=t;let i={};e.getContextMenuBeforeOpenDetail&&(i=e.getContextMenuBeforeOpenDetail(t)),e.dispatchEvent(new CustomEvent("vaadin-context-menu-before-open",{detail:i}))}),updateOpenOn:o(function(t){this.removeListener(),this.openOnEventType=t,customElements.whenDefined("vaadin-context-menu").then(o(()=>{_e[t]?ve(e,t,this.openOnHandler):e.addEventListener(t,this.openOnHandler)}))}),removeListener:o(function(){this.openOnEventType&&(_e[this.openOnEventType]?it(e,this.openOnEventType,this.openOnHandler):e.removeEventListener(this.openOnEventType,this.openOnHandler))}),openMenu:o(function(t){t.open(this.openEvent)}),removeConnector:o(function(){this.removeListener(),e.$contextMenuTargetConnector=void 0})})}window.Vaadin.Flow.contextMenuTargetConnector={init(...e){return o(r)(...e)}}})();P("vaadin-checkbox",D`
    :host {
      color: var(--lumo-body-text-color);
      font-size: var(--lumo-font-size-m);
      font-family: var(--lumo-font-family);
      line-height: var(--lumo-line-height-s);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: transparent;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      cursor: default;
      outline: none;
      --_checkbox-size: var(--vaadin-checkbox-size, calc(var(--lumo-size-m) / 2));
    }

    :host([has-label]) ::slotted(label) {
      padding-block: var(--lumo-space-xs);
      padding-inline: var(--lumo-space-xs) var(--lumo-space-s);
    }

    [part='checkbox'] {
      width: var(--_checkbox-size);
      height: var(--_checkbox-size);
      margin: var(--lumo-space-xs);
      position: relative;
      border-radius: var(--lumo-border-radius-s);
      background-color: var(--lumo-contrast-20pct);
      transition: transform 0.2s cubic-bezier(0.12, 0.32, 0.54, 2), background-color 0.15s;
      cursor: var(--lumo-clickable-cursor);
      /* Default field border color */
      --_input-border-color: var(--vaadin-input-field-border-color, var(--lumo-contrast-50pct));
    }

    :host([indeterminate]),
    :host([checked]) {
      --vaadin-input-field-border-color: transparent;
    }

    :host([indeterminate]) [part='checkbox'],
    :host([checked]) [part='checkbox'] {
      background-color: var(--lumo-primary-color);
    }

    /* Checkmark */
    [part='checkbox']::after {
      pointer-events: none;
      font-family: 'lumo-icons';
      content: var(--lumo-icons-checkmark);
      color: var(--lumo-primary-contrast-color);
      font-size: calc(var(--_checkbox-size) + 2px);
      line-height: 1;
      position: absolute;
      top: -1px;
      left: -1px;
      contain: content;
      opacity: 0;
    }

    :host([checked]) [part='checkbox']::after {
      opacity: 1;
    }

    /* Indeterminate checkmark */
    :host([indeterminate]) [part='checkbox']::after {
      content: '';
      opacity: 1;
      top: 45%;
      height: 10%;
      left: 22%;
      right: 22%;
      width: auto;
      border: 0;
      background-color: var(--lumo-primary-contrast-color);
    }

    /* Focus ring */
    :host([focus-ring]) [part='checkbox'] {
      box-shadow: 0 0 0 1px var(--lumo-base-color), 0 0 0 3px var(--lumo-primary-color-50pct),
        inset 0 0 0 var(--_input-border-width, 0) var(--_input-border-color);
    }

    /* Disabled */
    :host([disabled]) {
      pointer-events: none;
      color: var(--lumo-disabled-text-color);
      --vaadin-input-field-border-color: var(--lumo-contrast-20pct);
    }

    :host([disabled]) ::slotted(label) {
      color: inherit;
    }

    :host([disabled]) [part='checkbox'] {
      background-color: var(--lumo-contrast-10pct);
    }

    :host([disabled]) [part='checkbox']::after {
      color: var(--lumo-contrast-30pct);
    }

    :host([indeterminate][disabled]) [part='checkbox']::after {
      background-color: var(--lumo-contrast-30pct);
    }

    /* RTL specific styles */
    :host([dir='rtl'][has-label]) ::slotted(label) {
      padding: var(--lumo-space-xs) var(--lumo-space-xs) var(--lumo-space-xs) var(--lumo-space-s);
    }

    /* Used for activation "halo" */
    [part='checkbox']::before {
      pointer-events: none;
      color: transparent;
      width: 100%;
      height: 100%;
      line-height: var(--_checkbox-size);
      border-radius: inherit;
      background-color: inherit;
      transform: scale(1.4);
      opacity: 0;
      transition: transform 0.1s, opacity 0.8s;
    }

    /* Hover */
    :host(:not([checked]):not([indeterminate]):not([disabled]):hover) [part='checkbox'] {
      background-color: var(--lumo-contrast-30pct);
    }

    /* Disable hover for touch devices */
    @media (pointer: coarse) {
      :host(:not([checked]):not([indeterminate]):not([disabled]):hover) [part='checkbox'] {
        background-color: var(--lumo-contrast-20pct);
      }
    }

    /* Active */
    :host([active]) [part='checkbox'] {
      transform: scale(0.9);
      transition-duration: 0.05s;
    }

    :host([active][checked]) [part='checkbox'] {
      transform: scale(1.1);
    }

    :host([active]:not([checked])) [part='checkbox']::before {
      transition-duration: 0.01s, 0.01s;
      transform: scale(0);
      opacity: 0.4;
    }
  `,{moduleId:"lumo-checkbox"});/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Zt=rt(o=>class extends St(zt(Rt(o))){static get properties(){return{checked:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0}}}static get delegateProps(){return[...super.delegateProps,"checked"]}_onChange(e){const t=e.target;this._toggleChecked(t.checked),tt(t)||t.focus()}_toggleChecked(e){this.checked=e}});/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Xt=o=>class extends Tt(Zt(kt(et(o)))){static get properties(){return{indeterminate:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0},name:{type:String,value:""}}}static get delegateProps(){return[...super.delegateProps,"indeterminate"]}static get delegateAttrs(){return[...super.delegateAttrs,"name"]}constructor(){super(),this._setType("checkbox"),this.value="on"}ready(){super.ready(),this.addController(new Ot(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new Ft(this.inputElement,this._labelController))}_shouldSetActive(e){return e.target.localName==="a"?!1:super._shouldSetActive(e)}_toggleChecked(e){this.indeterminate&&(this.indeterminate=!1),super._toggleChecked(e)}};/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Jt=D`
  :host {
    display: inline-block;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([disabled]) {
    -webkit-tap-highlight-color: transparent;
  }

  .vaadin-checkbox-container {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: baseline;
  }

  [part='checkbox'],
  ::slotted(input),
  ::slotted(label) {
    grid-row: 1;
  }

  [part='checkbox'],
  ::slotted(input) {
    grid-column: 1;
  }

  [part='checkbox'] {
    width: var(--vaadin-checkbox-size, 1em);
    height: var(--vaadin-checkbox-size, 1em);
    --_input-border-width: var(--vaadin-input-field-border-width, 0);
    --_input-border-color: var(--vaadin-input-field-border-color, transparent);
    box-shadow: inset 0 0 0 var(--_input-border-width, 0) var(--_input-border-color);
  }

  [part='checkbox']::before {
    display: block;
    content: '\\202F';
    line-height: var(--vaadin-checkbox-size, 1em);
    contain: paint;
  }

  /* visually hidden */
  ::slotted(input) {
    opacity: 0;
    cursor: inherit;
    margin: 0;
    align-self: stretch;
    -webkit-appearance: none;
    width: initial;
    height: initial;
  }

  @media (forced-colors: active) {
    [part='checkbox'] {
      outline: 1px solid;
      outline-offset: -1px;
    }

    :host([disabled]) [part='checkbox'],
    :host([disabled]) [part='checkbox']::after {
      outline-color: GrayText;
    }

    :host(:is([checked], [indeterminate])) [part='checkbox']::after {
      outline: 1px solid;
      outline-offset: -1px;
      border-radius: inherit;
    }

    :host([focused]) [part='checkbox'],
    :host([focused]) [part='checkbox']::after {
      outline-width: 2px;
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */P("vaadin-checkbox",Jt,{moduleId:"vaadin-checkbox-styles"});class qe extends Xt(Re(ae(B))){static get is(){return"vaadin-checkbox"}static get template(){return ie`
      <div class="vaadin-checkbox-container">
        <div part="checkbox" aria-hidden="true"></div>
        <slot name="input"></slot>
        <slot name="label"></slot>
      </div>
      <slot name="tooltip"></slot>
    `}ready(){super.ready(),this._tooltipController=new st(this),this.addController(this._tooltipController)}}customElements.define(qe.is,qe);P("vaadin-grid",D`
    :host {
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
      line-height: var(--lumo-line-height-s);
      color: var(--lumo-body-text-color);
      background-color: var(--lumo-base-color);
      box-sizing: border-box;
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      /* For internal use only */
      --_lumo-grid-border-color: var(--lumo-contrast-20pct);
      --_lumo-grid-secondary-border-color: var(--lumo-contrast-10pct);
      --_lumo-grid-border-width: 1px;
      --_lumo-grid-selected-row-color: var(--lumo-primary-color-10pct);
    }

    /* No (outer) border */

    :host(:not([theme~='no-border'])) {
      border: var(--_lumo-grid-border-width) solid var(--_lumo-grid-border-color);
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    /* Cell styles */

    [part~='cell'] {
      min-height: var(--lumo-size-m);
      background-color: var(--lumo-base-color);
    }

    [part~='cell'] ::slotted(vaadin-grid-cell-content) {
      cursor: default;
      padding: var(--lumo-space-xs) var(--lumo-space-m);
    }

    /* Apply row borders by default and introduce the "no-row-borders" variant */
    :host(:not([theme~='no-row-borders'])) [part~='cell']:not([part~='details-cell']) {
      border-top: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
    }

    /* Hide first body row top border */
    :host(:not([theme~='no-row-borders'])) [part~='first-row'] [part~='cell']:not([part~='details-cell']) {
      border-top: 0;
      min-height: calc(var(--lumo-size-m) - var(--_lumo-grid-border-width));
    }

    /* Focus-ring */

    [part~='row'] {
      position: relative;
    }

    [part~='row']:focus,
    [part~='focused-cell']:focus {
      outline: none;
    }

    :host([navigating]) [part~='row']:focus::before,
    :host([navigating]) [part~='focused-cell']:focus::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      box-shadow: inset 0 0 0 2px var(--lumo-primary-color-50pct);
    }

    :host([navigating]) [part~='row']:focus::before {
      transform: translateX(calc(-1 * var(--_grid-horizontal-scroll-position)));
      z-index: 3;
    }

    /* Drag and Drop styles */
    :host([dragover])::after {
      content: '';
      position: absolute;
      z-index: 100;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      box-shadow: inset 0 0 0 2px var(--lumo-primary-color-50pct);
    }

    [part~='row'][dragover] {
      z-index: 100 !important;
    }

    [part~='row'][dragover] [part~='cell'] {
      overflow: visible;
    }

    [part~='row'][dragover] [part~='cell']::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: calc(var(--_lumo-grid-border-width) + 2px);
      pointer-events: none;
      background: var(--lumo-primary-color-50pct);
    }

    [part~='row'][dragover] [part~='cell'][last-frozen]::after {
      right: -1px;
    }

    :host([theme~='no-row-borders']) [dragover] [part~='cell']::after {
      height: 2px;
    }

    [part~='row'][dragover='below'] [part~='cell']::after {
      top: 100%;
      bottom: auto;
      margin-top: -1px;
    }

    :host([all-rows-visible]) [part~='last-row'][dragover='below'] [part~='cell']::after {
      height: 1px;
    }

    [part~='row'][dragover='above'] [part~='cell']::after {
      top: auto;
      bottom: 100%;
      margin-bottom: -1px;
    }

    [part~='row'][details-opened][dragover='below'] [part~='cell']:not([part~='details-cell'])::after,
    [part~='row'][details-opened][dragover='above'] [part~='details-cell']::after {
      display: none;
    }

    [part~='row'][dragover][dragover='on-top'] [part~='cell']::after {
      height: 100%;
      opacity: 0.5;
    }

    [part~='row'][dragstart] [part~='cell'] {
      border: none !important;
      box-shadow: none !important;
    }

    [part~='row'][dragstart] [part~='cell'][last-column] {
      border-radius: 0 var(--lumo-border-radius-s) var(--lumo-border-radius-s) 0;
    }

    [part~='row'][dragstart] [part~='cell'][first-column] {
      border-radius: var(--lumo-border-radius-s) 0 0 var(--lumo-border-radius-s);
    }

    #scroller [part~='row'][dragstart]:not([dragstart=''])::after {
      display: block;
      position: absolute;
      left: var(--_grid-drag-start-x);
      top: var(--_grid-drag-start-y);
      z-index: 100;
      content: attr(dragstart);
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: calc(var(--lumo-space-xs) * 0.8);
      color: var(--lumo-error-contrast-color);
      background-color: var(--lumo-error-color);
      border-radius: var(--lumo-border-radius-m);
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-xxs);
      line-height: 1;
      font-weight: 500;
      text-transform: initial;
      letter-spacing: initial;
      min-width: calc(var(--lumo-size-s) * 0.7);
      text-align: center;
    }

    /* Headers and footers */

    [part~='header-cell'] ::slotted(vaadin-grid-cell-content),
    [part~='footer-cell'] ::slotted(vaadin-grid-cell-content),
    [part~='reorder-ghost'] {
      font-size: var(--lumo-font-size-s);
      font-weight: 500;
    }

    [part~='footer-cell'] ::slotted(vaadin-grid-cell-content) {
      font-weight: 400;
    }

    [part~='row']:only-child [part~='header-cell'] {
      min-height: var(--lumo-size-xl);
    }

    /* Header borders */

    /* Hide first header row top border */
    :host(:not([theme~='no-row-borders'])) [part~='row']:first-child [part~='header-cell'] {
      border-top: 0;
    }

    [part~='row']:last-child [part~='header-cell'] {
      border-bottom: var(--_lumo-grid-border-width) solid transparent;
    }

    :host(:not([theme~='no-row-borders'])) [part~='row']:last-child [part~='header-cell'] {
      border-bottom-color: var(--_lumo-grid-secondary-border-color);
    }

    /* Overflow uses a stronger border color */
    :host([overflow~='top']) [part~='row']:last-child [part~='header-cell'] {
      border-bottom-color: var(--_lumo-grid-border-color);
    }

    /* Footer borders */

    [part~='row']:first-child [part~='footer-cell'] {
      border-top: var(--_lumo-grid-border-width) solid transparent;
    }

    :host(:not([theme~='no-row-borders'])) [part~='row']:first-child [part~='footer-cell'] {
      border-top-color: var(--_lumo-grid-secondary-border-color);
    }

    /* Overflow uses a stronger border color */
    :host([overflow~='bottom']) [part~='row']:first-child [part~='footer-cell'] {
      border-top-color: var(--_lumo-grid-border-color);
    }

    /* Column reordering */

    :host([reordering]) [part~='cell'] {
      background: linear-gradient(var(--lumo-shade-20pct), var(--lumo-shade-20pct)) var(--lumo-base-color);
    }

    :host([reordering]) [part~='cell'][reorder-status='allowed'] {
      background: var(--lumo-base-color);
    }

    :host([reordering]) [part~='cell'][reorder-status='dragging'] {
      background: linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct)) var(--lumo-base-color);
    }

    [part~='reorder-ghost'] {
      opacity: 0.85;
      box-shadow: var(--lumo-box-shadow-s);
      /* TODO Use the same styles as for the cell element (reorder-ghost copies styles from the cell element) */
      padding: var(--lumo-space-s) var(--lumo-space-m) !important;
    }

    /* Column resizing */

    [part='resize-handle'] {
      width: 3px;
      background-color: var(--lumo-primary-color-50pct);
      opacity: 0;
      transition: opacity 0.2s;
    }

    :host(:not([reordering])) *:not([column-resizing]) [part~='cell']:hover [part='resize-handle'],
    [part='resize-handle']:active {
      opacity: 1;
      transition-delay: 0.15s;
    }

    /* Column borders */

    :host([theme~='column-borders']) [part~='cell']:not([last-column]):not([part~='details-cell']) {
      border-right: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
    }

    /* Frozen columns */

    [last-frozen] {
      border-right: var(--_lumo-grid-border-width) solid transparent;
      overflow: hidden;
    }

    :host([overflow~='start']) [part~='cell'][last-frozen]:not([part~='details-cell']) {
      border-right-color: var(--_lumo-grid-border-color);
    }

    [first-frozen-to-end] {
      border-left: var(--_lumo-grid-border-width) solid transparent;
    }

    :host([overflow~='end']) [part~='cell'][first-frozen-to-end]:not([part~='details-cell']) {
      border-left-color: var(--_lumo-grid-border-color);
    }

    /* Row stripes */

    :host([theme~='row-stripes']) [part~='even-row'] [part~='body-cell'],
    :host([theme~='row-stripes']) [part~='even-row'] [part~='details-cell'] {
      background-image: linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct));
      background-repeat: repeat-x;
    }

    /* Selected row */

    /* Raise the selected rows above unselected rows (so that box-shadow can cover unselected rows) */
    :host(:not([reordering])) [part~='row'][selected] {
      z-index: 1;
    }

    :host(:not([reordering])) [part~='row'][selected] [part~='body-cell']:not([part~='details-cell']) {
      background-image: linear-gradient(var(--_lumo-grid-selected-row-color), var(--_lumo-grid-selected-row-color));
      background-repeat: repeat;
    }

    /* Cover the border of an unselected row */
    :host(:not([theme~='no-row-borders'])) [part~='row'][selected] [part~='cell']:not([part~='details-cell']) {
      box-shadow: 0 var(--_lumo-grid-border-width) 0 0 var(--_lumo-grid-selected-row-color);
    }

    /* Compact */

    :host([theme~='compact']) [part~='row']:only-child [part~='header-cell'] {
      min-height: var(--lumo-size-m);
    }

    :host([theme~='compact']) [part~='cell'] {
      min-height: var(--lumo-size-s);
    }

    :host([theme~='compact']) [part~='first-row'] [part~='cell']:not([part~='details-cell']) {
      min-height: calc(var(--lumo-size-s) - var(--_lumo-grid-border-width));
    }

    :host([theme~='compact']) [part~='cell'] ::slotted(vaadin-grid-cell-content) {
      padding: var(--lumo-space-xs) var(--lumo-space-s);
    }

    /* Wrap cell contents */

    :host([theme~='wrap-cell-content']) [part~='cell'] ::slotted(vaadin-grid-cell-content) {
      white-space: normal;
    }

    /* RTL specific styles */

    :host([dir='rtl']) [part~='row'][dragstart] [part~='cell'][last-column] {
      border-radius: var(--lumo-border-radius-s) 0 0 var(--lumo-border-radius-s);
    }

    :host([dir='rtl']) [part~='row'][dragstart] [part~='cell'][first-column] {
      border-radius: 0 var(--lumo-border-radius-s) var(--lumo-border-radius-s) 0;
    }

    :host([dir='rtl'][theme~='column-borders']) [part~='cell']:not([last-column]):not([part~='details-cell']) {
      border-right: none;
      border-left: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
    }

    :host([dir='rtl']) [last-frozen] {
      border-right: none;
      border-left: var(--_lumo-grid-border-width) solid transparent;
    }

    :host([dir='rtl']) [first-frozen-to-end] {
      border-left: none;
      border-right: var(--_lumo-grid-border-width) solid transparent;
    }

    :host([dir='rtl'][overflow~='start']) [part~='cell'][last-frozen]:not([part~='details-cell']) {
      border-left-color: var(--_lumo-grid-border-color);
    }

    :host([dir='rtl'][overflow~='end']) [part~='cell'][first-frozen-to-end]:not([part~='details-cell']) {
      border-right-color: var(--_lumo-grid-border-color);
    }
  `,{moduleId:"lumo-grid"});/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */P("vaadin-grid",D`
    @keyframes vaadin-grid-appear {
      to {
        opacity: 1;
      }
    }

    :host {
      display: flex;
      flex-direction: column;
      animation: 1ms vaadin-grid-appear;
      height: 400px;
      flex: 1 1 auto;
      align-self: stretch;
      position: relative;
    }

    :host([hidden]) {
      display: none !important;
    }

    :host([disabled]) {
      pointer-events: none;
    }

    #scroller {
      display: flex;
      flex-direction: column;
      min-height: 100%;
      transform: translateY(0);
      width: auto;
      height: auto;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    :host([all-rows-visible]) {
      height: auto;
      align-self: flex-start;
      flex-grow: 0;
      width: 100%;
    }

    :host([all-rows-visible]) #scroller {
      width: 100%;
      height: 100%;
      position: relative;
    }

    :host([all-rows-visible]) #items {
      min-height: 1px;
    }

    #table {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow: auto;
      position: relative;
      outline: none;
      /* Workaround for a Desktop Safari bug: new stacking context here prevents the scrollbar from getting hidden */
      z-index: 0;
    }

    #header,
    #footer {
      display: block;
      position: -webkit-sticky;
      position: sticky;
      left: 0;
      overflow: visible;
      width: 100%;
      z-index: 1;
    }

    #header {
      top: 0;
    }

    th {
      text-align: inherit;
    }

    /* Safari doesn't work with "inherit" */
    [safari] th {
      text-align: initial;
    }

    #footer {
      bottom: 0;
    }

    #items {
      flex-grow: 1;
      flex-shrink: 0;
      display: block;
      position: -webkit-sticky;
      position: sticky;
      width: 100%;
      left: 0;
      overflow: visible;
    }

    [part~='row'] {
      display: flex;
      width: 100%;
      box-sizing: border-box;
      margin: 0;
    }

    [part~='row'][loading] [part~='body-cell'] ::slotted(vaadin-grid-cell-content) {
      visibility: hidden;
    }

    [column-rendering='lazy'] [part~='body-cell']:not([frozen]):not([frozen-to-end]) {
      transform: translateX(var(--_grid-lazy-columns-start));
    }

    #items [part~='row'] {
      position: absolute;
    }

    #items [part~='row']:empty {
      height: 100%;
    }

    [part~='cell']:not([part~='details-cell']) {
      flex-shrink: 0;
      flex-grow: 1;
      box-sizing: border-box;
      display: flex;
      width: 100%;
      position: relative;
      align-items: center;
      padding: 0;
      white-space: nowrap;
    }

    [part~='cell'] > [tabindex] {
      display: flex;
      align-items: inherit;
      outline: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }

    [part~='details-cell'] {
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 0;
    }

    [part~='cell'] ::slotted(vaadin-grid-cell-content) {
      display: block;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [hidden] {
      display: none !important;
    }

    [frozen],
    [frozen-to-end] {
      z-index: 2;
      will-change: transform;
    }

    [no-scrollbars][safari] #table,
    [no-scrollbars][firefox] #table {
      overflow: hidden;
    }

    /* Reordering styles */
    :host([reordering]) [part~='cell'] ::slotted(vaadin-grid-cell-content),
    :host([reordering]) [part~='resize-handle'],
    #scroller[no-content-pointer-events] [part~='cell'] ::slotted(vaadin-grid-cell-content) {
      pointer-events: none;
    }

    [part~='reorder-ghost'] {
      visibility: hidden;
      position: fixed;
      pointer-events: none;
      opacity: 0.5;

      /* Prevent overflowing the grid in Firefox */
      top: 0;
      left: 0;
    }

    :host([reordering]) {
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }

    /* Resizing styles */
    [part~='resize-handle'] {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      cursor: col-resize;
      z-index: 1;
    }

    [part~='resize-handle']::before {
      position: absolute;
      content: '';
      height: 100%;
      width: 35px;
      transform: translateX(-50%);
    }

    [last-column] [part~='resize-handle']::before,
    [last-frozen] [part~='resize-handle']::before {
      width: 18px;
      transform: none;
      right: 0;
    }

    [frozen-to-end] [part~='resize-handle'] {
      left: 0;
      right: auto;
    }

    [frozen-to-end] [part~='resize-handle']::before {
      left: 0;
      right: auto;
    }

    [first-frozen-to-end] [part~='resize-handle']::before {
      width: 18px;
      transform: none;
    }

    [first-frozen-to-end] {
      margin-inline-start: auto;
    }

    /* Hide resize handle if scrolled to end */
    :host(:not([overflow~='end'])) [first-frozen-to-end] [part~='resize-handle'] {
      display: none;
    }

    #scroller[column-resizing] {
      -ms-user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      user-select: none;
    }

    /* Sizer styles */
    #sizer {
      display: flex;
      position: absolute;
      visibility: hidden;
    }

    #sizer [part~='details-cell'] {
      display: none !important;
    }

    #sizer [part~='cell'][hidden] {
      display: none !important;
    }

    #sizer [part~='cell'] {
      display: block;
      flex-shrink: 0;
      line-height: 0;
      height: 0 !important;
      min-height: 0 !important;
      max-height: 0 !important;
      padding: 0 !important;
      border: none !important;
    }

    #sizer [part~='cell']::before {
      content: '-';
    }

    #sizer [part~='cell'] ::slotted(vaadin-grid-cell-content) {
      display: none !important;
    }

    /* RTL specific styles */

    :host([dir='rtl']) #items,
    :host([dir='rtl']) #header,
    :host([dir='rtl']) #footer {
      left: auto;
    }

    :host([dir='rtl']) [part~='reorder-ghost'] {
      left: auto;
      right: 0;
    }

    :host([dir='rtl']) [part~='resize-handle'] {
      left: 0;
      right: auto;
    }

    :host([dir='rtl']) [part~='resize-handle']::before {
      transform: translateX(50%);
    }

    :host([dir='rtl']) [last-column] [part~='resize-handle']::before,
    :host([dir='rtl']) [last-frozen] [part~='resize-handle']::before {
      left: 0;
      right: auto;
    }

    :host([dir='rtl']) [frozen-to-end] [part~='resize-handle'] {
      right: 0;
      left: auto;
    }

    :host([dir='rtl']) [frozen-to-end] [part~='resize-handle']::before {
      right: 0;
      left: auto;
    }

    @media (forced-colors: active) {
      [part~='selected-row'] [part~='first-column-cell']::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        border: 2px solid;
      }

      [part~='focused-cell']::before {
        outline: 2px solid !important;
        outline-offset: -1px;
      }
    }
  `,{moduleId:"vaadin-grid-styles"});/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ei=o=>class extends o{static get observers(){return["_a11yUpdateGridSize(size, _columnTree, _columnTree.*)"]}_a11yGetHeaderRowCount(e){return e.filter(t=>t.some(i=>i.headerRenderer||i.path||i.header)).length}_a11yGetFooterRowCount(e){return e.filter(t=>t.some(i=>i.headerRenderer)).length}_a11yUpdateGridSize(e,t){if(e===void 0||t===void 0)return;const i=t[t.length-1];this.$.table.setAttribute("aria-rowcount",e+this._a11yGetHeaderRowCount(t)+this._a11yGetFooterRowCount(t)),this.$.table.setAttribute("aria-colcount",i&&i.length||0),this._a11yUpdateHeaderRows(),this._a11yUpdateFooterRows()}_a11yUpdateHeaderRows(){k(this.$.header,(e,t)=>{e.setAttribute("aria-rowindex",t+1)})}_a11yUpdateFooterRows(){k(this.$.footer,(e,t)=>{e.setAttribute("aria-rowindex",this._a11yGetHeaderRowCount(this._columnTree)+this.size+t+1)})}_a11yUpdateRowRowindex(e,t){e.setAttribute("aria-rowindex",t+this._a11yGetHeaderRowCount(this._columnTree)+1)}_a11yUpdateRowSelected(e,t){e.setAttribute("aria-selected",!!t),te(e,i=>{i.setAttribute("aria-selected",!!t)})}_a11yUpdateRowExpanded(e){this.__isRowExpandable(e)?e.setAttribute("aria-expanded","false"):this.__isRowCollapsible(e)?e.setAttribute("aria-expanded","true"):e.removeAttribute("aria-expanded")}_a11yUpdateRowLevel(e,t){t>0||this.__isRowCollapsible(e)||this.__isRowExpandable(e)?e.setAttribute("aria-level",t+1):e.removeAttribute("aria-level")}_a11ySetRowDetailsCell(e,t){te(e,i=>{i!==t&&i.setAttribute("aria-controls",t.id)})}_a11yUpdateCellColspan(e,t){e.setAttribute("aria-colspan",Number(t))}_a11yUpdateSorters(){Array.from(this.querySelectorAll("vaadin-grid-sorter")).forEach(e=>{let t=e.parentNode;for(;t&&t.localName!=="vaadin-grid-cell-content";)t=t.parentNode;t&&t.assignedSlot&&t.assignedSlot.parentNode.setAttribute("aria-sort",{asc:"ascending",desc:"descending"}[String(e.direction)]||"none")})}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const lt=o=>{if(!o.parentNode)return!1;const e=Array.from(o.parentNode.querySelectorAll("[tabindex], button, input, select, textarea, object, iframe, a[href], area[href]")).filter(t=>{const i=t.getAttribute("part");return!(i&&i.includes("body-cell"))}).includes(o);return!o.disabled&&e&&o.offsetParent&&getComputedStyle(o).visibility!=="hidden"},ti=o=>class extends o{static get properties(){return{activeItem:{type:Object,notify:!0,value:null}}}ready(){super.ready(),this.$.scroller.addEventListener("click",this._onClick.bind(this)),this.addEventListener("cell-activate",this._activateItem.bind(this)),this.addEventListener("row-activate",this._activateItem.bind(this))}_activateItem(e){const t=e.detail.model,i=t?t.item:null;i&&(this.activeItem=this._itemsEqual(this.activeItem,i)?null:i)}_onClick(e){if(e.defaultPrevented)return;const t=e.composedPath(),i=t[t.indexOf(this.$.table)-3];if(!i||i.getAttribute("part").indexOf("details-cell")>-1)return;const s=i._content,n=this.getRootNode().activeElement;!s.contains(n)&&!this._isFocusable(e.target)&&!(e.target instanceof HTMLLabelElement)&&this.dispatchEvent(new CustomEvent("cell-activate",{detail:{model:this.__getRowModel(i.parentElement)}}))}_isFocusable(e){return lt(e)}};function Q(o,r){return o.split(".").reduce((e,t)=>e[t],r)}function Ue(o,r,e){if(e.length===0)return!1;let t=!0;return o.forEach(({path:i})=>{if(!i||i.indexOf(".")===-1)return;const s=i.replace(/\.[^.]*$/u,"");Q(s,e[0])===void 0&&(console.warn(`Path "${i}" used for ${r} does not exist in all of the items, ${r} is disabled.`),t=!1)}),t}function pe(o){return[void 0,null].indexOf(o)>=0?"":isNaN(o)?o.toString():o}function Ke(o,r){return o=pe(o),r=pe(r),o<r?-1:o>r?1:0}function ii(o,r){return o.sort((e,t)=>r.map(i=>i.direction==="asc"?Ke(Q(i.path,e),Q(i.path,t)):i.direction==="desc"?Ke(Q(i.path,t),Q(i.path,e)):0).reduce((i,s)=>i!==0?i:s,0))}function ri(o,r){return o.filter(e=>r.every(t=>{const i=pe(Q(t.path,e)),s=pe(t.value).toString().toLowerCase();return i.toString().toLowerCase().includes(s)}))}const si=o=>(r,e)=>{let t=o?[...o]:[];r.filters&&Ue(r.filters,"filtering",t)&&(t=ri(t,r.filters)),Array.isArray(r.sortOrders)&&r.sortOrders.length&&Ue(r.sortOrders,"sorting",t)&&(t=ii(t,r.sortOrders));const i=Math.min(t.length,r.pageSize),s=r.page*i,n=s+i,l=t.slice(s,n);e(l,t.length)};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ni=o=>class extends o{static get properties(){return{items:Array}}static get observers(){return["__dataProviderOrItemsChanged(dataProvider, items, isAttached, items.*, _filters, _sorters)"]}__setArrayDataProvider(e){const t=si(this.items);t.__items=e,this.setProperties({_arrayDataProvider:t,size:e.length,dataProvider:t})}__dataProviderOrItemsChanged(e,t,i){i&&(this._arrayDataProvider?e!==this._arrayDataProvider?this.setProperties({_arrayDataProvider:void 0,items:void 0}):t?this._arrayDataProvider.__items===t?(this.clearCache(),this.size=this._effectiveSize):this.__setArrayDataProvider(t):(this.setProperties({_arrayDataProvider:void 0,dataProvider:void 0,size:0}),this.clearCache()):t&&this.__setArrayDataProvider(t))}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const oi=o=>class extends o{static get properties(){return{columnReorderingAllowed:{type:Boolean,value:!1},_orderBaseScope:{type:Number,value:1e7}}}static get observers(){return["_updateOrders(_columnTree)"]}ready(){super.ready(),ve(this,"track",this._onTrackEvent),this._reorderGhost=this.shadowRoot.querySelector('[part="reorder-ghost"]'),this.addEventListener("touchstart",this._onTouchStart.bind(this)),this.addEventListener("touchmove",this._onTouchMove.bind(this)),this.addEventListener("touchend",this._onTouchEnd.bind(this)),this.addEventListener("contextmenu",this._onContextMenu.bind(this))}_onContextMenu(e){this.hasAttribute("reordering")&&(e.preventDefault(),be||this._onTrackEnd())}_onTouchStart(e){this._startTouchReorderTimeout=setTimeout(()=>{this._onTrackStart({detail:{x:e.touches[0].clientX,y:e.touches[0].clientY}})},100)}_onTouchMove(e){this._draggedColumn&&e.preventDefault(),clearTimeout(this._startTouchReorderTimeout)}_onTouchEnd(){clearTimeout(this._startTouchReorderTimeout),this._onTrackEnd()}_onTrackEvent(e){if(e.detail.state==="start"){const t=e.composedPath(),i=t[t.indexOf(this.$.header)-2];if(!i||!i._content||i._content.contains(this.getRootNode().activeElement)||this.$.scroller.hasAttribute("column-resizing"))return;this._touchDevice||this._onTrackStart(e)}else e.detail.state==="track"?this._onTrack(e):e.detail.state==="end"&&this._onTrackEnd(e)}_onTrackStart(e){if(!this.columnReorderingAllowed)return;const t=e.composedPath&&e.composedPath();if(t&&t.some(s=>s.hasAttribute&&s.hasAttribute("draggable")))return;const i=this._cellFromPoint(e.detail.x,e.detail.y);if(!(!i||!i.getAttribute("part").includes("header-cell"))){for(this.toggleAttribute("reordering",!0),this._draggedColumn=i._column;this._draggedColumn.parentElement.childElementCount===1;)this._draggedColumn=this._draggedColumn.parentElement;this._setSiblingsReorderStatus(this._draggedColumn,"allowed"),this._draggedColumn._reorderStatus="dragging",this._updateGhost(i),this._reorderGhost.style.visibility="visible",this._updateGhostPosition(e.detail.x,this._touchDevice?e.detail.y-50:e.detail.y),this._autoScroller()}}_onTrack(e){if(!this._draggedColumn)return;const t=this._cellFromPoint(e.detail.x,e.detail.y);if(!t)return;const i=this._getTargetColumn(t,this._draggedColumn);if(this._isSwapAllowed(this._draggedColumn,i)&&this._isSwappableByPosition(i,e.detail.x)){const s=this._columnTree.findIndex(_=>_.includes(i)),n=this._getColumnsInOrder(s),l=n.indexOf(this._draggedColumn),u=n.indexOf(i),f=l<u?1:-1;for(let _=l;_!==u;_+=f)this._swapColumnOrders(this._draggedColumn,n[_+f])}this._updateGhostPosition(e.detail.x,this._touchDevice?e.detail.y-50:e.detail.y),this._lastDragClientX=e.detail.x}_onTrackEnd(){this._draggedColumn&&(this.toggleAttribute("reordering",!1),this._draggedColumn._reorderStatus="",this._setSiblingsReorderStatus(this._draggedColumn,""),this._draggedColumn=null,this._lastDragClientX=null,this._reorderGhost.style.visibility="hidden",this.dispatchEvent(new CustomEvent("column-reorder",{detail:{columns:this._getColumnsInOrder()}})))}_getColumnsInOrder(e=this._columnTree.length-1){return this._columnTree[e].filter(t=>!t.hidden).sort((t,i)=>t._order-i._order)}_cellFromPoint(e=0,t=0){this._draggedColumn||this.$.scroller.toggleAttribute("no-content-pointer-events",!0);const i=this.shadowRoot.elementFromPoint(e,t);if(this.$.scroller.toggleAttribute("no-content-pointer-events",!1),i&&i._column)return i}_updateGhostPosition(e,t){const i=this._reorderGhost.getBoundingClientRect(),s=e-i.width/2,n=t-i.height/2,l=parseInt(this._reorderGhost._left||0),u=parseInt(this._reorderGhost._top||0);this._reorderGhost._left=l-(i.left-s),this._reorderGhost._top=u-(i.top-n),this._reorderGhost.style.transform=`translate(${this._reorderGhost._left}px, ${this._reorderGhost._top}px)`}_updateGhost(e){const t=this._reorderGhost;t.textContent=e._content.innerText;const i=window.getComputedStyle(e);return["boxSizing","display","width","height","background","alignItems","padding","border","flex-direction","overflow"].forEach(s=>{t.style[s]=i[s]}),t}_updateOrders(e){e!==void 0&&(e[0].forEach(t=>{t._order=0}),nt(e[0],this._orderBaseScope,0))}_setSiblingsReorderStatus(e,t){k(e.parentNode,i=>{/column/u.test(i.localName)&&this._isSwapAllowed(i,e)&&(i._reorderStatus=t)})}_autoScroller(){if(this._lastDragClientX){const e=this._lastDragClientX-this.getBoundingClientRect().right+50,t=this.getBoundingClientRect().left-this._lastDragClientX+50;e>0?this.$.table.scrollLeft+=e/10:t>0&&(this.$.table.scrollLeft-=t/10)}this._draggedColumn&&setTimeout(()=>this._autoScroller(),10)}_isSwapAllowed(e,t){if(e&&t){const i=e!==t,s=e.parentElement===t.parentElement,n=e.frozen&&t.frozen||e.frozenToEnd&&t.frozenToEnd||!e.frozen&&!e.frozenToEnd&&!t.frozen&&!t.frozenToEnd;return i&&s&&n}}_isSwappableByPosition(e,t){const i=Array.from(this.$.header.querySelectorAll('tr:not([hidden]) [part~="cell"]')).find(l=>e.contains(l._column)),s=this.$.header.querySelector("tr:not([hidden]) [reorder-status=dragging]").getBoundingClientRect(),n=i.getBoundingClientRect();return n.left>s.left?t>n.right-s.width:t<n.left+s.width}_swapColumnOrders(e,t){[e._order,t._order]=[t._order,e._order],this._debounceUpdateFrozenColumn(),this._updateFirstAndLastColumn()}_getTargetColumn(e,t){if(e&&t){let i=e._column;for(;i.parentElement!==t.parentElement&&i!==this;)i=i.parentElement;return i.parentElement===t.parentElement?i:e._column}}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ai=o=>class extends o{ready(){super.ready();const e=this.$.scroller;ve(e,"track",this._onHeaderTrack.bind(this)),e.addEventListener("touchmove",t=>e.hasAttribute("column-resizing")&&t.preventDefault()),e.addEventListener("contextmenu",t=>t.target.getAttribute("part")==="resize-handle"&&t.preventDefault()),e.addEventListener("mousedown",t=>t.target.getAttribute("part")==="resize-handle"&&t.preventDefault())}_onHeaderTrack(e){const t=e.target;if(t.getAttribute("part")==="resize-handle"){let s=t.parentElement._column;for(this.$.scroller.toggleAttribute("column-resizing",!0);s.localName==="vaadin-grid-column-group";)s=s._childColumns.slice(0).sort((m,g)=>m._order-g._order).filter(m=>!m.hidden).pop();const n=this.__isRTL,l=e.detail.x,u=Array.from(this.$.header.querySelectorAll('[part~="row"]:last-child [part~="cell"]')),f=u.find(m=>m._column===s);if(f.offsetWidth){const m=getComputedStyle(f._content),g=10+parseInt(m.paddingLeft)+parseInt(m.paddingRight)+parseInt(m.borderLeftWidth)+parseInt(m.borderRightWidth)+parseInt(m.marginLeft)+parseInt(m.marginRight);let A;const w=f.offsetWidth,I=f.getBoundingClientRect();f.hasAttribute("frozen-to-end")?A=w+(n?l-I.right:I.left-l):A=w+(n?I.left-l:l-I.right),s.width=`${Math.max(g,A)}px`,s.flexGrow=0}u.sort((m,g)=>m._column._order-g._column._order).forEach((m,g,A)=>{g<A.indexOf(f)&&(m._column.width=`${m.offsetWidth}px`,m._column.flexGrow=0)});const _=this._frozenToEndCells[0];if(_&&this.$.table.scrollWidth>this.$.table.offsetWidth){const m=_.getBoundingClientRect(),g=l-(n?m.right:m.left);(n&&g<=0||!n&&g>=0)&&(this.$.table.scrollLeft+=g)}e.detail.state==="end"&&(this.$.scroller.toggleAttribute("column-resizing",!1),this.dispatchEvent(new CustomEvent("column-resize",{detail:{resizedColumn:s}}))),this._resizeHandler()}}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const F=class dt{constructor(r,e,t){this.grid=r,this.parentCache=e,this.parentItem=t,this.itemCaches={},this.items={},this.effectiveSize=0,this.size=0,this.pendingRequests={}}isLoading(){return!!(Object.keys(this.pendingRequests).length||Object.keys(this.itemCaches).filter(r=>this.itemCaches[r].isLoading())[0])}getItemForIndex(r){const{cache:e,scaledIndex:t}=this.getCacheAndIndex(r);return e.items[t]}updateSize(){this.effectiveSize=!this.parentItem||this.grid._isExpanded(this.parentItem)?this.size+Object.keys(this.itemCaches).reduce((r,e)=>{const t=this.itemCaches[e];return t.updateSize(),r+t.effectiveSize},0):0}ensureSubCacheForScaledIndex(r){if(!this.itemCaches[r]){const e=new dt(this.grid,this,this.items[r]);this.itemCaches[r]=e,this.grid._loadPage(0,e)}}getCacheAndIndex(r){let e=r;for(const[t,i]of Object.entries(this.itemCaches)){const s=Number(t);if(e<=s)return{cache:this,scaledIndex:e};if(e<=s+i.effectiveSize)return i.getCacheAndIndex(e-s-1);e-=i.effectiveSize}return{cache:this,scaledIndex:e}}getFlatIndex(r){const e=Math.max(0,Math.min(this.size-1,r));return Object.entries(this.itemCaches).reduce((t,[i,s])=>e>Number(i)?t+s.effectiveSize:t,e)}},li=o=>class extends o{static get properties(){return{size:{type:Number,notify:!0},pageSize:{type:Number,value:50,observer:"_pageSizeChanged"},dataProvider:{type:Object,notify:!0,observer:"_dataProviderChanged"},loading:{type:Boolean,notify:!0,readOnly:!0,reflectToAttribute:!0},_cache:{type:Object,value(){return new F(this)}},_hasData:{type:Boolean,value:!1},itemHasChildrenPath:{type:String,value:"children",observer:"__itemHasChildrenPathChanged"},itemIdPath:{type:String,value:null},expandedItems:{type:Object,notify:!0,value:()=>[]},__expandedKeys:{type:Object,computed:"__computeExpandedKeys(itemIdPath, expandedItems.*)"}}}static get observers(){return["_sizeChanged(size)","_expandedItemsChanged(expandedItems.*)"]}_sizeChanged(e){const t=e-this._cache.size;this._cache.size+=t,this._cache.effectiveSize+=t,this._effectiveSize=this._cache.effectiveSize}__itemHasChildrenPathChanged(e,t){!t&&e==="children"||this.requestContentUpdate()}_getItem(e,t){if(e>=this._effectiveSize)return;t.index=e;const{cache:i,scaledIndex:s}=this._cache.getCacheAndIndex(e),n=i.items[s];n?(this.__updateLoading(t,!1),this._updateItem(t,n),this._isExpanded(n)&&i.ensureSubCacheForScaledIndex(s)):(this.__updateLoading(t,!0),this._loadPage(this._getPageForIndex(s),i))}__updateLoading(e,t){const i=ee(e);Ce(e,"loading",t),G(i,"loading-row-cell",t)}getItemId(e){return this.itemIdPath?this.get(this.itemIdPath,e):e}_isExpanded(e){return this.__expandedKeys.has(this.getItemId(e))}_expandedItemsChanged(){this._cache.updateSize(),this._effectiveSize=this._cache.effectiveSize,this.__updateVisibleRows()}__computeExpandedKeys(e,t){const i=t.base||[],s=new Set;return i.forEach(n=>{s.add(this.getItemId(n))}),s}expandItem(e){this._isExpanded(e)||(this.expandedItems=[...this.expandedItems,e])}collapseItem(e){this._isExpanded(e)&&(this.expandedItems=this.expandedItems.filter(t=>!this._itemsEqual(t,e)))}_getIndexLevel(e){let{cache:t}=this._cache.getCacheAndIndex(e),i=0;for(;t.parentCache;)t=t.parentCache,i+=1;return i}_loadPage(e,t){if(!t.pendingRequests[e]&&this.dataProvider){this._setLoading(!0),t.pendingRequests[e]=!0;const i={page:e,pageSize:this.pageSize,sortOrders:this._mapSorters(),filters:this._mapFilters(),parentItem:t.parentItem};this.dataProvider(i,(s,n)=>{n!==void 0?t.size=n:i.parentItem&&(t.size=s.length),s.forEach((l,u)=>{const f=e*this.pageSize+u;t.items[f]=l}),this._cache.updateSize(),this._effectiveSize=this._cache.effectiveSize,this._getVisibleRows().forEach(l=>{const{cache:u,scaledIndex:f}=this._cache.getCacheAndIndex(l.index),_=u.items[f];_&&this._isExpanded(_)&&u.ensureSubCacheForScaledIndex(f)}),this._hasData=!0,delete t.pendingRequests[e],this._debouncerApplyCachedData=T.debounce(this._debouncerApplyCachedData,J.after(0),()=>{this._setLoading(!1),this._getVisibleRows().forEach(l=>{this._cache.getItemForIndex(l.index)&&this._getItem(l.index,l)}),this.__scrollToPendingIndexes()}),this._cache.isLoading()||this._debouncerApplyCachedData.flush(),this._onDataProviderPageLoaded()})}}_onDataProviderPageLoaded(){}_getPageForIndex(e){return Math.floor(e/this.pageSize)}clearCache(){this._cache=new F(this),this._cache.size=this.size||0,this._cache.updateSize(),this._hasData=!1,this.__updateVisibleRows(),this._effectiveSize||this._loadPage(0,this._cache)}_pageSizeChanged(e,t){t!==void 0&&e!==t&&this.clearCache()}_checkSize(){this.size===void 0&&this._effectiveSize===0&&console.warn("The <vaadin-grid> needs the total number of items in order to display rows, which you can specify either by setting the `size` property, or by providing it to the second argument of the `dataProvider` function `callback` call.")}_dataProviderChanged(e,t){t!==void 0&&this.clearCache(),this._ensureFirstPageLoaded(),this._debouncerCheckSize=T.debounce(this._debouncerCheckSize,J.after(2e3),this._checkSize.bind(this))}_ensureFirstPageLoaded(){this._hasData||this._loadPage(0,this._cache)}_itemsEqual(e,t){return this.getItemId(e)===this.getItemId(t)}_getItemIndexInArray(e,t){let i=-1;return t.forEach((s,n)=>{this._itemsEqual(s,e)&&(i=n)}),i}scrollToIndex(...e){let t;for(;t!==(t=this.__getGlobalFlatIndex(e));)this._scrollToFlatIndex(t);(this._cache.isLoading()||!this.clientHeight)&&(this.__pendingScrollToIndexes=e)}__getGlobalFlatIndex([e,...t],i=this._cache,s=0){e===1/0&&(e=i.size-1);const n=i.getFlatIndex(e),l=i.itemCaches[e];return l&&l.effectiveSize&&t.length?this.__getGlobalFlatIndex(t,l,s+n+1):s+n}__scrollToPendingIndexes(){if(this.__pendingScrollToIndexes&&this.$.items.children.length){const e=this.__pendingScrollToIndexes;delete this.__pendingScrollToIndexes,this.scrollToIndex(...e)}}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const se={BETWEEN:"between",ON_TOP:"on-top",ON_TOP_OR_BETWEEN:"on-top-or-between",ON_GRID:"on-grid"},H={ON_TOP:"on-top",ABOVE:"above",BELOW:"below",EMPTY:"empty"},di=!("draggable"in document.createElement("div")),ci=o=>class extends o{static get properties(){return{dropMode:String,rowsDraggable:Boolean,dragFilter:Function,dropFilter:Function,__dndAutoScrollThreshold:{value:50}}}static get observers(){return["_dragDropAccessChanged(rowsDraggable, dropMode, dragFilter, dropFilter, loading)"]}ready(){super.ready(),this.$.table.addEventListener("dragstart",this._onDragStart.bind(this)),this.$.table.addEventListener("dragend",this._onDragEnd.bind(this)),this.$.table.addEventListener("dragover",this._onDragOver.bind(this)),this.$.table.addEventListener("dragleave",this._onDragLeave.bind(this)),this.$.table.addEventListener("drop",this._onDrop.bind(this)),this.$.table.addEventListener("dragenter",e=>{this.dropMode&&(e.preventDefault(),e.stopPropagation())})}_onDragStart(e){if(this.rowsDraggable){let t=e.target;if(t.localName==="vaadin-grid-cell-content"&&(t=t.assignedSlot.parentNode.parentNode),t.parentNode!==this.$.items)return;if(e.stopPropagation(),this.toggleAttribute("dragging-rows",!0),this._safari){const l=t.style.transform;t.style.top=/translateY\((.*)\)/u.exec(l)[1],t.style.transform="none",requestAnimationFrame(()=>{t.style.top="",t.style.transform=l})}const i=t.getBoundingClientRect();di?e.dataTransfer.setDragImage(t):e.dataTransfer.setDragImage(t,e.clientX-i.left,e.clientY-i.top);let s=[t];this._isSelected(t._item)&&(s=this.__getViewportRows().filter(l=>this._isSelected(l._item)).filter(l=>!this.dragFilter||this.dragFilter(this.__getRowModel(l)))),e.dataTransfer.setData("text",this.__formatDefaultTransferData(s)),ne(t,{dragstart:s.length>1?`${s.length}`:""}),this.style.setProperty("--_grid-drag-start-x",`${e.clientX-i.left+20}px`),this.style.setProperty("--_grid-drag-start-y",`${e.clientY-i.top+10}px`),requestAnimationFrame(()=>{ne(t,{dragstart:!1}),this.style.setProperty("--_grid-drag-start-x",""),this.style.setProperty("--_grid-drag-start-y","")});const n=new CustomEvent("grid-dragstart",{detail:{draggedItems:s.map(l=>l._item),setDragData:(l,u)=>e.dataTransfer.setData(l,u),setDraggedItemsCount:l=>t.setAttribute("dragstart",l)}});n.originalEvent=e,this.dispatchEvent(n)}}_onDragEnd(e){this.toggleAttribute("dragging-rows",!1),e.stopPropagation();const t=new CustomEvent("grid-dragend");t.originalEvent=e,this.dispatchEvent(t)}_onDragLeave(e){e.stopPropagation(),this._clearDragStyles()}_onDragOver(e){if(this.dropMode){if(this._dropLocation=void 0,this._dragOverItem=void 0,this.__dndAutoScroll(e.clientY)){this._clearDragStyles();return}let t=e.composedPath().find(i=>i.localName==="tr");if(!this._effectiveSize||this.dropMode===se.ON_GRID)this._dropLocation=H.EMPTY;else if(!t||t.parentNode!==this.$.items){if(t)return;if(this.dropMode===se.BETWEEN||this.dropMode===se.ON_TOP_OR_BETWEEN)t=Array.from(this.$.items.children).filter(i=>!i.hidden).pop(),this._dropLocation=H.BELOW;else return}else{const i=t.getBoundingClientRect();if(this._dropLocation=H.ON_TOP,this.dropMode===se.BETWEEN){const s=e.clientY-i.top<i.bottom-e.clientY;this._dropLocation=s?H.ABOVE:H.BELOW}else this.dropMode===se.ON_TOP_OR_BETWEEN&&(e.clientY-i.top<i.height/3?this._dropLocation=H.ABOVE:e.clientY-i.top>i.height/3*2&&(this._dropLocation=H.BELOW))}if(t&&t.hasAttribute("drop-disabled")){this._dropLocation=void 0;return}e.stopPropagation(),e.preventDefault(),this._dropLocation===H.EMPTY?this.toggleAttribute("dragover",!0):t?(this._dragOverItem=t._item,t.getAttribute("dragover")!==this._dropLocation&&Be(t,{dragover:this._dropLocation})):this._clearDragStyles()}}__dndAutoScroll(e){if(this.__dndAutoScrolling)return!0;const t=this.$.header.getBoundingClientRect().bottom,i=this.$.footer.getBoundingClientRect().top,s=t-e+this.__dndAutoScrollThreshold,n=e-i+this.__dndAutoScrollThreshold;let l=0;if(n>0?l=n*2:s>0&&(l=-s*2),l){const u=this.$.table.scrollTop;if(this.$.table.scrollTop+=l,u!==this.$.table.scrollTop)return this.__dndAutoScrolling=!0,setTimeout(()=>{this.__dndAutoScrolling=!1},20),!0}}__getViewportRows(){const e=this.$.header.getBoundingClientRect().bottom,t=this.$.footer.getBoundingClientRect().top;return Array.from(this.$.items.children).filter(i=>{const s=i.getBoundingClientRect();return s.bottom>e&&s.top<t})}_clearDragStyles(){this.removeAttribute("dragover"),k(this.$.items,e=>{Be(e,{dragover:null})})}_onDrop(e){if(this.dropMode){e.stopPropagation(),e.preventDefault();const t=e.dataTransfer.types&&Array.from(e.dataTransfer.types).map(s=>({type:s,data:e.dataTransfer.getData(s)}));this._clearDragStyles();const i=new CustomEvent("grid-drop",{bubbles:e.bubbles,cancelable:e.cancelable,detail:{dropTargetItem:this._dragOverItem,dropLocation:this._dropLocation,dragData:t}});i.originalEvent=e,this.dispatchEvent(i)}}__formatDefaultTransferData(e){return e.map(t=>Array.from(t.children).filter(i=>!i.hidden&&i.getAttribute("part").indexOf("details-cell")===-1).sort((i,s)=>i._column._order>s._column._order?1:-1).map(i=>i._content.textContent.trim()).filter(i=>i).join("	")).join(`
`)}_dragDropAccessChanged(){this.filterDragAndDrop()}filterDragAndDrop(){k(this.$.items,e=>{e.hidden||this._filterDragAndDrop(e,this.__getRowModel(e))})}_filterDragAndDrop(e,t){const i=this.loading||e.hasAttribute("loading"),s=!this.rowsDraggable||i||this.dragFilter&&!this.dragFilter(t),n=!this.dropMode||i||this.dropFilter&&!this.dropFilter(t);te(e,l=>{s?l._content.removeAttribute("draggable"):l._content.setAttribute("draggable",!0)}),ne(e,{"drag-disabled":!!s,"drop-disabled":!!n})}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function ct(o,r){if(!o||!r||o.length!==r.length)return!1;for(let e=0,t=o.length;e<t;e++)if(o[e]instanceof Array&&r[e]instanceof Array){if(!ct(o[e],r[e]))return!1}else if(o[e]!==r[e])return!1;return!0}const hi=o=>class extends o{static get properties(){return{_columnTree:Object}}ready(){super.ready(),this._addNodeObserver()}_hasColumnGroups(e){return e.some(t=>t.localName==="vaadin-grid-column-group")}_getChildColumns(e){return K.getFlattenedNodes(e).filter(this._isColumnElement)}_flattenColumnGroups(e){return e.map(t=>t.localName==="vaadin-grid-column-group"?this._getChildColumns(t):[t]).reduce((t,i)=>t.concat(i),[])}_getColumnTree(){const e=K.getFlattenedNodes(this).filter(this._isColumnElement),t=[e];let i=e;for(;this._hasColumnGroups(i);)i=this._flattenColumnGroups(i),t.push(i);return t}_debounceUpdateColumnTree(){this.__updateColumnTreeDebouncer=T.debounce(this.__updateColumnTreeDebouncer,fe,()=>this._updateColumnTree())}_updateColumnTree(){const e=this._getColumnTree();ct(e,this._columnTree)||(this._columnTree=e)}_addNodeObserver(){this._observer=new K(this,e=>{const t=i=>i.filter(this._isColumnElement).length>0;if(t(e.addedNodes)||t(e.removedNodes)){const i=e.removedNodes.flatMap(n=>n._allCells),s=n=>i.filter(l=>l&&l._content.contains(n)).length;this.__removeSorters(this._sorters.filter(s)),this.__removeFilters(this._filters.filter(s)),this._debounceUpdateColumnTree()}this._debouncerCheckImports=T.debounce(this._debouncerCheckImports,J.after(2e3),this._checkImports.bind(this)),this._ensureFirstPageLoaded()})}_checkImports(){["vaadin-grid-column-group","vaadin-grid-filter","vaadin-grid-filter-column","vaadin-grid-tree-toggle","vaadin-grid-selection-column","vaadin-grid-sort-column","vaadin-grid-sorter"].forEach(e=>{const t=this.querySelector(e);t&&!(t instanceof B)&&console.warn(`Make sure you have imported the required module for <${e}> element.`)})}_updateFirstAndLastColumn(){Array.from(this.shadowRoot.querySelectorAll("tr")).forEach(e=>this._updateFirstAndLastColumnForRow(e))}_updateFirstAndLastColumnForRow(e){Array.from(e.querySelectorAll('[part~="cell"]:not([part~="details-cell"])')).sort((t,i)=>t._column._order-i._column._order).forEach((t,i,s)=>{U(t,"first-column",i===0),U(t,"last-column",i===s.length-1)})}_isColumnElement(e){return e.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/u.test(e.localName)}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ui=o=>class extends o{getEventContext(e){const t={},i=e.__composedPath||e.composedPath(),s=i[i.indexOf(this.$.table)-3];return s&&(t.section=["body","header","footer","details"].find(n=>s.getAttribute("part").indexOf(n)>-1),s._column&&(t.column=s._column),(t.section==="body"||t.section==="details")&&Object.assign(t,this.__getRowModel(s.parentElement))),t}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const _i=o=>class extends o{static get properties(){return{_filters:{type:Array,value:()=>[]}}}ready(){super.ready(),this.addEventListener("filter-changed",this._filterChanged.bind(this))}_filterChanged(e){e.stopPropagation(),this.__addFilter(e.target),this.__applyFilters()}__removeFilters(e){e.length!==0&&(this._filters=this._filters.filter(t=>e.indexOf(t)<0),this.__applyFilters())}__addFilter(e){this._filters.indexOf(e)===-1&&this._filters.push(e)}__applyFilters(){this.dataProvider&&this.isAttached&&this.clearCache()}_mapFilters(){return this._filters.map(e=>({path:e.path,value:e.value}))}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const fi=o=>class extends o{static get properties(){return{_headerFocusable:{type:Object,observer:"_focusableChanged"},_itemsFocusable:{type:Object,observer:"_focusableChanged"},_footerFocusable:{type:Object,observer:"_focusableChanged"},_navigatingIsHidden:Boolean,_focusedItemIndex:{type:Number,value:0},_focusedColumnOrder:Number,_focusedCell:{type:Object,observer:"_focusedCellChanged"},interacting:{type:Boolean,value:!1,reflectToAttribute:!0,readOnly:!0,observer:"_interactingChanged"}}}get __rowFocusMode(){return this.__isRow(this._itemsFocusable)||this.__isRow(this._headerFocusable)||this.__isRow(this._footerFocusable)}set __rowFocusMode(e){["_itemsFocusable","_footerFocusable","_headerFocusable"].forEach(t=>{const i=this[t];if(e){const s=i&&i.parentElement;this.__isCell(i)?this[t]=s:this.__isCell(s)&&(this[t]=s.parentElement)}else if(!e&&this.__isRow(i)){const s=i.firstElementChild;this[t]=s._focusButton||s}})}ready(){super.ready(),!(this._ios||this._android)&&(this.addEventListener("keydown",this._onKeyDown),this.addEventListener("keyup",this._onKeyUp),this.addEventListener("focusin",this._onFocusIn),this.addEventListener("focusout",this._onFocusOut),this.$.table.addEventListener("focusin",this._onContentFocusIn.bind(this)),this.addEventListener("mousedown",()=>{this.toggleAttribute("navigating",!1),this._isMousedown=!0,this._focusedColumnOrder=void 0}),this.addEventListener("mouseup",()=>{this._isMousedown=!1}))}_focusableChanged(e,t){t&&t.setAttribute("tabindex","-1"),e&&this._updateGridSectionFocusTarget(e)}_focusedCellChanged(e,t){t&&Xe(t,"part","focused-cell"),e&&Ze(e,"part","focused-cell")}_interactingChanged(){this._updateGridSectionFocusTarget(this._headerFocusable),this._updateGridSectionFocusTarget(this._itemsFocusable),this._updateGridSectionFocusTarget(this._footerFocusable)}__updateItemsFocusable(){if(!this._itemsFocusable)return;const e=this.shadowRoot.activeElement===this._itemsFocusable;this._getVisibleRows().forEach(t=>{if(t.index===this._focusedItemIndex)if(this.__rowFocusMode)this._itemsFocusable=t;else{let i=this._itemsFocusable.parentElement,s=this._itemsFocusable;if(i){this.__isCell(i)&&(s=i,i=i.parentElement);const n=[...i.children].indexOf(s);this._itemsFocusable=this.__getFocusable(t,t.children[n])}}}),e&&this._itemsFocusable.focus()}_onKeyDown(e){const t=e.key;let i;switch(t){case"ArrowUp":case"ArrowDown":case"ArrowLeft":case"ArrowRight":case"PageUp":case"PageDown":case"Home":case"End":i="Navigation";break;case"Enter":case"Escape":case"F2":i="Interaction";break;case"Tab":i="Tab";break;case" ":i="Space";break}this._detectInteracting(e),this.interacting&&i!=="Interaction"&&(i=void 0),i&&this[`_on${i}KeyDown`](e,t)}_ensureScrolledToIndex(e){[...this.$.items.children].find(i=>i.index===e)?this.__scrollIntoViewport(e):this.scrollToIndex(e)}__isRowExpandable(e){if(this.itemHasChildrenPath){const t=e._item;return t&&this.get(this.itemHasChildrenPath,t)&&!this._isExpanded(t)}}__isRowCollapsible(e){return this._isExpanded(e._item)}__isDetailsCell(e){return e.matches('[part~="details-cell"]')}__isCell(e){return e instanceof HTMLTableCellElement}__isRow(e){return e instanceof HTMLTableRowElement}__getIndexOfChildElement(e){return Array.prototype.indexOf.call(e.parentNode.children,e)}_onNavigationKeyDown(e,t){e.preventDefault();const i=this._lastVisibleIndex-this._firstVisibleIndex-1,s=this.__isRTL;let n=0,l=0;switch(t){case"ArrowRight":n=s?-1:1;break;case"ArrowLeft":n=s?1:-1;break;case"Home":this.__rowFocusMode||e.ctrlKey?l=-1/0:n=-1/0;break;case"End":this.__rowFocusMode||e.ctrlKey?l=1/0:n=1/0;break;case"ArrowDown":l=1;break;case"ArrowUp":l=-1;break;case"PageDown":l=i;break;case"PageUp":l=-i;break}const u=e.composedPath().find(g=>this.__isRow(g)),f=e.composedPath().find(g=>this.__isCell(g));if(this.__rowFocusMode&&!u||!this.__rowFocusMode&&!f)return;const _=s?"ArrowLeft":"ArrowRight",m=s?"ArrowRight":"ArrowLeft";if(t===_){if(this.__rowFocusMode){if(this.__isRowExpandable(u)){this.expandItem(u._item);return}this.__rowFocusMode=!1,this._onCellNavigation(u.firstElementChild,0,0);return}}else if(t===m)if(this.__rowFocusMode){if(this.__isRowCollapsible(u)){this.collapseItem(u._item);return}}else{const g=[...u.children].sort((A,w)=>A._order-w._order);if(f===g[0]||this.__isDetailsCell(f)){this.__rowFocusMode=!0,this._onRowNavigation(u,0);return}}this.__rowFocusMode?this._onRowNavigation(u,l):this._onCellNavigation(f,n,l)}_onRowNavigation(e,t){const{dstRow:i}=this.__navigateRows(t,e);i&&i.focus()}__getIndexInGroup(e,t){return e.parentNode===this.$.items?t!==void 0?t:e.index:this.__getIndexOfChildElement(e)}__navigateRows(e,t,i){const s=this.__getIndexInGroup(t,this._focusedItemIndex),n=t.parentNode,l=(n===this.$.items?this._effectiveSize:n.children.length)-1;let u=Math.max(0,Math.min(s+e,l));if(n!==this.$.items){if(u>s)for(;u<l&&n.children[u].hidden;)u+=1;else if(u<s)for(;u>0&&n.children[u].hidden;)u-=1;return this.toggleAttribute("navigating",!0),{dstRow:n.children[u]}}let f=!1;if(i){const _=this.__isDetailsCell(i);if(n===this.$.items){const m=t._item,g=this._cache.getItemForIndex(u);_?f=e===0:f=e===1&&this._isDetailsOpened(m)||e===-1&&u!==s&&this._isDetailsOpened(g),f!==_&&(e===1&&f||e===-1&&!f)&&(u=s)}}return this._ensureScrolledToIndex(u),this._focusedItemIndex=u,this.toggleAttribute("navigating",!0),{dstRow:[...n.children].find(_=>!_.hidden&&_.index===u),dstIsRowDetails:f}}_onCellNavigation(e,t,i){const s=e.parentNode,{dstRow:n,dstIsRowDetails:l}=this.__navigateRows(i,s,e);if(!n)return;let u=this.__getIndexOfChildElement(e);this.$.items.contains(e)&&(u=[...this.$.sizer.children].findIndex(g=>g._column===e._column));const f=this.__isDetailsCell(e),_=s.parentNode,m=this.__getIndexInGroup(s,this._focusedItemIndex);if(this._focusedColumnOrder===void 0&&(f?this._focusedColumnOrder=0:this._focusedColumnOrder=this._getColumns(_,m).filter(g=>!g.hidden)[u]._order),l)[...n.children].find(A=>this.__isDetailsCell(A)).focus();else{const g=this.__getIndexInGroup(n,this._focusedItemIndex),A=this._getColumns(_,g).filter(S=>!S.hidden),w=A.map(S=>S._order).sort((S,$)=>S-$),I=w.length-1,C=w.indexOf(w.slice(0).sort((S,$)=>Math.abs(S-this._focusedColumnOrder)-Math.abs($-this._focusedColumnOrder))[0]),N=i===0&&f?C:Math.max(0,Math.min(C+t,I));N!==C&&(this._focusedColumnOrder=void 0);const O=A.reduce((S,$,j)=>(S[$._order]=j,S),{})[w[N]];let M;if(this.$.items.contains(e)){const S=this.$.sizer.children[O];this._lazyColumns&&(this.__isColumnInViewport(S._column)||S.scrollIntoView(),this.__updateColumnsBodyContentHidden(),this.__updateHorizontalScrollPosition()),M=[...n.children].find($=>$._column===S._column),this._scrollHorizontallyToCell(M)}else M=n.children[O],this._scrollHorizontallyToCell(M);M.focus()}}_onInteractionKeyDown(e,t){const i=e.composedPath()[0],s=i.localName==="input"&&!/^(button|checkbox|color|file|image|radio|range|reset|submit)$/iu.test(i.type);let n;switch(t){case"Enter":n=this.interacting?!s:!0;break;case"Escape":n=!1;break;case"F2":n=!this.interacting;break}const{cell:l}=this._getGridEventLocation(e);if(this.interacting!==n&&l!==null)if(n){const u=l._content.querySelector("[focus-target]")||[...l._content.querySelectorAll("*")].find(f=>this._isFocusable(f));u&&(e.preventDefault(),u.focus(),this._setInteracting(!0),this.toggleAttribute("navigating",!1))}else e.preventDefault(),this._focusedColumnOrder=void 0,l.focus(),this._setInteracting(!1),this.toggleAttribute("navigating",!0);t==="Escape"&&this._hideTooltip(!0)}_predictFocusStepTarget(e,t){const i=[this.$.table,this._headerFocusable,this._itemsFocusable,this._footerFocusable,this.$.focusexit];let s=i.indexOf(e);for(s+=t;s>=0&&s<=i.length-1;){let l=i[s];if(l&&!this.__rowFocusMode&&(l=i[s].parentNode),!l||l.hidden)s+=t;else break}let n=i[s];if(n&&n._column&&!this.__isColumnInViewport(n._column)){const l=this._getColumnsInOrder().find(u=>this.__isColumnInViewport(u));if(l)if(n===this._headerFocusable)n=l._headerCell;else if(n===this._itemsFocusable){const u=n._column._cells.indexOf(n);n=l._cells[u]}else n===this._footerFocusable&&(n=l._footerCell)}return n}_onTabKeyDown(e){const t=this._predictFocusStepTarget(e.composedPath()[0],e.shiftKey?-1:1);if(t){if(e.stopPropagation(),t===this.$.table)this.$.table.focus();else if(t===this.$.focusexit)this.$.focusexit.focus();else if(t===this._itemsFocusable){let i=t;const s=this.__isRow(t)?t:t.parentNode;if(this._ensureScrolledToIndex(this._focusedItemIndex),s.index!==this._focusedItemIndex&&this.__isCell(t)){const n=Array.from(s.children).indexOf(this._itemsFocusable),l=Array.from(this.$.items.children).find(u=>!u.hidden&&u.index===this._focusedItemIndex);l&&(i=l.children[n])}e.preventDefault(),i.focus()}else e.preventDefault(),t.focus();this.toggleAttribute("navigating",!0)}}_onSpaceKeyDown(e){e.preventDefault();const t=e.composedPath()[0],i=this.__isRow(t);(i||!t._content||!t._content.firstElementChild)&&this.dispatchEvent(new CustomEvent(i?"row-activate":"cell-activate",{detail:{model:this.__getRowModel(i?t:t.parentElement)}}))}_onKeyUp(e){if(!/^( |SpaceBar)$/u.test(e.key)||this.interacting)return;e.preventDefault();const t=e.composedPath()[0];if(t._content&&t._content.firstElementChild){const i=this.hasAttribute("navigating");t._content.firstElementChild.dispatchEvent(new MouseEvent("click",{shiftKey:e.shiftKey,bubbles:!0,composed:!0,cancelable:!0})),this.toggleAttribute("navigating",i)}}_onFocusIn(e){this._isMousedown||this.toggleAttribute("navigating",!0);const t=e.composedPath()[0];t===this.$.table||t===this.$.focusexit?(this._predictFocusStepTarget(t,t===this.$.table?1:-1).focus(),this._setInteracting(!1)):this._detectInteracting(e)}_onFocusOut(e){this.toggleAttribute("navigating",!1),this._detectInteracting(e),this._hideTooltip(),this._focusedCell=null}_onContentFocusIn(e){const{section:t,cell:i,row:s}=this._getGridEventLocation(e);if(!(!i&&!this.__rowFocusMode)){if(this._detectInteracting(e),t&&(i||s))if(this._activeRowGroup=t,this.$.header===t?this._headerFocusable=this.__getFocusable(s,i):this.$.items===t?this._itemsFocusable=this.__getFocusable(s,i):this.$.footer===t&&(this._footerFocusable=this.__getFocusable(s,i)),i){const n=this.getEventContext(e);i.dispatchEvent(new CustomEvent("cell-focus",{bubbles:!0,composed:!0,detail:{context:n}})),this._focusedCell=i._focusButton||i,Lt()&&e.target===i&&this._showTooltip(e)}else this._focusedCell=null;this._detectFocusedItemIndex(e)}}__getFocusable(e,t){return this.__rowFocusMode?e:t._focusButton||t}_detectInteracting(e){const t=e.composedPath().some(i=>i.localName==="vaadin-grid-cell-content");this._setInteracting(t),this.__updateHorizontalScrollPosition()}_detectFocusedItemIndex(e){const{section:t,row:i}=this._getGridEventLocation(e);t===this.$.items&&(this._focusedItemIndex=i.index)}_updateGridSectionFocusTarget(e){if(!e)return;const t=this._getGridSectionFromFocusTarget(e),i=this.interacting&&t===this._activeRowGroup;e.tabIndex=i?-1:0}_preventScrollerRotatingCellFocus(e,t){e.index===this._focusedItemIndex&&this.hasAttribute("navigating")&&this._activeRowGroup===this.$.items&&(this._navigatingIsHidden=!0,this.toggleAttribute("navigating",!1)),t===this._focusedItemIndex&&this._navigatingIsHidden&&(this._navigatingIsHidden=!1,this.toggleAttribute("navigating",!0))}_getColumns(e,t){let i=this._columnTree.length-1;return e===this.$.header?i=t:e===this.$.footer&&(i=this._columnTree.length-1-t),this._columnTree[i]}__isValidFocusable(e){return this.$.table.contains(e)&&e.offsetHeight}_resetKeyboardNavigation(){if(["header","footer"].forEach(e=>{if(!this.__isValidFocusable(this[`_${e}Focusable`])){const t=[...this.$[e].children].find(s=>s.offsetHeight),i=t?[...t.children].find(s=>!s.hidden):null;t&&i&&(this[`_${e}Focusable`]=this.__getFocusable(t,i))}}),!this.__isValidFocusable(this._itemsFocusable)&&this.$.items.firstElementChild){const e=this.__getFirstVisibleItem(),t=e?[...e.children].find(i=>!i.hidden):null;t&&e&&(delete this._focusedColumnOrder,this._itemsFocusable=this.__getFocusable(e,t))}else this.__updateItemsFocusable()}_scrollHorizontallyToCell(e){if(e.hasAttribute("frozen")||e.hasAttribute("frozen-to-end")||this.__isDetailsCell(e))return;const t=e.getBoundingClientRect(),i=e.parentNode,s=Array.from(i.children).indexOf(e),n=this.$.table.getBoundingClientRect();let l=n.left,u=n.right;for(let f=s-1;f>=0;f--){const _=i.children[f];if(!(_.hasAttribute("hidden")||this.__isDetailsCell(_))&&(_.hasAttribute("frozen")||_.hasAttribute("frozen-to-end"))){l=_.getBoundingClientRect().right;break}}for(let f=s+1;f<i.children.length;f++){const _=i.children[f];if(!(_.hasAttribute("hidden")||this.__isDetailsCell(_))&&(_.hasAttribute("frozen")||_.hasAttribute("frozen-to-end"))){u=_.getBoundingClientRect().left;break}}t.left<l&&(this.$.table.scrollLeft+=Math.round(t.left-l)),t.right>u&&(this.$.table.scrollLeft+=Math.round(t.right-u))}_getGridEventLocation(e){const t=e.composedPath(),i=t.indexOf(this.$.table),s=i>=1?t[i-1]:null,n=i>=2?t[i-2]:null,l=i>=3?t[i-3]:null;return{section:s,row:n,cell:l}}_getGridSectionFromFocusTarget(e){return e===this._headerFocusable?this.$.header:e===this._itemsFocusable?this.$.items:e===this._footerFocusable?this.$.footer:null}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const pi=o=>class extends o{static get properties(){return{detailsOpenedItems:{type:Array,value:()=>[]},rowDetailsRenderer:Function,_detailsCells:{type:Array}}}static get observers(){return["_detailsOpenedItemsChanged(detailsOpenedItems.*, rowDetailsRenderer)","_rowDetailsRendererChanged(rowDetailsRenderer)"]}ready(){super.ready(),this._detailsCellResizeObserver=new ResizeObserver(e=>{e.forEach(({target:t})=>{this._updateDetailsCellHeight(t.parentElement)}),this.__virtualizer.__adapter._resizeHandler()})}_rowDetailsRendererChanged(e){e&&this._columnTree&&k(this.$.items,t=>{if(!t.querySelector("[part~=details-cell]")){this._updateRow(t,this._columnTree[this._columnTree.length-1]);const i=this._isDetailsOpened(t._item);this._toggleDetailsCell(t,i)}})}_detailsOpenedItemsChanged(e,t){e.path==="detailsOpenedItems.length"||!e.value||k(this.$.items,i=>{if(i.hasAttribute("details-opened")){this._updateItem(i,i._item);return}t&&this._isDetailsOpened(i._item)&&this._updateItem(i,i._item)})}_configureDetailsCell(e){e.setAttribute("part","cell details-cell"),e.toggleAttribute("frozen",!0),this._detailsCellResizeObserver.observe(e)}_toggleDetailsCell(e,t){const i=e.querySelector('[part~="details-cell"]');i&&(i.hidden=!t,!i.hidden&&this.rowDetailsRenderer&&(i._renderer=this.rowDetailsRenderer))}_updateDetailsCellHeight(e){const t=e.querySelector('[part~="details-cell"]');t&&(t.hidden?e.style.removeProperty("padding-bottom"):e.style.setProperty("padding-bottom",`${t.offsetHeight}px`))}_updateDetailsCellHeights(){k(this.$.items,e=>{this._updateDetailsCellHeight(e)})}_isDetailsOpened(e){return this.detailsOpenedItems&&this._getItemIndexInArray(e,this.detailsOpenedItems)!==-1}openItemDetails(e){this._isDetailsOpened(e)||(this.detailsOpenedItems=[...this.detailsOpenedItems,e])}closeItemDetails(e){this._isDetailsOpened(e)&&(this.detailsOpenedItems=this.detailsOpenedItems.filter(t=>!this._itemsEqual(t,e)))}};/**
 * @license
 * Copyright (c) 2022 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const L=document.createElement("div");L.style.position="fixed";L.style.clip="rect(0px, 0px, 0px, 0px)";L.setAttribute("aria-live","polite");document.body.appendChild(L);let he;function Wi(o,r={}){const e=r.mode||"polite",t=r.timeout===void 0?150:r.timeout;e==="alert"?(L.removeAttribute("aria-live"),L.removeAttribute("role"),he=T.debounce(he,oe,()=>{L.setAttribute("role","alert")})):(he&&he.cancel(),L.removeAttribute("role"),L.setAttribute("aria-live",e)),L.textContent="",setTimeout(()=>{L.textContent=o},t)}/**
 * @license
 * Copyright (c) 2021 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ue=new ResizeObserver(o=>{setTimeout(()=>{o.forEach(r=>{r.target.resizables?r.target.resizables.forEach(e=>{e._onResize(r.contentRect)}):r.target._onResize(r.contentRect)})})}),mi=rt(o=>class extends o{get _observeParent(){return!1}connectedCallback(){if(super.connectedCallback(),ue.observe(this),this._observeParent){const e=this.parentNode instanceof ShadowRoot?this.parentNode.host:this.parentNode;e.resizables||(e.resizables=new Set,ue.observe(e)),e.resizables.add(this),this.__parent=e}}disconnectedCallback(){super.disconnectedCallback(),ue.unobserve(this);const e=this.__parent;if(this._observeParent&&e){const t=e.resizables;t&&(t.delete(this),t.size===0&&ue.unobserve(e)),this.__parent=null}}_onResize(e){}});/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const je={SCROLLING:500,UPDATE_CONTENT_VISIBILITY:100},gi=o=>class extends mi(o){static get properties(){return{columnRendering:{type:String,value:"eager"},_frozenCells:{type:Array,value:()=>[]},_frozenToEndCells:{type:Array,value:()=>[]},_rowWithFocusedElement:Element}}static get observers(){return["__columnRenderingChanged(_columnTree, columnRendering)"]}get _scrollLeft(){return this.$.table.scrollLeft}get _scrollTop(){return this.$.table.scrollTop}set _scrollTop(e){this.$.table.scrollTop=e}get _lazyColumns(){return this.columnRendering==="lazy"}ready(){super.ready(),this.scrollTarget=this.$.table,this.$.items.addEventListener("focusin",e=>{const t=e.composedPath().indexOf(this.$.items);this._rowWithFocusedElement=e.composedPath()[t-1]}),this.$.items.addEventListener("focusout",()=>{this._rowWithFocusedElement=void 0}),this.$.table.addEventListener("scroll",()=>this._afterScroll())}_onResize(){if(this._updateOverflow(),this.__updateHorizontalScrollPosition(),this._firefox){const e=!X(this);e&&this.__previousVisible===!1&&(this._scrollTop=this.__memorizedScrollTop||0),this.__previousVisible=e}}_scrollToFlatIndex(e){e=Math.min(this._effectiveSize-1,Math.max(0,e)),this.__virtualizer.scrollToIndex(e),this.__scrollIntoViewport(e)}__scrollIntoViewport(e){const t=[...this.$.items.children].find(i=>i.index===e);if(t){const i=t.getBoundingClientRect(),s=this.$.footer.getBoundingClientRect().top,n=this.$.header.getBoundingClientRect().bottom;i.bottom>s?this.$.table.scrollTop+=i.bottom-s:i.top<n&&(this.$.table.scrollTop-=n-i.top)}}_scheduleScrolling(){this._scrollingFrame||(this._scrollingFrame=requestAnimationFrame(()=>this.$.scroller.toggleAttribute("scrolling",!0))),this._debounceScrolling=T.debounce(this._debounceScrolling,J.after(je.SCROLLING),()=>{cancelAnimationFrame(this._scrollingFrame),delete this._scrollingFrame,this.$.scroller.toggleAttribute("scrolling",!1)})}_afterScroll(){this.__updateHorizontalScrollPosition(),this.hasAttribute("reordering")||this._scheduleScrolling(),this.hasAttribute("navigating")||this._hideTooltip(!0),this._updateOverflow(),this._debounceColumnContentVisibility=T.debounce(this._debounceColumnContentVisibility,J.after(je.UPDATE_CONTENT_VISIBILITY),()=>{this._lazyColumns&&this.__cachedScrollLeft!==this._scrollLeft&&(this.__cachedScrollLeft=this._scrollLeft,this.__updateColumnsBodyContentHidden())}),this._firefox&&!X(this)&&this.__previousVisible!==!1&&(this.__memorizedScrollTop=this._scrollTop)}__updateColumnsBodyContentHidden(){if(!this._columnTree)return;const e=this._getColumnsInOrder();if(!e[0]||!e[0]._sizerCell)return;let t=!1;if(e.forEach(i=>{const s=this._lazyColumns&&!this.__isColumnInViewport(i);i._bodyContentHidden!==s&&(t=!0,i._cells.forEach(n=>{if(n!==i._sizerCell){if(s)n.remove();else if(n.__parentRow){const l=[...n.__parentRow.children].find(u=>e.indexOf(u._column)>e.indexOf(i));n.__parentRow.insertBefore(n,l)}}})),i._bodyContentHidden=s}),t&&this._frozenCellsChanged(),this._lazyColumns){const i=[...e].reverse().find(l=>l.frozen),s=this.__getColumnEnd(i),n=e.find(l=>!l.frozen&&!l._bodyContentHidden);this.__lazyColumnsStart=this.__getColumnStart(n)-s,this.$.items.style.setProperty("--_grid-lazy-columns-start",`${this.__lazyColumnsStart}px`),this._resetKeyboardNavigation()}}__getColumnEnd(e){return e?e._sizerCell.offsetLeft+(this.__isRTL?0:e._sizerCell.offsetWidth):this.__isRTL?this.$.table.clientWidth:0}__getColumnStart(e){return e?e._sizerCell.offsetLeft+(this.__isRTL?e._sizerCell.offsetWidth:0):this.__isRTL?this.$.table.clientWidth:0}__isColumnInViewport(e){return e.frozen||e.frozenToEnd?!0:e._sizerCell.offsetLeft+e._sizerCell.offsetWidth>=this._scrollLeft&&e._sizerCell.offsetLeft<=this._scrollLeft+this.clientWidth}__columnRenderingChanged(e,t){t==="eager"?this.$.scroller.removeAttribute("column-rendering"):this.$.scroller.setAttribute("column-rendering",t),this.__updateColumnsBodyContentHidden()}_updateOverflow(){this._debounceOverflow=T.debounce(this._debounceOverflow,oe,()=>{this.__doUpdateOverflow()})}__doUpdateOverflow(){let e="";const t=this.$.table;t.scrollTop<t.scrollHeight-t.clientHeight&&(e+=" bottom"),t.scrollTop>0&&(e+=" top");const i=Ie(t,this.getAttribute("dir"));i>0&&(e+=" start"),i<t.scrollWidth-t.clientWidth&&(e+=" end"),this.__isRTL&&(e=e.replace(/start|end/giu,n=>n==="start"?"end":"start")),t.scrollLeft<t.scrollWidth-t.clientWidth&&(e+=" right"),t.scrollLeft>0&&(e+=" left");const s=e.trim();s.length>0&&this.getAttribute("overflow")!==s?this.setAttribute("overflow",s):s.length===0&&this.hasAttribute("overflow")&&this.removeAttribute("overflow")}_frozenCellsChanged(){this._debouncerCacheElements=T.debounce(this._debouncerCacheElements,fe,()=>{Array.from(this.shadowRoot.querySelectorAll('[part~="cell"]')).forEach(e=>{e.style.transform=""}),this._frozenCells=Array.prototype.slice.call(this.$.table.querySelectorAll("[frozen]")),this._frozenToEndCells=Array.prototype.slice.call(this.$.table.querySelectorAll("[frozen-to-end]")),this.__updateHorizontalScrollPosition()}),this._debounceUpdateFrozenColumn()}_debounceUpdateFrozenColumn(){this.__debounceUpdateFrozenColumn=T.debounce(this.__debounceUpdateFrozenColumn,fe,()=>this._updateFrozenColumn())}_updateFrozenColumn(){if(!this._columnTree)return;const e=this._columnTree[this._columnTree.length-1].slice(0);e.sort((s,n)=>s._order-n._order);let t,i;for(let s=0;s<e.length;s++){const n=e[s];n._lastFrozen=!1,n._firstFrozenToEnd=!1,i===void 0&&n.frozenToEnd&&!n.hidden&&(i=s),n.frozen&&!n.hidden&&(t=s)}t!==void 0&&(e[t]._lastFrozen=!0),i!==void 0&&(e[i]._firstFrozenToEnd=!0),this.__updateColumnsBodyContentHidden()}__updateHorizontalScrollPosition(){if(!this._columnTree)return;const e=this.$.table.scrollWidth,t=this.$.table.clientWidth,i=Math.max(0,this.$.table.scrollLeft),s=Ie(this.$.table,this.getAttribute("dir")),n=`translate(${-i}px, 0)`;this.$.header.style.transform=n,this.$.footer.style.transform=n,this.$.items.style.transform=n;const l=this.__isRTL?s+t-e:i,u=`translate(${l}px, 0)`;this._frozenCells.forEach(g=>{g.style.transform=u});const f=this.__isRTL?s:i+t-e,_=`translate(${f}px, 0)`;let m=_;if(this._lazyColumns){const g=this._getColumnsInOrder(),A=[...g].reverse().find(E=>!E.frozenToEnd&&!E._bodyContentHidden),w=this.__getColumnEnd(A),I=g.find(E=>E.frozenToEnd),C=this.__getColumnStart(I);m=`translate(${f+(C-w)+this.__lazyColumnsStart}px, 0)`}this._frozenToEndCells.forEach(g=>{this.$.items.contains(g)?g.style.transform=m:g.style.transform=_}),this.hasAttribute("navigating")&&this.__rowFocusMode&&this.$.table.style.setProperty("--_grid-horizontal-scroll-position",`${-l}px`)}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const bi=o=>class extends o{static get properties(){return{selectedItems:{type:Object,notify:!0,value:()=>[]},__selectedKeys:{type:Object,computed:"__computeSelectedKeys(itemIdPath, selectedItems.*)"}}}static get observers(){return["__selectedItemsChanged(itemIdPath, selectedItems.*)"]}_isSelected(e){return this.__selectedKeys.has(this.getItemId(e))}selectItem(e){this._isSelected(e)||(this.selectedItems=[...this.selectedItems,e])}deselectItem(e){this._isSelected(e)&&(this.selectedItems=this.selectedItems.filter(t=>!this._itemsEqual(t,e)))}_toggleItem(e){this._isSelected(e)?this.deselectItem(e):this.selectItem(e)}__selectedItemsChanged(){this.requestContentUpdate()}__computeSelectedKeys(e,t){const i=t.base||[],s=new Set;return i.forEach(n=>{s.add(this.getItemId(n))}),s}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */let Ye="prepend";const vi=o=>class extends o{static get properties(){return{multiSort:{type:Boolean,value:!1},multiSortPriority:{type:String,value:()=>Ye},multiSortOnShiftClick:{type:Boolean,value:!1},_sorters:{type:Array,value:()=>[]},_previousSorters:{type:Array,value:()=>[]}}}static setDefaultMultiSortPriority(e){Ye=["append","prepend"].includes(e)?e:"prepend"}ready(){super.ready(),this.addEventListener("sorter-changed",this._onSorterChanged)}_onSorterChanged(e){const t=e.target;e.stopPropagation(),t._grid=this,this.__updateSorter(t,e.detail.shiftClick,e.detail.fromSorterClick),this.__applySorters()}__removeSorters(e){e.length!==0&&(this._sorters=this._sorters.filter(t=>e.indexOf(t)<0),this.multiSort&&this.__updateSortOrders(),this.__applySorters())}__updateSortOrders(){this._sorters.forEach((e,t)=>{e._order=this._sorters.length>1?t:null})}__appendSorter(e){e.direction?this._sorters.includes(e)||this._sorters.push(e):this._removeArrayItem(this._sorters,e),this.__updateSortOrders()}__prependSorter(e){this._removeArrayItem(this._sorters,e),e.direction&&this._sorters.unshift(e),this.__updateSortOrders()}__updateSorter(e,t,i){if(!(!e.direction&&this._sorters.indexOf(e)===-1)){if(e._order=null,this.multiSort&&(!this.multiSortOnShiftClick||!i)||this.multiSortOnShiftClick&&t)this.multiSortPriority==="append"?this.__appendSorter(e):this.__prependSorter(e);else if(e.direction||this.multiSortOnShiftClick){const s=this._sorters.filter(n=>n!==e);this._sorters=e.direction?[e]:[],s.forEach(n=>{n._order=null,n.direction=null})}}}__applySorters(){this.dataProvider&&this.isAttached&&JSON.stringify(this._previousSorters)!==JSON.stringify(this._mapSorters())&&this.clearCache(),this._a11yUpdateSorters(),this._previousSorters=this._mapSorters()}_mapSorters(){return this._sorters.map(e=>({path:e.path,direction:e.direction}))}_removeArrayItem(e,t){const i=e.indexOf(t);i>-1&&e.splice(i,1)}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ci=o=>class extends o{static get properties(){return{cellClassNameGenerator:Function,cellPartNameGenerator:Function}}static get observers(){return["__cellClassNameGeneratorChanged(cellClassNameGenerator)","__cellPartNameGeneratorChanged(cellPartNameGenerator)"]}__cellClassNameGeneratorChanged(){this.generateCellClassNames()}__cellPartNameGeneratorChanged(){this.generateCellPartNames()}generateCellClassNames(){k(this.$.items,e=>{!e.hidden&&!e.hasAttribute("loading")&&this._generateCellClassNames(e,this.__getRowModel(e))})}generateCellPartNames(){k(this.$.items,e=>{!e.hidden&&!e.hasAttribute("loading")&&this._generateCellPartNames(e,this.__getRowModel(e))})}_generateCellClassNames(e,t){te(e,i=>{if(i.__generatedClasses&&i.__generatedClasses.forEach(s=>i.classList.remove(s)),this.cellClassNameGenerator){const s=this.cellClassNameGenerator(i._column,t);i.__generatedClasses=s&&s.split(" ").filter(n=>n.length>0),i.__generatedClasses&&i.__generatedClasses.forEach(n=>i.classList.add(n))}})}_generateCellPartNames(e,t){te(e,i=>{if(i.__generatedParts&&i.__generatedParts.forEach(s=>{W(i,null,s)}),this.cellPartNameGenerator){const s=this.cellPartNameGenerator(i._column,t);i.__generatedParts=s&&s.split(" ").filter(n=>n.length>0),i.__generatedParts&&i.__generatedParts.forEach(n=>{W(i,!0,n)})}})}};/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Z extends Re(ae(li(ni(hi(ti(gi(bi(vi(pi(fi(ei(_i(oi(ai(ze(ui(ci(Ci($t(B)))))))))))))))))))){static get template(){return ie`
      <div
        id="scroller"
        safari$="[[_safari]]"
        ios$="[[_ios]]"
        loading$="[[loading]]"
        column-reordering-allowed$="[[columnReorderingAllowed]]"
      >
        <table id="table" role="treegrid" aria-multiselectable="true" tabindex="0">
          <caption id="sizer" part="row"></caption>
          <thead id="header" role="rowgroup"></thead>
          <tbody id="items" role="rowgroup"></tbody>
          <tfoot id="footer" role="rowgroup"></tfoot>
        </table>

        <div part="reorder-ghost"></div>
      </div>

      <slot name="tooltip"></slot>

      <div id="focusexit" tabindex="0"></div>
    `}static get is(){return"vaadin-grid"}static get observers(){return["_columnTreeChanged(_columnTree, _columnTree.*)","_effectiveSizeChanged(_effectiveSize, __virtualizer, _hasData, _columnTree)"]}static get properties(){return{_safari:{type:Boolean,value:Dt},_ios:{type:Boolean,value:we},_firefox:{type:Boolean,value:Pt},_android:{type:Boolean,value:De},_touchDevice:{type:Boolean,value:be},allRowsVisible:{type:Boolean,value:!1,reflectToAttribute:!0},__pendingRecalculateColumnWidths:{type:Boolean,value:!0},isAttached:{value:!1},__gridElement:{type:Boolean,value:!0}}}constructor(){super(),this.addEventListener("animationend",this._onAnimationEnd)}get _firstVisibleIndex(){const r=this.__getFirstVisibleItem();return r?r.index:void 0}get _lastVisibleIndex(){const r=this.__getLastVisibleItem();return r?r.index:void 0}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.recalculateColumnWidths()}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this._hideTooltip(!0)}__getFirstVisibleItem(){return this._getVisibleRows().find(r=>this._isInViewport(r))}__getLastVisibleItem(){return this._getVisibleRows().reverse().find(r=>this._isInViewport(r))}_isInViewport(r){const e=this.$.table.getBoundingClientRect(),t=r.getBoundingClientRect(),i=this.$.header.getBoundingClientRect().height,s=this.$.footer.getBoundingClientRect().height;return t.bottom>e.top+i&&t.top<e.bottom-s}_getVisibleRows(){return Array.from(this.$.items.children).filter(r=>!r.hidden).sort((r,e)=>r.index-e.index)}_getRowContainingNode(r){const e=Je("vaadin-grid-cell-content",r);return e?e.assignedSlot.parentElement.parentElement:void 0}_isItemAssignedToRow(r,e){const t=this.__getRowModel(e);return this.getItemId(r)===this.getItemId(t.item)}ready(){super.ready(),this.__virtualizer=new Mt({createElements:this._createScrollerRows.bind(this),updateElement:this._updateScrollerItem.bind(this),scrollContainer:this.$.items,scrollTarget:this.$.table,reorderElements:!0}),new ResizeObserver(()=>setTimeout(()=>{this.__updateFooterPositioning(),this.__updateColumnsBodyContentHidden(),this.__tryToRecalculateColumnWidthsIfPending()})).observe(this.$.table),Se(this),this._tooltipController=new st(this),this.addController(this._tooltipController),this._tooltipController.setManual(!0)}__getBodyCellCoordinates(r){if(this.$.items.contains(r)&&r.localName==="td")return{item:r.parentElement._item,column:r._column}}__focusBodyCell({item:r,column:e}){const t=this._getVisibleRows().find(s=>s._item===r),i=t&&[...t.children].find(s=>s._column===e);i&&i.focus()}_focusFirstVisibleRow(){const r=this.__getFirstVisibleItem();this.__rowFocusMode=!0,r.focus()}_effectiveSizeChanged(r,e,t,i){if(e&&t&&i){const s=this.shadowRoot.activeElement,n=this.__getBodyCellCoordinates(s),l=e.size||0;e.size=r,e.update(l-1,l-1),r<l&&e.update(r-1,r-1),n&&s.parentElement.hidden&&this.__focusBodyCell(n),this._resetKeyboardNavigation()}}__hasRowsWithClientHeight(){return!!Array.from(this.$.items.children).filter(r=>r.clientHeight).length}__getIntrinsicWidth(r){return this.__intrinsicWidthCache.has(r)||this.__calculateAndCacheIntrinsicWidths([r]),this.__intrinsicWidthCache.get(r)}__getDistributedWidth(r,e){if(r==null||r===this)return 0;const t=Math.max(this.__getIntrinsicWidth(r),this.__getDistributedWidth(r.parentElement,r));if(!e)return t;const i=r,s=t,n=i._visibleChildColumns.map(_=>this.__getIntrinsicWidth(_)).reduce((_,m)=>_+m,0),l=Math.max(0,s-n),f=this.__getIntrinsicWidth(e)/n*l;return this.__getIntrinsicWidth(e)+f}_recalculateColumnWidths(r){this.__virtualizer.flush(),[...this.$.header.children,...this.$.footer.children].forEach(i=>{i.__debounceUpdateHeaderFooterRowVisibility&&i.__debounceUpdateHeaderFooterRowVisibility.flush()}),this._debouncerHiddenChanged&&this._debouncerHiddenChanged.flush(),this.__intrinsicWidthCache=new Map;const e=this._firstVisibleIndex,t=this._lastVisibleIndex;this.__viewportRowsCache=this._getVisibleRows().filter(i=>i.index>=e&&i.index<=t),this.__calculateAndCacheIntrinsicWidths(r),r.forEach(i=>{i.width=`${this.__getDistributedWidth(i)}px`})}__setVisibleCellContentAutoWidth(r,e){r._allCells.filter(t=>this.$.items.contains(t)?this.__viewportRowsCache.includes(t.parentElement):!0).forEach(t=>{t.__measuringAutoWidth=e,t._content.style.width=e?"auto":"",t._content.style.position=e?"absolute":""})}__getAutoWidthCellsMaxWidth(r){return r._allCells.reduce((e,t)=>t.__measuringAutoWidth?Math.max(e,t._content.offsetWidth+1):e,0)}__calculateAndCacheIntrinsicWidths(r){r.forEach(e=>this.__setVisibleCellContentAutoWidth(e,!0)),r.forEach(e=>{const t=this.__getAutoWidthCellsMaxWidth(e);this.__intrinsicWidthCache.set(e,t)}),r.forEach(e=>this.__setVisibleCellContentAutoWidth(e,!1))}recalculateColumnWidths(){if(!this._columnTree)return;if(X(this)||this._cache.isLoading()){this.__pendingRecalculateColumnWidths=!0;return}const r=this._getColumns().filter(e=>!e.hidden&&e.autoWidth);this._recalculateColumnWidths(r)}__tryToRecalculateColumnWidthsIfPending(){this.__pendingRecalculateColumnWidths&&!X(this)&&!this._cache.isLoading()&&this.__hasRowsWithClientHeight()&&(this.__pendingRecalculateColumnWidths=!1,this.recalculateColumnWidths())}_onDataProviderPageLoaded(){super._onDataProviderPageLoaded(),this.__tryToRecalculateColumnWidthsIfPending()}_createScrollerRows(r){const e=[];for(let t=0;t<r;t++){const i=document.createElement("tr");i.setAttribute("part","row"),i.setAttribute("role","row"),i.setAttribute("tabindex","-1"),this._columnTree&&this._updateRow(i,this._columnTree[this._columnTree.length-1],"body",!1,!0),e.push(i)}return this._columnTree&&this._columnTree[this._columnTree.length-1].forEach(t=>t.isConnected&&t.notifyPath&&t.notifyPath("_cells.*",t._cells)),this.__afterCreateScrollerRowsDebouncer=T.debounce(this.__afterCreateScrollerRowsDebouncer,oe,()=>{this._afterScroll(),this.__tryToRecalculateColumnWidthsIfPending()}),e}_createCell(r,e){const i=`vaadin-grid-cell-content-${this._contentIndex=this._contentIndex+1||0}`,s=document.createElement("vaadin-grid-cell-content");s.setAttribute("slot",i);const n=document.createElement(r);n.id=i.replace("-content-","-"),n.setAttribute("role",r==="td"?"gridcell":"columnheader"),!De&&!we&&(n.addEventListener("mouseenter",u=>{this.$.scroller.hasAttribute("scrolling")||this._showTooltip(u)}),n.addEventListener("mouseleave",()=>{this._hideTooltip()}),n.addEventListener("mousedown",()=>{this._hideTooltip(!0)}));const l=document.createElement("slot");if(l.setAttribute("name",i),e&&e._focusButtonMode){const u=document.createElement("div");u.setAttribute("role","button"),u.setAttribute("tabindex","-1"),n.appendChild(u),n._focusButton=u,n.focus=function(){n._focusButton.focus()},u.appendChild(l)}else n.setAttribute("tabindex","-1"),n.appendChild(l);return n._content=s,s.addEventListener("mousedown",()=>{if(Bt){const u=f=>{const _=s.contains(this.getRootNode().activeElement),m=f.composedPath().includes(s);!_&&m&&n.focus(),document.removeEventListener("mouseup",u,!0)};document.addEventListener("mouseup",u,!0)}else setTimeout(()=>{s.contains(this.getRootNode().activeElement)||n.focus()})}),n}_updateRow(r,e,t="body",i=!1,s=!1){const n=document.createDocumentFragment();te(r,l=>{l._vacant=!0}),r.innerHTML="",t==="body"&&(r.__cells=[],r.__detailsCell=null),e.filter(l=>!l.hidden).forEach((l,u,f)=>{let _;if(t==="body"){if(l._cells||(l._cells=[]),_=l._cells.find(m=>m._vacant),_||(_=this._createCell("td",l),l._cells.push(_)),_.setAttribute("part","cell body-cell"),_.__parentRow=r,r.__cells.push(_),l._bodyContentHidden||r.appendChild(_),r===this.$.sizer&&(l._sizerCell=_),u===f.length-1&&this.rowDetailsRenderer){this._detailsCells||(this._detailsCells=[]);const m=this._detailsCells.find(g=>g._vacant)||this._createCell("td");this._detailsCells.indexOf(m)===-1&&this._detailsCells.push(m),m._content.parentElement||n.appendChild(m._content),this._configureDetailsCell(m),r.appendChild(m),r.__detailsCell=m,this._a11ySetRowDetailsCell(r,m),m._vacant=!1}l.notifyPath&&!s&&l.notifyPath("_cells.*",l._cells)}else{const m=t==="header"?"th":"td";i||l.localName==="vaadin-grid-column-group"?(_=l[`_${t}Cell`]||this._createCell(m),_._column=l,r.appendChild(_),l[`_${t}Cell`]=_):(l._emptyCells||(l._emptyCells=[]),_=l._emptyCells.find(g=>g._vacant)||this._createCell(m),_._column=l,r.appendChild(_),l._emptyCells.indexOf(_)===-1&&l._emptyCells.push(_)),_.setAttribute("part",`cell ${t}-cell`)}_._content.parentElement||n.appendChild(_._content),_._vacant=!1,_._column=l}),t!=="body"&&this.__debounceUpdateHeaderFooterRowVisibility(r),this.appendChild(n),this._frozenCellsChanged(),this._updateFirstAndLastColumnForRow(r)}__debounceUpdateHeaderFooterRowVisibility(r){r.__debounceUpdateHeaderFooterRowVisibility=T.debounce(r.__debounceUpdateHeaderFooterRowVisibility,fe,()=>this.__updateHeaderFooterRowVisibility(r))}__updateHeaderFooterRowVisibility(r){if(!r)return;const e=Array.from(r.children).filter(t=>{const i=t._column;if(i._emptyCells&&i._emptyCells.indexOf(t)>-1)return!1;if(r.parentElement===this.$.header){if(i.headerRenderer)return!0;if(i.header===null)return!1;if(i.path||i.header!==void 0)return!0}else if(i.footerRenderer)return!0;return!1});r.hidden!==!e.length&&(r.hidden=!e.length),this._resetKeyboardNavigation()}_updateScrollerItem(r,e){this._preventScrollerRotatingCellFocus(r,e),this._columnTree&&(this._updateRowOrderParts(r,e),this._a11yUpdateRowRowindex(r,e),this._getItem(e,r))}_columnTreeChanged(r){this._renderColumnTree(r),this.recalculateColumnWidths(),this.__updateColumnsBodyContentHidden()}_updateRowOrderParts(r,e=r.index){ne(r,{first:e===0,last:e===this._effectiveSize-1,odd:e%2!==0,even:e%2===0})}_updateRowStateParts(r,{expanded:e,selected:t,detailsOpened:i}){ne(r,{expanded:e,selected:t,"details-opened":i})}_renderColumnTree(r){for(k(this.$.items,e=>{this._updateRow(e,r[r.length-1],"body",!1,!0);const t=this.__getRowModel(e);this._updateRowOrderParts(e),this._updateRowStateParts(e,t),this._filterDragAndDrop(e,t)});this.$.header.children.length<r.length;){const e=document.createElement("tr");e.setAttribute("part","row"),e.setAttribute("role","row"),e.setAttribute("tabindex","-1"),this.$.header.appendChild(e);const t=document.createElement("tr");t.setAttribute("part","row"),t.setAttribute("role","row"),t.setAttribute("tabindex","-1"),this.$.footer.appendChild(t)}for(;this.$.header.children.length>r.length;)this.$.header.removeChild(this.$.header.firstElementChild),this.$.footer.removeChild(this.$.footer.firstElementChild);k(this.$.header,(e,t,i)=>{this._updateRow(e,r[t],"header",t===r.length-1);const s=ee(e);G(s,"first-header-row-cell",t===0),G(s,"last-header-row-cell",t===i.length-1)}),k(this.$.footer,(e,t,i)=>{this._updateRow(e,r[r.length-1-t],"footer",t===0);const s=ee(e);G(s,"first-footer-row-cell",t===0),G(s,"last-footer-row-cell",t===i.length-1)}),this._updateRow(this.$.sizer,r[r.length-1]),this._resizeHandler(),this._frozenCellsChanged(),this._updateFirstAndLastColumn(),this._resetKeyboardNavigation(),this._a11yUpdateHeaderRows(),this._a11yUpdateFooterRows(),this.__updateFooterPositioning(),this.generateCellClassNames(),this.generateCellPartNames()}__updateFooterPositioning(){this._firefox&&parseFloat(navigator.userAgent.match(/Firefox\/(\d{2,3}.\d)/u)[1])<99&&(this.$.items.style.paddingBottom=0,this.allRowsVisible||(this.$.items.style.paddingBottom=`${this.$.footer.offsetHeight}px`))}_updateItem(r,e){r._item=e;const t=this.__getRowModel(r);this._toggleDetailsCell(r,t.detailsOpened),this._a11yUpdateRowLevel(r,t.level),this._a11yUpdateRowSelected(r,t.selected),this._updateRowStateParts(r,t),this._generateCellClassNames(r,t),this._generateCellPartNames(r,t),this._filterDragAndDrop(r,t),k(r,i=>{if(i._renderer){const s=i._column||this;i._renderer.call(s,i._content,s,t)}}),this._updateDetailsCellHeight(r),this._a11yUpdateRowExpanded(r,t.expanded)}_resizeHandler(){this._updateDetailsCellHeights(),this.__updateFooterPositioning(),this.__updateHorizontalScrollPosition()}_onAnimationEnd(r){r.animationName.indexOf("vaadin-grid-appear")===0&&(r.stopPropagation(),this.__tryToRecalculateColumnWidthsIfPending(),requestAnimationFrame(()=>{this.__scrollToPendingIndexes()}))}__getRowModel(r){return{index:r.index,item:r._item,level:this._getIndexLevel(r.index),expanded:this._isExpanded(r._item),selected:this._isSelected(r._item),detailsOpened:!!this.rowDetailsRenderer&&this._isDetailsOpened(r._item)}}_showTooltip(r){const e=this._tooltipController.node;e&&e.isConnected&&(this._tooltipController.setTarget(r.target),this._tooltipController.setContext(this.getEventContext(r)),e._stateController.open({focus:r.type==="focusin",hover:r.type==="mouseenter"}))}_hideTooltip(r){const e=this._tooltipController.node;e&&e._stateController.close(r)}requestContentUpdate(){this._columnTree&&(this._columnTree.forEach(r=>{r.forEach(e=>{e._renderHeaderAndFooter&&e._renderHeaderAndFooter()})}),this.__updateVisibleRows())}__updateVisibleRows(r,e){this.__virtualizer&&this.__virtualizer.update(r,e)}}customElements.define(Z.is,Z);P("vaadin-grid-sorter",D`
    :host {
      justify-content: flex-start;
      align-items: baseline;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      cursor: var(--lumo-clickable-cursor);
    }

    [part='content'] {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [part='indicators'] {
      margin-left: var(--lumo-space-s);
    }

    [part='indicators']::before {
      transform: scale(0.8);
    }

    :host(:not([direction]):not(:hover)) [part='indicators'] {
      color: var(--lumo-tertiary-text-color);
    }

    :host([direction]) {
      color: var(--lumo-primary-text-color);
    }

    [part='order'] {
      font-size: var(--lumo-font-size-xxs);
      line-height: 1;
    }

    /* RTL specific styles */

    :host([dir='rtl']) [part='indicators'] {
      margin-right: var(--lumo-space-s);
      margin-left: 0;
    }
  `,{moduleId:"lumo-grid-sorter"});/**
 * @license
 * Copyright (c) 2016 - 2023 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ht=document.createElement("template");ht.innerHTML=`
  <style>
    @font-face {
      font-family: 'vaadin-grid-sorter-icons';
      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQwAA0AAAAABuwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEFAAAABkAAAAcfep+mUdERUYAAAP4AAAAHAAAAB4AJwAOT1MvMgAAAZgAAAA/AAAAYA8TBPpjbWFwAAAB7AAAAFUAAAFeF1fZ4mdhc3AAAAPwAAAACAAAAAgAAAAQZ2x5ZgAAAlgAAABcAAAAnMvguMloZWFkAAABMAAAAC8AAAA2C5Ap72hoZWEAAAFgAAAAHQAAACQGbQPHaG10eAAAAdgAAAAUAAAAHAoAAABsb2NhAAACRAAAABIAAAASAIwAYG1heHAAAAGAAAAAFgAAACAACwAKbmFtZQAAArQAAAECAAACZxWCgKhwb3N0AAADuAAAADUAAABZCrApUXicY2BkYGAA4rDECVrx/DZfGbhZGEDgyqNPOxH0/wNMq5kPALkcDEwgUQBWRA0dAHicY2BkYGA+8P8AAwMLAwgwrWZgZEAFbABY4QM8AAAAeJxjYGRgYOAAQiYGEICQSAAAAi8AFgAAeJxjYGY6yziBgZWBgWkm0xkGBoZ+CM34msGYkZMBFTAKoAkwODAwvmRiPvD/AIMDMxCD1CDJKjAwAgBktQsXAHicY2GAAMZQCM0EwqshbAALxAEKeJxjYGBgZoBgGQZGBhCIAPIYwXwWBhsgzcXAwcAEhIwMCi+Z/v/9/x+sSuElA4T9/4k4K1gHFwMMMILMY2QDYmaoABOQYGJABUA7WBiGNwAAJd4NIQAAAAAAAAAACAAIABAAGAAmAEAATgAAeJyNjLENgDAMBP9tIURJwQCMQccSZgk2i5fIYBDAidJjycXr7x5EPwE2wY8si7jmyBNXGo/bNBerxJNrpxhbO3/fEFpx8ZICpV+ghxJ74fAMe+h7Ox14AbrsHB14nK2QQWrDMBRER4mTkhQK3ZRQKOgCNk7oGQqhhEIX2WSlWEI1BAlkJ5CDdNsj5Ey9Rncdi38ES+jzNJo/HwTgATcoDEthhY3wBHc4CE+pfwsX5F/hGe7Vo/AcK/UhvMSz+mGXKhZU6pww8ISz3oWn1BvhgnwTnuEJf8Jz1OpFeIlX9YULDLdFi4ASHolkSR0iuYdjLak1vAequBhj21D61Nqyi6l3qWybGPjySbPHGScGJl6dP58MYcQRI0bts7mjebBqrFENH7t3qWtj0OuqHnXcW7b0HOTZFnKryRGW2hFX1m0O2vEM3opNMfTau+CS6Z3Vx6veNnEXY6jwDxhsc2gAAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSrpYEBlIbxjQDrzgsuAAAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKyoz1cD0o087YTQATOcIewAAAA==) format('woff');
      font-weight: normal;
      font-style: normal;
    }
  </style>
`;document.head.appendChild(ht.content);class Qe extends ae(ge(B)){static get template(){return ie`
      <style>
        :host {
          display: inline-flex;
          cursor: pointer;
          max-width: 100%;
        }

        [part='content'] {
          flex: 1 1 auto;
        }

        [part='indicators'] {
          position: relative;
          align-self: center;
          flex: none;
        }

        [part='order'] {
          display: inline;
          vertical-align: super;
        }

        [part='indicators']::before {
          font-family: 'vaadin-grid-sorter-icons';
          display: inline-block;
        }

        :host(:not([direction])) [part='indicators']::before {
          content: '\\e901';
        }

        :host([direction='asc']) [part='indicators']::before {
          content: '\\e900';
        }

        :host([direction='desc']) [part='indicators']::before {
          content: '\\e902';
        }
      </style>

      <div part="content">
        <slot></slot>
      </div>
      <div part="indicators">
        <span part="order">[[_getDisplayOrder(_order)]]</span>
      </div>
    `}static get is(){return"vaadin-grid-sorter"}static get properties(){return{path:String,direction:{type:String,reflectToAttribute:!0,notify:!0,value:null},_order:{type:Number,value:null},_isConnected:{type:Boolean,observer:"__isConnectedChanged"}}}static get observers(){return["_pathOrDirectionChanged(path, direction)"]}ready(){super.ready(),this.addEventListener("click",this._onClick.bind(this))}connectedCallback(){super.connectedCallback(),this._isConnected=!0}disconnectedCallback(){super.disconnectedCallback(),this._isConnected=!1,!this.parentNode&&this._grid&&this._grid.__removeSorters([this])}_pathOrDirectionChanged(){this.__dispatchSorterChangedEvenIfPossible()}__isConnectedChanged(r,e){e!==!1&&this.__dispatchSorterChangedEvenIfPossible()}__dispatchSorterChangedEvenIfPossible(){this.path===void 0||this.direction===void 0||!this._isConnected||(this.dispatchEvent(new CustomEvent("sorter-changed",{detail:{shiftClick:!!this._shiftClick,fromSorterClick:!!this._fromSorterClick},bubbles:!0,composed:!0})),this._fromSorterClick=!1,this._shiftClick=!1)}_getDisplayOrder(r){return r===null?"":r+1}_onClick(r){if(r.defaultPrevented)return;const e=this.getRootNode().activeElement;this!==e&&this.contains(e)||(r.preventDefault(),this._shiftClick=r.shiftKey,this._fromSorterClick=!0,this.direction==="asc"?this.direction="desc":this.direction==="desc"?this.direction=null:this.direction="asc")}}customElements.define(Qe.is,Qe);(function(){const o=function(e){return window.Vaadin.Flow.tryCatchWrapper(e,"Vaadin Grid")};let r=!1;window.Vaadin.Flow.gridConnector={initLazy:e=>o(function(t){if(t.$connector)return;r||(r=!0,F.prototype.ensureSubCacheForScaledIndexOriginal=F.prototype.ensureSubCacheForScaledIndex,F.prototype.ensureSubCacheForScaledIndex=o(function(a){if(!this.grid.$connector){this.ensureSubCacheForScaledIndexOriginal(a);return}this.grid.$connector.hasCacheForParentKey(this.grid.getItemId(this.items[a]))?this.doEnsureSubCacheForScaledIndex(a):this.itemCaches[a]||this.grid.$connector.beforeEnsureSubCacheForScaledIndex(this,a)}),F.prototype.isLoadingOriginal=F.prototype.isLoading,F.prototype.isLoading=o(function(){return this.grid.$connector?!!(this.grid.$connector.hasEnsureSubCacheQueue()||Object.keys(this.pendingRequests).length||Object.keys(this.itemCaches).filter(a=>this.itemCaches[a].isLoading())[0]):this.isLoadingOriginal()}),F.prototype.doEnsureSubCacheForScaledIndex=o(function(a){if(!this.itemCaches[a]){const c=new F.prototype.constructor(this.grid,this,this.items[a]);c.itemkeyCaches={},this.itemkeyCaches||(this.itemkeyCaches={}),this.itemCaches[a]=c,this.itemkeyCaches[this.grid.getItemId(c.parentItem)]=c,this.grid._loadPage(0,c)}}),F.prototype.getCacheAndIndexByKey=o(function(a){for(let d in this.items)if(this.grid.getItemId(this.items[d])===a)return{cache:this,scaledIndex:d};const c=Object.keys(this.itemkeyCaches);for(let d=0;d<c.length;d++){const h=c[d];let v=this.itemkeyCaches[h].getCacheAndIndexByKey(a);if(v)return v}}));const i={},s={},n={},l=50,u=20;let f=[],_,m=[],g;const A=150;let w,I={};const C="null";I[C]=[0,0];const N=["SINGLE","NONE","MULTI"];let E={},O="SINGLE",M=!1;t.size=0,t.itemIdPath="key",t.$connector={},t.$connector.hasCacheForParentKey=o(a=>n[a]!==void 0&&n[a].size!==void 0),t.$connector.hasEnsureSubCacheQueue=o(()=>m.length>0),t.$connector.hasParentRequestQueue=o(()=>f.length>0),t.$connector.hasRootRequestQueue=o(()=>Object.keys(i).length>0||!!w&&w.isActive()),t.$connector.beforeEnsureSubCacheForScaledIndex=o(function(a,c){m.push({cache:a,scaledIndex:c,itemkey:t.getItemId(a.items[c])}),g=ce.debounce(g,Pe,()=>{for(;m.length;)t.$connector.flushEnsureSubCache()})}),t.$connector.doSelection=o(function(a,c){O==="NONE"||!a.length||c&&t.hasAttribute("disabled")||(O==="SINGLE"&&(E={}),a.forEach(d=>{d&&(E[d.key]=d,d.selected=!0,c&&t.$server.select(d.key));const h=!t.activeItem||!d||d.key!=t.activeItem.key;!c&&O==="SINGLE"&&h&&(t.activeItem=d)}),t.selectedItems=Object.values(E))}),t.$connector.doDeselection=o(function(a,c){if(O==="NONE"||!a.length||c&&t.hasAttribute("disabled"))return;const d=t.selectedItems.slice();for(;a.length;){const h=a.shift();for(let p=0;p<d.length;p++){const v=d[p];if(h&&h.key===v.key){d.splice(p,1);break}}h&&(delete E[h.key],delete h.selected,c&&t.$server.deselect(h.key))}t.selectedItems=d}),t.__activeItemChanged=o(function(a,c){O=="SINGLE"&&(a?E[a.key]||t.$connector.doSelection([a],!0):c&&E[c.key]&&(t.__deselectDisallowed?t.activeItem=c:t.$connector.doDeselection([c],!0)))}),t._createPropertyObserver("activeItem","__activeItemChanged",!0),t.__activeItemChangedDetails=o(function(a,c){t.__disallowDetailsOnClick||a==null&&c===void 0||(a&&!a.detailsOpened?t.$server.setDetailsVisible(a.key):t.$server.setDetailsVisible(null))}),t._createPropertyObserver("activeItem","__activeItemChangedDetails",!0),t.$connector._getSameLevelPage=o(function(a,c,d){if((c.parentItem?t.getItemId(c.parentItem):C)===a)return t._getPageForIndex(d);const{parentCache:p}=c;if(!p)return null;const v=Object.entries(p.itemCaches).find(([b,x])=>x===c)[0];return this._getSameLevelPage(a,p,v)}),t.$connector.getCacheByKey=o(function(a){let c=t._cache.getCacheAndIndexByKey(a);if(c)return c.cache}),t.$connector.flushEnsureSubCache=o(function(){const a=m.shift();return a?(a.cache.doEnsureSubCacheForScaledIndex(a.scaledIndex),!0):!1}),t.$connector.flushParentRequests=o(function(){let a=f.splice(0,u);return a.length?(t.$server.setParentRequestedRanges(a),!0):!1}),t.$connector.beforeParentRequest=o(function(a,c,d){f.push({firstIndex:a,size:c,parentKey:d}),_=ce.debounce(_,Me.after(l),()=>{for(;f.length;)t.$connector.flushParentRequests()})}),t.$connector.fetchPage=o(function(a,c,d){const h=t._getVisibleRows();let p=h.length>0?h[0].index:0,v=h.length>0?h[h.length-1].index:0,b=v-p,x=Math.max(0,p-b),y=Math.min(v+b,t._effectiveSize),z=c,R=c;for(let re=x;re<=y;re++){const{cache:ut,scaledIndex:_t}=t._cache.getCacheAndIndex(re),Ae=t.$connector._getSameLevelPage(d,ut,_t);Ae!==null&&(z=Math.min(z,Ae),R=Math.max(R,Ae))}let V=Math.max(0,z),q=d!==C?R:Math.min(R,Math.floor(t.size/t.pageSize)),Y=I[d];if(Y||(Y=[-1,-1]),Y[0]!=V||Y[1]!=q){Y=[V,q],I[d]=Y;let re=q-V+1;a(V*t.pageSize,re*t.pageSize)}}),t.dataProvider=o(function(a,c){if(a.pageSize!=t.pageSize)throw"Invalid pageSize";let d=a.page;if(a.parentItem){let h=t.getItemId(a.parentItem);s[h]||(s[h]={});let p=t.$connector.getCacheByKey(h),v=p&&p.itemkeyCaches?p.itemkeyCaches[h]:void 0;n[h]&&n[h][d]&&v?(d=Math.min(d,Math.floor(n[h].size/t.pageSize)),m=[],c(n[h][d],n[h].size)):(s[h][d]=c,t.$connector.fetchPage((b,x)=>t.$connector.beforeParentRequest(b,x,a.parentItem.key),d,h))}else{if(d=Math.min(d,Math.floor(t.size/t.pageSize)),t.size===0){c([],0);return}n[C]&&n[C][d]?c(n[C][d]):(i[d]=c,w=ce.debounce(w,Me.after(t._hasData?A:0),()=>{t.$connector.fetchPage((h,p)=>t.$server.setRequestedRange(h,p),d,C)}))}});const S=o(function(a,c){c!==void 0&&!M&&t.$server.sortersChanged(t._sorters.map(function(d){return{path:d.path,direction:d.direction}}))});t.$connector.setSorterDirections=o(function(a){M=!0,setTimeout(o(()=>{try{const c=Array.from(t.querySelectorAll("vaadin-grid-sorter"));t._sorters.forEach(d=>{c.includes(d)||c.push(d)}),c.forEach(d=>{a.filter(h=>h.column===d.getAttribute("path"))[0]||(d.direction=null)}),t.multiSortPriority!=="append"&&(a=a.reverse()),a.forEach(({column:d,direction:h})=>{c.forEach(p=>{p.getAttribute("path")===d&&p.direction!==h&&(p.direction=h)})})}finally{M=!1}}))}),t._createPropertyObserver("_previousSorters",S),t._updateItem=o(function(a,c){Z.prototype._updateItem.call(t,a,c),a.hidden||Array.from(a.children).forEach(d=>{d._content&&d._content.__templateInstance&&d._content.__templateInstance.children&&Array.from(d._content.__templateInstance.children).forEach(h=>{h._attachRenderedComponentIfAble&&h._attachRenderedComponentIfAble(),h.children&&Array.from(h.children).forEach(p=>{p._attachRenderedComponentIfAble&&p._attachRenderedComponentIfAble()})})}),O===N[1]&&(a.removeAttribute("aria-selected"),Array.from(a.children).forEach(d=>d.removeAttribute("aria-selected")))});const $=o(function(a,c){if(a==null||t.$server.updateExpandedState==null)return;let d=t.getItemId(a);t.$server.updateExpandedState(d,c)});t.expandItem=o(function(a){$(a,!0),Z.prototype.expandItem.call(t,a)}),t.collapseItem=o(function(a){$(a,!1),Z.prototype.collapseItem.call(t,a)});const j=function(a){if(!a||!Array.isArray(a))throw"Attempted to call itemsUpdated with an invalid value: "+JSON.stringify(a);let c=Array.from(t.detailsOpenedItems),d=!1;for(let h=0;h<a.length;++h){const p=a[h];p&&(p.detailsOpened?t._getItemIndexInArray(p,c)<0&&c.push(p):t._getItemIndexInArray(p,c)>=0&&c.splice(t._getItemIndexInArray(p,c),1),E[p.key]&&(E[p.key]=p,p.selected=!0,d=!0))}t.detailsOpenedItems=c,d&&t.selectedItems.splice(0,t.selectedItems.length,...Object.values(E))},ye=function(a,c){let d;if((c||C)!==C){d=n[c][a];let h=t.$connector.getCacheByKey(c);if(h&&h.itemkeyCaches){let p=h.itemkeyCaches[c];const v=s[c],b=v&&v[a];Te(a,d,b,p)}}else d=n[C][a],Te(a,d,i[a],t._cache);return d},Te=function(a,c,d,h){if(!d){let p=a*t.pageSize,v=p+t.pageSize;if(c){if(h&&h.items)for(let b=p;b<v;b++)h.items[b]&&(h.items[b]=c[b-p])}else if(h&&h.items)for(let b=p;b<v;b++)delete h.items[b]}},ke=function(){xe(),t.__updateVisibleRows()},xe=function(){t._cache.updateSize(),t._effectiveSize=t._cache.effectiveSize},le=function(a){if(!a||!t.$||t.$.items.childElementCount===0)return;const c=a.map(h=>h.key),d=t._getVisibleRows().filter(h=>h._item&&c.includes(h._item.key)).map(h=>h.index);d.length>0&&t.__updateVisibleRows(d[0],d[d.length-1])};t.$connector.set=o(function(a,c,d){if(a%t.pageSize!=0)throw"Got new data to index "+a+" which is not aligned with the page size of "+t.pageSize;let h=d||C;const p=a/t.pageSize,v=Math.ceil(c.length/t.pageSize);for(let b=0;b<v;b++){let x=p+b,y=c.slice(b*t.pageSize,(b+1)*t.pageSize);n[h]||(n[h]={}),n[h][x]=y,t.$connector.doSelection(y.filter(R=>R.selected)),t.$connector.doDeselection(y.filter(R=>!R.selected&&E[R.key]));const z=ye(x,h);z&&(j(z),le(z))}});const Oe=function(a){let c=a.parentUniqueKey||C;if(n[c]){for(let d in n[c])for(let h in n[c][d])if(t.getItemId(n[c][d][h])===t.getItemId(a))return{page:d,index:h,parentKey:c}}return null};t.$connector.updateHierarchicalData=o(function(a){let c=[];for(let h=0;h<a.length;h++){let p=Oe(a[h]);if(p){n[p.parentKey][p.page][p.index]=a[h];let v=p.parentKey+":"+p.page;c[v]||(c[v]={parentKey:p.parentKey,page:p.page})}}let d=Object.keys(c);for(let h=0;h<d.length;h++){let p=c[d[h]];const v=ye(p.page,p.parentKey);v&&(j(v),le(v))}}),t.$connector.updateFlatData=o(function(a){for(let c=0;c<a.length;c++){let d=Oe(a[c]);if(d){n[d.parentKey][d.page][d.index]=a[c];const h=parseInt(d.page)*t.pageSize+parseInt(d.index);t._cache.items[h]&&(t._cache.items[h]=a[c])}}j(a),le(a)}),t.$connector.clearExpanded=o(function(){t.expandedItems=[],m=[],f=[]}),t.$connector.clear=o(function(a,c,d){let h=d||C;if(!n[h]||Object.keys(n[h]).length===0)return;if(a%t.pageSize!=0)throw"Got cleared data for index "+a+" which is not aligned with the page size of "+t.pageSize;let p=Math.floor(a/t.pageSize),v=Math.ceil(c/t.pageSize);for(let y=0;y<v;y++){let z=p+y,R=n[h][z];t.$connector.doDeselection(R.filter(q=>E[q.key])),R.forEach(q=>t.closeItemDetails(q)),delete n[h][z];const V=ye(z,d);V&&j(V),le(R)}let b=t._cache;if(d){const y=t._cache.getCacheAndIndexByKey(h);b=y.cache.itemCaches[y.scaledIndex]}const x=a+v*t.pageSize;for(let y=a;y<x;y++){delete b.items[y];const z=b.itemCaches[y];delete b.itemCaches[y];const R=z&&z.parentItem.key;R&&delete b.itemkeyCaches[R]}xe()}),t.$connector.reset=o(function(){t.size=0,de(n),de(t._cache.items),de(I),g&&g.cancel(),_&&_.cancel(),w&&w.cancel(),g=void 0,_=void 0,m=[],f=[],ke()});const de=a=>Object.keys(a).forEach(c=>delete a[c]);t.$connector.updateSize=a=>t.size=a,t.$connector.updateUniqueItemIdPath=a=>t.itemIdPath=a,t.$connector.expandItems=o(function(a){let c=Array.from(t.expandedItems);a.filter(d=>!t._isExpanded(d)).forEach(d=>c.push(d)),t.expandedItems=c}),t.$connector.collapseItems=o(function(a){let c=Array.from(t.expandedItems);a.forEach(d=>{let h=t._getItemIndexInArray(d,c);h>=0&&c.splice(h,1)}),t.expandedItems=c,a.forEach(d=>t.$connector.removeFromQueue(d))}),t.$connector.removeFromQueue=o(function(a){let c=t.getItemId(a);Object.values(s[c]||{}).forEach(d=>d([])),delete s[c],m=m.filter(d=>d.itemkey!==c),f=f.filter(d=>d.parentKey!==c)}),t.$connector.confirmParent=o(function(a,c,d){n[c]||(n[c]={});const h=n[c].size!==d;n[c].size=d,d===0&&(n[c][0]=[]);let p=Object.getOwnPropertyNames(s[c]||{});for(let v=0;v<p.length;v++){let b=p[v],x=I[c]||[0,0];const y=s[c][b];if(n[c]&&n[c][b]||b<x[0]||b>x[1]){delete s[c][b];let z=n[c][b]||new Array(d);y(z,d)}else y&&d===0&&(delete s[c][b],y([],d))}if(h&&p.length===0){const v=t.$connector.getCacheByKey(c),b=v&&v.itemkeyCaches?v.itemkeyCaches[c]:void 0;b&&(b.size=d),xe()}t.$server.confirmParentUpdate(a,c),t.loading||(t.__confirmParentUpdateDebouncer=ce.debounce(t.__confirmParentUpdateDebouncer,Pe,()=>t.__updateVisibleRows()))}),t.$connector.confirm=o(function(a){let c=Object.getOwnPropertyNames(i);for(let d=0;d<c.length;d++){let h=c[d],p=I[C]||[0,0];const v=t.size?Math.ceil(t.size/t.pageSize)-1:0,b=Math.min(p[1],v),x=i[h];n[C]&&n[C][h]||h<p[0]||+h>b?(delete i[h],n[C][h]?x(n[C][h]):(x(new Array(t.pageSize)),t.requestContentUpdate()),t._debounceIncreasePool&&t._debounceIncreasePool.flush()):x&&t.size===0&&(delete i[h],x([]))}Object.keys(i).length&&delete I[C],t.$server.confirmUpdate(a)}),t.$connector.ensureHierarchy=o(function(){for(let a in n)a!==C&&delete n[a];de(I),t._cache.itemCaches={},t._cache.itemkeyCaches={},ke()}),t.$connector.setSelectionMode=o(function(a){if((typeof a=="string"||a instanceof String)&&N.indexOf(a)>=0)O=a,E={},t.$connector.updateMultiSelectable();else throw"Attempted to set an invalid selection mode"}),t.$connector.updateMultiSelectable=o(function(){t.$&&(O===N[0]?t.$.table.setAttribute("aria-multiselectable",!1):O===N[1]?t.$.table.removeAttribute("aria-multiselectable"):t.$.table.setAttribute("aria-multiselectable",!0))}),t._createPropertyObserver("isAttached",()=>t.$connector.updateMultiSelectable());const Fe=a=>c=>{a&&(a(c),a=null)};t.$connector.setHeaderRenderer=o(function(a,c){const{content:d,showSorter:h,sorterPath:p}=c;if(d===null){a.headerRenderer=null;return}a.headerRenderer=Fe(v=>{v.innerHTML="";let b=v;if(h){const x=document.createElement("vaadin-grid-sorter");x.setAttribute("path",p);const y=d instanceof Node?d.textContent:d;y&&x.setAttribute("aria-label",`Sort by ${y}`),v.appendChild(x),b=x}d instanceof Node?b.appendChild(d):b.textContent=d})}),t.__applySorters=()=>{t._previousSorters=t._mapSorters(),Z.prototype.__applySorters.call(t)},t.$connector.setFooterRenderer=o(function(a,c){const{content:d}=c;if(d===null){a.footerRenderer=null;return}a.footerRenderer=Fe(h=>{h.innerHTML="",d instanceof Node?h.appendChild(d):h.textContent=d})}),t.addEventListener("vaadin-context-menu-before-open",o(function(a){const{key:c,columnId:d}=a.detail;t.$server.updateContextMenuTargetItem(c,d)})),t.getContextMenuBeforeOpenDetail=o(function(a){const c=a.detail.sourceEvent||a,d=t.getEventContext(c),h=d.item&&d.item.key||"",p=d.column&&d.column.id||"";return{key:h,columnId:p}}),t.addEventListener("click",o(a=>Le(a,"item-click"))),t.addEventListener("dblclick",o(a=>Le(a,"item-double-click"))),t.addEventListener("column-resize",o(a=>{t._getColumnsInOrder().filter(d=>!d.hidden).forEach(d=>{d.dispatchEvent(new CustomEvent("column-drag-resize"))}),t.dispatchEvent(new CustomEvent("column-drag-resize",{detail:{resizedColumnKey:a.detail.resizedColumn._flowId}}))})),t.addEventListener("column-reorder",o(a=>{const c=t._columnTree.slice(0).pop().filter(d=>d._flowId).sort((d,h)=>d._order-h._order).map(d=>d._flowId);t.dispatchEvent(new CustomEvent("column-reorder-all-columns",{detail:{columns:c}}))})),t.addEventListener("cell-focus",o(a=>{const c=t.getEventContext(a);["header","body","footer"].indexOf(c.section)!==-1&&t.dispatchEvent(new CustomEvent("grid-cell-focus",{detail:{itemKey:c.item?c.item.key:null,internalColumnId:c.column?c.column._flowId:null,section:c.section}}))}));function Le(a,c){if(a.defaultPrevented)return;const d=a.target;if(lt(d)||d instanceof HTMLLabelElement)return;const h=t.getEventContext(a),p=h.section;h.item&&p!=="details"&&(a.itemKey=h.item.key,h.column&&(a.internalColumnId=h.column._flowId),t.dispatchEvent(new CustomEvent(c,{detail:a})))}t.cellClassNameGenerator=o(function(a,c){const d=c.item.style;if(d)return(d.row||"")+" "+(a&&d[a._flowId]||"")}),t.cellPartNameGenerator=o(function(a,c){const d=c.item.part;if(d)return(d.row||"")+" "+(a&&d[a._flowId]||"")}),t.dropFilter=o(a=>a.item&&!a.item.dropDisabled),t.dragFilter=o(a=>a.item&&!a.item.dragDisabled),t.addEventListener("grid-dragstart",o(a=>{t._isSelected(a.detail.draggedItems[0])?(t.__selectionDragData?Object.keys(t.__selectionDragData).forEach(c=>{a.detail.setDragData(c,t.__selectionDragData[c])}):(t.__dragDataTypes||[]).forEach(c=>{a.detail.setDragData(c,a.detail.draggedItems.map(d=>d.dragData[c]).join(`
`))}),t.__selectionDraggedItemsCount>1&&a.detail.setDraggedItemsCount(t.__selectionDraggedItemsCount)):(t.__dragDataTypes||[]).forEach(c=>{a.detail.setDragData(c,a.detail.draggedItems[0].dragData[c])})}))})(e)}})();const me=window;me.Vaadin=me.Vaadin||{};me.Vaadin.setLitRenderer=(o,r,e,t,i,s)=>{const n=Function(`
    "use strict";

    const [render, html, returnChannel] = arguments;

    return (root, model, itemKey) => {
      const { item, index } = model;
      ${i.map(u=>`
          const ${u} = (...args) => {
            if (itemKey !== undefined) {
              returnChannel('${u}', itemKey, args[0] instanceof Event ? [] : [...args]);
            }
          }`).join("")}

      render(html\`${e}\`, root)
    }
  `)(pt,mt,t),l=(u,f,_)=>{const{item:m}=_;u.__litRenderer!==l&&(u.innerHTML="",delete u._$litPart$,u.__litRenderer=l);const g={};for(const A in m)A.startsWith(s)&&(g[A.replace(s,"")]=m[A]);n(u,{..._,item:g},m.key)};l.__rendererId=s,o[r]=l};me.Vaadin.unsetLitRenderer=(o,r,e)=>{var t;((t=o[r])==null?void 0:t.__rendererId)===e&&(o[r]=void 0)};export{qt as M,mi as R,Wi as a};
