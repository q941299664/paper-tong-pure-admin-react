import { message as antdMessage } from 'antd';
import { ArgsProps } from 'antd/es/message';
import { get, partialRight } from 'lodash-es';

const config = {
  router: {
    error: {
      login: '请先登录',
    },
  },
  login: {
    success: '登录成功',
  },
  action: {
    one: {
      success: '操作成功',
      error: '操作失败',
    },
    multiple: {
      success: '批量操作成功',
      error: '批量操作失败',
    },
  },
  oss: {
    put: {
      success: '上传成功',
      error: '上传失败',
    },
    delete: {
      success: '删除成功',
      error: '删除失败',
    },
  },
  file: {
    type: {
      image: {
        error: '只允许上传图片文件',
      },
      video: {
        error: '只允许上传视频文件',
      },
    },
  },
};

const pool: any[] = [];

type MessageType = ArgsProps['type'];

type MessageMethod = (path: string) => void;

export const message = (path: string = '', type: MessageType = 'info'): void => {
  if (!path) return;
  if (path.includes('success')) type = 'success';
  if (path.includes('error')) type = 'error';

  const text = get(config, path, path);
  if (!pool.includes(text)) {
    antdMessage[type](text);
    pool.push(text);
    setTimeout(() => {
      pool.splice(pool.indexOf(text), 1);
    }, 1000);
  }
};

message.info = partialRight(message, 'info') as MessageMethod;
message.success = partialRight(message, 'success') as MessageMethod;
message.error = partialRight(message, 'error') as MessageMethod;
message.warning = partialRight(message, 'warning') as MessageMethod;
message.loading = partialRight(message, 'loading') as MessageMethod;
