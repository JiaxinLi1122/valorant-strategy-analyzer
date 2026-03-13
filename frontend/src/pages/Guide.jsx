import "../App.css";

function Guide() {
    return (
        <main className="page-shell">
            <section className="content-card">
                <h2>Strategy Guide</h2>
                <p>
                    This page provides a quick overview of Valorant team roles and basic
                    composition advice.
                </p>

                <div className="guide-grid">
                    <div className="info-card">
                        <h3>Duelist</h3>
                        <p>Creates entry pressure and takes first contact during site executes.</p>
                    </div>

                    <div className="info-card">
                        <h3>Controller</h3>
                        <p>Uses smokes and utility to block vision and control key areas.</p>
                    </div>

                    <div className="info-card">
                        <h3>Initiator</h3>
                        <p>Collects information and helps teammates enter contested space.</p>
                    </div>

                    <div className="info-card">
                        <h3>Sentinel</h3>
                        <p>Anchors sites, slows pushes, and supports defensive stability.</p>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Guide;