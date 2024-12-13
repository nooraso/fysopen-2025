const Part = (props) => {
    return(
        <p>
            {props.name}: {props.exercises}
        </p>
    )
}

export const Content = (props) => {
    return(
        <div>
            <Part
                name = {props.part1}
                exercises = {props.exercises1}
            />
            <Part
                name = {props.part2}
                exercises = {props.exercises2}
            />
            <Part
                name = {props.part3}
                exercises = {props.exercises3}
            />
        </div>
    )
}