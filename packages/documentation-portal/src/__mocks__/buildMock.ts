type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

const mergeDeep = <T>(source: T, target: DeepPartial<T>): T => {
  if (!target) return source

  if (typeof target == 'object' && typeof source == 'object') {
    let object = Object.assign({}, source)

    for (const key in source) {
      if (target[key] === undefined) {
        object = Object.assign({}, object, { [key]: source[key] })
      } else if (source[key] instanceof Array && target[key] instanceof Array) {
        object = Object.assign({}, object, { [key]: target[key] })
      } else if (
        typeof source[key] == 'object' &&
        typeof target[key] == 'object'
      ) {
        object = Object.assign({}, object, {
          [key]: mergeDeep(source[key], target[key] as DeepPartial<T[keyof T]>),
        })
      } else {
        object = Object.assign({}, object, { [key]: target[key] })
      }
    }

    return object
  }

  return target as T
}

const buildMock =
  <T extends object>(defaultValue: T) =>
  (overrides: DeepPartial<T> = {}): T =>
    mergeDeep(defaultValue, overrides)

export default buildMock
