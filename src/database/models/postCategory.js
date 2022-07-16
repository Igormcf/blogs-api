module.exports = (sequelize, DataTypes) => {
  const PostCategoryTable = sequelize.define('PostCategory', { 
    postId: { type: DataTypes.INTEGER, foreignKey: true },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true, primaryKey: true }, 
  }, { timestamps: false, tableName: 'PostCategories' });
  
  PostCategoryTable.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategoryTable,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories'
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategoryTable,
      foreignKey: 'categoryId',
      otherKey: 'postId',
      as: 'posts',
    });
  };

  return PostCategoryTable;
};