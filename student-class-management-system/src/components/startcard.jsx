function StatCard({
    title,
    value,
    icon,
    type
}) {

    return (
        <div className={`stat-card ${type}`}>

            <div className="stat-card-top">

                <div className="stat-icon">
                    {icon}
                </div>

                <div className="stat-arrow">
                    ↗
                </div>

            </div>


            <div className="stat-info">

                <p>
                    {title}
                </p>

                <h3>
                    {value}
                </h3>

            </div>

        </div>
    );
}

export default StatCard;