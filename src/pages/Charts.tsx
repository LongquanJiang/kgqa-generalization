import { Filters } from "../components"
import { Row, Select, Col, Radio, RadioChangeEvent } from "antd"
import { ConnectedChart, CirclePackingChart, GrowthLineChart, BarChart } from "../components"
import React, { useState } from "react"
import { typeArray } from "../utils"
import { Paper } from "../types"

const { Option } = Select
const { Button, Group } = Radio

function App() {
	const [chart, setChart] = useState("Line Chart")
	const [type, setType] = useState<keyof Paper>("Type of Data")

	function HandleChartChange(e: RadioChangeEvent): void {
		setChart(e.target.value)
	}

	function HandleChange(value: keyof Paper) {
		setType(value)
	}

	const graphMap: {
		[key: string]: {
			withSelect: boolean,
			element: JSX.Element,
			description: string,
		}
	} = {
		"Line Chart": {
			withSelect: true,
			element: <GrowthLineChart type={type} />,
			description: "The line chart displays the cumulative number of papers over time. Select a metadata field to compare how its labels develop. Papers can have multiple labels, so category totals may exceed the number of records.",
		},
		"Bar Chart": {
			withSelect: true,
			element: <BarChart type={type} />,
			description: "The bar chart shows the distribution of labels for a selected attribute. The attribute shown can be changed with the dropdown menu on the right. It should be noted that papers can have multiple labels within a category so the total length of all the bars can be greater than the number of papers in the database."
		},
		"Connected Graph": {
			withSelect: false,
			element: (<ConnectedChart />),
			description: "The connected graph displays papers as nodes. Papers are linked when they share multiple labels in the current catalog. Apply filters, then select a node to open its paper."
		},
		"Circle Packing": {
			withSelect: true,
			element: <CirclePackingChart type={type} />,
			description: "The circle packing chart groups papers by a selected attribute. Hover over a circle to see the paper title, or select it to open the paper."
		},
	}
	return (
		<div className="charts-page">
			<header className="page-heading">
				<div>
					<div className="eyebrow-label">KGQA Generalization / charts</div>
					<h1>Charts & patterns</h1>
					<p>Compare records over time or explore how the current metadata categories relate.</p>
				</div>
			</header>
			<aside className="data-status-inline"><strong>Legacy catalog:</strong> these charts summarize the original XAI records until KGQA data and metadata are migrated.</aside>
			<section className="charts-filters filter-panel" aria-label="Chart filters">
				<Filters />
			</section>
			<section className="chart-workspace" aria-label="Paper collection charts">
				<Row className="charts-toolbar" justify="space-between" style={{ marginBottom: 12 }}>
					{/* Chart Select Buttons */}
					<Col span={14} className="charts-chart-selector">
						<Group defaultValue={chart} buttonStyle="solid" onChange={HandleChartChange}>
							{Object.keys(graphMap).map(elem =>
								<Button key={elem} value={elem}>
									{elem}
								</Button>)}
						</Group>
					</Col>
					
					{/* If the current chart uses the type of X data, also render a Select for that */}
					{graphMap[chart].withSelect
						? <Select defaultValue={type} style={{ width: 240 }} onChange={HandleChange}>
							{typeArray.map((elem: keyof Paper) =>
								<Option key={elem} value={elem}>
									{elem}
								</Option>
							)}
						</Select>
						: null}
				</Row>

				{/* Description of the chart */}
				<Row className="chart-description" justify="start" style={{ marginBottom: 8 }}>
					<Col span={24}>
						{graphMap[chart].description}
					</Col>
				</Row>

				{/* The chart itself */}
				<div className="chart-visual">{graphMap[chart].element}</div>
			</section>
		</div>
	)
}

export default App
