import React from "react";

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ course }) => {
  const totalExercies = course.parts
      .map(part => part.exercises)
      .reduce((acc, curr) => acc + curr, 0)
  return <p><strong>Number of exercises {totalExercies}</strong></p>
}
const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </>

const Course = ({ course }) => {
  return (
    <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total course={course}/>

    </>
  )
}

export default Course