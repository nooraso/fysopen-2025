export const StatisticsLine = ({ text, value }) => {
    return (
        <div>
            <p>{text}: {value}</p>
        </div>
    );
}

export const Statistics = ({ good, neutral, bad, all }) => {
    if (all === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <div>No feedback given</div>
            </div>
        );
    }

    const average = (good - bad) / all;
    const positivePercentage = (good / all) * 100;

    return (
        <div>
            <h1>statistics</h1>
            <StatisticsLine text="Good" value={good} />
            <StatisticsLine text="Neutral" value={neutral} />
            <StatisticsLine text="Bad" value={bad} />
            <StatisticsLine text="All" value={all} />
            <StatisticsLine text="Average" value={average.toFixed(2)} />
            <StatisticsLine text="Positive" value={`${positivePercentage.toFixed(2)}%`} />
        </div>
    );
}
