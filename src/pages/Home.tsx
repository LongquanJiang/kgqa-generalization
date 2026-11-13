import React from "react"
import { Link } from "react-router-dom"
import {
	ArrowRightOutlined,
	ExportOutlined,
	CheckCircleOutlined,
	FileAddOutlined,
	FilterOutlined,
	ShareAltOutlined
} from "@ant-design/icons"
import { githubUrl } from "../utils"

const focusAreas = [
	{ number: "01", title: "Unseen entities", description: "Can a system answer when the question names entities absent from training?" },
	{ number: "02", title: "Unseen relations", description: "How well does it handle graph predicates it has not encountered before?" },
	{ number: "03", title: "New compositions", description: "Can known facts and relations be combined in unfamiliar ways?" },
	{ number: "04", title: "Evaluation settings", description: "Which splits and protocols make generalization measurable?" }
]

const workflow = [
	{
		number: "01",
		Icon: FilterOutlined,
		title: "Explore",
		text: "Search the paper catalog and narrow results with the available filters.",
		link: <Link to="/papers">Browse papers <ArrowRightOutlined aria-hidden="true" /></Link>
	},
	{
		number: "02",
		Icon: FileAddOutlined,
		title: "Contribute",
		text: "Prepare a paper record and share it with the project through a pull request.",
		link: <Link to="/add-paper">Add a paper <ArrowRightOutlined aria-hidden="true" /></Link>
	},
	{
		number: "03",
		Icon: CheckCircleOutlined,
		title: "Review",
		text: "Check new records and help keep the research index reliable.",
		link: <a href={`${githubUrl}/pulls`} target="_blank" rel="noreferrer">Review on GitHub <ExportOutlined aria-hidden="true" /></a>
	}
]

function Home(): JSX.Element {
	return (
		<div className="home-page">
			<section className="home-hero">
				<div className="home-hero-copy">
					<div className="eyebrow"><span className="eyebrow-dot" /> OPEN RESEARCH WORKBENCH <span className="eyebrow-divider" /> KGQA</div>
					<h1>Make Sense of<br /><span>KGQA Generalization</span></h1>
					<p className="home-intro">A shared research index for understanding how knowledge graph question answering systems work beyond the entities, relations, and question patterns seen during training.</p>
					<div className="home-actions">
						<Link className="button-primary" to="/papers">Explore papers <ArrowRightOutlined aria-hidden="true" /></Link>
						<Link className="text-link" to="/charts">View charts <ExportOutlined aria-hidden="true" /></Link>
					</div>
					<p className="home-citation">Generalization settings include unseen knowledge base elements and new compositions. <a href="https://aclanthology.org/2025.emnlp-main.442/" target="_blank" rel="noreferrer">Read a recent study <ExportOutlined aria-hidden="true" /></a></p>
				</div>

				<div className="generalization-map" aria-label="KGQA generalization research areas">
					<div className="figure-heading"><span>Research dimensions</span><span>01 / 04</span></div>
					<div className="map-hub"><ShareAltOutlined aria-hidden="true" /><span>KGQA</span><small>GENERALIZATION</small></div>
					<div className="map-areas">
						{focusAreas.map((area) => (
							<div className="map-area" key={area.number}>
								<span>{area.number}</span><strong>{area.title}</strong>
							</div>
						))}
					</div>
					<p className="map-caption">A working lens for organizing papers, benchmarks, and evaluation settings.</p>
				</div>
			</section>

			<aside className="data-status-note" aria-label="Catalog data status">
				<span className="status-indicator" aria-hidden="true" />
				<div><strong>Catalog migration in progress</strong><p>This project is rebranded for KGQA Generalization. The bundled records and metadata fields still come from the original XAI catalog.</p></div>
			</aside>

			<section className="home-workflow" aria-labelledby="workflow-title">
				<div className="section-kicker"><span id="workflow-title">Workbench</span><span>01 — 03</span></div>
				<div className="workflow-grid">
					{workflow.map(({ number, Icon, title, text, link }) => (
						<article className="workflow-item" key={number}>
							<span className="workflow-number">{number}</span>
							<Icon className="workflow-icon" aria-hidden="true" />
							<h2>{title}</h2>
							<p>{text}</p>
							{link}
						</article>
					))}
				</div>
			</section>

			<section className="taxonomy-section" aria-labelledby="focus-title">
				<div className="taxonomy-intro">
					<div className="eyebrow">A starting framework</div>
					<h2 id="focus-title">Where should a system generalize?</h2>
					<p>These dimensions are an initial way to read the literature. The project can refine them as its KGQA dataset and taxonomy are established.</p>
					<Link className="text-link" to="/papers">Search the catalog <ArrowRightOutlined aria-hidden="true" /></Link>
				</div>
				<ol className="dimension-list">
					{focusAreas.map(({ number, title, description }) => (
						<li key={number}><span>{number}</span><strong>{title}</strong><small>{description}</small></li>
					))}
				</ol>
			</section>

			<section className="collection-notes" aria-label="Project notes">
				<article>
					<div className="eyebrow">Research focus</div>
					<p>Knowledge graph question answering, with attention to transfer beyond familiar graph elements and question patterns.</p>
				</article>
				<article>
					<div className="eyebrow">Current records</div>
					<p>The source repository still contains its original explainable AI paper collection. KGQA records will need to be imported into a dedicated schema.</p>
					<Link to="/papers">View current records <ArrowRightOutlined aria-hidden="true" /></Link>
				</article>
				<article>
					<div className="eyebrow">Community curation</div>
					<p>Use GitHub pull requests to propose and review updates to the collection.</p>
					<a href={`${githubUrl}/pulls`} target="_blank" rel="noreferrer">Open pull requests <ExportOutlined aria-hidden="true" /></a>
				</article>
			</section>
		</div>
	)
}

export default Home
