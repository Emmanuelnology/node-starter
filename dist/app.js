"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const exphbs = require("express-handlebars");
const auto_router_1 = require("./auto-router");
class App {
    constructor() {
        this.globalOptions = {
            copyrightYear: 2018
        };
        this.configure();
        this.mountRoutes();
    }
    configure() {
        this.express = express();
        let hbs = exphbs.create({
            defaultLayout: 'main',
            layoutsDir: "views/layouts/",
            partialsDir: "views/partials/"
        });
        this.express.engine('handlebars', hbs.engine);
        this.express.set('view engine', 'handlebars');
        this.express.set('views', 'views');
    }
    mountRoutes() {
        const router = express.Router();
        new auto_router_1.Router(router, this.globalOptions);
        this.express.use(express.static('assets'));
        this.express.use('/js', express.static('node_modules/popper.js/dist/umd/')); // redirect popper JS
        this.express.use('/js', express.static('node_modules/bootstrap/dist/js')); // redirect bootstrap JS
        this.express.use('/js', express.static('node_modules/jquery/dist')); // redirect JS jQuery
        this.express.use('/css', express.static('node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
        this.express.use('/', router);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map