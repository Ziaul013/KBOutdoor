const DataManager = {
  getDefaultData() {
    return {
      hero: {
        title: "Premium Quality Products & Services",
        description: "We deliver excellence through innovative solutions and superior manufacturing processes. Your trusted partner for quality products and reliable business services.",
        backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
      },
      categories: [
        {
          id: 1,
          name: "Manufacturing",
          description: "High-quality manufacturing solutions with state-of-the-art equipment",
          image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400",
          products: []
        },
        {
          id: 2,
          name: "Technology",
          description: "Cutting-edge technology products and innovative solutions",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400",
          products: []
        },
        {
          id: 3,
          name: "Services",
          description: "Professional services tailored to your business needs",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
          products: []
        }
      ],
      about: {
        title: "About Our Company",
        description: "With over a decade of experience, we have established ourselves as a leader in providing premium products and services. Our commitment to quality, innovation, and customer satisfaction drives everything we do.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
        values: [
          { title: "Quality First", description: "We never compromise on quality standards" },
          { title: "Innovation", description: "Constantly improving and innovating our processes" },
          { title: "Customer Focus", description: "Your success is our priority" },
          { title: "Sustainability", description: "Environmentally responsible practices" }
        ]
      },
      certificates: [
        {
          id: 1,
          name: "ISO 9001:2015",
          issuer: "International Organization for Standardization",
          date: "2023-01-15",
          image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400"
        },
        {
          id: 2,
          name: "Quality Excellence Award",
          issuer: "Industry Association",
          date: "2023-06-20",
          image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400"
        }
      ],
      gallery: [
        {
          id: 1,
          title: "Factory Floor",
          category: "factory",
          image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400",
          description: "Our modern manufacturing facility"
        },
        {
          id: 2,
          title: "Team Meeting",
          category: "activities",
          image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400",
          description: "Weekly team collaboration session"
        },
        {
          id: 3,
          title: "Quality Control",
          category: "factory",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
          description: "Rigorous quality testing process"
        },
        {
          id: 4,
          title: "Product Showcase",
          category: "products",
          image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400",
          description: "Latest product innovations"
        }
      ],
      contact: {
        companyName: "Your Business",
        email: "info@yourbusiness.com",
        phone: "+1 (555) 123-4567",
        website: "www.yourbusiness.com",
        address: "123 Business Street, Industrial District, City, State 12345"
      }
    };
  },

  loadData() {
    try {
      const saved = localStorage.getItem('businessWebsiteData');
      return saved ? JSON.parse(saved) : this.getDefaultData();
    } catch (error) {
      console.error('Error loading data:', error);
      return this.getDefaultData();
    }
  },

  saveData(data) {
    try {
      localStorage.setItem('businessWebsiteData', JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  },

  exportData(data) {
    return data;
  },

  importData(data) {
    if (this.validateData(data)) {
      this.saveData(data);
      return true;
    }
    return false;
  },

  validateData(data) {
    const required = ['hero', 'categories', 'about', 'certificates', 'gallery', 'contact'];
    return required.every(key => data.hasOwnProperty(key));
  }
};