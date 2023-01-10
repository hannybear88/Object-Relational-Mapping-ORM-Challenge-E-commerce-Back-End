const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag
      }
    ],

  }).then(allTags => res.json(allTags))

  .catch(err => res.status(400).json(err))

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },

    include: [
      {
        model: Product,
        through: ProductTag
      }
    ],

      // .then((tagData) => {
  //   if (!tagData) {
  //     res.status(404).json({ message: "We could not find this tag." });
  //     return;
  //   }
  //   res.json(tagData);
  // })

  }).then(singleTag => res.json(singleTag))

  .catch(err => res.status(400).json(err))

});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)

  .then(createdTag => res.json(createdTag))

//   .then((tagData) => {
//     if (!tagData) {
//       res.status(404).json({ message: 'We could not find this tag.' });
//       return;
//     }
//     res.status(200).json({ message: `The tag ${req.body.tag_name} has been successfully added.` })
//   })
//   .catch((err) => res.status(500).json(err));
// });
  .catch(err => res.status(400).json(err))

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(updatedTag => res.json(updatedTag))
  
  .catch(err => res.status(400).json(err))

});

// Tag.update(req.body, {
//   where: { id: req.params.id }
// })
// .then(() => res.status(200).json({ message: `Tag ${req.params.id}'s name has been successfully changed to ${req.body.tag_name}.` }))
// .catch(err => res.status(500).json(err));
// });

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(deletedTag => res.json(deletedTag))

  .catch(err => res.status(400).json(err))

  // .then((tagData) => {
  //   if (!tagData) {
  //     res.status(404).json({ message: "We could not find this tag." });
  //     return;
  //   }
  //   res.status(200).json({ message: `Tag ${req.params.id} has been successfully deleted.` });
  // })
});

module.exports = router;
