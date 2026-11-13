// General utility functions
export const isEnumArray = <T extends object>(e: T) => (data: unknown): data is Array<T[keyof T]> => {
	return Array.isArray(data) && data.every((item) => isSomeEnum(e)(item))
}

export const isSomeEnum = <T extends object>(e: T) => (token: unknown): token is T[keyof T] =>
	Object.values(e).includes(token as T[keyof T])

export function printNames(names: string[]): string {
	let string = ""
	names.forEach((author) => { 
		string += names.indexOf(author) !== names.length - 1 
			? author + ", "
			: author 
	})
	return string
}

export function reverseObject<T extends Record<string, string>>(object: T): Record<T[keyof T], keyof T> {
	return Object.fromEntries(Object.entries(object).map(([key, value]) => [value, key])) as Record<T[keyof T], keyof T>
}

export function capitalize(str: string): string {
	return str.charAt(0).toUpperCase() + str.slice(1)
}
