import { useLayoutEffect, useRef, useState } from "react"

export function useExpandingAllInTable<Key extends string | number>(
	keys: Key[],
	keyName: string,
	defaultExpanded: boolean
) {
	const [expandedKeys, setExpandedKeys] = useState<Key[]>(defaultExpanded ? keys : [])
	const lastExpandEventHandler = useRef<(() => void) | null>(null)
	const isAllExpanded = () => expandedKeys.length === keys.length

	function toggleRowExpanded(expanded: boolean, record: object) {
		const recordKey = (record as Record<string, Key>)[keyName]
		if (expanded) {
			setExpandedKeys(expandedKeys.concat([recordKey]))
		} else {
			setExpandedKeys(expandedKeys.filter((item) => item !== recordKey))
		}
	}

	const toggleAllExpanded = () => {
		if (isAllExpanded()) {
			setExpandedKeys([])
		} else {
			setExpandedKeys(keys)
		}
	}
	const expandEventHandler = () => {
		toggleAllExpanded()
	}

	useLayoutEffect(() => {
		const element = document.getElementsByClassName(
			"expand-all"
		)[0]
		if (lastExpandEventHandler.current) {
			element.removeEventListener(
				"click",
				lastExpandEventHandler.current,
				false
			)
		}
		element.addEventListener("click", expandEventHandler, false)
		lastExpandEventHandler.current = expandEventHandler
	})
  
	return {
		isAllExpanded,
		expandedRowKeys: expandedKeys,
		onExpand: toggleRowExpanded,
		rowKey: keyName
	}
}