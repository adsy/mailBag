"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
var path = __importStar(require("path"));
var DataStore = require("nedb");
var Worker = /** @class */ (function () {
    function Worker() {
        this.db = new DataStore({
            filename: path.join(__dirname, "contacts.db"),
            autoload: true,
        });
    }
    //curl localhost:3000/contacts
    Worker.prototype.listContacts = function () {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.find({}, function (inError, inDocs) {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inDocs);
                }
            });
        });
    };
    //curl -d '{"name" : "Adam brittain", "email":"adsy.britt@gmail.com"}' -H "Content-type:application/JSON" -X POST localhost:3000/contacts
    Worker.prototype.addContact = function (inContact) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.insert(inContact, function (inError, inNewDoc) {
                if (inError || null) {
                    inReject(inError);
                }
                else {
                    inResolve(inNewDoc);
                }
            });
        });
    };
    //curl -X DELETE localhost:3000/contacts/sJKbINkpVSFQj9gf
    Worker.prototype.deleteContact = function (inID) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.remove({ _id: inID }, {}, function (inError, inNumRemoved) {
                if (inError || null) {
                    inReject(inError);
                }
                else {
                    inResolve();
                }
            });
        });
    };
    //curl -d '{"name" : "Adam Brittain", "email":"test@gmail.com"}' -H "Content-type:application/json" -X PUT localhost:3000/contacts/ZBHRsAmRiFVHdLt7
    Worker.prototype.updateContact = function (inID, inContact) {
        var _this = this;
        return new Promise(function (inResolve, inReject) {
            _this.db.update({ _id: inID }, { inContact: inContact }, {}, function (inError, numReplaced) {
                if (inError || null) {
                    inReject(inError);
                }
                else {
                    inResolve(numReplaced);
                }
            });
        });
    };
    return Worker;
}());
exports.Worker = Worker;
//# sourceMappingURL=contacts.js.map