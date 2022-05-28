import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { useEffect, useRef, useState } from 'react';
import { getPhotosByKey } from '../js/API';
import { Notify } from 'notiflix';
import { Loader } from './Loader/Loader';
import { createPortal } from 'react-dom';
import { Modal } from './Modal/Modal';
import { PER_PAGE } from '../js/globalConstants';

export const App = () => {
  const [imgList, setImgList] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const checkEndOfHits = list => {
    if (list.length < PER_PAGE) setIsFinished(true);
  };

  const shouldEffectPage = useRef(false);

  // useEffect(() => {
  //   if (firstUpdate.current) {
  //     firstUpdate.current = false;
  //     return;
  //   }
  //
  //   setImgList([]);
  //   loadPhotos();
  // }, [search]);

  useEffect(() => {
    if (!shouldEffectPage.current) {
      shouldEffectPage.current = true;
      return;
    }

    const loadPhotos = async () => {
      setIsLoading(true);
      try {
        const items = await getPhotosByKey(search, page);
        checkEndOfHits(items);

        if (items.length === 0) {
          Notify.warning("Sorry we didn't find anything");
          return;
        }

        setImgList(prevState => [...prevState, ...items]);
      } catch (err) {
        Notify.failure('Oops!! Something goes wrong please try again');
      } finally {
        setIsLoading(false);
      }
    };

    loadPhotos();
  }, [page, search]);

  const handleSubmit = async query => {
    if (query !== search) setImgList([]);
    shouldEffectPage.current = false;
    await setPage(1);
    shouldEffectPage.current = true;
    setSearch(query);
  };

  const toggleOpenModal = photo => {
    setIsModalOpen(prevState => !prevState);
    setModalImage(photo ? photo : '');
  };

  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery imgList={imgList} toggleOpenModal={toggleOpenModal} />
      {isLoading && <Loader />}
      {imgList.length && !isFinished && !isLoading && (
        <Button
          loadMore={() => {
            setPage(prevState => prevState + 1);
          }}
        />
      )}

      {isModalOpen &&
        createPortal(
          <Modal
            img={modalImage}
            alt={'asdasd'}
            toggleOpenModal={toggleOpenModal}
          />,
          document.getElementById('modal-root')
        )}
    </>
  );
};
