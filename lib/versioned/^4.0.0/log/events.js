'use strict';

var log = require('gulplog');
var chalk = require('chalk');
var prettyTime = require('pretty-hrtime');
var formatError = require('../formatError');

// Wire up logging events
function logEvents(gulpInst) {

  gulpInst.on('start', function(e) {
    // TODO: batch these
    // so when 5 tasks start at once it only logs one time with all 5
    if (e.branch) {
      log.debug('Starting', '\'' + chalk.underline(e.name) + '\'...');
    } else {
      log.info('Starting', '\'' + chalk.cyan(e.name) + '\'...');
    }
  });

  gulpInst.on('stop', function(e) {
    var time = prettyTime(e.duration);
    if (e.branch) {
      log.debug(
        'Finished', '\'' + chalk.underline(e.name) + '\'',
        'after', chalk.magenta(time)
      );
    } else {
      log.info(
        'Finished', '\'' + chalk.cyan(e.name) + '\'',
        'after', chalk.magenta(time)
      );
    }
  });

  gulpInst.on('error', function(e) {
    var msg = formatError(e);
    var time = prettyTime(e.duration);

    if (e.branch) {
      log.debug(
        '\'' + chalk.cyan(e.name) + '\'',
        chalk.red('errored after'),
        chalk.magenta(time)
      );
      log.debug(msg);
    } else {
      log.error(
        '\'' + chalk.cyan(e.name) + '\'',
        chalk.red('errored after'),
        chalk.magenta(time)
      );
      log.error(msg);
    }
  });
}

module.exports = logEvents;
