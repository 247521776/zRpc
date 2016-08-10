/**
 * Created by cavasblack on 16/8/10.
 */
'use strict';

import Zookeeper from "zookeeper";
import {EventEmitter} from "events";

export default class zkCli extends EventEmitter {
    /**
     * 格式化
     * @param opts
     */
    constructor(opts) {
        super();
        var self = this
        this.opts = opts || {}
        this.zk = new Zookeeper({
            connect: this.opts.connect || "localhost:2181",
            timeout: this.opts.timeout || 2000,
            debug_level: this.opts.debug_level || Zookeeper.ZOO_LOG_LEVEL_WARN,
            host_order_deterministic: this.opts.host_order_deterministic || false,
        });
        this.zk.connect(function (err) {
            if (err) throw err
            self.emit("connect", self.zk)
        })
    }

    /**
     * 创建
     * @param path
     * @param value
     * @param callback
     * @param flags
     */
    create(path, value, callback, flags = Zookeeper.ZOO_EPHEMERAL) {
        var cb = function (rc, error, path) {
            if (rc === 0) return callback(null, path)
            return callback(new Error(error))
        }
        this.zk.a_create(path, value, flags, cb)
    }

    toResult(callback) {
        return function (rc, error, msg) {
            if (rc === 0)return callback(null, arguments[arguments.length - 1])
            return callback(new Error(error))
        }
    }

    /**
     * 创建文件夹
     * @param path
     * @param callback
     */
    mkdirp(path, callback) {
        this.zk.mkdirp(path, callback);
    }

    /**
     * 得到文件
     * @param path
     * @param callback
     */
    get(path, callback) {
        this.zk.a_get(path, false, this.toResult(callback))
    }

    /**
     * 删除文件
     * @param path
     * @param callback
     */
    del(path, version, callback) {
        this.zk.a_delete_(path, version, this.toResult(callback))
    }

    /**
     * 设置文件
     * @param path
     * @param value
     * @param version
     * @param callback
     */
    set(path, value, version, callback) {
        this.zk.a_set(path, value, version, this.toResult(callback))
    }

    /**
     * 得到子文件
     * @param path
     * @param callback
     */
    getChildren(path, callback) {
        this.zk.a_get_children(path, false, this.toResult(callback))
    }

    /**
     * 是否存在
     * @param path
     * @param callback
     */
    isExist(path, callback) {
        this.zk.a_exists(path, false, this.toResult(callback))
    }

    /**
     * 监听文件
     * @param path
     * @param callback
     */
    watchFile(path, callback) {
        var self = this;
        var wcb = function () {
            self.watchFile(path, callback)
        }
        this.zk.aw_get(path, wcb, this.toResult(callback))
    }

    /**
     * 监听文件夹
     * @param path
     * @param callback
     */
    watchDir(path, callback) {
        var self = this
        var wcb = function () {
            self.watchDir(path, callback)
        }
        var fn = function (rc, error, children) {
            if (rc === 0)return callback(null, children.map(function (item) {
                return path + "/" + item
            }))
            return callback(new Error(error))
        }
        this.zk.aw_get_children(path, wcb, fn)
    }
}