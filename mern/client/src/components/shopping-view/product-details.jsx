import { StarIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Dialog, DialogContent } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import { setProdcuctDetails } from '@/store/shop/product-slice';
import { Label } from '@radix-ui/react-dropdown-menu';
import StartRatingComponent from '../common/star-rating';
import { useEffect, useState } from 'react';
import { addReview, getReviews } from '@/store/shop/review-slice';
import StarRatingComponent from '../common/star-rating';

function ProductDetailsDialog({ open, setOpen, productDetails }) {
  const [reviewMsg, setReviewMsg] = useState('');
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { cartItems } = useSelector((state) => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  const { toast } = useToast();
  function handleRatingChange(getRating) {
    console.log(getRating, 'getRating');

    setRating(getRating);
  }

  function handleAddToCart(getCurrentProductId, getTotalStock) {
    let getCartItems = cartItems.items || [];

    if (getCartItems.length) {
      const indexOfCurrentItems = getCartItems.findIndex(
        (item) => item.productId === getCurrentProductId,
      );
      if (indexOfCurrentItems > -1) {
        const getQuantity = getCartItems[indexOfCurrentItems].quantity;

        if (getQuantity + 1 > getTotalStock) {
          toast({
            title: `only ${getQuantity} quantity can be added for this item`,
            variant: 'destructive',
          });
          return;
        }
      }
    }
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: 'Product is added to cart',
        });
      }
    });
  }

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProdcuctDetails());
    setRating(0);
    setReviewMsg('');
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        userName: user?.userName,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      }),
    ).then((data) => {
      if (data.payload.success) {
        setRating(0);
        setReviewMsg('');
        dispatch(getReviews(productDetails?._id));
        toast({
          title: 'Review added successfully!',
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  console.log(reviews, 'reviews');
  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className=" grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw]  lg:max-w-[70vw] lg:h-[650px] overflow-auto">
        <div className=" relative overflow-hidden  rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <h1
              className=" text-2xl font-extrabold"
              dangerouslySetInnerHTML={{ __html: productDetails?.title }}
            ></h1>
            <p
              className="text-muted-foreground text-lg mb-5 mt-4 overflow-auto max-h-40"
              dangerouslySetInnerHTML={{ __html: productDetails?.description }}
            ></p>
          </div>
          <div className=" flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${productDetails?.salePrice > 0 ? ' line-through' : ''}`}
            >
              ₹{productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className=" text-2xl font-bold text-muted-foreground">
                ₹{productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className=" flex items-center gap-0.5">
              <StarRatingComponent rating={averageReview} />
            </div>
            <span className=" text-muted-foreground">
              ({averageReview.toFixed(2)})
            </span>
          </div>
          <div className=" mt-5 mb-5">
            {productDetails?.totalStock === 0 ? (
              <Button className=" w-full opacity-60 cursor-not-allowed">
                Out Of Stock
              </Button>
            ) : (
              <Button
                className=" w-full"
                onClick={() =>
                  handleAddToCart(
                    productDetails?._id,
                    productDetails.totalStock,
                  )
                }
              >
                Add to Cart
              </Button>
            )}
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              {reviews && reviews.length > 0 ? (
                reviews?.map((reviewItem) => (
                  <div className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {reviewItem?.userName[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.userName}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">
                        {reviewItem.reviewMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>

            <div className=" mt-6 flex-col flex gap-2">
              <Label>Write a Review</Label>
              <div className="flex gap-0.5">
                <StartRatingComponent
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="write a Review.."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ''}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
