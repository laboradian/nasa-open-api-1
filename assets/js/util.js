import $ from 'jquery';

/**
 * @returns {Promise}
 */
export function waitOnload() {
  return new Promise((resolve/*, reject*/) => {
    $(() => {
      resolve(true);
    });
  });
}

/**
 * RFC3986 に従ったエンコーディングを行う
 * @param {string} str
 * @returns {string}
 */
export function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

/**
 * 数字を3桁区切りの文字列にして返す
 * @param {number} num
 * @returns {string}
 */
export function addDigitGroupingSeparator(num) {

  var doForInteger = (num1) => {
    return num1.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  var arr = num.toString().split('.');
  switch (arr.length) {
    case 0:
    case 1:
      return doForInteger(num);
    default:
      return doForInteger(parseInt(arr[0])) + '.' + arr[1];
  }
}

/**
 * 2つの数値を足し算する
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
export function add(a, b) {

  // The function to get the length after the decimal point
  var getLengthOfDecimal = (num) => {
    var str = num + '';
    var len = str.length;
    var pos = str.lastIndexOf('.');
    if (pos === -1) {
      return 0;
    } else {
      return len - (pos + 1);
    }
  };

  // 小数点以下桁数が大きい方に合わせて桁を増やす.
  var len_dec_a = getLengthOfDecimal(a);
  var len_dec_b = getLengthOfDecimal(b);
  var a_new, b_new, len_dec;
  if (len_dec_a > len_dec_b) {
    len_dec = len_dec_a;
  } else {
    len_dec = len_dec_b;
  }

  // どちらも必ず整数になるはず
  a_new = Math.round(a * Math.pow(10, len_dec));
  b_new = Math.round(b * Math.pow(10, len_dec));

  return (a_new + b_new) / Math.pow(10, len_dec);
}

/**
 *
 * @param {string} query_string - e.g. 'name=foo&hobby=guitar'
 * @return {Object}
 */
export function getUrlParams(query_string) {

  var params = {};

  if (typeof query_string === 'undefined') {
    return {};
  }

  query_string.split('&').forEach(function(s) {
    var pair = s.split('=');
    if (typeof pair[1] === 'undefined') return;
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  });
  return params;
}

/**
 * 3つの数値を掛け算する
 *
 * - 小数点以下0桁とする（切り捨て）.
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {number}
 */
export function multiply(a, b, c) {

  // The function to get the length after the decimal point
  var getLengthOfDecimal = (num) => {
    var str = num + '';
    var len = str.length;
    var pos = str.lastIndexOf('.');
    if (pos === -1) {
      return 0;
    } else {
      return len - (pos + 1);
    }
  };

  // Make the 'a' variable integer if it's decimal
  var len_dec_a = getLengthOfDecimal(a);
  var a_new = a;
  if (len_dec_a > 0) {
    a_new = a * Math.pow(10, len_dec_a);
  }

  // Make the 'b' variable integer if it's decimal
  var len_dec_b = getLengthOfDecimal(b);
  var b_new = b;
  if (len_dec_b > 0) {
    b_new = b * Math.pow(10, len_dec_b);
  }

  // Make the 'c' variable integer if it's decimal
  var len_dec_c = getLengthOfDecimal(c);
  var c_new = c;
  if (len_dec_c > 0) {
    c_new = c * Math.pow(10, len_dec_c);
  }

  var d = a_new * b_new * c_new;

  if (len_dec_a > 0 || len_dec_b > 0 || len_dec_c > 0) {
    d = Math.floor(d / Math.pow(10, len_dec_a + len_dec_b + len_dec_c));
  }

  return d;
}

/**
 * 配列かどうかを返す。
 * @param something
 * @returns {boolean}
 */
export function isArray(something) {

  // ----- polyfil する場合 -----
  // if(!Array.isArray) {
  //   Array.isArray = function (vArg) {
  //     return Object.prototype.toString.call(vArg) === "[object Array]";
  //   };
  // }
  // ---------------------------

  return Object.prototype.toString.call(something) === '[object Array]';

}

/**
 * クライアントが日本語かどうかを返す。
 * @returns {boolean}
 */
export function isLangJa(lang) {
  if (lang === undefined) {
    lang = window.navigator.userLanguage || window.navigator.language || window.navigator.browserLanguage;
  }
  if (lang === undefined) {
    return true;
  }
  return lang.substr(0, 2) === 'ja';
}
