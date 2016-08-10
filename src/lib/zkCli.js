/**
 * Created by cavasblack on 16/8/10.
 */
'use strict';

import Zookeeper from "zookeeper";
import { EventEmitter } from "events";

export default class zkCli extends EventEmitter{
    constructor(opts){
        console.log(opts)
    }
}