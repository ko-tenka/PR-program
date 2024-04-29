const express = require('express');
const { title, Task } = require('../db/models');

const router = require('express').Router()

router.get('/', async (req, res) => {
  console.log('Зашли в ручку');
  try {
    const allPosts = await Task.findAll();
    console.log("allPosts:", allPosts)
    res.json(allPosts);
  } catch (error) {
    console.log(error);
    res.json({err: error})
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, img} = req.body
    const post = await Task.create({ title, description, img });
    res.json(post);
  } catch (error) {
    res.json({err: error})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    await Task.destroy({ where: { id: postId } });
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router