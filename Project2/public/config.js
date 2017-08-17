var config = {
  BASE_PATH: 'http://srsdevwiki.srssoft.com/dbdoc'
};

if(window) {
  window.config = config;
} else if(global) {
  global.config = config;
}
