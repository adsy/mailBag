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
var nodemailer = __importStar(require("nodemailer"));
var google = require("googleapis").google;
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2("798659017115-5eopdp133ejh75bnng7r2q3pplcme7ag.apps.googleusercontent.com", // ClientID
"vvNvHE_pQ0RNS6Lr-8g2odfr", // Client Secret
"https://developers.google.com/oauthplayground" // Redirect URL
);
oauth2Client.setCredentials({
    refresh_token: "1//04fA6Hb3hfFoGCgYIARAAGAQSNwF-L9Ir8HE5nUjIMVRHIpaQxndKOU9vQLQBTXkoOpsDHRYkiqQRZ48Une37fehF8LIKwtN1q9U",
});
var accessToken = oauth2Client.getAccessToken();
var Worker = /** @class */ (function () {
    function Worker(inServerInfo) {
        Worker.serverInfo = inServerInfo;
    }
    Worker.prototype.sendMessage = function (inOptions) {
        return new Promise(function (inResolve, inReject) {
            var transport = nodemailer.createTransport(Worker.serverInfo.smtp, accessToken);
            transport.sendMail(inOptions, function (inError, inInfo) {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve();
                }
            });
        });
    };
    return Worker;
}());
exports.Worker = Worker;
//# sourceMappingURL=SMTP.js.map