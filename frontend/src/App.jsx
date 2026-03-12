import { useState } from "react";
import "./App.css";

function App() {
    const maps = ["Ascent", "Bind", "Split", "Haven"];

    const agents = [
        "Jett",
        "Raze",
        "Omen",
        "Brimstone",
        "Sova",
        "Skye",
        "Killjoy",
        "Cypher",
    ];

    const [selectedMap, setSelectedMap] = useState("Ascent");
    const [selectedAgents, setSelectedAgents] = useState([]);

    function toggleAgent(agent) {
        if (selectedAgents.includes(agent)) {
            setSelectedAgents(selectedAgents.filter((a) => a !== agent));
        } else {
            if (selectedAgents.length < 5) {
                setSelectedAgents([...selectedAgents, agent]);
            }
        }
    }

    return (
        <div className="app">
            <header className="topbar">
                <div>
                    <h1>Valorant Strategy Analyzer</h1>
                    <p>Build a team composition and review its strengths and weaknesses</p>
                </div>
            </header>

            <main className="main-layout">
                <section className="panel left-panel">
                    <h2>Team Builder</h2>

                    <div className="form-group">
                        <label htmlFor="map-select">Select Map</label>
                        <select
                            id="map-select"
                            value={selectedMap}
                            onChange={(e) => setSelectedMap(e.target.value)}
                        >
                            {maps.map((map) => (
                                <option key={map} value={map}>
                                    {map}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Select Agents (max 5)</label>
                        <div className="agent-grid">
                            {agents.map((agent) => (
                                <button
                                    key={agent}
                                    className={`agent-button ${
                                        selectedAgents.includes(agent) ? "selected" : ""
                                    }`}
                                    onClick={() => toggleAgent(agent)}
                                >
                                    {agent}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="selected-box">
                        <h3>Selected Agents</h3>
                        {selectedAgents.length === 0 ? (
                            <p>No agents selected yet.</p>
                        ) : (
                            <ul>
                                {selectedAgents.map((agent) => (
                                    <li key={agent}>{agent}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button className="analyze-button">Analyze Strategy</button>
                </section>

                <section className="panel right-panel">
                    <h2>Analysis Result</h2>
                    <div className="placeholder-card">
                        <p>Map: {selectedMap}</p>
                        <p>
                            Selected team:{" "}
                            {selectedAgents.length > 0 ? selectedAgents.join(", ") : "None yet"}
                        </p>
                        <p className="placeholder-text">
                            Strategy results will appear here after analysis is implemented.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default App;