// components/Navbar.tsx
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  Heart, 
  LogOut, 
  Package,
  Settings,
  UserCheck,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { userSession, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const cartItemsCount = 3;
  const wishlistItemsCount = 2;

  const categories = [
    { name: "Sneakers", href: "/category/sneakers" },
    { name: "Running", href: "/category/running" },
    { name: "Casual", href: "/category/casual" },
    { name: "Formal", href: "/category/formal" },
    { name: "Sandals", href: "/category/sandals" },
    { name: "Boots", href: "/category/boots" },
  ];

  const brands = [
    "Nike", "Adidas", "Puma", "New Balance", "Converse", "Vans"
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setIsSearchOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getUserName = () => {
    if (!userSession?.token) return 'User';
    try {
      const payload = JSON.parse(atob(userSession.token.split('.')[1]));
      return payload.name || payload.email?.split('@')[0] || 'User';
    } catch {
      return 'User';
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Main Navigation Bar */}
          <div className="flex h-16 items-center justify-between w-full">
            
            {/* Logo - Left */}
            <div className="flex items-center flex-1">
              <Link 
                to="/" 
                className="text-2xl font-bold tracking-tight text-gray-900 hover:text-gray-700 transition-colors"
              >
                STEPUPZ
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div className="hidden lg:flex items-center justify-center space-x-1 flex-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 h-9 px-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                    Categories
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="center">
                  <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Shop by Category
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.name} asChild>
                      <Link to={category.href} className="w-full cursor-pointer">
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-1 h-9 px-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                    Brands
                    <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48" align="center">
                  <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Shop by Brand
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {brands.map((brand) => (
                    <DropdownMenuItem key={brand} asChild>
                      <Link to={`/brand/${brand.toLowerCase()}`} className="w-full cursor-pointer">
                        {brand}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" className="h-9 px-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100" asChild>
                <Link to="/sale" className="text-red-600 font-semibold">
                  Sale
                </Link>
              </Button>

              <Button variant="ghost" className="h-9 px-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100" asChild>
                <Link to="/new-arrivals">
                  New Arrivals
                </Link>
              </Button>

              {isAuthenticated && (
                <Button variant="ghost" className="h-9 px-3 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100" asChild>
                  <Link to="/recently-viewed">
                    Recently Viewed
                  </Link>
                </Button>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center justify-end space-x-1 flex-1">
              {/* Search */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Wishlist */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative" 
                asChild
                aria-label="Wishlist"
              >
                {isAuthenticated ? (
                  <Link to="/wishlist">
                    <Heart className="h-5 w-5" />
                    {wishlistItemsCount > 0 && (
                      <Badge 
                        className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] font-semibold bg-red-500 text-white border-0"
                      >
                        {wishlistItemsCount}
                      </Badge>
                    )}
                  </Link>
                ) : (
                  <Link to="/signin">
                    <Heart className="h-5 w-5" />
                  </Link>
                )}
              </Button>

              {/* Account Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    aria-label="Account"
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {isAuthenticated ? (
                    <>
                      <DropdownMenuLabel className="flex items-center gap-2">
                        <UserCheck className="h-4 w-4 text-green-600" />
                        <span className="font-semibold">{getUserName()}</span>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/account" className="flex items-center gap-2 cursor-pointer w-full">
                          <User className="h-4 w-4" />
                          My Account
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/orders" className="flex items-center gap-2 cursor-pointer w-full">
                          <Package className="h-4 w-4" />
                          Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/wishlist" className="flex items-center gap-2 cursor-pointer w-full">
                          <Heart className="h-4 w-4" />
                          Wishlist
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/settings" className="flex items-center gap-2 cursor-pointer w-full">
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-red-600 focus:text-red-600 cursor-pointer w-full"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuLabel className="font-semibold">Welcome!</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/signin" className="w-full cursor-pointer font-medium">
                          Sign In
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/signup" className="w-full cursor-pointer">
                          Create Account
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/orders" className="text-sm text-gray-500 cursor-pointer w-full">
                          Track Your Order
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Cart */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100 relative" 
                asChild
                aria-label="Shopping cart"
              >
                {isAuthenticated ? (
                  <Link to="/cart">
                    <ShoppingBag className="h-5 w-5" />
                    {cartItemsCount > 0 && (
                      <Badge 
                        className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px] font-semibold bg-red-500 text-white border-0"
                      >
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Link>
                ) : (
                  <Link to="/signin">
                    <ShoppingBag className="h-5 w-5" />
                  </Link>
                )}
              </Button>

              {/* Mobile Menu Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
                    aria-label="Menu"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col gap-8 mt-8">
                    {/* User Info in Mobile Menu */}
                    {isAuthenticated && (
                      <div className="pb-4 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">Welcome back!</p>
                        <p className="text-sm text-gray-600">{getUserName()}</p>
                      </div>
                    )}

                    {/* Mobile Navigation Links */}
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Categories</h3>
                      <div className="space-y-3">
                        {categories.map((category) => (
                          <Link
                            key={category.name}
                            to={category.href}
                            className="block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={() => document.getElementById('radix-:r0:')?.click()}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Brands</h3>
                      <div className="space-y-3">
                        {brands.map((brand) => (
                          <Link
                            key={brand}
                            to={`/brand/${brand.toLowerCase()}`}
                            className="block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={() => document.getElementById('radix-:r0:')?.click()}
                          >
                            {brand}
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-4 border-t border-gray-200">
                      <Link
                        to="/sale"
                        className="block text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                        onClick={() => document.getElementById('radix-:r0:')?.click()}
                      >
                        Sale
                      </Link>
                      <Link
                        to="/new-arrivals"
                        className="block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={() => document.getElementById('radix-:r0:')?.click()}
                      >
                        New Arrivals
                      </Link>
                      {isAuthenticated && (
                        <Link
                          to="/recently-viewed"
                          className="block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                          onClick={() => document.getElementById('radix-:r0:')?.click()}
                        >
                          Recently Viewed
                        </Link>
                      )}
                    </div>

                    {/* Auth Section in Mobile Menu */}
                    <div className="pt-4 border-t border-gray-200">
                      {isAuthenticated ? (
                        <div className="space-y-3">
                          <Link
                            to="/account"
                            className="block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={() => document.getElementById('radix-:r0:')?.click()}
                          >
                            My Account
                          </Link>
                          <Link
                            to="/orders"
                            className="block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={() => document.getElementById('radix-:r0:')?.click()}
                          >
                            Orders
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="block text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
                          >
                            Logout
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <Link
                            to="/signin"
                            className="block text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={() => document.getElementById('radix-:r0:')?.click()}
                          >
                            Sign In
                          </Link>
                          <Link
                            to="/signup"
                            className="block text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            onClick={() => document.getElementById('radix-:r0:')?.click()}
                          >
                            Create Account
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Secondary Info Bar */}
          <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8 py-3 border-t border-gray-100 w-full">
            <span className="text-xs font-medium text-gray-500 hover:text-gray-700 cursor-pointer transition-colors uppercase tracking-wide">
              Free Shipping Over $100
            </span>
            <span className="text-xs font-medium text-gray-500 hover:text-gray-700 cursor-pointer transition-colors uppercase tracking-wide">
              30-Day Returns
            </span>
            <span className="text-xs font-medium text-gray-500 hover:text-gray-700 cursor-pointer transition-colors uppercase tracking-wide">
              Authenticity Guaranteed
            </span>
            <span className="text-xs font-medium text-gray-500 hover:text-gray-700 cursor-pointer transition-colors uppercase tracking-wide">
              Secure Checkout
            </span>
          </div>
        </div>
      </nav>

      {/* Search Dialog */}
      <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Search Products</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <Input
              placeholder="Search for shoes, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="flex-1"
            />
            <Button type="submit" size="sm" className="px-4">
              <Search className="h-4 w-4" />
            </Button>
          </form>
          <div className="mt-4 text-sm text-gray-500">
            <span className="font-medium">Popular searches:</span>{' '}
            <button className="text-blue-600 hover:underline font-medium">Nike Air Force</button>,{' '}
            <button className="text-blue-600 hover:underline font-medium">Running Shoes</button>,{' '}
            <button className="text-blue-600 hover:underline font-medium">Sandals</button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}