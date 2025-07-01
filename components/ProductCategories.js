function ProductCategories({ categories, isAdmin, onEdit }) {
  try {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editingCategory, setEditingCategory] = React.useState(null);
    const [showProductGallery, setShowProductGallery] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState(null);

    const handleAddCategory = () => {
      const newCategory = {
        id: Date.now(),
        name: 'New Category',
        description: 'Category description',
        image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        products: []
      };
      onEdit('categories', [...categories, newCategory]);
    };

    const handleEditCategory = (category) => {
      setEditingCategory({...category});
      setIsEditing(true);
    };

    const handleSaveCategory = () => {
      const updatedCategories = categories.map(cat => 
        cat.id === editingCategory.id ? editingCategory : cat
      );
      onEdit('categories', updatedCategories);
      setIsEditing(false);
      setEditingCategory(null);
    };

    const handleDeleteCategory = (categoryId) => {
      const updatedCategories = categories.filter(cat => cat.id !== categoryId);
      onEdit('categories', updatedCategories);
    };

    const handleViewProducts = (category) => {
      setSelectedCategory(category);
      setShowProductGallery(true);
    };

    const handleEditCategoryFromGallery = (updatedCategory) => {
      const updatedCategories = categories.map(cat => 
        cat.id === updatedCategory.id ? updatedCategory : cat
      );
      onEdit('categories', updatedCategories);
    };

    return (
      <section id="products" className="py-20 bg-gray-50" data-name="product-categories" data-file="components/ProductCategories.js">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Product Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of high-quality products designed to meet your business needs
            </p>
          </div>

          {isAdmin && (
            <div className="mb-8 text-center">
              <button onClick={handleAddCategory} className="btn-primary mr-4">
                <div className="icon-plus text-sm mr-2 inline-block"></div>
                Add Category
              </button>
            </div>
          )}

          {isEditing && editingCategory && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <h3 className="text-xl font-bold mb-4">Edit Category</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                  <textarea
                    placeholder="Description"
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                    className="w-full p-3 border rounded-lg h-24"
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={editingCategory.image}
                    onChange={(e) => setEditingCategory({...editingCategory, image: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                  <div className="flex space-x-2">
                    <button onClick={handleSaveCategory} className="btn-primary">Save</button>
                    <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(category => (
              <div key={category.id} className="card group cursor-pointer">
                {isAdmin && (
                  <div className="flex justify-end space-x-2 mb-4">
                    <button 
                      onClick={() => handleEditCategory(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <div className="icon-edit text-sm"></div>
                    </button>
                    <button 
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <div className="icon-trash-2 text-sm"></div>
                    </button>
                  </div>
                )}
                
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                
                <button 
                  onClick={() => handleViewProducts(category)}
                  className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
                >
                  View Products
                  <div className="icon-arrow-right text-sm ml-1 inline-block"></div>
                </button>
              </div>
            ))}
          </div>

          <ProductGallery
            category={selectedCategory}
            isVisible={showProductGallery}
            onClose={() => setShowProductGallery(false)}
            isAdmin={isAdmin}
            onEdit={handleEditCategoryFromGallery}
          />
        </div>
      </section>
    );
  } catch (error) {
    console.error('ProductCategories component error:', error);
    return null;
  }
}