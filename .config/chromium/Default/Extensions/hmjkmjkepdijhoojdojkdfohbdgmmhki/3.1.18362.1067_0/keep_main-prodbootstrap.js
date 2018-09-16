const availableLocales = JSON.parse('\x5b\x22en\x22, \x22am\x22, \x22ar\x22, \x22bn\x22, \x22bg\x22, \x22ca\x22, \x22cs\x22, \x22cy\x22, \x22da\x22, \x22de\x22, \x22el\x22, \x22en_GB\x22, \x22es\x22, \x22es_419\x22, \x22et\x22, \x22eu\x22, \x22fa\x22, \x22fi\x22, \x22fil\x22, \x22fr\x22, \x22gl\x22, \x22gu\x22, \x22hi\x22, \x22hr\x22, \x22hu\x22, \x22id\x22, \x22is\x22, \x22it\x22, \x22iw\x22, \x22ja\x22, \x22kn\x22, \x22ko\x22, \x22lt\x22, \x22lv\x22, \x22ml\x22, \x22ms\x22, \x22my\x22, \x22nl\x22, \x22no\x22, \x22pl\x22, \x22pt_BR\x22, \x22pt_PT\x22, \x22ro\x22, \x22ru\x22, \x22sk\x22, \x22sl\x22, \x22sr\x22, \x22sv\x22, \x22sw\x22, \x22ta\x22, \x22te\x22, \x22th\x22, \x22tr\x22, \x22uk\x22, \x22ur\x22, \x22vi\x22, \x22zh_CN\x22, \x22zh_TW\x22, \x22zu\x22\x5d'); const availableRtlLocales = JSON.parse('\x5b\x22ar\x22, \x22fa\x22, \x22iw\x22, \x22ur\x22\x5d'); const prefix = 'keep_main-prod'; _docs_flag_initialData = JSON.parse('\x7b\x22n_amt\x22:\x5b\x22audio\/aac\x22,\x22image\/jpeg\x22,\x22image\/png\x22,\x22image\/gif\x22\x5d,\x22n_afoiu\x22:false,\x22n_k\x22:\x22AIzaSyDzSyl-DPNxSyc7eghRsB4oNNetrnvnH0I\x22,\x22n_ars\x22:\x22https:\/\/www.googleapis.com\/auth\/reminders\x22,\x22n_s\x22:\x22https:\/\/www.googleapis.com\/auth\/memento\x22,\x22n_ss\x22:\x22https:\/\/www.googleapis.com\/auth\/drive,https:\/\/www.googleapis.com\/auth\/plus.peopleapi.readwrite\x22,\x22n_ats\x22:\x22https:\/\/www.googleapis.com\/auth\/client_channel\x22,\x22n_atas\x22:\x22https:\/\/www.googleapis.com\/auth\/taskassist.readonly\x22,\x22n_v\x22:\x22v1\x22,\x22n_cc\x22:\x22TR, EC, SH, LB, RB, AN, EX, PI, DR, CO, MI, NC, SNB, IN\x22,\x22n_c\x22:\x22192748556389-u13aelnnjsmn5df1voa2d3oimlbd8led.apps.googleusercontent.com\x22,\x22n_cp\x22:\x22CRX\x22,\x22n_csbs\x22:120,\x22n_dt\x22:\x22\x22,\x22n_deau\x22:\x22https:\/\/www.googleapis.com\/\x22,\x22n_cr\x22:false,\x22n_detl\x22:false,\x22n_eau\x22:false,\x22n_ecsw\x22:false,\x22n_ecil\x22:false,\x22n_edtt\x22:false,\x22n_eema\x22:false,\x22n_egs\x22:false,\x22n_eil\x22:true,\x22n_em\x22:false,\x22n_eod\x22:true,\x22n_eoc\x22:false,\x22n_eon\x22:false,\x22n_ep\x22:true,\x22n_esiv\x22:false,\x22n_imb\x22:10485760,\x22n_imp\x22:26214400,\x22n_ica\x22:true,\x22n_lcu\x22:false,\x22n_mpau\x22:\x22https:\/\/maps.googleapis.com\/maps\/api\/place\/\x22,\x22n_iu\x22:\x22https:\/\/keep.google.com\/media\/\x22,\x22n_nmri\x22:5000,\x22n_nib\x22:5000,\x22n_nmb\x22:1800000,\x22n_oe\x22:true,\x22n_pau\x22:\x22https:\/\/www.googleapis.com\/\x22,\x22n_rau\x22:\x22https:\/\/www.googleapis.com\/\x22,\x22n_scp\x22:false,\x22n_sit\x22:\x5b\x22image\/jpeg\x22,\x22image\/png\x22,\x22image\/gif\x22\x5d,\x22n_t\x22:true,\x22n_tc\x22:1032,\x22n_tu\x22:\x22https:\/\/client-channel.google.com\/client-channel\/channel\x22,\x22n_tsu\x22:\x22https:\/\/clients4.google.com\/invalidation\/lcs\/request\x22,\x22n_ts\x22:1032,\x22n_taau\x22:\x22https:\/\/taskassist-pa.googleapis.com\/\x22,\x22n_tmd\x22:7,\x22n_ur\x22:\x22edit\x22,\x22n_ugat\x22:true,\x22n_uo\x22:true,\x22n_wfp\x22:false,\x22n_wcv\x22:\x223.3.0.3\x22\x7d');
// Locales sent from the server use underscore, not hyphen, to separate region code.
let locale = window.navigator.language.replace('-', '_');
const langSynonyms = {
  'he': 'iw',
}
if (langSynonyms[locale]) {
  locale = langSynonyms[locale];
}

