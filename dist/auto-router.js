"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isValidRoute(route) {
    if (route.url == undefined)
        return { result: false, info: 'URL missing' };
    if (route.view == undefined)
        return { result: false, info: 'View missing' };
    if (route.options.pageTitle == undefined)
        return { result: false, info: 'pageTitle missing' };
    return { result: true, info: 'Success' };
}
class Router {
    constructor(router, globalOptions) {
        this.router = router;
        this.globalOptions = globalOptions;
        try {
            let json = require('../routes.json');
            this.routes = json.routes;
        }
        catch (_a) {
            throw new Error('Invalid route file');
        }
        for (let routeID in this.routes) {
            let route = this.routes[routeID];
            let routeValidation = isValidRoute(route);
            if (routeValidation.result) {
                this.route(routeID);
            }
            else {
                throw new Error('Invalid route: ' + routeID + ' - ' + routeValidation.info);
            }
        }
    }
    route(destination) {
        let route = this.routes[destination];
        this.router.get(route.url, (req, res) => {
            res.render(route.view, Object.assign(route.options, this.globalOptions));
        });
    }
}
exports.Router = Router;
//# sourceMappingURL=auto-router.js.map