import { Restaurant, Product, RestaurantCategory, ProductCategory } from '../models/models.js'

const index = async function (req, res) {
  try {
    const restaurants = await Restaurant.findAll(
      {
        attributes: { exclude: ['userId'] },
        include:
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      },
        order: [[{ model: RestaurantCategory, as: 'restaurantCategory' }, 'name', 'ASC']]
      }
    )
    res.json(restaurants)
  } catch (err) {
    res.status(500).send(err)
  }
}

// TODO: Complete the following functions

const create = async function (req, res) {
  // 1. Preparamos el objeto con lo que viene del cliente
  const newRestaurant = Restaurant.build(req.body)
  // 2. Asignamos el dueño (fijo a 1 como dice el readme) por ello usamos build y luego create
  newRestaurant.userId = 1
  try {
    // 3. Guardamos
    const restaurant = await newRestaurant.save()
    res.json(restaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

const show = async function (req, res) {
  try {
    const restaurant = await Restaurant.findByPk(req.params.restaurantId, {
      attributes: { exclude: ['userId'] },
      include: [{
        model: Product,
        as: 'products',
        include: { model: ProductCategory, as: 'productCategory' }
      },
      {
        model: RestaurantCategory,
        as: 'restaurantCategory'
      }],
      // Ordenamos los productos por el campo order
      order: [[{ model: Product, as: 'products' }, 'order', 'ASC']]
    })
    res.json(restaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

const update = async function (req, res) {
  try {
    // 1. Buscamos el restaurante que queremos editar
    const restaurant = await Restaurant.findByPk(req.params.restaurantId)
    // 2. Aplicamos los cambios que vienen en el body
    await restaurant.update(req.body)
    // 3. Devolvemos el resultado actualizado
    res.json(restaurant)
  } catch (err) {
    res.status(500).send(err)
  }
}

const destroy = async function (req, res) {
  try {
    // Borramos el resultado cuyo ID coincide con el de la URL
    const restaurant = await Restaurant.destroy({
      where: { id: req.params.restaurantId }
    })
    // Si el result es 1, significa que se borro una fila. Si es 0, no se encontro nada.
    let message = ''
    if (restaurant === 1) {
      message = 'Succesfully deleted restaurant with id' + req.params.restaurantId
    } else {
      message = 'Could not delete restaurant'
    }
    res.json(message)
  } catch (err) {
    res.status(500).send(err)
  }
}

const RestaurantController = {
  index,
  create,
  show,
  update,
  destroy
}
export default RestaurantController
