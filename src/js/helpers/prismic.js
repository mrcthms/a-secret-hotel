import Prismic from 'prismic.io';

export const query = (query) => {
  return Prismic.api('https://the-dutchess.prismic.io/api')
    .then(
      api => api.query(
        query,
        {
          ref: api.master()
        }
      )
    )
    .then(function (data) {
      return data;
    });
};

export const fetchHomepage = () => {
  const id = `a-secret-hotel`;

  return query([
    Prismic.Predicates.at('my.a-secret-hotel-homepage.uid', id)
  ], id);
};
