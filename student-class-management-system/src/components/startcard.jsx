function Startcard() {
    return (
        <div className="stats-grid">

            {/* Total Tasks */}
            <div className="stat-card">
                <div className="stat-icon">📋</div>

                <div>
                    <p>Total Tasks</p>
                    <h2>24</h2>
                    <span>All assigned tasks</span>
                </div>
            </div>


            {/* Completed Tasks */}
            <div className="stat-card">
                <div className="stat-icon completed-icon">✓</div>

                <div>
                    <p>Completed Tasks</p>
                    <h2>16</h2>
                    <span>Tasks completed</span>
                </div>
            </div>


            {/* Pending Tasks */}
            <div className="stat-card">
                <div className="stat-icon pending-icon">⏳</div>

                <div>
                    <p>Pending Tasks</p>
                    <h2>8</h2>
                    <span>Tasks remaining</span>
                </div>
            </div>

        </div>
    );
}

export default Startcard;
