import appRoutes from "./app-routes";
import adminRoutes from "./admin-routes";

const routes = [...appRoutes, ...adminRoutes];

export default routes;
