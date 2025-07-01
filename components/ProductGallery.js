function ProductGallery({ category, isVisible, onClose, isAdmin, onEdit }) {
  try {
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [showImagePopup, setShowImagePopup] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [newProduct, setNewProduct] = React.useState({ name: '', image: '', description: '' });

    if (!isVisible || !category) return null;

    const handleAddProduct = () => {
      if (newProduct.name && newProduct.image) {
        const updatedCategory = {
          ...category,
          products: [...(category.products || []), { ...newProduct, id: Date.now() }]
        };
        onEdit(updatedCategory);
        setNewProduct({ name: '', image: '', description: '' });
        setIsEditing(false);
      }
    };

    const handleDeleteProduct = (productId) => {
      const updatedCategory = {
        ...category,
        products: category.products.filter(p => p.id !== productId)
      };
      onEdit(updatedCategory);
    };

    const openImagePopup = (product) => {
      setSelectedImage(product);
      setShowImagePopup(true);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" data-name="product-gallery" data-file="components/ProductGallery.js">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold">{category.name} - Products</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <div className="icon-x text-xl"></div>
            </button>
          </div>

          <div className="p-6">
            {isAdmin && (
              <div className="mb-6">
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="btn-primary mr-4"
                >
                  <div className="icon-plus text-sm mr-2 inline-block"></div>
                  Add Product
                </button>
              </div>
            )}

            {isEditing && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-bold mb-4">Add New Product</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                    className="p-3 border rounded-lg"
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                    className="p-3 border rounded-lg"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full p-3 border rounded-lg mt-4 h-20"
                />
                <div className="flex space-x-2 mt-4">
                  <button onClick={handleAddProduct} className="btn-primary">Add Product</button>
                  <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(category.products || []).map(product => (
                <div key={product.id} className="relative group">
                  {isAdmin && (
                    <button 
                      onClick={() => handleDeleteProduct(product.id)}
                      className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded hover:bg-red-700 z-10"
                    >
                      <div className="icon-trash-2 text-sm"></div>
                    </button>
                  )}
                  
                  <div 
                    className="cursor-pointer"
                    onClick={() => openImagePopup(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform"
                    />
                    <div className="mt-2">
                      <h4 className="font-medium text-sm">{product.name}</h4>
                      {product.description && (
                        <p className="text-xs text-gray-600 mt-1">{product.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {(!category.products || category.products.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <p>No products added yet. {isAdmin ? 'Click "Add Product" to get started.' : ''}</p>
              </div>
            )}
          </div>
        </div>

        <ImagePopup
          image={selectedImage?.image}
          title={selectedImage?.name}
          isVisible={showImagePopup}
          onClose={() => setShowImagePopup(false)}
        />
      </div>
    );
  } catch (error) {
    console.error('ProductGallery component error:', error);
    return null;
  }
}