const direction = availableRtlLocales.indexOf(locale) >= 0 ? 'rtl' : 'ltr';

// window.chrome.lockScreen.data.create only exists in lockScreen environment.
const lockScreenMode = !!(window.chrome && window.chrome.lockScreen &&
    window.chrome.lockScreen.data && window.chrome.lockScreen.data.create);
const head = document.getElementsByTagName('head')[0];

if (!lockScreenMode) {
  const symbolsFileName = availableLocales.indexOf(locale) >= 0 ? locale : 'en';
  const symbolsEl = document.createElement('script');
  symbolsEl.setAttribute('type', 'text/javascript');
  symbolsEl.setAttribute('src', 'i18n/symbols_' + symbolsFileName + '.js');
  head.appendChild(symbolsEl);
}

const mode = lockScreenMode ? 'lockscreen' : 'app';

const cssFileName = prefix + '_' + mode + '_styles_' + direction + '.css';
const cssEl = document.createElement('link');
cssEl.setAttribute('rel', 'stylesheet');
cssEl.setAttribute('href', cssFileName);
head.appendChild(cssEl);

const jsFileName = prefix + '_' + mode + '_script_' + direction + '.js';
const jsEl = document.createElement('script');
jsEl.setAttribute('type', 'text/javascript');
jsEl.setAttribute('src', jsFileName);
head.appendChild(jsEl);

// In lockscreen mode, we must ensure css is loaded since ink engine will
// crash if executed before its container has size.
let cssLoaded = !lockScreenMode, jsLoaded = false;
const onLoadFn = function() {
  if (cssLoaded && jsLoaded) {
    if (lockScreenMode) {
      initLockscreenMode(window._keep_persistenceEnabled_);
    } else {
      initNotesApp(
        window._keep_launchToDrawing_,
        window._keep_drawingImageEntry_,
        window._keep_drawingNoteIdToOpen_,
        window._keep_isDemoMode_,
        true /* opt_loadSymbols */);
    }
  }
};

cssEl.onload = function() {
  cssLoaded = true;
  onLoadFn();
};
jsEl.onload = function() {
  jsLoaded = true;
  onLoadFn();
};
