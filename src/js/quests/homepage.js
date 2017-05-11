import { compose } from 'redux';
import quest from 'redux-quest';
import prismicDAO from 'helpers/prismic';
import getHomepage from 'helpers/prismicTransformer';

export const resolver = {
  key: 'homepage',
  get: () =>
    prismicDAO.fetchHomepage()
    .then(getHomepage)
};

export default (options = {}) => compose(
  quest({
    ...options,
    async: true,
    resolver
  })
);
