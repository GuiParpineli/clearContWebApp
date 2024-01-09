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
import '@vaadin/login/theme/lumo/vaadin-login-form.js';
import '@vaadin/vaadin-lumo-styles/color-global.js';
import '@vaadin/vaadin-lumo-styles/typography-global.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';
import '@vaadin/common-frontend/ConnectionIndicator.js';

const loadOnDemand = (key) => {
  const pending = [];
  if (key === '0ce01b5e619f7cb94ee289f472363fef094d57c9c287b0ded1a83b2309bb39ba') {
    pending.push(import('./chunks/chunk-3eeea1729d36151f7c1c94504532907125079fbe44ddb1eac07d7c4d003d4527.js'));
  }
  if (key === 'c34975dbd5262805a261cd57b1460d21c36bfdbdc0abb6a68a6c0c0dfef34c8d') {
    pending.push(import('./chunks/chunk-e75a00512802f7e90c89ebb6090b8283a1993f6ad556923b2705539f87bb54ad.js'));
  }
  if (key === 'afb1ab2556b0c035734f3b943abb3998dc9ba3878e680c8032da1073fda960b5') {
    pending.push(import('./chunks/chunk-dda959e7b3e2aa5bda6d9567b3c4621ae84439db171c7a4e4780d9336be7ac3b.js'));
  }
  if (key === '95cdbc699d2a469a928d157aed62614bfd954e30c43eb157f562311f14df988c') {
    pending.push(import('./chunks/chunk-0aed11632844c5c9e45ef0192ca605763ed4a050eafaec203c1bf5401e1ec0a7.js'));
  }
  if (key === '0877d1d2f104f9b6e543a661cbf2a32ee544180e99ee1a7237fdbbe064c7abeb') {
    pending.push(import('./chunks/chunk-ab48e17481522b8d6df7dfbbc577c662cc87ab3ea5eaaff3682c4f852d55bb71.js'));
  }
  if (key === '6375dc964481c56fe8062dbe238ffe1e8a8b2efb3fc85ba312f4b609ad08ed4c') {
    pending.push(import('./chunks/chunk-e75a00512802f7e90c89ebb6090b8283a1993f6ad556923b2705539f87bb54ad.js'));
  }
  return Promise.all(pending);
}

window.Vaadin = window.Vaadin || {};
window.Vaadin.Flow = window.Vaadin.Flow || {};
window.Vaadin.Flow.loadOnDemand = loadOnDemand;