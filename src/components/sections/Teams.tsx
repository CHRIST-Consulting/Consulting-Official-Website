import SectionTitle from "../ui/SectionTitle";
import ScrollAnimation from "../ui/ScrollAnimation";
import { LinkedinIcon, Mail } from "lucide-react";
import {
  directorData,
  facultyConsultantsData,
  studentLeadersData,
} from "../../data/TeamsData";

const Teams = () => {
  const director = directorData;
  const facultyConsultants = facultyConsultantsData;
  const studentLeaders = studentLeadersData;

  return (
    <section id="teams">
      <div>
        <div className="bg-white rounded-2xl p-8 md:p-12 mb-20 my-16 m-10">
          <ScrollAnimation>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-heading">
                Meet the Team
              </h2>
              <p className="text-xl text-charcoal">
                Our strength lies in our people — faculty, mentors, and student
                leaders working together to drive transformation.
              </p>
            </div>
          </ScrollAnimation>
        </div>

        <div className="bg-secondary py-8">
          <ScrollAnimation>
            <SectionTitle
              title="Our Leaders"
              subtitle="Expert mentors driving innovation and excellence"
              centered={true}
            />
          </ScrollAnimation>

          {/* Director - Special Layout */}
          <div className="mt-12 section-container">
            <ScrollAnimation>
              <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="relative overflow-hidden h-64 md:h-full">
                      <img
                        src={director.image}
                        alt={director.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h3 className="text-2xl font-bold text-primary mb-2 font-heading">
                      {director.name}
                    </h3>
                    <p className="text-accent font-medium text-lg mb-4">
                      {director.role}
                    </p>
                    <p className="text-charcoal mb-6 leading-relaxed">
                      {director.expertise}
                    </p>
                    <div className="flex items-center space-x-3">
                      {director?.linkedin && (
                        <a
                          href={director.linkedin}
                          className="text-primary hover:text-accent transition-colors duration-300"
                          target="_blank"
                        >
                          <LinkedinIcon size={24} />
                        </a>
                      )}
                      {director?.email && (
                        <a
                          href={`mailto:${director.email}`}
                          className="text-primary hover:text-accent transition-colors duration-300"
                        >
                          <Mail size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          {/* Other Consultants */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 section-container">
            {facultyConsultants.map((consultant, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={consultant.image}
                      alt={consultant.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-1 font-heading">
                      {consultant.name}
                    </h3>
                    <p className="text-accent text-sm mb-2">
                      {consultant.role}
                    </p>
                    <p className="text-charcoal font-medium text-sm mb-4">
                      {consultant.expertise}
                    </p>

                    <div className="flex items-center space-x-3">
                      {consultant.linkedin && (
                        <a
                          href={consultant.linkedin}
                          className="text-primary hover:text-accent transition-colors duration-300"
                          target="_blank"
                        >
                          <LinkedinIcon size={20} />
                        </a>
                      )}
                      {consultant.email && (
                        <a
                          href={`mailto:${consultant.email}`}
                          className="text-primary hover:text-accent transition-colors duration-300"
                        >
                          <Mail size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <ScrollAnimation>
            <SectionTitle
              title="Student Leaders"
              subtitle="The next generation of consulting excellence"
              centered={true}
            />
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 section-container">
            {studentLeaders.map((student, index) => (
              <ScrollAnimation key={index} delay={index * 150}>
                <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden h-72">
                    <img
                      src={student.image}
                      alt={student.name}
                      className="w-full h-full object-cover bg-blue-50/50 transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-1 font-heading">
                      {student.name}
                    </h3>
                    <p className="text-accent font-medium text-sm mb-1">
                      {student.role}
                    </p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        <ScrollAnimation>
          <div className="mt-20 bg-white rounded-2xl p-8 py-20 md:p-12">
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl md:text-3xl text-primary font-heading text-center italic">
                "CHRIST Consulting empowers students and mentors to collaborate,
                innovate, and lead real-world projects together."
              </blockquote>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Teams;
