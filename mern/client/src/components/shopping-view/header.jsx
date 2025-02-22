import {
  HousePlug,
  LogOut,
  Menu,
  ShoppingCart,
  UserCog,
  Search,
} from 'lucide-react';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingViewHeaderMenuItems } from '@/config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { logoutUser } from '@/store/auth-slice';
import UserCartWrapper from './cart-wrapper';
import { useEffect, useState } from 'react';
import { fetchCartItems } from '@/store/shop/cart-slice';
import { Label } from '../ui/label';
import Logo from '../../assets/N-Bitez-logo.png';
import { Input } from '../ui/input';

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem('filters');
    const currentFilter =
      getCurrentMenuItem.id !== 'home' &&
      getCurrentMenuItem.id !== 'products' &&
      getCurrentMenuItem.id !== 'search'
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem('filters', JSON.stringify(currentFilter));

    location.pathname.includes('listing') && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`),
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className="text-[16px] font-medium cursor-pointer"
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.shopCart);

  const [openCartSheet, setOpenCartSheet] = useState(false);

  // const [openSearchSheet, setOpenSearchSheet] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    dispatch(fetchCartItems(user?.id));
  }, [dispatch]);

  console.log(cartItems, 'cartItems');

  return (
    <div className=" flex lg:items-center lg:flex-row flex-col gap-4">
      {/* Search */}
      {/* <Sheet
        open={openSearchSheet}
        onOpenChange={() => setOpenSearchSheet(false)}
      >
        <Button
          onClick={() => setOpenSearchSheet(true)}
          variant="outline"
          size="icon"
        >
          <Search className="w-6 h-6" />
          <span className="sr-only">Search</span>
        </Button>
        <UserCartWrapper
          setOpenSearchSheet={setOpenSearchSheet}

          // cartItems={
          //   cartItems && cartItems.items && cartItems.items.length > 0
          //     ? cartItems.items
          //     : []
          // }
        />
      </Sheet> */}

      {/* Search ends*/}

      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className=" bg-black">
            <AvatarFallback className=" bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate('/shop/account')}>
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingViewHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className=" sticky top-0 z-40 w-full border-b bg-background">
      <div className=" flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className=" flex items-center gap-2">
          {/* <HousePlug className=" h-6 w-6" /> */}
          <img
            src={Logo}
            className=" h-18 object-cover flex justify-center items-center w-18"
          />

          <span
            className=" font-bold relative ml-[-25px] text-[20px] "
            style={{ fontFamily: 'playfair display,serif' }}
          >
            Nbitez
          </span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className=" h-6 w-6" />
              <span className="sr-only">Toggle Header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className=" w-full max-w-xs">
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className=" hidden lg:block">
          <MenuItems />
        </div>

        {/* {isAuthenticated ? ( */}
        <div className=" hidden lg:block">
          <HeaderRightContent />
        </div>
        {/* ) : null} */}
      </div>
    </header>
  );
}

export default ShoppingViewHeader;
