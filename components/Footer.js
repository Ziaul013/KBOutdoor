function Footer({ contactData, isAdmin, onEdit }) {
  try {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editData, setEditData] = React.useState(contactData);

    const handleSave = () => {
      onEdit('contact', editData);
      setIsEditing(false);
    };

    return (
      <footer className="bg-gray-800 text-white py-16" data-name="footer" data-file="components/Footer.js">
        <div className="container mx-auto px-4">
          {isAdmin && (
            <div className="mb-6">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gray-700 text-white px-4 py-2 rounded text-sm hover:bg-gray-600"
              >
                <div className="icon-edit text-sm mr-2 inline-block"></div>
                Edit Contact Info
              </button>
            </div>
          )}

          {isEditing ? (
            <div className="bg-gray-700 p-6 rounded-lg max-w-2xl">
              <h3 className="text-xl font-bold mb-4">Edit Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={editData.companyName}
                  onChange={(e) => setEditData({...editData, companyName: e.target.value})}
                  className="p-3 bg-gray-600 rounded text-white placeholder-gray-300"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editData.email}
                  onChange={(e) => setEditData({...editData, email: e.target.value})}
                  className="p-3 bg-gray-600 rounded text-white placeholder-gray-300"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={editData.phone}
                  onChange={(e) => setEditData({...editData, phone: e.target.value})}
                  className="p-3 bg-gray-600 rounded text-white placeholder-gray-300"
                />
                <input
                  type="text"
                  placeholder="Website"
                  value={editData.website}
                  onChange={(e) => setEditData({...editData, website: e.target.value})}
                  className="p-3 bg-gray-600 rounded text-white placeholder-gray-300"
                />
                <textarea
                  placeholder="Address"
                  value={editData.address}
                  onChange={(e) => setEditData({...editData, address: e.target.value})}
                  className="md:col-span-2 p-3 bg-gray-600 rounded text-white placeholder-gray-300 h-20"
                />
              </div>
              <div className="flex space-x-2 mt-4">
                <button onClick={handleSave} className="btn-primary">Save</button>
                <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <div className="icon-building text-xl text-white"></div>
                  </div>
                  <h3 className="text-2xl font-bold">{contactData.companyName}</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Leading provider of premium products and services with a commitment to quality and excellence.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                  <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
                  <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#certificates" className="hover:text-white transition-colors">Certificates</a></li>
                  <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold mb-4">Contact Info</h4>
                <div className="space-y-3 text-gray-300">
                  <div className="flex items-center space-x-3">
                    <div className="icon-mail text-sm"></div>
                    <span>{contactData.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="icon-phone text-sm"></div>
                    <span>{contactData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="icon-globe text-sm"></div>
                    <span>{contactData.website}</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="icon-map-pin text-sm mt-1"></div>
                    <span>{contactData.address}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {contactData.companyName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}