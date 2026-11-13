import "antd/dist/antd.css"
import "./styles.css"
import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { store } from "./redux"
import { HashRouter, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Provider } from "react-redux"
import {
	ArrowRightOutlined,
	ExportOutlined,
	DotChartOutlined,
	HomeOutlined,
	LeftOutlined,
	PlusCircleOutlined,
	RightOutlined,
	UnorderedListOutlined
} from "@ant-design/icons"
import { Papers, AddPaper, Charts, Home } from "./pages"
import { githubUrl } from "./utils"

ReactDOM.render(
	<Provider store={store}>
		<HashRouter>
			<DefaultLayout />
		</HashRouter>
	</Provider>,
	document.getElementById("root")
)

function DefaultLayout() {
	const location = useLocation()
	const navigate = useNavigate()
	const [collapsed, setCollapsed] = useState(false)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location.pathname])

	return (
		<div className={`app-shell${collapsed ? " sidebar-collapsed" : ""}`}>
			<a className="skip-link" href="#main-content">Skip to content</a>
			<aside className="app-sidebar" aria-label="KGQA Generalization navigation">
				<button
					className="sidebar-toggle"
					type="button"
					onClick={() => setCollapsed(!collapsed)}
					aria-label={collapsed ? "Expand navigation" : "Collapse navigation"}
					aria-expanded={!collapsed}
				>
					{collapsed ? <RightOutlined aria-hidden="true" /> : <LeftOutlined aria-hidden="true" />}
				</button>

				<button className="site-brand" type="button" onClick={() => navigate("/")} aria-label="KGQA Generalization home">
					<span className="site-brand-mark">KG</span>
					<span className="site-brand-name">KGQA <b>GENERALIZATION</b></span>
				</button>

				<nav className="site-nav" aria-label="Main navigation">
					<NavLink to="/" end title="Home"><HomeOutlined aria-hidden="true" /><span>Home</span></NavLink>
					<NavLink to="/papers" title="Papers"><UnorderedListOutlined aria-hidden="true" /><span>Papers</span></NavLink>
					<NavLink to="/charts" title="Charts"><DotChartOutlined aria-hidden="true" /><span>Charts</span></NavLink>
					<NavLink to="/add-paper" title="Add Paper" className={({ isActive }) => `nav-contribute${isActive ? " active" : ""}`}><PlusCircleOutlined aria-hidden="true" /><span>Add Paper</span></NavLink>
				</nav>

				<div className="sidebar-footer">
					<span className="sidebar-footer-kicker">RESEARCH WORKBENCH</span>
					<span className="sidebar-footer-title">KGQA Generalization</span>
					<a href={`${githubUrl}/pulls`} target="_blank" rel="noreferrer">Review contributions <ExportOutlined aria-hidden="true" /></a>
				</div>
			</aside>

			<div className="app-content">
				<main className="site-main" id="main-content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/papers" element={<Papers />} />
						<Route path="/charts" element={<Charts />} />
						<Route path="/add-paper" element={<AddPaper />} />
					</Routes>
				</main>
				<footer className="site-footer">
					<span>Knowledge Graph Question Answering · Generalization</span>
					<a href={`${githubUrl}`} target="_blank" rel="noreferrer">Project repository <ArrowRightOutlined aria-hidden="true" /></a>
				</footer>
			</div>
		</div>
	)
}
