import React from 'react';
import compose from 'recompose/compose';
import withHomepage from 'quests/homepage';
import svg from 'images/line.svg';
import chalk from 'images/chalkboard.jpg';

const enhance = compose(
  withHomepage()
);

export const Home = props => (
  <div
    className="wrap"
    style={{ backgroundImage: `url(${chalk})` }}>
    <section className="main">
      <div className="dictionary">
        <h1 className="title">Secret Hotel</h1>
        <div className="phonetic">[see•krit hoh•tel]</div>
        <div className="description">adjective</div>
      </div>
      <img
        src={svg}
        alt=""
      />
      <div className="copy">
        {props.homepage.ready && (
          <p>{props.homepage.data.copy}</p>
        )}
      </div>
    </section>
  </div>
);

export default enhance(Home);
