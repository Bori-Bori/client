"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kakaoLogin = void 0;
/* eslint-disable camelcase */
const firebase_functions_1 = __importDefault(require("firebase-functions"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const axios_1 = __importDefault(require("axios"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
// Initialize Firebase Admin SDK
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.applicationDefault(),
});
// Kakao REST API key
const KAKAO_API_KEY = "1fc0a2fa62dea5ab421513f910107858";
// Endpoint for getting access token with authorization code
app.post("/oauth", async (req, res) => {
    const { code } = req.body;
    try {
        // Call Kakao Token API to exchange authorization code with access token
        const { data } = await axios_1.default.post(`https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_API_KEY}&redirect_uri=http://localhost:3000/login/kakao/oauth&code=${code}`);
        // Save the user information to Firestore
        const { access_token } = data;
        const user = await axios_1.default.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        const { uid, displayName, photoURL } = user.data;
        await firebase_admin_1.default.firestore().collection("userInfo").doc(uid).set({
            displayName,
            photoURL,
        });
        res.status(200).send(user.data);
    }
    catch (error) {
        console.error(error);
        res.status(400).send({ message: "Failed" });
    }
});
exports.kakaoLogin = firebase_functions_1.default.https.onRequest(app);
//# sourceMappingURL=kakao.js.map