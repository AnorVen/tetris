import makeRequest from './helpers/makeRequest';
export { all };

function all(){
   return makeRequest('products/all.php');
}