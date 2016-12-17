import { h, render } from 'preact'; /** @jsx h */
import App from '../components/App/App';

// We don't want to inline this data cos it's HUGE
// We fetch here, but we have already pre-fetched in the <head>
// So it's already at least partially ready
// const fetchResponse = await fetch(window.APP_DATA.dataFileName);
// console.log(`  --  >  client.js:8 > got data at ${performance.now()}`);
// const data = await fetchResponse => response.json();
// console.log(`  --  >  client.js:10 > made it JSON at ${performance.now()}`);
//
// render(<App data={data} version={window.APP_DATA.version} />, document.body, document.getElementById(`app`));

fetch(window.APP_DATA.dataFileName)
.then(response => response.json())
.then((data) => {
  render(<App data={data} version={window.APP_DATA.version} />, document.body, document.getElementById(`app`));
});

if (process.env.NODE_ENV === `production`) {
  // load service worker only in prod (doesn't play nice with HMR)
  if (`serviceWorker` in navigator) {
    navigator.serviceWorker.register(`service-worker.js`)
      .catch((err) => {
        console.error(`Error registering service worker: ${err}`);
      });
  }
}