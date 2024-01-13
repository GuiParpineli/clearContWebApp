// vite.generated.ts
import path from "path";
import { existsSync as existsSync5, mkdirSync as mkdirSync2, readdirSync as readdirSync2, readFileSync as readFileSync4, writeFileSync as writeFileSync2 } from "fs";
import { createHash } from "crypto";
import * as net from "net";

// build/plugins/application-theme-plugin/theme-handle.js
import { existsSync as existsSync3, readFileSync as readFileSync2 } from "fs";
import { resolve as resolve3 } from "path";

// build/plugins/application-theme-plugin/theme-generator.js
import glob2 from "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/node_modules/glob/glob.js";
import { resolve as resolve2, basename as basename2 } from "path";
import { existsSync as existsSync2, readFileSync, writeFileSync } from "fs";

// build/plugins/application-theme-plugin/theme-copy.js
import { readdirSync, statSync, mkdirSync, existsSync, copyFileSync } from "fs";
import { resolve, basename, relative, extname } from "path";
import glob from "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/node_modules/glob/glob.js";
import mkdirp from "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/node_modules/mkdirp/index.js";
var { sync } = glob;
var { sync: mkdirpSync } = mkdirp;
var ignoredFileExtensions = [".css", ".js", ".json"];
function copyThemeResources(themeFolder2, projectStaticAssetsOutputFolder, logger) {
  const staticAssetsThemeFolder = resolve(projectStaticAssetsOutputFolder, "themes", basename(themeFolder2));
  const collection = collectFolders(themeFolder2, logger);
  if (collection.files.length > 0) {
    mkdirpSync(staticAssetsThemeFolder);
    collection.directories.forEach((directory) => {
      const relativeDirectory = relative(themeFolder2, directory);
      const targetDirectory = resolve(staticAssetsThemeFolder, relativeDirectory);
      mkdirpSync(targetDirectory);
    });
    collection.files.forEach((file) => {
      const relativeFile = relative(themeFolder2, file);
      const targetFile = resolve(staticAssetsThemeFolder, relativeFile);
      copyFileIfAbsentOrNewer(file, targetFile, logger);
    });
  }
}
function collectFolders(folderToCopy, logger) {
  const collection = { directories: [], files: [] };
  logger.trace("files in directory", readdirSync(folderToCopy));
  readdirSync(folderToCopy).forEach((file) => {
    const fileToCopy = resolve(folderToCopy, file);
    try {
      if (statSync(fileToCopy).isDirectory()) {
        logger.debug("Going through directory", fileToCopy);
        const result = collectFolders(fileToCopy, logger);
        if (result.files.length > 0) {
          collection.directories.push(fileToCopy);
          logger.debug("Adding directory", fileToCopy);
          collection.directories.push.apply(collection.directories, result.directories);
          collection.files.push.apply(collection.files, result.files);
        }
      } else if (!ignoredFileExtensions.includes(extname(fileToCopy))) {
        logger.debug("Adding file", fileToCopy);
        collection.files.push(fileToCopy);
      }
    } catch (error) {
      handleNoSuchFileError(fileToCopy, error, logger);
    }
  });
  return collection;
}
function copyStaticAssets(themeName, themeProperties, projectStaticAssetsOutputFolder, logger) {
  const assets = themeProperties["assets"];
  if (!assets) {
    logger.debug("no assets to handle no static assets were copied");
    return;
  }
  mkdirSync(projectStaticAssetsOutputFolder, {
    recursive: true
  });
  const missingModules = checkModules(Object.keys(assets));
  if (missingModules.length > 0) {
    throw Error(
      "Missing npm modules '" + missingModules.join("', '") + "' for assets marked in 'theme.json'.\nInstall package(s) by adding a @NpmPackage annotation or install it using 'npm/pnpm i'"
    );
  }
  Object.keys(assets).forEach((module) => {
    const copyRules = assets[module];
    Object.keys(copyRules).forEach((copyRule) => {
      const nodeSources = resolve("node_modules/", module, copyRule);
      const files = sync(nodeSources, { nodir: true });
      const targetFolder = resolve(projectStaticAssetsOutputFolder, "themes", themeName, copyRules[copyRule]);
      mkdirSync(targetFolder, {
        recursive: true
      });
      files.forEach((file) => {
        const copyTarget = resolve(targetFolder, basename(file));
        copyFileIfAbsentOrNewer(file, copyTarget, logger);
      });
    });
  });
}
function checkModules(modules) {
  const missing = [];
  modules.forEach((module) => {
    if (!existsSync(resolve("node_modules/", module))) {
      missing.push(module);
    }
  });
  return missing;
}
function copyFileIfAbsentOrNewer(fileToCopy, copyTarget, logger) {
  try {
    if (!existsSync(copyTarget) || statSync(copyTarget).mtime < statSync(fileToCopy).mtime) {
      logger.trace("Copying: ", fileToCopy, "=>", copyTarget);
      copyFileSync(fileToCopy, copyTarget);
    }
  } catch (error) {
    handleNoSuchFileError(fileToCopy, error, logger);
  }
}
function handleNoSuchFileError(file, error, logger) {
  if (error.code === "ENOENT") {
    logger.warn("Ignoring not existing file " + file + ". File may have been deleted during theme processing.");
  } else {
    throw error;
  }
}

// build/plugins/application-theme-plugin/theme-generator.js
var { sync: sync2 } = glob2;
var themeComponentsFolder = "components";
var documentCssFilename = "document.css";
var stylesCssFilename = "styles.css";
var CSSIMPORT_COMMENT = "CSSImport end";
var headerImport = `import 'construct-style-sheets-polyfill';
`;
function writeThemeFiles(themeFolder2, themeName, themeProperties, options) {
  const productionMode = !options.devMode;
  const useDevServerOrInProductionMode = !options.useDevBundle;
  const outputFolder = options.frontendGeneratedFolder;
  const styles = resolve2(themeFolder2, stylesCssFilename);
  const documentCssFile = resolve2(themeFolder2, documentCssFilename);
  const autoInjectComponents = themeProperties.autoInjectComponents ?? true;
  const globalFilename = "theme-" + themeName + ".global.generated.js";
  const componentsFilename = "theme-" + themeName + ".components.generated.js";
  const themeFilename = "theme-" + themeName + ".generated.js";
  let themeFileContent = headerImport;
  let globalImportContent = "// When this file is imported, global styles are automatically applied\n";
  let componentsFileContent = "";
  var componentsFiles;
  if (autoInjectComponents) {
    componentsFiles = sync2("*.css", {
      cwd: resolve2(themeFolder2, themeComponentsFolder),
      nodir: true
    });
    if (componentsFiles.length > 0) {
      componentsFileContent += "import { unsafeCSS, registerStyles } from '@vaadin/vaadin-themable-mixin/register-styles';\n";
    }
  }
  if (themeProperties.parent) {
    themeFileContent += `import { applyTheme as applyBaseTheme } from './theme-${themeProperties.parent}.generated.js';
`;
  }
  themeFileContent += `import { injectGlobalCss } from 'Frontend/generated/jar-resources/theme-util.js';
`;
  themeFileContent += `import './${componentsFilename}';
`;
  themeFileContent += `let needsReloadOnChanges = false;
`;
  const imports = [];
  const componentCssImports = [];
  const globalFileContent = [];
  const globalCssCode = [];
  const shadowOnlyCss = [];
  const componentCssCode = [];
  const parentTheme = themeProperties.parent ? "applyBaseTheme(target);\n" : "";
  const parentThemeGlobalImport = themeProperties.parent ? `import './theme-${themeProperties.parent}.global.generated.js';
` : "";
  const themeIdentifier = "_vaadintheme_" + themeName + "_";
  const lumoCssFlag = "_vaadinthemelumoimports_";
  const globalCssFlag = themeIdentifier + "globalCss";
  const componentCssFlag = themeIdentifier + "componentCss";
  if (!existsSync2(styles)) {
    if (productionMode) {
      throw new Error(`styles.css file is missing and is needed for '${themeName}' in folder '${themeFolder2}'`);
    }
    writeFileSync(
      styles,
      "/* Import your application global css files here or add the styles directly to this file */",
      "utf8"
    );
  }
  let filename = basename2(styles);
  let variable = camelCase(filename);
  const lumoImports = themeProperties.lumoImports || ["color", "typography"];
  if (lumoImports) {
    lumoImports.forEach((lumoImport) => {
      imports.push(`import { ${lumoImport} } from '@vaadin/vaadin-lumo-styles/${lumoImport}.js';
`);
      if (lumoImport === "utility" || lumoImport === "badge" || lumoImport === "typography" || lumoImport === "color") {
        imports.push(`import '@vaadin/vaadin-lumo-styles/${lumoImport}-global.js';
`);
      }
    });
    lumoImports.forEach((lumoImport) => {
      shadowOnlyCss.push(`removers.push(injectGlobalCss(${lumoImport}.cssText, '', target, true));
`);
    });
  }
  if (useDevServerOrInProductionMode) {
    globalFileContent.push(parentThemeGlobalImport);
    globalFileContent.push(`import 'themes/${themeName}/${filename}';
`);
    imports.push(`import ${variable} from 'themes/${themeName}/${filename}?inline';
`);
    shadowOnlyCss.push(`removers.push(injectGlobalCss(${variable}.toString(), '', target));
    `);
  }
  if (existsSync2(documentCssFile)) {
    filename = basename2(documentCssFile);
    variable = camelCase(filename);
    if (useDevServerOrInProductionMode) {
      globalFileContent.push(`import 'themes/${themeName}/${filename}';
`);
      imports.push(`import ${variable} from 'themes/${themeName}/${filename}?inline';
`);
      shadowOnlyCss.push(`removers.push(injectGlobalCss(${variable}.toString(),'', document));
    `);
    }
  }
  let i = 0;
  if (themeProperties.documentCss) {
    const missingModules = checkModules(themeProperties.documentCss);
    if (missingModules.length > 0) {
      throw Error(
        "Missing npm modules or files '" + missingModules.join("', '") + "' for documentCss marked in 'theme.json'.\nInstall or update package(s) by adding a @NpmPackage annotation or install it using 'npm/pnpm i'"
      );
    }
    themeProperties.documentCss.forEach((cssImport) => {
      const variable2 = "module" + i++;
      imports.push(`import ${variable2} from '${cssImport}?inline';
`);
      globalCssCode.push(`if(target !== document) {
        removers.push(injectGlobalCss(${variable2}.toString(), '', target));
    }
    `);
      globalCssCode.push(
        `removers.push(injectGlobalCss(${variable2}.toString(), '${CSSIMPORT_COMMENT}', document));
    `
      );
    });
  }
  if (themeProperties.importCss) {
    const missingModules = checkModules(themeProperties.importCss);
    if (missingModules.length > 0) {
      throw Error(
        "Missing npm modules or files '" + missingModules.join("', '") + "' for importCss marked in 'theme.json'.\nInstall or update package(s) by adding a @NpmPackage annotation or install it using 'npm/pnpm i'"
      );
    }
    themeProperties.importCss.forEach((cssPath) => {
      const variable2 = "module" + i++;
      globalFileContent.push(`import '${cssPath}';
`);
      imports.push(`import ${variable2} from '${cssPath}?inline';
`);
      shadowOnlyCss.push(`removers.push(injectGlobalCss(${variable2}.toString(), '${CSSIMPORT_COMMENT}', target));
`);
    });
  }
  if (autoInjectComponents) {
    componentsFiles.forEach((componentCss) => {
      const filename2 = basename2(componentCss);
      const tag = filename2.replace(".css", "");
      const variable2 = camelCase(filename2);
      componentCssImports.push(
        `import ${variable2} from 'themes/${themeName}/${themeComponentsFolder}/${filename2}?inline';
`
      );
      const componentString = `registerStyles(
        '${tag}',
        unsafeCSS(${variable2}.toString())
      );
      `;
      componentCssCode.push(componentString);
    });
  }
  themeFileContent += imports.join("");
  const themeFileApply = `
  let themeRemovers = new WeakMap();
  let targets = [];

  export const applyTheme = (target) => {
    const removers = [];
    if (target !== document) {
      ${shadowOnlyCss.join("")}
    }
    ${parentTheme}
    ${globalCssCode.join("")}

    if (import.meta.hot) {
      targets.push(new WeakRef(target));
      themeRemovers.set(target, removers);
    }

  }
  
`;
  componentsFileContent += `
${componentCssImports.join("")}

if (!document['${componentCssFlag}']) {
  ${componentCssCode.join("")}
  document['${componentCssFlag}'] = true;
}

if (import.meta.hot) {
  import.meta.hot.accept((module) => {
    window.location.reload();
  });
}

`;
  themeFileContent += themeFileApply;
  themeFileContent += `
if (import.meta.hot) {
  import.meta.hot.accept((module) => {

    if (needsReloadOnChanges) {
      window.location.reload();
    } else {
      targets.forEach(targetRef => {
        const target = targetRef.deref();
        if (target) {
          themeRemovers.get(target).forEach(remover => remover())
          module.applyTheme(target);
        }
      })
    }
  });

  import.meta.hot.on('vite:afterUpdate', (update) => {
    document.dispatchEvent(new CustomEvent('vaadin-theme-updated', { detail: update }));
  });
}

`;
  globalImportContent += `
${globalFileContent.join("")}
`;
  writeIfChanged(resolve2(outputFolder, globalFilename), globalImportContent);
  writeIfChanged(resolve2(outputFolder, themeFilename), themeFileContent);
  writeIfChanged(resolve2(outputFolder, componentsFilename), componentsFileContent);
}
function writeIfChanged(file, data) {
  if (!existsSync2(file) || readFileSync(file, { encoding: "utf-8" }) !== data) {
    writeFileSync(file, data);
  }
}
function camelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, "").replace(/\.|\-/g, "");
}

// build/plugins/application-theme-plugin/theme-handle.js
var nameRegex = /theme-(.*)\.generated\.js/;
var prevThemeName = void 0;
var firstThemeName = void 0;
function processThemeResources(options, logger) {
  const themeName = extractThemeName(options.frontendGeneratedFolder);
  if (themeName) {
    if (!prevThemeName && !firstThemeName) {
      firstThemeName = themeName;
    } else if (prevThemeName && prevThemeName !== themeName && firstThemeName !== themeName || !prevThemeName && firstThemeName !== themeName) {
      const warning = `Attention: Active theme is switched to '${themeName}'.`;
      const description = `
      Note that adding new style sheet files to '/themes/${themeName}/components', 
      may not be taken into effect until the next application restart.
      Changes to already existing style sheet files are being reloaded as before.`;
      logger.warn("*******************************************************************");
      logger.warn(warning);
      logger.warn(description);
      logger.warn("*******************************************************************");
    }
    prevThemeName = themeName;
    findThemeFolderAndHandleTheme(themeName, options, logger);
  } else {
    prevThemeName = void 0;
    logger.debug("Skipping Vaadin application theme handling.");
    logger.trace("Most likely no @Theme annotation for application or only themeClass used.");
  }
}
function findThemeFolderAndHandleTheme(themeName, options, logger) {
  let themeFound = false;
  for (let i = 0; i < options.themeProjectFolders.length; i++) {
    const themeProjectFolder = options.themeProjectFolders[i];
    if (existsSync3(themeProjectFolder)) {
      logger.debug("Searching themes folder '" + themeProjectFolder + "' for theme '" + themeName + "'");
      const handled = handleThemes(themeName, themeProjectFolder, options, logger);
      if (handled) {
        if (themeFound) {
          throw new Error(
            "Found theme files in '" + themeProjectFolder + "' and '" + themeFound + "'. Theme should only be available in one folder"
          );
        }
        logger.debug("Found theme files from '" + themeProjectFolder + "'");
        themeFound = themeProjectFolder;
      }
    }
  }
  if (existsSync3(options.themeResourceFolder)) {
    if (themeFound && existsSync3(resolve3(options.themeResourceFolder, themeName))) {
      throw new Error(
        "Theme '" + themeName + `'should not exist inside a jar and in the project at the same time
Extending another theme is possible by adding { "parent": "my-parent-theme" } entry to the theme.json file inside your theme folder.`
      );
    }
    logger.debug(
      "Searching theme jar resource folder '" + options.themeResourceFolder + "' for theme '" + themeName + "'"
    );
    handleThemes(themeName, options.themeResourceFolder, options, logger);
    themeFound = true;
  }
  return themeFound;
}
function handleThemes(themeName, themesFolder, options, logger) {
  const themeFolder2 = resolve3(themesFolder, themeName);
  if (existsSync3(themeFolder2)) {
    logger.debug("Found theme ", themeName, " in folder ", themeFolder2);
    const themeProperties = getThemeProperties(themeFolder2);
    if (themeProperties.parent) {
      const found = findThemeFolderAndHandleTheme(themeProperties.parent, options, logger);
      if (!found) {
        throw new Error(
          "Could not locate files for defined parent theme '" + themeProperties.parent + "'.\nPlease verify that dependency is added or theme folder exists."
        );
      }
    }
    copyStaticAssets(themeName, themeProperties, options.projectStaticAssetsOutputFolder, logger);
    copyThemeResources(themeFolder2, options.projectStaticAssetsOutputFolder, logger);
    writeThemeFiles(themeFolder2, themeName, themeProperties, options);
    return true;
  }
  return false;
}
function getThemeProperties(themeFolder2) {
  const themePropertyFile = resolve3(themeFolder2, "theme.json");
  if (!existsSync3(themePropertyFile)) {
    return {};
  }
  const themePropertyFileAsString = readFileSync2(themePropertyFile);
  if (themePropertyFileAsString.length === 0) {
    return {};
  }
  return JSON.parse(themePropertyFileAsString);
}
function extractThemeName(frontendGeneratedFolder) {
  if (!frontendGeneratedFolder) {
    throw new Error(
      "Couldn't extract theme name from 'theme.js', because the path to folder containing this file is empty. Please set the a correct folder path in ApplicationThemePlugin constructor parameters."
    );
  }
  const generatedThemeFile = resolve3(frontendGeneratedFolder, "theme.js");
  if (existsSync3(generatedThemeFile)) {
    const themeName = nameRegex.exec(readFileSync2(generatedThemeFile, { encoding: "utf8" }))[1];
    if (!themeName) {
      throw new Error("Couldn't parse theme name from '" + generatedThemeFile + "'.");
    }
    return themeName;
  } else {
    return "";
  }
}

