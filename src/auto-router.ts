import * as express from 'express';

export interface IRoute{
    url:string, // Required: URL of the route
    view:string, // Required: filename excluding extension of the view file
    options: {
        pageTitle:string, // Required: title of the page
        layout:string // Optional: filename excluding extension of the layout file, if omitted will default to 'main'
        }
    }
    
    export interface IRouteVM{
        render()
    }
    
    export interface IRouteValidationOutput{
        result:boolean, 
        info:string
    }
    
    
    function isValidRoute(route:IRoute): IRouteValidationOutput {
        
        if(route.url == undefined) return {result:false,info:'URL missing'};
        if(route.view == undefined) return {result:false,info:'View missing'}
        if(route.options.pageTitle == undefined) return {result:false,info:'pageTitle missing'}
        
        return {result: true,info: 'Success'};
    }
    
    export class Router {

        public routes:JSON;
        
        constructor(private router:express.Router, private globalOptions){
            try {
                let json=require('../routes.json');
                this.routes=json.routes;
            }
            catch {
                throw new Error('Invalid route file');
            }
            
            for (let routeID in this.routes) {
                
                let route:IRoute=this.routes[routeID];
                let routeValidation=isValidRoute(route)
                
                if(routeValidation.result){
                    this.route(routeID)     
                }
                else {
                    throw new Error('Invalid route: ' + routeID + ' - ' + routeValidation.info);
                }
            }
        }
        
        public route(destination:string){
            
            let route:IRoute=this.routes[destination];
            this.router.get(route.url, (req, res) => {
                res.render(route.view,Object.assign(route.options,this.globalOptions));
            })
        }
    }