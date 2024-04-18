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
    const { title, text, check1} = req.body
    const post = await Task.create({ title, text, check1 });
    res.json(post);
  } catch (error) {
    res.json({err: error})
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.body
    await Post.destroy({ where: { id } })
    res.sendStatus(200);
  } catch (error) {
    res.json({err: error})
  }
})

module.exports = router