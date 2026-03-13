import RestaurantController from '../controllers/RestaurantController.js'

const loadFileRoutes = function (app) {
  // Definimos las rutas para el path base: /restaurants
  app.route('/restaurants')
    .get(
      RestaurantController.index // Lee todos
    )
    .post(
      RestaurantController.create // Crea uno nuevo
    )

  // Definimos las rutas para un restaurante especifico
  app.route('/restaurants/:restaurantId')
    .get(
      RestaurantController.show // Lee los detalles de uno
    )
    .put(
      RestaurantController.update // Actualiza uno
    )
    .delete(
      RestaurantController.destroy // Borra uno
    )
}
export default loadFileRoutes
