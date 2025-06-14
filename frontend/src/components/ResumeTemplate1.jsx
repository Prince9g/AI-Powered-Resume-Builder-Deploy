const ResumeTemplate1 = ({ formData }) => {
  // Safely destructure with defaults
  const {
    name = "",
    email = "",
    phone = "",
    address = "",
    links = [],
    education = [],
    experience = [],
    projects = [],
    honors = []
  } = formData || {};

  // Convert all arrays to safe versions
  const safeLinks = Array.isArray(links) ? links : [];
  const safeEducation = Array.isArray(education) ? education : [];
  const safeExperience = Array.isArray(experience) ? experience : [];
  const safeProjects = Array.isArray(projects) ? projects : [];
  const safeHonors = Array.isArray(honors) ? honors : [];

  // Function to format description with bullet points
  const formatDescription = (description) => {
    if (!description) return null;
    return description.split("\n").map((line, index) => {
      if (line.startsWith("-")) {
        return <li key={index}>{line.replace("-", "•")}</li>;
      }
      return <li key={index}>{line}</li>;
    });
  };

  // Check if the form has any data (excluding the name)
  const hasData =
    email ||
    phone ||
    address ||
    safeLinks.some(link => link?.type || link?.url) ||
    safeEducation.some(edu => 
      edu?.university || edu?.degree || edu?.gpa || edu?.location || edu?.startDate || edu?.endDate
    ) ||
    safeExperience.some(exp => 
      exp?.company || exp?.role || exp?.location || exp?.startDate || exp?.endDate || exp?.description
    ) ||
    safeProjects.some(project => 
      project?.name || project?.liveLink || project?.repoLink || project?.techStack || project?.description
    ) ||
    safeHonors.some(honor => honor);

  return (
    <div className="w-[794px] h-[1123px] p-10 bg-white shadow-lg border border-gray-300 relative list-disc text-lg">
      {/* Header */}
      <div className="text-center pb-2">
        <h1 className="text-3xl font-bold">{name || "First Last"}</h1>

        {hasData && (
          <>
            <p className="text-sm text-gray-600">
              {email && `${email} | `}
              {phone && `${phone} | `}
              {address}
            </p>
            <p className="text-sm font-semibold mt-2">
              {safeLinks.map(
                (link, index) =>
                  link?.type &&
                  link?.url && (
                    <span key={index} className="text-black">
                      <span className="mr-1">{index !== 0 && " | "}</span>
                      <a href={link.url} target="_blank" rel="noopener noreferrer">
                        {link.type}
                      </a>
                    </span>
                  )
              )}
            </p>
          </>
        )}
      </div>

      {/* Education Section */}
      {safeEducation.some(edu => 
        edu?.university || edu?.degree || edu?.gpa || edu?.location || edu?.startDate || edu?.endDate
      ) && (
        <div className="mt-4">
          <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Education</h2>
          {safeEducation.map(
            (edu, index) =>
              (edu?.university || edu?.degree || edu?.gpa || edu?.location || edu?.startDate || edu?.endDate) && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">{edu?.university || "University Name"}</p>
                    <p className="text-sm">{edu?.location || "Location"}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm italic">
                      {edu?.degree || "Degree"} {edu?.gpa && `GPA: ${edu.gpa}`}
                    </p>
                    <p className="text-sm">
                      {edu?.startDate || "Start"} - {edu?.endDate || "End"}
                    </p>
                  </div>
                </div>
              )
          )}
        </div>
      )}

      {/* Experience Section */}
      {safeExperience.some(exp => 
        exp?.company || exp?.role || exp?.location || exp?.startDate || exp?.endDate || exp?.description
      ) && (
        <div className="mt-4">
          <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Experience</h2>
          {safeExperience.map(
            (exp, index) =>
              (exp?.company || exp?.role || exp?.location || exp?.startDate || exp?.endDate || exp?.description) && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">
                      {exp?.company || "Company"} | {exp?.role || "Role"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {exp?.location || "Location"} | {exp?.startDate || "Start"} - {exp?.endDate || "End"}
                    </p>
                  </div>
                  {exp?.description && (
                    <ul className="list-disc pl-5 text-sm">
                      {formatDescription(exp.description)}
                    </ul>
                  )}
                </div>
              )
          )}
        </div>
      )}

      {/* Projects Section */}
      {safeProjects.some(project => 
        project?.name || project?.liveLink || project?.repoLink || project?.techStack || project?.description
      ) && (
        <div className="mt-4">
          <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Projects</h2>
          {safeProjects.map(
            (project, index) =>
              (project?.name || project?.liveLink || project?.repoLink || project?.techStack || project?.description) && (
                <div key={index} className="mb-4">
                  <div className="flex justify-between">
                    <p className="font-semibold">
                      {project?.name || "Project Name"}
                      {project?.liveLink && (
                        <span className="text-blue-600 ml-2">
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                            Live Link
                          </a>
                        </span>
                      )}
                      {project?.repoLink && (
                        <span className="text-blue-600 ml-2">
                          <a href={project.repoLink} target="_blank" rel="noopener noreferrer">
                            Repo Link
                          </a>
                        </span>
                      )}
                    </p>
                    <p className="text-sm">{project?.techStack || "Technologies"}</p>
                  </div>
                  {project?.description && (
                    <ul className="list-disc pl-5 text-sm">
                      {formatDescription(project.description)}
                    </ul>
                  )}
                </div>
              )
          )}
        </div>
      )}

      {/* Honors & Awards Section */}
      {safeHonors.some(honor => honor) && (
        <div className="mt-4">
          <h2 className="text-md font-semibold border-b border-black pb-1 uppercase">Honors & Awards</h2>
          <ul className="list-disc pl-5 text-sm">
            {safeHonors.map(
              (honor, index) =>
                honor && <li key={index}>{honor}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResumeTemplate1;