import express from "express";
const router = express.Router();
import { getBorrowBooksOfUser,borrowBook,returnBook,renewBook,getBorrows,getExpiredBorrows, getOverdueBooks, bookVisualizeByCat, bookVisualizeByStates, reservebookVisualizeByCat} from "../Controllers/Borrow.js";

router.get("/", getBorrows);
router.get("/expired" , getExpiredBorrows);
router.get("/bookVisualizeByCat" , bookVisualizeByCat);
router.get("/bookVisualizeByStates" , bookVisualizeByStates);
router.get('/api/reserve/reservebookVisualizeByCat',reservebookVisualizeByCat);
router.get("/:id", getBorrowBooksOfUser);
router.get("/overdue/:id", getOverdueBooks);
router.post('/',borrowBook);
router.put('/return/:id',returnBook);
router.put('/renew/:id',renewBook);


export default router;
