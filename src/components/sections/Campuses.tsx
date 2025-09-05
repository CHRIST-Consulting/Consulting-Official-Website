import { useState } from "react";
import SectionTitle from "../ui/SectionTitle";
import ScrollAnimation from "../ui/ScrollAnimation";
import CampusModal from "../ui/CampusModal";
import { MapPin, ArrowRight } from "lucide-react";
import { campusesData, Campus } from "../../data/CampusesData";

const Campuses = () => {
  const campuses = campusesData;
  const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (campus: Campus) => {
    setSelectedCampus(campus);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCampus(null);
    setIsModalOpen(false);
  };

  return (
    <section id="campuses" className="py-16 bg-white dark:bg-white/5">
      <div className="section-container">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <SectionTitle
              title="Our Campuses"
              subtitle="Compact, modern spaces where ideas become impact"
              centered={true}
            />
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {campuses.map((campus, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className="group h-full">
                <button
                  type="button"
                  onClick={() => openModal(campus)}
                  className="w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black/10 rounded-xl"
                  aria-label={`Explore ${campus.name} campus`}
                >
                  <div className="bg-white dark:bg-white/10 rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:scale-[1.01] h-full flex flex-col">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <div className="aspect-[16/9]">
                        <img
                          src={campus.image}
                          alt={campus.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                          loading="lazy"
                          decoding="async"
                          width="400"
                          height="225"
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      {/* Location pill */}
                      <div className="mb-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-white/10 px-3 py-1 text-xs text-gray-700 dark:text-gray-300">
                          <MapPin size={12} className="text-gray-500" />
                          {campus.location}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                        {campus.name}
                      </h3>

                      {/* Subtitle */}
                      <p className="mt-1 text-base text-gray-600 dark:text-gray-400 line-clamp-2">
                        {campus.description}
                      </p>

                      {/* Action */}
                      <div className="mt-4 flex items-center text-base text-gray-900 dark:text-gray-200 font-medium">
                        <span className="group-hover:underline underline-offset-4">Explore Campus</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Campus Modal */}
        <CampusModal
          campus={selectedCampus}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </section>
  );
};

export default Campuses;
