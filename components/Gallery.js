function Gallery({ galleryData, isAdmin, onEdit }) {
  try {
    const [selectedCategory, setSelectedCategory] = React.useState('all');
    const [isEditing, setIsEditing] = React.useState(false);
    const [editingItem, setEditingItem] = React.useState(null);

    const categories = ['all', 'activities', 'factory', 'products', 'team'];

    const filteredItems = selectedCategory === 'all' 
      ? galleryData 
      : galleryData.filter(item => item.category === selectedCategory);

    const handleAddItem = () => {
      const newItem = {
        id: Date.now(),
        title: 'New Gallery Item',
        category: 'activities',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400',
        description: 'Gallery item description'
      };
      onEdit('gallery', [...galleryData, newItem]);
    };

    const handleEditItem = (item) => {
      setEditingItem({...item});
      setIsEditing(true);
    };

    const handleSaveItem = () => {
      const updatedItems = galleryData.map(item => 
        item.id === editingItem.id ? editingItem : item
      );
      onEdit('gallery', updatedItems);
      setIsEditing(false);
      setEditingItem(null);
    };

    const handleDeleteItem = (itemId) => {
      const updatedItems = galleryData.filter(item => item.id !== itemId);
      onEdit('gallery', updatedItems);
    };

    return (
      <section id="gallery" className="py-20 bg-white" data-name="gallery" data-file="components/Gallery.js">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Gallery</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Take a look at our facilities, activities, and team in action
            </p>
          </div>

          {isAdmin && (
            <div className="mb-8 text-center">
              <button onClick={handleAddItem} className="btn-primary">
                <div className="icon-plus text-sm mr-2 inline-block"></div>
                Add Gallery Item
              </button>
            </div>
          )}

          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-gray-100 p-2 rounded-lg">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    selectedCategory === category 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {isEditing && editingItem && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <h3 className="text-xl font-bold mb-4">Edit Gallery Item</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Title"
                    value={editingItem.title}
                    onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                  <select
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  >
                    {categories.slice(1).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Description"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    className="w-full p-3 border rounded-lg h-24"
                  />
                  <input
                    type="url"
                    placeholder="Image URL"
                    value={editingItem.image}
                    onChange={(e) => setEditingItem({...editingItem, image: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                  <div className="flex space-x-2">
                    <button onClick={handleSaveItem} className="btn-primary">Save</button>
                    <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div key={item.id} className="relative group">
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex space-x-1 z-10">
                    <button 
                      onClick={() => handleEditItem(item)}
                      className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      <div className="icon-edit text-sm"></div>
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      <div className="icon-trash-2 text-sm"></div>
                    </button>
                  </div>
                )}
                
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Gallery component error:', error);
    return null;
  }
}