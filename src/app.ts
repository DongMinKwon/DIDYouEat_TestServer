import express, { Request, Response } from "express";
import cors from "cors";

import { userUtil } from "../prisma/scripts/user";

const PORT: number = 4000;

type content = {
  status: string;
  message: object | string | Array<object>;
};

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("This is test Server!!");
});

app.get("/dev/user/:wallet_address", async (req: Request, res: Response) => {
  let data: content;

  try {
    // user get
    let user = await userUtil.getUser(req.params.wallet_address);

    // exist user
    if (user) {
      data = {
        status: "success",
        message: user,
      };

      return res.status(200).json(data);
    }
    // no user
    else {
      let user = await userUtil.createUser(req.params.wallet_address);

      data = {
        status: "success",
        message: user,
      };

      return res.status(201).json(data);
    }
  } catch (e) {
    data = {
      status: "failed",
      message: "Bad request",
    };
    return res.status(400).json(data);
  }
});

app.get(
  "/dev/user/:wallet_address/tokens",
  async (req: Request, res: Response) => {
    let data: content;

    try {
      const tokens = await userUtil.getAllTokens(req.params.wallet_address);
      data = {
        status: "success",
        message: tokens,
      };
      return res.status(200).json(data);
    } catch (e) {
      data = {
        status: "failed",
        message: "Bad Request",
      };
      return res.status(400).json(data);
    }
  }
);

app.listen(PORT, () => {
  console.log(`server is listening at post ${PORT}`);
});
