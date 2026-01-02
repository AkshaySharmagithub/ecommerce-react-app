const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

      
          <div>
            <h2 className="text-2xl font-bold text-pink-500 mb-3">
              Ecommerce App
            </h2>
            <p className="text-sm text-gray-400">
              Best products at best prices. Shop smart, shop fast, shop secure.
            </p>
          </div>

          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-pink-400">Home</a></li>
              <li><a href="/products" className="hover:text-pink-400">Products</a></li>
              <li><a href="/cart" className="hover:text-pink-400">Cart</a></li>
              <li><a href="/users" className="hover:text-pink-400">Users</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Categories
            </h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/products" className="hover:text-pink-400">Men’s Clothing</a></li>
              <li><a href="/products" className="hover:text-pink-400">Women’s Clothing</a></li>
              <li><a href="/products" className="hover:text-pink-400">Electronics</a></li>
              <li><a href="/products" className="hover:text-pink-400">Jewellery</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Why Shop With Us
            </h3>
            <ul className="space-y-2 text-sm">
              <li>🚚 Fast Delivery</li>
              <li>🔒 Secure Payment</li>
              <li>⭐ Top Quality</li>
              <li>💬 24/7 Support</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-400">
          © 2025 Ecommerce App. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
