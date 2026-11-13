import React from "react"
import {
  Col,
  Row,
  DatePicker,
  Input,
  Tooltip,
  Form,
  Radio,
  Button,
  Checkbox,
} from "antd"
import type { RadioChangeEvent } from "antd"
import type { CheckboxChangeEvent } from "antd/lib/checkbox"
import { InfoCircleOutlined } from "@ant-design/icons"
import Moment from "moment"

import {
  Data,
  Explanation,
  Method,
  Model,
  Problem,
  Task,
  SelectValue,
  Venue,
} from "../types"

import { filtersActions } from "../redux"
import { useAppDispatch, useAppSelector } from "../hooks"
import { fromSelectValue } from "../utils"
import Select from "./Select"

const { RangePicker } = DatePicker
const { Search } = Input

function Filters(): JSX.Element {
  const filters = useAppSelector((state) => state.filters)
  const dispatch = useAppDispatch()

  // Data filter
  function handleDataChange(value: Array<SelectValue<Data>>) {
    dispatch(filtersActions.setData(fromSelectValue(value)))
  }

  // Problem filter
  function handleProblemChange(value: Array<SelectValue<Problem>>) {
    dispatch(filtersActions.setProblem(fromSelectValue(value)))
  }

  // Model filter
  function handleModelChange(value: Array<SelectValue<Model>>) {
    dispatch(filtersActions.setModel(fromSelectValue(value)))
  }

  // Task filter
  function handleTaskChange(value: Array<SelectValue<Task>>) {
    dispatch(filtersActions.setTask(fromSelectValue(value)))
  }

  // Explanation filter
  function handleExplanationChange(
    value: Array<SelectValue<Explanation>>
  ) {
    dispatch(filtersActions.setExplanation(fromSelectValue(value)))
  }

  // Method filter
  function handleMethodChange(value: Array<SelectValue<Method>>) {
    dispatch(filtersActions.setMethod(fromSelectValue(value)))
  }

  // Venue filter
  function handleVenueChange(value: Array<SelectValue<Venue>>) {
    dispatch(filtersActions.setVenue(fromSelectValue(value)))
  }

  // AND / OR filter
  function handleFilterChange(event: RadioChangeEvent) {
    dispatch(filtersActions.changeState(event.target.value === "AND"))
  }

  // Year filter
  function handleYearChange(
    value: [Moment.Moment | null, Moment.Moment | null] | null
  ) {
    const startYear = value?.[0]?.year()
    const endYear = value?.[1]?.year()

    dispatch(filtersActions.setStartYear(startYear))
    dispatch(filtersActions.setEndYear(endYear))
  }

  // Search filter
  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    dispatch(filtersActions.setSearch(event.currentTarget.value))
  }

  // Original papers checkbox
  function handleShowOriginal(event: CheckboxChangeEvent) {
    dispatch(filtersActions.setShowOriginal(event.target.checked))
  }

  // New papers checkbox
  function handleShowNew(event: CheckboxChangeEvent) {
    dispatch(filtersActions.setShowNew(event.target.checked))
  }

  // Reset filters
  function handleReset() {
    dispatch(filtersActions.reset())
  }

  return (
    <Row
      gutter={[4, 4]}
      justify="center"
      style={{ marginBottom: 12 }}
    >
      {/* First row: General filter controls */}

      <Col span={8}>
        <Form.Item
          label="State of Filter"
          tooltip={{
            title:
              "AND selects papers with all of the selected types, OR selects papers with any of the selected types",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Radio.Group
            buttonStyle="solid"
            value={filters.filterStateAND ? "AND" : "OR"}
            onChange={handleFilterChange}
          >
            <Radio.Button value="AND">AND</Radio.Button>
            <Radio.Button value="OR">OR</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Button onClick={handleReset}>
          Reset Filters
        </Button>
      </Col>

      <Col span={4}>
        <Checkbox
          onChange={handleShowOriginal}
          checked={filters.showOriginal}
        >
          Show Original Papers from Survey
        </Checkbox>
      </Col>

      <Col span={4}>
        <Checkbox
          onChange={handleShowNew}
          checked={filters.showNew}
        >
          Show New Papers from Community
        </Checkbox>
      </Col>

      {/* Second row: Data, Problem, Model */}

      <Select
        placeholder="Type of Data"
        enumerator={Data}
        handleChange={handleDataChange}
        value={filters.data}
        span={8}
      />

      <Select
        placeholder="Type of Problem"
        enumerator={Problem}
        handleChange={handleProblemChange}
        value={filters.problem}
        span={8}
      />

      <Select
        placeholder="Type of Model to be Explained"
        enumerator={Model}
        handleChange={handleModelChange}
        value={filters.model}
        span={8}
      />

      {/* Third row: Task, Explanation, Method */}

      <Select
        placeholder="Type of Task"
        enumerator={Task}
        handleChange={handleTaskChange}
        value={filters.task}
        span={8}
      />

      <Select
        placeholder="Type of Explanation"
        enumerator={Explanation}
        handleChange={handleExplanationChange}
        value={filters.explanation}
        span={8}
      />

      <Select
        placeholder="Method used to explain"
        enumerator={Method}
        handleChange={handleMethodChange}
        value={filters.method}
        span={8}
      />

      {/* Fourth row: Venue, Year, Search */}

      <Select
        placeholder="Venue"
        enumerator={Venue}
        handleChange={handleVenueChange}
        value={filters.venue}
        span={8}
      />

      <Col span={8}>
        <RangePicker
          picker="year"
          onChange={handleYearChange}
          allowEmpty={[true, true]}
          value={[
            filters.startYear ? Moment([filters.startYear]) : null,
            filters.endYear ? Moment([filters.endYear]) : null,
          ]}
          defaultPickerValue={[
            Moment([2010]),
            Moment([2010]),
          ]}
          style={{ width: "100%" }}
        />
      </Col>

      <Col span={8}>
        <Search
          placeholder="Search titles, venues, authors and abstracts"
          onChange={handleSearch}
          value={filters.search}
          suffix={
            <Tooltip title="Prefix with 'title:', 'venue:', 'author:' or 'abstract:' to only search in the respective field">
              <InfoCircleOutlined />
            </Tooltip>
          }
        />
      </Col>
    </Row>
  )
}

export default Filters