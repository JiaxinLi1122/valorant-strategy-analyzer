import { Link } from "react-router-dom";
import "../App.css";

function Home() {
    return (
        <main className="page-shell">
            <section className="hero-card">
                <h2>Build Better Valorant Compositions</h2>
                <p>
                    Analyze team compositions, review role balance, and generate
                    map-based strategy suggestions for your next match.
                </p>

                <div className="hero-buttons">
                    <Link to="/builder" className="hero-primary-button">
                        Start Building
                    </Link>
                </div>
            </section>

            <section className="info-grid">
                <div className="info-card">
                    <h3>Team Analysis</h3>
                    <p>Check role balance, strengths, weaknesses, and overall team score.</p>
                </div>

                <div className="info-card">
                    <h3>Map Awareness</h3>
                    <p>Get strategy suggestions that change depending on the selected map.</p>
                </div>

                <div className="info-card">
                    <h3>Actionable Advice</h3>
                    <p>Review attack, defense, and replacement ideas for your composition.</p>
                </div>
            </section>
        </main>
    );
}

export default Home;