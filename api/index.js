/**
 * Created by yanglei on 2016/8/11.
 */
import {request} from "request";

export default class api{
    constructor() {
        this.opt = {
            url : null,
            method : null,
            params : {}
        }
    }

    api(method) {
        this.opt.method = method;

        return this;
    }

    param(param = {}) {
        for(let key in param) {
            this.opt.params[key] = param[key];
        }

        return this;
    }

    exec() {
        const args = Array.prototype.slice.call(arguments).shift();
        if(typeof args === "function") {
            const opt = this.opt;
            const methods = "get post";
            if(!opt.url) throw "invalid url";
            if(!opt.method && methods.indexOf(opt.method) < 0) throw "invalid method";
            if(opt.method === "get") {
                let params = [];
                for(let key in opt.params) {
                    params.push(`${key}=${opt.params[key]}`);
                }
                const url = `${opt.url}?${params.join("&")}`;
                request.get(url, (err, response, body) => {
                    return args(err, body);
                });
            } else {
                request.post({
                    url : opt.url,
                    form : opt.params
                }, (err, response, body) => {
                    return args(err, body);
                });
            }
        } else {
            this.opt.url = args;

            return this;
        }
    }
}