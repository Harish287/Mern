import { Button } from '@/components/ui/button';
import BannerOne from '../../assets/banner1.png';
import BannerTwo from '../../assets/banner2.png';
import BannerThree from '../../assets/banner3.png';
import BannerFour from '../../assets/banner4.png';
import Logo from '../../assets/N-Bitez-logo.png';
import {
  CakeSlice,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cookie,
  Milk,
  Nut,
  Soup,
  Torus,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from '@/store/shop/product-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';
import { useNavigate } from 'react-router-dom';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useToast } from '@/hooks/use-toast';
import ProductDetailsDialog from '@/components/shopping-view/product-details';

const categoriesWithIcons = [
  { id: 'dryFruits&honey', label: 'Dry-Fruits-&-Honey', icon: Nut },
  { id: 'organicCookies', label: 'Organic-Cookies', icon: Cookie },
  {
    id: 'organicSweets&Snacks',
    label: 'Organic-Sweets-&-Snacks',
    icon: CakeSlice,
  },
  { id: 'organicNoodels', label: 'Organic-Noodels', icon: Soup },
  { id: 'soaps', label: 'Soaps', icon: Torus },
  { id: 'oragnicOils', label: 'Oragnic-Oils', icon: Milk },
];

const brandsWithIcons = [{ id: 'Nbitez', label: 'Nbitez', icon: Logo }];

function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector((state) => state.shopProducts);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);


  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slides = [BannerOne, BannerTwo, BannerThree, BannerFour];

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem('filters');
    const currentFilters = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem('filters', JSON.stringify(currentFilters));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    // console.log(getCurrentProductId);
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


  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);




  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: 'price-lowtohigh',
      }),
    );
  }, [dispatch]);

  console.log(productList, 'productList');

  return (
    <div className=" flex flex-col min-h-screen">
      <div className=" relative w-full h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${index === currentSlide ? 'opacity-100' : 'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length,
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className=" py-12 bg-gray-50">
        <div className="mx-auto px-4 container">
          <h2 className=" text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesWithIcons.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, 'category')
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12  mb-4 text-primary" />
                  <span className=" font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className=" py-12 bg-gray-50">
        <div className="mx-auto px-4 container">
          <h2 className=" text-3xl font-bold text-center mb-8">
            Shop by Brand
          </h2>
          <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
            {brandsWithIcons.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, 'brand')}
                className="cursor-pointer w-[200px] m-auto  hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  {/* <brandItem.icon className="w-12 h-12  mb-4 text-primary" / */}
                  <img src={brandItem.icon} alt={brandItem.label} />
                  <span className=" font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto px-4 container">
          <h2 className=" text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItems) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItems}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
