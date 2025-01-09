export const registerFormControls = [
  {
    name: 'userName',
    lable: 'User Name',
    placeholder: 'Enter your user name',
    componentType: 'input',
    type: 'text',
  },
  {
    name: 'email',
    lable: 'Email',
    placeholder: 'Enter your user email',
    componentType: 'input',
    type: 'email',
  },
  {
    name: 'password',
    lable: 'Password',
    placeholder: 'Enter your user password',
    componentType: 'input',
    type: 'password',
  },
];

export const loginFormControls = [
  {
    name: 'email',
    lable: 'Email',
    placeholder: 'Enter your user email',
    componentType: 'input',
    type: 'email',
  },
  {
    name: 'password',
    lable: 'Password',
    placeholder: 'Enter your user password',
    componentType: 'input',
    type: 'password',
  },
];

export const addProductFormElements = [
  {
    label: 'Title',
    name: 'title',
    componentType: 'input',
    type: 'text',
    placeholder: 'Enter product title',
  },
  {
    label: 'Description',
    name: 'description',
    componentType: 'textarea',
    placeholder: 'Enter product description',
  },
  {
    label: 'Category',
    name: 'category',
    componentType: 'select',
    options: [
      // { id: "men", label: "Men" },
      // { id: "women", label: "Women" },
      // { id: "kids", label: "Kids" },
      // { id: "accessories", label: "Accessories" },
      // { id: "footwear", label: "Footwear" },
      { id: 'dryFruits&honey', label: 'Dry-Fruits-&-Honey' },
      { id: 'organicCookies', label: 'Organic-Cookies' },
      { id: 'organicSweets&Snacks', label: 'Organic-Sweets-&-Snacks' },
      { id: 'organicNoodels', label: 'Organic-Noodels' },
      { id: 'soaps', label: 'Soaps' },
      { id: 'oragnicOils', label: 'Oragnic-Oils' },
    ],
  },
  {
    label: 'Brand',
    name: 'brand',
    componentType: 'select',
    options: [
      // { id: 'nike', label: 'Nike' },
      // { id: 'adidas', label: 'Adidas' },
      // { id: 'puma', label: 'Puma' },
      // { id: 'levi', label: "Levi's" },
      // { id: 'zara', label: 'Zara' },
      // { id: 'h&m', label: 'H&M' },
      { id: 'Nbitez', label: 'Nbitez' },
    ],
  },
  {
    label: 'Price',
    name: 'price',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter product price',
  },
  {
    label: 'Sale Price',
    name: 'salePrice',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter sale price (optional)',
  },
  {
    label: 'Total Stock',
    name: 'totalStock',
    componentType: 'input',
    type: 'number',
    placeholder: 'Enter total stock',
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/shop/home',
  },
  {
    id: 'dryFruits&honey',
    label: 'Dry-Fruits-&-Honey',
    path: '/shop/listing',
  },
  {
    id: 'organicCookies',
    label: 'Organic-Cookies',
    path: '/shop/listing',
  },
  {
    id: 'organicSweets&Snacks',
    label: 'Organic-Sweets-&-Snacks',
    path: '/shop/listing',
  },
  {
    id: 'organicNoodels',
    label: 'Organic-Noodels',
    path: '/shop/listing',
  },
  {
    id: 'soaps',
    label: 'Soaps',
    path: '/shop/listing',
  },
  {
    id: 'oragnicOils',
    label: 'Oragnic-Oils',
    path: '/shop/listing',
  },
];

export const filterOptions = {
  category: [
    { id: 'dryFruits&honey', label: 'Dry-Fruits-&-Honey' },
    { id: 'organicCookies', label: 'Organic-Cookies' },
    { id: 'organicSweets&Snacks', label: 'Organic-Sweets-&-Snacks' },
    { id: 'organicNoodels', label: 'Organic-Noodels' },
    { id: 'soaps', label: 'Soaps' },
    { id: 'oragnicOils', label: 'Oragnic-Oils' },
  ],
  brand: [
    // { id: "nike", label: "Nike" },
    // { id: "adidas", label: "Adidas" },
    // { id: "puma", label: "Puma" },
    // { id: "levi", label: "Levi's" },
    // { id: "zara", label: "Zara" },
    // { id: "h&m", label: "H&M" },
    { id: 'Nbitez', label: 'Nbitez' },
  ],
};


export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];