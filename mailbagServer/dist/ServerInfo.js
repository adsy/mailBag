"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerInfo = void 0;
var path = require("path");
var fs = require("fs");
var rawInfo = fs.readFileSync(path.join(__dirname, "../serverInfo.json"));
exports.ServerInfo = JSON.parse(rawInfo);
//# sourceMappingURL=ServerInfo.js.map