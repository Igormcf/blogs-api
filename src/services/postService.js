const { BlogPost, Category, PostCategory, User } = require('../database/models');

const createBlogPost = async ({ id, title, content, categoryIds }) => {
  const findCategories = await Promise.all(categoryIds
  .map((item) => Category.findByPk(item)));

  const existsCategories = findCategories.every((item) => item);

  if (existsCategories === false) {
    return { statusCode: 400, result: { message: '"categoryIds" not found' } };
  }

  const newPost = await BlogPost.create({ userId: id, title, content });

  if (newPost) {
    await PostCategory
    .bulkCreate(categoryIds
      .map((item) => ({ postId: newPost.dataValues.id, categoryId: item })));
  }

  return { statusCode: 201, result: newPost };
};

const getAllPosts = async () => {
  const response = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return { statusCode: 200, result: response };
};

const getPostId = async ({ id }) => {
  const response = await BlogPost.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  if (!response) {
    return { statusCode: 404, result: { message: 'Post does not exist' } };
  }

  return { statusCode: 200, result: response };
};

module.exports = {
  createBlogPost,
  getAllPosts,
  getPostId,
};