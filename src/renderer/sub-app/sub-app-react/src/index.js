import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      sub-app-react
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
console.log(window.__POWERED_BY_QIANKUN__,'window.__POWERED_BY_QIANKUN__');
if (!window.__POWERED_BY_QIANKUN__) {
  console.log('单例模式');
  render()
}
export async function bootstrap(props) {
  console.log(props,'reactprops');
}
export async function mount() {
  console.log('react-sub create of mount');
  render()
}
export async function unmount() {
  document.getElementById('root') && ReactDOM.unmountComponentAtNode(document.getElementById('root'))
}