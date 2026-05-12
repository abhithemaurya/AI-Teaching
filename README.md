

follow RSC 

Request → Route → Controller → Service → Repository → DB



  1. repository
  2. Services
  3. Controller 
  4. Route





i have this folder structure 

└───src
    ├───app
    │   │   favicon.ico
    │   │   globals.css
    │   │   layout.js
    │   │   page.js
    │   │
    │   ├───(auth)
    │   │   ├───login
    │   │   │       page.jsx
    │   │   │
    │   │   ├───services
    │   │   │       auth.service.js
    │   │   │
    │   │   └───signup
    │   │           page.jsx
    │   │
    │   └───api
    │       ├───auth
    │       │   ├───controllers
    │       │   │       auth.controller.js
    │       │   │
    │       │   ├───repositories
    │       │   │       auth.repositories.js
    │       │   │
    │       │   └───route
    │       │           route.js
    │       │
    │       └───test
    │               route.js
    │
    ├───features
    │   └───auth
    │       ├───api
    │       ├───components
    │       │       LoginForm.jsx
    │       │       SignupForm.jsx
    │       │
    │       ├───hooks
    │       ├───stores
    │       └───styles
    └───lib
            prisma.js










src/
 ├── app/
 │   ├── (dashboard)/                # route group (keeps URL clean)
 │   │   ├── layout.jsx              # 🔥 main layout (sidebar + header)
 │   │   ├── dashboard/
 │   │   │   └── page.jsx
 │   │   ├── worksheets/
 │   │   │   └── page.jsx
 │   │   ├── questions/
 │   │   │   └── page.jsx
 │   │   ├── lessons/
 │   │   │   └── page.jsx
 │   │
 │   ├── auth/
 │   │   └── page.jsx
 │   │
 │   └── layout.js                  # global layout (html, body)
 │
 ├── components/
 │   ├── layout/
 │   │   ├── Sidebar.jsx
 │   │   ├── Header.jsx
 │   │   ├── Footer.jsx
 │
 ├── features/
 │   ├── dashboard/
 │   ├── worksheets/
 │   ├── questions/
 │   ├── lessons/












src/
 ├── app/
 │   ├── (dashboard)/
 │   │   ├── layout.jsx
 │   │   ├── dashboard/
 │   │   │   └── page.jsx   👈 MAIN CONTENT
 │
 ├── components/
 │   ├── layout/
 │   │   ├── Sidebar.jsx
 │   │   ├── Header.jsx
 │   │   ├── Footer.jsx
 │
 ├── features/
 │   ├── dashboard/
 │   │   └── DashboardContent.jsx 👈 UI moved here










1. fetch recent added Admin and recent added teacher on superdain dashboard
2. make a UI for teacher List and adding a teacher 
3. write a api for adding a techer, update, delete, 
4. update dashboard page change static data to dynamic data  








1. create a Configuration page UI 
2. work on backend to give a access to superadmin for give approval for accept and reject teacher account create 
3. create a table on database 













teacherLIst code before add status 
"use client";

import { Pencil, Search, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useTeacherStore } from "./stores/teacherStore";


const TeacherList = () => {
  const { teacher,fetchTeachers,updateTeacher , deleteTeacher, loading, setEditTeacher } =useTeacherStore()

  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  
  const filteredTeacher = useMemo(() => {
    if (!search.trim()) return teacher;

    const s = search.toLowerCase();

    return teacher.filter(
      (a) =>
        a.name?.toLowerCase().includes(s) ||
        a.email?.toLowerCase().includes(s) ||
        a.phone?.includes(s)
    );
  }, [teacher, search]);

  // 🗑 delete
  const confirmDelete = async () => {
    if (!deleteId) return;
    await deleteTeacher(deleteId);
    setDeleteId(null);
  };

  return (
    <div className="bg-white px-4 py-3 rounded-2xl shadow-md border border-gray-100 relative">
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDeleteId(null)}
          />

          <div className="relative bg-white w-full max-w-sm rounded-2xl shadow-lg p-5 border border-gray-100">
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              Delete Teacher
            </h3>

            <p className="text-sm text-gray-500 mb-5">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-3">
        <h2 className="font-semibold text-base tracking-tight">
          Teacher List
        </h2>

        <div className="flex items-center gap-2 w-full md:w-64 border border-gray-200 rounded-lg px-2.5 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder:text-gray-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-y-auto max-h-[500px] border border-gray-200 rounded-lg">
        <table className="w-full text-sm table-fixed">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr className="text-left text-gray-500">
              <th className="px-3 py-2 w-[60px]">ID</th>
              <th className="px-3 py-2 w-[140px]">Name</th>
              <th className="px-3 py-2 w-[160px]" >Contact</th>
              <th className="px-3 py-2 w-[120px]">Role</th>
               <th className="px-3 py-2 w-[120px]">School</th>
              <th className="px-3 py-2 w-[120px]">Created</th>
              {/* <th className="px-3 py-2 w-[120px]">Status</th> */}
              <th className="px-3 py-2 text-center w-[80px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : filteredTeacher.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No teacher found
                </td>
              </tr>
            ) : (
              filteredTeacher.map((teacher) => (
                <tr
                  key={teacher.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-3 py-2 text-gray-500">
                    {teacher.id}
                  </td>

                  <td className="px-3 py-2 font-medium text-gray-800 truncate">
                    {teacher.name}
                  </td>              
                  <td className="px-3 py-2">
                    <div className="flex flex-col">
                      <span className="text-gray-700 truncate">
                        {teacher.email}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {teacher.phone || "-"}
                      </span>
                    </div>
                  </td> 
                              
                  <td className="px-3 py-2">
                    <span className="px-2 py-0.5 text-xs rounded-md bg-blue-50 text-blue-600">
                      {teacher.role}
                    </span>
                  </td>
                     <td className="px-3 py-2">
                    <div className="flex flex-col">
                      <span className="text-gray-700">
                        {teacher.school}
                      </span>
                    </div>
                  </td> 
                  <td className="px-3 py-2 text-gray-400 text-xs">
                    {teacher.createdAt
                      ? new Date(teacher.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setEditTeacher(teacher)}
                        className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-md"
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteId(teacher.id)}
                        className="text-red-500 hover:bg-red-50 p-1.5 rounded-md"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherList;














1. update code in teacher list 
2. write a api for profile section for update,
   get,
3. add row for teacher approval and reject and also fetch with     backend 


1. add a function teachaer can edit a question
2. send question as a pdf
3. save question in library
4. work on lession page UI  






1. add a function in teacher approval section on chagne any status teacher will find a email update 
2. work on weekly planner UI 
3. allow all route to access role module


