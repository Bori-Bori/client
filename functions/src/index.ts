import * as functions from "firebase-functions";
import express, {Request, Response} from "express";
import cors from "cors";
import axios from "axios";
import {ALADINLIST} from "./aladinList";

const ttbkey = "ttbandn36091701005";
const app = express();
app.use(cors({origin: true}));

type Item = {
  title: string;
  link: string;
  author: string;
  pubDate: string;
  description: string;
  creator: string;
  isbn: string;
  isbn13: string;
  itemId: number;
  priceSales: number;
  priceStandard: number;
  stockStatus: string;
  mileage: number;
  cover: string;
  categoryId: number;
  categoryName: string;
  publisher: string;
  customerReviewRank: number;
};

type SearchBookResponseData = {
  version: string;
  title: string;
  link: string;
  pubDate: string;
  imageUrl: string;
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  query: string;
  searchCategoryId: number;
  searchCategoryName: string;
  item: Item[];
};
interface Book {
  title: string;
  link: string;
  author: string;
  pubDate: string;
  description: string;
  isbn: string;
  isbn13: string;
  itemId: number;
  priceSales: number;
  priceStandard: number;
  mallType: string;
  stockStatus: string;
  mileage: number;
  cover: string;
  categoryId: number;
  categoryName: string;
  publisher: string;
  salesPoint: number;
  adult: boolean;
  fixedPrice: boolean;
  customerReviewRank: number;
  subInfo: Record<string, unknown>;
}

interface BookListResponseData {
  version: string;
  logo: string;
  title: string;
  link: string;
  pubDate: string;
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  query: string;
  searchCategoryId: number;
  searchCategoryName: string;
  item: Book[];
}

app.get("/booksearchlist", async (req: Request, res: Response) => {
  const {contentType, category1, category2, category3, keyword, page, boardId} =
    req.query;
  const foundCategory = ALADINLIST.find(
    (category) =>
      category1 === category.category1 &&
      category2 === category.category2 &&
      category3 === category.category3,
  );
  try {
    const pageNumber = Number(page);
    if (contentType === "Bestseller") {
      const BestsellerResponse = await axios.get(
        `https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${ttbkey}&QueryType=${contentType}&SearchTarget=Book&SubSearchTarget=Book&CategoryId=${
          foundCategory?.CID || 0
        }&MaxResults=10&start=${
          (pageNumber - 1) * 10
        }&Cover=Big&output=JS&Version=20131101`,
      );
      const responseData: BookListResponseData = BestsellerResponse.data;
      res.status(200).send(responseData.item);
    } else if (
      contentType === "Keyword" ||
      contentType === "Title" ||
      contentType === "Author"
    ) {
      const TitleResponse = await axios.get(
        `https://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${ttbkey}&Query=${keyword}&QueryType=${contentType}&CategoryId=${
          foundCategory?.CID || 0
        }&MaxResults=10&start=${
          (pageNumber - 1) * 10
        }&Cover=Big&output=JS&Version=20131101`,
      );
      const responseData: SearchBookResponseData = TitleResponse.data;
      res.status(200).send(responseData.item);
    } else if (contentType === "") {
      const bookInforesponse = await axios.get(
        `https://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${ttbkey}&itemIdType=ISBN13&ItemId=${boardId}&Cover=Big&output=JS&Version=20131101&OptResult=previewImgList`,
      );
      const responseData = bookInforesponse.data;
      res.status(200).send(responseData.item);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(null);
  }
});

export const api = functions.https.onRequest(app);
/* eslint-disable camelcase */
import admin from "firebase-admin";

app.use(cors({origin: true}));

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

// Kakao REST API key
const KAKAO_API_KEY = "1fc0a2fa62dea5ab421513f910107858";

// Endpoint for getting access token with authorization code
app.post("/oauth", async (req, res) => {
  const {code} = req.body;

  try {
    // Call Kakao Token API to exchange authorization code with access token
    const {data} = await axios.post(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_API_KEY}&redirect_uri=https://boribori-eight.vercel.app/login/kakao/oauth&code=${code}`,
    );

    // Save the user information to Firestore
    const {access_token} = data;
    const user = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.status(200).send(user.data);
  } catch (error) {
    console.error(error);
    res.status(400).send({message: "Failed"});
  }
});

export const kakaoLogin = functions.https.onRequest(app);
