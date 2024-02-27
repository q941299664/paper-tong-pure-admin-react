import { StyleProvider } from '@ant-design/cssinjs';
import { configResponsive } from 'ahooks';
import { App as AntdApp, ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import ReactDOM from 'react-dom/client';

import '@/styles/index.scss';

import App from './App';

configResponsive({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <AntdApp>
      <StyleProvider hashPriority="high">
        <App />
      </StyleProvider>
    </AntdApp>
  </ConfigProvider>,
);
