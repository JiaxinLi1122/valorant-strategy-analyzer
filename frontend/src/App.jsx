import "./App.css";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Builder from "./pages/Builder";
import Guide from "./pages/Guide";
import About from "./pages/About";

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <header className="topbar">
                    <div className="topbar-inner">
                        <div className="brand-block">
                            <h1>Valorant Strategy Analyzer</h1>
                            <p>
                                Analyze team compositions, review role balance, and generate
                                map-based strategy suggestions.
                            </p>
                        </div>

                        <nav className="navbar">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                end
                            >
                                Home
                            </NavLink>

                            <NavLink
                                to="/builder"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Builder
                            </NavLink>

                            <NavLink
                                to="/guide"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                Guide
                            </NavLink>

                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                            >
                                About
                            </NavLink>
                        </nav>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/builder" element={<Builder />} />
                    <Route path="/guide" element={<Guide />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;