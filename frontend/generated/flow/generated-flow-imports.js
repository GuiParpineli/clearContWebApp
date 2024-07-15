import 'Frontend/generated/jar-resources/flow-component-renderer.js';
import '@vaadin/polymer-legacy-adapter/style-modules.js';
import '@vaadin/combo-box/src/vaadin-combo-box.js';
import 'Frontend/generated/jar-resources/comboBoxConnector.js';
import '@vaadin/app-layout/src/vaadin-app-layout.js';
import '@vaadin/tooltip/src/vaadin-tooltip.js';
import '@vaadin/button/src/vaadin-button.js';
import 'Frontend/generated/jar-resources/buttonFunctions.js';
import '@vaadin/form-layout/src/vaadin-form-layout.js';
import '@vaadin/vertical-layout/src/vaadin-vertical-layout.js';
import '@vaadin/grid/src/vaadin-grid-column-group.js';
import '@vaadin/icon/src/vaadin-icon.js';
import '@vaadin/upload/src/vaadin-upload.js';
import '@vaadin/grid/src/vaadin-grid.js';
import '@vaadin/grid/src/vaadin-grid-column.js';
import '@vaadin/grid/src/vaadin-grid-sorter.js';
import '@vaadin/checkbox/src/vaadin-checkbox.js';
import 'Frontend/generated/jar-resources/gridConnector.ts';
import '@vaadin/app-layout/src/vaadin-drawer-toggle.js';
import 'Frontend/generated/jar-resources/vaadin-grid-flow-selection-column.js';
import '@vaadin/split-layout/src/vaadin-split-layout.js';
import '@vaadin/dialog/src/vaadin-dialog.js';
import '@vaadin/horizontal-layout/src/vaadin-horizontal-layout.js';
import '@vaadin/password-field/src/vaadin-password-field.js';
import '@vaadin/email-field/src/vaadin-email-field.js';
import '@vaadin/context-menu/src/vaadin-context-menu.js';
import 'Frontend/generated/jar-resources/contextMenuConnector.js';
import 'Frontend/generated/jar-resources/contextMenuTargetConnector.js';
import '@vaadin/form-layout/src/vaadin-form-item.js';
import '@vaadin/multi-select-combo-box/src/vaadin-multi-select-combo-box.js';
import '@vaadin/text-field/src/vaadin-text-field.js';
import '@vaadin/icons/vaadin-iconset.js';
import '@vaadin/date-picker/src/vaadin-date-picker.js';
import 'Frontend/generated/jar-resources/datepickerConnector.js';
import '@vaadin/text-area/src/vaadin-text-area.js';
import 'Frontend/generated/jar-resources/so/chart/chart.js';
import '@vaadin/select/src/vaadin-select.js';
import 'Frontend/generated/jar-resources/selectConnector.js';
import 'Frontend/generated/jar-resources/lit-renderer.ts';
import '@vaadin/notification/src/vaadin-notification.js';
import '@vaadin/common-frontend/ConnectionIndicator.js';
import '@vaadin/vaadin-lumo-styles/color-global.js';
import '@vaadin/vaadin-lumo-styles/typography-global.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';

const loadOnDemand = (key) => {
  const pending = [];
  if (key === 'ecadfd12159303c12ecb0f7d2c0f4fdd78b10d0df219bb7ea6343a64652b3fa6') {
    pending.push(import('./chunks/chunk-edff6799bc60a7eb8ddb5a2602a95d070019878b768880ca2abcd91dfc933f82.js'));
  }
  if (key === 'ca2d02ee7c2a29e259b88edf026762cb3786a9d9984be77c69d9ea7999e061e4') {
    pending.push(import('./chunks/chunk-a38c85317b37df9d049187481130e822824c77a4e3980dc7fb09a34f91a5882f.js'));
  }
  if (key === '4e194e0fc5fd8adb8d774b27461c6fe4578051248e5aa2ecbbe9718d33d2bd03') {
    pending.push(import('./chunks/chunk-96071355c90fb17fd28affb516323d4b42cd5c4a000306bbc148f524caedf438.js'));
  }
  if (key === '3f7e7b7b7b50efef7fcb3ebf919a33bff0044bed4bcb6df6dfb3b2635d241bae') {
    pending.push(import('./chunks/chunk-a38c85317b37df9d049187481130e822824c77a4e3980dc7fb09a34f91a5882f.js'));
  }
  if (key === '98b2dbc2901969214be0ca171c2ed02648085e6ba9518b10d8ed3b77e51f1ee4') {
    pending.push(import('./chunks/chunk-cf664a3fd7dc5ec1307d7a20ffb0ac08de0be2f2e38b96bfa000fb7dddcd8fc5.js'));
  }
  if (key === 'ae4541fb62a9a87bddcbd8bb538fe88504bfbc92e9b0230743a0a14f4441fe21') {
    pending.push(import('./chunks/chunk-edff6799bc60a7eb8ddb5a2602a95d070019878b768880ca2abcd91dfc933f82.js'));
  }
  if (key === 'f6535cfcc0d2a354da3fb33a30a596812d67594ba927e462496d9b732dd96e72') {
    pending.push(import('./chunks/chunk-9663ee49a129291f764050744924ae0d7aff33095fdf22d3df51d402ceb81018.js'));
  }
  if (key === '87834cc8fb9ab74d64489c9232812af8cb4c0c6970b04122bc37e8e2d3c4ead8') {
    pending.push(import('./chunks/chunk-edff6799bc60a7eb8ddb5a2602a95d070019878b768880ca2abcd91dfc933f82.js'));
  }
  if (key === 'a959c1e5ecd306e826b5d2795d1ace0f32bfc9dcb3e51013c5b4516a818098b1') {
    pending.push(import('./chunks/chunk-81dbc43a73de9c067d1337aad6126b3632e5bed918384e993d06ce22a256353c.js'));
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