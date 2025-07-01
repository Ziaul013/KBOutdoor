function AdminPanel({ isVisible, onClose, onExport, onImport }) {
  try {
    const [activeTab, setActiveTab] = React.useState('export');

    if (!isVisible) return null;

    const handleFileImport = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            onImport(data);
            alert('Data imported successfully!');
          } catch (error) {
            alert('Error importing data. Please check the file format.');
          }
        };
        reader.readAsText(file);
      }
    };

    const exportData = () => {
      const data = onExport();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'website-data.json';
      a.click();
      URL.revokeObjectURL(url);
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" data-name="admin-panel" data-file="components/AdminPanel.js">
        <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Admin Panel</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
                <div className="icon-x text-xl"></div>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('export')}
                className={`px-4 py-2 rounded ${activeTab === 'export' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Export Data
              </button>
              <button
                onClick={() => setActiveTab('import')}
                className={`px-4 py-2 rounded ${activeTab === 'import' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Import Data
              </button>
              <button
                onClick={() => setActiveTab('help')}
                className={`px-4 py-2 rounded ${activeTab === 'help' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Help
              </button>
            </div>

            {activeTab === 'export' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Export Website Data</h3>
                <p className="text-gray-600">
                  Download all your website content as a JSON file for backup or transfer purposes.
                </p>
                <button onClick={exportData} className="btn-primary">
                  <div className="icon-download text-sm mr-2 inline-block"></div>
                  Download Data
                </button>
              </div>
            )}

            {activeTab === 'import' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold">Import Website Data</h3>
                <p className="text-gray-600">
                  Upload a previously exported JSON file to restore your website content.
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileImport}
                    className="hidden"
                    id="file-import"
                  />
                  <label htmlFor="file-import" className="cursor-pointer">
                    <div className="icon-upload text-2xl text-gray-400 mb-2"></div>
                    <p className="text-gray-600">Click to select JSON file</p>
                  </label>
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold">How to Use Admin Panel</h3>
                <div className="space-y-4 text-gray-600">
                  <div>
                    <h4 className="font-medium text-gray-800">Editing Content:</h4>
                    <p>Click the "Edit" buttons on each section to modify text, images, and other content directly on the page.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Adding Items:</h4>
                    <p>Use "Add" buttons in product categories, certificates, and gallery sections to create new items.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Images:</h4>
                    <p>Use image URLs from services like Unsplash, your own hosting, or any public image URL.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">Backup:</h4>
                    <p>Regularly export your data to keep backups of your website content.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AdminPanel component error:', error);
    return null;
  }
}