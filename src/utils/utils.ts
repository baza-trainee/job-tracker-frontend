import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// import classNames, { Argument } from 'classnames'
// import { twMerge } from 'tailwind-merge'

// export function cn(...inputs: Argument[]) {
//   return twMerge(classNames(inputs))
// }
