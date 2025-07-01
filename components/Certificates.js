function Certificates({ certificates, isAdmin, onEdit }) {
  try {
    const [isEditing, setIsEditing] = React.useState(false);
    const [editingCert, setEditingCert] = React.useState(null);
    const [selectedCert, setSelectedCert] = React.useState(null);
    const [showImagePopup, setShowImagePopup] = React.useState(false);

    const handleAddCertificate = () => {
      const newCert = {
        id: Date.now(),
        name: 'New Certificate',
        issuer: 'Certification Body',
        date: new Date().toISOString().split('T')[0],
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400'
      };
      onEdit('certificates', [...certificates, newCert]);
    };

    const handleEditCertificate = (cert) => {
      setEditingCert({...cert});
      setIsEditing(true);
    };

    const handleSaveCertificate = () => {
      const updatedCerts = certificates.map(cert => 
        cert.id === editingCert.id ? editingCert : cert
      );
      onEdit('certificates', updatedCerts);
      setIsEditing(false);
      setEditingCert(null);
    };

    const handleDeleteCertificate = (certId) => {
      const updatedCerts = certificates.filter(cert => cert.id !== certId);
      onEdit('certificates', updatedCerts);
    };

    return (
      <section id="certificates" className="py-20 bg-gray-50" data-name="certificates" data-file="components/Certificates.js">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Certificates</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quality certifications and industry recognitions that validate our commitment to excellence
            </p>
          </div>

          {isAdmin && (
            <div className="mb-8 text-center">
              <button onClick={handleAddCertificate} className="btn-primary">
                <div className="icon-plus text-sm mr-2 inline-block"></div>
                Add Certificate
              </button>
            </div>
          )}

          {isEditing && editingCert && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                <h3 className="text-xl font-bold mb-4">Edit Certificate</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Certificate Name"
                    value={editingCert.name}
                    onChange={(e) => setEditingCert({...editingCert, name: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Issuing Authority"
                    value={editingCert.issuer}
                    onChange={(e) => setEditingCert({...editingCert, issuer: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="date"
                    value={editingCert.date}
                    onChange={(e) => setEditingCert({...editingCert, date: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                  <input
                    type="url"
                    placeholder="Certificate Image URL"
                    value={editingCert.image}
                    onChange={(e) => setEditingCert({...editingCert, image: e.target.value})}
                    className="w-full p-3 border rounded-lg"
                  />
                  <div className="flex space-x-2">
                    <button onClick={handleSaveCertificate} className="btn-primary">Save</button>
                    <button onClick={() => setIsEditing(false)} className="btn-secondary">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map(cert => (
              <div key={cert.id} className="card text-center">
                {isAdmin && (
                  <div className="flex justify-end space-x-2 mb-4">
                    <button 
                      onClick={() => handleEditCertificate(cert)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <div className="icon-edit text-sm"></div>
                    </button>
                    <button 
                      onClick={() => handleDeleteCertificate(cert.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <div className="icon-trash-2 text-sm"></div>
                    </button>
                  </div>
                )}
                
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="icon-award text-2xl text-blue-600"></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">{cert.name}</h3>
                <p className="text-gray-600 mb-2">{cert.issuer}</p>
                <p className="text-sm text-gray-500">{new Date(cert.date).toLocaleDateString()}</p>
                
                <div className="mt-4">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => {
                      setSelectedCert(cert);
                      setShowImagePopup(true);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <ImagePopup
            image={selectedCert?.image}
            title={selectedCert?.name}
            isVisible={showImagePopup}
            onClose={() => setShowImagePopup(false)}
          />
        </div>
      </section>
    );
  } catch (error) {
    console.error('Certificates component error:', error);
    return null;
  }
}