// build/plugins/theme-loader/theme-loader-utils.js
import { existsSync as existsSync4, readFileSync as readFileSync3 } from "fs";
import { resolve as resolve4, basename as basename3 } from "path";
import glob3 from "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/node_modules/glob/glob.js";
var { sync: sync3 } = glob3;
var urlMatcher = /(url\(\s*)(\'|\")?(\.\/|\.\.\/)(\S*)(\2\s*\))/g;
function assetsContains(fileUrl, themeFolder2, logger) {
  const themeProperties = getThemeProperties2(themeFolder2);
  if (!themeProperties) {
    logger.debug("No theme properties found.");
    return false;
  }
  const assets = themeProperties["assets"];
  if (!assets) {
    logger.debug("No defined assets in theme properties");
    return false;
  }
  for (let module of Object.keys(assets)) {
    const copyRules = assets[module];
    for (let copyRule of Object.keys(copyRules)) {
      if (fileUrl.startsWith(copyRules[copyRule])) {
        const targetFile = fileUrl.replace(copyRules[copyRule], "");
        const files = sync3(resolve4("node_modules/", module, copyRule), { nodir: true });
        for (let file of files) {
          if (file.endsWith(targetFile))
            return true;
        }
      }
    }
  }
  return false;
}
function getThemeProperties2(themeFolder2) {
  const themePropertyFile = resolve4(themeFolder2, "theme.json");
  if (!existsSync4(themePropertyFile)) {
    return {};
  }
  const themePropertyFileAsString = readFileSync3(themePropertyFile);
  if (themePropertyFileAsString.length === 0) {
    return {};
  }
  return JSON.parse(themePropertyFileAsString);
}
function rewriteCssUrls(source, handledResourceFolder, themeFolder2, logger, options) {
  source = source.replace(urlMatcher, function(match, url, quoteMark, replace2, fileUrl, endString) {
    let absolutePath = resolve4(handledResourceFolder, replace2, fileUrl);
    const existingThemeResource = absolutePath.startsWith(themeFolder2) && existsSync4(absolutePath);
    if (existingThemeResource || assetsContains(fileUrl, themeFolder2, logger)) {
      const replacement = options.devMode ? "./" : "../static/";
      const skipLoader = existingThemeResource ? "" : replacement;
      const frontendThemeFolder = skipLoader + "themes/" + basename3(themeFolder2);
      logger.debug(
        "Updating url for file",
        "'" + replace2 + fileUrl + "'",
        "to use",
        "'" + frontendThemeFolder + "/" + fileUrl + "'"
      );
      const pathResolved = absolutePath.substring(themeFolder2.length).replace(/\\/g, "/");
      return url + (quoteMark ?? "") + frontendThemeFolder + pathResolved + endString;
    } else if (options.devMode) {
      logger.log("No rewrite for '", match, "' as the file was not found.");
    } else {
      return url + (quoteMark ?? "") + "../../" + fileUrl + endString;
    }
    return match;
  });
  return source;
}

// build/vaadin-dev-server-settings.json
var vaadin_dev_server_settings_default = {
  frontendFolder: "C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/frontend",
  themeFolder: "themes",
  themeResourceFolder: "C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/frontend/generated/jar-resources",
  staticOutput: "C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/build/resources/main/META-INF/VAADIN/webapp/VAADIN/static",
  generatedFolder: "generated",
  statsOutput: "C:\\Users\\guilh.GUIPC\\JavaProjects\\clearContWebApp\\build\\resources\\main\\META-INF\\VAADIN\\config",
  frontendBundleOutput: "C:\\Users\\guilh.GUIPC\\JavaProjects\\clearContWebApp\\build\\resources\\main\\META-INF\\VAADIN\\webapp",
  devBundleOutput: "C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/src/main/dev-bundle/webapp",
  devBundleStatsOutput: "C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/src/main/dev-bundle/config",
  jarResourcesFolder: "C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/frontend/generated/jar-resources",
  themeName: "",
  clientServiceWorkerSource: "C:\\Users\\guilh.GUIPC\\JavaProjects\\clearContWebApp\\build\\sw.ts",
  pwaEnabled: true,
  offlineEnabled: true,
  offlinePath: "'offline.html'"
};

// vite.generated.ts
import {
  defineConfig,
  mergeConfig
} from "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/node_modules/vite/dist/node/index.js";
import { getManifest } from "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/node_modules/workbox-build/build/index.js";
import * as rollup from "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/node_modules/rollup/dist/es/rollup.js";
import brotli from "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/node_modules/rollup-plugin-brotli/lib/index.cjs.js";
import replace from "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/node_modules/@rollup/plugin-replace/dist/es/index.js";
import checker from "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/node_modules/vite-plugin-checker/dist/esm/main.js";

// build/plugins/rollup-plugin-postcss-lit-custom/rollup-plugin-postcss-lit.js
import { createFilter } from "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/node_modules/@rollup/pluginutils/dist/es/index.js";
import transformAst from "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/node_modules/transform-ast/index.js";
var assetUrlRE = /__VITE_ASSET__([a-z\d]{8})__(?:\$_(.*?)__)?/g;
var escape = (str) => str.replace(assetUrlRE, '${unsafeCSSTag("__VITE_ASSET__$1__$2")}').replace(/`/g, "\\`").replace(/\\(?!`)/g, "\\\\");
function postcssLit(options = {}) {
  const defaultOptions = {
    include: "**/*.{css,sss,pcss,styl,stylus,sass,scss,less}",
    exclude: null,
    importPackage: "lit"
  };
  const opts = { ...defaultOptions, ...options };
  const filter = createFilter(opts.include, opts.exclude);
  return {
    name: "postcss-lit",
    enforce: "post",
    transform(code, id) {
      if (!filter(id))
        return;
      const ast = this.parse(code, {});
      let defaultExportName;
      let isDeclarationLiteral = false;
      const magicString = transformAst(code, { ast }, (node) => {
        if (node.type === "ExportDefaultDeclaration") {
          defaultExportName = node.declaration.name;
          isDeclarationLiteral = node.declaration.type === "Literal";
        }
      });
      if (!defaultExportName && !isDeclarationLiteral) {
        return;
      }
      magicString.walk((node) => {
        if (defaultExportName && node.type === "VariableDeclaration") {
          const exportedVar = node.declarations.find((d) => d.id.name === defaultExportName);
          if (exportedVar) {
            exportedVar.init.edit.update(`cssTag\`${escape(exportedVar.init.value)}\``);
          }
        }
        if (isDeclarationLiteral && node.type === "ExportDefaultDeclaration") {
          node.declaration.edit.update(`cssTag\`${escape(node.declaration.value)}\``);
        }
      });
      magicString.prepend(`import {css as cssTag, unsafeCSS as unsafeCSSTag} from '${opts.importPackage}';
`);
      return {
        code: magicString.toString(),
        map: magicString.generateMap({
          hires: true
        })
      };
    }
  };
}

// vite.generated.ts
import { createRequire } from "module";
import { visualizer } from "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
var __vite_injected_original_dirname = "C:\\Users\\guilh.GUIPC\\JavaProjects\\clearContWebApp";
var __vite_injected_original_import_meta_url = "file:///C:/Users/guilh.GUIPC/JavaProjects/clearContWebApp/vite.generated.ts";
var require2 = createRequire(__vite_injected_original_import_meta_url);
var appShellUrl = ".";
var frontendFolder = path.resolve(__vite_injected_original_dirname, vaadin_dev_server_settings_default.frontendFolder);
var themeFolder = path.resolve(frontendFolder, vaadin_dev_server_settings_default.themeFolder);
var frontendBundleFolder = path.resolve(__vite_injected_original_dirname, vaadin_dev_server_settings_default.frontendBundleOutput);
var devBundleFolder = path.resolve(__vite_injected_original_dirname, vaadin_dev_server_settings_default.devBundleOutput);
var devBundle = !!process.env.devBundle;
var jarResourcesFolder = path.resolve(__vite_injected_original_dirname, vaadin_dev_server_settings_default.jarResourcesFolder);
var themeResourceFolder = path.resolve(__vite_injected_original_dirname, vaadin_dev_server_settings_default.themeResourceFolder);
var projectPackageJsonFile = path.resolve(__vite_injected_original_dirname, "package.json");
var buildOutputFolder = devBundle ? devBundleFolder : frontendBundleFolder;
var statsFolder = path.resolve(__vite_injected_original_dirname, devBundle ? vaadin_dev_server_settings_default.devBundleStatsOutput : vaadin_dev_server_settings_default.statsOutput);
var statsFile = path.resolve(statsFolder, "stats.json");
var bundleSizeFile = path.resolve(statsFolder, "bundle-size.html");
var nodeModulesFolder = path.resolve(__vite_injected_original_dirname, "node_modules");
var webComponentTags = "";
var projectIndexHtml = path.resolve(frontendFolder, "index.html");
var projectStaticAssetsFolders = [
  path.resolve(__vite_injected_original_dirname, "src", "main", "resources", "META-INF", "resources"),
  path.resolve(__vite_injected_original_dirname, "src", "main", "resources", "static"),
  frontendFolder
];
var themeProjectFolders = projectStaticAssetsFolders.map((folder) => path.resolve(folder, vaadin_dev_server_settings_default.themeFolder));
var themeOptions = {
  devMode: false,
  useDevBundle: devBundle,
  // The following matches folder 'frontend/generated/themes/'
  // (not 'frontend/themes') for theme in JAR that is copied there
  themeResourceFolder: path.resolve(themeResourceFolder, vaadin_dev_server_settings_default.themeFolder),
  themeProjectFolders,
  projectStaticAssetsOutputFolder: devBundle ? path.resolve(devBundleFolder, "../assets") : path.resolve(__vite_injected_original_dirname, vaadin_dev_server_settings_default.staticOutput),
  frontendGeneratedFolder: path.resolve(frontendFolder, vaadin_dev_server_settings_default.generatedFolder)
};
var hasExportedWebComponents = existsSync5(path.resolve(frontendFolder, "web-component.html"));
console.trace = () => {
};
console.debug = () => {
};
function injectManifestToSWPlugin() {
  const rewriteManifestIndexHtmlUrl = (manifest) => {
    const indexEntry = manifest.find((entry) => entry.url === "index.html");
    if (indexEntry) {
      indexEntry.url = appShellUrl;
    }
    return { manifest, warnings: [] };
  };
  return {
    name: "vaadin:inject-manifest-to-sw",
    async transform(code, id) {
      if (/sw\.(ts|js)$/.test(id)) {
        const { manifestEntries } = await getManifest({
          globDirectory: buildOutputFolder,
          globPatterns: ["**/*"],
          globIgnores: ["**/*.br"],
          manifestTransforms: [rewriteManifestIndexHtmlUrl],
          maximumFileSizeToCacheInBytes: 100 * 1024 * 1024
          // 100mb,
        });
        return code.replace("self.__WB_MANIFEST", JSON.stringify(manifestEntries));
      }
    }
  };
}
function buildSWPlugin(opts) {
  let config;
  const devMode = opts.devMode;
  const swObj = {};
  async function build(action, additionalPlugins = []) {
    const includedPluginNames = [
      "vite:esbuild",
      "rollup-plugin-dynamic-import-variables",
      "vite:esbuild-transpile",
      "vite:terser"
    ];
    const plugins = config.plugins.filter((p) => {
      return includedPluginNames.includes(p.name);
    });
    const resolver = config.createResolver();
    const resolvePlugin = {
      name: "resolver",
      resolveId(source, importer, _options) {
        return resolver(source, importer);
      }
    };
    plugins.unshift(resolvePlugin);
    plugins.push(
      replace({
        values: {
          "process.env.NODE_ENV": JSON.stringify(config.mode),
          ...config.define
        },
        preventAssignment: true
      })
    );
    if (additionalPlugins) {
      plugins.push(...additionalPlugins);
    }
    const bundle = await rollup.rollup({
      input: path.resolve(vaadin_dev_server_settings_default.clientServiceWorkerSource),
      plugins
    });
    try {
      return await bundle[action]({
        file: path.resolve(buildOutputFolder, "sw.js"),
        format: "es",
        exports: "none",
        sourcemap: config.command === "serve" || config.build.sourcemap,
        inlineDynamicImports: true
      });
    } finally {
      await bundle.close();
    }
  }
  return {
    name: "vaadin:build-sw",
    enforce: "post",
    async configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async buildStart() {
      if (devMode) {
        const { output } = await build("generate");
        swObj.code = output[0].code;
        swObj.map = output[0].map;
      }
    },
    async load(id) {
      if (id.endsWith("sw.js")) {
        return "";
      }
    },
    async transform(_code, id) {
      if (id.endsWith("sw.js")) {
        return swObj;
      }
    },
    async closeBundle() {
      if (!devMode) {
        await build("write", [injectManifestToSWPlugin(), brotli()]);
      }
    }
  };
}
function statsExtracterPlugin() {
  function collectThemeJsonsInFrontend(themeJsonContents, themeName) {
    const themeJson = path.resolve(frontendFolder, vaadin_dev_server_settings_default.themeFolder, themeName, "theme.json");
    if (existsSync5(themeJson)) {
      const themeJsonContent = readFileSync4(themeJson, { encoding: "utf-8" }).replace(/\r\n/g, "\n");
      themeJsonContents[themeName] = themeJsonContent;
      const themeJsonObject = JSON.parse(themeJsonContent);
      if (themeJsonObject.parent) {
        collectThemeJsonsInFrontend(themeJsonContents, themeJsonObject.parent);
      }
    }
  }
  return {
    name: "vaadin:stats",
    enforce: "post",
    async writeBundle(options, bundle) {
      var _a;
      const modules = Object.values(bundle).flatMap((b) => b.modules ? Object.keys(b.modules) : []);
      const nodeModulesFolders = modules.map((id) => id.replace(/\\/g, "/")).filter((id) => id.startsWith(nodeModulesFolder.replace(/\\/g, "/"))).map((id) => id.substring(nodeModulesFolder.length + 1));
      const npmModules = nodeModulesFolders.map((id) => id.replace(/\\/g, "/")).map((id) => {
        const parts = id.split("/");
        if (id.startsWith("@")) {
          return parts[0] + "/" + parts[1];
        } else {
          return parts[0];
        }
      }).sort().filter((value, index, self) => self.indexOf(value) === index);
      const npmModuleAndVersion = Object.fromEntries(npmModules.map((module) => [module, getVersion(module)]));
      const cvdls = Object.fromEntries(
        npmModules.filter((module) => getCvdlName(module) != null).map((module) => [module, { name: getCvdlName(module), version: getVersion(module) }])
      );
      mkdirSync2(path.dirname(statsFile), { recursive: true });
      const projectPackageJson = JSON.parse(readFileSync4(projectPackageJsonFile, { encoding: "utf-8" }));
      const entryScripts = Object.values(bundle).filter((bundle2) => bundle2.isEntry).map((bundle2) => bundle2.fileName);
      const generatedIndexHtml = path.resolve(buildOutputFolder, "index.html");
      const customIndexData = readFileSync4(projectIndexHtml, { encoding: "utf-8" });
      const generatedIndexData = readFileSync4(generatedIndexHtml, {
        encoding: "utf-8"
      });
      const customIndexRows = new Set(customIndexData.split(/[\r\n]/).filter((row) => row.trim() !== ""));
      const generatedIndexRows = generatedIndexData.split(/[\r\n]/).filter((row) => row.trim() !== "");
      const rowsGenerated = [];
      generatedIndexRows.forEach((row) => {
        if (!customIndexRows.has(row)) {
          rowsGenerated.push(row);
        }
      });
      const parseImports = (filename, result) => {
        const content = readFileSync4(filename, { encoding: "utf-8" });
        const lines = content.split("\n");
        const staticImports = lines.filter((line) => line.startsWith("import ")).map((line) => line.substring(line.indexOf("'") + 1, line.lastIndexOf("'"))).map((line) => line.includes("?") ? line.substring(0, line.lastIndexOf("?")) : line);
        const dynamicImports = lines.filter((line) => line.includes("import(")).map((line) => line.replace(/.*import\(/, "")).map((line) => line.split(/'/)[1]).map((line) => line.includes("?") ? line.substring(0, line.lastIndexOf("?")) : line);
        staticImports.forEach((staticImport) => result.add(staticImport));
        dynamicImports.map((dynamicImport) => {
          const importedFile = path.resolve(path.dirname(filename), dynamicImport);
          parseImports(importedFile, result);
        });
      };
      const generatedImportsSet = /* @__PURE__ */ new Set();
      parseImports(
        path.resolve(themeOptions.frontendGeneratedFolder, "flow", "generated-flow-imports.js"),
        generatedImportsSet
      );
      const generatedImports = Array.from(generatedImportsSet).sort();
      const frontendFiles = {};
      const projectFileExtensions = [".js", ".js.map", ".ts", ".ts.map", ".tsx", ".tsx.map", ".css", ".css.map"];
      modules.map((id) => id.replace(/\\/g, "/")).filter((id) => id.startsWith(frontendFolder.replace(/\\/g, "/"))).filter((id) => !id.startsWith(themeOptions.frontendGeneratedFolder.replace(/\\/g, "/"))).map((id) => id.substring(frontendFolder.length + 1)).map((line) => line.includes("?") ? line.substring(0, line.lastIndexOf("?")) : line).forEach((line) => {
        const filePath = path.resolve(frontendFolder, line);
        if (projectFileExtensions.includes(path.extname(filePath))) {
          const fileBuffer = readFileSync4(filePath, { encoding: "utf-8" }).replace(/\r\n/g, "\n");
          frontendFiles[line] = createHash("sha256").update(fileBuffer, "utf8").digest("hex");
        }
      });
      generatedImports.filter((line) => line.includes("generated/jar-resources")).forEach((line) => {
        let filename = line.substring(line.indexOf("generated"));
        const fileBuffer = readFileSync4(path.resolve(frontendFolder, filename), { encoding: "utf-8" }).replace(
          /\r\n/g,
          "\n"
        );
        const hash = createHash("sha256").update(fileBuffer, "utf8").digest("hex");
        const fileKey = line.substring(line.indexOf("jar-resources/") + 14);
        frontendFiles[fileKey] = hash;
      });
      if (existsSync5(path.resolve(frontendFolder, "index.ts"))) {
        const fileBuffer = readFileSync4(path.resolve(frontendFolder, "index.ts"), { encoding: "utf-8" }).replace(
          /\r\n/g,
          "\n"
        );
        frontendFiles[`index.ts`] = createHash("sha256").update(fileBuffer, "utf8").digest("hex");
      }
      const themeJsonContents = {};
      const themesFolder = path.resolve(jarResourcesFolder, "themes");
      if (existsSync5(themesFolder)) {
        readdirSync2(themesFolder).forEach((themeFolder2) => {
          const themeJson = path.resolve(themesFolder, themeFolder2, "theme.json");
          if (existsSync5(themeJson)) {
            themeJsonContents[path.basename(themeFolder2)] = readFileSync4(themeJson, { encoding: "utf-8" }).replace(
              /\r\n/g,
              "\n"
            );
          }
        });
      }
      collectThemeJsonsInFrontend(themeJsonContents, vaadin_dev_server_settings_default.themeName);
      let webComponents = [];
      if (webComponentTags) {
        webComponents = webComponentTags.split(";");
      }
      const stats = {
        packageJsonDependencies: projectPackageJson.dependencies,
        npmModules: npmModuleAndVersion,
        bundleImports: generatedImports,
        frontendHashes: frontendFiles,
        themeJsonContents,
        entryScripts,
        webComponents,
        cvdlModules: cvdls,
        packageJsonHash: (_a = projectPackageJson == null ? void 0 : projectPackageJson.vaadin) == null ? void 0 : _a.hash,
        indexHtmlGenerated: rowsGenerated
      };
      writeFileSync2(statsFile, JSON.stringify(stats, null, 1));
    }
  };
}
function vaadinBundlesPlugin() {
  const disabledMessage = "Vaadin component dependency bundles are disabled.";
  const modulesDirectory = nodeModulesFolder.replace(/\\/g, "/");
  let vaadinBundleJson;
  function parseModuleId(id) {
    const [scope, scopedPackageName] = id.split("/", 3);
    const packageName = scope.startsWith("@") ? `${scope}/${scopedPackageName}` : scope;
    const modulePath = `.${id.substring(packageName.length)}`;
    return {
      packageName,
      modulePath
    };
  }
  function getExports(id) {
    const { packageName, modulePath } = parseModuleId(id);
    const packageInfo = vaadinBundleJson.packages[packageName];
    if (!packageInfo)
      return;
    const exposeInfo = packageInfo.exposes[modulePath];
    if (!exposeInfo)
      return;
    const exportsSet = /* @__PURE__ */ new Set();
    for (const e of exposeInfo.exports) {
      if (typeof e === "string") {
        exportsSet.add(e);
      } else {
        const { namespace, source } = e;
        if (namespace) {
          exportsSet.add(namespace);
        } else {
          const sourceExports = getExports(source);
          if (sourceExports) {
            sourceExports.forEach((e2) => exportsSet.add(e2));
          }
        }
      }
    }
    return Array.from(exportsSet);
  }
  function getExportBinding(binding) {
    return binding === "default" ? "_default as default" : binding;
  }
  function getImportAssigment(binding) {
    return binding === "default" ? "default: _default" : binding;
  }
  return {
    name: "vaadin:bundles",
    enforce: "pre",
    apply(config, { command }) {
      if (command !== "serve")
        return false;
      try {
        const vaadinBundleJsonPath = require2.resolve("@vaadin/bundles/vaadin-bundle.json");
        vaadinBundleJson = JSON.parse(readFileSync4(vaadinBundleJsonPath, { encoding: "utf8" }));
      } catch (e) {
        if (typeof e === "object" && e.code === "MODULE_NOT_FOUND") {
          vaadinBundleJson = { packages: {} };
          console.info(`@vaadin/bundles npm package is not found, ${disabledMessage}`);
          return false;
        } else {
          throw e;
        }
      }
      const versionMismatches = [];
      for (const [name, packageInfo] of Object.entries(vaadinBundleJson.packages)) {
        let installedVersion = void 0;
        try {
          const { version: bundledVersion } = packageInfo;
          const installedPackageJsonFile = path.resolve(modulesDirectory, name, "package.json");
          const packageJson = JSON.parse(readFileSync4(installedPackageJsonFile, { encoding: "utf8" }));
          installedVersion = packageJson.version;
          if (installedVersion && installedVersion !== bundledVersion) {
            versionMismatches.push({
              name,
              bundledVersion,
              installedVersion
            });
          }
        } catch (_) {
        }
      }
      if (versionMismatches.length) {
        console.info(`@vaadin/bundles has version mismatches with installed packages, ${disabledMessage}`);
        console.info(`Packages with version mismatches: ${JSON.stringify(versionMismatches, void 0, 2)}`);
        vaadinBundleJson = { packages: {} };
        return false;
      }
      return true;
    },
    async config(config) {
      return mergeConfig(
        {
          optimizeDeps: {
            exclude: [
              // Vaadin bundle
              "@vaadin/bundles",
              ...Object.keys(vaadinBundleJson.packages),
              "@vaadin/vaadin-material-styles"
            ]
          }
        },
        config
      );
    },
    load(rawId) {
      const [path2, params] = rawId.split("?");
      if (!path2.startsWith(modulesDirectory))
        return;
      const id = path2.substring(modulesDirectory.length + 1);
      const bindings = getExports(id);
      if (bindings === void 0)
        return;
      const cacheSuffix = params ? `?${params}` : "";
      const bundlePath = `@vaadin/bundles/vaadin.js${cacheSuffix}`;
      return `import { init as VaadinBundleInit, get as VaadinBundleGet } from '${bundlePath}';
await VaadinBundleInit('default');
const { ${bindings.map(getImportAssigment).join(", ")} } = (await VaadinBundleGet('./node_modules/${id}'))();
export { ${bindings.map(getExportBinding).join(", ")} };`;
    }
  };
}
function themePlugin(opts) {
  const fullThemeOptions = { ...themeOptions, devMode: opts.devMode };
  return {
    name: "vaadin:theme",
    config() {
      processThemeResources(fullThemeOptions, console);
    },
    configureServer(server) {
      function handleThemeFileCreateDelete(themeFile, stats) {
        if (themeFile.startsWith(themeFolder)) {
          const changed = path.relative(themeFolder, themeFile);
          console.debug("Theme file " + (!!stats ? "created" : "deleted"), changed);
          processThemeResources(fullThemeOptions, console);
        }
      }
      server.watcher.on("add", handleThemeFileCreateDelete);
      server.watcher.on("unlink", handleThemeFileCreateDelete);
    },
    handleHotUpdate(context) {
      const contextPath = path.resolve(context.file);
      const themePath = path.resolve(themeFolder);
      if (contextPath.startsWith(themePath)) {
        const changed = path.relative(themePath, contextPath);
        console.debug("Theme file changed", changed);
        if (changed.startsWith(vaadin_dev_server_settings_default.themeName)) {
          processThemeResources(fullThemeOptions, console);
        }
      }
    },
    async resolveId(id, importer) {
      if (path.resolve(themeOptions.frontendGeneratedFolder, "theme.js") === importer && !existsSync5(path.resolve(themeOptions.frontendGeneratedFolder, id))) {
        console.debug("Generate theme file " + id + " not existing. Processing theme resource");
        processThemeResources(fullThemeOptions, console);
        return;
      }
      if (!id.startsWith(vaadin_dev_server_settings_default.themeFolder)) {
        return;
      }
      for (const location of [themeResourceFolder, frontendFolder]) {
        const result = await this.resolve(path.resolve(location, id));
        if (result) {
          return result;
        }
      }
    },
    async transform(raw, id, options) {
      const [bareId, query] = id.split("?");
      if (!(bareId == null ? void 0 : bareId.startsWith(themeFolder)) && !(bareId == null ? void 0 : bareId.startsWith(themeOptions.themeResourceFolder)) || !(bareId == null ? void 0 : bareId.endsWith(".css"))) {
        return;
      }
      const [themeName] = bareId.substring(themeFolder.length + 1).split("/");
      return rewriteCssUrls(raw, path.dirname(bareId), path.resolve(themeFolder, themeName), console, opts);
    }
  };
}
function runWatchDog(watchDogPort, watchDogHost) {
  const client = net.Socket();
  client.setEncoding("utf8");
  client.on("error", function(err) {
    console.log("Watchdog connection error. Terminating vite process...", err);
    client.destroy();
    process.exit(0);
  });
  client.on("close", function() {
    client.destroy();
    runWatchDog(watchDogPort, watchDogHost);
  });
  client.connect(watchDogPort, watchDogHost || "localhost");
}
var spaMiddlewareForceRemoved = false;
var allowedFrontendFolders = [frontendFolder, nodeModulesFolder];
function showRecompileReason() {
  return {
    name: "vaadin:why-you-compile",
    handleHotUpdate(context) {
      console.log("Recompiling because", context.file, "changed");
    }
  };
}
var DEV_MODE_START_REGEXP = /\/\*[\*!]\s+vaadin-dev-mode:start/;
var DEV_MODE_CODE_REGEXP = /\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i;
function preserveUsageStats() {
  return {
    name: "vaadin:preserve-usage-stats",
    transform(src, id) {
      if (id.includes("vaadin-usage-statistics")) {
        if (src.includes("vaadin-dev-mode:start")) {
          const newSrc = src.replace(DEV_MODE_START_REGEXP, "/*! vaadin-dev-mode:start");
          if (newSrc === src) {
            console.error("Comment replacement failed to change anything");
          } else if (!newSrc.match(DEV_MODE_CODE_REGEXP)) {
            console.error("New comment fails to match original regexp");
          } else {
            return { code: newSrc };
          }
        }
      }
      return { code: src };
    }
  };
}
var vaadinConfig = (env) => {
  const devMode = env.mode === "development";
  const productionMode = !devMode && !devBundle;
  if (devMode && process.env.watchDogPort) {
    runWatchDog(process.env.watchDogPort, process.env.watchDogHost);
  }
  return {
    root: frontendFolder,
    base: "",
    resolve: {
      alias: {
        "@vaadin/flow-frontend": jarResourcesFolder,
        Frontend: frontendFolder
      },
      preserveSymlinks: true
    },
    define: {
      OFFLINE_PATH: vaadin_dev_server_settings_default.offlinePath,
      VITE_ENABLED: "true"
    },
    server: {
      host: "127.0.0.1",
      strictPort: true,
      fs: {
        allow: allowedFrontendFolders
      }
    },
    build: {
      outDir: buildOutputFolder,
      emptyOutDir: devBundle,
      assetsDir: "VAADIN/build",
      rollupOptions: {
        input: {
          indexhtml: projectIndexHtml,
          ...hasExportedWebComponents ? { webcomponenthtml: path.resolve(frontendFolder, "web-component.html") } : {}
        },
        onwarn: (warning, defaultHandler) => {
          const ignoreEvalWarning = [
            "generated/jar-resources/FlowClient.js",
            "generated/jar-resources/vaadin-spreadsheet/spreadsheet-export.js",
            "@vaadin/charts/src/helpers.js"
          ];
          if (warning.code === "EVAL" && warning.id && !!ignoreEvalWarning.find((id) => warning.id.endsWith(id))) {
            return;
          }
          defaultHandler(warning);
        }
      }
    },
    optimizeDeps: {
      entries: [
        // Pre-scan entrypoints in Vite to avoid reloading on first open
        "generated/vaadin.ts"
      ],
      exclude: [
        "@vaadin/router",
        "@vaadin/vaadin-license-checker",
        "@vaadin/vaadin-usage-statistics",
        "workbox-core",
        "workbox-precaching",
        "workbox-routing",
        "workbox-strategies"
      ]
    },
    plugins: [
      productionMode && brotli(),
      devMode && vaadinBundlesPlugin(),
      devMode && showRecompileReason(),
      vaadin_dev_server_settings_default.offlineEnabled && buildSWPlugin({ devMode }),
      !devMode && statsExtracterPlugin(),
      devBundle && preserveUsageStats(),
      themePlugin({ devMode }),
      postcssLit({
        include: ["**/*.css", /.*\/.*\.css\?.*/],
        exclude: [
          `${themeFolder}/**/*.css`,
          new RegExp(`${themeFolder}/.*/.*\\.css\\?.*`),
          `${themeResourceFolder}/**/*.css`,
          new RegExp(`${themeResourceFolder}/.*/.*\\.css\\?.*`),
          new RegExp(".*/.*\\?html-proxy.*")
        ]
      }),
      {
        name: "vaadin:force-remove-html-middleware",
        transformIndexHtml: {
          enforce: "pre",
          transform(_html, { server }) {
            if (server && !spaMiddlewareForceRemoved) {
              server.middlewares.stack = server.middlewares.stack.filter((mw) => {
                const handleName = "" + mw.handle;
                return !handleName.includes("viteHtmlFallbackMiddleware");
              });
              spaMiddlewareForceRemoved = true;
            }
          }
        }
      },
      hasExportedWebComponents && {
        name: "vaadin:inject-entrypoints-to-web-component-html",
        transformIndexHtml: {
          enforce: "pre",
          transform(_html, { path: path2, server }) {
            if (path2 !== "/web-component.html") {
              return;
            }
            return [
              {
                tag: "script",
                attrs: { type: "module", src: `/generated/vaadin-web-component.ts` },
                injectTo: "head"
              }
            ];
          }
        }
      },
      {
        name: "vaadin:inject-entrypoints-to-index-html",
        transformIndexHtml: {
          enforce: "pre",
          transform(_html, { path: path2, server }) {
            if (path2 !== "/index.html") {
              return;
            }
            const scripts = [];
            if (devMode) {
              scripts.push({
                tag: "script",
                attrs: { type: "module", src: `/generated/vite-devmode.ts` },
                injectTo: "head"
              });
            }
            scripts.push({
              tag: "script",
              attrs: { type: "module", src: "/generated/vaadin.ts" },
              injectTo: "head"
            });
            return scripts;
          }
        }
      },
      checker({
        typescript: true
      }),
      productionMode && visualizer({ brotliSize: true, filename: bundleSizeFile })
    ]
  };
};
var overrideVaadinConfig = (customConfig2) => {
  return defineConfig((env) => mergeConfig(vaadinConfig(env), customConfig2(env)));
};
function getVersion(module) {
  const packageJson = path.resolve(nodeModulesFolder, module, "package.json");
  return JSON.parse(readFileSync4(packageJson, { encoding: "utf-8" })).version;
}
function getCvdlName(module) {
  const packageJson = path.resolve(nodeModulesFolder, module, "package.json");
  return JSON.parse(readFileSync4(packageJson, { encoding: "utf-8" })).cvdlName;
}

// vite.config.ts
var customConfig = (env) => ({
  // Here you can add custom Vite parameters
  // https://vitejs.dev/config/
});
var vite_config_default = overrideVaadinConfig(customConfig);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5nZW5lcmF0ZWQudHMiLCAiYnVpbGQvcGx1Z2lucy9hcHBsaWNhdGlvbi10aGVtZS1wbHVnaW4vdGhlbWUtaGFuZGxlLmpzIiwgImJ1aWxkL3BsdWdpbnMvYXBwbGljYXRpb24tdGhlbWUtcGx1Z2luL3RoZW1lLWdlbmVyYXRvci5qcyIsICJidWlsZC9wbHVnaW5zL2FwcGxpY2F0aW9uLXRoZW1lLXBsdWdpbi90aGVtZS1jb3B5LmpzIiwgImJ1aWxkL3BsdWdpbnMvdGhlbWUtbG9hZGVyL3RoZW1lLWxvYWRlci11dGlscy5qcyIsICJidWlsZC92YWFkaW4tZGV2LXNlcnZlci1zZXR0aW5ncy5qc29uIiwgImJ1aWxkL3BsdWdpbnMvcm9sbHVwLXBsdWdpbi1wb3N0Y3NzLWxpdC1jdXN0b20vcm9sbHVwLXBsdWdpbi1wb3N0Y3NzLWxpdC5qcyIsICJ2aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGd1aWxoLkdVSVBDXFxcXEphdmFQcm9qZWN0c1xcXFxjbGVhckNvbnRXZWJBcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGd1aWxoLkdVSVBDXFxcXEphdmFQcm9qZWN0c1xcXFxjbGVhckNvbnRXZWJBcHBcXFxcdml0ZS5nZW5lcmF0ZWQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2d1aWxoLkdVSVBDL0phdmFQcm9qZWN0cy9jbGVhckNvbnRXZWJBcHAvdml0ZS5nZW5lcmF0ZWQudHNcIjsvKipcbiAqIE5PVElDRTogdGhpcyBpcyBhbiBhdXRvLWdlbmVyYXRlZCBmaWxlXG4gKlxuICogVGhpcyBmaWxlIGhhcyBiZWVuIGdlbmVyYXRlZCBieSB0aGUgYGZsb3c6cHJlcGFyZS1mcm9udGVuZGAgbWF2ZW4gZ29hbC5cbiAqIFRoaXMgZmlsZSB3aWxsIGJlIG92ZXJ3cml0dGVuIG9uIGV2ZXJ5IHJ1bi4gQW55IGN1c3RvbSBjaGFuZ2VzIHNob3VsZCBiZSBtYWRlIHRvIHZpdGUuY29uZmlnLnRzXG4gKi9cbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZXhpc3RzU3luYywgbWtkaXJTeW5jLCByZWFkZGlyU3luYywgcmVhZEZpbGVTeW5jLCB3cml0ZUZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgKiBhcyBuZXQgZnJvbSAnbmV0JztcblxuaW1wb3J0IHsgcHJvY2Vzc1RoZW1lUmVzb3VyY2VzIH0gZnJvbSAnLi9idWlsZC9wbHVnaW5zL2FwcGxpY2F0aW9uLXRoZW1lLXBsdWdpbi90aGVtZS1oYW5kbGUuanMnO1xuaW1wb3J0IHsgcmV3cml0ZUNzc1VybHMgfSBmcm9tICcuL2J1aWxkL3BsdWdpbnMvdGhlbWUtbG9hZGVyL3RoZW1lLWxvYWRlci11dGlscy5qcyc7XG5pbXBvcnQgc2V0dGluZ3MgZnJvbSAnLi9idWlsZC92YWFkaW4tZGV2LXNlcnZlci1zZXR0aW5ncy5qc29uJztcbmltcG9ydCB7XG4gIEFzc2V0SW5mbyxcbiAgQ2h1bmtJbmZvLFxuICBkZWZpbmVDb25maWcsXG4gIG1lcmdlQ29uZmlnLFxuICBPdXRwdXRPcHRpb25zLFxuICBQbHVnaW5PcHRpb24sXG4gIFJlc29sdmVkQ29uZmlnLFxuICBVc2VyQ29uZmlnRm5cbn0gZnJvbSAndml0ZSc7XG5pbXBvcnQgeyBnZXRNYW5pZmVzdCB9IGZyb20gJ3dvcmtib3gtYnVpbGQnO1xuXG5pbXBvcnQgKiBhcyByb2xsdXAgZnJvbSAncm9sbHVwJztcbmltcG9ydCBicm90bGkgZnJvbSAncm9sbHVwLXBsdWdpbi1icm90bGknO1xuaW1wb3J0IHJlcGxhY2UgZnJvbSAnQHJvbGx1cC9wbHVnaW4tcmVwbGFjZSc7XG5pbXBvcnQgY2hlY2tlciBmcm9tICd2aXRlLXBsdWdpbi1jaGVja2VyJztcbmltcG9ydCBwb3N0Y3NzTGl0IGZyb20gJy4vYnVpbGQvcGx1Z2lucy9yb2xsdXAtcGx1Z2luLXBvc3Rjc3MtbGl0LWN1c3RvbS9yb2xsdXAtcGx1Z2luLXBvc3Rjc3MtbGl0LmpzJztcblxuaW1wb3J0IHsgY3JlYXRlUmVxdWlyZSB9IGZyb20gJ21vZHVsZSc7XG5cbmltcG9ydCB7IHZpc3VhbGl6ZXIgfSBmcm9tICdyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXInO1xuXG4vLyBNYWtlIGByZXF1aXJlYCBjb21wYXRpYmxlIHdpdGggRVMgbW9kdWxlc1xuY29uc3QgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3QgYXBwU2hlbGxVcmwgPSAnLic7XG5cbmNvbnN0IGZyb250ZW5kRm9sZGVyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgc2V0dGluZ3MuZnJvbnRlbmRGb2xkZXIpO1xuY29uc3QgdGhlbWVGb2xkZXIgPSBwYXRoLnJlc29sdmUoZnJvbnRlbmRGb2xkZXIsIHNldHRpbmdzLnRoZW1lRm9sZGVyKTtcbmNvbnN0IGZyb250ZW5kQnVuZGxlRm9sZGVyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgc2V0dGluZ3MuZnJvbnRlbmRCdW5kbGVPdXRwdXQpO1xuY29uc3QgZGV2QnVuZGxlRm9sZGVyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgc2V0dGluZ3MuZGV2QnVuZGxlT3V0cHV0KTtcbmNvbnN0IGRldkJ1bmRsZSA9ICEhcHJvY2Vzcy5lbnYuZGV2QnVuZGxlO1xuY29uc3QgamFyUmVzb3VyY2VzRm9sZGVyID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgc2V0dGluZ3MuamFyUmVzb3VyY2VzRm9sZGVyKTtcbmNvbnN0IHRoZW1lUmVzb3VyY2VGb2xkZXIgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBzZXR0aW5ncy50aGVtZVJlc291cmNlRm9sZGVyKTtcbmNvbnN0IHByb2plY3RQYWNrYWdlSnNvbkZpbGUgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAncGFja2FnZS5qc29uJyk7XG5cbmNvbnN0IGJ1aWxkT3V0cHV0Rm9sZGVyID0gZGV2QnVuZGxlID8gZGV2QnVuZGxlRm9sZGVyIDogZnJvbnRlbmRCdW5kbGVGb2xkZXI7XG5jb25zdCBzdGF0c0ZvbGRlciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGRldkJ1bmRsZSA/IHNldHRpbmdzLmRldkJ1bmRsZVN0YXRzT3V0cHV0IDogc2V0dGluZ3Muc3RhdHNPdXRwdXQpO1xuY29uc3Qgc3RhdHNGaWxlID0gcGF0aC5yZXNvbHZlKHN0YXRzRm9sZGVyLCAnc3RhdHMuanNvbicpO1xuY29uc3QgYnVuZGxlU2l6ZUZpbGUgPSBwYXRoLnJlc29sdmUoc3RhdHNGb2xkZXIsICdidW5kbGUtc2l6ZS5odG1sJyk7XG5jb25zdCBub2RlTW9kdWxlc0ZvbGRlciA9IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdub2RlX21vZHVsZXMnKTtcbmNvbnN0IHdlYkNvbXBvbmVudFRhZ3MgPSAnJztcblxuY29uc3QgcHJvamVjdEluZGV4SHRtbCA9IHBhdGgucmVzb2x2ZShmcm9udGVuZEZvbGRlciwgJ2luZGV4Lmh0bWwnKTtcblxuY29uc3QgcHJvamVjdFN0YXRpY0Fzc2V0c0ZvbGRlcnMgPSBbXG4gIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnLCAnbWFpbicsICdyZXNvdXJjZXMnLCAnTUVUQS1JTkYnLCAncmVzb3VyY2VzJyksXG4gIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnLCAnbWFpbicsICdyZXNvdXJjZXMnLCAnc3RhdGljJyksXG4gIGZyb250ZW5kRm9sZGVyXG5dO1xuXG4vLyBGb2xkZXJzIGluIHRoZSBwcm9qZWN0IHdoaWNoIGNhbiBjb250YWluIGFwcGxpY2F0aW9uIHRoZW1lc1xuY29uc3QgdGhlbWVQcm9qZWN0Rm9sZGVycyA9IHByb2plY3RTdGF0aWNBc3NldHNGb2xkZXJzLm1hcCgoZm9sZGVyKSA9PiBwYXRoLnJlc29sdmUoZm9sZGVyLCBzZXR0aW5ncy50aGVtZUZvbGRlcikpO1xuXG5jb25zdCB0aGVtZU9wdGlvbnMgPSB7XG4gIGRldk1vZGU6IGZhbHNlLFxuICB1c2VEZXZCdW5kbGU6IGRldkJ1bmRsZSxcbiAgLy8gVGhlIGZvbGxvd2luZyBtYXRjaGVzIGZvbGRlciAnZnJvbnRlbmQvZ2VuZXJhdGVkL3RoZW1lcy8nXG4gIC8vIChub3QgJ2Zyb250ZW5kL3RoZW1lcycpIGZvciB0aGVtZSBpbiBKQVIgdGhhdCBpcyBjb3BpZWQgdGhlcmVcbiAgdGhlbWVSZXNvdXJjZUZvbGRlcjogcGF0aC5yZXNvbHZlKHRoZW1lUmVzb3VyY2VGb2xkZXIsIHNldHRpbmdzLnRoZW1lRm9sZGVyKSxcbiAgdGhlbWVQcm9qZWN0Rm9sZGVyczogdGhlbWVQcm9qZWN0Rm9sZGVycyxcbiAgcHJvamVjdFN0YXRpY0Fzc2V0c091dHB1dEZvbGRlcjogZGV2QnVuZGxlXG4gICAgPyBwYXRoLnJlc29sdmUoZGV2QnVuZGxlRm9sZGVyLCAnLi4vYXNzZXRzJylcbiAgICA6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIHNldHRpbmdzLnN0YXRpY091dHB1dCksXG4gIGZyb250ZW5kR2VuZXJhdGVkRm9sZGVyOiBwYXRoLnJlc29sdmUoZnJvbnRlbmRGb2xkZXIsIHNldHRpbmdzLmdlbmVyYXRlZEZvbGRlcilcbn07XG5cbmNvbnN0IGhhc0V4cG9ydGVkV2ViQ29tcG9uZW50cyA9IGV4aXN0c1N5bmMocGF0aC5yZXNvbHZlKGZyb250ZW5kRm9sZGVyLCAnd2ViLWNvbXBvbmVudC5odG1sJykpO1xuXG4vLyBCbG9jayBkZWJ1ZyBhbmQgdHJhY2UgbG9ncy5cbmNvbnNvbGUudHJhY2UgPSAoKSA9PiB7fTtcbmNvbnNvbGUuZGVidWcgPSAoKSA9PiB7fTtcblxuZnVuY3Rpb24gaW5qZWN0TWFuaWZlc3RUb1NXUGx1Z2luKCk6IHJvbGx1cC5QbHVnaW4ge1xuICBjb25zdCByZXdyaXRlTWFuaWZlc3RJbmRleEh0bWxVcmwgPSAobWFuaWZlc3QpID0+IHtcbiAgICBjb25zdCBpbmRleEVudHJ5ID0gbWFuaWZlc3QuZmluZCgoZW50cnkpID0+IGVudHJ5LnVybCA9PT0gJ2luZGV4Lmh0bWwnKTtcbiAgICBpZiAoaW5kZXhFbnRyeSkge1xuICAgICAgaW5kZXhFbnRyeS51cmwgPSBhcHBTaGVsbFVybDtcbiAgICB9XG5cbiAgICByZXR1cm4geyBtYW5pZmVzdCwgd2FybmluZ3M6IFtdIH07XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndmFhZGluOmluamVjdC1tYW5pZmVzdC10by1zdycsXG4gICAgYXN5bmMgdHJhbnNmb3JtKGNvZGUsIGlkKSB7XG4gICAgICBpZiAoL3N3XFwuKHRzfGpzKSQvLnRlc3QoaWQpKSB7XG4gICAgICAgIGNvbnN0IHsgbWFuaWZlc3RFbnRyaWVzIH0gPSBhd2FpdCBnZXRNYW5pZmVzdCh7XG4gICAgICAgICAgZ2xvYkRpcmVjdG9yeTogYnVpbGRPdXRwdXRGb2xkZXIsXG4gICAgICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyonXSxcbiAgICAgICAgICBnbG9iSWdub3JlczogWycqKi8qLmJyJ10sXG4gICAgICAgICAgbWFuaWZlc3RUcmFuc2Zvcm1zOiBbcmV3cml0ZU1hbmlmZXN0SW5kZXhIdG1sVXJsXSxcbiAgICAgICAgICBtYXhpbXVtRmlsZVNpemVUb0NhY2hlSW5CeXRlczogMTAwICogMTAyNCAqIDEwMjQgLy8gMTAwbWIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjb2RlLnJlcGxhY2UoJ3NlbGYuX19XQl9NQU5JRkVTVCcsIEpTT04uc3RyaW5naWZ5KG1hbmlmZXN0RW50cmllcykpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gYnVpbGRTV1BsdWdpbihvcHRzKTogUGx1Z2luT3B0aW9uIHtcbiAgbGV0IGNvbmZpZzogUmVzb2x2ZWRDb25maWc7XG4gIGNvbnN0IGRldk1vZGUgPSBvcHRzLmRldk1vZGU7XG5cbiAgY29uc3Qgc3dPYmogPSB7fTtcblxuICBhc3luYyBmdW5jdGlvbiBidWlsZChhY3Rpb246ICdnZW5lcmF0ZScgfCAnd3JpdGUnLCBhZGRpdGlvbmFsUGx1Z2luczogcm9sbHVwLlBsdWdpbltdID0gW10pIHtcbiAgICBjb25zdCBpbmNsdWRlZFBsdWdpbk5hbWVzID0gW1xuICAgICAgJ3ZpdGU6ZXNidWlsZCcsXG4gICAgICAncm9sbHVwLXBsdWdpbi1keW5hbWljLWltcG9ydC12YXJpYWJsZXMnLFxuICAgICAgJ3ZpdGU6ZXNidWlsZC10cmFuc3BpbGUnLFxuICAgICAgJ3ZpdGU6dGVyc2VyJ1xuICAgIF07XG4gICAgY29uc3QgcGx1Z2luczogcm9sbHVwLlBsdWdpbltdID0gY29uZmlnLnBsdWdpbnMuZmlsdGVyKChwKSA9PiB7XG4gICAgICByZXR1cm4gaW5jbHVkZWRQbHVnaW5OYW1lcy5pbmNsdWRlcyhwLm5hbWUpO1xuICAgIH0pO1xuICAgIGNvbnN0IHJlc29sdmVyID0gY29uZmlnLmNyZWF0ZVJlc29sdmVyKCk7XG4gICAgY29uc3QgcmVzb2x2ZVBsdWdpbjogcm9sbHVwLlBsdWdpbiA9IHtcbiAgICAgIG5hbWU6ICdyZXNvbHZlcicsXG4gICAgICByZXNvbHZlSWQoc291cmNlLCBpbXBvcnRlciwgX29wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVyKHNvdXJjZSwgaW1wb3J0ZXIpO1xuICAgICAgfVxuICAgIH07XG4gICAgcGx1Z2lucy51bnNoaWZ0KHJlc29sdmVQbHVnaW4pOyAvLyBQdXQgcmVzb2x2ZSBmaXJzdFxuICAgIHBsdWdpbnMucHVzaChcbiAgICAgIHJlcGxhY2Uoe1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnOiBKU09OLnN0cmluZ2lmeShjb25maWcubW9kZSksXG4gICAgICAgICAgLi4uY29uZmlnLmRlZmluZVxuICAgICAgICB9LFxuICAgICAgICBwcmV2ZW50QXNzaWdubWVudDogdHJ1ZVxuICAgICAgfSlcbiAgICApO1xuICAgIGlmIChhZGRpdGlvbmFsUGx1Z2lucykge1xuICAgICAgcGx1Z2lucy5wdXNoKC4uLmFkZGl0aW9uYWxQbHVnaW5zKTtcbiAgICB9XG4gICAgY29uc3QgYnVuZGxlID0gYXdhaXQgcm9sbHVwLnJvbGx1cCh7XG4gICAgICBpbnB1dDogcGF0aC5yZXNvbHZlKHNldHRpbmdzLmNsaWVudFNlcnZpY2VXb3JrZXJTb3VyY2UpLFxuICAgICAgcGx1Z2luc1xuICAgIH0pO1xuXG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBhd2FpdCBidW5kbGVbYWN0aW9uXSh7XG4gICAgICAgIGZpbGU6IHBhdGgucmVzb2x2ZShidWlsZE91dHB1dEZvbGRlciwgJ3N3LmpzJyksXG4gICAgICAgIGZvcm1hdDogJ2VzJyxcbiAgICAgICAgZXhwb3J0czogJ25vbmUnLFxuICAgICAgICBzb3VyY2VtYXA6IGNvbmZpZy5jb21tYW5kID09PSAnc2VydmUnIHx8IGNvbmZpZy5idWlsZC5zb3VyY2VtYXAsXG4gICAgICAgIGlubGluZUR5bmFtaWNJbXBvcnRzOiB0cnVlXG4gICAgICB9KTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgYXdhaXQgYnVuZGxlLmNsb3NlKCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndmFhZGluOmJ1aWxkLXN3JyxcbiAgICBlbmZvcmNlOiAncG9zdCcsXG4gICAgYXN5bmMgY29uZmlnUmVzb2x2ZWQocmVzb2x2ZWRDb25maWcpIHtcbiAgICAgIGNvbmZpZyA9IHJlc29sdmVkQ29uZmlnO1xuICAgIH0sXG4gICAgYXN5bmMgYnVpbGRTdGFydCgpIHtcbiAgICAgIGlmIChkZXZNb2RlKSB7XG4gICAgICAgIGNvbnN0IHsgb3V0cHV0IH0gPSBhd2FpdCBidWlsZCgnZ2VuZXJhdGUnKTtcbiAgICAgICAgc3dPYmouY29kZSA9IG91dHB1dFswXS5jb2RlO1xuICAgICAgICBzd09iai5tYXAgPSBvdXRwdXRbMF0ubWFwO1xuICAgICAgfVxuICAgIH0sXG4gICAgYXN5bmMgbG9hZChpZCkge1xuICAgICAgaWYgKGlkLmVuZHNXaXRoKCdzdy5qcycpKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIHRyYW5zZm9ybShfY29kZSwgaWQpIHtcbiAgICAgIGlmIChpZC5lbmRzV2l0aCgnc3cuanMnKSkge1xuICAgICAgICByZXR1cm4gc3dPYmo7XG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBjbG9zZUJ1bmRsZSgpIHtcbiAgICAgIGlmICghZGV2TW9kZSkge1xuICAgICAgICBhd2FpdCBidWlsZCgnd3JpdGUnLCBbaW5qZWN0TWFuaWZlc3RUb1NXUGx1Z2luKCksIGJyb3RsaSgpXSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBzdGF0c0V4dHJhY3RlclBsdWdpbigpOiBQbHVnaW5PcHRpb24ge1xuICBmdW5jdGlvbiBjb2xsZWN0VGhlbWVKc29uc0luRnJvbnRlbmQodGhlbWVKc29uQ29udGVudHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4sIHRoZW1lTmFtZTogc3RyaW5nKSB7XG4gICAgY29uc3QgdGhlbWVKc29uID0gcGF0aC5yZXNvbHZlKGZyb250ZW5kRm9sZGVyLCBzZXR0aW5ncy50aGVtZUZvbGRlciwgdGhlbWVOYW1lLCAndGhlbWUuanNvbicpO1xuICAgIGlmIChleGlzdHNTeW5jKHRoZW1lSnNvbikpIHtcbiAgICAgIGNvbnN0IHRoZW1lSnNvbkNvbnRlbnQgPSByZWFkRmlsZVN5bmModGhlbWVKc29uLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pLnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJyk7XG4gICAgICB0aGVtZUpzb25Db250ZW50c1t0aGVtZU5hbWVdID0gdGhlbWVKc29uQ29udGVudDtcbiAgICAgIGNvbnN0IHRoZW1lSnNvbk9iamVjdCA9IEpTT04ucGFyc2UodGhlbWVKc29uQ29udGVudCk7XG4gICAgICBpZiAodGhlbWVKc29uT2JqZWN0LnBhcmVudCkge1xuICAgICAgICBjb2xsZWN0VGhlbWVKc29uc0luRnJvbnRlbmQodGhlbWVKc29uQ29udGVudHMsIHRoZW1lSnNvbk9iamVjdC5wYXJlbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3ZhYWRpbjpzdGF0cycsXG4gICAgZW5mb3JjZTogJ3Bvc3QnLFxuICAgIGFzeW5jIHdyaXRlQnVuZGxlKG9wdGlvbnM6IE91dHB1dE9wdGlvbnMsIGJ1bmRsZTogeyBbZmlsZU5hbWU6IHN0cmluZ106IEFzc2V0SW5mbyB8IENodW5rSW5mbyB9KSB7XG4gICAgICBjb25zdCBtb2R1bGVzID0gT2JqZWN0LnZhbHVlcyhidW5kbGUpLmZsYXRNYXAoKGIpID0+IChiLm1vZHVsZXMgPyBPYmplY3Qua2V5cyhiLm1vZHVsZXMpIDogW10pKTtcbiAgICAgIGNvbnN0IG5vZGVNb2R1bGVzRm9sZGVycyA9IG1vZHVsZXNcbiAgICAgICAgLm1hcCgoaWQpID0+IGlkLnJlcGxhY2UoL1xcXFwvZywgJy8nKSlcbiAgICAgICAgLmZpbHRlcigoaWQpID0+IGlkLnN0YXJ0c1dpdGgobm9kZU1vZHVsZXNGb2xkZXIucmVwbGFjZSgvXFxcXC9nLCAnLycpKSlcbiAgICAgICAgLm1hcCgoaWQpID0+IGlkLnN1YnN0cmluZyhub2RlTW9kdWxlc0ZvbGRlci5sZW5ndGggKyAxKSk7XG4gICAgICBjb25zdCBucG1Nb2R1bGVzID0gbm9kZU1vZHVsZXNGb2xkZXJzXG4gICAgICAgIC5tYXAoKGlkKSA9PiBpZC5yZXBsYWNlKC9cXFxcL2csICcvJykpXG4gICAgICAgIC5tYXAoKGlkKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGFydHMgPSBpZC5zcGxpdCgnLycpO1xuICAgICAgICAgIGlmIChpZC5zdGFydHNXaXRoKCdAJykpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJ0c1swXSArICcvJyArIHBhcnRzWzFdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcGFydHNbMF07XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc29ydCgpXG4gICAgICAgIC5maWx0ZXIoKHZhbHVlLCBpbmRleCwgc2VsZikgPT4gc2VsZi5pbmRleE9mKHZhbHVlKSA9PT0gaW5kZXgpO1xuICAgICAgY29uc3QgbnBtTW9kdWxlQW5kVmVyc2lvbiA9IE9iamVjdC5mcm9tRW50cmllcyhucG1Nb2R1bGVzLm1hcCgobW9kdWxlKSA9PiBbbW9kdWxlLCBnZXRWZXJzaW9uKG1vZHVsZSldKSk7XG4gICAgICBjb25zdCBjdmRscyA9IE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgICAgbnBtTW9kdWxlc1xuICAgICAgICAgIC5maWx0ZXIoKG1vZHVsZSkgPT4gZ2V0Q3ZkbE5hbWUobW9kdWxlKSAhPSBudWxsKVxuICAgICAgICAgIC5tYXAoKG1vZHVsZSkgPT4gW21vZHVsZSwgeyBuYW1lOiBnZXRDdmRsTmFtZShtb2R1bGUpLCB2ZXJzaW9uOiBnZXRWZXJzaW9uKG1vZHVsZSkgfV0pXG4gICAgICApO1xuXG4gICAgICBta2RpclN5bmMocGF0aC5kaXJuYW1lKHN0YXRzRmlsZSksIHsgcmVjdXJzaXZlOiB0cnVlIH0pO1xuICAgICAgY29uc3QgcHJvamVjdFBhY2thZ2VKc29uID0gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMocHJvamVjdFBhY2thZ2VKc29uRmlsZSwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KSk7XG5cbiAgICAgIGNvbnN0IGVudHJ5U2NyaXB0cyA9IE9iamVjdC52YWx1ZXMoYnVuZGxlKVxuICAgICAgICAuZmlsdGVyKChidW5kbGUpID0+IGJ1bmRsZS5pc0VudHJ5KVxuICAgICAgICAubWFwKChidW5kbGUpID0+IGJ1bmRsZS5maWxlTmFtZSk7XG5cbiAgICAgIGNvbnN0IGdlbmVyYXRlZEluZGV4SHRtbCA9IHBhdGgucmVzb2x2ZShidWlsZE91dHB1dEZvbGRlciwgJ2luZGV4Lmh0bWwnKTtcbiAgICAgIGNvbnN0IGN1c3RvbUluZGV4RGF0YTogc3RyaW5nID0gcmVhZEZpbGVTeW5jKHByb2plY3RJbmRleEh0bWwsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSk7XG4gICAgICBjb25zdCBnZW5lcmF0ZWRJbmRleERhdGE6IHN0cmluZyA9IHJlYWRGaWxlU3luYyhnZW5lcmF0ZWRJbmRleEh0bWwsIHtcbiAgICAgICAgZW5jb2Rpbmc6ICd1dGYtOCdcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjdXN0b21JbmRleFJvd3MgPSBuZXcgU2V0KGN1c3RvbUluZGV4RGF0YS5zcGxpdCgvW1xcclxcbl0vKS5maWx0ZXIoKHJvdykgPT4gcm93LnRyaW0oKSAhPT0gJycpKTtcbiAgICAgIGNvbnN0IGdlbmVyYXRlZEluZGV4Um93cyA9IGdlbmVyYXRlZEluZGV4RGF0YS5zcGxpdCgvW1xcclxcbl0vKS5maWx0ZXIoKHJvdykgPT4gcm93LnRyaW0oKSAhPT0gJycpO1xuXG4gICAgICBjb25zdCByb3dzR2VuZXJhdGVkOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgZ2VuZXJhdGVkSW5kZXhSb3dzLmZvckVhY2goKHJvdykgPT4ge1xuICAgICAgICBpZiAoIWN1c3RvbUluZGV4Um93cy5oYXMocm93KSkge1xuICAgICAgICAgIHJvd3NHZW5lcmF0ZWQucHVzaChyb3cpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy9BZnRlciBkZXYtYnVuZGxlIGJ1aWxkIGFkZCB1c2VkIEZsb3cgZnJvbnRlbmQgaW1wb3J0cyBKc01vZHVsZS9KYXZhU2NyaXB0L0Nzc0ltcG9ydFxuXG4gICAgICBjb25zdCBwYXJzZUltcG9ydHMgPSAoZmlsZW5hbWU6IHN0cmluZywgcmVzdWx0OiBTZXQ8c3RyaW5nPik6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBjb250ZW50OiBzdHJpbmcgPSByZWFkRmlsZVN5bmMoZmlsZW5hbWUsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSk7XG4gICAgICAgIGNvbnN0IGxpbmVzID0gY29udGVudC5zcGxpdCgnXFxuJyk7XG4gICAgICAgIGNvbnN0IHN0YXRpY0ltcG9ydHMgPSBsaW5lc1xuICAgICAgICAgIC5maWx0ZXIoKGxpbmUpID0+IGxpbmUuc3RhcnRzV2l0aCgnaW1wb3J0ICcpKVxuICAgICAgICAgIC5tYXAoKGxpbmUpID0+IGxpbmUuc3Vic3RyaW5nKGxpbmUuaW5kZXhPZihcIidcIikgKyAxLCBsaW5lLmxhc3RJbmRleE9mKFwiJ1wiKSkpXG4gICAgICAgICAgLm1hcCgobGluZSkgPT4gKGxpbmUuaW5jbHVkZXMoJz8nKSA/IGxpbmUuc3Vic3RyaW5nKDAsIGxpbmUubGFzdEluZGV4T2YoJz8nKSkgOiBsaW5lKSk7XG4gICAgICAgIGNvbnN0IGR5bmFtaWNJbXBvcnRzID0gbGluZXNcbiAgICAgICAgICAuZmlsdGVyKChsaW5lKSA9PiBsaW5lLmluY2x1ZGVzKCdpbXBvcnQoJykpXG4gICAgICAgICAgLm1hcCgobGluZSkgPT4gbGluZS5yZXBsYWNlKC8uKmltcG9ydFxcKC8sICcnKSlcbiAgICAgICAgICAubWFwKChsaW5lKSA9PiBsaW5lLnNwbGl0KC8nLylbMV0pXG4gICAgICAgICAgLm1hcCgobGluZSkgPT4gKGxpbmUuaW5jbHVkZXMoJz8nKSA/IGxpbmUuc3Vic3RyaW5nKDAsIGxpbmUubGFzdEluZGV4T2YoJz8nKSkgOiBsaW5lKSk7XG5cbiAgICAgICAgc3RhdGljSW1wb3J0cy5mb3JFYWNoKChzdGF0aWNJbXBvcnQpID0+IHJlc3VsdC5hZGQoc3RhdGljSW1wb3J0KSk7XG5cbiAgICAgICAgZHluYW1pY0ltcG9ydHMubWFwKChkeW5hbWljSW1wb3J0KSA9PiB7XG4gICAgICAgICAgY29uc3QgaW1wb3J0ZWRGaWxlID0gcGF0aC5yZXNvbHZlKHBhdGguZGlybmFtZShmaWxlbmFtZSksIGR5bmFtaWNJbXBvcnQpO1xuICAgICAgICAgIHBhcnNlSW1wb3J0cyhpbXBvcnRlZEZpbGUsIHJlc3VsdCk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgZ2VuZXJhdGVkSW1wb3J0c1NldCA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgICAgcGFyc2VJbXBvcnRzKFxuICAgICAgICBwYXRoLnJlc29sdmUodGhlbWVPcHRpb25zLmZyb250ZW5kR2VuZXJhdGVkRm9sZGVyLCAnZmxvdycsICdnZW5lcmF0ZWQtZmxvdy1pbXBvcnRzLmpzJyksXG4gICAgICAgIGdlbmVyYXRlZEltcG9ydHNTZXRcbiAgICAgICk7XG4gICAgICBjb25zdCBnZW5lcmF0ZWRJbXBvcnRzID0gQXJyYXkuZnJvbShnZW5lcmF0ZWRJbXBvcnRzU2V0KS5zb3J0KCk7XG5cbiAgICAgIGNvbnN0IGZyb250ZW5kRmlsZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcblxuICAgICAgY29uc3QgcHJvamVjdEZpbGVFeHRlbnNpb25zID0gWycuanMnLCAnLmpzLm1hcCcsICcudHMnLCAnLnRzLm1hcCcsICcudHN4JywgJy50c3gubWFwJywgJy5jc3MnLCAnLmNzcy5tYXAnXTtcblxuICAgICAgLy8gY29sbGVjdHMgcHJvamVjdCdzIGZyb250ZW5kIHJlc291cmNlcyBpbiBmcm9udGVuZCBmb2xkZXIsIGV4Y2x1ZGluZ1xuICAgICAgLy8gJ2dlbmVyYXRlZCcgc3ViLWZvbGRlclxuICAgICAgbW9kdWxlc1xuICAgICAgICAubWFwKChpZCkgPT4gaWQucmVwbGFjZSgvXFxcXC9nLCAnLycpKVxuICAgICAgICAuZmlsdGVyKChpZCkgPT4gaWQuc3RhcnRzV2l0aChmcm9udGVuZEZvbGRlci5yZXBsYWNlKC9cXFxcL2csICcvJykpKVxuICAgICAgICAuZmlsdGVyKChpZCkgPT4gIWlkLnN0YXJ0c1dpdGgodGhlbWVPcHRpb25zLmZyb250ZW5kR2VuZXJhdGVkRm9sZGVyLnJlcGxhY2UoL1xcXFwvZywgJy8nKSkpXG4gICAgICAgIC5tYXAoKGlkKSA9PiBpZC5zdWJzdHJpbmcoZnJvbnRlbmRGb2xkZXIubGVuZ3RoICsgMSkpXG4gICAgICAgIC5tYXAoKGxpbmU6IHN0cmluZykgPT4gKGxpbmUuaW5jbHVkZXMoJz8nKSA/IGxpbmUuc3Vic3RyaW5nKDAsIGxpbmUubGFzdEluZGV4T2YoJz8nKSkgOiBsaW5lKSlcbiAgICAgICAgLmZvckVhY2goKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIC8vIFxcclxcbiBmcm9tIHdpbmRvd3MgbWFkZSBmaWxlcyBtYXkgYmUgdXNlZCBzbyBjaGFuZ2UgdG8gXFxuXG4gICAgICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLnJlc29sdmUoZnJvbnRlbmRGb2xkZXIsIGxpbmUpO1xuICAgICAgICAgIGlmIChwcm9qZWN0RmlsZUV4dGVuc2lvbnMuaW5jbHVkZXMocGF0aC5leHRuYW1lKGZpbGVQYXRoKSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpbGVCdWZmZXIgPSByZWFkRmlsZVN5bmMoZmlsZVBhdGgsIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKTtcbiAgICAgICAgICAgIGZyb250ZW5kRmlsZXNbbGluZV0gPSBjcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUoZmlsZUJ1ZmZlciwgJ3V0ZjgnKS5kaWdlc3QoJ2hleCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIC8vIGNvbGxlY3RzIGZyb250ZW5kIHJlc291cmNlcyBmcm9tIHRoZSBKQVJzXG4gICAgICBnZW5lcmF0ZWRJbXBvcnRzXG4gICAgICAgIC5maWx0ZXIoKGxpbmU6IHN0cmluZykgPT4gbGluZS5pbmNsdWRlcygnZ2VuZXJhdGVkL2phci1yZXNvdXJjZXMnKSlcbiAgICAgICAgLmZvckVhY2goKGxpbmU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGxldCBmaWxlbmFtZSA9IGxpbmUuc3Vic3RyaW5nKGxpbmUuaW5kZXhPZignZ2VuZXJhdGVkJykpO1xuICAgICAgICAgIC8vIFxcclxcbiBmcm9tIHdpbmRvd3MgbWFkZSBmaWxlcyBtYXkgYmUgdXNlZCBybyByZW1vdmUgdG8gYmUgb25seSBcXG5cbiAgICAgICAgICBjb25zdCBmaWxlQnVmZmVyID0gcmVhZEZpbGVTeW5jKHBhdGgucmVzb2x2ZShmcm9udGVuZEZvbGRlciwgZmlsZW5hbWUpLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pLnJlcGxhY2UoXG4gICAgICAgICAgICAvXFxyXFxuL2csXG4gICAgICAgICAgICAnXFxuJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgaGFzaCA9IGNyZWF0ZUhhc2goJ3NoYTI1NicpLnVwZGF0ZShmaWxlQnVmZmVyLCAndXRmOCcpLmRpZ2VzdCgnaGV4Jyk7XG5cbiAgICAgICAgICBjb25zdCBmaWxlS2V5ID0gbGluZS5zdWJzdHJpbmcobGluZS5pbmRleE9mKCdqYXItcmVzb3VyY2VzLycpICsgMTQpO1xuICAgICAgICAgIGZyb250ZW5kRmlsZXNbZmlsZUtleV0gPSBoYXNoO1xuICAgICAgICB9KTtcbiAgICAgIC8vIElmIGEgaW5kZXgudHMgZXhpc3RzIGhhc2ggaXQgdG8gYmUgYWJsZSB0byBzZWUgaWYgaXQgY2hhbmdlcy5cbiAgICAgIGlmIChleGlzdHNTeW5jKHBhdGgucmVzb2x2ZShmcm9udGVuZEZvbGRlciwgJ2luZGV4LnRzJykpKSB7XG4gICAgICAgIGNvbnN0IGZpbGVCdWZmZXIgPSByZWFkRmlsZVN5bmMocGF0aC5yZXNvbHZlKGZyb250ZW5kRm9sZGVyLCAnaW5kZXgudHMnKSwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KS5yZXBsYWNlKFxuICAgICAgICAgIC9cXHJcXG4vZyxcbiAgICAgICAgICAnXFxuJ1xuICAgICAgICApO1xuICAgICAgICBmcm9udGVuZEZpbGVzW2BpbmRleC50c2BdID0gY3JlYXRlSGFzaCgnc2hhMjU2JykudXBkYXRlKGZpbGVCdWZmZXIsICd1dGY4JykuZGlnZXN0KCdoZXgnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGhlbWVKc29uQ29udGVudHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcbiAgICAgIGNvbnN0IHRoZW1lc0ZvbGRlciA9IHBhdGgucmVzb2x2ZShqYXJSZXNvdXJjZXNGb2xkZXIsICd0aGVtZXMnKTtcbiAgICAgIGlmIChleGlzdHNTeW5jKHRoZW1lc0ZvbGRlcikpIHtcbiAgICAgICAgcmVhZGRpclN5bmModGhlbWVzRm9sZGVyKS5mb3JFYWNoKCh0aGVtZUZvbGRlcikgPT4ge1xuICAgICAgICAgIGNvbnN0IHRoZW1lSnNvbiA9IHBhdGgucmVzb2x2ZSh0aGVtZXNGb2xkZXIsIHRoZW1lRm9sZGVyLCAndGhlbWUuanNvbicpO1xuICAgICAgICAgIGlmIChleGlzdHNTeW5jKHRoZW1lSnNvbikpIHtcbiAgICAgICAgICAgIHRoZW1lSnNvbkNvbnRlbnRzW3BhdGguYmFzZW5hbWUodGhlbWVGb2xkZXIpXSA9IHJlYWRGaWxlU3luYyh0aGVtZUpzb24sIHsgZW5jb2Rpbmc6ICd1dGYtOCcgfSkucmVwbGFjZShcbiAgICAgICAgICAgICAgL1xcclxcbi9nLFxuICAgICAgICAgICAgICAnXFxuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb2xsZWN0VGhlbWVKc29uc0luRnJvbnRlbmQodGhlbWVKc29uQ29udGVudHMsIHNldHRpbmdzLnRoZW1lTmFtZSk7XG5cbiAgICAgIGxldCB3ZWJDb21wb25lbnRzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgaWYgKHdlYkNvbXBvbmVudFRhZ3MpIHtcbiAgICAgICAgd2ViQ29tcG9uZW50cyA9IHdlYkNvbXBvbmVudFRhZ3Muc3BsaXQoJzsnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc3RhdHMgPSB7XG4gICAgICAgIHBhY2thZ2VKc29uRGVwZW5kZW5jaWVzOiBwcm9qZWN0UGFja2FnZUpzb24uZGVwZW5kZW5jaWVzLFxuICAgICAgICBucG1Nb2R1bGVzOiBucG1Nb2R1bGVBbmRWZXJzaW9uLFxuICAgICAgICBidW5kbGVJbXBvcnRzOiBnZW5lcmF0ZWRJbXBvcnRzLFxuICAgICAgICBmcm9udGVuZEhhc2hlczogZnJvbnRlbmRGaWxlcyxcbiAgICAgICAgdGhlbWVKc29uQ29udGVudHM6IHRoZW1lSnNvbkNvbnRlbnRzLFxuICAgICAgICBlbnRyeVNjcmlwdHMsXG4gICAgICAgIHdlYkNvbXBvbmVudHMsXG4gICAgICAgIGN2ZGxNb2R1bGVzOiBjdmRscyxcbiAgICAgICAgcGFja2FnZUpzb25IYXNoOiBwcm9qZWN0UGFja2FnZUpzb24/LnZhYWRpbj8uaGFzaCxcbiAgICAgICAgaW5kZXhIdG1sR2VuZXJhdGVkOiByb3dzR2VuZXJhdGVkXG4gICAgICB9O1xuICAgICAgd3JpdGVGaWxlU3luYyhzdGF0c0ZpbGUsIEpTT04uc3RyaW5naWZ5KHN0YXRzLCBudWxsLCAxKSk7XG4gICAgfVxuICB9O1xufVxuZnVuY3Rpb24gdmFhZGluQnVuZGxlc1BsdWdpbigpOiBQbHVnaW5PcHRpb24ge1xuICB0eXBlIEV4cG9ydEluZm8gPVxuICAgIHwgc3RyaW5nXG4gICAgfCB7XG4gICAgICAgIG5hbWVzcGFjZT86IHN0cmluZztcbiAgICAgICAgc291cmNlOiBzdHJpbmc7XG4gICAgICB9O1xuXG4gIHR5cGUgRXhwb3NlSW5mbyA9IHtcbiAgICBleHBvcnRzOiBFeHBvcnRJbmZvW107XG4gIH07XG5cbiAgdHlwZSBQYWNrYWdlSW5mbyA9IHtcbiAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgZXhwb3NlczogUmVjb3JkPHN0cmluZywgRXhwb3NlSW5mbz47XG4gIH07XG5cbiAgdHlwZSBCdW5kbGVKc29uID0ge1xuICAgIHBhY2thZ2VzOiBSZWNvcmQ8c3RyaW5nLCBQYWNrYWdlSW5mbz47XG4gIH07XG5cbiAgY29uc3QgZGlzYWJsZWRNZXNzYWdlID0gJ1ZhYWRpbiBjb21wb25lbnQgZGVwZW5kZW5jeSBidW5kbGVzIGFyZSBkaXNhYmxlZC4nO1xuXG4gIGNvbnN0IG1vZHVsZXNEaXJlY3RvcnkgPSBub2RlTW9kdWxlc0ZvbGRlci5yZXBsYWNlKC9cXFxcL2csICcvJyk7XG5cbiAgbGV0IHZhYWRpbkJ1bmRsZUpzb246IEJ1bmRsZUpzb247XG5cbiAgZnVuY3Rpb24gcGFyc2VNb2R1bGVJZChpZDogc3RyaW5nKTogeyBwYWNrYWdlTmFtZTogc3RyaW5nOyBtb2R1bGVQYXRoOiBzdHJpbmcgfSB7XG4gICAgY29uc3QgW3Njb3BlLCBzY29wZWRQYWNrYWdlTmFtZV0gPSBpZC5zcGxpdCgnLycsIDMpO1xuICAgIGNvbnN0IHBhY2thZ2VOYW1lID0gc2NvcGUuc3RhcnRzV2l0aCgnQCcpID8gYCR7c2NvcGV9LyR7c2NvcGVkUGFja2FnZU5hbWV9YCA6IHNjb3BlO1xuICAgIGNvbnN0IG1vZHVsZVBhdGggPSBgLiR7aWQuc3Vic3RyaW5nKHBhY2thZ2VOYW1lLmxlbmd0aCl9YDtcbiAgICByZXR1cm4ge1xuICAgICAgcGFja2FnZU5hbWUsXG4gICAgICBtb2R1bGVQYXRoXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEV4cG9ydHMoaWQ6IHN0cmluZyk6IHN0cmluZ1tdIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCB7IHBhY2thZ2VOYW1lLCBtb2R1bGVQYXRoIH0gPSBwYXJzZU1vZHVsZUlkKGlkKTtcbiAgICBjb25zdCBwYWNrYWdlSW5mbyA9IHZhYWRpbkJ1bmRsZUpzb24ucGFja2FnZXNbcGFja2FnZU5hbWVdO1xuXG4gICAgaWYgKCFwYWNrYWdlSW5mbykgcmV0dXJuO1xuXG4gICAgY29uc3QgZXhwb3NlSW5mbzogRXhwb3NlSW5mbyA9IHBhY2thZ2VJbmZvLmV4cG9zZXNbbW9kdWxlUGF0aF07XG4gICAgaWYgKCFleHBvc2VJbmZvKSByZXR1cm47XG5cbiAgICBjb25zdCBleHBvcnRzU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgZm9yIChjb25zdCBlIG9mIGV4cG9zZUluZm8uZXhwb3J0cykge1xuICAgICAgaWYgKHR5cGVvZiBlID09PSAnc3RyaW5nJykge1xuICAgICAgICBleHBvcnRzU2V0LmFkZChlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHsgbmFtZXNwYWNlLCBzb3VyY2UgfSA9IGU7XG4gICAgICAgIGlmIChuYW1lc3BhY2UpIHtcbiAgICAgICAgICBleHBvcnRzU2V0LmFkZChuYW1lc3BhY2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHNvdXJjZUV4cG9ydHMgPSBnZXRFeHBvcnRzKHNvdXJjZSk7XG4gICAgICAgICAgaWYgKHNvdXJjZUV4cG9ydHMpIHtcbiAgICAgICAgICAgIHNvdXJjZUV4cG9ydHMuZm9yRWFjaCgoZSkgPT4gZXhwb3J0c1NldC5hZGQoZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuZnJvbShleHBvcnRzU2V0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEV4cG9ydEJpbmRpbmcoYmluZGluZzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGJpbmRpbmcgPT09ICdkZWZhdWx0JyA/ICdfZGVmYXVsdCBhcyBkZWZhdWx0JyA6IGJpbmRpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbXBvcnRBc3NpZ21lbnQoYmluZGluZzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGJpbmRpbmcgPT09ICdkZWZhdWx0JyA/ICdkZWZhdWx0OiBfZGVmYXVsdCcgOiBiaW5kaW5nO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndmFhZGluOmJ1bmRsZXMnLFxuICAgIGVuZm9yY2U6ICdwcmUnLFxuICAgIGFwcGx5KGNvbmZpZywgeyBjb21tYW5kIH0pIHtcbiAgICAgIGlmIChjb21tYW5kICE9PSAnc2VydmUnKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHZhYWRpbkJ1bmRsZUpzb25QYXRoID0gcmVxdWlyZS5yZXNvbHZlKCdAdmFhZGluL2J1bmRsZXMvdmFhZGluLWJ1bmRsZS5qc29uJyk7XG4gICAgICAgIHZhYWRpbkJ1bmRsZUpzb24gPSBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyh2YWFkaW5CdW5kbGVKc29uUGF0aCwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pKTtcbiAgICAgIH0gY2F0Y2ggKGU6IHVua25vd24pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlID09PSAnb2JqZWN0JyAmJiAoZSBhcyB7IGNvZGU6IHN0cmluZyB9KS5jb2RlID09PSAnTU9EVUxFX05PVF9GT1VORCcpIHtcbiAgICAgICAgICB2YWFkaW5CdW5kbGVKc29uID0geyBwYWNrYWdlczoge30gfTtcbiAgICAgICAgICBjb25zb2xlLmluZm8oYEB2YWFkaW4vYnVuZGxlcyBucG0gcGFja2FnZSBpcyBub3QgZm91bmQsICR7ZGlzYWJsZWRNZXNzYWdlfWApO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZlcnNpb25NaXNtYXRjaGVzOiBBcnJheTx7IG5hbWU6IHN0cmluZzsgYnVuZGxlZFZlcnNpb246IHN0cmluZzsgaW5zdGFsbGVkVmVyc2lvbjogc3RyaW5nIH0+ID0gW107XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCBwYWNrYWdlSW5mb10gb2YgT2JqZWN0LmVudHJpZXModmFhZGluQnVuZGxlSnNvbi5wYWNrYWdlcykpIHtcbiAgICAgICAgbGV0IGluc3RhbGxlZFZlcnNpb246IHN0cmluZyB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB7IHZlcnNpb246IGJ1bmRsZWRWZXJzaW9uIH0gPSBwYWNrYWdlSW5mbztcbiAgICAgICAgICBjb25zdCBpbnN0YWxsZWRQYWNrYWdlSnNvbkZpbGUgPSBwYXRoLnJlc29sdmUobW9kdWxlc0RpcmVjdG9yeSwgbmFtZSwgJ3BhY2thZ2UuanNvbicpO1xuICAgICAgICAgIGNvbnN0IHBhY2thZ2VKc29uID0gSlNPTi5wYXJzZShyZWFkRmlsZVN5bmMoaW5zdGFsbGVkUGFja2FnZUpzb25GaWxlLCB7IGVuY29kaW5nOiAndXRmOCcgfSkpO1xuICAgICAgICAgIGluc3RhbGxlZFZlcnNpb24gPSBwYWNrYWdlSnNvbi52ZXJzaW9uO1xuICAgICAgICAgIGlmIChpbnN0YWxsZWRWZXJzaW9uICYmIGluc3RhbGxlZFZlcnNpb24gIT09IGJ1bmRsZWRWZXJzaW9uKSB7XG4gICAgICAgICAgICB2ZXJzaW9uTWlzbWF0Y2hlcy5wdXNoKHtcbiAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgYnVuZGxlZFZlcnNpb24sXG4gICAgICAgICAgICAgIGluc3RhbGxlZFZlcnNpb25cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgIC8vIGlnbm9yZSBwYWNrYWdlIG5vdCBmb3VuZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodmVyc2lvbk1pc21hdGNoZXMubGVuZ3RoKSB7XG4gICAgICAgIGNvbnNvbGUuaW5mbyhgQHZhYWRpbi9idW5kbGVzIGhhcyB2ZXJzaW9uIG1pc21hdGNoZXMgd2l0aCBpbnN0YWxsZWQgcGFja2FnZXMsICR7ZGlzYWJsZWRNZXNzYWdlfWApO1xuICAgICAgICBjb25zb2xlLmluZm8oYFBhY2thZ2VzIHdpdGggdmVyc2lvbiBtaXNtYXRjaGVzOiAke0pTT04uc3RyaW5naWZ5KHZlcnNpb25NaXNtYXRjaGVzLCB1bmRlZmluZWQsIDIpfWApO1xuICAgICAgICB2YWFkaW5CdW5kbGVKc29uID0geyBwYWNrYWdlczoge30gfTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGFzeW5jIGNvbmZpZyhjb25maWcpIHtcbiAgICAgIHJldHVybiBtZXJnZUNvbmZpZyhcbiAgICAgICAge1xuICAgICAgICAgIG9wdGltaXplRGVwczoge1xuICAgICAgICAgICAgZXhjbHVkZTogW1xuICAgICAgICAgICAgICAvLyBWYWFkaW4gYnVuZGxlXG4gICAgICAgICAgICAgICdAdmFhZGluL2J1bmRsZXMnLFxuICAgICAgICAgICAgICAuLi5PYmplY3Qua2V5cyh2YWFkaW5CdW5kbGVKc29uLnBhY2thZ2VzKSxcbiAgICAgICAgICAgICAgJ0B2YWFkaW4vdmFhZGluLW1hdGVyaWFsLXN0eWxlcydcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbmZpZ1xuICAgICAgKTtcbiAgICB9LFxuICAgIGxvYWQocmF3SWQpIHtcbiAgICAgIGNvbnN0IFtwYXRoLCBwYXJhbXNdID0gcmF3SWQuc3BsaXQoJz8nKTtcbiAgICAgIGlmICghcGF0aC5zdGFydHNXaXRoKG1vZHVsZXNEaXJlY3RvcnkpKSByZXR1cm47XG5cbiAgICAgIGNvbnN0IGlkID0gcGF0aC5zdWJzdHJpbmcobW9kdWxlc0RpcmVjdG9yeS5sZW5ndGggKyAxKTtcbiAgICAgIGNvbnN0IGJpbmRpbmdzID0gZ2V0RXhwb3J0cyhpZCk7XG4gICAgICBpZiAoYmluZGluZ3MgPT09IHVuZGVmaW5lZCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBjYWNoZVN1ZmZpeCA9IHBhcmFtcyA/IGA/JHtwYXJhbXN9YCA6ICcnO1xuICAgICAgY29uc3QgYnVuZGxlUGF0aCA9IGBAdmFhZGluL2J1bmRsZXMvdmFhZGluLmpzJHtjYWNoZVN1ZmZpeH1gO1xuXG4gICAgICByZXR1cm4gYGltcG9ydCB7IGluaXQgYXMgVmFhZGluQnVuZGxlSW5pdCwgZ2V0IGFzIFZhYWRpbkJ1bmRsZUdldCB9IGZyb20gJyR7YnVuZGxlUGF0aH0nO1xuYXdhaXQgVmFhZGluQnVuZGxlSW5pdCgnZGVmYXVsdCcpO1xuY29uc3QgeyAke2JpbmRpbmdzLm1hcChnZXRJbXBvcnRBc3NpZ21lbnQpLmpvaW4oJywgJyl9IH0gPSAoYXdhaXQgVmFhZGluQnVuZGxlR2V0KCcuL25vZGVfbW9kdWxlcy8ke2lkfScpKSgpO1xuZXhwb3J0IHsgJHtiaW5kaW5ncy5tYXAoZ2V0RXhwb3J0QmluZGluZykuam9pbignLCAnKX0gfTtgO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gdGhlbWVQbHVnaW4ob3B0cyk6IFBsdWdpbk9wdGlvbiB7XG4gIGNvbnN0IGZ1bGxUaGVtZU9wdGlvbnMgPSB7IC4uLnRoZW1lT3B0aW9ucywgZGV2TW9kZTogb3B0cy5kZXZNb2RlIH07XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3ZhYWRpbjp0aGVtZScsXG4gICAgY29uZmlnKCkge1xuICAgICAgcHJvY2Vzc1RoZW1lUmVzb3VyY2VzKGZ1bGxUaGVtZU9wdGlvbnMsIGNvbnNvbGUpO1xuICAgIH0sXG4gICAgY29uZmlndXJlU2VydmVyKHNlcnZlcikge1xuICAgICAgZnVuY3Rpb24gaGFuZGxlVGhlbWVGaWxlQ3JlYXRlRGVsZXRlKHRoZW1lRmlsZSwgc3RhdHMpIHtcbiAgICAgICAgaWYgKHRoZW1lRmlsZS5zdGFydHNXaXRoKHRoZW1lRm9sZGVyKSkge1xuICAgICAgICAgIGNvbnN0IGNoYW5nZWQgPSBwYXRoLnJlbGF0aXZlKHRoZW1lRm9sZGVyLCB0aGVtZUZpbGUpO1xuICAgICAgICAgIGNvbnNvbGUuZGVidWcoJ1RoZW1lIGZpbGUgJyArICghIXN0YXRzID8gJ2NyZWF0ZWQnIDogJ2RlbGV0ZWQnKSwgY2hhbmdlZCk7XG4gICAgICAgICAgcHJvY2Vzc1RoZW1lUmVzb3VyY2VzKGZ1bGxUaGVtZU9wdGlvbnMsIGNvbnNvbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzZXJ2ZXIud2F0Y2hlci5vbignYWRkJywgaGFuZGxlVGhlbWVGaWxlQ3JlYXRlRGVsZXRlKTtcbiAgICAgIHNlcnZlci53YXRjaGVyLm9uKCd1bmxpbmsnLCBoYW5kbGVUaGVtZUZpbGVDcmVhdGVEZWxldGUpO1xuICAgIH0sXG4gICAgaGFuZGxlSG90VXBkYXRlKGNvbnRleHQpIHtcbiAgICAgIGNvbnN0IGNvbnRleHRQYXRoID0gcGF0aC5yZXNvbHZlKGNvbnRleHQuZmlsZSk7XG4gICAgICBjb25zdCB0aGVtZVBhdGggPSBwYXRoLnJlc29sdmUodGhlbWVGb2xkZXIpO1xuICAgICAgaWYgKGNvbnRleHRQYXRoLnN0YXJ0c1dpdGgodGhlbWVQYXRoKSkge1xuICAgICAgICBjb25zdCBjaGFuZ2VkID0gcGF0aC5yZWxhdGl2ZSh0aGVtZVBhdGgsIGNvbnRleHRQYXRoKTtcblxuICAgICAgICBjb25zb2xlLmRlYnVnKCdUaGVtZSBmaWxlIGNoYW5nZWQnLCBjaGFuZ2VkKTtcblxuICAgICAgICBpZiAoY2hhbmdlZC5zdGFydHNXaXRoKHNldHRpbmdzLnRoZW1lTmFtZSkpIHtcbiAgICAgICAgICBwcm9jZXNzVGhlbWVSZXNvdXJjZXMoZnVsbFRoZW1lT3B0aW9ucywgY29uc29sZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGFzeW5jIHJlc29sdmVJZChpZCwgaW1wb3J0ZXIpIHtcbiAgICAgIC8vIGZvcmNlIHRoZW1lIGdlbmVyYXRpb24gaWYgZ2VuZXJhdGVkIHRoZW1lIHNvdXJjZXMgZG9lcyBub3QgeWV0IGV4aXN0XG4gICAgICAvLyB0aGlzIG1heSBoYXBwZW4gZm9yIGV4YW1wbGUgZHVyaW5nIEphdmEgaG90IHJlbG9hZCB3aGVuIHVwZGF0aW5nXG4gICAgICAvLyBAVGhlbWUgYW5ub3RhdGlvbiB2YWx1ZVxuICAgICAgaWYgKFxuICAgICAgICBwYXRoLnJlc29sdmUodGhlbWVPcHRpb25zLmZyb250ZW5kR2VuZXJhdGVkRm9sZGVyLCAndGhlbWUuanMnKSA9PT0gaW1wb3J0ZXIgJiZcbiAgICAgICAgIWV4aXN0c1N5bmMocGF0aC5yZXNvbHZlKHRoZW1lT3B0aW9ucy5mcm9udGVuZEdlbmVyYXRlZEZvbGRlciwgaWQpKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnNvbGUuZGVidWcoJ0dlbmVyYXRlIHRoZW1lIGZpbGUgJyArIGlkICsgJyBub3QgZXhpc3RpbmcuIFByb2Nlc3NpbmcgdGhlbWUgcmVzb3VyY2UnKTtcbiAgICAgICAgcHJvY2Vzc1RoZW1lUmVzb3VyY2VzKGZ1bGxUaGVtZU9wdGlvbnMsIGNvbnNvbGUpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWlkLnN0YXJ0c1dpdGgoc2V0dGluZ3MudGhlbWVGb2xkZXIpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCBsb2NhdGlvbiBvZiBbdGhlbWVSZXNvdXJjZUZvbGRlciwgZnJvbnRlbmRGb2xkZXJdKSB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucmVzb2x2ZShwYXRoLnJlc29sdmUobG9jYXRpb24sIGlkKSk7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyB0cmFuc2Zvcm0ocmF3LCBpZCwgb3B0aW9ucykge1xuICAgICAgLy8gcmV3cml0ZSB1cmxzIGZvciB0aGUgYXBwbGljYXRpb24gdGhlbWUgY3NzIGZpbGVzXG4gICAgICBjb25zdCBbYmFyZUlkLCBxdWVyeV0gPSBpZC5zcGxpdCgnPycpO1xuICAgICAgaWYgKFxuICAgICAgICAoIWJhcmVJZD8uc3RhcnRzV2l0aCh0aGVtZUZvbGRlcikgJiYgIWJhcmVJZD8uc3RhcnRzV2l0aCh0aGVtZU9wdGlvbnMudGhlbWVSZXNvdXJjZUZvbGRlcikpIHx8XG4gICAgICAgICFiYXJlSWQ/LmVuZHNXaXRoKCcuY3NzJylcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBbdGhlbWVOYW1lXSA9IGJhcmVJZC5zdWJzdHJpbmcodGhlbWVGb2xkZXIubGVuZ3RoICsgMSkuc3BsaXQoJy8nKTtcbiAgICAgIHJldHVybiByZXdyaXRlQ3NzVXJscyhyYXcsIHBhdGguZGlybmFtZShiYXJlSWQpLCBwYXRoLnJlc29sdmUodGhlbWVGb2xkZXIsIHRoZW1lTmFtZSksIGNvbnNvbGUsIG9wdHMpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gcnVuV2F0Y2hEb2cod2F0Y2hEb2dQb3J0LCB3YXRjaERvZ0hvc3QpIHtcbiAgY29uc3QgY2xpZW50ID0gbmV0LlNvY2tldCgpO1xuICBjbGllbnQuc2V0RW5jb2RpbmcoJ3V0ZjgnKTtcbiAgY2xpZW50Lm9uKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICBjb25zb2xlLmxvZygnV2F0Y2hkb2cgY29ubmVjdGlvbiBlcnJvci4gVGVybWluYXRpbmcgdml0ZSBwcm9jZXNzLi4uJywgZXJyKTtcbiAgICBjbGllbnQuZGVzdHJveSgpO1xuICAgIHByb2Nlc3MuZXhpdCgwKTtcbiAgfSk7XG4gIGNsaWVudC5vbignY2xvc2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgY2xpZW50LmRlc3Ryb3koKTtcbiAgICBydW5XYXRjaERvZyh3YXRjaERvZ1BvcnQsIHdhdGNoRG9nSG9zdCk7XG4gIH0pO1xuXG4gIGNsaWVudC5jb25uZWN0KHdhdGNoRG9nUG9ydCwgd2F0Y2hEb2dIb3N0IHx8ICdsb2NhbGhvc3QnKTtcbn1cblxubGV0IHNwYU1pZGRsZXdhcmVGb3JjZVJlbW92ZWQgPSBmYWxzZTtcblxuY29uc3QgYWxsb3dlZEZyb250ZW5kRm9sZGVycyA9IFtmcm9udGVuZEZvbGRlciwgbm9kZU1vZHVsZXNGb2xkZXJdO1xuXG5mdW5jdGlvbiBzaG93UmVjb21waWxlUmVhc29uKCk6IFBsdWdpbk9wdGlvbiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3ZhYWRpbjp3aHkteW91LWNvbXBpbGUnLFxuICAgIGhhbmRsZUhvdFVwZGF0ZShjb250ZXh0KSB7XG4gICAgICBjb25zb2xlLmxvZygnUmVjb21waWxpbmcgYmVjYXVzZScsIGNvbnRleHQuZmlsZSwgJ2NoYW5nZWQnKTtcbiAgICB9XG4gIH07XG59XG5cbmNvbnN0IERFVl9NT0RFX1NUQVJUX1JFR0VYUCA9IC9cXC9cXCpbXFwqIV1cXHMrdmFhZGluLWRldi1tb2RlOnN0YXJ0LztcbmNvbnN0IERFVl9NT0RFX0NPREVfUkVHRVhQID0gL1xcL1xcKltcXCohXVxccyt2YWFkaW4tZGV2LW1vZGU6c3RhcnQoW1xcc1xcU10qKXZhYWRpbi1kZXYtbW9kZTplbmRcXHMrXFwqXFwqXFwvL2k7XG5cbmZ1bmN0aW9uIHByZXNlcnZlVXNhZ2VTdGF0cygpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAndmFhZGluOnByZXNlcnZlLXVzYWdlLXN0YXRzJyxcblxuICAgIHRyYW5zZm9ybShzcmM6IHN0cmluZywgaWQ6IHN0cmluZykge1xuICAgICAgaWYgKGlkLmluY2x1ZGVzKCd2YWFkaW4tdXNhZ2Utc3RhdGlzdGljcycpKSB7XG4gICAgICAgIGlmIChzcmMuaW5jbHVkZXMoJ3ZhYWRpbi1kZXYtbW9kZTpzdGFydCcpKSB7XG4gICAgICAgICAgY29uc3QgbmV3U3JjID0gc3JjLnJlcGxhY2UoREVWX01PREVfU1RBUlRfUkVHRVhQLCAnLyohIHZhYWRpbi1kZXYtbW9kZTpzdGFydCcpO1xuICAgICAgICAgIGlmIChuZXdTcmMgPT09IHNyYykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignQ29tbWVudCByZXBsYWNlbWVudCBmYWlsZWQgdG8gY2hhbmdlIGFueXRoaW5nJyk7XG4gICAgICAgICAgfSBlbHNlIGlmICghbmV3U3JjLm1hdGNoKERFVl9NT0RFX0NPREVfUkVHRVhQKSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignTmV3IGNvbW1lbnQgZmFpbHMgdG8gbWF0Y2ggb3JpZ2luYWwgcmVnZXhwJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7IGNvZGU6IG5ld1NyYyB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBjb2RlOiBzcmMgfTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCB2YWFkaW5Db25maWc6IFVzZXJDb25maWdGbiA9IChlbnYpID0+IHtcbiAgY29uc3QgZGV2TW9kZSA9IGVudi5tb2RlID09PSAnZGV2ZWxvcG1lbnQnO1xuICBjb25zdCBwcm9kdWN0aW9uTW9kZSA9ICFkZXZNb2RlICYmICFkZXZCdW5kbGVcblxuICBpZiAoZGV2TW9kZSAmJiBwcm9jZXNzLmVudi53YXRjaERvZ1BvcnQpIHtcbiAgICAvLyBPcGVuIGEgY29ubmVjdGlvbiB3aXRoIHRoZSBKYXZhIGRldi1tb2RlIGhhbmRsZXIgaW4gb3JkZXIgdG8gZmluaXNoXG4gICAgLy8gdml0ZSB3aGVuIGl0IGV4aXRzIG9yIGNyYXNoZXMuXG4gICAgcnVuV2F0Y2hEb2cocHJvY2Vzcy5lbnYud2F0Y2hEb2dQb3J0LCBwcm9jZXNzLmVudi53YXRjaERvZ0hvc3QpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByb290OiBmcm9udGVuZEZvbGRlcixcbiAgICBiYXNlOiAnJyxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQHZhYWRpbi9mbG93LWZyb250ZW5kJzogamFyUmVzb3VyY2VzRm9sZGVyLFxuICAgICAgICBGcm9udGVuZDogZnJvbnRlbmRGb2xkZXJcbiAgICAgIH0sXG4gICAgICBwcmVzZXJ2ZVN5bWxpbmtzOiB0cnVlXG4gICAgfSxcbiAgICBkZWZpbmU6IHtcbiAgICAgIE9GRkxJTkVfUEFUSDogc2V0dGluZ3Mub2ZmbGluZVBhdGgsXG4gICAgICBWSVRFX0VOQUJMRUQ6ICd0cnVlJ1xuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBob3N0OiAnMTI3LjAuMC4xJyxcbiAgICAgIHN0cmljdFBvcnQ6IHRydWUsXG4gICAgICBmczoge1xuICAgICAgICBhbGxvdzogYWxsb3dlZEZyb250ZW5kRm9sZGVyc1xuICAgICAgfVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogYnVpbGRPdXRwdXRGb2xkZXIsXG4gICAgICBlbXB0eU91dERpcjogZGV2QnVuZGxlLFxuICAgICAgYXNzZXRzRGlyOiAnVkFBRElOL2J1aWxkJyxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICBpbmRleGh0bWw6IHByb2plY3RJbmRleEh0bWwsXG5cbiAgICAgICAgICAuLi4oaGFzRXhwb3J0ZWRXZWJDb21wb25lbnRzID8geyB3ZWJjb21wb25lbnRodG1sOiBwYXRoLnJlc29sdmUoZnJvbnRlbmRGb2xkZXIsICd3ZWItY29tcG9uZW50Lmh0bWwnKSB9IDoge30pXG4gICAgICAgIH0sXG4gICAgICAgIG9ud2FybjogKHdhcm5pbmc6IHJvbGx1cC5Sb2xsdXBXYXJuaW5nLCBkZWZhdWx0SGFuZGxlcjogcm9sbHVwLldhcm5pbmdIYW5kbGVyKSA9PiB7XG4gICAgICAgICAgY29uc3QgaWdub3JlRXZhbFdhcm5pbmcgPSBbXG4gICAgICAgICAgICAnZ2VuZXJhdGVkL2phci1yZXNvdXJjZXMvRmxvd0NsaWVudC5qcycsXG4gICAgICAgICAgICAnZ2VuZXJhdGVkL2phci1yZXNvdXJjZXMvdmFhZGluLXNwcmVhZHNoZWV0L3NwcmVhZHNoZWV0LWV4cG9ydC5qcycsXG4gICAgICAgICAgICAnQHZhYWRpbi9jaGFydHMvc3JjL2hlbHBlcnMuanMnXG4gICAgICAgICAgXTtcbiAgICAgICAgICBpZiAod2FybmluZy5jb2RlID09PSAnRVZBTCcgJiYgd2FybmluZy5pZCAmJiAhIWlnbm9yZUV2YWxXYXJuaW5nLmZpbmQoKGlkKSA9PiB3YXJuaW5nLmlkLmVuZHNXaXRoKGlkKSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGVmYXVsdEhhbmRsZXIod2FybmluZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgZW50cmllczogW1xuICAgICAgICAvLyBQcmUtc2NhbiBlbnRyeXBvaW50cyBpbiBWaXRlIHRvIGF2b2lkIHJlbG9hZGluZyBvbiBmaXJzdCBvcGVuXG4gICAgICAgICdnZW5lcmF0ZWQvdmFhZGluLnRzJ1xuICAgICAgXSxcbiAgICAgIGV4Y2x1ZGU6IFtcbiAgICAgICAgJ0B2YWFkaW4vcm91dGVyJyxcbiAgICAgICAgJ0B2YWFkaW4vdmFhZGluLWxpY2Vuc2UtY2hlY2tlcicsXG4gICAgICAgICdAdmFhZGluL3ZhYWRpbi11c2FnZS1zdGF0aXN0aWNzJyxcbiAgICAgICAgJ3dvcmtib3gtY29yZScsXG4gICAgICAgICd3b3JrYm94LXByZWNhY2hpbmcnLFxuICAgICAgICAnd29ya2JveC1yb3V0aW5nJyxcbiAgICAgICAgJ3dvcmtib3gtc3RyYXRlZ2llcydcbiAgICAgIF1cbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHByb2R1Y3Rpb25Nb2RlICYmIGJyb3RsaSgpLFxuICAgICAgZGV2TW9kZSAmJiB2YWFkaW5CdW5kbGVzUGx1Z2luKCksXG4gICAgICBkZXZNb2RlICYmIHNob3dSZWNvbXBpbGVSZWFzb24oKSxcbiAgICAgIHNldHRpbmdzLm9mZmxpbmVFbmFibGVkICYmIGJ1aWxkU1dQbHVnaW4oeyBkZXZNb2RlIH0pLFxuICAgICAgIWRldk1vZGUgJiYgc3RhdHNFeHRyYWN0ZXJQbHVnaW4oKSxcbiAgICAgIGRldkJ1bmRsZSAmJiBwcmVzZXJ2ZVVzYWdlU3RhdHMoKSxcbiAgICAgIHRoZW1lUGx1Z2luKHsgZGV2TW9kZSB9KSxcbiAgICAgIHBvc3Rjc3NMaXQoe1xuICAgICAgICBpbmNsdWRlOiBbJyoqLyouY3NzJywgLy4qXFwvLipcXC5jc3NcXD8uKi9dLFxuICAgICAgICBleGNsdWRlOiBbXG4gICAgICAgICAgYCR7dGhlbWVGb2xkZXJ9LyoqLyouY3NzYCxcbiAgICAgICAgICBuZXcgUmVnRXhwKGAke3RoZW1lRm9sZGVyfS8uKi8uKlxcXFwuY3NzXFxcXD8uKmApLFxuICAgICAgICAgIGAke3RoZW1lUmVzb3VyY2VGb2xkZXJ9LyoqLyouY3NzYCxcbiAgICAgICAgICBuZXcgUmVnRXhwKGAke3RoZW1lUmVzb3VyY2VGb2xkZXJ9Ly4qLy4qXFxcXC5jc3NcXFxcPy4qYCksXG4gICAgICAgICAgbmV3IFJlZ0V4cCgnLiovLipcXFxcP2h0bWwtcHJveHkuKicpXG4gICAgICAgIF1cbiAgICAgIH0pLFxuICAgICAge1xuICAgICAgICBuYW1lOiAndmFhZGluOmZvcmNlLXJlbW92ZS1odG1sLW1pZGRsZXdhcmUnLFxuICAgICAgICB0cmFuc2Zvcm1JbmRleEh0bWw6IHtcbiAgICAgICAgICBlbmZvcmNlOiAncHJlJyxcbiAgICAgICAgICB0cmFuc2Zvcm0oX2h0bWwsIHsgc2VydmVyIH0pIHtcbiAgICAgICAgICAgIGlmIChzZXJ2ZXIgJiYgIXNwYU1pZGRsZXdhcmVGb3JjZVJlbW92ZWQpIHtcbiAgICAgICAgICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnN0YWNrID0gc2VydmVyLm1pZGRsZXdhcmVzLnN0YWNrLmZpbHRlcigobXcpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVOYW1lID0gJycgKyBtdy5oYW5kbGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuICFoYW5kbGVOYW1lLmluY2x1ZGVzKCd2aXRlSHRtbEZhbGxiYWNrTWlkZGxld2FyZScpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgc3BhTWlkZGxld2FyZUZvcmNlUmVtb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFzRXhwb3J0ZWRXZWJDb21wb25lbnRzICYmIHtcbiAgICAgICAgbmFtZTogJ3ZhYWRpbjppbmplY3QtZW50cnlwb2ludHMtdG8td2ViLWNvbXBvbmVudC1odG1sJyxcbiAgICAgICAgdHJhbnNmb3JtSW5kZXhIdG1sOiB7XG4gICAgICAgICAgZW5mb3JjZTogJ3ByZScsXG4gICAgICAgICAgdHJhbnNmb3JtKF9odG1sLCB7IHBhdGgsIHNlcnZlciB9KSB7XG4gICAgICAgICAgICBpZiAocGF0aCAhPT0gJy93ZWItY29tcG9uZW50Lmh0bWwnKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRhZzogJ3NjcmlwdCcsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogJ21vZHVsZScsIHNyYzogYC9nZW5lcmF0ZWQvdmFhZGluLXdlYi1jb21wb25lbnQudHNgIH0sXG4gICAgICAgICAgICAgICAgaW5qZWN0VG86ICdoZWFkJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ3ZhYWRpbjppbmplY3QtZW50cnlwb2ludHMtdG8taW5kZXgtaHRtbCcsXG4gICAgICAgIHRyYW5zZm9ybUluZGV4SHRtbDoge1xuICAgICAgICAgIGVuZm9yY2U6ICdwcmUnLFxuICAgICAgICAgIHRyYW5zZm9ybShfaHRtbCwgeyBwYXRoLCBzZXJ2ZXIgfSkge1xuICAgICAgICAgICAgaWYgKHBhdGggIT09ICcvaW5kZXguaHRtbCcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzY3JpcHRzID0gW107XG5cbiAgICAgICAgICAgIGlmIChkZXZNb2RlKSB7XG4gICAgICAgICAgICAgIHNjcmlwdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdGFnOiAnc2NyaXB0JyxcbiAgICAgICAgICAgICAgICBhdHRyczogeyB0eXBlOiAnbW9kdWxlJywgc3JjOiBgL2dlbmVyYXRlZC92aXRlLWRldm1vZGUudHNgIH0sXG4gICAgICAgICAgICAgICAgaW5qZWN0VG86ICdoZWFkJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjcmlwdHMucHVzaCh7XG4gICAgICAgICAgICAgIHRhZzogJ3NjcmlwdCcsXG4gICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6ICdtb2R1bGUnLCBzcmM6ICcvZ2VuZXJhdGVkL3ZhYWRpbi50cycgfSxcbiAgICAgICAgICAgICAgaW5qZWN0VG86ICdoZWFkJ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gc2NyaXB0cztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjaGVja2VyKHtcbiAgICAgICAgdHlwZXNjcmlwdDogdHJ1ZVxuICAgICAgfSksXG4gICAgICBwcm9kdWN0aW9uTW9kZSAmJiB2aXN1YWxpemVyKHsgYnJvdGxpU2l6ZTogdHJ1ZSwgZmlsZW5hbWU6IGJ1bmRsZVNpemVGaWxlIH0pXG4gICAgXVxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG92ZXJyaWRlVmFhZGluQ29uZmlnID0gKGN1c3RvbUNvbmZpZzogVXNlckNvbmZpZ0ZuKSA9PiB7XG4gIHJldHVybiBkZWZpbmVDb25maWcoKGVudikgPT4gbWVyZ2VDb25maWcodmFhZGluQ29uZmlnKGVudiksIGN1c3RvbUNvbmZpZyhlbnYpKSk7XG59O1xuZnVuY3Rpb24gZ2V0VmVyc2lvbihtb2R1bGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHBhY2thZ2VKc29uID0gcGF0aC5yZXNvbHZlKG5vZGVNb2R1bGVzRm9sZGVyLCBtb2R1bGUsICdwYWNrYWdlLmpzb24nKTtcbiAgcmV0dXJuIEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKHBhY2thZ2VKc29uLCB7IGVuY29kaW5nOiAndXRmLTgnIH0pKS52ZXJzaW9uO1xufVxuZnVuY3Rpb24gZ2V0Q3ZkbE5hbWUobW9kdWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCBwYWNrYWdlSnNvbiA9IHBhdGgucmVzb2x2ZShub2RlTW9kdWxlc0ZvbGRlciwgbW9kdWxlLCAncGFja2FnZS5qc29uJyk7XG4gIHJldHVybiBKU09OLnBhcnNlKHJlYWRGaWxlU3luYyhwYWNrYWdlSnNvbiwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KSkuY3ZkbE5hbWU7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGd1aWxoLkdVSVBDXFxcXEphdmFQcm9qZWN0c1xcXFxjbGVhckNvbnRXZWJBcHBcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxhcHBsaWNhdGlvbi10aGVtZS1wbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGd1aWxoLkdVSVBDXFxcXEphdmFQcm9qZWN0c1xcXFxjbGVhckNvbnRXZWJBcHBcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxhcHBsaWNhdGlvbi10aGVtZS1wbHVnaW5cXFxcdGhlbWUtaGFuZGxlLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ndWlsaC5HVUlQQy9KYXZhUHJvamVjdHMvY2xlYXJDb250V2ViQXBwL2J1aWxkL3BsdWdpbnMvYXBwbGljYXRpb24tdGhlbWUtcGx1Z2luL3RoZW1lLWhhbmRsZS5qc1wiOy8qXG4gKiBDb3B5cmlnaHQgMjAwMC0yMDIzIFZhYWRpbiBMdGQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3RcbiAqIHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mXG4gKiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlclxuICogdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBUaGlzIGZpbGUgY29udGFpbnMgZnVuY3Rpb25zIGZvciBsb29rIHVwIGFuZCBoYW5kbGUgdGhlIHRoZW1lIHJlc291cmNlc1xuICogZm9yIGFwcGxpY2F0aW9uIHRoZW1lIHBsdWdpbi5cbiAqL1xuaW1wb3J0IHsgZXhpc3RzU3luYywgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgd3JpdGVUaGVtZUZpbGVzIH0gZnJvbSAnLi90aGVtZS1nZW5lcmF0b3IuanMnO1xuaW1wb3J0IHsgY29weVN0YXRpY0Fzc2V0cywgY29weVRoZW1lUmVzb3VyY2VzIH0gZnJvbSAnLi90aGVtZS1jb3B5LmpzJztcblxuLy8gbWF0Y2hlcyB0aGVtZSBuYW1lIGluICcuL3RoZW1lLW15LXRoZW1lLmdlbmVyYXRlZC5qcydcbmNvbnN0IG5hbWVSZWdleCA9IC90aGVtZS0oLiopXFwuZ2VuZXJhdGVkXFwuanMvO1xuXG5sZXQgcHJldlRoZW1lTmFtZSA9IHVuZGVmaW5lZDtcbmxldCBmaXJzdFRoZW1lTmFtZSA9IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBMb29rcyB1cCBmb3IgYSB0aGVtZSByZXNvdXJjZXMgaW4gYSBjdXJyZW50IHByb2plY3QgYW5kIGluIGphciBkZXBlbmRlbmNpZXMsXG4gKiBjb3BpZXMgdGhlIGZvdW5kIHJlc291cmNlcyBhbmQgZ2VuZXJhdGVzL3VwZGF0ZXMgbWV0YSBkYXRhIGZvciB3ZWJwYWNrXG4gKiBjb21waWxhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBhcHBsaWNhdGlvbiB0aGVtZSBwbHVnaW4gbWFuZGF0b3J5IG9wdGlvbnMsXG4gKiBAc2VlIHtAbGluayBBcHBsaWNhdGlvblRoZW1lUGx1Z2lufVxuICpcbiAqIEBwYXJhbSBsb2dnZXIgYXBwbGljYXRpb24gdGhlbWUgcGx1Z2luIGxvZ2dlclxuICovXG5mdW5jdGlvbiBwcm9jZXNzVGhlbWVSZXNvdXJjZXMob3B0aW9ucywgbG9nZ2VyKSB7XG4gIGNvbnN0IHRoZW1lTmFtZSA9IGV4dHJhY3RUaGVtZU5hbWUob3B0aW9ucy5mcm9udGVuZEdlbmVyYXRlZEZvbGRlcik7XG4gIGlmICh0aGVtZU5hbWUpIHtcbiAgICBpZiAoIXByZXZUaGVtZU5hbWUgJiYgIWZpcnN0VGhlbWVOYW1lKSB7XG4gICAgICBmaXJzdFRoZW1lTmFtZSA9IHRoZW1lTmFtZTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgKHByZXZUaGVtZU5hbWUgJiYgcHJldlRoZW1lTmFtZSAhPT0gdGhlbWVOYW1lICYmIGZpcnN0VGhlbWVOYW1lICE9PSB0aGVtZU5hbWUpIHx8XG4gICAgICAoIXByZXZUaGVtZU5hbWUgJiYgZmlyc3RUaGVtZU5hbWUgIT09IHRoZW1lTmFtZSlcbiAgICApIHtcbiAgICAgIC8vIFdhcm5pbmcgbWVzc2FnZSBpcyBzaG93biB0byB0aGUgZGV2ZWxvcGVyIHdoZW46XG4gICAgICAvLyAxLiBIZSBpcyBzd2l0Y2hpbmcgdG8gYW55IHRoZW1lLCB3aGljaCBpcyBkaWZmZXIgZnJvbSBvbmUgYmVpbmcgc2V0IHVwXG4gICAgICAvLyBvbiBhcHBsaWNhdGlvbiBzdGFydHVwLCBieSBjaGFuZ2luZyB0aGVtZSBuYW1lIGluIGBAVGhlbWUoKWBcbiAgICAgIC8vIDIuIEhlIHJlbW92ZXMgb3IgY29tbWVudHMgb3V0IGBAVGhlbWUoKWAgdG8gc2VlIGhvdyB0aGUgYXBwXG4gICAgICAvLyBsb29rcyBsaWtlIHdpdGhvdXQgdGhlbWluZywgYW5kIHRoZW4gYWdhaW4gYnJpbmdzIGBAVGhlbWUoKWAgYmFja1xuICAgICAgLy8gd2l0aCBhIHRoZW1lTmFtZSB3aGljaCBpcyBkaWZmZXIgZnJvbSBvbmUgYmVpbmcgc2V0IHVwIG9uIGFwcGxpY2F0aW9uXG4gICAgICAvLyBzdGFydHVwLlxuICAgICAgY29uc3Qgd2FybmluZyA9IGBBdHRlbnRpb246IEFjdGl2ZSB0aGVtZSBpcyBzd2l0Y2hlZCB0byAnJHt0aGVtZU5hbWV9Jy5gO1xuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBgXG4gICAgICBOb3RlIHRoYXQgYWRkaW5nIG5ldyBzdHlsZSBzaGVldCBmaWxlcyB0byAnL3RoZW1lcy8ke3RoZW1lTmFtZX0vY29tcG9uZW50cycsIFxuICAgICAgbWF5IG5vdCBiZSB0YWtlbiBpbnRvIGVmZmVjdCB1bnRpbCB0aGUgbmV4dCBhcHBsaWNhdGlvbiByZXN0YXJ0LlxuICAgICAgQ2hhbmdlcyB0byBhbHJlYWR5IGV4aXN0aW5nIHN0eWxlIHNoZWV0IGZpbGVzIGFyZSBiZWluZyByZWxvYWRlZCBhcyBiZWZvcmUuYDtcbiAgICAgIGxvZ2dlci53YXJuKCcqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJyk7XG4gICAgICBsb2dnZXIud2Fybih3YXJuaW5nKTtcbiAgICAgIGxvZ2dlci53YXJuKGRlc2NyaXB0aW9uKTtcbiAgICAgIGxvZ2dlci53YXJuKCcqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqJyk7XG4gICAgfVxuICAgIHByZXZUaGVtZU5hbWUgPSB0aGVtZU5hbWU7XG5cbiAgICBmaW5kVGhlbWVGb2xkZXJBbmRIYW5kbGVUaGVtZSh0aGVtZU5hbWUsIG9wdGlvbnMsIGxvZ2dlcik7XG4gIH0gZWxzZSB7XG4gICAgLy8gVGhpcyBpcyBuZWVkZWQgaW4gdGhlIHNpdHVhdGlvbiB0aGF0IHRoZSB1c2VyIGRlY2lkZXMgdG8gY29tbWVudCBvclxuICAgIC8vIHJlbW92ZSB0aGUgQFRoZW1lKC4uLikgY29tcGxldGVseSB0byBzZWUgaG93IHRoZSBhcHBsaWNhdGlvbiBsb29rc1xuICAgIC8vIHdpdGhvdXQgYW55IHRoZW1lLiBUaGVuIHdoZW4gdGhlIHVzZXIgYnJpbmdzIGJhY2sgb25lIG9mIHRoZSB0aGVtZXMsXG4gICAgLy8gdGhlIHByZXZpb3VzIHRoZW1lIHNob3VsZCBiZSB1bmRlZmluZWQgdG8gZW5hYmxlIHVzIHRvIGRldGVjdCB0aGUgY2hhbmdlLlxuICAgIHByZXZUaGVtZU5hbWUgPSB1bmRlZmluZWQ7XG4gICAgbG9nZ2VyLmRlYnVnKCdTa2lwcGluZyBWYWFkaW4gYXBwbGljYXRpb24gdGhlbWUgaGFuZGxpbmcuJyk7XG4gICAgbG9nZ2VyLnRyYWNlKCdNb3N0IGxpa2VseSBubyBAVGhlbWUgYW5ub3RhdGlvbiBmb3IgYXBwbGljYXRpb24gb3Igb25seSB0aGVtZUNsYXNzIHVzZWQuJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBTZWFyY2ggZm9yIHRoZSBnaXZlbiB0aGVtZSBpbiB0aGUgcHJvamVjdCBhbmQgcmVzb3VyY2UgZm9sZGVycy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhlbWVOYW1lIG5hbWUgb2YgdGhlbWUgdG8gZmluZFxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgYXBwbGljYXRpb24gdGhlbWUgcGx1Z2luIG1hbmRhdG9yeSBvcHRpb25zLFxuICogQHNlZSB7QGxpbmsgQXBwbGljYXRpb25UaGVtZVBsdWdpbn1cbiAqIEBwYXJhbSBsb2dnZXIgYXBwbGljYXRpb24gdGhlbWUgcGx1Z2luIGxvZ2dlclxuICogQHJldHVybiB0cnVlIG9yIGZhbHNlIGZvciBpZiB0aGVtZSB3YXMgZm91bmRcbiAqL1xuZnVuY3Rpb24gZmluZFRoZW1lRm9sZGVyQW5kSGFuZGxlVGhlbWUodGhlbWVOYW1lLCBvcHRpb25zLCBsb2dnZXIpIHtcbiAgbGV0IHRoZW1lRm91bmQgPSBmYWxzZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBvcHRpb25zLnRoZW1lUHJvamVjdEZvbGRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0aGVtZVByb2plY3RGb2xkZXIgPSBvcHRpb25zLnRoZW1lUHJvamVjdEZvbGRlcnNbaV07XG4gICAgaWYgKGV4aXN0c1N5bmModGhlbWVQcm9qZWN0Rm9sZGVyKSkge1xuICAgICAgbG9nZ2VyLmRlYnVnKFwiU2VhcmNoaW5nIHRoZW1lcyBmb2xkZXIgJ1wiICsgdGhlbWVQcm9qZWN0Rm9sZGVyICsgXCInIGZvciB0aGVtZSAnXCIgKyB0aGVtZU5hbWUgKyBcIidcIik7XG4gICAgICBjb25zdCBoYW5kbGVkID0gaGFuZGxlVGhlbWVzKHRoZW1lTmFtZSwgdGhlbWVQcm9qZWN0Rm9sZGVyLCBvcHRpb25zLCBsb2dnZXIpO1xuICAgICAgaWYgKGhhbmRsZWQpIHtcbiAgICAgICAgaWYgKHRoZW1lRm91bmQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBcIkZvdW5kIHRoZW1lIGZpbGVzIGluICdcIiArXG4gICAgICAgICAgICAgIHRoZW1lUHJvamVjdEZvbGRlciArXG4gICAgICAgICAgICAgIFwiJyBhbmQgJ1wiICtcbiAgICAgICAgICAgICAgdGhlbWVGb3VuZCArXG4gICAgICAgICAgICAgIFwiJy4gVGhlbWUgc2hvdWxkIG9ubHkgYmUgYXZhaWxhYmxlIGluIG9uZSBmb2xkZXJcIlxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nZ2VyLmRlYnVnKFwiRm91bmQgdGhlbWUgZmlsZXMgZnJvbSAnXCIgKyB0aGVtZVByb2plY3RGb2xkZXIgKyBcIidcIik7XG4gICAgICAgIHRoZW1lRm91bmQgPSB0aGVtZVByb2plY3RGb2xkZXI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGV4aXN0c1N5bmMob3B0aW9ucy50aGVtZVJlc291cmNlRm9sZGVyKSkge1xuICAgIGlmICh0aGVtZUZvdW5kICYmIGV4aXN0c1N5bmMocmVzb2x2ZShvcHRpb25zLnRoZW1lUmVzb3VyY2VGb2xkZXIsIHRoZW1lTmFtZSkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiVGhlbWUgJ1wiICtcbiAgICAgICAgICB0aGVtZU5hbWUgK1xuICAgICAgICAgIFwiJ3Nob3VsZCBub3QgZXhpc3QgaW5zaWRlIGEgamFyIGFuZCBpbiB0aGUgcHJvamVjdCBhdCB0aGUgc2FtZSB0aW1lXFxuXCIgK1xuICAgICAgICAgICdFeHRlbmRpbmcgYW5vdGhlciB0aGVtZSBpcyBwb3NzaWJsZSBieSBhZGRpbmcgeyBcInBhcmVudFwiOiBcIm15LXBhcmVudC10aGVtZVwiIH0gZW50cnkgdG8gdGhlIHRoZW1lLmpzb24gZmlsZSBpbnNpZGUgeW91ciB0aGVtZSBmb2xkZXIuJ1xuICAgICAgKTtcbiAgICB9XG4gICAgbG9nZ2VyLmRlYnVnKFxuICAgICAgXCJTZWFyY2hpbmcgdGhlbWUgamFyIHJlc291cmNlIGZvbGRlciAnXCIgKyBvcHRpb25zLnRoZW1lUmVzb3VyY2VGb2xkZXIgKyBcIicgZm9yIHRoZW1lICdcIiArIHRoZW1lTmFtZSArIFwiJ1wiXG4gICAgKTtcbiAgICBoYW5kbGVUaGVtZXModGhlbWVOYW1lLCBvcHRpb25zLnRoZW1lUmVzb3VyY2VGb2xkZXIsIG9wdGlvbnMsIGxvZ2dlcik7XG4gICAgdGhlbWVGb3VuZCA9IHRydWU7XG4gIH1cbiAgcmV0dXJuIHRoZW1lRm91bmQ7XG59XG5cbi8qKlxuICogQ29waWVzIHN0YXRpYyByZXNvdXJjZXMgZm9yIHRoZW1lIGFuZCBnZW5lcmF0ZXMvd3JpdGVzIHRoZVxuICogW3RoZW1lLW5hbWVdLmdlbmVyYXRlZC5qcyBmb3Igd2VicGFjayB0byBoYW5kbGUuXG4gKlxuICogTm90ZSEgSWYgYSBwYXJlbnQgdGhlbWUgaXMgZGVmaW5lZCBpdCB3aWxsIGFsc28gYmUgaGFuZGxlZCBoZXJlIHNvIHRoYXQgdGhlIHBhcmVudCB0aGVtZSBnZW5lcmF0ZWQgZmlsZSBpc1xuICogZ2VuZXJhdGVkIGluIGFkdmFuY2Ugb2YgdGhlIHRoZW1lIGdlbmVyYXRlZCBmaWxlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGVtZU5hbWUgbmFtZSBvZiB0aGVtZSB0byBoYW5kbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGVtZXNGb2xkZXIgZm9sZGVyIGNvbnRhaW5pbmcgYXBwbGljYXRpb24gdGhlbWUgZm9sZGVyc1xuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgYXBwbGljYXRpb24gdGhlbWUgcGx1Z2luIG1hbmRhdG9yeSBvcHRpb25zLFxuICogQHNlZSB7QGxpbmsgQXBwbGljYXRpb25UaGVtZVBsdWdpbn1cbiAqIEBwYXJhbSB7b2JqZWN0fSBsb2dnZXIgcGx1Z2luIGxvZ2dlciBpbnN0YW5jZVxuICpcbiAqIEB0aHJvd3MgRXJyb3IgaWYgcGFyZW50IHRoZW1lIGRlZmluZWQsIGJ1dCBjYW4ndCBsb2NhdGUgcGFyZW50IHRoZW1lXG4gKlxuICogQHJldHVybnMgdHJ1ZSBpZiB0aGVtZSB3YXMgZm91bmQgZWxzZSBmYWxzZS5cbiAqL1xuZnVuY3Rpb24gaGFuZGxlVGhlbWVzKHRoZW1lTmFtZSwgdGhlbWVzRm9sZGVyLCBvcHRpb25zLCBsb2dnZXIpIHtcbiAgY29uc3QgdGhlbWVGb2xkZXIgPSByZXNvbHZlKHRoZW1lc0ZvbGRlciwgdGhlbWVOYW1lKTtcbiAgaWYgKGV4aXN0c1N5bmModGhlbWVGb2xkZXIpKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdGb3VuZCB0aGVtZSAnLCB0aGVtZU5hbWUsICcgaW4gZm9sZGVyICcsIHRoZW1lRm9sZGVyKTtcblxuICAgIGNvbnN0IHRoZW1lUHJvcGVydGllcyA9IGdldFRoZW1lUHJvcGVydGllcyh0aGVtZUZvbGRlcik7XG5cbiAgICAvLyBJZiB0aGVtZSBoYXMgcGFyZW50IGhhbmRsZSBwYXJlbnQgdGhlbWUgaW1tZWRpYXRlbHkuXG4gICAgaWYgKHRoZW1lUHJvcGVydGllcy5wYXJlbnQpIHtcbiAgICAgIGNvbnN0IGZvdW5kID0gZmluZFRoZW1lRm9sZGVyQW5kSGFuZGxlVGhlbWUodGhlbWVQcm9wZXJ0aWVzLnBhcmVudCwgb3B0aW9ucywgbG9nZ2VyKTtcbiAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIFwiQ291bGQgbm90IGxvY2F0ZSBmaWxlcyBmb3IgZGVmaW5lZCBwYXJlbnQgdGhlbWUgJ1wiICtcbiAgICAgICAgICAgIHRoZW1lUHJvcGVydGllcy5wYXJlbnQgK1xuICAgICAgICAgICAgXCInLlxcblwiICtcbiAgICAgICAgICAgICdQbGVhc2UgdmVyaWZ5IHRoYXQgZGVwZW5kZW5jeSBpcyBhZGRlZCBvciB0aGVtZSBmb2xkZXIgZXhpc3RzLidcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY29weVN0YXRpY0Fzc2V0cyh0aGVtZU5hbWUsIHRoZW1lUHJvcGVydGllcywgb3B0aW9ucy5wcm9qZWN0U3RhdGljQXNzZXRzT3V0cHV0Rm9sZGVyLCBsb2dnZXIpO1xuICAgIGNvcHlUaGVtZVJlc291cmNlcyh0aGVtZUZvbGRlciwgb3B0aW9ucy5wcm9qZWN0U3RhdGljQXNzZXRzT3V0cHV0Rm9sZGVyLCBsb2dnZXIpO1xuXG4gICAgd3JpdGVUaGVtZUZpbGVzKHRoZW1lRm9sZGVyLCB0aGVtZU5hbWUsIHRoZW1lUHJvcGVydGllcywgb3B0aW9ucyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBnZXRUaGVtZVByb3BlcnRpZXModGhlbWVGb2xkZXIpIHtcbiAgY29uc3QgdGhlbWVQcm9wZXJ0eUZpbGUgPSByZXNvbHZlKHRoZW1lRm9sZGVyLCAndGhlbWUuanNvbicpO1xuICBpZiAoIWV4aXN0c1N5bmModGhlbWVQcm9wZXJ0eUZpbGUpKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIGNvbnN0IHRoZW1lUHJvcGVydHlGaWxlQXNTdHJpbmcgPSByZWFkRmlsZVN5bmModGhlbWVQcm9wZXJ0eUZpbGUpO1xuICBpZiAodGhlbWVQcm9wZXJ0eUZpbGVBc1N0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge307XG4gIH1cbiAgcmV0dXJuIEpTT04ucGFyc2UodGhlbWVQcm9wZXJ0eUZpbGVBc1N0cmluZyk7XG59XG5cbi8qKlxuICogRXh0cmFjdHMgY3VycmVudCB0aGVtZSBuYW1lIGZyb20gYXV0by1nZW5lcmF0ZWQgJ3RoZW1lLmpzJyBmaWxlIGxvY2F0ZWQgb24gYVxuICogZ2l2ZW4gZm9sZGVyLlxuICogQHBhcmFtIGZyb250ZW5kR2VuZXJhdGVkRm9sZGVyIGZvbGRlciBpbiBwcm9qZWN0IGNvbnRhaW5pbmcgJ3RoZW1lLmpzJyBmaWxlXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBjdXJyZW50IHRoZW1lIG5hbWVcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFRoZW1lTmFtZShmcm9udGVuZEdlbmVyYXRlZEZvbGRlcikge1xuICBpZiAoIWZyb250ZW5kR2VuZXJhdGVkRm9sZGVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgXCJDb3VsZG4ndCBleHRyYWN0IHRoZW1lIG5hbWUgZnJvbSAndGhlbWUuanMnLFwiICtcbiAgICAgICAgJyBiZWNhdXNlIHRoZSBwYXRoIHRvIGZvbGRlciBjb250YWluaW5nIHRoaXMgZmlsZSBpcyBlbXB0eS4gUGxlYXNlIHNldCcgK1xuICAgICAgICAnIHRoZSBhIGNvcnJlY3QgZm9sZGVyIHBhdGggaW4gQXBwbGljYXRpb25UaGVtZVBsdWdpbiBjb25zdHJ1Y3RvcicgK1xuICAgICAgICAnIHBhcmFtZXRlcnMuJ1xuICAgICk7XG4gIH1cbiAgY29uc3QgZ2VuZXJhdGVkVGhlbWVGaWxlID0gcmVzb2x2ZShmcm9udGVuZEdlbmVyYXRlZEZvbGRlciwgJ3RoZW1lLmpzJyk7XG4gIGlmIChleGlzdHNTeW5jKGdlbmVyYXRlZFRoZW1lRmlsZSkpIHtcbiAgICAvLyByZWFkIHRoZW1lIG5hbWUgZnJvbSB0aGUgJ2dlbmVyYXRlZC90aGVtZS5qcycgYXMgdGhlcmUgd2UgYWx3YXlzXG4gICAgLy8gbWFyayB0aGUgdXNlZCB0aGVtZSBmb3Igd2VicGFjayB0byBoYW5kbGUuXG4gICAgY29uc3QgdGhlbWVOYW1lID0gbmFtZVJlZ2V4LmV4ZWMocmVhZEZpbGVTeW5jKGdlbmVyYXRlZFRoZW1lRmlsZSwgeyBlbmNvZGluZzogJ3V0ZjgnIH0pKVsxXTtcbiAgICBpZiAoIXRoZW1lTmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgcGFyc2UgdGhlbWUgbmFtZSBmcm9tICdcIiArIGdlbmVyYXRlZFRoZW1lRmlsZSArIFwiJy5cIik7XG4gICAgfVxuICAgIHJldHVybiB0aGVtZU5hbWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbi8qKlxuICogRmluZHMgYWxsIHRoZSBwYXJlbnQgdGhlbWVzIGxvY2F0ZWQgaW4gdGhlIHByb2plY3QgdGhlbWVzIGZvbGRlcnMgYW5kIGluXG4gKiB0aGUgSkFSIGRlcGVuZGVuY2llcyB3aXRoIHJlc3BlY3QgdG8gdGhlIGdpdmVuIGN1c3RvbSB0aGVtZSB3aXRoXG4gKiB7QGNvZGUgdGhlbWVOYW1lfS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGVtZU5hbWUgZ2l2ZW4gY3VzdG9tIHRoZW1lIG5hbWUgdG8gbG9vayBwYXJlbnRzIGZvclxuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgYXBwbGljYXRpb24gdGhlbWUgcGx1Z2luIG1hbmRhdG9yeSBvcHRpb25zLFxuICogQHNlZSB7QGxpbmsgQXBwbGljYXRpb25UaGVtZVBsdWdpbn1cbiAqIEByZXR1cm5zIHtzdHJpbmdbXX0gYXJyYXkgb2YgcGF0aHMgdG8gZm91bmQgcGFyZW50IHRoZW1lcyB3aXRoIHJlc3BlY3QgdG8gdGhlXG4gKiBnaXZlbiBjdXN0b20gdGhlbWVcbiAqL1xuZnVuY3Rpb24gZmluZFBhcmVudFRoZW1lcyh0aGVtZU5hbWUsIG9wdGlvbnMpIHtcbiAgY29uc3QgZXhpc3RpbmdUaGVtZUZvbGRlcnMgPSBbb3B0aW9ucy50aGVtZVJlc291cmNlRm9sZGVyLCAuLi5vcHRpb25zLnRoZW1lUHJvamVjdEZvbGRlcnNdLmZpbHRlcigoZm9sZGVyKSA9PlxuICAgIGV4aXN0c1N5bmMoZm9sZGVyKVxuICApO1xuICByZXR1cm4gY29sbGVjdFBhcmVudFRoZW1lcyh0aGVtZU5hbWUsIGV4aXN0aW5nVGhlbWVGb2xkZXJzLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIGNvbGxlY3RQYXJlbnRUaGVtZXModGhlbWVOYW1lLCB0aGVtZUZvbGRlcnMsIGlzUGFyZW50KSB7XG4gIGxldCBmb3VuZFBhcmVudFRoZW1lcyA9IFtdO1xuICB0aGVtZUZvbGRlcnMuZm9yRWFjaCgoZm9sZGVyKSA9PiB7XG4gICAgY29uc3QgdGhlbWVGb2xkZXIgPSByZXNvbHZlKGZvbGRlciwgdGhlbWVOYW1lKTtcbiAgICBpZiAoZXhpc3RzU3luYyh0aGVtZUZvbGRlcikpIHtcbiAgICAgIGNvbnN0IHRoZW1lUHJvcGVydGllcyA9IGdldFRoZW1lUHJvcGVydGllcyh0aGVtZUZvbGRlcik7XG5cbiAgICAgIGlmICh0aGVtZVByb3BlcnRpZXMucGFyZW50KSB7XG4gICAgICAgIGZvdW5kUGFyZW50VGhlbWVzLnB1c2goLi4uY29sbGVjdFBhcmVudFRoZW1lcyh0aGVtZVByb3BlcnRpZXMucGFyZW50LCB0aGVtZUZvbGRlcnMsIHRydWUpKTtcbiAgICAgICAgaWYgKCFmb3VuZFBhcmVudFRoZW1lcy5sZW5ndGgpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBcIkNvdWxkIG5vdCBsb2NhdGUgZmlsZXMgZm9yIGRlZmluZWQgcGFyZW50IHRoZW1lICdcIiArXG4gICAgICAgICAgICAgIHRoZW1lUHJvcGVydGllcy5wYXJlbnQgK1xuICAgICAgICAgICAgICBcIicuXFxuXCIgK1xuICAgICAgICAgICAgICAnUGxlYXNlIHZlcmlmeSB0aGF0IGRlcGVuZGVuY3kgaXMgYWRkZWQgb3IgdGhlbWUgZm9sZGVyIGV4aXN0cy4nXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gQWRkIGEgdGhlbWUgcGF0aCB0byByZXN1bHQgY29sbGVjdGlvbiBvbmx5IGlmIGEgZ2l2ZW4gdGhlbWVOYW1lXG4gICAgICAvLyBpcyBzdXBwb3NlZCB0byBiZSBhIHBhcmVudCB0aGVtZVxuICAgICAgaWYgKGlzUGFyZW50KSB7XG4gICAgICAgIGZvdW5kUGFyZW50VGhlbWVzLnB1c2godGhlbWVGb2xkZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gIHJldHVybiBmb3VuZFBhcmVudFRoZW1lcztcbn1cblxuZXhwb3J0IHsgcHJvY2Vzc1RoZW1lUmVzb3VyY2VzLCBleHRyYWN0VGhlbWVOYW1lLCBmaW5kUGFyZW50VGhlbWVzIH07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGd1aWxoLkdVSVBDXFxcXEphdmFQcm9qZWN0c1xcXFxjbGVhckNvbnRXZWJBcHBcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxhcHBsaWNhdGlvbi10aGVtZS1wbHVnaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGd1aWxoLkdVSVBDXFxcXEphdmFQcm9qZWN0c1xcXFxjbGVhckNvbnRXZWJBcHBcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxhcHBsaWNhdGlvbi10aGVtZS1wbHVnaW5cXFxcdGhlbWUtZ2VuZXJhdG9yLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ndWlsaC5HVUlQQy9KYXZhUHJvamVjdHMvY2xlYXJDb250V2ViQXBwL2J1aWxkL3BsdWdpbnMvYXBwbGljYXRpb24tdGhlbWUtcGx1Z2luL3RoZW1lLWdlbmVyYXRvci5qc1wiOy8qXG4gKiBDb3B5cmlnaHQgMjAwMC0yMDIzIFZhYWRpbiBMdGQuXG4gKlxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3RcbiAqIHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mXG4gKiB0aGUgTGljZW5zZSBhdFxuICpcbiAqIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVFxuICogV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlXG4gKiBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlclxuICogdGhlIExpY2Vuc2UuXG4gKi9cblxuLyoqXG4gKiBUaGlzIGZpbGUgaGFuZGxlcyB0aGUgZ2VuZXJhdGlvbiBvZiB0aGUgJ1t0aGVtZS1uYW1lXS5qcycgdG9cbiAqIHRoZSB0aGVtZXMvW3RoZW1lLW5hbWVdIGZvbGRlciBhY2NvcmRpbmcgdG8gcHJvcGVydGllcyBmcm9tICd0aGVtZS5qc29uJy5cbiAqL1xuaW1wb3J0IGdsb2IgZnJvbSAnZ2xvYic7XG5pbXBvcnQgeyByZXNvbHZlLCBiYXNlbmFtZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgZXhpc3RzU3luYywgcmVhZEZpbGVTeW5jLCB3cml0ZUZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgY2hlY2tNb2R1bGVzIH0gZnJvbSAnLi90aGVtZS1jb3B5LmpzJztcblxuY29uc3QgeyBzeW5jIH0gPSBnbG9iO1xuXG4vLyBTcGVjaWFsIGZvbGRlciBpbnNpZGUgYSB0aGVtZSBmb3IgY29tcG9uZW50IHRoZW1lcyB0aGF0IGdvIGluc2lkZSB0aGUgY29tcG9uZW50IHNoYWRvdyByb290XG5jb25zdCB0aGVtZUNvbXBvbmVudHNGb2xkZXIgPSAnY29tcG9uZW50cyc7XG4vLyBUaGUgY29udGVudHMgb2YgYSBnbG9iYWwgQ1NTIGZpbGUgd2l0aCB0aGlzIG5hbWUgaW4gYSB0aGVtZSBpcyBhbHdheXMgYWRkZWQgdG9cbi8vIHRoZSBkb2N1bWVudC4gRS5nLiBAZm9udC1mYWNlIG11c3QgYmUgaW4gdGhpc1xuY29uc3QgZG9jdW1lbnRDc3NGaWxlbmFtZSA9ICdkb2N1bWVudC5jc3MnO1xuLy8gc3R5bGVzLmNzcyBpcyB0aGUgb25seSBlbnRyeXBvaW50IGNzcyBmaWxlIHdpdGggZG9jdW1lbnQuY3NzLiBFdmVyeXRoaW5nIGVsc2Ugc2hvdWxkIGJlIGltcG9ydGVkIHVzaW5nIGNzcyBAaW1wb3J0XG5jb25zdCBzdHlsZXNDc3NGaWxlbmFtZSA9ICdzdHlsZXMuY3NzJztcblxuY29uc3QgQ1NTSU1QT1JUX0NPTU1FTlQgPSAnQ1NTSW1wb3J0IGVuZCc7XG5jb25zdCBoZWFkZXJJbXBvcnQgPSBgaW1wb3J0ICdjb25zdHJ1Y3Qtc3R5bGUtc2hlZXRzLXBvbHlmaWxsJztcbmA7XG5cbi8qKlxuICogR2VuZXJhdGUgdGhlIFt0aGVtZU5hbWVdLmpzIGZpbGUgZm9yIHRoZW1lRm9sZGVyIHdoaWNoIGNvbGxlY3RzIGFsbCByZXF1aXJlZCBpbmZvcm1hdGlvbiBmcm9tIHRoZSBmb2xkZXIuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRoZW1lRm9sZGVyIGZvbGRlciBvZiB0aGUgdGhlbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aGVtZU5hbWUgbmFtZSBvZiB0aGUgaGFuZGxlZCB0aGVtZVxuICogQHBhcmFtIHtKU09OfSB0aGVtZVByb3BlcnRpZXMgY29udGVudCBvZiB0aGVtZS5qc29uXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBidWlsZCBvcHRpb25zIChlLmcuIHByb2Qgb3IgZGV2IG1vZGUpXG4gKiBAcmV0dXJucyB7c3RyaW5nfSB0aGVtZSBmaWxlIGNvbnRlbnRcbiAqL1xuZnVuY3Rpb24gd3JpdGVUaGVtZUZpbGVzKHRoZW1lRm9sZGVyLCB0aGVtZU5hbWUsIHRoZW1lUHJvcGVydGllcywgb3B0aW9ucykge1xuICBjb25zdCBwcm9kdWN0aW9uTW9kZSA9ICFvcHRpb25zLmRldk1vZGU7XG4gIGNvbnN0IHVzZURldlNlcnZlck9ySW5Qcm9kdWN0aW9uTW9kZSA9ICFvcHRpb25zLnVzZURldkJ1bmRsZTtcbiAgY29uc3Qgb3V0cHV0Rm9sZGVyID0gb3B0aW9ucy5mcm9udGVuZEdlbmVyYXRlZEZvbGRlcjtcbiAgY29uc3Qgc3R5bGVzID0gcmVzb2x2ZSh0aGVtZUZvbGRlciwgc3R5bGVzQ3NzRmlsZW5hbWUpO1xuICBjb25zdCBkb2N1bWVudENzc0ZpbGUgPSByZXNvbHZlKHRoZW1lRm9sZGVyLCBkb2N1bWVudENzc0ZpbGVuYW1lKTtcbiAgY29uc3QgYXV0b0luamVjdENvbXBvbmVudHMgPSB0aGVtZVByb3BlcnRpZXMuYXV0b0luamVjdENvbXBvbmVudHMgPz8gdHJ1ZTtcbiAgY29uc3QgZ2xvYmFsRmlsZW5hbWUgPSAndGhlbWUtJyArIHRoZW1lTmFtZSArICcuZ2xvYmFsLmdlbmVyYXRlZC5qcyc7XG4gIGNvbnN0IGNvbXBvbmVudHNGaWxlbmFtZSA9ICd0aGVtZS0nICsgdGhlbWVOYW1lICsgJy5jb21wb25lbnRzLmdlbmVyYXRlZC5qcyc7XG4gIGNvbnN0IHRoZW1lRmlsZW5hbWUgPSAndGhlbWUtJyArIHRoZW1lTmFtZSArICcuZ2VuZXJhdGVkLmpzJztcblxuICBsZXQgdGhlbWVGaWxlQ29udGVudCA9IGhlYWRlckltcG9ydDtcbiAgbGV0IGdsb2JhbEltcG9ydENvbnRlbnQgPSAnLy8gV2hlbiB0aGlzIGZpbGUgaXMgaW1wb3J0ZWQsIGdsb2JhbCBzdHlsZXMgYXJlIGF1dG9tYXRpY2FsbHkgYXBwbGllZFxcbic7XG4gIGxldCBjb21wb25lbnRzRmlsZUNvbnRlbnQgPSAnJztcbiAgdmFyIGNvbXBvbmVudHNGaWxlcztcblxuICBpZiAoYXV0b0luamVjdENvbXBvbmVudHMpIHtcbiAgICBjb21wb25lbnRzRmlsZXMgPSBzeW5jKCcqLmNzcycsIHtcbiAgICAgIGN3ZDogcmVzb2x2ZSh0aGVtZUZvbGRlciwgdGhlbWVDb21wb25lbnRzRm9sZGVyKSxcbiAgICAgIG5vZGlyOiB0cnVlXG4gICAgfSk7XG5cbiAgICBpZiAoY29tcG9uZW50c0ZpbGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbXBvbmVudHNGaWxlQ29udGVudCArPVxuICAgICAgICBcImltcG9ydCB7IHVuc2FmZUNTUywgcmVnaXN0ZXJTdHlsZXMgfSBmcm9tICdAdmFhZGluL3ZhYWRpbi10aGVtYWJsZS1taXhpbi9yZWdpc3Rlci1zdHlsZXMnO1xcblwiO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aGVtZVByb3BlcnRpZXMucGFyZW50KSB7XG4gICAgdGhlbWVGaWxlQ29udGVudCArPSBgaW1wb3J0IHsgYXBwbHlUaGVtZSBhcyBhcHBseUJhc2VUaGVtZSB9IGZyb20gJy4vdGhlbWUtJHt0aGVtZVByb3BlcnRpZXMucGFyZW50fS5nZW5lcmF0ZWQuanMnO1xcbmA7XG4gIH1cblxuICB0aGVtZUZpbGVDb250ZW50ICs9IGBpbXBvcnQgeyBpbmplY3RHbG9iYWxDc3MgfSBmcm9tICdGcm9udGVuZC9nZW5lcmF0ZWQvamFyLXJlc291cmNlcy90aGVtZS11dGlsLmpzJztcXG5gO1xuICB0aGVtZUZpbGVDb250ZW50ICs9IGBpbXBvcnQgJy4vJHtjb21wb25lbnRzRmlsZW5hbWV9JztcXG5gO1xuXG4gIHRoZW1lRmlsZUNvbnRlbnQgKz0gYGxldCBuZWVkc1JlbG9hZE9uQ2hhbmdlcyA9IGZhbHNlO1xcbmA7XG4gIGNvbnN0IGltcG9ydHMgPSBbXTtcbiAgY29uc3QgY29tcG9uZW50Q3NzSW1wb3J0cyA9IFtdO1xuICBjb25zdCBnbG9iYWxGaWxlQ29udGVudCA9IFtdO1xuICBjb25zdCBnbG9iYWxDc3NDb2RlID0gW107XG4gIGNvbnN0IHNoYWRvd09ubHlDc3MgPSBbXTtcbiAgY29uc3QgY29tcG9uZW50Q3NzQ29kZSA9IFtdO1xuICBjb25zdCBwYXJlbnRUaGVtZSA9IHRoZW1lUHJvcGVydGllcy5wYXJlbnQgPyAnYXBwbHlCYXNlVGhlbWUodGFyZ2V0KTtcXG4nIDogJyc7XG4gIGNvbnN0IHBhcmVudFRoZW1lR2xvYmFsSW1wb3J0ID0gdGhlbWVQcm9wZXJ0aWVzLnBhcmVudFxuICAgID8gYGltcG9ydCAnLi90aGVtZS0ke3RoZW1lUHJvcGVydGllcy5wYXJlbnR9Lmdsb2JhbC5nZW5lcmF0ZWQuanMnO1xcbmBcbiAgICA6ICcnO1xuXG4gIGNvbnN0IHRoZW1lSWRlbnRpZmllciA9ICdfdmFhZGludGhlbWVfJyArIHRoZW1lTmFtZSArICdfJztcbiAgY29uc3QgbHVtb0Nzc0ZsYWcgPSAnX3ZhYWRpbnRoZW1lbHVtb2ltcG9ydHNfJztcbiAgY29uc3QgZ2xvYmFsQ3NzRmxhZyA9IHRoZW1lSWRlbnRpZmllciArICdnbG9iYWxDc3MnO1xuICBjb25zdCBjb21wb25lbnRDc3NGbGFnID0gdGhlbWVJZGVudGlmaWVyICsgJ2NvbXBvbmVudENzcyc7XG5cbiAgaWYgKCFleGlzdHNTeW5jKHN0eWxlcykpIHtcbiAgICBpZiAocHJvZHVjdGlvbk1vZGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgc3R5bGVzLmNzcyBmaWxlIGlzIG1pc3NpbmcgYW5kIGlzIG5lZWRlZCBmb3IgJyR7dGhlbWVOYW1lfScgaW4gZm9sZGVyICcke3RoZW1lRm9sZGVyfSdgKTtcbiAgICB9XG4gICAgd3JpdGVGaWxlU3luYyhcbiAgICAgIHN0eWxlcyxcbiAgICAgICcvKiBJbXBvcnQgeW91ciBhcHBsaWNhdGlvbiBnbG9iYWwgY3NzIGZpbGVzIGhlcmUgb3IgYWRkIHRoZSBzdHlsZXMgZGlyZWN0bHkgdG8gdGhpcyBmaWxlICovJyxcbiAgICAgICd1dGY4J1xuICAgICk7XG4gIH1cblxuICAvLyBzdHlsZXMuY3NzIHdpbGwgYWx3YXlzIGJlIGF2YWlsYWJsZSBhcyB3ZSB3cml0ZSBvbmUgaWYgaXQgZG9lc24ndCBleGlzdC5cbiAgbGV0IGZpbGVuYW1lID0gYmFzZW5hbWUoc3R5bGVzKTtcbiAgbGV0IHZhcmlhYmxlID0gY2FtZWxDYXNlKGZpbGVuYW1lKTtcblxuICAvKiBMVU1PICovXG4gIGNvbnN0IGx1bW9JbXBvcnRzID0gdGhlbWVQcm9wZXJ0aWVzLmx1bW9JbXBvcnRzIHx8IFsnY29sb3InLCAndHlwb2dyYXBoeSddO1xuICBpZiAobHVtb0ltcG9ydHMpIHtcbiAgICBsdW1vSW1wb3J0cy5mb3JFYWNoKChsdW1vSW1wb3J0KSA9PiB7XG4gICAgICBpbXBvcnRzLnB1c2goYGltcG9ydCB7ICR7bHVtb0ltcG9ydH0gfSBmcm9tICdAdmFhZGluL3ZhYWRpbi1sdW1vLXN0eWxlcy8ke2x1bW9JbXBvcnR9LmpzJztcXG5gKTtcbiAgICAgIGlmIChsdW1vSW1wb3J0ID09PSAndXRpbGl0eScgfHwgbHVtb0ltcG9ydCA9PT0gJ2JhZGdlJyB8fCBsdW1vSW1wb3J0ID09PSAndHlwb2dyYXBoeScgfHwgbHVtb0ltcG9ydCA9PT0gJ2NvbG9yJykge1xuICAgICAgICAvLyBJbmplY3QgaW50byBtYWluIGRvY3VtZW50IHRoZSBzYW1lIHdheSBhcyBvdGhlciBMdW1vIHN0eWxlcyBhcmUgaW5qZWN0ZWRcbiAgICAgICAgaW1wb3J0cy5wdXNoKGBpbXBvcnQgJ0B2YWFkaW4vdmFhZGluLWx1bW8tc3R5bGVzLyR7bHVtb0ltcG9ydH0tZ2xvYmFsLmpzJztcXG5gKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGx1bW9JbXBvcnRzLmZvckVhY2goKGx1bW9JbXBvcnQpID0+IHtcbiAgICAgIC8vIEx1bW8gaXMgaW5qZWN0ZWQgdG8gdGhlIGRvY3VtZW50IGJ5IEx1bW8gaXRzZWxmXG4gICAgICBzaGFkb3dPbmx5Q3NzLnB1c2goYHJlbW92ZXJzLnB1c2goaW5qZWN0R2xvYmFsQ3NzKCR7bHVtb0ltcG9ydH0uY3NzVGV4dCwgJycsIHRhcmdldCwgdHJ1ZSkpO1xcbmApO1xuICAgIH0pO1xuICB9XG5cbiAgLyogVGhlbWUgKi9cbiAgaWYgKHVzZURldlNlcnZlck9ySW5Qcm9kdWN0aW9uTW9kZSkge1xuICAgIGdsb2JhbEZpbGVDb250ZW50LnB1c2gocGFyZW50VGhlbWVHbG9iYWxJbXBvcnQpO1xuICAgIGdsb2JhbEZpbGVDb250ZW50LnB1c2goYGltcG9ydCAndGhlbWVzLyR7dGhlbWVOYW1lfS8ke2ZpbGVuYW1lfSc7XFxuYCk7XG5cbiAgICBpbXBvcnRzLnB1c2goYGltcG9ydCAke3ZhcmlhYmxlfSBmcm9tICd0aGVtZXMvJHt0aGVtZU5hbWV9LyR7ZmlsZW5hbWV9P2lubGluZSc7XFxuYCk7XG4gICAgc2hhZG93T25seUNzcy5wdXNoKGByZW1vdmVycy5wdXNoKGluamVjdEdsb2JhbENzcygke3ZhcmlhYmxlfS50b1N0cmluZygpLCAnJywgdGFyZ2V0KSk7XFxuICAgIGApO1xuICB9XG4gIGlmIChleGlzdHNTeW5jKGRvY3VtZW50Q3NzRmlsZSkpIHtcbiAgICBmaWxlbmFtZSA9IGJhc2VuYW1lKGRvY3VtZW50Q3NzRmlsZSk7XG4gICAgdmFyaWFibGUgPSBjYW1lbENhc2UoZmlsZW5hbWUpO1xuXG4gICAgaWYgKHVzZURldlNlcnZlck9ySW5Qcm9kdWN0aW9uTW9kZSkge1xuICAgICAgZ2xvYmFsRmlsZUNvbnRlbnQucHVzaChgaW1wb3J0ICd0aGVtZXMvJHt0aGVtZU5hbWV9LyR7ZmlsZW5hbWV9JztcXG5gKTtcblxuICAgICAgaW1wb3J0cy5wdXNoKGBpbXBvcnQgJHt2YXJpYWJsZX0gZnJvbSAndGhlbWVzLyR7dGhlbWVOYW1lfS8ke2ZpbGVuYW1lfT9pbmxpbmUnO1xcbmApO1xuICAgICAgc2hhZG93T25seUNzcy5wdXNoKGByZW1vdmVycy5wdXNoKGluamVjdEdsb2JhbENzcygke3ZhcmlhYmxlfS50b1N0cmluZygpLCcnLCBkb2N1bWVudCkpO1xcbiAgICBgKTtcbiAgICB9XG4gIH1cblxuICBsZXQgaSA9IDA7XG4gIGlmICh0aGVtZVByb3BlcnRpZXMuZG9jdW1lbnRDc3MpIHtcbiAgICBjb25zdCBtaXNzaW5nTW9kdWxlcyA9IGNoZWNrTW9kdWxlcyh0aGVtZVByb3BlcnRpZXMuZG9jdW1lbnRDc3MpO1xuICAgIGlmIChtaXNzaW5nTW9kdWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgXCJNaXNzaW5nIG5wbSBtb2R1bGVzIG9yIGZpbGVzICdcIiArXG4gICAgICAgICAgbWlzc2luZ01vZHVsZXMuam9pbihcIicsICdcIikgK1xuICAgICAgICAgIFwiJyBmb3IgZG9jdW1lbnRDc3MgbWFya2VkIGluICd0aGVtZS5qc29uJy5cXG5cIiArXG4gICAgICAgICAgXCJJbnN0YWxsIG9yIHVwZGF0ZSBwYWNrYWdlKHMpIGJ5IGFkZGluZyBhIEBOcG1QYWNrYWdlIGFubm90YXRpb24gb3IgaW5zdGFsbCBpdCB1c2luZyAnbnBtL3BucG0gaSdcIlxuICAgICAgKTtcbiAgICB9XG4gICAgdGhlbWVQcm9wZXJ0aWVzLmRvY3VtZW50Q3NzLmZvckVhY2goKGNzc0ltcG9ydCkgPT4ge1xuICAgICAgY29uc3QgdmFyaWFibGUgPSAnbW9kdWxlJyArIGkrKztcbiAgICAgIGltcG9ydHMucHVzaChgaW1wb3J0ICR7dmFyaWFibGV9IGZyb20gJyR7Y3NzSW1wb3J0fT9pbmxpbmUnO1xcbmApO1xuICAgICAgLy8gRHVlIHRvIGNocm9tZSBidWcgaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MzM2ODc2IGZvbnQtZmFjZSB3aWxsIG5vdCB3b3JrXG4gICAgICAvLyBpbnNpZGUgc2hhZG93Um9vdCBzbyB3ZSBuZWVkIHRvIGluamVjdCBpdCB0aGVyZSBhbHNvLlxuICAgICAgZ2xvYmFsQ3NzQ29kZS5wdXNoKGBpZih0YXJnZXQgIT09IGRvY3VtZW50KSB7XG4gICAgICAgIHJlbW92ZXJzLnB1c2goaW5qZWN0R2xvYmFsQ3NzKCR7dmFyaWFibGV9LnRvU3RyaW5nKCksICcnLCB0YXJnZXQpKTtcbiAgICB9XFxuICAgIGApO1xuICAgICAgZ2xvYmFsQ3NzQ29kZS5wdXNoKFxuICAgICAgICBgcmVtb3ZlcnMucHVzaChpbmplY3RHbG9iYWxDc3MoJHt2YXJpYWJsZX0udG9TdHJpbmcoKSwgJyR7Q1NTSU1QT1JUX0NPTU1FTlR9JywgZG9jdW1lbnQpKTtcXG4gICAgYFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuICBpZiAodGhlbWVQcm9wZXJ0aWVzLmltcG9ydENzcykge1xuICAgIGNvbnN0IG1pc3NpbmdNb2R1bGVzID0gY2hlY2tNb2R1bGVzKHRoZW1lUHJvcGVydGllcy5pbXBvcnRDc3MpO1xuICAgIGlmIChtaXNzaW5nTW9kdWxlcy5sZW5ndGggPiAwKSB7XG4gICAgICB0aHJvdyBFcnJvcihcbiAgICAgICAgXCJNaXNzaW5nIG5wbSBtb2R1bGVzIG9yIGZpbGVzICdcIiArXG4gICAgICAgICAgbWlzc2luZ01vZHVsZXMuam9pbihcIicsICdcIikgK1xuICAgICAgICAgIFwiJyBmb3IgaW1wb3J0Q3NzIG1hcmtlZCBpbiAndGhlbWUuanNvbicuXFxuXCIgK1xuICAgICAgICAgIFwiSW5zdGFsbCBvciB1cGRhdGUgcGFja2FnZShzKSBieSBhZGRpbmcgYSBATnBtUGFja2FnZSBhbm5vdGF0aW9uIG9yIGluc3RhbGwgaXQgdXNpbmcgJ25wbS9wbnBtIGknXCJcbiAgICAgICk7XG4gICAgfVxuICAgIHRoZW1lUHJvcGVydGllcy5pbXBvcnRDc3MuZm9yRWFjaCgoY3NzUGF0aCkgPT4ge1xuICAgICAgY29uc3QgdmFyaWFibGUgPSAnbW9kdWxlJyArIGkrKztcbiAgICAgIGdsb2JhbEZpbGVDb250ZW50LnB1c2goYGltcG9ydCAnJHtjc3NQYXRofSc7XFxuYCk7XG4gICAgICBpbXBvcnRzLnB1c2goYGltcG9ydCAke3ZhcmlhYmxlfSBmcm9tICcke2Nzc1BhdGh9P2lubGluZSc7XFxuYCk7XG4gICAgICBzaGFkb3dPbmx5Q3NzLnB1c2goYHJlbW92ZXJzLnB1c2goaW5qZWN0R2xvYmFsQ3NzKCR7dmFyaWFibGV9LnRvU3RyaW5nKCksICcke0NTU0lNUE9SVF9DT01NRU5UfScsIHRhcmdldCkpO1xcbmApO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGF1dG9JbmplY3RDb21wb25lbnRzKSB7XG4gICAgY29tcG9uZW50c0ZpbGVzLmZvckVhY2goKGNvbXBvbmVudENzcykgPT4ge1xuICAgICAgY29uc3QgZmlsZW5hbWUgPSBiYXNlbmFtZShjb21wb25lbnRDc3MpO1xuICAgICAgY29uc3QgdGFnID0gZmlsZW5hbWUucmVwbGFjZSgnLmNzcycsICcnKTtcbiAgICAgIGNvbnN0IHZhcmlhYmxlID0gY2FtZWxDYXNlKGZpbGVuYW1lKTtcbiAgICAgIGNvbXBvbmVudENzc0ltcG9ydHMucHVzaChcbiAgICAgICAgYGltcG9ydCAke3ZhcmlhYmxlfSBmcm9tICd0aGVtZXMvJHt0aGVtZU5hbWV9LyR7dGhlbWVDb21wb25lbnRzRm9sZGVyfS8ke2ZpbGVuYW1lfT9pbmxpbmUnO1xcbmBcbiAgICAgICk7XG4gICAgICAvLyBEb24ndCBmb3JtYXQgYXMgdGhlIGdlbmVyYXRlZCBmaWxlIGZvcm1hdHRpbmcgd2lsbCBnZXQgd29ua3khXG4gICAgICBjb25zdCBjb21wb25lbnRTdHJpbmcgPSBgcmVnaXN0ZXJTdHlsZXMoXG4gICAgICAgICcke3RhZ30nLFxuICAgICAgICB1bnNhZmVDU1MoJHt2YXJpYWJsZX0udG9TdHJpbmcoKSlcbiAgICAgICk7XG4gICAgICBgO1xuICAgICAgY29tcG9uZW50Q3NzQ29kZS5wdXNoKGNvbXBvbmVudFN0cmluZyk7XG4gICAgfSk7XG4gIH1cblxuICB0aGVtZUZpbGVDb250ZW50ICs9IGltcG9ydHMuam9pbignJyk7XG5cbiAgLy8gRG9uJ3QgZm9ybWF0IGFzIHRoZSBnZW5lcmF0ZWQgZmlsZSBmb3JtYXR0aW5nIHdpbGwgZ2V0IHdvbmt5IVxuICAvLyBJZiB0YXJnZXRzIGNoZWNrIHRoYXQgd2Ugb25seSByZWdpc3RlciB0aGUgc3R5bGUgcGFydHMgb25jZSwgY2hlY2tzIGV4aXN0IGZvciBnbG9iYWwgY3NzIGFuZCBjb21wb25lbnQgY3NzXG4gIGNvbnN0IHRoZW1lRmlsZUFwcGx5ID0gYFxuICBsZXQgdGhlbWVSZW1vdmVycyA9IG5ldyBXZWFrTWFwKCk7XG4gIGxldCB0YXJnZXRzID0gW107XG5cbiAgZXhwb3J0IGNvbnN0IGFwcGx5VGhlbWUgPSAodGFyZ2V0KSA9PiB7XG4gICAgY29uc3QgcmVtb3ZlcnMgPSBbXTtcbiAgICBpZiAodGFyZ2V0ICE9PSBkb2N1bWVudCkge1xuICAgICAgJHtzaGFkb3dPbmx5Q3NzLmpvaW4oJycpfVxuICAgIH1cbiAgICAke3BhcmVudFRoZW1lfVxuICAgICR7Z2xvYmFsQ3NzQ29kZS5qb2luKCcnKX1cblxuICAgIGlmIChpbXBvcnQubWV0YS5ob3QpIHtcbiAgICAgIHRhcmdldHMucHVzaChuZXcgV2Vha1JlZih0YXJnZXQpKTtcbiAgICAgIHRoZW1lUmVtb3ZlcnMuc2V0KHRhcmdldCwgcmVtb3ZlcnMpO1xuICAgIH1cblxuICB9XG4gIFxuYDtcbiAgY29tcG9uZW50c0ZpbGVDb250ZW50ICs9IGBcbiR7Y29tcG9uZW50Q3NzSW1wb3J0cy5qb2luKCcnKX1cblxuaWYgKCFkb2N1bWVudFsnJHtjb21wb25lbnRDc3NGbGFnfSddKSB7XG4gICR7Y29tcG9uZW50Q3NzQ29kZS5qb2luKCcnKX1cbiAgZG9jdW1lbnRbJyR7Y29tcG9uZW50Q3NzRmxhZ30nXSA9IHRydWU7XG59XG5cbmlmIChpbXBvcnQubWV0YS5ob3QpIHtcbiAgaW1wb3J0Lm1ldGEuaG90LmFjY2VwdCgobW9kdWxlKSA9PiB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9KTtcbn1cblxuYDtcblxuICB0aGVtZUZpbGVDb250ZW50ICs9IHRoZW1lRmlsZUFwcGx5O1xuICB0aGVtZUZpbGVDb250ZW50ICs9IGBcbmlmIChpbXBvcnQubWV0YS5ob3QpIHtcbiAgaW1wb3J0Lm1ldGEuaG90LmFjY2VwdCgobW9kdWxlKSA9PiB7XG5cbiAgICBpZiAobmVlZHNSZWxvYWRPbkNoYW5nZXMpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGFyZ2V0cy5mb3JFYWNoKHRhcmdldFJlZiA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRhcmdldFJlZi5kZXJlZigpO1xuICAgICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgICAgdGhlbWVSZW1vdmVycy5nZXQodGFyZ2V0KS5mb3JFYWNoKHJlbW92ZXIgPT4gcmVtb3ZlcigpKVxuICAgICAgICAgIG1vZHVsZS5hcHBseVRoZW1lKHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9KTtcblxuICBpbXBvcnQubWV0YS5ob3Qub24oJ3ZpdGU6YWZ0ZXJVcGRhdGUnLCAodXBkYXRlKSA9PiB7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3ZhYWRpbi10aGVtZS11cGRhdGVkJywgeyBkZXRhaWw6IHVwZGF0ZSB9KSk7XG4gIH0pO1xufVxuXG5gO1xuXG4gIGdsb2JhbEltcG9ydENvbnRlbnQgKz0gYFxuJHtnbG9iYWxGaWxlQ29udGVudC5qb2luKCcnKX1cbmA7XG5cbiAgd3JpdGVJZkNoYW5nZWQocmVzb2x2ZShvdXRwdXRGb2xkZXIsIGdsb2JhbEZpbGVuYW1lKSwgZ2xvYmFsSW1wb3J0Q29udGVudCk7XG4gIHdyaXRlSWZDaGFuZ2VkKHJlc29sdmUob3V0cHV0Rm9sZGVyLCB0aGVtZUZpbGVuYW1lKSwgdGhlbWVGaWxlQ29udGVudCk7XG4gIHdyaXRlSWZDaGFuZ2VkKHJlc29sdmUob3V0cHV0Rm9sZGVyLCBjb21wb25lbnRzRmlsZW5hbWUpLCBjb21wb25lbnRzRmlsZUNvbnRlbnQpO1xufVxuXG5mdW5jdGlvbiB3cml0ZUlmQ2hhbmdlZChmaWxlLCBkYXRhKSB7XG4gIGlmICghZXhpc3RzU3luYyhmaWxlKSB8fCByZWFkRmlsZVN5bmMoZmlsZSwgeyBlbmNvZGluZzogJ3V0Zi04JyB9KSAhPT0gZGF0YSkge1xuICAgIHdyaXRlRmlsZVN5bmMoZmlsZSwgZGF0YSk7XG4gIH1cbn1cblxuLyoqXG4gKiBNYWtlIGdpdmVuIHN0cmluZyBpbnRvIGNhbWVsQ2FzZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIHN0cmluZyB0byBtYWtlIGludG8gY2FtZUNhc2VcbiAqIEByZXR1cm5zIHtzdHJpbmd9IGNhbWVsQ2FzZWQgdmVyc2lvblxuICovXG5mdW5jdGlvbiBjYW1lbENhc2Uoc3RyKSB7XG4gIHJldHVybiBzdHJcbiAgICAucmVwbGFjZSgvKD86Xlxcd3xbQS1aXXxcXGJcXHcpL2csIGZ1bmN0aW9uICh3b3JkLCBpbmRleCkge1xuICAgICAgcmV0dXJuIGluZGV4ID09PSAwID8gd29yZC50b0xvd2VyQ2FzZSgpIDogd29yZC50b1VwcGVyQ2FzZSgpO1xuICAgIH0pXG4gICAgLnJlcGxhY2UoL1xccysvZywgJycpXG4gICAgLnJlcGxhY2UoL1xcLnxcXC0vZywgJycpO1xufVxuXG5leHBvcnQgeyB3cml0ZVRoZW1lRmlsZXMgfTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ3VpbGguR1VJUENcXFxcSmF2YVByb2plY3RzXFxcXGNsZWFyQ29udFdlYkFwcFxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXGFwcGxpY2F0aW9uLXRoZW1lLXBsdWdpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ3VpbGguR1VJUENcXFxcSmF2YVByb2plY3RzXFxcXGNsZWFyQ29udFdlYkFwcFxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXGFwcGxpY2F0aW9uLXRoZW1lLXBsdWdpblxcXFx0aGVtZS1jb3B5LmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9ndWlsaC5HVUlQQy9KYXZhUHJvamVjdHMvY2xlYXJDb250V2ViQXBwL2J1aWxkL3BsdWdpbnMvYXBwbGljYXRpb24tdGhlbWUtcGx1Z2luL3RoZW1lLWNvcHkuanNcIjsvKlxuICogQ29weXJpZ2h0IDIwMDAtMjAyMyBWYWFkaW4gTHRkLlxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90XG4gKiB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZlxuICogdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVRcbiAqIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZVxuICogTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXJcbiAqIHRoZSBMaWNlbnNlLlxuICovXG5cbi8qKlxuICogVGhpcyBjb250YWlucyBmdW5jdGlvbnMgYW5kIGZlYXR1cmVzIHVzZWQgdG8gY29weSB0aGVtZSBmaWxlcy5cbiAqL1xuXG5pbXBvcnQgeyByZWFkZGlyU3luYywgc3RhdFN5bmMsIG1rZGlyU3luYywgZXhpc3RzU3luYywgY29weUZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgcmVzb2x2ZSwgYmFzZW5hbWUsIHJlbGF0aXZlLCBleHRuYW1lIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgZ2xvYiBmcm9tICdnbG9iJztcbmltcG9ydCBta2RpcnAgZnJvbSAnbWtkaXJwJztcblxuY29uc3QgeyBzeW5jIH0gPSBnbG9iO1xuY29uc3QgeyBzeW5jOiBta2RpcnBTeW5jIH0gPSBta2RpcnA7XG5cbmNvbnN0IGlnbm9yZWRGaWxlRXh0ZW5zaW9ucyA9IFsnLmNzcycsICcuanMnLCAnLmpzb24nXTtcblxuLyoqXG4gKiBDb3B5IHRoZW1lIHN0YXRpYyByZXNvdXJjZXMgdG8gc3RhdGljIGFzc2V0cyBmb2xkZXIuIEFsbCBmaWxlcyBpbiB0aGUgdGhlbWVcbiAqIGZvbGRlciB3aWxsIGJlIGNvcGllZCBleGNsdWRpbmcgY3NzLCBqcyBhbmQganNvbiBmaWxlcyB0aGF0IHdpbGwgYmVcbiAqIGhhbmRsZWQgYnkgd2VicGFjayBhbmQgbm90IGJlIHNoYXJlZCBhcyBzdGF0aWMgZmlsZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRoZW1lRm9sZGVyIEZvbGRlciB3aXRoIHRoZW1lIGZpbGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9qZWN0U3RhdGljQXNzZXRzT3V0cHV0Rm9sZGVyIHJlc291cmNlcyBvdXRwdXQgZm9sZGVyXG4gKiBAcGFyYW0ge29iamVjdH0gbG9nZ2VyIHBsdWdpbiBsb2dnZXJcbiAqL1xuZnVuY3Rpb24gY29weVRoZW1lUmVzb3VyY2VzKHRoZW1lRm9sZGVyLCBwcm9qZWN0U3RhdGljQXNzZXRzT3V0cHV0Rm9sZGVyLCBsb2dnZXIpIHtcbiAgY29uc3Qgc3RhdGljQXNzZXRzVGhlbWVGb2xkZXIgPSByZXNvbHZlKHByb2plY3RTdGF0aWNBc3NldHNPdXRwdXRGb2xkZXIsICd0aGVtZXMnLCBiYXNlbmFtZSh0aGVtZUZvbGRlcikpO1xuICBjb25zdCBjb2xsZWN0aW9uID0gY29sbGVjdEZvbGRlcnModGhlbWVGb2xkZXIsIGxvZ2dlcik7XG5cbiAgLy8gT25seSBjcmVhdGUgYXNzZXRzIGZvbGRlciBpZiB0aGVyZSBhcmUgZmlsZXMgdG8gY29weS5cbiAgaWYgKGNvbGxlY3Rpb24uZmlsZXMubGVuZ3RoID4gMCkge1xuICAgIG1rZGlycFN5bmMoc3RhdGljQXNzZXRzVGhlbWVGb2xkZXIpO1xuICAgIC8vIGNyZWF0ZSBmb2xkZXJzIHdpdGhcbiAgICBjb2xsZWN0aW9uLmRpcmVjdG9yaWVzLmZvckVhY2goKGRpcmVjdG9yeSkgPT4ge1xuICAgICAgY29uc3QgcmVsYXRpdmVEaXJlY3RvcnkgPSByZWxhdGl2ZSh0aGVtZUZvbGRlciwgZGlyZWN0b3J5KTtcbiAgICAgIGNvbnN0IHRhcmdldERpcmVjdG9yeSA9IHJlc29sdmUoc3RhdGljQXNzZXRzVGhlbWVGb2xkZXIsIHJlbGF0aXZlRGlyZWN0b3J5KTtcblxuICAgICAgbWtkaXJwU3luYyh0YXJnZXREaXJlY3RvcnkpO1xuICAgIH0pO1xuXG4gICAgY29sbGVjdGlvbi5maWxlcy5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICBjb25zdCByZWxhdGl2ZUZpbGUgPSByZWxhdGl2ZSh0aGVtZUZvbGRlciwgZmlsZSk7XG4gICAgICBjb25zdCB0YXJnZXRGaWxlID0gcmVzb2x2ZShzdGF0aWNBc3NldHNUaGVtZUZvbGRlciwgcmVsYXRpdmVGaWxlKTtcbiAgICAgIGNvcHlGaWxlSWZBYnNlbnRPck5ld2VyKGZpbGUsIHRhcmdldEZpbGUsIGxvZ2dlcik7XG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBDb2xsZWN0IGFsbCBmb2xkZXJzIHdpdGggY29weWFibGUgZmlsZXMgYW5kIGFsbCBmaWxlcyB0byBiZSBjb3BpZWQuXG4gKiBGb2xlZCB3aWxsIG5vdCBiZSBhZGRlZCBpZiBubyBmaWxlcyBpbiBmb2xkZXIgb3Igc3ViZm9sZGVycy5cbiAqXG4gKiBGaWxlcyB3aWxsIG5vdCBjb250YWluIGZpbGVzIHdpdGggaWdub3JlZCBleHRlbnNpb25zIGFuZCBmb2xkZXJzIG9ubHkgY29udGFpbmluZyBpZ25vcmVkIGZpbGVzIHdpbGwgbm90IGJlIGFkZGVkLlxuICpcbiAqIEBwYXJhbSBmb2xkZXJUb0NvcHkgZm9sZGVyIHdlIHdpbGwgY29weSBmaWxlcyBmcm9tXG4gKiBAcGFyYW0gbG9nZ2VyIHBsdWdpbiBsb2dnZXJcbiAqIEByZXR1cm4ge3tkaXJlY3RvcmllczogW10sIGZpbGVzOiBbXX19IG9iamVjdCBjb250YWluaW5nIGRpcmVjdG9yaWVzIHRvIGNyZWF0ZSBhbmQgZmlsZXMgdG8gY29weVxuICovXG5mdW5jdGlvbiBjb2xsZWN0Rm9sZGVycyhmb2xkZXJUb0NvcHksIGxvZ2dlcikge1xuICBjb25zdCBjb2xsZWN0aW9uID0geyBkaXJlY3RvcmllczogW10sIGZpbGVzOiBbXSB9O1xuICBsb2dnZXIudHJhY2UoJ2ZpbGVzIGluIGRpcmVjdG9yeScsIHJlYWRkaXJTeW5jKGZvbGRlclRvQ29weSkpO1xuICByZWFkZGlyU3luYyhmb2xkZXJUb0NvcHkpLmZvckVhY2goKGZpbGUpID0+IHtcbiAgICBjb25zdCBmaWxlVG9Db3B5ID0gcmVzb2x2ZShmb2xkZXJUb0NvcHksIGZpbGUpO1xuICAgIHRyeSB7XG4gICAgICBpZiAoc3RhdFN5bmMoZmlsZVRvQ29weSkuaXNEaXJlY3RvcnkoKSkge1xuICAgICAgICBsb2dnZXIuZGVidWcoJ0dvaW5nIHRocm91Z2ggZGlyZWN0b3J5JywgZmlsZVRvQ29weSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IGNvbGxlY3RGb2xkZXJzKGZpbGVUb0NvcHksIGxvZ2dlcik7XG4gICAgICAgIGlmIChyZXN1bHQuZmlsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbGxlY3Rpb24uZGlyZWN0b3JpZXMucHVzaChmaWxlVG9Db3B5KTtcbiAgICAgICAgICBsb2dnZXIuZGVidWcoJ0FkZGluZyBkaXJlY3RvcnknLCBmaWxlVG9Db3B5KTtcbiAgICAgICAgICBjb2xsZWN0aW9uLmRpcmVjdG9yaWVzLnB1c2guYXBwbHkoY29sbGVjdGlvbi5kaXJlY3RvcmllcywgcmVzdWx0LmRpcmVjdG9yaWVzKTtcbiAgICAgICAgICBjb2xsZWN0aW9uLmZpbGVzLnB1c2guYXBwbHkoY29sbGVjdGlvbi5maWxlcywgcmVzdWx0LmZpbGVzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghaWdub3JlZEZpbGVFeHRlbnNpb25zLmluY2x1ZGVzKGV4dG5hbWUoZmlsZVRvQ29weSkpKSB7XG4gICAgICAgIGxvZ2dlci5kZWJ1ZygnQWRkaW5nIGZpbGUnLCBmaWxlVG9Db3B5KTtcbiAgICAgICAgY29sbGVjdGlvbi5maWxlcy5wdXNoKGZpbGVUb0NvcHkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBoYW5kbGVOb1N1Y2hGaWxlRXJyb3IoZmlsZVRvQ29weSwgZXJyb3IsIGxvZ2dlcik7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGNvbGxlY3Rpb247XG59XG5cbi8qKlxuICogQ29weSBhbnkgc3RhdGljIG5vZGVfbW9kdWxlcyBhc3NldHMgbWFya2VkIGluIHRoZW1lLmpzb24gdG9cbiAqIHByb2plY3Qgc3RhdGljIGFzc2V0cyBmb2xkZXIuXG4gKlxuICogVGhlIHRoZW1lLmpzb24gY29udGVudCBmb3IgYXNzZXRzIGlzIHNldCB1cCBhczpcbiAqIHtcbiAqICAgYXNzZXRzOiB7XG4gKiAgICAgXCJub2RlX21vZHVsZSBpZGVudGlmaWVyXCI6IHtcbiAqICAgICAgIFwiY29weS1ydWxlXCI6IFwidGFyZ2V0L2ZvbGRlclwiLFxuICogICAgIH1cbiAqICAgfVxuICogfVxuICpcbiAqIFRoaXMgd291bGQgbWVhbiB0aGF0IGFuIGFzc2V0IHdvdWxkIGJlIGJ1aWx0IGFzOlxuICogXCJAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZVwiOiB7XG4gKiAgIFwic3Zncy9yZWd1bGFyLyoqXCI6IFwiZm9ydGF3ZXNvbWUvaWNvbnNcIlxuICogfVxuICogV2hlcmUgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlJyBpcyB0aGUgbnBtIHBhY2thZ2UsICdzdmdzL3JlZ3VsYXIvKionIGlzIHdoYXQgc2hvdWxkIGJlIGNvcGllZFxuICogYW5kICdmb3J0YXdlc29tZS9pY29ucycgaXMgdGhlIHRhcmdldCBkaXJlY3RvcnkgdW5kZXIgcHJvamVjdFN0YXRpY0Fzc2V0c091dHB1dEZvbGRlciB3aGVyZSB0aGluZ3NcbiAqIHdpbGwgZ2V0IGNvcGllZCB0by5cbiAqXG4gKiBOb3RlISB0aGVyZSBjYW4gYmUgbXVsdGlwbGUgY29weS1ydWxlcyB3aXRoIHRhcmdldCBmb2xkZXJzIGZvciBvbmUgbnBtIHBhY2thZ2UgYXNzZXQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHRoZW1lTmFtZSBuYW1lIG9mIHRoZSB0aGVtZSB3ZSBhcmUgY29weWluZyBhc3NldHMgZm9yXG4gKiBAcGFyYW0ge2pzb259IHRoZW1lUHJvcGVydGllcyB0aGVtZSBwcm9wZXJ0aWVzIGpzb24gd2l0aCBkYXRhIG9uIGFzc2V0c1xuICogQHBhcmFtIHtzdHJpbmd9IHByb2plY3RTdGF0aWNBc3NldHNPdXRwdXRGb2xkZXIgcHJvamVjdCBvdXRwdXQgZm9sZGVyIHdoZXJlIHdlIGNvcHkgYXNzZXRzIHRvIHVuZGVyIHRoZW1lL1t0aGVtZU5hbWVdXG4gKiBAcGFyYW0ge29iamVjdH0gbG9nZ2VyIHBsdWdpbiBsb2dnZXJcbiAqL1xuZnVuY3Rpb24gY29weVN0YXRpY0Fzc2V0cyh0aGVtZU5hbWUsIHRoZW1lUHJvcGVydGllcywgcHJvamVjdFN0YXRpY0Fzc2V0c091dHB1dEZvbGRlciwgbG9nZ2VyKSB7XG4gIGNvbnN0IGFzc2V0cyA9IHRoZW1lUHJvcGVydGllc1snYXNzZXRzJ107XG4gIGlmICghYXNzZXRzKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdubyBhc3NldHMgdG8gaGFuZGxlIG5vIHN0YXRpYyBhc3NldHMgd2VyZSBjb3BpZWQnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBta2RpclN5bmMocHJvamVjdFN0YXRpY0Fzc2V0c091dHB1dEZvbGRlciwge1xuICAgIHJlY3Vyc2l2ZTogdHJ1ZVxuICB9KTtcbiAgY29uc3QgbWlzc2luZ01vZHVsZXMgPSBjaGVja01vZHVsZXMoT2JqZWN0LmtleXMoYXNzZXRzKSk7XG4gIGlmIChtaXNzaW5nTW9kdWxlcy5sZW5ndGggPiAwKSB7XG4gICAgdGhyb3cgRXJyb3IoXG4gICAgICBcIk1pc3NpbmcgbnBtIG1vZHVsZXMgJ1wiICtcbiAgICAgICAgbWlzc2luZ01vZHVsZXMuam9pbihcIicsICdcIikgK1xuICAgICAgICBcIicgZm9yIGFzc2V0cyBtYXJrZWQgaW4gJ3RoZW1lLmpzb24nLlxcblwiICtcbiAgICAgICAgXCJJbnN0YWxsIHBhY2thZ2UocykgYnkgYWRkaW5nIGEgQE5wbVBhY2thZ2UgYW5ub3RhdGlvbiBvciBpbnN0YWxsIGl0IHVzaW5nICducG0vcG5wbSBpJ1wiXG4gICAgKTtcbiAgfVxuICBPYmplY3Qua2V5cyhhc3NldHMpLmZvckVhY2goKG1vZHVsZSkgPT4ge1xuICAgIGNvbnN0IGNvcHlSdWxlcyA9IGFzc2V0c1ttb2R1bGVdO1xuICAgIE9iamVjdC5rZXlzKGNvcHlSdWxlcykuZm9yRWFjaCgoY29weVJ1bGUpID0+IHtcbiAgICAgIGNvbnN0IG5vZGVTb3VyY2VzID0gcmVzb2x2ZSgnbm9kZV9tb2R1bGVzLycsIG1vZHVsZSwgY29weVJ1bGUpO1xuICAgICAgY29uc3QgZmlsZXMgPSBzeW5jKG5vZGVTb3VyY2VzLCB7IG5vZGlyOiB0cnVlIH0pO1xuICAgICAgY29uc3QgdGFyZ2V0Rm9sZGVyID0gcmVzb2x2ZShwcm9qZWN0U3RhdGljQXNzZXRzT3V0cHV0Rm9sZGVyLCAndGhlbWVzJywgdGhlbWVOYW1lLCBjb3B5UnVsZXNbY29weVJ1bGVdKTtcblxuICAgICAgbWtkaXJTeW5jKHRhcmdldEZvbGRlciwge1xuICAgICAgICByZWN1cnNpdmU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZSkgPT4ge1xuICAgICAgICBjb25zdCBjb3B5VGFyZ2V0ID0gcmVzb2x2ZSh0YXJnZXRGb2xkZXIsIGJhc2VuYW1lKGZpbGUpKTtcbiAgICAgICAgY29weUZpbGVJZkFic2VudE9yTmV3ZXIoZmlsZSwgY29weVRhcmdldCwgbG9nZ2VyKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2hlY2tNb2R1bGVzKG1vZHVsZXMpIHtcbiAgY29uc3QgbWlzc2luZyA9IFtdO1xuXG4gIG1vZHVsZXMuZm9yRWFjaCgobW9kdWxlKSA9PiB7XG4gICAgaWYgKCFleGlzdHNTeW5jKHJlc29sdmUoJ25vZGVfbW9kdWxlcy8nLCBtb2R1bGUpKSkge1xuICAgICAgbWlzc2luZy5wdXNoKG1vZHVsZSk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gbWlzc2luZztcbn1cblxuLyoqXG4gKiBDb3BpZXMgZ2l2ZW4gZmlsZSB0byBhIGdpdmVuIHRhcmdldCBwYXRoLCBpZiB0YXJnZXQgZmlsZSBkb2Vzbid0IGV4aXN0IG9yIGlmXG4gKiBmaWxlIHRvIGNvcHkgaXMgbmV3ZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsZVRvQ29weSBwYXRoIG9mIHRoZSBmaWxlIHRvIGNvcHlcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb3B5VGFyZ2V0IHBhdGggb2YgdGhlIHRhcmdldCBmaWxlXG4gKiBAcGFyYW0ge29iamVjdH0gbG9nZ2VyIHBsdWdpbiBsb2dnZXJcbiAqL1xuZnVuY3Rpb24gY29weUZpbGVJZkFic2VudE9yTmV3ZXIoZmlsZVRvQ29weSwgY29weVRhcmdldCwgbG9nZ2VyKSB7XG4gIHRyeSB7XG4gICAgaWYgKCFleGlzdHNTeW5jKGNvcHlUYXJnZXQpIHx8IHN0YXRTeW5jKGNvcHlUYXJnZXQpLm10aW1lIDwgc3RhdFN5bmMoZmlsZVRvQ29weSkubXRpbWUpIHtcbiAgICAgIGxvZ2dlci50cmFjZSgnQ29weWluZzogJywgZmlsZVRvQ29weSwgJz0+JywgY29weVRhcmdldCk7XG4gICAgICBjb3B5RmlsZVN5bmMoZmlsZVRvQ29weSwgY29weVRhcmdldCk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGhhbmRsZU5vU3VjaEZpbGVFcnJvcihmaWxlVG9Db3B5LCBlcnJvciwgbG9nZ2VyKTtcbiAgfVxufVxuXG4vLyBJZ25vcmVzIGVycm9ycyBkdWUgdG8gZmlsZSBtaXNzaW5nIGR1cmluZyB0aGVtZSBwcm9jZXNzaW5nXG4vLyBUaGlzIG1heSBoYXBwZW4gZm9yIGV4YW1wbGUgd2hlbiBhbiBJREUgY3JlYXRlcyBhIHRlbXBvcmFyeSBmaWxlXG4vLyBhbmQgdGhlbiBpbW1lZGlhdGVseSBkZWxldGVzIGl0XG5mdW5jdGlvbiBoYW5kbGVOb1N1Y2hGaWxlRXJyb3IoZmlsZSwgZXJyb3IsIGxvZ2dlcikge1xuICAgIGlmIChlcnJvci5jb2RlID09PSAnRU5PRU5UJykge1xuICAgICAgICBsb2dnZXIud2FybignSWdub3Jpbmcgbm90IGV4aXN0aW5nIGZpbGUgJyArIGZpbGUgK1xuICAgICAgICAgICAgJy4gRmlsZSBtYXkgaGF2ZSBiZWVuIGRlbGV0ZWQgZHVyaW5nIHRoZW1lIHByb2Nlc3NpbmcuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxufVxuXG5leHBvcnQge2NoZWNrTW9kdWxlcywgY29weVN0YXRpY0Fzc2V0cywgY29weVRoZW1lUmVzb3VyY2VzfTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ3VpbGguR1VJUENcXFxcSmF2YVByb2plY3RzXFxcXGNsZWFyQ29udFdlYkFwcFxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXHRoZW1lLWxvYWRlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ3VpbGguR1VJUENcXFxcSmF2YVByb2plY3RzXFxcXGNsZWFyQ29udFdlYkFwcFxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXHRoZW1lLWxvYWRlclxcXFx0aGVtZS1sb2FkZXItdXRpbHMuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2d1aWxoLkdVSVBDL0phdmFQcm9qZWN0cy9jbGVhckNvbnRXZWJBcHAvYnVpbGQvcGx1Z2lucy90aGVtZS1sb2FkZXIvdGhlbWUtbG9hZGVyLXV0aWxzLmpzXCI7aW1wb3J0IHsgZXhpc3RzU3luYywgcmVhZEZpbGVTeW5jIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgcmVzb2x2ZSwgYmFzZW5hbWUgfSBmcm9tICdwYXRoJztcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InO1xuXG4vLyBEZXNjdHJ1Y3R1cmUgc3luYyBmcm9tIGdsb2Igc2VwYXJhdGVseSBmb3IgRVMgbW9kdWxlIGNvbXBhdGliaWxpdHlcbmNvbnN0IHsgc3luYyB9ID0gZ2xvYjtcblxuLy8gQ29sbGVjdCBncm91cHMgW3VybChdIFsnfFwiXW9wdGlvbmFsICcuL3wuLi8nLCBmaWxlIHBhcnQgYW5kIGVuZCBvZiB1cmxcbmNvbnN0IHVybE1hdGNoZXIgPSAvKHVybFxcKFxccyopKFxcJ3xcXFwiKT8oXFwuXFwvfFxcLlxcLlxcLykoXFxTKikoXFwyXFxzKlxcKSkvZztcblxuXG5mdW5jdGlvbiBhc3NldHNDb250YWlucyhmaWxlVXJsLCB0aGVtZUZvbGRlciwgbG9nZ2VyKSB7XG4gIGNvbnN0IHRoZW1lUHJvcGVydGllcyA9IGdldFRoZW1lUHJvcGVydGllcyh0aGVtZUZvbGRlcik7XG4gIGlmICghdGhlbWVQcm9wZXJ0aWVzKSB7XG4gICAgbG9nZ2VyLmRlYnVnKCdObyB0aGVtZSBwcm9wZXJ0aWVzIGZvdW5kLicpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBhc3NldHMgPSB0aGVtZVByb3BlcnRpZXNbJ2Fzc2V0cyddO1xuICBpZiAoIWFzc2V0cykge1xuICAgIGxvZ2dlci5kZWJ1ZygnTm8gZGVmaW5lZCBhc3NldHMgaW4gdGhlbWUgcHJvcGVydGllcycpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICAvLyBHbyB0aHJvdWdoIGVhY2ggYXNzZXQgbW9kdWxlXG4gIGZvciAobGV0IG1vZHVsZSBvZiBPYmplY3Qua2V5cyhhc3NldHMpKSB7XG4gICAgY29uc3QgY29weVJ1bGVzID0gYXNzZXRzW21vZHVsZV07XG4gICAgLy8gR28gdGhyb3VnaCBlYWNoIGNvcHkgcnVsZVxuICAgIGZvciAobGV0IGNvcHlSdWxlIG9mIE9iamVjdC5rZXlzKGNvcHlSdWxlcykpIHtcbiAgICAgIC8vIGlmIGZpbGUgc3RhcnRzIHdpdGggY29weVJ1bGUgdGFyZ2V0IGNoZWNrIGlmIGZpbGUgd2l0aCBwYXRoIGFmdGVyIGNvcHkgdGFyZ2V0IGNhbiBiZSBmb3VuZFxuICAgICAgaWYgKGZpbGVVcmwuc3RhcnRzV2l0aChjb3B5UnVsZXNbY29weVJ1bGVdKSkge1xuICAgICAgICBjb25zdCB0YXJnZXRGaWxlID0gZmlsZVVybC5yZXBsYWNlKGNvcHlSdWxlc1tjb3B5UnVsZV0sICcnKTtcbiAgICAgICAgY29uc3QgZmlsZXMgPSBzeW5jKHJlc29sdmUoJ25vZGVfbW9kdWxlcy8nLCBtb2R1bGUsIGNvcHlSdWxlKSwgeyBub2RpcjogdHJ1ZSB9KTtcblxuICAgICAgICBmb3IgKGxldCBmaWxlIG9mIGZpbGVzKSB7XG4gICAgICAgICAgaWYgKGZpbGUuZW5kc1dpdGgodGFyZ2V0RmlsZSkpIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0VGhlbWVQcm9wZXJ0aWVzKHRoZW1lRm9sZGVyKSB7XG4gIGNvbnN0IHRoZW1lUHJvcGVydHlGaWxlID0gcmVzb2x2ZSh0aGVtZUZvbGRlciwgJ3RoZW1lLmpzb24nKTtcbiAgaWYgKCFleGlzdHNTeW5jKHRoZW1lUHJvcGVydHlGaWxlKSkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuICBjb25zdCB0aGVtZVByb3BlcnR5RmlsZUFzU3RyaW5nID0gcmVhZEZpbGVTeW5jKHRoZW1lUHJvcGVydHlGaWxlKTtcbiAgaWYgKHRoZW1lUHJvcGVydHlGaWxlQXNTdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIHJldHVybiBKU09OLnBhcnNlKHRoZW1lUHJvcGVydHlGaWxlQXNTdHJpbmcpO1xufVxuXG5cbmZ1bmN0aW9uIHJld3JpdGVDc3NVcmxzKHNvdXJjZSwgaGFuZGxlZFJlc291cmNlRm9sZGVyLCB0aGVtZUZvbGRlciwgbG9nZ2VyLCBvcHRpb25zKSB7XG4gIHNvdXJjZSA9IHNvdXJjZS5yZXBsYWNlKHVybE1hdGNoZXIsIGZ1bmN0aW9uIChtYXRjaCwgdXJsLCBxdW90ZU1hcmssIHJlcGxhY2UsIGZpbGVVcmwsIGVuZFN0cmluZykge1xuICAgIGxldCBhYnNvbHV0ZVBhdGggPSByZXNvbHZlKGhhbmRsZWRSZXNvdXJjZUZvbGRlciwgcmVwbGFjZSwgZmlsZVVybCk7XG4gICAgY29uc3QgZXhpc3RpbmdUaGVtZVJlc291cmNlID0gYWJzb2x1dGVQYXRoLnN0YXJ0c1dpdGgodGhlbWVGb2xkZXIpICYmIGV4aXN0c1N5bmMoYWJzb2x1dGVQYXRoKTtcbiAgICBpZiAoXG4gICAgICBleGlzdGluZ1RoZW1lUmVzb3VyY2UgfHwgYXNzZXRzQ29udGFpbnMoZmlsZVVybCwgdGhlbWVGb2xkZXIsIGxvZ2dlcilcbiAgICApIHtcbiAgICAgIC8vIEFkZGluZyAuLyB3aWxsIHNraXAgY3NzLWxvYWRlciwgd2hpY2ggc2hvdWxkIGJlIGRvbmUgZm9yIGFzc2V0IGZpbGVzXG4gICAgICAvLyBJbiBhIHByb2R1Y3Rpb24gYnVpbGQsIHRoZSBjc3MgZmlsZSBpcyBpbiBWQUFESU4vYnVpbGQgYW5kIHN0YXRpYyBmaWxlcyBhcmUgaW4gVkFBRElOL3N0YXRpYywgc28gLi4vc3RhdGljIG5lZWRzIHRvIGJlIGFkZGVkXG4gICAgICBjb25zdCByZXBsYWNlbWVudCA9IG9wdGlvbnMuZGV2TW9kZSA/ICcuLycgOiAnLi4vc3RhdGljLyc7XG5cbiAgICAgIGNvbnN0IHNraXBMb2FkZXIgPSBleGlzdGluZ1RoZW1lUmVzb3VyY2UgPyAnJyA6IHJlcGxhY2VtZW50O1xuICAgICAgY29uc3QgZnJvbnRlbmRUaGVtZUZvbGRlciA9IHNraXBMb2FkZXIgKyAndGhlbWVzLycgKyBiYXNlbmFtZSh0aGVtZUZvbGRlcik7XG4gICAgICBsb2dnZXIuZGVidWcoXG4gICAgICAgICdVcGRhdGluZyB1cmwgZm9yIGZpbGUnLFxuICAgICAgICBcIidcIiArIHJlcGxhY2UgKyBmaWxlVXJsICsgXCInXCIsXG4gICAgICAgICd0byB1c2UnLFxuICAgICAgICBcIidcIiArIGZyb250ZW5kVGhlbWVGb2xkZXIgKyAnLycgKyBmaWxlVXJsICsgXCInXCJcbiAgICAgICk7XG4gICAgICBjb25zdCBwYXRoUmVzb2x2ZWQgPSBhYnNvbHV0ZVBhdGguc3Vic3RyaW5nKHRoZW1lRm9sZGVyLmxlbmd0aCkucmVwbGFjZSgvXFxcXC9nLCAnLycpO1xuXG4gICAgICAvLyBrZWVwIHRoZSB1cmwgdGhlIHNhbWUgZXhjZXB0IHJlcGxhY2UgdGhlIC4vIG9yIC4uLyB0byB0aGVtZXMvW3RoZW1lRm9sZGVyXVxuICAgICAgcmV0dXJuIHVybCArIChxdW90ZU1hcms/PycnKSArIGZyb250ZW5kVGhlbWVGb2xkZXIgKyBwYXRoUmVzb2x2ZWQgKyBlbmRTdHJpbmc7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmRldk1vZGUpIHtcbiAgICAgIGxvZ2dlci5sb2coXCJObyByZXdyaXRlIGZvciAnXCIsIG1hdGNoLCBcIicgYXMgdGhlIGZpbGUgd2FzIG5vdCBmb3VuZC5cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEluIHByb2R1Y3Rpb24sIHRoZSBjc3MgaXMgaW4gVkFBRElOL2J1aWxkIGJ1dCB0aGUgdGhlbWUgZmlsZXMgYXJlIGluIC5cbiAgICAgIHJldHVybiB1cmwgKyAocXVvdGVNYXJrID8/ICcnKSArICcuLi8uLi8nICsgZmlsZVVybCArIGVuZFN0cmluZztcbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoO1xuICB9KTtcbiAgcmV0dXJuIHNvdXJjZTtcbn1cblxuZXhwb3J0IHsgcmV3cml0ZUNzc1VybHMgfTtcbiIsICJ7XG4gIFwiZnJvbnRlbmRGb2xkZXJcIjogXCJDOi9Vc2Vycy9ndWlsaC5HVUlQQy9KYXZhUHJvamVjdHMvY2xlYXJDb250V2ViQXBwL2Zyb250ZW5kXCIsXG4gIFwidGhlbWVGb2xkZXJcIjogXCJ0aGVtZXNcIixcbiAgXCJ0aGVtZVJlc291cmNlRm9sZGVyXCI6IFwiQzovVXNlcnMvZ3VpbGguR1VJUEMvSmF2YVByb2plY3RzL2NsZWFyQ29udFdlYkFwcC9mcm9udGVuZC9nZW5lcmF0ZWQvamFyLXJlc291cmNlc1wiLFxuICBcInN0YXRpY091dHB1dFwiOiBcIkM6L1VzZXJzL2d1aWxoLkdVSVBDL0phdmFQcm9qZWN0cy9jbGVhckNvbnRXZWJBcHAvYnVpbGQvcmVzb3VyY2VzL21haW4vTUVUQS1JTkYvVkFBRElOL3dlYmFwcC9WQUFESU4vc3RhdGljXCIsXG4gIFwiZ2VuZXJhdGVkRm9sZGVyXCI6IFwiZ2VuZXJhdGVkXCIsXG4gIFwic3RhdHNPdXRwdXRcIjogXCJDOlxcXFxVc2Vyc1xcXFxndWlsaC5HVUlQQ1xcXFxKYXZhUHJvamVjdHNcXFxcY2xlYXJDb250V2ViQXBwXFxcXGJ1aWxkXFxcXHJlc291cmNlc1xcXFxtYWluXFxcXE1FVEEtSU5GXFxcXFZBQURJTlxcXFxjb25maWdcIixcbiAgXCJmcm9udGVuZEJ1bmRsZU91dHB1dFwiOiBcIkM6XFxcXFVzZXJzXFxcXGd1aWxoLkdVSVBDXFxcXEphdmFQcm9qZWN0c1xcXFxjbGVhckNvbnRXZWJBcHBcXFxcYnVpbGRcXFxccmVzb3VyY2VzXFxcXG1haW5cXFxcTUVUQS1JTkZcXFxcVkFBRElOXFxcXHdlYmFwcFwiLFxuICBcImRldkJ1bmRsZU91dHB1dFwiOiBcIkM6L1VzZXJzL2d1aWxoLkdVSVBDL0phdmFQcm9qZWN0cy9jbGVhckNvbnRXZWJBcHAvc3JjL21haW4vZGV2LWJ1bmRsZS93ZWJhcHBcIixcbiAgXCJkZXZCdW5kbGVTdGF0c091dHB1dFwiOiBcIkM6L1VzZXJzL2d1aWxoLkdVSVBDL0phdmFQcm9qZWN0cy9jbGVhckNvbnRXZWJBcHAvc3JjL21haW4vZGV2LWJ1bmRsZS9jb25maWdcIixcbiAgXCJqYXJSZXNvdXJjZXNGb2xkZXJcIjogXCJDOi9Vc2Vycy9ndWlsaC5HVUlQQy9KYXZhUHJvamVjdHMvY2xlYXJDb250V2ViQXBwL2Zyb250ZW5kL2dlbmVyYXRlZC9qYXItcmVzb3VyY2VzXCIsXG4gIFwidGhlbWVOYW1lXCI6IFwiXCIsXG4gIFwiY2xpZW50U2VydmljZVdvcmtlclNvdXJjZVwiOiBcIkM6XFxcXFVzZXJzXFxcXGd1aWxoLkdVSVBDXFxcXEphdmFQcm9qZWN0c1xcXFxjbGVhckNvbnRXZWJBcHBcXFxcYnVpbGRcXFxcc3cudHNcIixcbiAgXCJwd2FFbmFibGVkXCI6IHRydWUsXG4gIFwib2ZmbGluZUVuYWJsZWRcIjogdHJ1ZSxcbiAgXCJvZmZsaW5lUGF0aFwiOiBcIidvZmZsaW5lLmh0bWwnXCJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGd1aWxoLkdVSVBDXFxcXEphdmFQcm9qZWN0c1xcXFxjbGVhckNvbnRXZWJBcHBcXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxyb2xsdXAtcGx1Z2luLXBvc3Rjc3MtbGl0LWN1c3RvbVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZ3VpbGguR1VJUENcXFxcSmF2YVByb2plY3RzXFxcXGNsZWFyQ29udFdlYkFwcFxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXHJvbGx1cC1wbHVnaW4tcG9zdGNzcy1saXQtY3VzdG9tXFxcXHJvbGx1cC1wbHVnaW4tcG9zdGNzcy1saXQuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2d1aWxoLkdVSVBDL0phdmFQcm9qZWN0cy9jbGVhckNvbnRXZWJBcHAvYnVpbGQvcGx1Z2lucy9yb2xsdXAtcGx1Z2luLXBvc3Rjc3MtbGl0LWN1c3RvbS9yb2xsdXAtcGx1Z2luLXBvc3Rjc3MtbGl0LmpzXCI7LyoqXG4gKiBNSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIDIwMTkgVW1iZXJ0byBQZXBhdG9cblxuUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxub2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xudG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG5mdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbmNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbklNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG5BVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5MSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcblNPRlRXQVJFLlxuICovXG4vLyBUaGlzIGlzIGh0dHBzOi8vZ2l0aHViLmNvbS91bWJvcGVwYXRvL3JvbGx1cC1wbHVnaW4tcG9zdGNzcy1saXQgMi4wLjAgKyBodHRwczovL2dpdGh1Yi5jb20vdW1ib3BlcGF0by9yb2xsdXAtcGx1Z2luLXBvc3Rjc3MtbGl0L3B1bGwvNTRcbi8vIHRvIG1ha2UgaXQgd29yayB3aXRoIFZpdGUgM1xuLy8gT25jZSAvIGlmIGh0dHBzOi8vZ2l0aHViLmNvbS91bWJvcGVwYXRvL3JvbGx1cC1wbHVnaW4tcG9zdGNzcy1saXQvcHVsbC81NCBpcyBtZXJnZWQgdGhpcyBzaG91bGQgYmUgcmVtb3ZlZCBhbmQgcm9sbHVwLXBsdWdpbi1wb3N0Y3NzLWxpdCBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkXG5cbmltcG9ydCB7IGNyZWF0ZUZpbHRlciB9IGZyb20gJ0Byb2xsdXAvcGx1Z2ludXRpbHMnO1xuaW1wb3J0IHRyYW5zZm9ybUFzdCBmcm9tICd0cmFuc2Zvcm0tYXN0JztcblxuY29uc3QgYXNzZXRVcmxSRSA9IC9fX1ZJVEVfQVNTRVRfXyhbYS16XFxkXXs4fSlfXyg/OlxcJF8oLio/KV9fKT8vZztcblxuY29uc3QgZXNjYXBlID0gKHN0cikgPT5cbiAgc3RyXG4gICAgLnJlcGxhY2UoYXNzZXRVcmxSRSwgJyR7dW5zYWZlQ1NTVGFnKFwiX19WSVRFX0FTU0VUX18kMV9fJDJcIil9JylcbiAgICAucmVwbGFjZSgvYC9nLCAnXFxcXGAnKVxuICAgIC5yZXBsYWNlKC9cXFxcKD8hYCkvZywgJ1xcXFxcXFxcJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBvc3Rjc3NMaXQob3B0aW9ucyA9IHt9KSB7XG4gIGNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAgIGluY2x1ZGU6ICcqKi8qLntjc3Msc3NzLHBjc3Msc3R5bCxzdHlsdXMsc2FzcyxzY3NzLGxlc3N9JyxcbiAgICBleGNsdWRlOiBudWxsLFxuICAgIGltcG9ydFBhY2thZ2U6ICdsaXQnXG4gIH07XG5cbiAgY29uc3Qgb3B0cyA9IHsgLi4uZGVmYXVsdE9wdGlvbnMsIC4uLm9wdGlvbnMgfTtcbiAgY29uc3QgZmlsdGVyID0gY3JlYXRlRmlsdGVyKG9wdHMuaW5jbHVkZSwgb3B0cy5leGNsdWRlKTtcblxuICByZXR1cm4ge1xuICAgIG5hbWU6ICdwb3N0Y3NzLWxpdCcsXG4gICAgZW5mb3JjZTogJ3Bvc3QnLFxuICAgIHRyYW5zZm9ybShjb2RlLCBpZCkge1xuICAgICAgaWYgKCFmaWx0ZXIoaWQpKSByZXR1cm47XG4gICAgICBjb25zdCBhc3QgPSB0aGlzLnBhcnNlKGNvZGUsIHt9KTtcbiAgICAgIC8vIGV4cG9ydCBkZWZhdWx0IGNvbnN0IGNzcztcbiAgICAgIGxldCBkZWZhdWx0RXhwb3J0TmFtZTtcblxuICAgICAgLy8gZXhwb3J0IGRlZmF1bHQgJy4uLic7XG4gICAgICBsZXQgaXNEZWNsYXJhdGlvbkxpdGVyYWwgPSBmYWxzZTtcbiAgICAgIGNvbnN0IG1hZ2ljU3RyaW5nID0gdHJhbnNmb3JtQXN0KGNvZGUsIHsgYXN0OiBhc3QgfSwgKG5vZGUpID0+IHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ0V4cG9ydERlZmF1bHREZWNsYXJhdGlvbicpIHtcbiAgICAgICAgICBkZWZhdWx0RXhwb3J0TmFtZSA9IG5vZGUuZGVjbGFyYXRpb24ubmFtZTtcblxuICAgICAgICAgIGlzRGVjbGFyYXRpb25MaXRlcmFsID0gbm9kZS5kZWNsYXJhdGlvbi50eXBlID09PSAnTGl0ZXJhbCc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIWRlZmF1bHRFeHBvcnROYW1lICYmICFpc0RlY2xhcmF0aW9uTGl0ZXJhbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBtYWdpY1N0cmluZy53YWxrKChub2RlKSA9PiB7XG4gICAgICAgIGlmIChkZWZhdWx0RXhwb3J0TmFtZSAmJiBub2RlLnR5cGUgPT09ICdWYXJpYWJsZURlY2xhcmF0aW9uJykge1xuICAgICAgICAgIGNvbnN0IGV4cG9ydGVkVmFyID0gbm9kZS5kZWNsYXJhdGlvbnMuZmluZCgoZCkgPT4gZC5pZC5uYW1lID09PSBkZWZhdWx0RXhwb3J0TmFtZSk7XG4gICAgICAgICAgaWYgKGV4cG9ydGVkVmFyKSB7XG4gICAgICAgICAgICBleHBvcnRlZFZhci5pbml0LmVkaXQudXBkYXRlKGBjc3NUYWdcXGAke2VzY2FwZShleHBvcnRlZFZhci5pbml0LnZhbHVlKX1cXGBgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNEZWNsYXJhdGlvbkxpdGVyYWwgJiYgbm9kZS50eXBlID09PSAnRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uJykge1xuICAgICAgICAgIG5vZGUuZGVjbGFyYXRpb24uZWRpdC51cGRhdGUoYGNzc1RhZ1xcYCR7ZXNjYXBlKG5vZGUuZGVjbGFyYXRpb24udmFsdWUpfVxcYGApO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG1hZ2ljU3RyaW5nLnByZXBlbmQoYGltcG9ydCB7Y3NzIGFzIGNzc1RhZywgdW5zYWZlQ1NTIGFzIHVuc2FmZUNTU1RhZ30gZnJvbSAnJHtvcHRzLmltcG9ydFBhY2thZ2V9JztcXG5gKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvZGU6IG1hZ2ljU3RyaW5nLnRvU3RyaW5nKCksXG4gICAgICAgIG1hcDogbWFnaWNTdHJpbmcuZ2VuZXJhdGVNYXAoe1xuICAgICAgICAgIGhpcmVzOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGd1aWxoLkdVSVBDXFxcXEphdmFQcm9qZWN0c1xcXFxjbGVhckNvbnRXZWJBcHBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGd1aWxoLkdVSVBDXFxcXEphdmFQcm9qZWN0c1xcXFxjbGVhckNvbnRXZWJBcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2d1aWxoLkdVSVBDL0phdmFQcm9qZWN0cy9jbGVhckNvbnRXZWJBcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBVc2VyQ29uZmlnRm4gfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IG92ZXJyaWRlVmFhZGluQ29uZmlnIH0gZnJvbSAnLi92aXRlLmdlbmVyYXRlZCc7XG5cbmNvbnN0IGN1c3RvbUNvbmZpZzogVXNlckNvbmZpZ0ZuID0gKGVudikgPT4gKHtcbiAgLy8gSGVyZSB5b3UgY2FuIGFkZCBjdXN0b20gVml0ZSBwYXJhbWV0ZXJzXG4gIC8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgb3ZlcnJpZGVWYWFkaW5Db25maWcoY3VzdG9tQ29uZmlnKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFNQSxPQUFPLFVBQVU7QUFDakIsU0FBUyxjQUFBQSxhQUFZLGFBQUFDLFlBQVcsZUFBQUMsY0FBYSxnQkFBQUMsZUFBYyxpQkFBQUMsc0JBQXFCO0FBQ2hGLFNBQVMsa0JBQWtCO0FBQzNCLFlBQVksU0FBUzs7O0FDV3JCLFNBQVMsY0FBQUMsYUFBWSxnQkFBQUMscUJBQW9CO0FBQ3pDLFNBQVMsV0FBQUMsZ0JBQWU7OztBQ0R4QixPQUFPQyxXQUFVO0FBQ2pCLFNBQVMsV0FBQUMsVUFBUyxZQUFBQyxpQkFBZ0I7QUFDbEMsU0FBUyxjQUFBQyxhQUFZLGNBQWMscUJBQXFCOzs7QUNGeEQsU0FBUyxhQUFhLFVBQVUsV0FBVyxZQUFZLG9CQUFvQjtBQUMzRSxTQUFT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O0FBQUEsTUFDZCxDQUFDO0FBQUEsTUFDRCxrQkFBa0IsV0FBVyxFQUFFLFlBQVksTUFBTSxVQUFVLGVBQWUsQ0FBQztBQUFBLElBQzdFO0FBQUEsRUFDRjtBQUNGO0FBRU8sSUFBTSx1QkFBdUIsQ0FBQ0Msa0JBQStCO0FBQ2xFLFNBQU8sYUFBYSxDQUFDLFFBQVEsWUFBWSxhQUFhLEdBQUcsR0FBR0EsY0FBYSxHQUFHLENBQUMsQ0FBQztBQUNoRjtBQUNBLFNBQVMsV0FBVyxRQUF3QjtBQUMxQyxRQUFNLGNBQWMsS0FBSyxRQUFRLG1CQUFtQixRQUFRLGNBQWM7QUFDMUUsU0FBTyxLQUFLLE1BQU1SLGNBQWEsYUFBYSxFQUFFLFVBQVUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0RTtBQUNBLFNBQVMsWUFBWSxRQUF3QjtBQUMzQyxRQUFNLGNBQWMsS0FBSyxRQUFRLG1CQUFtQixRQUFRLGNBQWM7QUFDMUUsU0FBTyxLQUFLLE1BQU1BLGNBQWEsYUFBYSxFQUFFLFVBQVUsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUN0RTs7O0FPanpCQSxJQUFNLGVBQTZCLENBQUMsU0FBUztBQUFBO0FBQUE7QUFHN0M7QUFFQSxJQUFPLHNCQUFRLHFCQUFxQixZQUFZOyIsCiAgIm5hbWVzIjogWyJleGlzdHNTeW5jIiwgIm1rZGlyU3luYyIsICJyZWFkZGlyU3luYyIsICJyZWFkRmlsZVN5bmMiLCAid3JpdGVGaWxlU3luYyIsICJleGlzdHNTeW5jIiwgInJlYWRGaWxlU3luYyIsICJyZXNvbHZlIiwgImdsb2IiLCAicmVzb2x2ZSIsICJiYXNlbmFtZSIsICJleGlzdHNTeW5jIiwgInRoZW1lRm9sZGVyIiwgInN5bmMiLCAiZ2xvYiIsICJ0aGVtZUZvbGRlciIsICJyZXNvbHZlIiwgImV4aXN0c1N5bmMiLCAiYmFzZW5hbWUiLCAidmFyaWFibGUiLCAiZmlsZW5hbWUiLCAiZXhpc3RzU3luYyIsICJyZXNvbHZlIiwgInRoZW1lRm9sZGVyIiwgInJlYWRGaWxlU3luYyIsICJleGlzdHNTeW5jIiwgInJlYWRGaWxlU3luYyIsICJyZXNvbHZlIiwgImJhc2VuYW1lIiwgImdsb2IiLCAic3luYyIsICJnbG9iIiwgInRoZW1lRm9sZGVyIiwgImdldFRoZW1lUHJvcGVydGllcyIsICJyZXNvbHZlIiwgImV4aXN0c1N5bmMiLCAicmVhZEZpbGVTeW5jIiwgInJlcGxhY2UiLCAiYmFzZW5hbWUiLCAicmVxdWlyZSIsICJleGlzdHNTeW5jIiwgInJlYWRGaWxlU3luYyIsICJta2RpclN5bmMiLCAiYnVuZGxlIiwgInJlYWRkaXJTeW5jIiwgInRoZW1lRm9sZGVyIiwgIndyaXRlRmlsZVN5bmMiLCAiZSIsICJwYXRoIiwgImN1c3RvbUNvbmZpZyJdCn0K
