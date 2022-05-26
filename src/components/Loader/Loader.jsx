import { LoaderContainer } from './Loader.styled';
import { Rings } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <LoaderContainer>
      <Rings color="#3f51b5" height={400} width={400} />
    </LoaderContainer>
  );
};
