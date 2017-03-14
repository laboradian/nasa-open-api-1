import page from 'page';
import indexModule from './index';
import "../less/app.less";

page('/', indexModule);

page({
  click: false,
  popstate: false,
  dispatch: true,
  hashbang: false
});

