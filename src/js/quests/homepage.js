import { compose } from 'redux';
import quest from 'redux-quest';
import { fetchHomepage } from 'helpers/prismic';
import getHomepage from 'helpers/prismicTransformer';

export const resolver = {
  key: 'homepage',
  get: () =>
    fetchHomepage()
    .then(getHomepage)
};

export default (options = {}) => compose(
  quest({
    ...options,
    async: true,
    resolver
  })
);
