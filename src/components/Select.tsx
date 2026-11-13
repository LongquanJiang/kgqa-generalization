import { Select, Col, Tag } from "antd"
import type { ReactNode } from "react"

import { Paper, SelectValue } from "../types"
import { getColor, toSelectValue } from "../utils"

const { Option } = Select

type TagRenderProps = {
  label: ReactNode
  closable: boolean
  value: string
  onClose: () => void
}

function tagRender({
  label,
  closable,
  onClose,
  value,
}: TagRenderProps) {
  const color = getColor(value.split("+")[0] as keyof Paper)

  return (
    <Tag
      color={color}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  )
}

// Common props
type BaseFilterProps<T> = {
  placeholder: string
  enumerator: Record<number, string>
  value: Array<T>
  span?: number
}

// Multiple selection
type MultiFilterProps<T> = BaseFilterProps<T> & {
  single?: false
  handleChange: (val: Array<SelectValue<T>>) => void
}

// Single selection
type SingleFilterProps<T> = BaseFilterProps<T> & {
  single: true
  handleChange: (val?: SelectValue<T>) => void
}

type FilterProps<T> =
  | MultiFilterProps<T>
  | SingleFilterProps<T>

function CustomSelect<T>(props: FilterProps<T>): JSX.Element {
  const {
    placeholder,
    enumerator,
    value,
    span = 24,
  } = props

  const options = Object.values(enumerator).map((item) => ({
    label: item,
    value: `${placeholder}+${item}`,
    key: item,
  }))

  const optionMap = new Map(
    options.map((option) => [option.value, option])
  )

  const defaultValue = toSelectValue(value, placeholder)

  if (props.single) {
    const selectedValue = defaultValue[0]?.value

    return (
      <Col span={span}>
        <Select
          mode={undefined}
          style={{ width: "100%" }}
          placeholder={placeholder}
          value={selectedValue}
          labelInValue={false}
          tagRender={tagRender}
          allowClear
          onChange={(selected) => {
            if (selected === undefined) {
              props.handleChange(undefined)
              return
            }

            const option = optionMap.get(selected)

            if (!option) {
              return
            }

            props.handleChange({
              label: option.key as T,
              value: option.value,
              key: option.key as T,
            })
          }}
        >
          {options.map((item) => (
            <Option value={item.value} key={item.key}>
              {item.label}
            </Option>
          ))}
        </Select>
      </Col>
    )
  }

  return (
    <Col span={span}>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder={placeholder}
        value={defaultValue.map((item) => item.value)}
        labelInValue={false}
        tagRender={tagRender}
        allowClear
        onChange={(selected) => {
          const selectedValues = selected
            .map((selectedItem) => {
              const option = optionMap.get(selectedItem)

              if (!option) {
                return undefined
              }

              return {
                label: option.key as T,
                value: option.value,
                key: option.key as T,
              }
            })
            .filter(
              (item): item is SelectValue<T> => item !== undefined
            )

          props.handleChange(selectedValues)
        }}
      >
        {options.map((item) => (
          <Option value={item.value} key={item.key}>
            {item.label}
          </Option>
        ))}
      </Select>
    </Col>
  )
}

export default CustomSelect