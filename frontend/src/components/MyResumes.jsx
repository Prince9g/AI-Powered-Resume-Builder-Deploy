import React, { useEffect, useState } from "react";
import { MdOutlineFileDownload, MdDelete, MdEdit } from "react-icons/md";
import html2pdf from "html2pdf.js";
import ResumeTemplate1 from "./ResumeTemplate1";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setAuthUser } from "../redux/authSlice";
// import { setAuthUser } from "../features/authSlice";

const MyResumes = ({ onEdit }) => {
  const [hoveredResume, setHoveredResume] = useState(null);
  const { resumes, loading } = useSelector((state) => state.auth);
  // console.log(resumes);
  const dispatch = useDispatch();
  console.log(resumes);
  const handleDownload = async (resumeData, event) => {
    useEffect(()=>{
      const fetchResumes = async () => {
        try {
          const res = await axios.get("http://localhost:8080/api/resume/user-resumes", {
            withCredentials: true,
          });
          console.log(res);
          dispatch(setAuthUser({
            resumes: res.data.resumes
          }));
        } catch (error) {
          console.error("Error fetching resumes:", error);
        }
      };
      
      fetchResumes();
    },[]);
    event.stopPropagation();
    
    try {
      // Create a temporary div to render the resume for PDF generation
      const tempDiv = document.createElement("div");
      tempDiv.style.width = "794px"; // A4 width in pixels
      tempDiv.style.height = "1123px"; // A4 height in pixels
      tempDiv.style.padding = "40px";
      tempDiv.style.backgroundColor = "white";
      document.body.appendChild(tempDiv);
      
      // Render the resume template
      // const root = ReactDOM.createRoot(tempDiv);
      // root.render(<ResumeTemplate1 formData={resumeData} />);
      console.log(resumes);
      
      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${resumeData.name || "Resume"}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf()
        .set(opt)
        .from(tempDiv)
        .save();
        
      document.body.removeChild(tempDiv);
      root.unmount();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // const handleDelete = async (resumeId, event) => {
  //   event.stopPropagation();
  //   try {
  //     const { data } = await axios.delete(`http://localhost:8080/api/resume/${resumeId}`, {
  //       withCredentials: true,
  //     });
      
  //     // Update Redux store with the remaining resumes
  //     dispatch(setAuthUser({
  //       user: data.user,
  //       resumes: data.resumes
  //     }));
      
  //   } catch (error) {
  //     console.error("Error deleting resume:", error);
  //   }
  // };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-64">
  //       <p className="text-gray-500 text-lg">Loading resumes...</p>
  //     </div>
  //   );
  // }

  // if (resumes.length === 0) {
  //   return (
  //     <div className="flex items-center justify-center h-64">
  //       <p className="text-gray-500 text-lg">No resumes found. Create your first resume!</p>
  //     </div>
  //   );
  // }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">My Resumes ({resumes.length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resumes.map((resume) => (
          <div
            key={resume._id}
            className="relative border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white"
            onMouseEnter={() => setHoveredResume(resume._id)}
            onMouseLeave={() => setHoveredResume(null)}
            onClick={() => onEdit && onEdit(resume)}
          >
            <h3 className="text-lg font-semibold mb-2 truncate">
              {resume.name || "Untitled Resume"}
            </h3>
            <p className="text-gray-600 text-sm mb-4 truncate">
              {resume.email || "No email provided"}
            </p>
            
            {/* Hover actions */}
            {hoveredResume === resume._id && (
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(e) => handleDownload(resume, e)}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
                  title="Download PDF"
                >
                  <MdOutlineFileDownload size={18} />
                </button>
                <button
                  onClick={(e) => handleDelete(resume._id, e)}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all"
                  title="Delete Resume"
                >
                  <MdDelete size={18} />
                </button>
                {onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(resume);
                    }}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all"
                    title="Edit Resume"
                  >
                    <MdEdit size={18} />
                  </button>
                )}
              </div>
            )}
            
            {/* Mini preview */}
            <div className="overflow-hidden border rounded" style={{ 
              height: "200px",
              transform: "scale(0.7)",
              transformOrigin: "top left",
              width: "140%",
              pointerEvents: "none" // Prevent interaction with the preview
            }}>
              <ResumeTemplate1 formData={resume} />
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              Last updated: {new Date(resume.updatedAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyResumes;