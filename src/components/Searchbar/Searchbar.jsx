import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Header,
  Input,
  Label,
  SearchForm,
  SubmitButton,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = values => {
    onSubmit(values.search);
  };

  return (
    <Header className="searchbar">
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        <SearchForm>
          <SubmitButton type="submit">
            <Label>Search</Label>
          </SubmitButton>

          <Input
            name="search"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
