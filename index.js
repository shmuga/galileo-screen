/**
 * Created by juice on 11/7/16.
 */

var Screen = require('./screen');
var merge = require('lodash/fp/merge');

module.exports = function(module_options) {

  var defaultOptions = {
    width: 64,
    height: 32,
    more: ')',
    cursor: '>'
  };

  var options;
  if (module_options)
    options = merge(defaultOptions, module_options);
  else
    options = defaultOptions;

  var screen = Screen(
    options.width,
    options.height,
    options.more,
    options.cursor
  );

  /**
   * Merges next screen onto previous
   * - automatic recognition of last screen merge
   * - automatic management of command prompts
   * @param prev {string} previous screen (or complete response)
   * @param next {string} next screen
   * @returns {string} complete screen
   */
  var mergeResponse = screen.mergeResponse_subst.bind(null, screen.merge_fns.kopernik);

  return {
    mergeResponse: mergeResponse,
    wrapLines: screen.wrapLines,
    hasMore: screen.hasMore
  }
};