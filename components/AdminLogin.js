function AdminLogin({ onLogin, isVisible, onClose }) {
  try {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    if (!isVisible) return null;

    const handleLogin = (e) => {
      e.preventDefault();
      // Simple authentication - in production, use proper authentication
      if (username === 'admin' && password === 'admin123') {
        onLogin(true);
        onClose();
        setError('');
      } else {
        setError('Invalid username or password');
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" data-name="admin-login" data-file="components/AdminLogin.js">
        <div className="bg-white rounded-lg max-w-md w-full mx-4 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Admin Login</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
              <div className="icon-x text-xl"></div>
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg"
                placeholder="Enter password"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <button type="submit" className="w-full btn-primary">
              Login
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-600">
            <p>Default credentials:</p>
            <p>Username: admin</p>
            <p>Password: admin123</p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AdminLogin component error:', error);
    return null;
  }
}