class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [data, setData] = React.useState(DataManager.loadData());
    const [showAdmin, setShowAdmin] = React.useState(false);
    const [showAdminPanel, setShowAdminPanel] = React.useState(false);
    const [showAdminLogin, setShowAdminLogin] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    const handleEdit = (section, newData) => {
      const updatedData = { ...data, [section]: newData };
      setData(updatedData);
      DataManager.saveData(updatedData);
    };

    const handleExport = () => {
      return DataManager.exportData(data);
    };

    const handleImport = (importedData) => {
      if (DataManager.importData(importedData)) {
        setData(importedData);
        window.location.reload();
      }
    };

    return (
      <div className="min-h-screen" data-name="app" data-file="app.js">
        <Header 
          showAdmin={showAdmin} 
          setShowAdmin={(value) => {
            if (value && !isAuthenticated) {
              setShowAdminLogin(true);
            } else {
              setShowAdmin(value);
            }
          }} 
          contactData={data.contact}
        />
        
        <main>
          <Hero heroData={data.hero} isAdmin={showAdmin} onEdit={handleEdit} />
          <ProductCategories categories={data.categories} isAdmin={showAdmin} onEdit={handleEdit} />
          <AboutUs aboutData={data.about} isAdmin={showAdmin} onEdit={handleEdit} />
          <Certificates certificates={data.certificates} isAdmin={showAdmin} onEdit={handleEdit} />
          <Gallery galleryData={data.gallery} isAdmin={showAdmin} onEdit={handleEdit} />
        </main>

        <Footer contactData={data.contact} isAdmin={showAdmin} onEdit={handleEdit} />

        {showAdmin && (
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setShowAdminPanel(true)}
              className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
            >
              <div className="icon-settings text-xl"></div>
            </button>
          </div>
        )}

        <AdminPanel
          isVisible={showAdminPanel}
          onClose={() => setShowAdminPanel(false)}
          onExport={handleExport}
          onImport={handleImport}
        />

        <AdminLogin
          isVisible={showAdminLogin}
          onClose={() => setShowAdminLogin(false)}
          onLogin={(success) => {
            if (success) {
              setIsAuthenticated(true);
              setShowAdmin(true);
            }
          }}
        />
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);