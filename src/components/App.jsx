import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Component } from 'react';
import { getPhotosByKey } from '../js/API';
import { Notify } from 'notiflix';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    imgList: [],
    page: 1,
    search: '',
    isLoading: false,
    isFinished: false,
  };

  checkEndOfHits(list) {
    if (list.length < 12) this.setState({ isFinished: true });
  }

  handleSubmit = async search => {
    if (!search.trim()) {
      Notify.failure('Please enter something in search field');
      return;
    }

    this.setState({ imgList: [], isLoading: true, isFinished: false });

    try {
      const items = await getPhotosByKey(search);
      this.checkEndOfHits(items);

      if (items.length === 0) {
        Notify.warning("Sorry we didn't find anything");
      }

      this.setState(prev => ({ imgList: items, search, page: prev.page + 1 }));
    } catch (err) {
      Notify.failure('Oops!! Something goes wrong please try again');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  loadMore = async () => {
    this.setState({ isLoading: true });

    try {
      const newItems = await getPhotosByKey(this.state.search, this.state.page);
      this.checkEndOfHits(newItems);

      this.setState(prev => ({
        imgList: [...prev.imgList, ...newItems],
        page: prev.page + 1,
      }));
    } catch (err) {
      Notify.failure('Oops!! Something goes wrong please try again');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { isLoading, imgList, isFinished } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery imgList={imgList} />
        {isLoading && <Loader />}
        {imgList.length && !isFinished && <Button loadMore={this.loadMore} />}
      </>
    );
  }
}
