import "antd/dist/antd.css"
import "./styles.css"
import React, { useEffect } from "react"
import ReactDOM from "react-dom"
import { store } from "./redux"
import { HashRouter, NavLink, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Provider } from "react-redux"
import { ArrowRightOutlined, ArrowUpRightOutlined, PlusOutlined } from "@ant-design/icons"
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

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location.pathname])

	return (
		<div className="site-shell">
			<a className="skip-link" href="#main-content">Skip to content</a>
			<header className="site-header">
				<button className="site-brand" type="button" onClick={() => navigate("/")} aria-label="XAI Methods home">
					<span className="site-brand-mark">X</span>
					<span>XAI <b>METHODS</b></span>
				</button>
				<nav className="site-nav" aria-label="Main navigation">
					<NavLink to="/" end>Home</NavLink>
					<NavLink to="/papers">Papers</NavLink>
					<NavLink to="/charts">Charts</NavLink>
					<NavLink to="/add-paper" className={({ isActive }) => `nav-contribute${isActive ? " active" : ""}`}><PlusOutlined aria-hidden="true" /> Add paper</NavLink>
				</nav>
				<a className="review-link" href={`${githubUrl}/pulls`} target="_blank" rel="noreferrer">
					Review queue <ArrowUpRightOutlined aria-hidden="true" />
				</a>
			</header>

			<main className="site-main" id="main-content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/papers" element={<Papers />} />
					<Route path="/charts" element={<Charts />} />
					<Route path="/add-paper" element={<AddPaper />} />
				</Routes>
			</main>

			<footer className="site-footer">
				<span>Overview of Methods on Explainable AI</span>
				<a href="https://doi.org/10.1145/3583558" target="_blank" rel="noreferrer">
					Nauta et al. · ACM Computing Surveys · 2023 <ArrowRightOutlined aria-hidden="true" />
				</a>
			</footer>
		</div>
	)
}
