import 'Frontend/generated/jar-resources/flow-component-renderer.js';
import '@vaadin/polymer-legacy-adapter/style-modules.js';
import '@vaadin/combo-box/theme/lumo/vaadin-combo-box.js';
import 'Frontend/generated/jar-resources/comboBoxConnector.js';
import '@vaadin/app-layout/theme/lumo/vaadin-app-layout.js';
import '@vaadin/tooltip/theme/lumo/vaadin-tooltip.js';
import '@vaadin/button/theme/lumo/vaadin-button.js';
import 'Frontend/generated/jar-resources/buttonFunctions.js';
import '@vaadin/form-layout/theme/lumo/vaadin-form-layout.js';
import '@vaadin/vertical-layout/theme/lumo/vaadin-vertical-layout.js';
import '@vaadin/grid/theme/lumo/vaadin-grid-column-group.js';
import '@vaadin/icon/theme/lumo/vaadin-icon.js';
import '@vaadin/upload/theme/lumo/vaadin-upload.js';
import '@vaadin/grid/theme/lumo/vaadin-grid.js';
import '@vaadin/grid/theme/lumo/vaadin-grid-column.js';
import '@vaadin/grid/theme/lumo/vaadin-grid-sorter.js';
import '@vaadin/checkbox/theme/lumo/vaadin-checkbox.js';
import 'Frontend/generated/jar-resources/gridConnector.ts';
import '@vaadin/app-layout/theme/lumo/vaadin-drawer-toggle.js';
import 'Frontend/generated/jar-resources/vaadin-grid-flow-selection-column.js';
import '@vaadin/split-layout/theme/lumo/vaadin-split-layout.js';
import '@vaadin/dialog/theme/lumo/vaadin-dialog.js';
import '@vaadin/horizontal-layout/theme/lumo/vaadin-horizontal-layout.js';
import '@vaadin/password-field/theme/lumo/vaadin-password-field.js';
import '@vaadin/email-field/theme/lumo/vaadin-email-field.js';
import '@vaadin/context-menu/theme/lumo/vaadin-context-menu.js';
import 'Frontend/generated/jar-resources/contextMenuConnector.js';
import 'Frontend/generated/jar-resources/contextMenuTargetConnector.js';
import '@vaadin/form-layout/theme/lumo/vaadin-form-item.js';
import '@vaadin/multi-select-combo-box/theme/lumo/vaadin-multi-select-combo-box.js';
import '@vaadin/number-field/theme/lumo/vaadin-number-field.js';
import '@vaadin/text-field/theme/lumo/vaadin-text-field.js';
import '@vaadin/icons/vaadin-iconset.js';
import '@vaadin/date-picker/theme/lumo/vaadin-date-picker.js';
import 'Frontend/generated/jar-resources/datepickerConnector.js';
import '@vaadin/text-area/theme/lumo/vaadin-text-area.js';
import 'Frontend/generated/jar-resources/so/chart/chart.js';
import '@vaadin/select/theme/lumo/vaadin-select.js';
import 'Frontend/generated/jar-resources/selectConnector.js';
import 'Frontend/generated/jar-resources/lit-renderer.ts';
import '@vaadin/notification/theme/lumo/vaadin-notification.js';
import '@vaadin/common-frontend/ConnectionIndicator.js';
import '@vaadin/vaadin-lumo-styles/color-global.js';
import '@vaadin/vaadin-lumo-styles/typography-global.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';

const loadOnDemand = (key) => {
  const pending = [];
  if (key === 'ca2d02ee7c2a29e259b88edf026762cb3786a9d9984be77c69d9ea7999e061e4') {
    pending.push(import('./chunks/chunk-49a7561097b10ba832048bf0c73bbc1e3f50e69f6296ec0228c14aeae0df328a.js'));
  }
  if (key === '4e194e0fc5fd8adb8d774b27461c6fe4578051248e5aa2ecbbe9718d33d2bd03') {
    pending.push(import('./chunks/chunk-871f12497c50a94a88ab7f9abf86a0a10efec199e942fa4f731da9f620c12d70.js'));
  }
  if (key === 'ecadfd12159303c12ecb0f7d2c0f4fdd78b10d0df219bb7ea6343a64652b3fa6') {
    pending.push(import('./chunks/chunk-8a0f74c8787741dd3f717ae63a9b3845e8453255018d9211ecf7f8f9ed0be8a3.js'));
  }
  if (key === '3f7e7b7b7b50efef7fcb3ebf919a33bff0044bed4bcb6df6dfb3b2635d241bae') {
    pending.push(import('./chunks/chunk-49a7561097b10ba832048bf0c73bbc1e3f50e69f6296ec0228c14aeae0df328a.js'));
  }
  if (key === '98b2dbc2901969214be0ca171c2ed02648085e6ba9518b10d8ed3b77e51f1ee4') {
    pending.push(import('./chunks/chunk-60493f4b66b043c82aeec9d32c18a09a3a22bf6f66c5f489edaaaa01505e39b2.js'));
  }
  if (key === '87834cc8fb9ab74d64489c9232812af8cb4c0c6970b04122bc37e8e2d3c4ead8') {
    pending.push(import('./chunks/chunk-8a0f74c8787741dd3f717ae63a9b3845e8453255018d9211ecf7f8f9ed0be8a3.js'));
  }
  if (key === 'a959c1e5ecd306e826b5d2795d1ace0f32bfc9dcb3e51013c5b4516a818098b1') {
    pending.push(import('./chunks/chunk-51712405ad81dd3aa4a03bea64e168ae275f97ad7624af8883ab709a790dacd5.js'));
  }
  if (key === 'ae4541fb62a9a87bddcbd8bb538fe88504bfbc92e9b0230743a0a14f4441fe21') {
    pending.push(import('./chunks/chunk-8a0f74c8787741dd3f717ae63a9b3845e8453255018d9211ecf7f8f9ed0be8a3.js'));
  }
  if (key === 'f6535cfcc0d2a354da3fb33a30a596812d67594ba927e462496d9b732dd96e72') {
    pending.push(import('./chunks/chunk-ae0d062b825bb74761e16c0b3ecf14238a74c6b9bb652fd77fed7f3870212eca.js'));
  }
  return Promise.all(pending);
}

window.Vaadin = window.Vaadin || {};
window.Vaadin.Flow = window.Vaadin.Flow || {};
window.Vaadin.Flow.loadOnDemand = loadOnDemand;
window.Vaadin.Flow.resetFocus = () => {
 let ae=document.activeElement;
 while(ae&&ae.shadowRoot) ae = ae.shadowRoot.activeElement;
 return !ae || ae.blur() || ae.focus() || true;
}