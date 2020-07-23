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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var ServerInfo_1 = require("./ServerInfo");
var IMAP = __importStar(require("./IMAP"));
var app = express_1.default();
app.use(express_1.default.json());
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});
app.get("/mailboxes", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var imapWorker, mailboxes, inError_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imapWorker = new IMAP.Worker(ServerInfo_1.ServerInfo);
                return [4 /*yield*/, imapWorker.listMailboxes()];
            case 1:
                mailboxes = _a.sent();
                inResponse.json(mailboxes);
                return [3 /*break*/, 3];
            case 2:
                inError_1 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/mailboxes/:mailbox", function (inRequest, inResponse) { return __awaiter(void 0, void 0, void 0, function () {
    var imapWorker, messages, inError_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imapWorker = new IMAP.Worker(ServerInfo_1.ServerInfo);
                return [4 /*yield*/, imapWorker.listMessages({
                        mailbox: inRequest.params.mailbox,
                    })];
            case 1:
                messages = _a.sent();
                inResponse.json(messages);
                return [3 /*break*/, 3];
            case 2:
                inError_2 = _a.sent();
                inResponse.send("error");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// app.get(
//   "/mailboxes/:mailbox/:id",
//   async (inRequest: Request, inResponse: Response) => {
//     try {
//       const imapWorker: IMAP.Worker = new IMAP.Worker(ServerInfo);
//       const messageBody: string = await imapWorker.getMessageBody({
//         mailbox: inRequest.params.mailbox,
//         id: parseInt(inRequest.params.id, 10),
//       });
//       inResponse.json(messageBody);
//     } catch (inError) {
//       inResponse.send("error");
//     }
//   }
// );
// app.delete(
//   "/mailboxes/:mailbox/:id",
//   async (inRequest: Request, inResponse: Response) => {
//     try {
//       const imapWorker: IMAP.Worker = new IMAP.Worker(ServerInfo);
//       await imapWorker.deleteMessage({
//         mailbox: inRequest.params.mailbox,
//         id: parseInt(inRequest.params.id, 10),
//       });
//       inResponse.send("message deleted");
//     } catch (inError) {
//       inResponse.send("error");
//     }
//   }
// );
// app.post("/mailboxes", async (inRequest: Request, inResponse: Response) => {
//   try {
//     const smtpWorker: SMTP.Worker = new SMTP.Worker(ServerInfo);
//     await smtpWorker.sendMessage(inRequest.body);
//     inResponse.send("message sent");
//   } catch (inError) {
//     inResponse.send("error");
//   }
// });
// app.get("/contacts", async (inRequest: Request, inResponse: Response) => {
//   try {
//     const contactsWorker: Contacts.worker = new Contacts.Worker();
//     const contacts: IContact[] = await contactsWorker.listContacts();
//     inResponse.json(contacts);
//   } catch (inError) {
//     inResponse.send("error");
//   }
// });
// app.post("/contacts", async (inRequest: Request, inResponse: Response) => {
//   try {
//     const contactsWorker: Contacts.worker = new Contacts.Worker();
//     const contact: IContact = await contactsWorker.addContact(inRequest.body);
//     inResponse.json(contact);
//   } catch (inError) {
//     inResponse.send("error");
//   }
// });
// app.delete(
//   "/contacts/:id",
//   async (inRequest: Request, inResponse: Response) => {
//     try {
//       const contactsWorker: Contacts.worker = new Contacts.Worker();
//       await contactsWorker.deleteContact(inRequest.params.id);
//       inResponse.send("contact deleted");
//     } catch (inError) {
//       inResponse.send("error");
//     }
//   }
// );
app.listen(3000, function () {
    return console.log("Example app listening at http://localhost:3000");
});
//# sourceMappingURL=main.js.map