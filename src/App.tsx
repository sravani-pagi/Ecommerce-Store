import React, { useState } from "react";
import { FaShoppingCart, FaHeart, FaUser, FaSearch } from "react-icons/fa";
import Confetti from "react-confetti";
import "./App.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

const App: React.FC = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Auth / modals
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
  });

  // Logged in user
  const [currentUser, setCurrentUser] = useState<{ username: string } | null>(
    null
  );

  // Cart / wishlist / panels
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  // Checkout / success / confetti
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Checkout form state (basic)
  const [checkoutData, setCheckoutData] = useState({
    name: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    payment: "COD",
  });

  // PRODUCTS
  const products: Product[] = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "Premium sound quality for immersive music experience",
      price: 999.99,
      category: "Electronics",
      image:
        "https://img.freepik.com/premium-photo/wireless-headphones-yellow-background_176402-7160.jpg",
    },
    {
      id: 2,
      name: "Smartwatch",
      description: "Track fitness, heart rate, and notifications",
      price: 1499.99,
      category: "Electronics",
      image:
        "https://t3.ftcdn.net/jpg/05/89/20/84/360_F_589208452_jTxyYyu4DdPnVKFz2MBBb3nNs71ouyFo.jpg",
    },
    {
      id: 3,
      name: "Modern Sofa",
      description: "Stylish and comfortable 3-seater sofa",
      price: 14999.99,
      category: "Furniture",
      image:
        "https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 4,
      name: "Running Shoes",
      description: "Lightweight shoes designed for comfort and performance",
      price: 8999.99,
      category: "Fashion",
      image:
        "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: 5,
      name: "Bluetooth Speaker",
      description: "Portable waterproof speaker with deep bass",
      price: 1399.99,
      category: "Electronics",
      image:
        "https://avshack.in/cdn/shop/files/bose-soundLink-max-portable-speaker-03.jpg?v=1733137763&width=1214",
    },
    {
      id: 6,
      name: "Office Chair",
      description: "Ergonomic chair with lumbar support for long hours",
      price: 1999.99,
      category: "Furniture",
      image:
        "https://www.chennaichairs.com/images/thumbs/0006313_ample-mesh-office-chair_550.webp",
    },
    {
      id: 7,
      name: "Formal Shirts",
      description:
        "Typically made from smooth, wrinkle-resistant fabrics like cotton or blends",
      price: 899.99,
      category: "Fashion",
      image:
        "https://www.montecarlo.in/cdn/shop/files/2250401812FS-1-38_1.jpg?v=1750766538",
    },
    {
      id: 8,
      name: "Study Table",
      description:
        "Table designed for writing, reading, or using a laptop.",
      price: 7999.99,
      category: "Furniture",
      image:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTt7ppeb2WdnHejbOV4lyfcoecax6Al2rz0Y79y8jAnNwHVXOSqV1k2gMNuvEq1mOoQR8EcpaTc91fIWilUDmQhkg4MhF3ikdrbHYqkufo",
    },

    {
      id: 9,
      name: "",
      description:
        "Table designed for Eating, a peaceful discussion with family.",
      price: 1299.99,
      category: "Furniture",
      image:
        "https://cdn.media.amplience.net/i/boconcept/f06156a6-9cad-4fef-a487-ae6d00c83f51?",
    },
    {
      id: 10,
      name: "",
      description:
        "Fashion keeps Good Outfit",
      price: 899.99,
      category: "Fashion",
      image:"https://m.media-amazon.com/images/I/710Qt0-DGbL._AC_UY1100_.jpg",
    },
    {
      id: 11,
      name: "",
      description:
        "Happy Listening",
      price: 1500.99,
      category: "Electronics",
      image:"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTxMVhn6VGHedJ3OIsNA-QH_eU4oDwNAmuHixPFlzdSVoUD-mvbalAwC2SLfltknzs9s0EsQJOxRlQgC0D1rtBsZLD26R23goRu5a7XxANdGVxqNf0EEL1J",
    },
    {
      id: 12,
      name: "",
      description:
        "",
      price: 599.99,
      category: " Fashion",
      image:"https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw6c9df22a/images/Titan/Catalog/2656WM01_1.jpg?sw=600&sh=600",
    },
  ];


  const filteredProducts = products.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  // AUTH HANDLERS
  const handleLogin = () => {
    if (loginUsername.trim() === "" || loginPassword.trim() === "") {
      alert("Please enter username and password!");
      return;
    }
    setCurrentUser({ username: loginUsername });
    setShowLogin(false);
    // clear login inputs (optional)
    setLoginUsername("");
    setLoginPassword("");
  };

  const handleRegister = () => {
    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password ||
      !registerData.phone
    ) {
      alert("Please fill all fields!");
      return;
    }
    // in a real app you'd call API — here we simply set logged in user
    setCurrentUser({ username: registerData.username });
    setShowRegister(false);
    // clear register form
    setRegisterData({ username: "", email: "", password: "", phone: "" });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCart([]);
    setWishlist([]);
  };

  // WISHLIST HANDLERS
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((i) => i.id === product.id);
    if (exists) {
      setWishlist(wishlist.filter((i) => i.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id: number) =>
    setWishlist(wishlist.filter((i) => i.id !== id));

  // CART HANDLERS
  // addToCart now prevents duplicates — increments quantity logic could be added later
  const addToCart = (product: Product) => {
    // if product already in cart, do nothing (or you could allow duplicates)
    if (cart.some((i) => i.id === product.id)) {
      // optionally notify user
      // alert("Item already in cart");
      return;
    }
    setCart([...cart, product]);
  };

  const removeFromCart = (id: number) =>
    setCart(cart.filter((i) => i.id !== id));

  const moveWishlistToCart = (product: Product) => {
    // remove from wishlist and add to cart if not present
    removeFromWishlist(product.id);
    addToCart(product);
    setShowWishlist(false);
    setShowCart(true);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  // CHECKOUT HANDLERS
  const handlePlaceOrder = () => {
    const { name, address, city, pincode, phone } = checkoutData;
    if (!name || !address || !city || !pincode || !phone) {
      alert("Please fill all delivery details!");
      return;
    }

    setOrderSuccess(true);
    // show confetti and success for 3.5s then clear cart & close
    setTimeout(() => {
      setOrderSuccess(false);
      setShowCheckout(false);
      setCart([]);
      setShowCart(false);
      setCheckoutData({
        name: "",
        address: "",
        city: "",
        pincode: "",
        phone: "",
        payment: "COD",
      });
    }, 3500);
  };

  // image error fallback
  const onImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.onerror = null;
    target.src = "https://via.placeholder.com/400x300/6366f1/ffffff?text=Product+Image";
  };

  return (
    <>
      {/* HEADER */}
      <header>
        <h1>ShopHub</h1>
        <div className="header-buttons">
          <button
            className="cart-btn"
            onClick={() => {
              setShowCart(true);
              setShowWishlist(false);
            }}
          >
            <FaShoppingCart /> Cart ({cart.length})
          </button>

          <button
            className={`wishlist-btn`}
            onClick={() => {
              setShowWishlist(true);
              setShowCart(false);
            }}
          >
            <FaHeart /> Wishlist ({wishlist.length})
          </button>

          {currentUser ? (
            <button className="login-btn" onClick={handleLogout}>
              <FaUser /> Logout ({currentUser.username})
            </button>
          ) : (
            <>
              <button className="login-btn" onClick={() => setShowLogin(true)}>
                <FaUser /> Login
              </button>
              
            </>
          )}
        </div>
      </header>

      {/* SEARCH BAR */}
      <div className="search-bar">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Fashion">Fashion</option>
        </select>
      </div>

      {/* PRODUCT GRID */}
      <main style={{ background: "#eef2f6", padding: "20px" }}>
        <h1 style={{ textAlign: "center", color: "#02172fff" }}>
          Explore Our Products
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {filteredProducts.map((p) => {
            const inWishlist = wishlist.some((i) => i.id === p.id);
            const inCart = cart.some((i) => i.id === p.id);
            return (
              <div
                key={p.id}
                style={{
                  background: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  textAlign: "center",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={p.image}
                  alt={p.name}
                  onError={onImageError}
                  style={{
                    width: "100%",
                    height: "200px",
                    borderRadius: "8px",
                    objectFit: "cover",
                    marginBottom: "10px",
                  }}
                />
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <p style={{ color: "#007bff", fontWeight: "bold" }}>
                  ${p.price.toFixed(2)}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <button
                    className="cart-btn"
                    onClick={() => {
                      addToCart(p);
                      setShowCart(true);
                      setShowWishlist(false);
                    }}
                    aria-disabled={inCart}
                    title={inCart ? "Already in cart" : "Add to cart"}
                  >
                    🛒 {inCart ? "In Cart" : "Add to Cart"}
                  </button>

                  <button
                    className={`wishlist-btn ${inWishlist ? "active" : ""}`}
                    onClick={() => toggleWishlist(p)}
                  >
                    {inWishlist ? "♥ In Wishlist" : "♡ Wishlist"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* LOGIN MODAL */}
      {showLogin && (
        <div
          className="modal-overlay"
          onClick={() => setShowLogin(false)}
          role="dialog"
        >
          <div
            className="checkout-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 420 }}
          >
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleLogin}>Login</button>
              <button onClick={() => setShowLogin(false)}>Cancel</button>
            </div>
            <p style={{ marginTop: 12, fontSize: 14 }}>
              Don’t have an account?{" "}
              <span
                style={{ color: "#5b6dfc", cursor: "pointer", fontWeight: 600 }}
                onClick={() => {
                  setShowLogin(false);
                  setShowRegister(true);
                }}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      )}

      {/* REGISTER MODAL */}
      {showRegister && (
        <div
          className="modal-overlay"
          onClick={() => setShowRegister(false)}
          role="dialog"
        >
          <div
            className="checkout-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 500 }}
          >
            <h2>Register</h2>
            <input
              type="text"
              placeholder="Username"
              value={registerData.username}
              onChange={(e) =>
                setRegisterData({ ...registerData, username: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={registerData.phone}
              onChange={(e) =>
                setRegisterData({ ...registerData, phone: e.target.value })
              }
            />
            <div className="modal-actions">
              <button onClick={handleRegister}>Register</button>
              <button onClick={() => setShowRegister(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* CART PANEL */}
      <div className={`side-panel ${showCart ? "open" : ""}`}>
        <div className="panel-header">
          <h2>🛒 Your Cart</h2>
          <button
            className="close-btn"
            onClick={() => {
              setShowCart(false);
            }}
          >
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <p className="empty-text">Your cart is empty.</p>
        ) : (
          <>
            <div className="panel-items">
              {cart.map((item) => (
                <div key={item.id} className="panel-item">
                  <img src={item.image} alt={item.name} onError={onImageError} />
                  <div className="panel-item-info">
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: 15 }}>
              <div className="cart-total">Total: ${cartTotal.toFixed(2)}</div>
              <button
                className="buy-now-btn"
                onClick={() => {
                  setShowCheckout(true);
                }}
              >
                Proceed to Buy
              </button>
            </div>
          </>
        )}
      </div>

      {/* CHECKOUT MODAL */}
      {showCheckout && (
        <div
          className="modal-overlay"
          onClick={() => {
            // clicking backdrop cancels checkout
            setShowCheckout(false);
            setOrderSuccess(false);
          }}
        >
          <div
            className="checkout-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 520 }}
          >
            {!orderSuccess ? (
              <>
                <h2>Checkout</h2>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={checkoutData.name}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Delivery Address"
                  value={checkoutData.address}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, address: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="City"
                  value={checkoutData.city}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, city: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="ZIP / Pincode"
                  value={checkoutData.pincode}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, pincode: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={checkoutData.phone}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, phone: e.target.value })
                  }
                />

                <select
                  value={checkoutData.payment}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, payment: e.target.value })
                  }
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="Card">Credit/Debit Card</option>
                  <option value="UPI">UPI / Wallet</option>
                </select>

                <div className="modal-actions">
                  <button className="place-order-btn" onClick={handlePlaceOrder}>
                    Place Order
                  </button>
                  <button onClick={() => setShowCheckout(false)}>Cancel</button>
                </div>
              </>
            ) : (
              <div className="success-message">
                <Confetti numberOfPieces={250} recycle={false} gravity={0.3} />
                <div className="success-icon">✔️</div>
                <h3>Order Placed Successfully!</h3>
                <p>Your order will be delivered soon. Thank you for shopping with ShopHub!</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* WISHLIST PANEL */}
      <div className={`side-panel ${showWishlist ? "open" : ""}`}>
        <div className="panel-header">
          <h2>❤️ Your Wishlist</h2>
          <button
            className="close-btn"
            onClick={() => {
              setShowWishlist(false);
            }}
          >
            ×
          </button>
        </div>

        {wishlist.length === 0 ? (
          <p className="empty-text">No items in your wishlist.</p>
        ) : (
          <div className="panel-items">
            {wishlist.map((item) => (
              <div key={item.id} className="panel-item">
                <img src={item.image} alt={item.name} onError={onImageError} />
                <div className="panel-item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                    <button onClick={() => moveWishlistToCart(item)}>Move to Cart</button>
                    <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BACKDROP (for panels) */}
      {(showCart || showWishlist) && (
        <div
          className="backdrop"
          onClick={() => {
            setShowCart(false);
            setShowWishlist(false);
          }}
        />
      )}

      <footer>
        
        <p> Thankyou| @ShopHub</p>
      </footer>
    </>
  );
};

export default App;
