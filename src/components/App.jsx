import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { useState } from 'react';
import { getPhotosByKey } from '../js/API';
import { Notify } from 'notiflix';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [imgList, setImgList] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const checkEndOfHits = list => {
    if (list.length < 12) setIsFinished(true);
  };

  const handleSubmit = async search => {
    if (!search.trim()) {
      Notify.failure('Please enter something in search field');
      return;
    }

    setImgList([]);
    setIsLoading(true);
    setIsFinished(false);

    try {
      const items = await getPhotosByKey(search);
      checkEndOfHits(items);

      if (items.length === 0) {
        Notify.warning("Sorry we didn't find anything");
      }

      setImgList(items);
      setSearch(search);
      setPage(page + 1);
    } catch (err) {
      Notify.failure('Oops!! Something goes wrong please try again');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    setIsLoading(true);

    try {
      const newItems = await getPhotosByKey(search, page);
      checkEndOfHits(newItems);

      setImgList([...imgList, ...newItems]);
      setPage(page + 1);
    } catch (err) {
      Notify.failure('Oops!! Something goes wrong please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery imgList={imgList} />
      {isLoading && <Loader />}
      {imgList.length && !isFinished && <Button loadMore={loadMore} />}
    </>
  );
};
