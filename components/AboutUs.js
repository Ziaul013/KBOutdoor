function AboutUs({ aboutData, isAdmin, onEdit }) {
  try {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editData, setEditData] = React.useState(aboutData);

    const handleSave = () => {
      onEdit('about', editData);
      setIsEditing(false);
    };

    const handleAddValue = () => {
      setEditData({
        ...editData,
        values: [...editData.values, { title: 'New Value', description: 'Value description' }]
      });
    };

    const handleUpdateValue = (index, field, value) => {
      const newValues = [...editData.values];
      newValues[index][field] = value;
      setEditData({ ...editData, values: newValues });
    };

    const handleDeleteValue = (index) => {
      const newValues = editData.values.filter((_, i) => i !== index);
      setEditData({ ...editData, values: newValues });
    };

    return (
      <section id="about" className="py-20 bg-white" data-name="about-us" data-file="components/AboutUs.js">
        <div className="container mx-auto px-4">
          {isAdmin && (
            <div className="mb-4">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="btn-secondary text-sm"
              >
                <div className="icon-edit text-sm mr-2 inline-block"></div>
                Edit About Us
              </button>
            </div>
          )}

          {isEditing ? (
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Edit About Us</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({...editData, title: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({...editData, description: e.target.value})}
                    className="w-full p-3 border rounded-lg h-32"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <input
                    type="url"
                    value={editData.image}
                    onChange={(e) => setEditData({...editData, image: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium">Our Values</label>
                    <button onClick={handleAddValue} className="btn-primary text-sm">Add Value</button>
                  </div>
                  
                  {editData.values.map((value, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg mb-4 border">
                      <div className="flex justify-end mb-2">
                        <button 
                          onClick={() => handleDeleteValue(index)}
                          className="text-red-600 hover:bg-red-50 p-1 rounded"
                        >
                          <div className="icon-trash-2 text-sm"></div>
                        </button>
                      </div>
                      <input
                        type="text"
                        placeholder="Value Title"
                        value={value.title}
                        onChange={(e) => handleUpdateValue(index, 'title', e.target.value)}
                        className="w-full p-2 border rounded mb-2"
                      />
                      <textarea
                        placeholder="Value Description"
                        value={value.description}
                        onChange={(e) => handleUpdateValue(index, 'description', e.target.value)}
                        className="w-full p-2 border rounded h-20"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button onClick={handleSave} className="btn-primary">Save Changes</button>
                  <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-6">{aboutData.title}</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {aboutData.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  {aboutData.values.map((value, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2">{value.title}</h4>
                      <p className="text-gray-600 text-sm">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-1/2">
                <img
                  src={aboutData.image}
                  alt="About Us"
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('AboutUs component error:', error);
    return null;
  }
}