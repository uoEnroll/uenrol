import { useCourses } from "@/contexts/CourseContext";
import React, { useState } from "react";
import Image from "next/image";
import CourseResult from "./CourseResult/CourseResult";

export default function SearchResults() {
  const { courses } = useCourses();

  return (
    <>
      {courses.map((course) => {
        return (
          <CourseResult
            key={`${course.courseCode}${course.term}`}
            course={course}
          />
        );
      })}
    </>
  );
}
