import { Router } from "npm:express@4.18.2";
import {
  getAllUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.ts";
const router = Router();

router.route("/").get(getAllUsers).post(addUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
