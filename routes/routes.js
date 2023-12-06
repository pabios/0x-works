import {Router} from "express";
import hello from "../controllers/homeController.js";


const router = Router();

router.get("/", hello);

export default router;
