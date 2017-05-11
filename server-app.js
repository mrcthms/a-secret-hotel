import React from 'react';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import { GatewayProvider } from 'react-gateway';

export function renderFullPage(html, initialState, callback) {
  fs.readFile(path.join(__dirname, 'index.html'), 'utf8', function (err, data) {
    data = data.replace(/\$\{html\}/ig, html);
    data = data.replace(/\$\{state\}/ig, JSON.stringify(initialState));
    callback(data);
  });
}

export function renderToStringEs6(store, Provider, RouterContext, renderProps) {
  let string = renderToString(
    <Provider store={store}>
      <GatewayProvider>
        <RouterContext {...renderProps} />
      </GatewayProvider>
    </Provider>
  );
  return string;
}
