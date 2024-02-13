import { injectGlobalCss } from 'Frontend/generated/jar-resources/theme-util.js';

import { css, unsafeCSS, registerStyles } from '@vaadin/vaadin-themable-mixin';
import $cssFromFile_0 from 'Frontend/../frontend/themes/theme-light/styles.css?inline';

injectGlobalCss($cssFromFile_0.toString(), 'CSSImport end', document);
import '@vaadin/polymer-legacy-adapter/style-modules.js';
import '@vaadin/combo-box/theme/lumo/vaadin-combo-box.js';
import 'Frontend/generated/jar-resources/flow-component-renderer.js';
import 'Frontend/generated/jar-resources/comboBoxConnector.js';
import '@vaadin/app-layout/theme/lumo/vaadin-app-layout.js';
import '@vaadin/tooltip/theme/lumo/vaadin-tooltip.js';
import '@vaadin/button/theme/lumo/vaadin-button.js';
import 'Frontend/generated/jar-resources/buttonFunctions.js';
import '@vaadin/vertical-layout/theme/lumo/vaadin-vertical-layout.js';
import '@vaadin/horizontal-layout/theme/lumo/vaadin-horizontal-layout.js';
import '@vaadin/icons/vaadin-iconset.js';
import '@vaadin/icon/theme/lumo/vaadin-icon.js';
import '@vaadin/app-layout/theme/lumo/vaadin-drawer-toggle.js';
import '@vaadin/login/theme/lumo/vaadin-login-overlay.js';
import '@vaadin/vaadin-lumo-styles/color-global.js';
import '@vaadin/vaadin-lumo-styles/typography-global.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import '@vaadin/common-frontend/ConnectionIndicator.js';

const loadOnDemand = (key) => {
  const pending = [];
  if (key === '6375dc964481c56fe8062dbe238ffe1e8a8b2efb3fc85ba312f4b609ad08ed4c') {
    pending.push(import('./chunks/chunk-e75a00512802f7e90c89ebb6090b8283a1993f6ad556923b2705539f87bb54ad.js'));
  }
  if (key === '0877d1d2f104f9b6e543a661cbf2a32ee544180e99ee1a7237fdbbe064c7abeb') {
    pending.push(import('./chunks/chunk-08c8bf48207b553734c4e0a04a12ccfd96c38cb235400e1457412323e0451332.js'));
  }
  if (key === 'afb1ab2556b0c035734f3b943abb3998dc9ba3878e680c8032da1073fda960b5') {
    pending.push(import('./chunks/chunk-dda959e7b3e2aa5bda6d9567b3c4621ae84439db171c7a4e4780d9336be7ac3b.js'));
  }
  if (key === '95cdbc699d2a469a928d157aed62614bfd954e30c43eb157f562311f14df988c') {
    pending.push(import('./chunks/chunk-0aed11632844c5c9e45ef0192ca605763ed4a050eafaec203c1bf5401e1ec0a7.js'));
  }
  if (key === '3cf9543dc82747811bbf2f45c86615c84ad675d1fc59aeff1afff812bbd1192d') {
    pending.push(import('./chunks/chunk-3eeea1729d36151f7c1c94504532907125079fbe44ddb1eac07d7c4d003d4527.js'));
  }
  if (key === '0608e3a133d19386a6b4c9f44baa673e5df79922aab94b582c66fb748d5ddbb9') {
    pending.push(import('./chunks/chunk-d4f0977c94e9449f9aa90b840aca4a8ca4f7e9a4dbf498eebb3c7b09ba2461c3.js'));
  }
  return Promise.all(pending);
}

window.Vaadin = window.Vaadin || {};
window.Vaadin.Flow = window.Vaadin.Flow || {};
window.Vaadin.Flow.loadOnDemand = loadOnDemand;