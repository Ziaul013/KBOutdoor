function Hero({ heroData, isAdmin, onEdit }) {
  try {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editData, setEditData] = React.useState(heroData);

    const handleSave = () => {
      onEdit('hero', editData);
      setIsEditing(false);
    };

    return (
      <section id="home" className="relative pt-20 min-h-screen" data-name="hero" data-file="components/Hero.js">
        <div className="absolute inset-0 z-0">
          <img
            src={heroData.backgroundImage}
            alt="Business Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
          {isAdmin && (
            <div className="mb-4">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="btn-secondary text-sm"
              >
                <div className="icon-edit text-sm mr-2 inline-block"></div>
                Edit Hero
              </button>
            </div>
          )}

          {isEditing ? (
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl">
              <h3 className="text-xl font-bold mb-4">Edit Hero Section</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Title"
                  value={editData.title}
                  onChange={(e) => setEditData({...editData, title: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
                <textarea
                  placeholder="Description"
                  value={editData.description}
                  onChange={(e) => setEditData({...editData, description: e.target.value})}
                  className="w-full p-3 border rounded-lg h-24"
                />
                <input
                  type="url"
                  placeholder="Background Image URL"
                  value={editData.backgroundImage}
                  onChange={(e) => setEditData({...editData, backgroundImage: e.target.value})}
                  className="w-full p-3 border rounded-lg"
                />
                <div className="flex space-x-2">
                  <button onClick={handleSave} className="btn-primary">Save</button>
                  <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-10 lg:mb-0">
                <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  {heroData.title}
                </h1>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  {heroData.description}
                </p>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => document.getElementById('products').scrollIntoView({behavior: 'smooth'})}
                    className="btn-primary"
                  >
                    View Products
                  </button>
                  <button 
                    onClick={() => document.getElementById('about').scrollIntoView({behavior: 'smooth'})}
                    className="btn-secondary"
                  >
                    Learn More
                  </button>
                </div>
              </div>
              
              <div className="lg:w-1/2 lg:pl-12">
                <div className="relative">
                  <img
                    src={heroData.backgroundImage}
                    alt="Business Overview"
                    className="w-full h-96 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  } catch (error) {
    console.error('Hero component error:', error);
    return null;
  }
}