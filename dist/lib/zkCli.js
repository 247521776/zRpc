/**
 * Created by cavasblack on 16/8/10.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _zookeeper = require("zookeeper");

var _zookeeper2 = _interopRequireDefault(_zookeeper);

var _events = require("events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class zkCli extends _events.EventEmitter {
    constructor(opts) {
        console.log(opts);
    }
}
exports.default = zkCli;
//# sourceMappingURL=zkCli.js.map