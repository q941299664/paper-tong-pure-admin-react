import { cloneDeep, isArray } from 'lodash-es';

export function isSameArray<T>(array1: T[], array2: T[]) {
  if (isArray(array1) && isArray(array2)) {
    if (array1.length === array2.length) {
      return array1.every((item, index) => item === array2[index]);
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function randomArray<T>(source: T[], length: number) {
  const result = [];
  const _source = cloneDeep(source);
  const _length = length || source.length;
  for (let i = 0; i < _length; i++) {
    const _i = Math.floor(Math.random() * _source.length);
    const item = _source.splice(_i, 1)[0];
    result.push(item);
  }
  return result;
}

export function notEmptyArray<T>(value: T[]) {
  return isArray(value) && value.length > 0;
}

export function joinItem<T>(source: T[], separator: T): T[] {
  const result = [];
  for (let index = 0; index < source.length; index++) {
    result.push(source[index]);
    if (index < source.length - 1) {
      result.push(separator);
    }
  }
  return result;
}

export function mapTree<T extends Record<K, any>, K extends string = 'children'>(
  source: T[] = [],
  handler: (item: T, index: number, parents: T[]) => T = item => item,
  childrenKey = 'children' as K,
  _parents: T[] = [],
) {
  return cloneDeep(source).map((item, index) => {
    item = handler(item, index, _parents);
    if (isArray(item[childrenKey])) {
      item[childrenKey] = mapTree(
        item[childrenKey],
        handler,
        childrenKey,
        _parents.concat(item),
      ) as T[K];
    }
    return item;
  });
}

export function findTree<T extends Record<K, any>, K extends string = 'children'>(
  source: T[] = [],
  handler = (e: T): T => e,
  childrenKey = 'children' as K,
) {
  let result;
  cloneDeep(source).find(item => {
    if (handler(item)) {
      result = item;
      return true;
    }
    if (isArray(item[childrenKey])) {
      result = findTree(item[childrenKey], handler, childrenKey);
      return result;
    }
  });
  return result;
}

export function filterTree<T extends Record<K, any>, K extends string = 'children'>(
  source: T[] = [],
  handler = (e: T): T => e,
  childrenKey = 'children' as K,
) {
  return cloneDeep(source).filter(item => {
    const children = item[childrenKey];
    if (isArray(children)) {
      item[childrenKey] = filterTree(item[childrenKey], handler, childrenKey) as T[K];
    }
    return handler(item);
  });
}

export function flatTree<T extends Record<K, any>, K extends string = 'children'>(
  source: T[] = [],
  handler = (e: T): T => e,
  childrenKey = 'children' as K,
) {
  let result: T[] = [];
  cloneDeep(source).forEach(item => {
    result.push(handler(item));
    if (isArray(item[childrenKey])) {
      result = result.concat(flatTree(item[childrenKey], handler, childrenKey));
    }
  });
  return result;
}

export function reduceTree<T extends Record<K, any>, K extends string = 'children'>(
  source: T[] = [],
  handler: (acc: any[], item: T) => any[],
  defaultValue: any[] = [],
  childrenKey = 'children' as K,
) {
  return cloneDeep(source).reduce((acc: any[], item: T) => {
    acc = handler(acc, item);
    if (isArray(item[childrenKey])) {
      acc = reduceTree(item[childrenKey], handler, acc, childrenKey);
    }
    return acc;
  }, defaultValue);
}

// source list
// [
//   a
//   a.b
//   a.b.1
//   a.b.2
// ]
// return
// {
//   {
//     label: 'a',
//     value: 'a',
//     children: [
//       {
//         label: 'b',
//         value: 'a.b',
//         children: [
//           {
//             label: '1',
//             value: 'a.b.1',
//           },
//           {
//             label: '2',
//             value: 'a.b.2',
//           },
//         ]
//       }
//     ]
//   }
// }
export function pathToTree(pathList: string[], split: string = '.', childrenKey = 'children') {
  const result = [];
  const map = new Map();
  for (const p of pathList) {
    const parts = p.split(split);
    let node = null;
    for (let i = 0; i < parts.length; i++) {
      const currentPath = parts.slice(0, i + 1).join('.');
      if (!map.has(currentPath)) {
        const label = parts[i];
        const value = currentPath;
        const newNode = { label, value };
        if (node) {
          node[childrenKey] = node[childrenKey] || [];
          node[childrenKey].push(newNode);
        } else {
          result.push(newNode);
        }
        node = newNode;
        map.set(currentPath, node);
      } else {
        node = map.get(currentPath);
      }
    }
  }
  function removeEmptyChildren(node: any) {
    if (node[childrenKey]) {
      node[childrenKey].forEach(removeEmptyChildren);
      if (node[childrenKey].length === 0) {
        delete node[childrenKey];
      }
    }
  }
  result.forEach(node => removeEmptyChildren(node));
  return result;
}

/**
 * 扫描树的最大深度
 * @param source 要检查的数组
 * @param childrenKey 子节点的键名
 */
export function scanTreeMaxDepth<T extends Record<K, any>, K extends string = 'children'>(
  source: T[] = [],
  childrenKey = 'children' as K,
) {
  let maxDepth = 0;
  cloneDeep(source).forEach(item => {
    if (item && isArray(item[childrenKey])) {
      const depth = scanTreeMaxDepth(item[childrenKey], childrenKey) + 1;
      if (depth > maxDepth) {
        maxDepth = depth;
      }
    }
  });
  return maxDepth;
}
