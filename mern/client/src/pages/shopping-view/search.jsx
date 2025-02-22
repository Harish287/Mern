import { Input } from '@/components/ui/input';
import { getSearchResults } from '@/store/shop/search-slice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

function SearchProducts() {
  const [keyword, setKeyword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);

  useEffect(() => {
    if (keyword && keyword.trim() !== '' && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword));
      }, 1000);
    }
  }, [keyword]);
  console.log(searchResults, 'searchResult');

  return (
    <div className=" container mx-auto md:px-6 px-4 py-8">
      <div className=" flex justify-center mb-8">
        <div className=" w-full flex items-center">
          <Input
            value={keyword}
            name="keyword"
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="search products..."
          />
        </div>
      </div>
      <div>search result</div>
    </div>
  );
}

export default SearchProducts;
