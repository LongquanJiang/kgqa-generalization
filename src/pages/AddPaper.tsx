import { Form, Input, InputNumber, Button, Col, Row, notification } from "antd"
import { Data, Model, Learning, SelectValue, Venue } from "../types"
import { Select } from "../components"
import { fromSelectValue, printNames } from "../utils"
import { useAppDispatch, useAppSelector } from "../hooks"
import { formActions } from "../redux"
import React, { useState, useEffect } from "react"
import { InfoCircleOutlined } from "@ant-design/icons"

const { Item } = Form
const { TextArea } = Input


function isUrl(str: string) {
	const pattern = new RegExp("^(https?:\\/\\/)?"+ // protocol
		"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|"+ // domain name
		"((\\d{1,3}\\.){3}\\d{1,3}))"+ // OR ip (v4) address
		"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*"+ // port and path
		"(\\?[;&a-z\\d%_.~+=-]*)?"+ // query string
		"(\\#[-a-z\\d_]*)?$","i") // fragment locator
	return !!pattern.test(str)
}

function AddPaper() {

	const dispatch = useAppDispatch()
	const form = useAppSelector((state) => state.form)

	const [json, setJson] = useState("")
	const [showJson, setShowJson] = useState(false)
	useEffect(() => {
		setJson("," + JSON.stringify(form, null, 2))

		// if this boolean is true, the json will be shown
		setShowJson(form["Data Level Mechanisms"].length > 0 
		&& form["Model Level Mechanisms"].length > 0 
		&& form["Learning Level Mechanisms"].length > 0 
		&& form.Title.length > 0
		&& form.Venue.value.length > 0
		&& form.Authors.length > 0
		&& isUrl(form.url))

	}, [form])


	function handleChangeTitle(event: React.FormEvent<HTMLInputElement>) {
		dispatch(formActions.setTitle(event.currentTarget.value))
	}

	function handleChangeDoi(event: React.FormEvent<HTMLInputElement>) {
		dispatch(formActions.setDoi(event.currentTarget.value))
	}

	function handleChangeYear(value: number) {
		dispatch(formActions.setYear(value))
	}

	function handleChangeAuthors(event: React.FormEvent<HTMLInputElement>) {
		const authors = event.currentTarget.value.split(",").map((author) => author.trim())
		dispatch(formActions.setAuthors(authors))
	}

	function handleChangeVenueDropdown(value?: SelectValue<Venue>) {
		const newVenue = value?.label ?? ""
		if (newVenue === "Other") {
			dispatch(formActions.setIsOldVenue(false))
			dispatch(formActions.setVenue(""))
		} else {
			dispatch(formActions.setIsOldVenue(true))
			dispatch(formActions.setVenue(newVenue))
		}
	}

	function handleChangeVenueInput(event: React.FormEvent<HTMLInputElement>) {
		const venue = event.currentTarget.value
		dispatch(formActions.setVenue(venue))
	}

	function handleChangeData(value: Array<SelectValue<typeof Data>>) {
		dispatch(formActions.setData(fromSelectValue(value)))
	}

	function handleChangeModel(value: Array<SelectValue<typeof Model>>) {
		dispatch(formActions.setModel(fromSelectValue(value)))
	}

	function handleChangeLearning(value: Array<SelectValue<typeof Learning>>) {
		dispatch(formActions.setLearning(fromSelectValue(value)))
	}

	function handleChangeAbstract(value: React.ChangeEvent<HTMLTextAreaElement>) {
		dispatch(formActions.setAbstract(value.currentTarget.value))
	}

	function handleChangeComment(value: React.ChangeEvent<HTMLTextAreaElement>) {
		dispatch(formActions.setComment(value.currentTarget.value))
	}

	function copyJsonToClipboard() {
		navigator.clipboard.writeText(json)
		notification.open({
			message: "Successfully copied JSON to clipboard",
			duration: 1.5
		})
	}

	const venueValue = form.Venue.value as Venue
	const venue = form.Venue.isOld ? [venueValue] : ["Other" as Venue]

	return (
		<div className="addpaper">
			<header className="page-heading add-paper-heading">
				<div>
					<div className="eyebrow-label">KGQA Generalization / contribute</div>
					<h1>Add a paper</h1>
					<p>Prepare a paper record, generate its database entry, and propose it through a pull request.</p>
				</div>
				<a className="button-outline" href="https://github.com/longquanjiang/kgqa-generalization/blob/master/src/db/db.json" target="_blank" rel="noreferrer">
					Open database <span aria-hidden="true">↗</span>
				</a>
			</header>
			<div className="contribution-intro">
				<p>Existing records follow the source repository&rsquo;s original classification. A generated entry can be reviewed in the preview and proposed through a pull request.</p>
				<div className="contribution-steps" aria-label="Contribution flow">
					<span><b>01</b> Describe the paper</span>
					<span><b>02</b> Generate JSON</span>
					<span><b>03</b> Open a pull request</span>
				</div>
			</div>
			<Row className="add-paper-layout">
				<Col span={16} className="add-paper-form-col">
					<Form className="paper-submission-form" labelCol={{span: 6}} wrapperCol={{span: 16}}>
						<Item label="Title" tooltip={{ 
							title: "Title of the paper in English",
							icon: <InfoCircleOutlined/>
						}} required >
							<Input placeholder="Title" defaultValue={form.Title} onChange={handleChangeTitle} />
						</Item>
 
						<Item label="Doi-url" required>
							<Input placeholder="Doi-url" defaultValue={form.url} onChange={handleChangeDoi} />
						</Item>

						<Item label="Year of Publication" required >
							<InputNumber defaultValue={parseInt(form.Year)} onChange={handleChangeYear} />
						</Item>

						<Item label="Authors" tooltip={{ 
							title: "Firstname Lastname, all names should be separated by a comma",
							icon: <InfoCircleOutlined/>
						}} required >
							<Input placeholder="Authors" defaultValue={printNames(form.Authors)} onChange={handleChangeAuthors} />
						</Item>

						<Item label="Venue"  required >
							<Select placeholder="Venue" enumerator={Venue} handleChange={handleChangeVenueDropdown} value={venue} single />
						</Item>
						{!form.Venue.isOld 
							? <Item label="Venue" tooltip={{ 
								title: "Please use an abbreviation of the complete Venue name similar to the predefined venues.",
								icon: <InfoCircleOutlined/>
							}}>
								<Input placeholder="Venue" onChange={handleChangeVenueInput} value={form.Venue.value} /> 
							</Item>
							: null
						}

						<Item label="Data Level Mechanisms" tooltip={{
							title: "What Datatypes the model in the paper uses. A combination of multiple flags is possible.",
							icon: <InfoCircleOutlined/>
						}} required >
							<Select placeholder="Data Level Mechanisms" enumerator={Data} handleChange={handleChangeData} value={form["Data Level Mechanisms"]} />
						</Item>

						<Item label="Model Level Mechanisms" tooltip={{
							title: "What type of AI model is used in the paper. A combination of multiple flags is possible.",
							icon: <InfoCircleOutlined/>
						}} required >
							<Select placeholder="Model Level Mechanisms" enumerator={Model} handleChange={handleChangeModel} value={form["Model Level Mechanisms"]} />
						</Item>

						<Item label="Learning Strategy Level Mechanisms" tooltip={{
							title: "What is the task of the AI model in the paper. A combination of multiple flags is possible.",
							icon: <InfoCircleOutlined/>
						}} required >
							<Select placeholder="Learning Level Mechanisms" enumerator={Learning} handleChange={handleChangeLearning} value={form["Learning Level Mechanisms"]} />
						</Item>

						<Item label="Abstract" tooltip={{ 
							title: "Abstract is optional, but highly recommended",
							icon: <InfoCircleOutlined/>
						}}>
							<TextArea placeholder="Abstract" defaultValue={form["Abstract"]} onChange={handleChangeAbstract} autoSize />
						</Item>

						<Item label="Comment" tooltip={{ 
							title: "Used to indicate that your paper needs to have a new tag for example",
							icon: <InfoCircleOutlined/>
						}}>
							<TextArea placeholder="Comment" defaultValue={form?.Comment} onChange={handleChangeComment} autoSize />
						</Item>
					</Form>
				</Col>
				{showJson 
					?<Col span={8} className="json-preview-col">
						<Item label="Your JSON">
							<TextArea value={json} autoSize />
							<Button onClick={copyJsonToClipboard}>Copy To Clipboard</Button>
						</Item>
					</Col>
					: null}
				
			</Row>

			<details className="references-panel">
				<summary>References cited in the categorization guidance</summary>

				<p style={{margin: 0}}>[1] Zhenyu Li, Sunqi Fan, Yu Gu, Xiuxing Li, Zhichao Duan, Bowen Dong, Ning Liu, and Jianyong Wang. Flexkbqa: A flexible llm-powered framework for few-shot knowledge base question answering. In AAAI, vol. 38, no. 17, pp. 18608&ndash;18616. 2024.</p>
				<p style={{margin: 0}}>[2] Mayur Patidar, Riya Sawhney, Avinash Singh, Biswajit Chatterjee, and Indrajit Bhattacharya. Few&ndash;shot transfer learning for knowledge base question answering: Fusing supervised models with in-context learning. In ACL, pp. 9147&ndash;9165. 2024.</p>
				<p style={{margin: 0}}>[3] Xiang Huang, Jiayu Shen, Shanshan Huang, Sitao Cheng, Xiaxia Wang, and Yuzhong Qu. TARGA: Targeted synthetic data generation for practical reasoning over structured data. In ACL, pp. 2704&ndash;2726. 2025.</p>
			</details>
		</div>
	)
}

export default AddPaper
