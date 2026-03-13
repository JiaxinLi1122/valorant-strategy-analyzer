import { useMemo, useState } from "react";
import "./App.css";
import { agentData, maps } from "./data/agents";
import { analyzeComposition } from "./utils/analyzeComposition";

function App() {
    const [selectedMap, setSelectedMap] = useState("Ascent");
    const [selectedAgents, setSelectedAgents] = useState([]);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [validationMessage, setValidationMessage] = useState("");

    function toggleAgent(agentName) {
        if (selectedAgents.includes(agentName)) {
            setSelectedAgents((prev) => prev.filter((agent) => agent !== agentName));
            return;
        }

        if (selectedAgents.length < 5) {
            setSelectedAgents((prev) => [...prev, agentName]);
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

    const groupedAgents = useMemo(() => {
        return {
            Duelist: agentData.filter((agent) => agent.role === "Duelist"),
            Controller: agentData.filter((agent) => agent.role === "Controller"),
            Initiator: agentData.filter((agent) => agent.role === "Initiator"),
            Sentinel: agentData.filter((agent) => agent.role === "Sentinel"),
        };
    }, []);

    const remainingSlots = 5 - selectedAgents.length;

    function runAnalysis() {
        if (selectedAgents.length !== 5) {
            setValidationMessage("Please select exactly 5 agents before analysis.");
            setAnalysisResult(null);
            return;
        }

        setValidationMessage("");

        const result = analyzeComposition(
            selectedAgents,
            roleSummary,
            selectedMap
        );

        setAnalysisResult(result);
    }

    return (
        <div className="app">
            <header className="topbar">
                <div>
                    <h1>Valorant Strategy Analyzer</h1>
                    <p>
                        Analyze team compositions, review role balance, and generate
                        map-based strategy suggestions.
                    </p>
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

                        {Object.entries(groupedAgents).map(([role, agents]) => (
                            <div key={role} className="role-group">
                                <h3 className="role-group-title">{role}</h3>

                                <div className="agent-grid">
                                    {agents.map((agent) => {
                                        const isSelected = selectedAgents.includes(agent.name);
                                        const isDisabled =
                                            !isSelected && selectedAgents.length >= 5;

                                        return (
                                            <button
                                                key={agent.name}
                                                className={`agent-button ${isSelected ? "selected" : ""}`}
                                                onClick={() => toggleAgent(agent.name)}
                                                disabled={isDisabled}
                                            >
                                                <img
                                                    src={agent.image}
                                                    alt={agent.name}
                                                    className="agent-portrait"
                                                />
                                                <div className="agent-text">
                                                    <span className="agent-name">{agent.name}</span>
                                                    <span className="agent-role">{agent.role}</span>
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
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

                    {validationMessage && (
                        <div className="validation-box">{validationMessage}</div>
                    )}

                    <button className="analyze-button" onClick={runAnalysis}>
                        Analyze Strategy
                    </button>
                </section>

                <section className="panel right-panel">
                    <h2>Analysis Result</h2>

                    {!analysisResult ? (
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
                                Select 5 agents and click Analyze Strategy to generate a result.
                            </p>
                        </div>
                    ) : (
                        <div className="result-card">
                            <div className="score-box">
                                <h3>Overall Score</h3>
                                <p className="big-score">{analysisResult.score}/100</p>
                            </div>

                            <div className="result-section">
                                <h3>Role Balance</h3>
                                <p>{analysisResult.roleBalance}</p>
                            </div>

                            <div className="result-section">
                                <h3>Strengths</h3>
                                <ul>
                                    {analysisResult.strengths.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="result-section">
                                <h3>Weaknesses</h3>
                                <ul>
                                    {analysisResult.weaknesses.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="result-section">
                                <h3>Attack Suggestions</h3>
                                <ul>
                                    {analysisResult.attackSuggestions.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="result-section">
                                <h3>Defense Suggestions</h3>
                                <ul>
                                    {analysisResult.defenseSuggestions.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="result-section">
                                <h3>Replacement Ideas</h3>
                                <ul>
                                    {analysisResult.replacementIdeas.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default App;