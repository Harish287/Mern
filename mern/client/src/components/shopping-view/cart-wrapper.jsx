import { Button } from '../ui/button';
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import UserCartItemsContent from './car-items-content';

function UserCartWrapper({ cartItems }) {
  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItems) =>
            sum +
            (currentItems?.salePrice > 0
              ? currentItems?.salePrice
              : currentItems?.price) *
              currentItems.quantity, 0
        )
      : 0;

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4">
        {cartItems && cartItems.length > 0
          ? cartItems.map((item) => <UserCartItemsContent cartItems={item} />)
          : null}
      </div>
      <div className="mt-8 space-y-4">
        <div className=" flex justify-between">
          <span className=" font-bold">Total</span>
          <span className=" font-bold">₹{totalCartAmount}</span>
        </div>
      </div>
      <Button className="w-full mt-6">CheckOut</Button>
    </SheetContent>
  );
}

export default UserCartWrapper;
