import React from "react"
import { Link } from "react-router-dom"
import {
	ArrowRightOutlined,
	ArrowUpRightOutlined,
	CheckCircleOutlined,
	FileAddOutlined,
	FilterOutlined
} from "@ant-design/icons"
import { githubUrl } from "../utils"

const citation = `@article{Nauta2023_csur_evaluating-xai-survey,
  author = {Nauta, Meike and Trienes, Jan and Pathak, Shreyasi and Nguyen, Elisa and Peters, Michelle and Schmitt, Yasmin and Schlötterer, Jörg and van Keulen, Maurice and Seifert, Christin},
  title = {From Anecdotal Evidence to Quantitative Evaluation Methods: A Systematic Review on Evaluating Explainable AI},
  year = {2023},
  journal = {ACM Computing Surveys},
  doi = {10.1145/3583558}
}`

type WorkflowStep = {
	number: string
	Icon: React.ComponentType<any>
	title: string
	text: string
	link: JSX.Element
}

const steps: WorkflowStep[] = [
	{
		number: "01",
		Icon: FilterOutlined,
		title: "Explore",
		text: "Search and filter the collection, or compare patterns across its categories.",
		link: <Link to="/papers">Find a paper <ArrowRightOutlined aria-hidden="true" /></Link>
	},
	{
		number: "02",
		Icon: FileAddOutlined,
		title: "Contribute",
		text: "Classify a paper with the shared scheme and generate a database entry.",
		link: <Link to="/add-paper">Add a paper <ArrowRightOutlined aria-hidden="true" /></Link>
	},
	{
		number: "03",
		Icon: CheckCircleOutlined,
		title: "Review",
		text: "Verify new submissions and their labels. Three positive reviews add a paper.",
		link: <a href={`${githubUrl}/pulls`} target="_blank" rel="noreferrer">Review on GitHub <ArrowUpRightOutlined aria-hidden="true" /></a>
	}
]

const dimensions: Array<[string, string, string]> = [
	["01", "Type of data", "Graph · Image · Text · More"],
	["02", "Type of problem", "Model · Outcome · Inspection"],
	["03", "Model to explain", "Neural · Tree · Model-agnostic"],
	["04", "Type of task", "Classification · Recommendation"],
	["05", "Type of explanation", "Feature importance · Text · Graph"],
	["06", "Method used", "Post-hoc · Built-in · Supervised"]
]

function Home(): JSX.Element {
	return (
		<div className="home-page">
			<section className="home-hero">
				<div className="home-hero-copy">
					<div className="eyebrow"><span className="eyebrow-dot" /> An open research index <span className="eyebrow-divider" /> 2014—2020 · community curated</div>
					<h1>A living map of<br /><em>explainable AI.</em></h1>
					<p className="home-intro">Explore the methods, papers, and categories that shape explainable artificial intelligence. Built from a systematic review and extended by its research community.</p>
					<div className="home-actions">
						<Link className="button-primary" to="/papers">Browse papers <ArrowRightOutlined aria-hidden="true" /></Link>
						<Link className="text-link" to="/add-paper">Contribute <ArrowUpRightOutlined aria-hidden="true" /></Link>
					</div>
					<p className="home-citation">Based on <a href="https://doi.org/10.1145/3583558" target="_blank" rel="noreferrer">Nauta et al., ACM Computing Surveys (2023)</a></p>
				</div>
				<figure className="home-taxonomy-figure">
					<div className="figure-heading"><span>The categorization scheme</span><span>01 / 06</span></div>
					<div className="taxonomy-image-wrap">
						<img src={`${process.env.PUBLIC_URL}/categories_xai.png`} alt="The six dimensions used to categorize papers in the XAI collection" />
					</div>
					<figcaption>Six dimensions make each paper easier to find and compare.</figcaption>
				</figure>
			</section>

			<section className="home-workflow" aria-labelledby="workflow-title">
				<div className="section-kicker"><span id="workflow-title">How to use the collection</span><span>01 — 03</span></div>
				<div className="workflow-grid">
					{steps.map(({ number, Icon, title, text, link }) => (
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

			<section className="taxonomy-section" aria-labelledby="taxonomy-title">
				<div className="taxonomy-intro">
					<div className="eyebrow">A shared language</div>
					<h2 id="taxonomy-title">Six dimensions.<br />One clearer picture.</h2>
					<p>Each paper is categorized along the scheme presented by <a href="https://doi.org/10.1145/3583558" target="_blank" rel="noreferrer">Nauta et al. (2023)</a>.</p>
					<Link className="text-link" to="/charts">Explore the charts <ArrowRightOutlined aria-hidden="true" /></Link>
				</div>
				<ol className="dimension-list">
					{dimensions.map(([number, title, labels]) => (
						<li key={number}><span>{number}</span><strong>{title}</strong><small>{labels}</small></li>
					))}
				</ol>
			</section>

			<section className="collection-notes" aria-label="About the collection">
				<article>
					<div className="eyebrow">The initial collection</div>
					<p>Research papers published in 2014–2020 at AAAI, IJCAI, NeurIPS, ICML, ICLR, CVPR, ICCV, ACL, WWW, ICDM, KDD, and SIGIR.</p>
				</article>
				<article>
					<div className="eyebrow">A living collection</div>
					<p>Contributors can add a paper, generate its database entry, and include it in a pull request.</p>
					<Link to="/add-paper">Start a contribution <ArrowRightOutlined aria-hidden="true" /></Link>
				</article>
				<article>
					<div className="eyebrow">A curated collection</div>
					<p>Community members review each paper and its categorization. Three positive reviews—or one from an admin—merge the request.</p>
					<a href={`${githubUrl}/pulls`} target="_blank" rel="noreferrer">Open pull requests <ArrowUpRightOutlined aria-hidden="true" /></a>
				</article>
			</section>

			<details className="citation-details">
				<summary>Paper and citation <span>Open BibTeX</span></summary>
				<div className="citation-copy">
					<p>This website is based on the systematic review by Meike Nauta, Jan Trienes, Shreyasi Pathak, Elisa Nguyen, Michelle Peters, Yasmin Schmitt, Jörg Schlötterer, Maurice van Keulen, and Christin Seifert.</p>
					<pre>{citation}</pre>
				</div>
			</details>
		</div>
	)
}

export default Home
