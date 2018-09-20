import * as express from 'express'
import * as exphbs from 'express-handlebars'
import { Router }  from './auto-router'

class App {
    globalOptions={
        copyrightYear:2018 
    }

    public express
    
    configure(){
        this.express = express()
        let hbs = exphbs.create({ 
            defaultLayout: 'main',
            layoutsDir: "views/layouts/",
            partialsDir: "views/partials/"
        });

        this.express.engine('handlebars', hbs.engine);
        this.express.set('view engine', 'handlebars');
        this.express.set('views', 'views');
        
    }

    constructor () {
        this.configure();
        this.mountRoutes()
    }
    
    private mountRoutes (): void {
        const router = express.Router()
        new Router(router,this.globalOptions);
        this.express.use(express.static('assets'))
        this.express.use('/js', express.static('node_modules/popper.js/dist/umd/')); // redirect popper JS
        this.express.use('/js', express.static('node_modules/bootstrap/dist/js')); // redirect bootstrap JS
        this.express.use('/js', express.static('node_modules/jquery/dist')); // redirect JS jQuery
        this.express.use('/css', express.static('node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

        this.express.use('/', router)
        
    }
}

export default new App().express