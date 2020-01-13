import AppHome from '~/components/products/list';
import AppGame from '~/containers/cart';
import AppResult from '~/components/result';
import AppError404 from '~/components/errors/404';

const routes = [
   {
      name: 'home',
      path: '/',
      component: AppHome,
      exact: true
   },
   {
      name: 'cart',
      path: '/cart',
      component: AppGame,
      exact: true
   },
   {
      name: 'result',
      path: '/result',
      component: AppResult,
      exact: true
   },
   {
      path: '**',
      component: AppError404
   }
];

const routesMap = {};

routes.forEach((route) => {
   if(route.hasOwnProperty('name')){
      routesMap[route.name] = route.path;
   }
});

// urlBuilder('post', {num: 1})
// urlBuilder('product', {id: 100})
function urlBuilder(name, params = []){
   if(!routesMap.hasOwnProperty(name)){
      return null;
   }
   let url = routesMap[name];

   for(let key in params){
      url = url.replace(':' + key, params[key]);
   }

   return url;
}

export { routes, routesMap, urlBuilder }