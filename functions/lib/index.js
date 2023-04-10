"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kakaoLogin = exports.api = void 0;
const functions = __importStar(require("firebase-functions"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const aladinList_1 = require("./aladinList");
// 환경변수 설정
const KAKAO_TTBKEY = functions.config().boribori.kakao_ttbkey;
const KAKAO_API_KEY = functions.config().boribori.kakao_api_key;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.get("/booksearchlist", async (req, res) => {
    const { contentType, category1, category2, category3, keyword, page, boardId } = req.query;
    const foundCategory = aladinList_1.ALADINLIST.find((category) => category1 === category.category1 &&
        category2 === category.category2 &&
        category3 === category.category3);
    try {
        const pageNumber = Number(page);
        if (contentType === "Bestseller") {
            const BestsellerResponse = await axios_1.default.get(`https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${KAKAO_TTBKEY}&QueryType=${contentType}&SearchTarget=Book&SubSearchTarget=Book&CategoryId=${(foundCategory === null || foundCategory === void 0 ? void 0 : foundCategory.CID) || 0}&MaxResults=10&start=${(pageNumber - 1) * 10}&Cover=Big&output=JS&Version=20131101`);
            const responseData = BestsellerResponse.data;
            res.status(200).send(responseData.item);
        }
        else if (contentType === "Keyword" ||
            contentType === "Title" ||
            contentType === "Author") {
            const TitleResponse = await axios_1.default.get(`https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${KAKAO_TTBKEY}&Query=${keyword}&QueryType=${contentType}&CategoryId=${(foundCategory === null || foundCategory === void 0 ? void 0 : foundCategory.CID) || 0}&MaxResults=10&start=${(pageNumber - 1) * 10}&Cover=Big&output=JS&Version=20131101`);
            const responseData = TitleResponse.data;
            res.status(200).send(responseData.item);
        }
        else if (contentType === "") {
            const bookInforesponse = await axios_1.default.get(`https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${KAKAO_TTBKEY}&itemIdType=ISBN13&ItemId=${boardId}&Cover=Big&output=JS&Version=20131101&OptResult=previewImgList`);
            const responseData = bookInforesponse.data;
            res.status(200).send(responseData.item);
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send(null);
    }
});
exports.api = functions.https.onRequest(app);
/* eslint-disable camelcase */
const firebase_admin_1 = __importDefault(require("firebase-admin"));
app.use((0, cors_1.default)({ origin: true }));
// Initialize Firebase Admin SDK
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault(),
});
// Endpoint for getting access token with authorization code
app.post("/oauth", async (req, res) => {
    const { code } = req.body;
    const REDIRECT_URI = `${req.headers.origin}/login/kakao/oauth`;
    try {
        // Call Kakao Token API to exchange authorization code with access token
        const { data } = await axios_1.default.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`);
        // Save the user information to Firestore
        const { access_token } = data;
        const user = await axios_1.default.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        res.status(200).send(user.data);
    }
    catch (error) {
        console.error(error);
        res.status(400).send({ message: "Failed" });
    }
});
exports.kakaoLogin = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map