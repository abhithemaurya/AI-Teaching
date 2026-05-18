"use client";
import React from "react";
import TeacherList from "./TeacherList";
import CreateTeacherForm from "./CreateTeacherForm";

const TeacherContent = () => {
  return (
    <div className="p-4 md:p-6 lg:p-0">
      <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
        <div className="lg:col-span-4">
          <TeacherList/>
        </div>
      </div>
    </div>
  );
};

export default TeacherContent;