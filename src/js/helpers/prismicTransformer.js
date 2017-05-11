const getHomepage = response => {
  var responseData = response.results[0].data;
  return {
    copy: responseData['a-secret-hotel-homepage.description'].value
  };
};

export default getHomepage;
