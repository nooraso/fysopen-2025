export const Total = ({ parts }) => {
    /* 
    If parts = [
        { name: "Part 1", exercises: 10 },
        { name: "Part 2", exercises: 7 },
        { name: "Part 3", exercises: 14 }
    ]

    reduce works like this:
    1st iteration: a = 0, l.exercises = 10 → 0 + 10 = 10
    2nd iteration: a = 10, l.exercises = 7 → 10 + 7 = 17
    3rd iteration: a = 17, l.exercises = 14 → 17 + 14 = 31
    */
    const sum = parts.reduce((a, l) => a + l.exercises, 0)
    return (
        <p>Number of exercises: {sum}</p>
    )
}