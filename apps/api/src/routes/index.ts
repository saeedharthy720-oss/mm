import { Router } from "express";
import { authRouter } from "../modules/auth/auth.routes.js";
import { categoriesRouter } from "../modules/categories/categories.routes.js";
import { healthRouter } from "../modules/health/health.routes.js";
import { orderStatusesRouter } from "../modules/orderStatuses/orderStatuses.routes.js";
import { ordersRouter } from "../modules/orders/orders.routes.js";
import { productsRouter } from "../modules/products/products.routes.js";
import { rolesRouter } from "../modules/roles/roles.routes.js";
import { settingsRouter } from "../modules/settings/settings.routes.js";
import { unitsRouter } from "../modules/units/units.routes.js";
import { usersRouter } from "../modules/users/users.routes.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/roles", rolesRouter);
apiRouter.use("/categories", categoriesRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/units", unitsRouter);
apiRouter.use("/settings", settingsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/order-statuses", orderStatusesRouter);

export { healthRouter };
