const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product],

  }).then(allCategories => res.json(allCategories))

  .catch(err => res.status(400).json(err))

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },

    include: [Product],

  }).then(singleCategory => res.json(singleCategory))
//   => {
//   if (!categoryData) {
//     res.status(404).json({ message: "We could not find this category." });
//     return;
//   }
//   res.status(200).json(categoryData);
// })
  .catch(err => res.status(400).json(err))

});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)

  // .then(() =>
  //     res.status(200).json({
  //       message: `The ${req.body.category_name} category has been successfully added.`,
  //     })
  //   )
  .then(createdCategory => res.json(createdCategory))

  .catch(err => res.status(400).json(err))

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedCategory => res.json(updatedCategory))
  
  // .then((categoryData) => {
  //   if (!categoryData) {
  //     res.status(404).json({ message: "We could not find this category." });
  //     return;
  //   }
  //   res.status(200).json({
  //     messge: `Category ${req.params.id}'s name has been successfully changed to ${req.body.category_name}.`,
  //   });
  // })
  .catch(err => res.status(400).json(err))

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(deletedCategory => res.json(deletedCategory))

  .catch(err => res.status(400).json(err))

});

//  Product.update(
//     { category_id: null },
//     { where: { category_id: req.params.id } }
//   ).then(() => {
//     Category.destroy({ where: { id: req.params.id } })
//       .then((categoryData) => {
//         !categoryData
//           ? res
//               .status(400)
//               .json({ message: "We could not find this category." })
//           : res
//               .status(200)
//               .json({ message: "This category was successfully deleted." });
//       })
//       .catch((err) => console.log(err));
//   });
// });

module.exports = router;
