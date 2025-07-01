function Header({ showAdmin, setShowAdmin, contactData }) {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const scrollToSection = (sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMenuOpen(false);
    };

    return (
      <header className="bg-white shadow-md fixed w-full top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="icon-building text-xl text-white"></div>
                </div>
                <h1 className="text-2xl font-bold text-gray-800">{contactData?.companyName || 'Your Business'}</h1>
              </div>

            <nav className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-gray-600 hover:text-blue-600 transition-colors">Home</button>
              <button onClick={() => scrollToSection('products')} className="text-gray-600 hover:text-blue-600 transition-colors">Products</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-600 hover:text-blue-600 transition-colors">About</button>
              <button onClick={() => scrollToSection('certificates')} className="text-gray-600 hover:text-blue-600 transition-colors">Certificates</button>
              <button onClick={() => scrollToSection('gallery')} className="text-gray-600 hover:text-blue-600 transition-colors">Gallery</button>
            </nav>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAdmin(!showAdmin)}
                className="hidden md:block btn-secondary text-sm"
              >
                <div className="icon-settings text-sm mr-2 inline-block"></div>
                {showAdmin ? 'Exit Admin' : 'Admin'}
              </button>
              
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                <div className="icon-menu text-xl"></div>
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-2">
                <button onClick={() => scrollToSection('home')} className="text-left py-2 text-gray-600">Home</button>
                <button onClick={() => scrollToSection('products')} className="text-left py-2 text-gray-600">Products</button>
                <button onClick={() => scrollToSection('about')} className="text-left py-2 text-gray-600">About</button>
                <button onClick={() => scrollToSection('certificates')} className="text-left py-2 text-gray-600">Certificates</button>
                <button onClick={() => scrollToSection('gallery')} className="text-left py-2 text-gray-600">Gallery</button>
                <button onClick={() => setShowAdmin(!showAdmin)} className="text-left py-2 text-blue-600">Admin Panel</button>
              </nav>
            </div>
          )}
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}