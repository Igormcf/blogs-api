module.exports = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', { postId: DataTypes.INTEGER, categoryId: DataTypes.INTEGER }, { timestamps: false, tableName: 'PostCategories' });
  
  PostCategoryTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategoryTable,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Category.belongsToMany(models.BlogPost, {
      as: 'posts',
      through: PostCategoryTable,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategoryTable;
};