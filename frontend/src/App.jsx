import { useMemo, useState } from "react";
import "./App.css";

function App() {
    const maps = ["Ascent", "Bind", "Split", "Haven"];

    const agentData = [
        { name: "Jett", role: "Duelist" },
        { name: "Raze", role: "Duelist" },
        { name: "Omen", role: "Controller" },
        { name: "Brimstone", role: "Controller" },
        { name: "Sova", role: "Initiator" },
        { name: "Skye", role: "Initiator" },
        { name: "Killjoy", role: "Sentinel" },
        { name: "Cypher", role: "Sentinel" },
    ];

    const [selectedMap, setSelectedMap] = useState("Ascent");
    const [selectedAgents, setSelectedAgents] = useState([]);

    function toggleAgent(agentName) {
        if (selectedAgents.includes(agentName)) {
            setSelectedAgents(selectedAgents.filter((agent) => agent !== agentName));
            return;
        }

        if (selectedAgents.length < 5) {
            setSelectedAgents([...selectedAgents, agentName]);
        }
    }

    const selectedAgentObjects = agentData.filter((agent) =>
        selectedAgents.includes(agent.name)
    );

    const roleSummary = useMemo(() => {
        const summary = {
            Duelist: 0,
            Controller: 0,
            Initiator: 0,
            Sentinel: 0,
        };

        selectedAgentObjects.forEach((agent) => {
            summary[agent.role] += 1;
        });

        return summary;
    }, [selectedAgentObjects]);

    const remainingSlots = 5 - selectedAgents.length;

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
                        <div className="section-header">
                            <label>Select Agents</label>
                            <span className="slot-counter">
                {remainingSlots === 0
                    ? "Team full"
                    : `${remainingSlots} slot${remainingSlots > 1 ? "s" : ""} left`}
              </span>
                        </div>

                        <div className="agent-grid">
                            {agentData.map((agent) => {
                                const isSelected = selectedAgents.includes(agent.name);
                                const isDisabled = !isSelected && selectedAgents.length >= 5;

                                return (
                                    <button
                                        key={agent.name}
                                        className={`agent-button ${isSelected ? "selected" : ""}`}
                                        onClick={() => toggleAgent(agent.name)}
                                        disabled={isDisabled}
                                    >
                                        <span className="agent-name">{agent.name}</span>
                                        <span className="agent-role">{agent.role}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="selected-box">
                        <h3>Selected Agents</h3>
                        {selectedAgents.length === 0 ? (
                            <p>No agents selected yet.</p>
                        ) : (
                            <ul>
                                {selectedAgentObjects.map((agent) => (
                                    <li key={agent.name}>
                                        {agent.name} — {agent.role}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button className="analyze-button">Analyze Strategy</button>
                </section>

                <section className="panel right-panel">
                    <h2>Analysis Preview</h2>

                    <div className="placeholder-card">
                        <p>
                            <strong>Selected Map:</strong> {selectedMap}
                        </p>

                        <p>
                            <strong>Team Size:</strong> {selectedAgents.length}/5
                        </p>

                        <div className="role-summary">
                            <h3>Role Summary</h3>
                            <ul>
                                <li>Duelist: {roleSummary.Duelist}</li>
                                <li>Controller: {roleSummary.Controller}</li>
                                <li>Initiator: {roleSummary.Initiator}</li>
                                <li>Sentinel: {roleSummary.Sentinel}</li>
                            </ul>
                        </div>

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